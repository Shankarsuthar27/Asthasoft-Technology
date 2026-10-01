export interface ScopingSessionLead {
  name: string;
  email: string;
  contactNumber: string;
  serviceRequired: string;
  projectDescription: string;
  requestNDA: boolean;
  timestamp?: string;
  ticketId?: string;
  source?: string;
  budget?: string;
  timeline?: string;
  preferredTime?: string;
}

/**
 * Escapes HTML characters to prevent XSS in email clients
 */
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Customer Auto-Reply Email (HTML Template)
 * Sent to: ${email}
 * Subject: Your Scoping Session Request with AsthaSoft
 */
export function renderCustomerAutoReplyHtml(data: ScopingSessionLead): string {
  const safeName = escapeHtml(data.name || 'Valued Partner');
  const safeService = escapeHtml(data.serviceRequired || 'Custom Enterprise Software');
  const safeDescription = escapeHtml(data.projectDescription || 'No description provided');
  const safePhone = escapeHtml(data.contactNumber || 'Not provided');
  const ticketId = data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;

  // Conditional NDA section - rendered only if requestNDA is true
  const ndaSection = data.requestNDA
    ? `
    <div style="margin: 24px 0; padding: 18px 20px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 6px;">
      <div style="display: flex; align-items: center; margin-bottom: 6px;">
        <span style="font-weight: 700; color: #166534; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          ✓ Non-Disclosure Agreement (NDA) Requested
        </span>
      </div>
      <p style="margin: 0; color: #15803d; font-size: 14px; line-height: 1.6;">
        We have noted your request for a Non-Disclosure Agreement. Prior to scheduling in-depth architectural reviews or discussing proprietary technical specifics, our compliance team will provide a countersigned Mutual NDA to ensure your intellectual property is completely safeguarded.
      </p>
    </div>
    `
    : `
    <div style="margin: 20px 0; padding: 14px 18px; background-color: #f8fafc; border-left: 4px solid #94a3b8; border-radius: 6px;">
      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
        <strong>Confidentiality Notice:</strong> All project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.
      </p>
    </div>
    `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Scoping Session Request with AsthaSoft</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e2e8f0;">
          
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0A1128 0%, #101F42 100%); padding: 36px 36px 28px 36px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                      Astha<span style="color: #38bdf8;">Soft</span>
                    </div>
                    <div style="font-size: 12px; font-weight: 500; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px;">
                      Enterprise Software &amp; Cloud Engineering
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 6px 12px; background-color: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; font-size: 11px; font-weight: 600; color: #38bdf8;">
                      Ticket #${ticketId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 36px;">
              <!-- Headline -->
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                Your Scoping Session Request Has Been Received
              </h1>

              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Dear <strong>${safeName}</strong>,
              </p>

              <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Thank you for contacting <strong>AsthaSoft</strong>. We have successfully received your request for a strategic scoping session regarding <strong style="color: #0284c7;">${safeService}</strong>.
              </p>

              <!-- SLA Commitment Box -->
              <div style="margin: 20px 0; padding: 18px 20px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 6px;">
                <p style="margin: 0; color: #0369a1; font-size: 14px; line-height: 1.6; font-weight: 500;">
                  ⏱ <strong>Response Commitment:</strong> A dedicated strategic consultant and technical architect will review your project scope and respond with technical insights within <strong>24 hours</strong>.
                </p>
              </div>

              <!-- Conditional NDA Paragraph -->
              ${ndaSection}

              <!-- Submission Summary Panel -->
              <div style="margin: 28px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #f8fafc; padding: 12px 18px; border-bottom: 1px solid #e2e8f0; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">
                  Summary of Submitted Requirements
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 16px 18px; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; width: 140px;">Service Requested:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${safeService}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b;">Contact Number:</td>
                    <td style="padding: 6px 0; color: #0f172a; font-weight: 500;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #64748b; vertical-align: top;">Project Scope:</td>
                    <td style="padding: 6px 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${safeDescription}</td>
                  </tr>
                </table>
              </div>

              <p style="margin: 0 0 24px 0; font-size: 14px; color: #475569; line-height: 1.6;">
                If you have immediate questions, additional technical documents, or architecture diagrams you would like us to review ahead of our call, simply reply directly to this email.
              </p>

              <!-- Sign-off -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-size: 15px; font-weight: 700; color: #0f172a;">
                  Strategic Consulting &amp; Engineering Team
                </p>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
                  AsthaSoft Technologies · Enterprise Solutions
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 36px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b;">
                © ${new Date().getFullYear()} AsthaSoft Technologies. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                ISO-Aligned Architecture · Strict NDA Security · Guaranteed 100% IP Transfer
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generates the clean Plain Text representation of the lead alert email
 * matching the user's expected deployment template.
 */
export function renderInternalLeadPlainText(data: ScopingSessionLead): string {
  const name = data.name || 'Not provided';
  const email = data.email || 'Not provided';
  const phone = data.contactNumber || 'Not provided';
  const service = data.serviceRequired || 'Custom Enterprise Software';
  const description = data.projectDescription || 'No description provided';
  const ticketId = data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });
  const source = data.source || 'Header CTA';
  const ndaText = data.requestNDA ? 'YES · Formal NDA Requested' : 'Standard Confidentiality';

  let extraSpecs = '';
  if (data.budget) extraSpecs += `Estimated Budget: ${data.budget}\n`;
  if (data.timeline) extraSpecs += `Delivery Target : ${data.timeline}\n`;
  if (data.preferredTime) extraSpecs += `Preferred Time  : ${data.preferredTime}\n`;

  return `ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET & INTAKE DETAILS
Ticket ID      : ${ticketId}
Date & Time    : ${timestamp}
Source Channel : ${source}

CLIENT INFORMATION
Full Name      : ${name}
Email Address  : ${email}
Phone Number   : ${phone}

PROJECT SPECIFICATIONS
Service Needed : ${service}
${extraSpecs}NDA Status     : ${ndaText}

PROJECT SCOPE & REQUIREMENTS
${description}

DIRECT ACTIONS
- Reply Email : ${email}
- Direct Call : ${phone}

Sent automatically by Asthasoft Technologies Lead Intake System.
`;
}

/**
 * Internal Lead Alert Email (HTML Template)
 * Styled with exact spacing and font matching the user's plain-text reference image.
 */
export function renderInternalSalesNotificationHtml(data: ScopingSessionLead): string {
  const safeName = escapeHtml(data.name || 'Not provided');
  const safeEmail = escapeHtml(data.email || 'Not provided');
  const safePhone = escapeHtml(data.contactNumber || 'Not provided');
  const safePhoneClean = (data.contactNumber || '').replace(/[^0-9+]/g, '');
  const safeService = escapeHtml(data.serviceRequired || 'Custom Enterprise Software');
  const safeDescription = escapeHtml(data.projectDescription || 'No description provided');
  const ticketId = escapeHtml(data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`);
  const timestamp = escapeHtml(data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  }));
  const safeSource = escapeHtml(data.source || 'Header CTA');
  const ndaText = data.requestNDA ? 'YES · Formal NDA Requested' : 'Standard Confidentiality';

  let extraSpecs = '';
  if (data.budget) extraSpecs += `Estimated Budget: ${escapeHtml(data.budget)}\n`;
  if (data.timeline) extraSpecs += `Delivery Target : ${escapeHtml(data.timeline)}\n`;
  if (data.preferredTime) extraSpecs += `Preferred Time  : ${escapeHtml(data.preferredTime)}\n`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Inquiry: ${safeName} - ${safeService}</title>
</head>
<body style="margin: 0; padding: 24px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827; white-space: pre-wrap; word-break: break-word;">ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET &amp; INTAKE DETAILS
Ticket ID      : ${ticketId}
Date &amp; Time    : ${timestamp}
Source Channel : ${safeSource}

CLIENT INFORMATION
Full Name      : ${safeName}
Email Address  : <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
Phone Number   : <a href="tel:${safePhoneClean}" style="color: #2563eb; text-decoration: underline;">${safePhone}</a>

PROJECT SPECIFICATIONS
Service Needed : ${safeService}
${extraSpecs}NDA Status     : ${ndaText}

PROJECT SCOPE &amp; REQUIREMENTS
${safeDescription}

DIRECT ACTIONS
- Reply Email : <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
- Direct Call : <a href="tel:${safePhoneClean}" style="color: #2563eb; text-decoration: underline;">${safePhone}</a>

Sent automatically by Asthasoft Technologies Lead Intake System.</div>
</body>
</html>`;
}

