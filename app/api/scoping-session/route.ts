import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  renderCustomerAutoReplyHtml,
  renderCustomerAutoReplyPlainText,
  renderInternalSalesNotificationHtml,
  renderInternalLeadPlainText,
  getServiceDetails,
  type ScopingSessionLead,
} from '@/emails/templates';

// Verify environment configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || 'AsthaSoft Technologies <sales@asthapay.in>';
const INTERNAL_SALES_EMAIL =
  process.env.INTERNAL_SALES_EMAIL || 'sales@asthasoftindia.com';

/**
 * Validates the arithmetic security challenge to block automated bots
 */
function verifyMathSecurity(body: any): { isValid: boolean; reason?: string } {
  // Check for explicit math challenge payload: { num1, num2, operator, answer }
  const challenge = body.mathChallenge || body;
  const num1 = challenge.num1 ?? body.mathNum1;
  const num2 = challenge.num2 ?? body.mathNum2;
  const op = challenge.operator ?? body.mathOperator;
  const rawAnswer =
    challenge.answer ??
    body.mathAnswer ??
    body.mathCaptchaAnswer ??
    body.securityAnswer;

  // If no math answer was supplied at all
  if (rawAnswer === undefined || rawAnswer === null || rawAnswer === '') {
    return { isValid: false, reason: 'Math security verification is required.' };
  }

  const userAnswer = Number(rawAnswer);
  if (isNaN(userAnswer)) {
    return { isValid: false, reason: 'Math security answer must be a valid number.' };
  }

  // If operation details are provided, perform strict server-side calculation
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

  // If direct expected answer is provided (e.g. from signed token or validation state)
  if (body.mathExpectedAnswer !== undefined || body.expectedAnswer !== undefined) {
    const expected = Number(body.mathExpectedAnswer ?? body.expectedAnswer);
    if (userAnswer !== expected) {
      return { isValid: false, reason: 'Incorrect security verification answer.' };
    }
    return { isValid: true };
  }

  // Fallback: If numeric solution submitted
  return { isValid: Number.isFinite(userAnswer) };
}

/**
 * Next.js App Router POST Endpoint (/api/scoping-session)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing JSON payload.' },
        { status: 400 }
      );
    }

    // Support canonical fields with graceful fallbacks
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

    // 1. Payload validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Full name is required (minimum 2 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!contactNumber || contactNumber.length < 7) {
      return NextResponse.json(
        { success: false, error: 'A valid contact number is required.' },
        { status: 400 }
      );
    }

    if (!projectDescription || projectDescription.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a project description.' },
        { status: 400 }
      );
    }

    // 2. Math security check
    const mathCheck = verifyMathSecurity(body);
    if (!mathCheck.isValid) {
      return NextResponse.json(
        { success: false, error: mathCheck.reason || 'Security verification failed.' },
        { status: 400 }
      );
    }

    // 3. Verify Resend Configuration
    if (!RESEND_API_KEY) {
      console.error('[AsthaSoft Resend API] Missing RESEND_API_KEY environment variable.');
      return NextResponse.json(
        {
          success: false,
          error: 'Email service configuration error (missing RESEND_API_KEY).',
        },
        { status: 500 }
      );
    }

    // 4. Instantiate Resend Client
    const resend = new Resend(RESEND_API_KEY);

    const ticketId = `ASTHA-${Date.now().toString(36).toUpperCase()}`;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const leadData: ScopingSessionLead = {
      name,
      email,
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

    // 5. Simultaneous Email Dispatch via Resend SDK
    const [customerEmailResult, internalSalesResult] = await Promise.allSettled([
      // A. Customer Auto-Reply Email
      resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [email],
        subject: `Your Inquiry: ${serviceInfo.title} with AsthaSoft`,
        text: customerPlainText,
        html: customerHtml,
      }),
      // B. Internal Sales Notification Email
      resend.emails.send({
        from: RESEND_FROM_EMAIL,
        to: [INTERNAL_SALES_EMAIL],
        subject: `New Client Inquiry: ${name} - ${serviceRequired}`,
        text: salesPlainText,
        html: salesHtml,
        replyTo: email,
      }),
    ]);

    // Check if both or any failed
    const customerFailed = customerEmailResult.status === 'rejected' || customerEmailResult.value.error;
    const salesFailed = internalSalesResult.status === 'rejected' || internalSalesResult.value.error;

    if (customerFailed && salesFailed) {
      const err = customerEmailResult.status === 'rejected' 
        ? customerEmailResult.reason 
        : customerEmailResult.value.error;
      console.error('[AsthaSoft Resend API] Both email dispatches failed:', err);
      return NextResponse.json(
        { success: false, error: 'Failed to deliver emails via Resend SDK.' },
        { status: 500 }
      );
    }

    // Success response (200)
    return NextResponse.json(
      {
        success: true,
        message: 'Scoping session request processed successfully.',
        ticketId,
        customerEmailStatus: customerFailed ? 'failed' : 'sent',
        salesNotificationStatus: salesFailed ? 'failed' : 'sent',
        data: {
          name,
          email,
          serviceRequired,
          requestNDA,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[AsthaSoft Resend API] Unhandled server error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected server error occurred.',
      },
      { status: 500 }
    );
  }
}
