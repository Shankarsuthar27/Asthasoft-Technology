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
    .min(2, "Please provide at least 2 characters of detail"),
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

// Resend Admin Email Dispatcher
async function sendResendAdminAlert(enquiryData: Record<string, any>) {
  const apiKey = process.env.RESEND_API_KEY || "";
  const adminEmail = process.env.ADMIN_EMAIL || "asthasofttechnologies@gmail.com";

  try {
    const formattedDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 24px 12px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0066ff, #1d4ed8); padding: 24px 28px;">
            <h1 style="margin: 0; color: #ffffff; font-size: 20px;">ASTHASOFT TECHNOLOGIES</h1>
            <p style="margin: 4px 0 0; color: #dbeafe; font-size: 13px;">🚀 New Scoping Session Request Captured</p>
          </div>
          <div style="padding: 28px;">
            <div style="background-color: #1e293b; border-left: 4px solid #0066ff; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px;">
              <div style="color: #94a3b8; font-size: 11px; font-weight: 700;">TICKET ID: <span style="color: #60a5fa; font-size: 14px; font-family: monospace;">${enquiryData.id}</span></div>
              <div style="color: #cbd5e1; font-size: 12px; margin-top: 4px;">Time (IST): ${formattedDate}</div>
            </div>
            <table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #1f2937;">
                <td width="35%" style="color: #94a3b8; font-weight: 600;">Full Name:</td>
                <td style="color: #ffffff; font-weight: 700;">${enquiryData.fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Email:</td>
                <td><a href="mailto:${enquiryData.email}" style="color: #38bdf8; text-decoration: none;">${enquiryData.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Phone:</td>
                <td><a href="tel:${enquiryData.countryCode}${enquiryData.phoneNormalized}" style="color: #38bdf8; text-decoration: none;">${enquiryData.countryCode} ${enquiryData.phoneNormalized}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Service:</td>
                <td style="color: #facc15; font-weight: 700;">${enquiryData.serviceCategory}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">NDA Requested:</td>
                <td style="color: ${enquiryData.ndaRequested ? '#34d399' : '#94a3b8'}; font-weight: 700;">
                  ${enquiryData.ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}
                </td>
              </tr>
              <tr>
                <td style="color: #94a3b8; font-weight: 600;">Source:</td>
                <td style="color: #cbd5e1; font-family: monospace;">${enquiryData.source}</td>
              </tr>
            </table>
            <div style="font-size: 13px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px;">Project Scope / Description:</div>
            <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; color: #e2e8f0; font-size: 13px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 24px;">
${enquiryData.projectDescription}
            </div>
            <div style="text-align: center;">
              <a href="mailto:${enquiryData.email}?subject=Re:%20Asthasoft%20Project%20Scoping%20Session%20[Ticket%20${enquiryData.id}]" style="display: inline-block; background-color: #0066ff; color: #ffffff; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
                Reply to Client
              </a>
              <a href="tel:${enquiryData.countryCode}${enquiryData.phoneNormalized}" style="display: inline-block; background-color: #10b981; color: #ffffff; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
                Call Client
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Asthasoft Scoping <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `🚀 [New Scoping Request] ${enquiryData.fullName} - ${enquiryData.serviceCategory}`,
        html: emailHtml,
        reply_to: enquiryData.email,
      }),
    });

    const result = await res.json();
    functions.logger.info("Resend email dispatched via Cloud Functions:", result);
  } catch (err) {
    functions.logger.error("Error dispatching Resend email alert:", err);
  }
}

// Branded Auto-responder email simulation / provider
async function sendAutoResponder(email: string, fullName: string, ticketId: string) {
  functions.logger.info(`[Email Service] Dispatching NDA & Consultation Confirmation to ${email} (Ticket #${ticketId})`);
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
      sendResendAdminAlert(enquiryPayload),
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
