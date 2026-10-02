import { Resend } from 'resend';
import {
  renderCustomerAutoReplyHtml,
  renderCustomerAutoReplyPlainText,
  renderInternalSalesNotificationHtml,
  renderInternalLeadPlainText,
  getServiceDetails,
  type ScopingSessionLead,
} from '../src/emails/templates';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'AsthaSoft Technologies <sales@asthapay.in>';
const INTERNAL_SALES_EMAIL =
  process.env.INTERNAL_SALES_EMAIL || 'sales@asthasoftindia.com';

/**
 * Validates the arithmetic security challenge to block automated bots
 */
function verifyMathSecurity(body: any): { isValid: boolean; reason?: string } {
  const challenge = body.mathChallenge || body;
  const num1 = challenge.num1 ?? body.mathNum1;
  const num2 = challenge.num2 ?? body.mathNum2;
  const op = challenge.operator ?? body.mathOperator;
  const rawAnswer =
    challenge.answer ??
    body.mathAnswer ??
    body.mathCaptchaAnswer ??
    body.securityAnswer;

  if (rawAnswer === undefined || rawAnswer === null || rawAnswer === '') {
    return { isValid: false, reason: 'Math security verification is required.' };
  }

  const userAnswer = Number(rawAnswer);
  if (isNaN(userAnswer)) {
    return { isValid: false, reason: 'Math security answer must be a valid number.' };
  }

  if (num1 !== undefined && num2 !== undefined && op) {
    const n1 = Number(num1);
    const n2 = Number(num2);

    if (isNaN(n1) || isNaN(n2)) {
      return { isValid: false, reason: 'Invalid arithmetic problem operands.' };
    }

    let expected = 0;
    if (op === '+' || op === 'plus') {
      expected = n1 + n2;
    } else if (op === '-' || op === 'minus') {
      expected = n1 - n2;
    } else if (op === '*' || op === '×' || op === 'x' || op === 'multiply') {
      expected = n1 * n2;
    } else {
      return { isValid: false, reason: `Unsupported arithmetic operator: ${op}` };
    }

    if (userAnswer !== expected) {
      return {
        isValid: false,
        reason: `Incorrect security answer. Calculated ${userAnswer}, expected ${expected}.`,
      };
    }

    return { isValid: true };
  }

  if (body.mathExpectedAnswer !== undefined || body.expectedAnswer !== undefined) {
    const expected = Number(body.mathExpectedAnswer ?? body.expectedAnswer);
    if (userAnswer !== expected) {
      return { isValid: false, reason: 'Incorrect security verification answer.' };
    }
    return { isValid: true };
  }

  return { isValid: Number.isFinite(userAnswer) };
}

/**
 * Serverless / Pages API Handler
 */
export default async function handler(req: any, res: any) {
  // CORS Configuration
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
    return res.status(405).json({ success: false, error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid JSON payload.' });
    }

    // Map payload fields
    const name = String(body.name || body.fullName || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const contactNumber = String(
      body.contactNumber ||
        (body.countryCode ? `${body.countryCode} ${body.phone || ''}` : body.phone) ||
        ''
    ).trim();
    const serviceRequired = String(
      body.serviceRequired || body.service || 'Custom Enterprise Software'
    ).trim();
    const projectDescription = String(
      body.projectDescription || body.description || ''
    ).trim();
    const requestNDA = Boolean(
      body.requestNDA !== undefined ? body.requestNDA : body.ndaRequested
    );

    // 1. Validation
    if (!name || name.length < 2) {
      return res.status(400).json({ success: false, error: 'Name is required (min 2 chars).' });
    }

    const isInstantCall = (
      email.includes('instant') ||
      email.includes('n/a') ||
      !email.includes('@')
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isInstantCall && !emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Valid email is required.' });
    }

    const sanitizedCustomerEmail = isInstantCall ? 'noreply-lead@asthasoftindia.com' : email;

    if (!contactNumber || contactNumber.length < 7) {
      return res.status(400).json({ success: false, error: 'Valid contact number is required.' });
    }

    if (!projectDescription) {
      return res.status(400).json({ success: false, error: 'Project description is required.' });
    }

    // 2. Math security check
    const mathCheck = verifyMathSecurity(body);
    if (!mathCheck.isValid) {
      return res.status(400).json({
        success: false,
        error: mathCheck.reason || 'Math security verification failed.',
      });
    }

    // 3. Resend initialization
    const targetApiKey = RESEND_API_KEY || body.resendApiKey || '';
    if (!targetApiKey) {
      console.error('[Resend Error] Missing RESEND_API_KEY.');
      return res.status(500).json({
        success: false,
        error: 'RESEND_API_KEY is not configured on the server environment.',
      });
    }

    const resend = new Resend(targetApiKey);

    const targetAdminEmail =
      process.env.ADMIN_EMAIL ||
      body.adminEmail ||
      INTERNAL_SALES_EMAIL ||
      'hostelsuthar@gmail.com';

    const ticketId = body.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const leadData: ScopingSessionLead = {
      name,
      email: sanitizedCustomerEmail,
      contactNumber,
      serviceRequired,
      projectDescription,
      requestNDA,
      ticketId,
      timestamp,
      source: body.source || 'Header CTA',
      budget: body.budget,
      timeline: body.timeline,
      preferredTime: body.preferredTime,
    };

    // Render Plain Text and HTML templates
    const serviceInfo = getServiceDetails(serviceRequired);
    const customerPlainText = renderCustomerAutoReplyPlainText(leadData);
    const customerHtml = renderCustomerAutoReplyHtml(leadData);
    const salesPlainText = renderInternalLeadPlainText(leadData);
    const salesHtml = renderInternalSalesNotificationHtml(leadData);

    // 4. Simultaneous Email Dispatch
    const dispatchPromises: Promise<any>[] = [
      // Primary: Internal Admin/Sales Notification
      resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [targetAdminEmail],
        subject: `New Client Inquiry: ${name} - ${serviceRequired}`,
        text: salesPlainText,
        html: salesHtml,
        replyTo: !isInstantCall && emailRegex.test(email) ? email : undefined,
      }),
    ];

    // Customer auto-reply with tailored service specifications
    if (!isInstantCall && emailRegex.test(email)) {
      dispatchPromises.push(
        resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: [email],
          subject: `Your Inquiry: ${serviceInfo.title} with AsthaSoft`,
          text: customerPlainText,
          html: customerHtml,
        })
      );
    }

    const [salesRes, customerRes] = await Promise.allSettled(dispatchPromises);

    const salesFailed = salesRes.status === 'rejected' || (salesRes.value as any)?.error;
    const customerFailed =
      customerRes ? (customerRes.status === 'rejected' || (customerRes.value as any)?.error) : false;

    if (salesFailed && (!customerRes || customerFailed)) {
      const err = salesRes.status === 'rejected' ? salesRes.reason : (salesRes.value as any)?.error;
      console.error('[Resend Error] Primary email alert failed:', err);
      return res.status(500).json({
        success: false,
        error: 'Failed to dispatch emails via Resend SDK.',
        details: err,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Scoping session request submitted successfully.',
      ticketId,
      adminEmail: targetAdminEmail,
      salesEmail: salesFailed ? 'failed' : 'sent',
      customerEmail: isInstantCall ? 'not_requested' : (customerFailed ? 'skipped_unverified_domain' : 'sent'),
    });
  } catch (error: any) {
    console.error('[Resend Server Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error',
    });
  }
}
