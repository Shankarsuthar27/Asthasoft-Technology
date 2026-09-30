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

            const plainText = `ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET & INTAKE DETAILS
Ticket ID       : ${ticketId}
Date & Time     : ${formattedDate}
Source Channel  : ${source}

CLIENT INFORMATION
Full Name       : ${fullName}
Email Address   : ${email}
Phone Number    : ${countryCode} ${phone}

PROJECT SPECIFICATIONS
Service Needed  : ${service}
${budget ? `Estimated Budget: ${budget}\n` : ''}${timeline ? `Delivery Target : ${timeline}\n` : ''}${preferredTime ? `Preferred Time  : ${preferredTime}\n` : ''}NDA Status      : ${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}

PROJECT SCOPE & REQUIREMENTS
${projectDescription}

DIRECT ACTIONS
- Reply Email : ${email}
- Direct Call : ${countryCode} ${phone}

Sent automatically by Asthasoft Technologies Lead Intake System.
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
                subject: `🚀 [New Scoping Request] ${fullName} - ${service}`,
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
