import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

function resendDevApiPlugin(apiKey?: string, adminEmail?: string): Plugin {
  const RESEND_API_KEY = apiKey || process.env.RESEND_API_KEY || '';
  const ADMIN_EMAIL = adminEmail || process.env.ADMIN_EMAIL || 'asthasofttechnologies@gmail.com';

  return {
    name: 'resend-dev-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/send-scoping-email', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
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
            } = data;

            const formattedDate = new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'medium',
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
                        <td><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #1f2937;">
                        <td style="color: #94a3b8; font-weight: 600;">Phone:</td>
                        <td><a href="tel:${countryCode}${phone}" style="color: #38bdf8; text-decoration: none;">${countryCode} ${phone}</a></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #1f2937;">
                        <td style="color: #94a3b8; font-weight: 600;">Service:</td>
                        <td style="color: #facc15; font-weight: 700;">${service}</td>
                      </tr>
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

            const resendRes = await fetch('https://api.resend.com/emails', {
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

            const resendData = await resendRes.json();
            res.statusCode = resendRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(resendData));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';
  const adminEmail = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'asthasofttechnologies@gmail.com';

  return {
    plugins: [react(), resendDevApiPlugin(apiKey, adminEmail)],
    base: '/',
  };
});

