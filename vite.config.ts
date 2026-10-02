import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import {
  getServiceDetails,
  renderCustomerAutoReplyHtml,
  renderCustomerAutoReplyPlainText,
  type ScopingSessionLead,
} from './src/emails/templates.ts'

function resendDevApiPlugin(apiKey?: string, adminEmail?: string, fromEmail?: string): Plugin {
  return {
    name: 'resend-dev-api-middleware',
    configureServer(server) {
      const emailHandler = async (req: any, res: any) => {
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
        req.on('data', (chunk: any) => {
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

            const targetAdminEmail = process.env.ADMIN_EMAIL || adminEmail || 'hostelsuthar@gmail.com';
            const targetApiKey = process.env.RESEND_API_KEY || apiKey || '';
            const targetFromEmail = process.env.RESEND_FROM_EMAIL || fromEmail || 'AsthaSoft Technologies <sales@asthapay.in>';

            const formattedDate = new Date().toLocaleString('en-US', {
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'medium',
            });

            console.log(`\n📨 [Scoping Email Dispatcher] Preparing lead alert for ${fullName} (${email}) -> Sending to ${targetAdminEmail}`);

            const plainText = `ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET & INTAKE DETAILS
Ticket ID      : ${ticketId}
Date & Time    : ${formattedDate}
Source Channel : ${source}

CLIENT INFORMATION
Full Name      : ${fullName}
Email Address  : ${email}
Phone Number   : ${countryCode} ${phone}

PROJECT SPECIFICATIONS
Service Needed : ${service}
${budget ? `Estimated Budget: ${budget}\n` : ''}${timeline ? `Delivery Target : ${timeline}\n` : ''}${preferredTime ? `Preferred Time  : ${preferredTime}\n` : ''}NDA Status     : ${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}

PROJECT SCOPE & REQUIREMENTS
${projectDescription}

DIRECT ACTIONS
- Reply Email : ${email}
- Direct Call : ${countryCode} ${phone}

Sent automatically by Asthasoft Technologies Lead Intake System.
`;

            const safePhoneClean = `${countryCode}${phone}`.replace(/[^0-9+]/g, '');
            const htmlVersion = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Inquiry: ${fullName} - ${service}</title>
</head>
<body style="margin: 0; padding: 24px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827; white-space: pre-wrap; word-break: break-word;">ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET &amp; INTAKE DETAILS
Ticket ID      : ${ticketId}
Date &amp; Time    : ${formattedDate}
Source Channel : ${source}

CLIENT INFORMATION
Full Name      : ${fullName}
Email Address  : <a href="mailto:${email}" style="color: #2563eb; text-decoration: underline;">${email}</a>
Phone Number   : <a href="tel:${safePhoneClean}" style="color: #2563eb; text-decoration: underline;">${countryCode} ${phone}</a>

PROJECT SPECIFICATIONS
Service Needed : ${service}
${budget ? `Estimated Budget: ${budget}\n` : ''}${timeline ? `Delivery Target : ${timeline}\n` : ''}${preferredTime ? `Preferred Time  : ${preferredTime}\n` : ''}NDA Status     : ${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}

PROJECT SCOPE &amp; REQUIREMENTS
${projectDescription}

DIRECT ACTIONS
- Reply Email : <a href="mailto:${email}" style="color: #2563eb; text-decoration: underline;">${email}</a>
- Direct Call : <a href="tel:${safePhoneClean}" style="color: #2563eb; text-decoration: underline;">${countryCode} ${phone}</a>

Sent automatically by Asthasoft Technologies Lead Intake System.</div>
</body>
</html>`;

            const isRealCustomerEmail = email && email.includes('@') && !email.includes('instant') && !email.includes('n/a');
            const serviceInfo = getServiceDetails(service);
            const leadData: ScopingSessionLead = {
              name: fullName,
              email: isRealCustomerEmail ? email : 'noreply-lead@asthasoftindia.com',
              contactNumber: `${countryCode} ${phone}`,
              serviceRequired: service,
              projectDescription,
              requestNDA: ndaRequested,
              ticketId,
              timestamp: formattedDate,
              source,
              budget,
              timeline,
              preferredTime,
            };

            const customerHtml = renderCustomerAutoReplyHtml(leadData);
            const customerPlainText = renderCustomerAutoReplyPlainText(leadData);
            const customerSubject = `Your Inquiry: ${serviceInfo.title} with AsthaSoft`;

            // 1. Send Internal Lead Alert to Admin
            const adminRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${targetApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: targetFromEmail,
                to: [targetAdminEmail],
                subject: `New Client Inquiry: ${fullName} - ${service}`,
                text: plainText,
                html: htmlVersion,
                reply_to: isRealCustomerEmail ? email : undefined,
              }),
            });

            const adminData = (await adminRes.json()) as any;
            if (adminRes.ok) {
              console.log(`✅ [Scoping Email Dispatcher] Admin alert delivered to ${targetAdminEmail}! Resend ID: ${adminData.id}`);
            } else {
              console.error(`❌ [Scoping Email Dispatcher] Admin alert Resend API Error:`, adminData);
            }

            // 2. Dispatch Customer Auto-Reply Email with service info
            let customerData: any = null;
            let customerSuccess = false;
            if (isRealCustomerEmail) {
              try {
                const customerRes = await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${targetApiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: targetFromEmail,
                    to: [email],
                    subject: customerSubject,
                    text: customerPlainText,
                    html: customerHtml,
                    reply_to: targetAdminEmail,
                  }),
                });
                customerData = (await customerRes.json()) as any;
                customerSuccess = customerRes.ok;
                if (customerRes.ok) {
                  console.log(`✅ [Scoping Email Dispatcher] Customer auto-reply delivered to ${email}! Resend ID: ${customerData.id}`);
                } else {
                  console.log(`ℹ️ [Scoping Email Dispatcher] Customer auto-reply notice (${email}): ${customerData.message || 'Resend sandbox restricted to account owner until custom domain verified.'}`);
                }
              } catch (custErr: any) {
                console.error(`❌ [Scoping Email Dispatcher] Customer auto-reply failed:`, custErr);
              }
            }

            res.statusCode = adminRes.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                ...adminData,
                success: adminRes.ok,
                adminEmail: targetAdminEmail,
                customerEmail: isRealCustomerEmail ? (customerSuccess ? 'sent' : 'sandbox_skipped') : 'not_requested',
                serviceTitle: serviceInfo.title,
              })
            );
          } catch (err: any) {
            console.error('❌ [Scoping Email Dispatcher] Internal error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message, success: false }));
          }
        });
      };

      server.middlewares.use('/api/send-scoping-email.php', emailHandler);
      server.middlewares.use('/api/send-scoping-email', emailHandler);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY || '';
  const adminEmail = env.ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'hostelsuthar@gmail.com';
  const fromEmail = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'AsthaSoft Technologies <sales@asthapay.in>';

  return {
    plugins: [react(), resendDevApiPlugin(apiKey, adminEmail, fromEmail)],
    base: '/',
  };
});
