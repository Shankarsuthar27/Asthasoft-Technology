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
<body style="font-family: Arial, sans-serif; background-color: #f4f4f5; color: #333333; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #0066ff; padding: 20px;">
      <h1 style="margin: 0; color: #ffffff; font-size: 18px;">ASTHASOFT TECHNOLOGIES</h1>
      <p style="margin: 5px 0 0; color: #e0e7ff; font-size: 14px;">New Scoping Session Request</p>
    </div>

    <!-- Content -->
    <div style="padding: 20px;">
      <p style="margin: 0 0 20px; font-size: 14px; color: #666666;">
        <strong>Ticket ID:</strong> ${ticketId} <br>
        <strong>Time (IST):</strong> ${formattedDate}
      </p>

      <table width="100%" cellpadding="10" cellspacing="0" border="0" style="font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #eeeeee;">
          <td width="35%" style="color: #666666;"><strong>Full Name:</strong></td>
          <td>${fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eeeeee;">
          <td style="color: #666666;"><strong>Email:</strong></td>
          <td><a href="mailto:${email}" style="color: #0066ff; text-decoration: none;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eeeeee;">
          <td style="color: #666666;"><strong>Phone:</strong></td>
          <td><a href="tel:${countryCode}${phone}" style="color: #0066ff; text-decoration: none;">${countryCode} ${phone}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eeeeee;">
          <td style="color: #666666;"><strong>Service:</strong></td>
          <td>${service}</td>
        </tr>
        ${payload.budget ? `<tr style="border-bottom: 1px solid #eeeeee;"><td style="color: #666666;"><strong>Budget:</strong></td><td>${payload.budget}</td></tr>` : ''}
        ${payload.timeline ? `<tr style="border-bottom: 1px solid #eeeeee;"><td style="color: #666666;"><strong>Timeline:</strong></td><td>${payload.timeline}</td></tr>` : ''}
        ${payload.preferredTime ? `<tr style="border-bottom: 1px solid #eeeeee;"><td style="color: #666666;"><strong>Preferred Time:</strong></td><td>${payload.preferredTime}</td></tr>` : ''}
        <tr style="border-bottom: 1px solid #eeeeee;">
          <td style="color: #666666;"><strong>NDA Requested:</strong></td>
          <td>${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}</td>
        </tr>
        <tr>
          <td style="color: #666666;"><strong>Source:</strong></td>
          <td>${source}</td>
        </tr>
      </table>

      <h3 style="font-size: 14px; margin: 0 0 10px; color: #333333;">Project Scope / Description:</h3>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; font-size: 14px; line-height: 1.5; white-space: pre-wrap; margin-bottom: 20px; color: #444444;">${projectDescription}</div>

      <!-- Action Buttons -->
      <div>
        <a href="mailto:${email}?subject=Re:%20Asthasoft%20Project%20Scoping%20Session%20[Ticket%20${ticketId}]" style="display: inline-block; background-color: #0066ff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 14px; font-weight: bold; margin-right: 10px;">Reply to Client</a>
        <a href="tel:${countryCode}${phone}" style="display: inline-block; background-color: #ffffff; color: #333333; border: 1px solid #cccccc; text-decoration: none; padding: 9px 20px; border-radius: 6px; font-size: 14px; font-weight: bold;">Call Client</a>
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
