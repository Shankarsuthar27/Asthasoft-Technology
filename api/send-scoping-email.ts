const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'asthasofttechnologies@gmail.com';

export default async function handler(req: any, res: any) {
  // Set CORS headers so local and staging origins can communicate freely
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      fullName = 'Not provided',
      email = 'Not provided',
      countryCode = '+91',
      phone = 'Not provided',
      service = 'Custom Enterprise Software',
      projectDescription = 'No project description provided',
      ndaRequested = true,
      source = 'Request a Scoping Session Modal',
      ticketId = `ASTHA-${Date.now().toString(36).toUpperCase()}`,
    } = body || {};

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
        <title>New Scoping Session Request</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; color: #f8fafc; padding: 24px 12px; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, #0066ff 0%, #1d4ed8 100%); padding: 24px 28px; text-align: left;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 0.5px;">ASTHASOFT TECHNOLOGIES</h1>
                  <p style="margin: 4px 0 0 0; color: #dbeafe; font-size: 13px; font-weight: 500;">🚀 New Scoping Session Request Captured</p>
                </td>
                <td align="right">
                  <span style="display: inline-block; background-color: rgba(255,255,255,0.2); color: #ffffff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">
                    LEAD ALERT
                  </span>
                </td>
              </tr>
            </table>
          </div>

          <!-- Body Content -->
          <div style="padding: 28px;">
            <!-- Ticket Info Pill -->
            <div style="background-color: #1e293b; border-left: 4px solid #0066ff; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Ticket ID</span>
                    <div style="color: #60a5fa; font-size: 15px; font-weight: 700; font-family: monospace;">${ticketId}</div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Time (IST)</span>
                    <div style="color: #cbd5e1; font-size: 12px;">${formattedDate}</div>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Client Details Section -->
            <h3 style="color: #f1f5f9; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; border-bottom: 1px solid #1f2937; padding-bottom: 6px;">
              Client Information
            </h3>

            <table width="100%" cellpadding="8" cellspacing="0" border="0" style="margin-bottom: 24px; font-size: 13px;">
              <tr style="border-bottom: 1px solid #1f2937;">
                <td width="35%" style="color: #94a3b8; font-weight: 600;">Full Name:</td>
                <td style="color: #ffffff; font-weight: 700;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Email Address:</td>
                <td>
                  <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-weight: 600;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Phone Number:</td>
                <td style="color: #ffffff; font-weight: 600;">
                  <a href="tel:${countryCode}${phone}" style="color: #38bdf8; text-decoration: none;">${countryCode} ${phone}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Requested Service:</td>
                <td style="color: #facc15; font-weight: 700;">${service}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f2937;">
                <td style="color: #94a3b8; font-weight: 600;">Mutual NDA Status:</td>
                <td>
                  <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; background-color: ${
                    ndaRequested ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)'
                  }; color: ${ndaRequested ? '#34d399' : '#94a3b8'};">
                    ${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}
                  </span>
                </td>
              </tr>
              <tr>
                <td style="color: #94a3b8; font-weight: 600;">Acquisition Source:</td>
                <td style="color: #cbd5e1; font-family: monospace; font-size: 12px;">${source}</td>
              </tr>
            </table>

            <!-- Project Scope / Description Box -->
            <h3 style="color: #f1f5f9; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px 0; border-bottom: 1px solid #1f2937; padding-bottom: 6px;">
              Project Scope & Requirements
            </h3>
            <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; color: #e2e8f0; font-size: 13px; line-height: 1.6; white-space: pre-wrap; margin-bottom: 28px;">
${projectDescription}
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center;">
              <a href="mailto:${email}?subject=Re:%20Asthasoft%20Project%20Scoping%20Session%20[Ticket%20${ticketId}]" style="display: inline-block; background-color: #0066ff; color: #ffffff; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-right: 8px;">
                Reply to Client (${email})
              </a>
              <a href="tel:${countryCode}${phone}" style="display: inline-block; background-color: #10b981; color: #ffffff; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
                Call Client Directly
              </a>
            </div>

          </div>

          <!-- Footer Note -->
          <div style="background-color: #0b0f19; padding: 16px 28px; border-top: 1px solid #1f2937; text-align: center; color: #64748b; font-size: 11px;">
            Asthasoft Technologies Lead Capture System · Automated Transmission via Resend
          </div>
        </div>
      </body>
      </html>
    `;

    // Dispatch via Resend HTTP API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Asthasoft Scoping <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: `🚀 [New Scoping Request] ${fullName} - ${service}`,
        html: emailHtml,
        reply_to: email && email.includes('@') ? email : undefined,
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error('Resend API Error:', resendData);
      return res.status(resendResponse.status).json({
        success: false,
        error: resendData.message || 'Failed to dispatch email via Resend',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Scoping session details dispatched to admin email successfully.',
      resendId: resendData.id,
      ticketId,
    });
  } catch (error: any) {
    console.error('Server error processing scoping email:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
