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
${payload.budget ? `Estimated Budget: ${payload.budget}\n` : ''}${payload.timeline ? `Delivery Target : ${payload.timeline}\n` : ''}${payload.preferredTime ? `Preferred Time  : ${payload.preferredTime}\n` : ''}NDA Status      : ${ndaRequested ? 'YES · Formal NDA Requested' : 'Standard Confidentiality'}

PROJECT SCOPE & REQUIREMENTS
${projectDescription}

DIRECT ACTIONS
- Reply Email : ${email}
- Direct Call : ${countryCode} ${phone}

Sent automatically by Asthasoft Technologies Lead Intake System.
`;

      const directRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Asthasoft Technologies <onboarding@resend.dev>',
          to: [adminEmail],
          subject: `New Client Inquiry: ${fullName} - ${service}`,
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
