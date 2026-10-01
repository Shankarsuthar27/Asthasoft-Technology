<?php
// Prevent any notices/warnings from corrupting the JSON output
error_reporting(0);
ini_set('display_errors', '0');

// Allow CORS so client web apps can communicate freely
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Enforce POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method not allowed. Use POST.'
    ]);
    exit;
}

// Read raw JSON input
$rawBody = file_get_contents('php://input');
$body = json_decode($rawBody, true);

if (!is_array($body)) {
    $body = !empty($_POST) ? $_POST : [];
}

// Helper to read env var
function getEnvironmentVar($key, $default = '') {
    $val = getenv($key);
    if ($val !== false && $val !== '') return $val;
    if (!empty($_ENV[$key])) return $_ENV[$key];
    if (!empty($_SERVER[$key])) return $_SERVER[$key];

    $possibleEnvFiles = [
        __DIR__ . '/../../.env',
        __DIR__ . '/../.env',
        __DIR__ . '/.env',
        isset($_SERVER['DOCUMENT_ROOT']) ? $_SERVER['DOCUMENT_ROOT'] . '/.env' : '',
        isset($_SERVER['DOCUMENT_ROOT']) ? dirname($_SERVER['DOCUMENT_ROOT']) . '/.env' : '',
    ];
    foreach ($possibleEnvFiles as $envFile) {
        if ($envFile && file_exists($envFile) && is_readable($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || strpos($line, '#') === 0) continue;
                if (strpos($line, '=') !== false) {
                    list($k, $v) = explode('=', $line, 2);
                    $k = trim($k);
                    $v = trim($v, " \t\n\r\0\x0B\"'");
                    if ($k === $key) {
                        return $v;
                    }
                }
            }
        }
    }
    return $default;
}

// Credentials & Target Configuration
$resendApiKey = getEnvironmentVar('RESEND_API_KEY', '');
if (empty($resendApiKey) && !empty($body['resendApiKey'])) {
    $resendApiKey = trim($body['resendApiKey']);
}

$resendFromEmail = getEnvironmentVar('RESEND_FROM_EMAIL', 'AsthaSoft Technologies <onboarding@resend.dev>');

// Priority for Admin Notification target:
// 1. ADMIN_EMAIL from server env or .env
// 2. adminEmail passed in JSON body payload from frontend
// 3. INTERNAL_SALES_EMAIL from server env
// 4. Guaranteed default: hostelsuthar@gmail.com
$adminEmail = getEnvironmentVar('ADMIN_EMAIL', '');
if (empty($adminEmail) && !empty($body['adminEmail']) && filter_var($body['adminEmail'], FILTER_VALIDATE_EMAIL)) {
    $adminEmail = trim($body['adminEmail']);
}
if (empty($adminEmail)) {
    $adminEmail = getEnvironmentVar('INTERNAL_SALES_EMAIL', 'hostelsuthar@gmail.com');
}

$secondarySalesEmail = getEnvironmentVar('INTERNAL_SALES_EMAIL', '');

// Math security verification
if (isset($body['mathChallenge']) || isset($body['mathCaptchaAnswer']) || isset($body['mathAnswer'])) {
    $math = isset($body['mathChallenge']) ? $body['mathChallenge'] : $body;
    $rawAnswer = isset($math['answer']) ? $math['answer'] : (isset($body['mathAnswer']) ? $body['mathAnswer'] : (isset($body['mathCaptchaAnswer']) ? $body['mathCaptchaAnswer'] : null));
    
    if ($rawAnswer === null || trim((string)$rawAnswer) === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Math security verification is required.']);
        exit;
    }

    if (isset($math['num1']) && isset($math['num2']) && isset($math['operator'])) {
        $n1 = intval($math['num1']);
        $n2 = intval($math['num2']);
        $op = trim($math['operator']);
        $expected = 0;
        if ($op === '+' || $op === 'plus') $expected = $n1 + $n2;
        elseif ($op === '-' || $op === 'minus') $expected = $n1 - $n2;
        elseif ($op === '*' || $op === '×' || $op === 'x' || $op === 'multiply') $expected = $n1 * $n2;

        if (intval($rawAnswer) !== $expected) {
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => 'Math security verification failed.']);
            exit;
        }
    }
}

// Extract payload fields
$name = isset($body['name']) && trim($body['name']) !== '' ? trim($body['name']) : (isset($body['fullName']) ? trim($body['fullName']) : 'Valued Client');
$rawEmail = isset($body['email']) ? trim($body['email']) : '';
$isInstantCall = (stripos($rawEmail, 'instant') !== false || stripos($rawEmail, 'n/a') !== false || empty($rawEmail));

if ($isInstantCall) {
    // For Instant Call requests, phone number is mandatory, email is placeholder
    $email = 'noreply-lead@asthasoftindia.com';
    $hasRealCustomerEmail = false;
} else if (filter_var($rawEmail, FILTER_VALIDATE_EMAIL)) {
    $email = $rawEmail;
    $hasRealCustomerEmail = true;
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Valid email address is required.']);
    exit;
}

$rawPhone = isset($body['phone']) ? trim($body['phone']) : '';
$countryCode = isset($body['countryCode']) ? trim($body['countryCode']) : '+91';

if (isset($body['contactNumber']) && trim($body['contactNumber']) !== '') {
    $contactNumber = trim($body['contactNumber']);
} else if ($rawPhone !== '') {
    if (strpos($rawPhone, '+') === 0 || ($countryCode && strpos($rawPhone, $countryCode) === 0)) {
        $contactNumber = $rawPhone;
    } else {
        $contactNumber = ($countryCode ? $countryCode . ' ' : '') . $rawPhone;
    }
} else {
    $contactNumber = 'Not provided';
}

$serviceRequired = isset($body['serviceRequired']) && trim($body['serviceRequired']) !== '' 
    ? trim($body['serviceRequired']) 
    : (isset($body['service']) ? trim($body['service']) : 'Custom Enterprise Software');
$projectDescription = isset($body['projectDescription']) && trim($body['projectDescription']) !== '' ? trim($body['projectDescription']) : 'No description provided';
$requestNDA = isset($body['requestNDA']) ? (bool)$body['requestNDA'] : (isset($body['ndaRequested']) ? (bool)$body['ndaRequested'] : false);
$ticketId = isset($body['ticketId']) && trim($body['ticketId']) !== '' ? trim($body['ticketId']) : 'ASTHA-' . strtoupper(dechex(time()));
$sourceChannel = isset($body['source']) && trim($body['source']) !== '' ? trim($body['source']) : 'Header CTA';

$budget = isset($body['budget']) && trim($body['budget']) !== '' ? trim($body['budget']) : null;
$timeline = isset($body['timeline']) && trim($body['timeline']) !== '' ? trim($body['timeline']) : null;
$preferredTime = isset($body['preferredTime']) && trim($body['preferredTime']) !== '' ? trim($body['preferredTime']) : null;

date_default_timezone_set('Asia/Kolkata');
$formattedDate = date('l, F j, Y \a\t g:i:s A');

$ndaStatusText = $requestNDA ? 'YES · Formal NDA Requested' : 'Standard Confidentiality';

$extraSpecsText = '';
if ($budget) $extraSpecsText .= "Estimated Budget: {$budget}\n";
if ($timeline) $extraSpecsText .= "Delivery Target : {$timeline}\n";
if ($preferredTime) $extraSpecsText .= "Preferred Time  : {$preferredTime}\n";

// Plain Text Lead Alert matching the user's exact specification
$plainText = "ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD\n\n"
    . "TICKET & INTAKE DETAILS\n"
    . "Ticket ID      : {$ticketId}\n"
    . "Date & Time    : {$formattedDate}\n"
    . "Source Channel : {$sourceChannel}\n\n"
    . "CLIENT INFORMATION\n"
    . "Full Name      : {$name}\n"
    . "Email Address  : {$email}\n"
    . "Phone Number   : {$contactNumber}\n\n"
    . "PROJECT SPECIFICATIONS\n"
    . "Service Needed : {$serviceRequired}\n"
    . $extraSpecsText
    . "NDA Status     : {$ndaStatusText}\n\n"
    . "PROJECT SCOPE & REQUIREMENTS\n"
    . "{$projectDescription}\n\n"
    . "DIRECT ACTIONS\n"
    . "- Reply Email : {$email}\n"
    . "- Direct Call : {$contactNumber}\n\n"
    . "Sent automatically by Asthasoft Technologies Lead Intake System.\n";

// Matching clean HTML representation
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($contactNumber, ENT_QUOTES, 'UTF-8');
$safePhoneClean = preg_replace('/[^0-9+]/', '', $contactNumber);
$safeService = htmlspecialchars($serviceRequired, ENT_QUOTES, 'UTF-8');
$safeDescription = htmlspecialchars($projectDescription, ENT_QUOTES, 'UTF-8');
$safeSource = htmlspecialchars($sourceChannel, ENT_QUOTES, 'UTF-8');
$safeTicketId = htmlspecialchars($ticketId, ENT_QUOTES, 'UTF-8');

$extraSpecsHtml = '';
if ($budget) $extraSpecsHtml .= "Estimated Budget: " . htmlspecialchars($budget, ENT_QUOTES, 'UTF-8') . "\n";
if ($timeline) $extraSpecsHtml .= "Delivery Target : " . htmlspecialchars($timeline, ENT_QUOTES, 'UTF-8') . "\n";
if ($preferredTime) $extraSpecsHtml .= "Preferred Time  : " . htmlspecialchars($preferredTime, ENT_QUOTES, 'UTF-8') . "\n";

$salesEmailHtml = "<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>New Client Inquiry: {$safeName} - {$safeService}</title>
</head>
<body style='margin: 0; padding: 24px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;'>
  <div style='font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827; white-space: pre-wrap; word-break: break-word;'>ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET &amp; INTAKE DETAILS
Ticket ID      : {$safeTicketId}
Date &amp; Time    : {$formattedDate}
Source Channel : {$safeSource}

CLIENT INFORMATION
Full Name      : {$safeName}
Email Address  : <a href='mailto:{$safeEmail}' style='color: #2563eb; text-decoration: underline;'>{$safeEmail}</a>
Phone Number   : <a href='tel:{$safePhoneClean}' style='color: #2563eb; text-decoration: underline;'>{$safePhone}</a>

PROJECT SPECIFICATIONS
Service Needed : {$safeService}
{$extraSpecsHtml}NDA Status     : {$ndaStatusText}

PROJECT SCOPE &amp; REQUIREMENTS
{$safeDescription}

DIRECT ACTIONS
- Reply Email : <a href='mailto:{$safeEmail}' style='color: #2563eb; text-decoration: underline;'>{$safeEmail}</a>
- Direct Call : <a href='tel:{$safePhoneClean}' style='color: #2563eb; text-decoration: underline;'>{$safePhone}</a>

Sent automatically by Asthasoft Technologies Lead Intake System.</div>
</body>
</html>";

// Optional Customer Auto-Reply Email
$ndaHtmlCustomer = $requestNDA ? '
<div style="margin: 24px 0; padding: 18px 20px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 6px;">
  <div style="font-weight: 700; color: #166534; font-size: 14px; margin-bottom: 6px;">✓ Non-Disclosure Agreement (NDA) Requested</div>
  <p style="margin: 0; color: #15803d; font-size: 14px; line-height: 1.6;">
    We have noted your request for a Non-Disclosure Agreement. Prior to scheduling in-depth architectural reviews or discussing proprietary technical specifics, our compliance team will provide a countersigned Mutual NDA to ensure your intellectual property is completely safeguarded.
  </p>
</div>
' : '
<div style="margin: 20px 0; padding: 14px 18px; background-color: #f8fafc; border-left: 4px solid #94a3b8; border-radius: 6px;">
  <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
    <strong>Confidentiality Notice:</strong> All project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.
  </p>
</div>
';

$customerEmailHtml = "<!DOCTYPE html>
<html>
<body style='margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;'>
<table role='presentation' width='100%' style='padding:40px 15px;'><tr><td align='center'>
<table role='presentation' width='100%' style='max-width:620px;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;'>
  <tr><td style='background:#0A1128;padding:32px 36px;color:#fff;'>
    <div style='font-size:24px;font-weight:800;'>Astha<span style='color:#38bdf8;'>Soft</span></div>
    <div style='font-size:12px;color:#94a3b8;letter-spacing:1px;text-transform:uppercase;margin-top:4px;'>Enterprise Software &amp; Cloud Engineering</div>
  </td></tr>
  <tr><td style='padding:36px;'>
    <h1 style='font-size:22px;color:#0f172a;margin:0 0 16px 0;'>Your Scoping Session Request Has Been Received</h1>
    <p style='color:#334155;line-height:1.6;'>Dear <strong>{$safeName}</strong>,</p>
    <p style='color:#334155;line-height:1.6;'>Thank you for contacting <strong>AsthaSoft</strong>. We have successfully received your request for a strategic scoping session regarding <strong style='color:#0284c7;'>{$safeService}</strong>.</p>
    <div style='margin:20px 0;padding:16px 20px;background:#f0f9ff;border-left:4px solid #0284c7;border-radius:6px;'>
      <p style='margin:0;color:#0369a1;font-size:14px;line-height:1.6;'>⏱ <strong>Response Commitment:</strong> A dedicated strategic consultant will review your project scope and respond with technical insights within <strong>24 hours</strong>.</p>
    </div>
    {$ndaHtmlCustomer}
    <div style='margin:24px 0;border:1px solid #e2e8f0;border-radius:8px;padding:16px;'>
      <div style='font-size:13px;font-weight:700;color:#475569;margin-bottom:8px;'>SUMMARY OF SUBMITTED REQUIREMENTS:</div>
      <p style='margin:4px 0;font-size:14px;'><strong>Service:</strong> {$safeService}</p>
      <p style='margin:4px 0;font-size:14px;'><strong>Contact:</strong> {$safePhone}</p>
      <p style='margin:4px 0;font-size:14px;'><strong>Description:</strong> {$safeDescription}</p>
    </div>
    <p style='color:#64748b;font-size:13px;'>AsthaSoft Technologies · Enterprise Solutions</p>
  </td></tr>
</table>
</td></tr></table>
</body>
</html>";

// Function to send email via Resend API supporting both text and html
function sendViaResend($apiKey, $from, $to, $subject, $text, $html = null, $replyTo = null) {
    if (empty($apiKey) || !function_exists('curl_init')) {
        return ['success' => false, 'error' => 'API key missing or curl extension disabled.'];
    }
    $payload = [
        'from' => $from,
        'to' => is_array($to) ? $to : [$to],
        'subject' => $subject,
        'text' => $text
    ];
    if (!empty($html)) {
        $payload['html'] = $html;
    }
    if ($replyTo && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) {
        $payload['reply_to'] = $replyTo;
    }

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $apiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    $json = json_decode($response, true);
    $isOk = ($httpCode >= 200 && $httpCode < 300);

    return [
        'success' => $isOk,
        'httpCode' => $httpCode,
        'id' => $json['id'] ?? null,
        'error' => !$isOk ? ($json['message'] ?? $curlErr ?? ('HTTP ' . $httpCode)) : null
    ];
}

$salesResult = null;
$customerResult = null;
$leadSubject = "New Client Inquiry: {$name} - {$serviceRequired}";

if (!empty($resendApiKey)) {
    // 1. Send Internal Lead Alert to Admin (PRIMARY)
    $salesResult = sendViaResend(
        $resendApiKey,
        $resendFromEmail,
        $adminEmail,
        $leadSubject,
        $plainText,
        $salesEmailHtml,
        $hasRealCustomerEmail ? $email : null
    );

    // If secondary sales email is specified and distinct, attempt secondary notification
    if (!empty($secondarySalesEmail) && strtolower($secondarySalesEmail) !== strtolower($adminEmail)) {
        sendViaResend(
            $resendApiKey,
            $resendFromEmail,
            $secondarySalesEmail,
            $leadSubject,
            $plainText,
            $salesEmailHtml,
            $hasRealCustomerEmail ? $email : null
        );
    }

    // 2. Send Customer Auto-Reply ONLY if customer provided a real email
    if ($hasRealCustomerEmail) {
        $customerResult = sendViaResend(
            $resendApiKey,
            $resendFromEmail,
            $email,
            'Your Scoping Session Request with AsthaSoft',
            "Thank you for contacting AsthaSoft. We have received your request for {$serviceRequired}.",
            $customerEmailHtml
        );
    }
}

$salesSent = ($salesResult && $salesResult['success']);

// Fallback to native PHP mail() if Resend failed for admin
if (!$salesSent) {
    $mailHeaders = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\nFrom: AsthaSoft <no-reply@asthasoftindia.com>\r\n";
    if ($hasRealCustomerEmail) {
        $mailHeaders .= "Reply-To: {$email}\r\n";
    }
    $salesSent = @mail($adminEmail, $leadSubject, $plainText, $mailHeaders);
}

$customerSent = ($customerResult && $customerResult['success']);

if ($salesSent || $customerSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Scoping session request submitted successfully.',
        'ticketId' => $ticketId,
        'adminEmail' => $adminEmail,
        'adminNotification' => $salesSent ? 'delivered' : 'queued',
        'customerAutoReply' => $customerSent ? 'sent' : ($hasRealCustomerEmail ? 'skipped_unverified_domain' : 'not_requested'),
        'notice' => (!$customerSent && $hasRealCustomerEmail && stripos($resendFromEmail, 'resend.dev') !== false)
            ? 'Auto-reply was skipped because onboarding@resend.dev only allows sending to the account owner. Verify asthasoftindia.com on resend.com/domains to enable client auto-replies.'
            : null
    ]);
    exit;
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to dispatch email. ' . ($salesResult['error'] ?? 'Please check RESEND_API_KEY configuration.'),
        'details' => $salesResult
    ]);
    exit;
}

