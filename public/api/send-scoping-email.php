<?php
// Prevent any notices/warnings from corrupting the JSON output
error_reporting(0);
ini_set('display_errors', '0');

// Allow CORS so client web apps on any domain / subdomain can dispatch enquiries
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
    // If not valid JSON, check $_POST
    $body = !empty($_POST) ? $_POST : [];
}

// Helper to read env var from getenv, $_ENV, $_SERVER, or parent .env files
function getEnvironmentVar($key, $default = '') {
    $val = getenv($key);
    if ($val !== false && $val !== '') return $val;
    if (!empty($_ENV[$key])) return $_ENV[$key];
    if (!empty($_SERVER[$key])) return $_SERVER[$key];

    // Check possible .env file locations (e.g. root or parent directories)
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

// Credentials - loaded securely from environment or server .env
$resendApiKey = getEnvironmentVar('RESEND_API_KEY', '');
$adminEmail = getEnvironmentVar('ADMIN_EMAIL', 'hostelsuthar@gmail.com');

// Sanitize & extract payload fields
$fullName = isset($body['fullName']) && trim($body['fullName']) !== '' ? htmlspecialchars(trim($body['fullName'])) : 'Prospective Client';
$email = isset($body['email']) && trim($body['email']) !== '' ? trim($body['email']) : 'Not provided';
$countryCode = isset($body['countryCode']) && trim($body['countryCode']) !== '' ? trim($body['countryCode']) : '+91';
$phone = isset($body['phone']) && trim($body['phone']) !== '' ? trim($body['phone']) : 'Not provided';
$service = isset($body['service']) && trim($body['service']) !== '' ? htmlspecialchars(trim($body['service'])) : 'Custom Enterprise Software';
$projectDescription = isset($body['projectDescription']) && trim($body['projectDescription']) !== '' ? htmlspecialchars(trim($body['projectDescription'])) : 'No project description provided';
$budget = isset($body['budget']) ? htmlspecialchars(trim($body['budget'])) : '';
$timeline = isset($body['timeline']) ? htmlspecialchars(trim($body['timeline'])) : '';
$preferredTime = isset($body['preferredTime']) ? htmlspecialchars(trim($body['preferredTime'])) : '';
$ndaRequested = isset($body['ndaRequested']) ? (bool)$body['ndaRequested'] : true;
$source = isset($body['source']) ? htmlspecialchars(trim($body['source'])) : 'Asthasoft Web Portal';
$ticketId = isset($body['ticketId']) && trim($body['ticketId']) !== '' ? trim($body['ticketId']) : 'ASTHA-' . strtoupper(dechex(time()));

// Format Indian Standard Time
date_default_timezone_set('Asia/Kolkata');
$formattedDate = date('l, F j, Y - g:i:s A \I\S\T');

// Construct email content
$plainText = "ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD\n\n" .
    "TICKET & INTAKE DETAILS\n" .
    "Ticket ID       : {$ticketId}\n" .
    "Date & Time     : {$formattedDate}\n" .
    "Source Channel  : {$source}\n\n" .
    "CLIENT INFORMATION\n" .
    "Full Name       : {$fullName}\n" .
    "Email Address   : {$email}\n" .
    "Phone Number    : {$countryCode} {$phone}\n\n" .
    "PROJECT SPECIFICATIONS\n" .
    "Service Needed  : {$service}\n" .
    (!empty($budget) ? "Estimated Budget: {$budget}\n" : "") .
    (!empty($timeline) ? "Delivery Target : {$timeline}\n" : "") .
    (!empty($preferredTime) ? "Preferred Time  : {$preferredTime}\n" : "") .
    "NDA Status      : " . ($ndaRequested ? "YES · Formal NDA Requested" : "Standard Confidentiality") . "\n\n" .
    "PROJECT SCOPE & REQUIREMENTS\n" .
    "{$projectDescription}\n\n" .
    "DIRECT ACTIONS\n" .
    "- Reply Email : {$email}\n" .
    "- Direct Call : {$countryCode} {$phone}\n\n" .
    "Sent automatically by Asthasoft Technologies Lead Intake System.\n";

$htmlBody = "
<div style='font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b;'>
    <div style='border-bottom: 2px solid #0066ff; padding-bottom: 16px; margin-bottom: 20px;'>
        <h2 style='color: #0066ff; margin: 0 0 4px 0; font-size: 20px;'>Asthasoft Technologies — New Lead</h2>
        <p style='color: #64748b; margin: 0; font-size: 13px;'>Ticket ID: <strong>{$ticketId}</strong> &bull; {$formattedDate}</p>
    </div>

    <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;'>
        <h3 style='margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;'>Client Information</h3>
        <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>
            <tr><td style='padding: 6px 0; color: #64748b; width: 130px;'>Name:</td><td style='padding: 6px 0; font-weight: 600; color: #0f172a;'>{$fullName}</td></tr>
            <tr><td style='padding: 6px 0; color: #64748b;'>Email:</td><td style='padding: 6px 0;'><a href='mailto:{$email}' style='color: #0066ff; text-decoration: none; font-weight: 600;'>{$email}</a></td></tr>
            <tr><td style='padding: 6px 0; color: #64748b;'>Phone:</td><td style='padding: 6px 0; font-weight: 600; color: #0f172a;'>{$countryCode} {$phone}</td></tr>
            <tr><td style='padding: 6px 0; color: #64748b;'>Source:</td><td style='padding: 6px 0; color: #0f172a;'>{$source}</td></tr>
        </table>
    </div>

    <div style='background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 20px;'>
        <h3 style='margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569;'>Project Details</h3>
        <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>
            <tr><td style='padding: 6px 0; color: #64748b; width: 130px;'>Service:</td><td style='padding: 6px 0; font-weight: 600; color: #0066ff;'>{$service}</td></tr>
            " . (!empty($budget) ? "<tr><td style='padding: 6px 0; color: #64748b;'>Budget:</td><td style='padding: 6px 0; font-weight: 600;'>{$budget}</td></tr>" : "") . "
            " . (!empty($timeline) ? "<tr><td style='padding: 6px 0; color: #64748b;'>Timeline:</td><td style='padding: 6px 0;'>{$timeline}</td></tr>" : "") . "
            " . (!empty($preferredTime) ? "<tr><td style='padding: 6px 0; color: #64748b;'>Preferred Time:</td><td style='padding: 6px 0;'>{$preferredTime}</td></tr>" : "") . "
            <tr><td style='padding: 6px 0; color: #64748b;'>NDA Requested:</td><td style='padding: 6px 0; color: " . ($ndaRequested ? "#10b981" : "#64748b") . "; font-weight: 600;'>" . ($ndaRequested ? "✓ Yes (Formal NDA Requested)" : "Standard Confidentiality") . "</td></tr>
        </table>
        <div style='margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;'>
            <div style='color: #64748b; font-size: 13px; margin-bottom: 6px;'>Scope & Requirements:</div>
            <div style='white-space: pre-wrap; font-size: 14px; color: #1e293b; background: #ffffff; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0;'>{$projectDescription}</div>
        </div>
    </div>

    <div style='text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;'>
        Sent automatically by Asthasoft Technologies Intake Engine.
    </div>
</div>
";

$resendDispatched = false;
$resendResponseData = null;

// Primary Dispatch: Resend API via cURL
if (function_exists('curl_init') && !empty($resendApiKey)) {
    $resendPayload = [
        'from' => 'Asthasoft Technologies <onboarding@resend.dev>',
        'to' => [$adminEmail],
        'subject' => "New Client Inquiry: {$fullName} - {$service}",
        'text' => $plainText,
        'html' => $htmlBody,
    ];

    if ($email && strpos($email, '@') !== false && !strpos($email, 'N/A')) {
        $resendPayload['reply_to'] = $email;
    }

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $resendApiKey,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($resendPayload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300 && $response) {
        $resendResponseData = json_decode($response, true);
        $resendDispatched = true;
    }
}

// Fallback Dispatch: Native PHP mail() if Resend API had any issues
$phpMailDispatched = false;
if (!$resendDispatched) {
    $serverDomain = isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'asthasoft.com';
    $mailHeaders = "MIME-Version: 1.0\r\n" .
        "Content-type: text/html; charset=UTF-8\r\n" .
        "From: Asthasoft Web <no-reply@" . $serverDomain . ">\r\n" .
        ($email && strpos($email, '@') !== false ? "Reply-To: {$email}\r\n" : "") .
        "X-Mailer: PHP/" . phpversion();

    $phpMailDispatched = @mail($adminEmail, "New Client Inquiry: {$fullName} - {$service}", $htmlBody, $mailHeaders);
}

// Return response to frontend client
if ($resendDispatched) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Scoping inquiry dispatched successfully via Resend.',
        'resendId' => isset($resendResponseData['id']) ? $resendResponseData['id'] : 'delivered',
        'ticketId' => $ticketId,
        'adminEmail' => $adminEmail,
        'method' => 'resend'
    ]);
    exit;
} elseif ($phpMailDispatched) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Scoping inquiry dispatched successfully via Hostinger Mail.',
        'ticketId' => $ticketId,
        'adminEmail' => $adminEmail,
        'method' => 'php_mail'
    ]);
    exit;
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to dispatch email via Resend and PHP mailer.',
        'debug' => [
            'curl_error' => isset($curlError) ? $curlError : null,
            'resend_response' => isset($response) ? json_decode($response, true) : null
        ]
    ]);
    exit;
}
