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
      budget,
      timeline,
      preferredTime,
    } = body || {};

    const formattedDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

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

    // Dispatch via Resend HTTP API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Asthasoft Technologies <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: `New Client Inquiry: ${fullName} - ${service}`,
        text: plainText,
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
      adminEmail: ADMIN_EMAIL,
    });
  } catch (error: any) {
    console.error('Server error processing scoping email:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
