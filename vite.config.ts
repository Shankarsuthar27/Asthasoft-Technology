import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

function resendDevApiPlugin(apiKey?: string, adminEmail?: string): Plugin {
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
              budget,
              timeline,
              preferredTime,
            } = data;

            const targetAdminEmail = process.env.ADMIN_EMAIL || adminEmail || 'asthasofttechnologies@gmail.com';
            const targetApiKey = process.env.RESEND_API_KEY || apiKey || '';

            const formattedDate = new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'medium',
            });

            console.log(`\n📨 [Scoping Email Dispatcher] Preparing lead alert for ${fullName} (${email}) -> Sending to ${targetAdminEmail}`);

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
                      ${budget ? `<tr><td style="color: #64748b; font-weight: 500; vertical-align: top;">Budget</td><td style="color: #0f172a; font-weight: 500;">${budget}</td></tr>` : ''}
                      ${timeline ? `<tr><td style="color: #64748b; font-weight: 500; vertical-align: top;">Timeline</td><td style="color: #0f172a; font-weight: 500;">${timeline}</td></tr>` : ''}
                      ${preferredTime ? `<tr><td style="color: #64748b; font-weight: 500; vertical-align: top;">Preferred Time</td><td style="color: #0f172a; font-weight: 500;">${preferredTime}</td></tr>` : ''}
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
${budget ? `Budget: ${budget}\n` : ''}${timeline ? `Timeline: ${timeline}\n` : ''}${preferredTime ? `Preferred Call Time: ${preferredTime}\n` : ''}NDA Requested: ${ndaRequested ? 'YES' : 'Standard'}
Source: ${source}

Project Description:
${projectDescription}
`;

            const resendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${targetApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: 'Asthasoft Scoping <onboarding@resend.dev>',
                to: [targetAdminEmail],
                subject: `New Scoping Request: ${fullName} - ${service}`,
                html: emailHtml,
                text: plainText,
                reply_to: email && email.includes('@') ? email : undefined,
              }),
            });

            const resendData = (await resendRes.json()) as any;
            if (resendRes.ok) {
              console.log(`✅ [Scoping Email Dispatcher] Delivered to ${targetAdminEmail}! Resend ID: ${resendData.id}`);
            } else {
              console.error(`❌ [Scoping Email Dispatcher] Resend API Error:`, resendData);
            }

            res.statusCode = resendRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(resendData));
          } catch (err: any) {
            console.error('❌ [Scoping Email Dispatcher] Internal error:', err);
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
