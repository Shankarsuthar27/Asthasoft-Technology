export interface ScopingSessionLead {
  name: string;
  email: string;
  contactNumber: string;
  serviceRequired: string;
  projectDescription: string;
  requestNDA: boolean;
  timestamp?: string;
  ticketId?: string;
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
 * Internal Sales Notification Email (HTML Template)
 * Sent to: sales@asthasoftindia.com
 * Subject: 🚨 New Lead [Scoping Session]: ${name} - ${serviceRequired}
 */
export function renderInternalSalesNotificationHtml(data: ScopingSessionLead): string {
  const safeName = escapeHtml(data.name || 'Not Provided');
  const safeEmail = escapeHtml(data.email || 'Not Provided');
  const safePhone = escapeHtml(data.contactNumber || 'Not Provided');
  const safeService = escapeHtml(data.serviceRequired || 'Custom Enterprise Software');
  const safeDescription = escapeHtml(data.projectDescription || 'No description provided');
  const ticketId = data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const ndaBadge = data.requestNDA
    ? `<span style="background-color: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px;">YES — Send Mutual NDA First</span>`
    : `<span style="background-color: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; padding: 4px 10px; border-radius: 4px; font-weight: 500; font-size: 12px;">No NDA Requested (Standard)</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Scoping Session Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background-color: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #0f172a; padding: 24px 30px; border-bottom: 4px solid #2563eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      Internal Sales Alert
                    </div>
                    <div style="color: #ffffff; font-size: 20px; font-weight: 700; margin-top: 4px;">
                      New Scoping Session Submission
                    </div>
                  </td>
                  <td align="right">
                    <span style="background-color: #1e293b; color: #94a3b8; font-size: 11px; padding: 4px 8px; border-radius: 4px;">
                      ${ticketId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 30px;">
              
              <!-- Quick Action Bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <a href="mailto:${safeEmail}?subject=Re:%20AsthaSoft%20Scoping%20Session%20-%20${encodeURIComponent(safeService)}" 
                       style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 10px;">
                      ✉️ Reply to ${safeName}
                    </a>
                    <a href="tel:${safePhone.replace(/\s+/g, '')}" 
                       style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">
                      📞 Call ${safePhone}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Lead Info Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e2e8f0; border-radius: 8px; border-collapse: separate; margin-bottom: 24px;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #64748b; width: 35%;">FIELD</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #64748b;">SUBMITTED VALUE</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Client Name</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Email Address</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0284c7;">
                    <a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Contact Number</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">Service Required</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${safeService}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #64748b;">NDA Status</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 14px;">${ndaBadge}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 14px; color: #64748b;">Timestamp (IST)</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #475569;">${timestamp}</td>
                </tr>
              </table>

              <!-- Project Description Panel -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">
                  Project Description &amp; Scope:
                </div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${safeDescription}</div>
              </div>

              <!-- Internal Checklist -->
              <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 14px 18px;">
                <div style="font-size: 12px; font-weight: 700; color: #1e40af; text-transform: uppercase; margin-bottom: 6px;">
                  Next Sales Steps:
                </div>
                <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1e3a8a; line-height: 1.6;">
                  <li>Assign dedicated Solution Architect based on service (${safeService}).</li>
                  ${data.requestNDA ? '<li><strong>Generate & attach standard Mutual NDA before technical call.</strong></li>' : ''}
                  <li>Contact lead within 24 hours via phone or priority email.</li>
                </ul>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 16px 30px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
              AsthaSoft Lead Ingestion Engine · Internal Notification · sales@asthasoftindia.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
