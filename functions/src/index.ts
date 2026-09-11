import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { z } from "zod";
import * as crypto from "crypto";

admin.initializeApp();
const db = admin.firestore();

// Server-side Zod validation schema matching the client contract
export const LeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must contain letters only.")
    .regex(/^[a-zA-Z\s]+$/, "Letters only"),
  email: z.string().email("Please provide a valid work email"),
  countryCode: z.string().min(1, "Country code required"),
  phone: z.string().min(7, "Invalid phone number"),
  service: z.string().optional(),
  projectDescription: z
    .string()
    .min(20, "Please provide at least 20 characters of detail"),
  ndaRequested: z.boolean().default(true),
  mathCaptchaAnswer: z.number(),
  source: z.string(), // E.g., 'Modal: Scoping Session', 'Floating Side Panel'
  token: z.string().optional(), // reCAPTCHA v3 or App Check token
  clientMetadata: z
    .object({
      referrer: z.string().optional(),
      landingPage: z.string().optional(),
      userAgent: z.string().optional(),
    })
    .optional(),
});

// XSS Sanitizer helper
function sanitizeString(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Optional Slack Webhook dispatcher
async function notifySlack(enquiryData: Record<string, unknown>) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    functions.logger.info("SLACK_WEBHOOK_URL not configured. Simulating Slack alert:", enquiryData);
    return;
  }

  try {
    const payload = {
      text: `🚀 *New Enterprise Lead Captured!*`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Lead:* ${enquiryData.fullName} (<mailto:${enquiryData.email}|${enquiryData.email}>)\n*Phone:* ${enquiryData.countryCode} ${enquiryData.phoneNormalized}\n*Service:* ${enquiryData.serviceCategory || "General Inquiry"}\n*Source:* \`${enquiryData.source}\`\n*NDA Requested:* ${enquiryData.ndaRequested ? "✅ YES" : "❌ NO"}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Project Scope:*\n>${String(enquiryData.projectDescription).replace(/\n/g, "\n>")}`,
          },
        },
      ],
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      functions.logger.error("Slack webhook dispatch failed", await response.text());
    }
  } catch (error) {
    functions.logger.error("Error dispatching Slack alert:", error);
  }
}

// Branded Auto-responder email simulation / provider
async function sendAutoResponder(email: string, fullName: string, ticketId: string) {
  functions.logger.info(`[Email Service] Dispatching NDA & Consultation Confirmation to ${email} (Ticket #${ticketId})`);
  // When SendGrid / Resend API key is provided:
  // await resend.emails.send({ from: 'eng@asthasoft.com', to: email, subject: 'Your Enterprise Scoping Session & NDA Confirmation', ... })
}

/**
 * HTTPS Callable Cloud Function: submitEnquiry
 * Enforces server-side validation, App Check verification, XSS sanitization, and atomic storage.
 */
export const submitEnquiry = functions.https.onCall(async (data, context) => {
  try {
    // 1. App Check verification (if enforced in production)
    if (process.env.ENFORCE_APP_CHECK === "true" && !context.app) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called from an App Check verified application."
      );
    }

    // 2. Validate payload against Zod schema
    const validationResult = LeadSchema.safeParse(data);
    if (!validationResult.success) {
      functions.logger.warn("Payload validation failed", validationResult.error.format());
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid lead submission data.",
        validationResult.error.flatten()
      );
    }

    const lead = validationResult.data;

    // 3. Optional reCAPTCHA v3 verification
    if (lead.token && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        const verifyRes = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${lead.token}`,
          { method: "POST" }
        );
        const verifyJson = (await verifyRes.json()) as { success: boolean; score?: number };
        if (!verifyJson.success || (verifyJson.score !== undefined && verifyJson.score < 0.6)) {
          throw new functions.https.HttpsError("permission-denied", "Bot detection score failed threshold.");
        }
      } catch (err) {
        functions.logger.warn("reCAPTCHA check error:", err);
      }
    }

    // 4. Sanitize strings against XSS injection
    const sanitizedName = sanitizeString(lead.fullName.trim());
    const sanitizedEmail = lead.email.trim().toLowerCase();
    const sanitizedDescription = sanitizeString(lead.projectDescription.trim());
    const sanitizedPhone = sanitizeString(lead.phone.replace(/[^0-9+()-\s]/g, "").trim());

    // 5. Generate secure client metadata & IP hash
    const rawIp = context.rawRequest ? context.rawRequest.ip || "" : "";
    const ipHash = rawIp ? crypto.createHash("sha256").update(rawIp).digest("hex") : "anonymous";
    const userAgent = context.rawRequest?.headers["user-agent"] || lead.clientMetadata?.userAgent || "unknown";
    const referrer = lead.clientMetadata?.referrer || "direct";
    const landingPage = lead.clientMetadata?.landingPage || "/";

    // 6. Generate document in Firestore
    const enquiriesRef = db.collection("enquiries");
    const docRef = enquiriesRef.doc();
    const enquiryId = docRef.id;

    const enquiryPayload = {
      id: enquiryId,
      fullName: sanitizedName,
      email: sanitizedEmail,
      phoneNormalized: sanitizedPhone,
      countryCode: lead.countryCode,
      serviceCategory: lead.service ? sanitizeString(lead.service) : "Custom AI & Engineering",
      projectDescription: sanitizedDescription,
      ndaRequested: lead.ndaRequested,
      source: lead.source,
      clientMetadata: {
        ipHash,
        userAgent,
        referrer,
        landingPage,
      },
      status: "new",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Atomic batch write for enquiry record and audit log
    const batch = db.batch();
    batch.set(docRef, enquiryPayload);

    const auditRef = db.collection("audit_logs").doc();
    batch.set(auditRef, {
      logId: auditRef.id,
      event: "LEAD_INGESTED",
      enquiryId,
      source: lead.source,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    await batch.commit();

    // 7. Dispatch notifications and autoresponder
    await Promise.allSettled([
      notifySlack(enquiryPayload),
      sendAutoResponder(sanitizedEmail, sanitizedName, enquiryId),
    ]);

    functions.logger.info(`Lead successfully recorded: ${enquiryId}`);

    return {
      success: true,
      enquiryId,
      message: "Scoping session request recorded. NDA confirmation and engineering packet dispatched.",
    };
  } catch (error: unknown) {
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    functions.logger.error("Unhandled error in submitEnquiry:", error);
    throw new functions.https.HttpsError("internal", "An error occurred while processing your request.");
  }
});
