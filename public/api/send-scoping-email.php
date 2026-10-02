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

$resendFromEmail = getEnvironmentVar('RESEND_FROM_EMAIL', 'AsthaSoft Technologies <sales@asthapay.in>');

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

// Function to resolve structured service intelligence matching customer requested service
function getServiceDetailsPhp($rawService = '') {
    $s = strtolower($rawService);

    // 1. Mobile App Development
    if (strpos($s, 'mobile') !== false || strpos($s, 'ios') !== false || strpos($s, 'android') !== false || strpos($s, 'flutter') !== false || strpos($s, 'react native') !== false || strpos($s, 'app') !== false) {
        return [
            'title' => 'Mobile Application Development (iOS & Android)',
            'headline' => 'Native & Cross-Platform Apps Engineered for 60fps Performance & Global Scale',
            'overview' => 'AsthaSoft engineers high-performance, intuitive mobile experiences from concept to App Store and Google Play launch. We specialize in fluid 60 FPS interfaces, offline-first data synchronization, biometric authentication, and enterprise-grade backend APIs.',
            'deliverables' => [
                'Native iOS (Swift) & Android (Kotlin) or Unified Cross-Platform (Flutter / React Native)',
                'Pixel-perfect, accessible UI/UX with smooth micro-interactions and haptic feedback',
                'Offline-first SQLite/Realm sync & background task scheduling',
                'End-to-end App Store & Google Play Store submission & compliance guarantee',
                'Real-time crash analytics, push notification engine, and performance monitoring'
            ],
            'techStack' => ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Firebase', 'GraphQL', 'WebSockets', 'AWS Mobile Hub'],
            'timeline' => 'MVP in 4–6 weeks · Full Production Release in 8–12 weeks',
            'architecturePillars' => ['60 FPS Fluid UI', 'Biometric Security (FaceID/Fingerprint)', '100% Native Hardware Access', 'Offline-First Sync']
        ];
    }

    // 2. Enterprise AI & Agentic Systems / Machine Learning
    if (strpos($s, 'ai') !== false || strpos($s, 'agent') !== false || strpos($s, 'llm') !== false || strpos($s, 'machine learning') !== false || strpos($s, 'rag') !== false || strpos($s, 'gpt') !== false) {
        return [
            'title' => 'Enterprise AI & Autonomous Agentic Systems',
            'headline' => 'Private, Domain-Tuned Intelligence & Automated Agentic Workflows',
            'overview' => 'We architect production-ready AI solutions that integrate directly into your operational pipelines. From custom Retrieval-Augmented Generation (RAG) over proprietary enterprise knowledge bases to autonomous multi-step reasoning agents, our solutions ensure strict private data sovereignty and measurable ROI.',
            'deliverables' => [
                'Autonomous Multi-Agent Task Orchestration & Tool Calling',
                'Private Enterprise Knowledge Base (RAG with Vector Search & Hybrid Retrieval)',
                'Domain-Specific LLM Fine-Tuning & Quantized On-Premise Inference',
                'Automated Guardrails, Hallucination Prevention & Prompt Hardening',
                'Enterprise RBAC & Private Data Sovereignty (Zero Third-Party Model Training)'
            ],
            'techStack' => ['Python', 'LangChain', 'LlamaIndex', 'OpenAI / Claude / Gemini', 'vLLM / Ollama', 'Pinecone / Qdrant / pgvector', 'FastAPI', 'Docker'],
            'timeline' => 'Proof of Concept in 2–3 weeks · Production Deployment in 6–8 weeks',
            'architecturePillars' => ['Zero Training on Customer Data', 'Sub-second Vector Search', 'Multi-Agent Autonomous Loops', 'Audit Trails & Explainability']
        ];
    }

    // 3. Cloud Architecture & DevOps
    if (strpos($s, 'cloud') !== false || strpos($s, 'devops') !== false || strpos($s, 'kubernetes') !== false || strpos($s, 'aws') !== false || strpos($s, 'azure') !== false || strpos($s, 'infra') !== false) {
        return [
            'title' => 'Cloud Architecture & DevOps Modernization',
            'headline' => 'Resilient Multi-Cloud Foundations with 99.99% Availability & Automated CI/CD',
            'overview' => 'Our certified cloud architects design, modernize, and automate enterprise infrastructure. We implement Infrastructure as Code (IaC), zero-downtime blue/green deployments, auto-scaling Kubernetes clusters, and rigorous cloud cost optimization audits that cut waste by up to 40%.',
            'deliverables' => [
                'Multi-Cloud Architecture Blueprint (AWS / Azure / Google Cloud)',
                'Infrastructure as Code (IaC) via Terraform & OpenTofu',
                'Container Orchestration with Kubernetes (EKS / GKE / AKS)',
                'Automated GitOps CI/CD Pipelines (GitHub Actions / GitLab / ArgoCD)',
                '24/7 Observability, Prometheus / Grafana Dashboards & Automated Alerting'
            ],
            'techStack' => ['AWS', 'Microsoft Azure', 'Google Cloud (GCP)', 'Terraform', 'Kubernetes (K8s)', 'Docker', 'ArgoCD', 'Prometheus & Grafana'],
            'timeline' => 'Infrastructure Audit in 1 week · Complete Pipeline Migration in 4–6 weeks',
            'architecturePillars' => ['99.99% SLA Uptime', 'Zero-Downtime Blue/Green Deployments', 'Disaster Recovery (RTO < 15m)', 'Up to 40% Cost Savings']
        ];
    }

    // 4. FinTech & Payment Solutions
    if (strpos($s, 'fintech') !== false || strpos($s, 'payment') !== false || strpos($s, 'upi') !== false || strpos($s, 'banking') !== false || strpos($s, 'wallet') !== false) {
        return [
            'title' => 'FinTech & Digital Payment Gateway Solutions',
            'headline' => 'Bank-Grade Financial Infrastructures Aligned with Global Regulatory Standards',
            'overview' => 'AsthaSoft builds mission-critical financial systems, automated reconciliation pipelines, custom digital payment gateways, and neo-banking backends. We enforce strict cryptographic data isolation, PCI-DSS compliance alignment, and sub-second idempotent transaction processing.',
            'deliverables' => [
                'Unified Payment Gateway Orchestration (Stripe, Razorpay, UPI, PayPal, Apple Pay)',
                'Double-Entry Ledger Bookkeeping Engine with Mathematical Immutability',
                'Real-time Fraud Detection, Velocity Checks & Risk Scoring',
                'Automated Settlement, Split Payments & Dispute Management Workflows',
                'PCI-DSS Compliant Tokenization & AES-256 Hardware Security Module (HSM) Encryption'
            ],
            'techStack' => ['Node.js', 'Go', 'PostgreSQL', 'Redis Cluster', 'Kafka', 'PCI-DSS Infrastructure', 'AES-256 / RSA Encryption', 'Docker'],
            'timeline' => 'Core Engine in 6–8 weeks · Regulatory Validation in 10–14 weeks',
            'architecturePillars' => ['Sub-second Transaction Latency', 'Bank-Grade Cryptographic Security', 'Idempotent Execution Engine', 'Zero Double-Spend Guarantee']
        ];
    }

    // 5. Messaging & SMS/OTP/RCS Infrastructure
    if (strpos($s, 'message') !== false || strpos($s, 'sms') !== false || strpos($s, 'otp') !== false || strpos($s, 'rcs') !== false || strpos($s, 'whatsapp') !== false || strpos($s, 'telecom') !== false) {
        return [
            'title' => 'Enterprise Messaging & SMS/OTP/RCS Infrastructure',
            'headline' => 'Ultra-High-Throughput Telecom Gateways Delivering 99.9% Reliability',
            'overview' => 'We engineer carrier-grade telecommunication pipelines capable of processing millions of transactional SMS, OTP verifications, RCS rich messages, and WhatsApp Business API interactions per hour with sub-5-second global delivery.',
            'deliverables' => [
                'SMPP v3.4/5.0 Gateway Integration with Direct Telecom Carrier Routing',
                'Intelligent Multi-Route Dynamic Failover & Lowest-Latency Selection',
                'Enterprise Global OTP Verification Engine with Rate Limiting & Fraud Throttling',
                'RCS Business Messaging & Meta WhatsApp Cloud API Connectors',
                'Regulatory DLT (Distributed Ledger Technology) Template & Header Automation'
            ],
            'techStack' => ['SMPP Protocol', 'Node.js', 'Go', 'Redis', 'Apache Kafka', 'PostgreSQL', 'RESTful Microservices', 'Docker'],
            'timeline' => 'Integration in 2–3 weeks · Carrier Binding in 4 weeks',
            'architecturePillars' => ['Sub-5-Second OTP Delivery', 'Dynamic Carrier Failover', 'DLT Compliance Aligned', '99.99% Routing Redundancy']
        ];
    }

    // 6. Legacy Modernization & Refactoring
    if (strpos($s, 'legacy') !== false || strpos($s, 'moderniz') !== false || strpos($s, 'refactor') !== false || strpos($s, 'migrat') !== false) {
        return [
            'title' => 'Legacy Codebase Modernization & Architecture Refactoring',
            'headline' => 'Zero-Downtime Migration from Brittle Monoliths to Scalable Microservices',
            'overview' => 'Transform aging legacy applications into high-velocity, cloud-native architectures without halting active business operations. Utilizing the Strangler-Fig pattern, automated regression test suites, and database refactoring, we de-risk your technology stack.',
            'deliverables' => [
                'Architectural Health & Technical Debt Assessment Report',
                'Incremental Strangler-Fig Microservice Extraction Plan',
                'Database Schema Decoupling & Automated Zero-Downtime Data Migration',
                'Automated End-to-End Regression Test Harnesses & Contract Testing',
                'Modern CI/CD Deployment Pipelines & Developer Productivity Tooling'
            ],
            'techStack' => ['TypeScript', 'Node.js', 'Go', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
            'timeline' => 'Architecture Audit in 2 weeks · Phased Delivery in 6–12 weeks',
            'architecturePillars' => ['Zero Business Disruption', 'Strict Backward Compatibility', 'Automated Regression Testing', 'Clean Hexagonal Architecture']
        ];
    }

    // 7. Dedicated Engineering Pod
    if (strpos($s, 'pod') !== false || strpos($s, 'dedicated') !== false || strpos($s, 'staff') !== false || strpos($s, 'team') !== false) {
        return [
            'title' => 'Dedicated Senior Engineering Pod',
            'headline' => 'Full-Stack Agile Squads Integrated Directly into Your Product Roadmap',
            'overview' => 'Scale your engineering output with autonomous, top 1% senior engineering teams. Every pod includes a Solution Architect, Senior Full-Stack Developers, QA Engineers, and a dedicated Technical Project Manager aligned to your timezone and tech stack.',
            'deliverables' => [
                'Full-Stack Dedicated Squad (Architect, Developers, DevOps, QA)',
                'Daily Standups, 2-Week Agile Sprints & Transparent Jira/Slack Integration',
                'Complete Source Code Handover & Rigorous Clean-Code Standards',
                'Zero Overhead: Immediate Onboarding within 5–7 Business Days',
                'Flexible Scaling: Seamlessly Ramp Up or Down Based on Roadmap Needs'
            ],
            'techStack' => ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'AWS / Azure', 'Docker'],
            'timeline' => 'Squad Onboarding in 5–7 Days · First Sprint Deliverables in 2 Weeks',
            'architecturePillars' => ['Top 1% Vetted Talent', 'Overlapping Timezone Alignment', 'Complete Code Ownership', 'Senior Technical Leadership']
        ];
    }

    // 8. Default: Custom Enterprise Software
    return [
        'title' => 'Custom Enterprise Software Development',
        'headline' => 'Tailored Digital Platforms Engineered for Scalability, Security & 100% IP Transfer',
        'overview' => 'AsthaSoft designs and delivers custom enterprise software tailored specifically to your organization’s operational models. We eliminate off-the-shelf software limitations with modular microservices, enterprise database architectures, and intuitive web interfaces.',
        'deliverables' => [
            'Tailored Architecture Blueprint & System Design Document (SDD)',
            'Enterprise Web Portals, Multi-Tenant SaaS & Workflow Automation Systems',
            'Robust REST & GraphQL APIs with Comprehensive OpenAPI Documentation',
            'Bank-Grade Security Architecture (Role-Based Access Control, OWASP Top 10 Protected)',
            '100% Intellectual Property & Source Code Ownership Handover'
        ],
        'techStack' => ['React / Next.js', 'TypeScript', 'Node.js / Python / Go', 'PostgreSQL / MongoDB', 'Redis', 'Docker / Kubernetes', 'AWS / Azure'],
        'timeline' => 'Architecture & Prototype in 2–3 weeks · MVP in 6–8 weeks · Production in 10–14 weeks',
        'architecturePillars' => ['100% Source Code Ownership', 'Modular Microservices Design', 'Zero Vendor Lock-in', 'Enterprise Security & RBAC']
    ];
}

$serviceInfo = getServiceDetailsPhp($serviceRequired);

// Build Deliverables HTML items
$deliverablesHtmlRows = '';
foreach ($serviceInfo['deliverables'] as $item) {
    $deliverablesHtmlRows .= "<tr>
      <td style='padding: 6px 12px 6px 0; vertical-align: top; color: #0284c7; font-weight: 700; font-size: 15px; line-height: 1.4; width: 22px;'>✓</td>
      <td style='padding: 6px 0; vertical-align: top; color: #334155; font-size: 13.5px; line-height: 1.5;'>" . htmlspecialchars($item, ENT_QUOTES, 'UTF-8') . "</td>
    </tr>";
}

// Build Tech Stack badges for HTML
$techStackBadges = '';
foreach ($serviceInfo['techStack'] as $tech) {
    $techStackBadges .= "<span style='display: inline-block; padding: 4px 10px; margin: 3px 6px 3px 0; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-weight: 600; color: #334155;'>" . htmlspecialchars($tech, ENT_QUOTES, 'UTF-8') . "</span>";
}

// Plain text deliverables and stacks
$deliverablesPlain = '';
foreach ($serviceInfo['deliverables'] as $item) {
    $deliverablesPlain .= "  [✓] " . $item . "\n";
}
$techStackPlain = implode('  ·  ', $serviceInfo['techStack']);
$pillarsPlain = implode('  ·  ', $serviceInfo['architecturePillars']);

$ndaStatusPlain = $requestNDA
    ? "Status: [✓] Formal Mutual NDA Requested\nWe have logged your request for a formal Non-Disclosure Agreement. Prior to scheduling technical architecture reviews or sharing technical schemas, our legal team will provide a countersigned Mutual NDA to safeguard your proprietary intellectual property."
    : "Status: Standard Bilateral Confidentiality\nAll project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.";

$specsPlain = "Service Requested : {$serviceRequired}\nContact Number    : {$contactNumber}\n";
if ($budget) $specsPlain .= "Estimated Budget  : {$budget}\n";
if ($timeline) $specsPlain .= "Delivery Target   : {$timeline}\n";
if ($preferredTime) $specsPlain .= "Preferred Time    : {$preferredTime}\n";
$specsPlain .= "Project Brief     : {$projectDescription}";

$customerPlainText = "================================================================================
ASTHASOFT TECHNOLOGIES | ENTERPRISE SOFTWARE & CLOUD ENGINEERING
TICKET: #{$ticketId}
================================================================================

YOUR SCOPING REQUEST HAS BEEN RECEIVED

Dear {$name},

Thank you for contacting AsthaSoft Technologies. We have received your project 
details regarding {$serviceInfo['title']}.

--------------------------------------------------------------------------------
RESPONSE COMMITMENT (24 HOURS)
--------------------------------------------------------------------------------
A Senior Solution Architect is currently reviewing your project requirements
and will connect with you within 24 hours with technical insights, architecture
recommendations, and next steps.

--------------------------------------------------------------------------------
1. SERVICE SPECIFICATION & CAPABILITIES
--------------------------------------------------------------------------------
Service  : {$serviceInfo['title']}
Headline : {$serviceInfo['headline']}

Overview:
{$serviceInfo['overview']}

Key Deliverables & Engineering Scope:
{$deliverablesPlain}
Recommended Technology Stack:
  • {$techStackPlain}

Execution Standards:
  • Typical Timeline : {$serviceInfo['timeline']}
  • Methodology      : Agile 2-Week Sprints · Continuous Staging Deployments · Daily Standup Visibility
  • Core Guarantees  : {$pillarsPlain}

--------------------------------------------------------------------------------
2. CONFIDENTIALITY & NDA STATUS
--------------------------------------------------------------------------------
{$ndaStatusPlain}

--------------------------------------------------------------------------------
3. SUMMARY OF SUBMITTED SCOPE
--------------------------------------------------------------------------------
{$specsPlain}

--------------------------------------------------------------------------------
4. WHAT HAPPENS NEXT
--------------------------------------------------------------------------------
1. Scope Review      : A dedicated Solution Architect reviews your specifications within 24 hours.
2. Discovery Call    : We align on technical architecture, sprint breakdown, and security requirements.
3. Fixed-Scope Quote : You receive an architecture document, sprint plan, and transparent milestone quote.

Have existing architecture diagrams, wireframes, or RFP documents to share?
Simply reply directly to this email and our technical team will review them ahead of our call.

================================================================================
Strategic Consulting & Engineering Team
AsthaSoft Technologies · Enterprise Solutions
Direct Email: sales@asthasoftindia.com

© " . date('Y') . " AsthaSoft Technologies. All rights reserved.
ISO-Aligned Architecture · Strict NDA Security · Guaranteed 100% IP Transfer
================================================================================
";

$safeServiceTitle = htmlspecialchars($serviceInfo['title'], ENT_QUOTES, 'UTF-8');
$safeHeadline = htmlspecialchars($serviceInfo['headline'], ENT_QUOTES, 'UTF-8');
$safeOverview = htmlspecialchars($serviceInfo['overview'], ENT_QUOTES, 'UTF-8');
$safeTimeline = htmlspecialchars($serviceInfo['timeline'], ENT_QUOTES, 'UTF-8');
$safePillars = htmlspecialchars($pillarsPlain, ENT_QUOTES, 'UTF-8');

$extraSpecsRows = '';
if ($budget) {
    $extraSpecsRows .= "<tr>
      <td style='padding: 10px 16px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; width: 150px;'>Estimated Budget:</td>
      <td style='padding: 10px 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9;'>" . htmlspecialchars($budget, ENT_QUOTES, 'UTF-8') . "</td>
    </tr>";
}
if ($timeline) {
    $extraSpecsRows .= "<tr>
      <td style='padding: 10px 16px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;'>Delivery Target:</td>
      <td style='padding: 10px 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9;'>" . htmlspecialchars($timeline, ENT_QUOTES, 'UTF-8') . "</td>
    </tr>";
}
if ($preferredTime) {
    $extraSpecsRows .= "<tr>
      <td style='padding: 10px 16px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;'>Preferred Time:</td>
      <td style='padding: 10px 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9;'>" . htmlspecialchars($preferredTime, ENT_QUOTES, 'UTF-8') . "</td>
    </tr>";
}

$ndaBg = $requestNDA ? '#f0fdf4' : '#f8fafc';
$ndaBorder = $requestNDA ? '#bbf7d0' : '#e2e8f0';
$ndaTitleColor = $requestNDA ? '#166534' : '#0f172a';
$ndaTextColor = $requestNDA ? '#15803d' : '#475569';
$ndaTitle = $requestNDA ? '✓ Non-Disclosure Agreement (NDA) Requested' : 'Confidentiality Notice';
$ndaBody = $requestNDA
    ? 'We have logged your request for a formal Non-Disclosure Agreement. Prior to scheduling technical architecture reviews or sharing technical schemas, our legal team will provide a countersigned Mutual NDA to safeguard your proprietary intellectual property.'
    : 'All project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.';

$currentYear = date('Y');

$customerEmailHtml = "<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <title>Your Scoping Request Has Been Received - AsthaSoft</title>
</head>
<body style='margin: 0; padding: 32px 16px; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b; line-height: 1.6;'>
  <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0' style='max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);'>
    <!-- Brand Header -->
    <tr>
      <td style='padding: 26px 32px; background-color: #0f172a; background-image: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);'>
        <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0'>
          <tr>
            <td>
              <div style='font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;'>AsthaSoft</div>
              <div style='font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px;'>Enterprise Software &amp; Cloud Engineering</div>
            </td>
            <td align='right' style='vertical-align: top;'>
              <span style='display: inline-block; padding: 6px 12px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 6px; font-size: 12px; font-weight: 600; color: #38bdf8; font-family: monospace;'>#{$safeTicketId}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style='padding: 32px;'>
        <h1 style='margin: 0 0 14px; font-size: 21px; font-weight: 700; color: #0f172a; line-height: 1.3;'>Your Scoping Request Has Been Received</h1>
        <p style='margin: 0 0 14px; font-size: 15px; color: #334155;'>
          Dear <strong>{$safeName}</strong>,
        </p>
        <p style='margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;'>
          Thank you for contacting <strong>AsthaSoft Technologies</strong>. We have registered your project details regarding <strong>{$safeServiceTitle}</strong> and initiated preliminary technical review.
        </p>

        <!-- Response Commitment Callout Box -->
        <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0' style='margin-bottom: 28px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-left: 4px solid #0284c7; border-radius: 8px;'>
          <tr>
            <td style='padding: 16px 20px;'>
              <div style='font-size: 12px; font-weight: 700; color: #0369a1; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 4px;'>⚡ 24-Hour Response Commitment</div>
              <div style='font-size: 13.5px; color: #0c4a6e; line-height: 1.5;'>
                A Senior Solution Architect is currently reviewing your project requirements and will connect with you within <strong>24 hours</strong> with technical insights and recommended architecture.
              </div>
            </td>
          </tr>
        </table>

        <!-- Service Specification Section -->
        <div style='margin-bottom: 28px;'>
          <div style='font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0284c7; margin-bottom: 6px;'>Service Specification &amp; Capabilities</div>
          <div style='font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 4px;'>{$safeServiceTitle}</div>
          <div style='font-size: 13px; font-weight: 600; color: #64748b; margin-bottom: 12px;'>{$safeHeadline}</div>
          <p style='margin: 0 0 16px; font-size: 14px; color: #334155; line-height: 1.6;'>
            {$safeOverview}
          </p>

          <!-- Key Deliverables Table -->
          <div style='background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;'>
            <div style='font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 12px;'>Key Deliverables &amp; Engineering Scope:</div>
            <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0'>
              {$deliverablesHtmlRows}
            </table>
          </div>

          <!-- Recommended Tech Stack -->
          <div style='margin-bottom: 18px;'>
            <div style='font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;'>Recommended Technology Stack:</div>
            <div style='font-size: 13px; color: #1e293b; line-height: 1.8;'>
              {$techStackBadges}
            </div>
          </div>

          <!-- Execution Standards Table -->
          <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0' style='border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px;'>
            <tr>
              <td style='padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 140px; vertical-align: top;'>Typical Timeline:</td>
              <td style='padding: 10px 0; font-size: 13px; color: #0f172a;'>{$safeTimeline}</td>
            </tr>
            <tr>
              <td style='padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;'>Methodology:</td>
              <td style='padding: 10px 0; font-size: 13px; color: #0f172a;'>Agile 2-Week Sprints · Continuous Staging Deployments · Daily Standup Visibility</td>
            </tr>
            <tr>
              <td style='padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; vertical-align: top;'>Core Guarantees:</td>
              <td style='padding: 10px 0; font-size: 13px; color: #0f172a;'>{$safePillars}</td>
            </tr>
          </table>
        </div>

        <!-- NDA Section -->
        <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0' style='margin-bottom: 28px; background-color: {$ndaBg}; border: 1px solid {$ndaBorder}; border-radius: 8px;'>
          <tr>
            <td style='padding: 14px 18px;'>
              <div style='font-size: 13px; font-weight: 700; color: {$ndaTitleColor}; margin-bottom: 4px;'>
                {$ndaTitle}
              </div>
              <div style='font-size: 13px; color: {$ndaTextColor}; line-height: 1.5;'>
                {$ndaBody}
              </div>
            </td>
          </tr>
        </table>

        <!-- Summary of Submitted Scope -->
        <div style='margin-bottom: 28px;'>
          <div style='font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0284c7; margin-bottom: 8px;'>Summary of Submitted Scope</div>
          <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0' style='background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px;'>
            <tr>
              <td style='padding: 10px 16px; color: #64748b; font-weight: 600; width: 150px; border-bottom: 1px solid #f1f5f9;'>Service Requested:</td>
              <td style='padding: 10px 16px; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;'>{$safeService}</td>
            </tr>
            <tr>
              <td style='padding: 10px 16px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;'>Contact Number:</td>
              <td style='padding: 10px 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9;'><a href='tel:{$safePhoneClean}' style='color: #0284c7; text-decoration: underline; font-weight: 600;'>{$safePhone}</a></td>
            </tr>
            {$extraSpecsRows}
            <tr>
              <td style='padding: 10px 16px; color: #64748b; font-weight: 600; vertical-align: top;'>Project Brief:</td>
              <td style='padding: 10px 16px; color: #334155; line-height: 1.5;'>{$safeDescription}</td>
            </tr>
          </table>
        </div>

        <!-- What Happens Next -->
        <div style='margin-bottom: 28px;'>
          <div style='font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0284c7; margin-bottom: 12px;'>What Happens Next</div>
          <table role='presentation' width='100%' cellpadding='0' cellspacing='0' border='0'>
            <tr>
              <td style='vertical-align: top; width: 32px; padding-bottom: 12px;'>
                <div style='width: 24px; height: 24px; border-radius: 50%; background-color: #0284c7; color: #ffffff; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;'>1</div>
              </td>
              <td style='padding-bottom: 12px; font-size: 13px; line-height: 1.5; color: #334155;'>
                <strong style='color: #0f172a;'>Scope Review:</strong> A dedicated Solution Architect reviews your specifications within 24 hours.
              </td>
            </tr>
            <tr>
              <td style='vertical-align: top; width: 32px; padding-bottom: 12px;'>
                <div style='width: 24px; height: 24px; border-radius: 50%; background-color: #0284c7; color: #ffffff; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;'>2</div>
              </td>
              <td style='padding-bottom: 12px; font-size: 13px; line-height: 1.5; color: #334155;'>
                <strong style='color: #0f172a;'>Discovery Call:</strong> We align on technical architecture, sprint breakdown, and security requirements.
              </td>
            </tr>
            <tr>
              <td style='vertical-align: top; width: 32px; padding-bottom: 12px;'>
                <div style='width: 24px; height: 24px; border-radius: 50%; background-color: #0284c7; color: #ffffff; text-align: center; line-height: 24px; font-size: 12px; font-weight: 700;'>3</div>
              </td>
              <td style='padding-bottom: 12px; font-size: 13px; line-height: 1.5; color: #334155;'>
                <strong style='color: #0f172a;'>Fixed-Scope Proposal:</strong> You receive an architecture document, sprint plan, and transparent milestone quote.
              </td>
            </tr>
          </table>

          <div style='margin-top: 10px; padding: 14px 16px; background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; font-size: 13px; color: #475569; line-height: 1.5;'>
            📎 <strong>Have existing architecture diagrams, wireframes, or RFP documents to share?</strong><br>
            Simply reply directly to this email and our technical team will review them ahead of our call.
          </div>
        </div>

        <!-- Team Signoff -->
        <div style='border-top: 1px solid #e2e8f0; padding-top: 20px;'>
          <div style='font-size: 14px; font-weight: 700; color: #0f172a;'>Strategic Consulting &amp; Engineering Team</div>
          <div style='font-size: 13px; color: #64748b; margin-top: 2px;'>
            AsthaSoft Technologies · Enterprise Solutions · <a href='mailto:sales@asthasoftindia.com' style='color: #0284c7; text-decoration: underline;'>sales@asthasoftindia.com</a>
          </div>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style='padding: 20px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;'>
        <div style='font-size: 12px; color: #64748b; line-height: 1.6;'>
          © {$currentYear} AsthaSoft Technologies. All rights reserved.<br>
          <span style='color: #94a3b8; font-size: 11px;'>ISO-Aligned Architecture · Strict NDA Security · Guaranteed 100% IP Transfer</span>
        </div>
      </td>
    </tr>
  </table>
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
$customerSubject = "Your Inquiry: " . $serviceInfo['title'] . " with AsthaSoft";

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

    // 2. Send Customer Auto-Reply with detailed service intelligence
    if ($hasRealCustomerEmail) {
        $customerResult = sendViaResend(
            $resendApiKey,
            $resendFromEmail,
            $email,
            $customerSubject,
            $customerPlainText,
            $customerEmailHtml,
            $adminEmail
        );
    }
}

$salesSent = ($salesResult && $salesResult['success']);

// Fallback to native PHP mail() if Resend failed for admin
if (!$salesSent) {
    $mailHeaders = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\nFrom: AsthaSoft Technologies <sales@asthapay.in>\r\n";
    if ($hasRealCustomerEmail) {
        $mailHeaders .= "Reply-To: {$email}\r\n";
    }
    $salesSent = @mail($adminEmail, $leadSubject, $plainText, $mailHeaders);
}

// Fallback to native PHP mail() if Resend failed for customer
$customerSent = ($customerResult && $customerResult['success']);
if (!$customerSent && $hasRealCustomerEmail) {
    $custMailHeaders = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\nFrom: AsthaSoft Technologies <sales@asthapay.in>\r\nReply-To: {$adminEmail}\r\n";
    $mailSent = @mail($email, $customerSubject, $customerEmailHtml, $custMailHeaders);
    if ($mailSent) {
        $customerSent = true;
    }
}

if ($salesSent || $customerSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Scoping session request submitted successfully.',
        'ticketId' => $ticketId,
        'adminEmail' => $adminEmail,
        'adminNotification' => $salesSent ? 'delivered' : 'queued',
        'customerAutoReply' => $customerSent ? 'sent' : ($hasRealCustomerEmail ? 'skipped' : 'not_requested'),
        'fromEmail' => $resendFromEmail,
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

