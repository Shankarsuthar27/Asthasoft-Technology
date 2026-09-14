export interface ScopingLeadEmailPayload {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  service: string;
  projectDescription: string;
  ndaRequested: boolean;
  source: string;
  ticketId: string;
}

/**
 * Dispatches scoping session lead details to admin email via the serverless Resend API bridge.
 */
export async function sendLeadEmailNotification(payload: ScopingLeadEmailPayload) {
  try {
    const response = await fetch('/api/send-scoping-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('[Lead Notification] Email bridge response status:', response.status, errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json().catch(() => ({}));
    console.log('[Lead Notification] Email dispatched successfully to admin via Resend:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[Lead Notification] Network error dispatching email to admin:', error);
    return { success: false, error };
  }
}
