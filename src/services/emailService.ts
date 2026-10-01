export interface ScopingLeadEmailPayload {
  name?: string;
  fullName: string;
  email: string;
  countryCode?: string;
  phone: string;
  contactNumber?: string;
  service?: string;
  serviceRequired?: string;
  projectDescription?: string;
  ndaRequested?: boolean;
  requestNDA?: boolean;
  source?: string;
  ticketId?: string;
  budget?: string;
  timeline?: string;
  preferredTime?: string;
  mathCaptchaAnswer?: number;
  mathChallenge?: {
    num1: number;
    num2: number;
    operator: string;
    answer: number;
  };
}

/**
 * Dispatches scoping session lead details to ADMIN_EMAIL via:
 * 1. Primary: Hostinger PHP API bridge (/api/send-scoping-email.php)
 * 2. Secondary: Node/Vite/Vercel serverless bridge (/api/send-scoping-email)
 * 3. Fallback: Direct Resend API (if CORS-permissive or proxy enabled)
 */
export async function sendLeadEmailNotification(
  payload: ScopingLeadEmailPayload
): Promise<{ success: boolean; data?: any; error?: any }> {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'hostelsuthar@gmail.com';
  const resendApiKey = import.meta.env.VITE_RESEND_API_KEY || '';

  const contactNumber =
    payload.contactNumber ||
    (payload.countryCode ? `${payload.countryCode} ${payload.phone}` : payload.phone);

  const normalizedPayload = {
    ...payload,
    name: payload.name || payload.fullName,
    fullName: payload.fullName || payload.name || 'Prospective Client',
    adminEmail,
    resendApiKey: resendApiKey || undefined,
    contactNumber,
    phone: payload.phone || contactNumber,
    countryCode: payload.countryCode || '+91',
    serviceRequired: payload.serviceRequired || payload.service || 'Custom Enterprise Software',
    service: payload.service || payload.serviceRequired || 'Custom Enterprise Software',
    projectDescription: payload.projectDescription || 'No description provided.',
    requestNDA: payload.requestNDA !== undefined ? payload.requestNDA : (payload.ndaRequested ?? true),
    ndaRequested: payload.ndaRequested !== undefined ? payload.ndaRequested : (payload.requestNDA ?? true),
    source: payload.source || 'Asthasoft Web Portal',
    ticketId: payload.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`,
  };

  // List of endpoints to try in order of deployment compatibility
  const endpoints = ['/api/send-scoping-email.php', '/api/send-scoping-email'];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(normalizedPayload),
      });

      const contentType = response.headers.get('content-type') || '';

      // If server returned HTML (e.g. SPA fallback to index.html), this endpoint was not executed by a server
      if (!contentType.includes('application/json')) {
        console.warn(`[Lead Notification] Endpoint ${endpoint} returned non-JSON (${contentType}), likely SPA fallback. Trying next...`);
        continue;
      }

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success === true || data.id || data.resendId)) {
        console.log(`✅ [Lead Notification] Successfully dispatched to ${adminEmail} via ${endpoint}:`, data);
        return { success: true, data };
      }

      console.warn(`[Lead Notification] ${endpoint} returned status ${response.status}:`, data);
    } catch (endpointError) {
      console.warn(`[Lead Notification] Network error trying ${endpoint}:`, endpointError);
    }
  }

  // 3. Fallback: Direct Resend API attempt
  try {
    if (resendApiKey) {
      const ticketId = normalizedPayload.ticketId;
      const fullName = normalizedPayload.fullName || 'Prospective Client';
      const email = normalizedPayload.email || 'Not provided';
      const countryCode = normalizedPayload.countryCode;
      const phone = normalizedPayload.phone || 'Not provided';
      const service = normalizedPayload.service;
      const projectDescription = normalizedPayload.projectDescription;
      const ndaRequested = normalizedPayload.ndaRequested;
      const source = normalizedPayload.source;

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
          reply_to: email && email.includes('@') && !email.includes('N/A') ? email : undefined,
        }),
      });

      const directData = await directRes.json();
      if (directRes.ok && directData.id) {
        console.log(`✅ [Lead Notification] Dispatched successfully to ${adminEmail} via Direct Resend API:`, directData);
        return { success: true, data: directData };
      } else {
        console.error('[Lead Notification] Direct Resend API returned error:', directData);
      }
    }
  } catch (directError) {
    // Expected in standard browsers due to Resend CORS policy
    console.warn('[Lead Notification] Direct client Resend dispatch skipped/failed (CORS restriction):', directError);
  }

  return { success: false, error: 'Failed to deliver notification email through available channels.' };
}
