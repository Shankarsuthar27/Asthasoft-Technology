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
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Lead - Asthasoft Technologies</title>
        </head>
        <body style="margin: 0; padding: 24px 12px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5;">
          <div style="max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            
            <!-- Header -->
            <div style="background-color: #0f172a; padding: 20px 24px; border-bottom: 3px solid #2563eb;">
              <h2 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: 0.5px;">ASTHASOFT TECHNOLOGIES</h2>
              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">New Project Scoping Lead</p>
            </div>

            <!-- Body -->
            <div style="padding: 24px;">
              
              <div style="margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
                <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Ticket #${ticketId}</span>
                <h3 style="margin: 4px 0 0 0; font-size: 16px; color: #0f172a;">${fullName} requested a scoping consultation</h3>
              </div>

              <!-- Details -->
              <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; margin-bottom: 20px;">
                <tr>
                  <td width="35%" style="color: #64748b; font-weight: 500; vertical-align: top;">Client Name</td>
                  <td style="color: #0f172a; font-weight: 600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 500; vertical-align: top;">Email</td>
                  <td><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 500; vertical-align: top;">Phone</td>
                  <td><a href="tel:${countryCode}${phone}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${countryCode} ${phone}</a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 500; vertical-align: top;">Service</td>
                  <td style="color: #0f172a; font-weight: 600;">${service}</td>
                </tr>
                ${payload.budget ? `<tr><td style="color: #64748b; font-weight: 500; vertical-align: top;">Budget</td><td style="color: #0f172a; font-weight: 500;">${payload.budget}</td></tr>` : ''}
                ${payload.timeline ? `<tr><td style="color: #64748b; font-weight: 500; vertical-align: top;">Timeline</td><td style="color: #0f172a; font-weight: 500;">${payload.timeline}</td></tr>` : ''}
                ${payload.preferredTime ? `<tr><td style="color: #64748b; font-weight: 500; vertical-align: top;">Preferred Time</td><td style="color: #0f172a; font-weight: 500;">${payload.preferredTime}</td></tr>` : ''}
                <tr>
                  <td style="color: #64748b; font-weight: 500; vertical-align: top;">NDA Status</td>
                  <td style="color: #0f172a;">${ndaRequested ? 'Yes (Formal NDA requested)' : 'Standard Confidentiality'}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 500; vertical-align: top;">Source</td>
                  <td style="color: #64748b; font-size: 13px;">${source}</td>
                </tr>
              </table>

              <!-- Requirements -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 6px;">Project Requirements:</div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 14px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${projectDescription}</div>
              </div>

              <!-- Actions -->
              <div style="padding-top: 8px;">
                <a href="mailto:${email}?subject=Re:%20Asthasoft%20Project%20Scoping%20Session%20[Ticket%20${ticketId}]" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; padding: 10px 18px; border-radius: 6px; text-decoration: none; margin-right: 10px;">
                  Reply to Client
                </a>
                <a href="tel:${countryCode}${phone}" style="display: inline-block; background-color: #f1f5f9; color: #0f172a; font-size: 14px; font-weight: 600; padding: 10px 18px; border-radius: 6px; text-decoration: none; border: 1px solid #cbd5e1;">
                  Call Client
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 12px 24px; font-size: 12px; color: #94a3b8; text-align: center;">
              Received on ${formattedDate} · Asthasoft Technologies
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
          subject: `New Scoping Request: ${fullName} - ${service}`,
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
