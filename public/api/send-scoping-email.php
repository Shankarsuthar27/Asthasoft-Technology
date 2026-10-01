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

// Credentials
$resendApiKey = getEnvironmentVar('RESEND_API_KEY', '');
$resendFromEmail = getEnvironmentVar('RESEND_FROM_EMAIL', 'AsthaSoft Technologies <onboarding@resend.dev>');
$internalSalesEmail = getEnvironmentVar('INTERNAL_SALES_EMAIL', 'sales@asthasoftindia.com');

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
$email = isset($body['email']) && trim($body['email']) !== '' ? trim($body['email']) : '';
$contactNumber = isset($body['contactNumber']) && trim($body['contactNumber']) !== '' 
    ? trim($body['contactNumber']) 
    : (isset($body['phone']) ? ((isset($body['countryCode']) ? trim($body['countryCode']) . ' ' : '') . trim($body['phone'])) : 'Not provided');
$serviceRequired = isset($body['serviceRequired']) && trim($body['serviceRequired']) !== '' 
    ? trim($body['serviceRequired']) 
    : (isset($body['service']) ? trim($body['service']) : 'Custom Enterprise Software');
$projectDescription = isset($body['projectDescription']) && trim($body['projectDescription']) !== '' ? trim($body['projectDescription']) : 'No description provided';
$requestNDA = isset($body['requestNDA']) ? (bool)$body['requestNDA'] : (isset($body['ndaRequested']) ? (bool)$body['ndaRequested'] : false);
$ticketId = isset($body['ticketId']) && trim($body['ticketId']) !== '' ? trim($body['ticketId']) : 'ASTHA-' . strtoupper(dechex(time()));

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Valid email address is required.']);
    exit;
}

date_default_timezone_set('Asia/Kolkata');
$formattedDate = date('l, F j, Y - g:i:s A \I\S\T');

// 1. Render Customer Auto-Reply Email HTML
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeService = htmlspecialchars($serviceRequired, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($contactNumber, ENT_QUOTES, 'UTF-8');
$safeDescription = nl2br(htmlspecialchars($projectDescription, ENT_QUOTES, 'UTF-8'));

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

// 2. Render Internal Sales Email HTML
$ndaSalesBadge = $requestNDA 
    ? "<span style='background:#fef2f2;color:#b91c1c;padding:4px 8px;border-radius:4px;font-weight:700;'>YES — Provide Mutual NDA</span>"
    : "<span style='background:#f1f5f9;color:#475569;padding:4px 8px;border-radius:4px;'>No NDA Requested</span>";

$salesEmailHtml = "<!DOCTYPE html>
<html>
<body style='margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;'>
<table role='presentation' width='100%' style='padding:30px 15px;'><tr><td align='center'>
<table role='presentation' width='100%' style='max-width:640px;background:#fff;border-radius:10px;border:1px solid #e2e8f0;overflow:hidden;'>
  <tr><td style='background:#0f172a;padding:24px 30px;color:#fff;'>
    <div style='color:#38bdf8;font-size:11px;font-weight:700;text-transform:uppercase;'>Internal Sales Alert</div>
    <div style='font-size:20px;font-weight:700;margin-top:4px;'>New Scoping Session Submission</div>
  </td></tr>
  <tr><td style='padding:30px;'>
    <table style='width:100%;border-collapse:collapse;margin-bottom:24px;border:1px solid #e2e8f0;'>
      <tr style='background:#f8fafc;'><td style='padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700;'>FIELD</td><td style='padding:10px;border-bottom:1px solid #e2e8f0;font-weight:700;'>VALUE</td></tr>
      <tr><td style='padding:10px;border-bottom:1px solid #f1f5f9;color:#64748b;'>Name</td><td style='padding:10px;border-bottom:1px solid #f1f5f9;font-weight:700;'>{$safeName}</td></tr>
      <tr><td style='padding:10px;border-bottom:1px solid #f1f5f9;color:#64748b;'>Email</td><td style='padding:10px;border-bottom:1px solid #f1f5f9;'><a href='mailto:{$email}'>{$email}</a></td></tr>
      <tr><td style='padding:10px;border-bottom:1px solid #f1f5f9;color:#64748b;'>Contact Number</td><td style='padding:10px;border-bottom:1px solid #f1f5f9;font-weight:600;'>{$safePhone}</td></tr>
      <tr><td style='padding:10px;border-bottom:1px solid #f1f5f9;color:#64748b;'>Service Required</td><td style='padding:10px;border-bottom:1px solid #f1f5f9;font-weight:700;'>{$safeService}</td></tr>
      <tr><td style='padding:10px;border-bottom:1px solid #f1f5f9;color:#64748b;'>NDA Status</td><td style='padding:10px;border-bottom:1px solid #f1f5f9;'>{$ndaSalesBadge}</td></tr>
      <tr><td style='padding:10px;color:#64748b;'>Timestamp</td><td style='padding:10px;font-size:13px;'>{$formattedDate}</td></tr>
    </table>
    <div style='background:#f8fafc;border:1px solid #e2e8f0;padding:14px;border-radius:6px;margin-bottom:20px;'>
      <strong>Project Scope:</strong><br>{$safeDescription}
    </div>
  </td></tr>
</table>
</td></tr></table>
</body>
</html>";

// Function to send email via Resend API
function sendViaResend($apiKey, $from, $to, $subject, $html, $replyTo = null) {
    if (empty($apiKey) || !function_exists('curl_init')) return false;
    $payload = [
        'from' => $from,
        'to' => is_array($to) ? $to : [$to],
        'subject' => $subject,
        'html' => $html
    ];
    if ($replyTo) $payload['reply_to'] = $replyTo;

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
    curl_close($ch);

    return ($httpCode >= 200 && $httpCode < 300);
}

$customerSent = false;
$salesSent = false;

if (!empty($resendApiKey)) {
    // 1. Send Customer Auto-Reply
    $customerSent = sendViaResend(
        $resendApiKey,
        $resendFromEmail,
        $email,
        'Your Scoping Session Request with AsthaSoft',
        $customerEmailHtml
    );

    // 2. Send Internal Sales Notification
    $salesSent = sendViaResend(
        $resendApiKey,
        $resendFromEmail,
        $internalSalesEmail,
        "🚨 New Lead [Scoping Session]: {$name} - {$serviceRequired}",
        $salesEmailHtml,
        $email
    );
}

// Fallback to native PHP mail() if Resend is unavailable
if (!$salesSent) {
    $mailHeaders = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: AsthaSoft <no-reply@asthasoftindia.com>\r\nReply-To: {$email}\r\n";
    $salesSent = @mail($internalSalesEmail, "New Lead: {$name} - {$serviceRequired}", $salesEmailHtml, $mailHeaders);
}

if ($salesSent || $customerSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Scoping session request submitted successfully.',
        'ticketId' => $ticketId,
        'customerEmail' => $customerSent ? 'sent' : 'failed',
        'salesEmail' => $salesSent ? 'sent' : 'fallback_or_sent',
    ]);
    exit;
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to dispatch emails. Please verify RESEND_API_KEY configuration.'
    ]);
    exit;
}
