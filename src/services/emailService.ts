export interface ScopingLeadEmailPayload {
  fullName: string;
  email: string;
  countryCode?: string;
  phone: string;
  service?: string;
  projectDescription?: string;
  ndaRequested?: boolean;
  source?: string;
  ticketId?: string;
  budget?: string;
  timeline?: string;
  preferredTime?: string;
}

/**
 * Dispatches scoping session lead details to ADMIN_EMAIL via:
 * 1. Primary: Server-side API bridge (/api/send-scoping-email)
 * 2. Fallback: Direct Resend API dispatch if the local bridge is unreachable (e.g., static hosting, preview ports)
 */
export async function sendLeadEmailNotification(payload: ScopingLeadEmailPayload): Promise<{ success: boolean; data?: any; error?: any }> {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'asthasofttechnologies@gmail.com';
  const resendApiKey = import.meta.env.VITE_RESEND_API_KEY || '';

  // 1. Primary Attempt: Call serverless / Vite dev middleware bridge
  try {
    const response = await fetch('/api/send-scoping-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        countryCode: payload.countryCode || '+91',
        service: payload.service || 'Custom Enterprise Software',
        projectDescription: payload.projectDescription || 'No description provided.',
        ndaRequested: payload.ndaRequested !== undefined ? payload.ndaRequested : true,
        source: payload.source || 'Request a Scoping Session Modal',
        ticketId: payload.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`,
      }),
    });

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      console.log(`[Lead Notification] Successfully dispatched to ${adminEmail} via API bridge:`, data);
      return { success: true, data };
    }

    console.warn(`[Lead Notification] Server API bridge returned status ${response.status}, triggering direct dispatch fallback...`);
  } catch (apiError) {
    console.warn('[Lead Notification] Server API bridge network error, triggering direct dispatch fallback:', apiError);
  }

  // 2. Direct Resend Fallback (guarantees delivery if API bridge route is 404 or down)
  try {
    if (resendApiKey) {
      const ticketId = payload.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;
      const fullName = payload.fullName || 'Prospective Client';
      const email = payload.email || 'Not provided';
      const countryCode = payload.countryCode || '+91';
      const phone = payload.phone || 'Not provided';
      const service = payload.service || 'Custom Enterprise Software';
      const projectDescription = payload.projectDescription || 'No description provided';
      const ndaRequested = payload.ndaRequested !== false;
      const source = payload.source || 'Asthasoft Web Portal';

      const formattedDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium',
      });

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 24px 12px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <div style="background: linear-gradient(135deg, #0066ff, #1d4ed8); padding: 24px 28px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800;">ASTHASOFT TECHNOLOGIES</h1>
              <p style="margin: 4px 0 0; color: #dbeafe; font-size: 13px;">🚀 New Scoping Session Request Captured</p>
            </div>
            <div style="padding: 28px;">
              <div style="background-color: #1e293b; border-left: 4px solid #0066ff; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px;">
                <div style="color: #94a3b8; font-size: 11px; font-weight: 700;">TICKET ID: <span style="color: #60a5fa; font-size: 14px; font-family: monospace;">${ticketId}</span></div>
                <div style="color: #cbd5e1; font-size: 12px; margin-top: 4px;">Time (IST): ${formattedDate}</div>
              </div>
              <table width="100%" cellpadding="8" cellspacing="0" border="0" style="font-size: 13px; margin-bottom: 24px;">
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td width="35%" style="color: #94a3b8; font-weight: 600;">Full Name:</td>
                  <td style="color: #ffffff; font-weight: 700;">${fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #94a3b8; font-weight: 600;">Email:</td>
                  <td><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #94a3b8; font-weight: 600;">Phone:</td>
                  <td><a href="tel:${countryCode}${phone}" style="color: #38bdf8; text-decoration: none;">${countryCode} ${phone}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #94a3b8; font-weight: 600;">Service:</td>
                  <td style="color: #facc15; font-weight: 700;">${service}</td>
                </tr>
                ${payload.budget ? `<tr style="border-bottom: 1px solid #1f2937;"><td style="color: #94a3b8; font-weight: 600;">Budget:</td><td style="color: #38bdf8; font-weight: 700;">${payload.budget}</td></tr>` : ''}
                ${payload.timeline ? `<tr style="border-bottom: 1px solid #1f2937;"><td style="color: #94a3b8; font-weight: 600;">Timeline:</td><td style="color: #cbd5e1;">${payload.timeline}</td></tr>` : ''}
                ${payload.preferredTime ? `<tr style="border-bottom: 1px solid #1f2937;"><td style="color: #94a3b8; font-weight: 600;">Preferred Call Time:</td><td style="color: #facc15; font-weight: 700;">${payload.preferredTime}</td></tr>` : ''}
                <tr style="border-bottom: 1px solid #1f2937;">
                  <td style="color: #94a3b8; font-weight: 600;">NDA Requested:</td>
                  <td style="color: ${ndaRequested ? '#34d399' : '#94a3b8'}; font-weight: 700;">
                    ${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}
                  </td>
                </tr>
                <tr>
                  <td style="color: #94a3b8; font-weight: 600;">Source:</td>
                  <td style="color: #cbd5e1; font-family: monospace;">${source}</td>
                </tr>
              </table>
              <div style="font-size: 13px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px;">Project Scope / Description:</div>
              <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; color: #e2e8f0; font-size: 13px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 24px;">
${projectDescription}
              </div>
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re:%20Asthasoft%20Project%20Scoping%20Session%20[Ticket%20${ticketId}]" style="display: inline-block; background-color: #0066ff; color: #ffffff; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
                  Reply to Client
                </a>
                <a href="tel:${countryCode}${phone}" style="display: inline-block; background-color: #10b981; color: #ffffff; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
                  Call Client
                </a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const plainText = `ASTHASOFT TECHNOLOGIES - NEW SCOPING REQUEST
Ticket ID: ${ticketId}
Time: ${formattedDate}
Full Name: ${fullName}
Email: ${email}
Phone: ${countryCode} ${phone}
Service: ${service}
${payload.budget ? `Budget: ${payload.budget}\n` : ''}${payload.timeline ? `Timeline: ${payload.timeline}\n` : ''}${payload.preferredTime ? `Preferred Call Time: ${payload.preferredTime}\n` : ''}NDA Requested: ${ndaRequested ? 'YES' : 'Standard'}
Source: ${source}

Project Description:
${projectDescription}
`;

      const directRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Asthasoft Scoping <onboarding@resend.dev>',
          to: [adminEmail],
          subject: `🚀 [New Scoping Request] ${fullName} - ${service}`,
          html: emailHtml,
          text: plainText,
          reply_to: email && email.includes('@') ? email : undefined,
        }),
      });

      const directData = await directRes.json();
      if (directRes.ok) {
        console.log(`[Lead Notification] Dispatched successfully to ${adminEmail} via Direct Resend API:`, directData);
        return { success: true, data: directData };
      } else {
        console.error('[Lead Notification] Direct Resend API returned error:', directData);
      }
    }
  } catch (directError) {
    console.error('[Lead Notification] Direct Resend fallback failed:', directError);
  }

  return { success: false, error: 'Failed to deliver notification email.' };
}
