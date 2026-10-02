export interface ScopingSessionLead {
  name: string;
  email: string;
  contactNumber: string;
  serviceRequired: string;
  projectDescription: string;
  requestNDA: boolean;
  timestamp?: string;
  ticketId?: string;
  source?: string;
  budget?: string;
  timeline?: string;
  preferredTime?: string;
}

/**
 * Escapes HTML characters to prevent XSS in email clients
 */
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface ServiceDetails {
  title: string;
  headline: string;
  overview: string;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  architecturePillars: string[];
}

/**
 * Resolves structured engineering specifications and deliverables for any selected service.
 */
export function getServiceDetails(rawService: string = ''): ServiceDetails {
  const s = rawService.toLowerCase();

  // 1. Mobile App Development
  if (
    s.includes('mobile') ||
    s.includes('ios') ||
    s.includes('android') ||
    s.includes('flutter') ||
    s.includes('react native') ||
    s.includes('app')
  ) {
    return {
      title: 'Mobile Application Development (iOS & Android)',
      headline: 'Native & Cross-Platform Apps Engineered for 60fps Performance & Global Scale',
      overview:
        'AsthaSoft engineers high-performance, intuitive mobile experiences from concept to App Store and Google Play launch. We specialize in fluid 60 FPS interfaces, offline-first data synchronization, biometric authentication, and enterprise-grade backend APIs.',
      deliverables: [
        'Native iOS (Swift) & Android (Kotlin) or Unified Cross-Platform (Flutter / React Native)',
        'Pixel-perfect, accessible UI/UX with smooth micro-interactions and haptic feedback',
        'Offline-first SQLite/Realm sync & background task scheduling',
        'End-to-end App Store & Google Play Store submission & compliance guarantee',
        'Real-time crash analytics, push notification engine, and performance monitoring',
      ],
      techStack: ['Flutter', 'React Native', 'Swift (iOS)', 'Kotlin (Android)', 'Firebase', 'GraphQL', 'WebSockets', 'AWS Mobile Hub'],
      timeline: 'MVP in 4–6 weeks · Full Production Release in 8–12 weeks',
      architecturePillars: ['60 FPS Fluid UI', 'Biometric Security (FaceID/Fingerprint)', '100% Native Hardware Access', 'Offline-First Sync'],
    };
  }

  // 2. Enterprise AI & Agentic Systems / Machine Learning
  if (
    s.includes('ai') ||
    s.includes('agent') ||
    s.includes('llm') ||
    s.includes('machine learning') ||
    s.includes('rag') ||
    s.includes('gpt')
  ) {
    return {
      title: 'Enterprise AI & Autonomous Agentic Systems',
      headline: 'Private, Domain-Tuned Intelligence & Automated Agentic Workflows',
      overview:
        'We architect production-ready AI solutions that integrate directly into your operational pipelines. From custom Retrieval-Augmented Generation (RAG) over proprietary enterprise knowledge bases to autonomous multi-step reasoning agents, our solutions ensure strict private data sovereignty and measurable ROI.',
      deliverables: [
        'Autonomous Multi-Agent Task Orchestration & Tool Calling',
        'Private Enterprise Knowledge Base (RAG with Vector Search & Hybrid Retrieval)',
        'Domain-Specific LLM Fine-Tuning & Quantized On-Premise Inference',
        'Automated Guardrails, Hallucination Prevention & Prompt Hardening',
        'Enterprise RBAC & Private Data Sovereignty (Zero Third-Party Model Training)',
      ],
      techStack: ['Python', 'LangChain', 'LlamaIndex', 'OpenAI / Claude / Gemini', 'vLLM / Ollama', 'Pinecone / Qdrant / pgvector', 'FastAPI', 'Docker'],
      timeline: 'Proof of Concept in 2–3 weeks · Production Deployment in 6–8 weeks',
      architecturePillars: ['Zero Training on Customer Data', 'Sub-second Vector Search', 'Multi-Agent Autonomous Loops', 'Audit Trails & Explainability'],
    };
  }

  // 3. Cloud Architecture & DevOps
  if (
    s.includes('cloud') ||
    s.includes('devops') ||
    s.includes('kubernetes') ||
    s.includes('aws') ||
    s.includes('azure') ||
    s.includes('infra')
  ) {
    return {
      title: 'Cloud Architecture & DevOps Modernization',
      headline: 'Resilient Multi-Cloud Foundations with 99.99% Availability & Automated CI/CD',
      overview:
        'Our certified cloud architects design, modernize, and automate enterprise infrastructure. We implement Infrastructure as Code (IaC), zero-downtime blue/green deployments, auto-scaling Kubernetes clusters, and rigorous cloud cost optimization audits that cut waste by up to 40%.',
      deliverables: [
        'Multi-Cloud Architecture Blueprint (AWS / Azure / Google Cloud)',
        'Infrastructure as Code (IaC) via Terraform & OpenTofu',
        'Container Orchestration with Kubernetes (EKS / GKE / AKS)',
        'Automated GitOps CI/CD Pipelines (GitHub Actions / GitLab / ArgoCD)',
        '24/7 Observability, Prometheus / Grafana Dashboards & Automated Alerting',
      ],
      techStack: ['AWS', 'Microsoft Azure', 'Google Cloud (GCP)', 'Terraform', 'Kubernetes (K8s)', 'Docker', 'ArgoCD', 'Prometheus & Grafana'],
      timeline: 'Infrastructure Audit in 1 week · Complete Pipeline Migration in 4–6 weeks',
      architecturePillars: ['99.99% SLA Uptime', 'Zero-Downtime Blue/Green Deployments', 'Disaster Recovery (RTO < 15m)', 'Up to 40% Cost Savings'],
    };
  }

  // 4. FinTech & Payment Solutions
  if (
    s.includes('fintech') ||
    s.includes('payment') ||
    s.includes('upi') ||
    s.includes('banking') ||
    s.includes('wallet')
  ) {
    return {
      title: 'FinTech & Digital Payment Gateway Solutions',
      headline: 'Bank-Grade Financial Infrastructures Aligned with Global Regulatory Standards',
      overview:
        'AsthaSoft builds mission-critical financial systems, automated reconciliation pipelines, custom digital payment gateways, and neo-banking backends. We enforce strict cryptographic data isolation, PCI-DSS compliance alignment, and sub-second idempotent transaction processing.',
      deliverables: [
        'Unified Payment Gateway Orchestration (Stripe, Razorpay, UPI, PayPal, Apple Pay)',
        'Double-Entry Ledger Bookkeeping Engine with Mathematical Immutability',
        'Real-time Fraud Detection, Velocity Checks & Risk Scoring',
        'Automated Settlement, Split Payments & Dispute Management Workflows',
        'PCI-DSS Compliant Tokenization & AES-256 Hardware Security Module (HSM) Encryption',
      ],
      techStack: ['Node.js', 'Go', 'PostgreSQL', 'Redis Cluster', 'Kafka', 'PCI-DSS Infrastructure', 'AES-256 / RSA Encryption', 'Docker'],
      timeline: 'Core Engine in 6–8 weeks · Regulatory Validation in 10–14 weeks',
      architecturePillars: ['Sub-second Transaction Latency', 'Bank-Grade Cryptographic Security', 'Idempotent Execution Engine', 'Zero Double-Spend Guarantee'],
    };
  }

  // 5. Messaging & SMS/OTP/RCS Infrastructure
  if (
    s.includes('message') ||
    s.includes('sms') ||
    s.includes('otp') ||
    s.includes('rcs') ||
    s.includes('whatsapp') ||
    s.includes('telecom')
  ) {
    return {
      title: 'Enterprise Messaging & SMS/OTP/RCS Infrastructure',
      headline: 'Ultra-High-Throughput Telecom Gateways Delivering 99.9% Reliability',
      overview:
        'We engineer carrier-grade telecommunication pipelines capable of processing millions of transactional SMS, OTP verifications, RCS rich messages, and WhatsApp Business API interactions per hour with sub-5-second global delivery.',
      deliverables: [
        'SMPP v3.4/5.0 Gateway Integration with Direct Telecom Carrier Routing',
        'Intelligent Multi-Route Dynamic Failover & Lowest-Latency Selection',
        'Enterprise Global OTP Verification Engine with Rate Limiting & Fraud Throttling',
        'RCS Business Messaging & Meta WhatsApp Cloud API Connectors',
        'Regulatory DLT (Distributed Ledger Technology) Template & Header Automation',
      ],
      techStack: ['SMPP Protocol', 'Node.js', 'Go', 'Redis', 'Apache Kafka', 'PostgreSQL', 'RESTful Microservices', 'Docker'],
      timeline: 'Integration in 2–3 weeks · Carrier Binding in 4 weeks',
      architecturePillars: ['Sub-5-Second OTP Delivery', 'Dynamic Carrier Failover', 'DLT Compliance Aligned', '99.99% Routing Redundancy'],
    };
  }

  // 6. Legacy Modernization & Refactoring
  if (
    s.includes('legacy') ||
    s.includes('moderniz') ||
    s.includes('refactor') ||
    s.includes('migrat')
  ) {
    return {
      title: 'Legacy Codebase Modernization & Architecture Refactoring',
      headline: 'Zero-Downtime Migration from Brittle Monoliths to Scalable Microservices',
      overview:
        'Transform aging legacy applications into high-velocity, cloud-native architectures without halting active business operations. Utilizing the Strangler-Fig pattern, automated regression test suites, and database refactoring, we de-risk your technology stack.',
      deliverables: [
        'Architectural Health & Technical Debt Assessment Report',
        'Incremental Strangler-Fig Microservice Extraction Plan',
        'Database Schema Decoupling & Automated Zero-Downtime Data Migration',
        'Automated End-to-End Regression Test Harnesses & Contract Testing',
        'Modern CI/CD Deployment Pipelines & Developer Productivity Tooling',
      ],
      techStack: ['TypeScript', 'Node.js', 'Go', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
      timeline: 'Architecture Audit in 2 weeks · Phased Delivery in 6–12 weeks',
      architecturePillars: ['Zero Business Disruption', 'Strict Backward Compatibility', 'Automated Regression Testing', 'Clean Hexagonal Architecture'],
    };
  }

  // 7. Dedicated Engineering Pod
  if (
    s.includes('pod') ||
    s.includes('dedicated') ||
    s.includes('staff') ||
    s.includes('team')
  ) {
    return {
      title: 'Dedicated Senior Engineering Pod',
      headline: 'Full-Stack Agile Squads Integrated Directly into Your Product Roadmap',
      overview:
        'Scale your engineering output with autonomous, top 1% senior engineering teams. Every pod includes a Solution Architect, Senior Full-Stack Developers, QA Engineers, and a dedicated Technical Project Manager aligned to your timezone and tech stack.',
      deliverables: [
        'Full-Stack Dedicated Squad (Architect, Developers, DevOps, QA)',
        'Daily Standups, 2-Week Agile Sprints & Transparent Jira/Slack Integration',
        'Complete Source Code Handover & Rigorous Clean-Code Standards',
        'Zero Overhead: Immediate Onboarding within 5–7 Business Days',
        'Flexible Scaling: Seamlessly Ramp Up or Down Based on Roadmap Needs',
      ],
      techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'AWS / Azure', 'Docker'],
      timeline: 'Squad Onboarding in 5–7 Days · First Sprint Deliverables in 2 Weeks',
      architecturePillars: ['Top 1% Vetted Talent', 'Overlapping Timezone Alignment', 'Complete Code Ownership', 'Senior Technical Leadership'],
    };
  }

  // 8. Default: Custom Enterprise Software
  return {
    title: 'Custom Enterprise Software Development',
    headline: 'Tailored Digital Platforms Engineered for Scalability, Security & 100% IP Transfer',
    overview:
      'AsthaSoft designs and delivers custom enterprise software tailored specifically to your organization’s operational models. We eliminate off-the-shelf software limitations with modular microservices, enterprise database architectures, and intuitive web interfaces.',
    deliverables: [
      'Tailored Architecture Blueprint & System Design Document (SDD)',
      'Enterprise Web Portals, Multi-Tenant SaaS & Workflow Automation Systems',
      'Robust REST & GraphQL APIs with Comprehensive OpenAPI Documentation',
      'Bank-Grade Security Architecture (Role-Based Access Control, OWASP Top 10 Protected)',
      '100% Intellectual Property & Source Code Ownership Handover',
    ],
    techStack: ['React / Next.js', 'TypeScript', 'Node.js / Python / Go', 'PostgreSQL / MongoDB', 'Redis', 'Docker / Kubernetes', 'AWS / Azure'],
    timeline: 'Architecture & Prototype in 2–3 weeks · MVP in 6–8 weeks · Production in 10–14 weeks',
    architecturePillars: ['100% Source Code Ownership', 'Modular Microservices Design', 'Zero Vendor Lock-in', 'Enterprise Security & RBAC'],
  };
}

/**
 * Customer Auto-Reply Email (HTML Template)
 * Delivers detailed service specifications, deliverables, and tech stack
 * for the exact service the customer requested.
 */
export function renderCustomerAutoReplyHtml(data: ScopingSessionLead): string {
  const safeName = escapeHtml(data.name || 'Valued Partner');
  const safeService = escapeHtml(data.serviceRequired || 'Custom Enterprise Software');
  const safeDescription = escapeHtml(data.projectDescription || 'No description provided');
  const safePhone = escapeHtml(data.contactNumber || 'Not provided');
  const ticketId = data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;

  const serviceInfo = getServiceDetails(data.serviceRequired);

  // Deliverables HTML items
  const deliverablesHtml = serviceInfo.deliverables
    .map(
      (item) => `
      <tr style="vertical-align: top;">
        <td style="padding: 4px 8px 4px 0; color: #0284c7; font-weight: 700; font-size: 15px;">✓</td>
        <td style="padding: 4px 0; color: #334155; font-size: 13px; line-height: 1.5;">${escapeHtml(item)}</td>
      </tr>`
    )
    .join('');

  // Tech stack badges HTML
  const techBadgesHtml = serviceInfo.techStack
    .map(
      (tech) => `
      <span style="display: inline-block; background-color: #f1f5f9; color: #0f172a; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; margin: 3px 3px 3px 0;">
        ${escapeHtml(tech)}
      </span>`
    )
    .join('');

  // Architectural pillars badges
  const pillarsHtml = serviceInfo.architecturePillars
    .map(
      (pillar) => `
      <span style="display: inline-block; background-color: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; border-radius: 4px; padding: 4px 8px; font-size: 11px; font-weight: 600; margin: 3px 3px 3px 0;">
        🛡 ${escapeHtml(pillar)}
      </span>`
    )
    .join('');

  // Conditional NDA section - rendered only if requestNDA is true
  const ndaSection = data.requestNDA
    ? `
    <div style="margin: 20px 0; padding: 16px 20px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 6px;">
      <div style="font-weight: 700; color: #166534; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
        ✓ Non-Disclosure Agreement (NDA) Requested
      </div>
      <p style="margin: 0; color: #15803d; font-size: 13px; line-height: 1.5;">
        We have logged your request for a formal Non-Disclosure Agreement. Prior to scheduling technical architecture reviews or sharing technical schemas, our legal team will provide a countersigned Mutual NDA to safeguard your proprietary intellectual property.
      </p>
    </div>
    `
    : `
    <div style="margin: 20px 0; padding: 12px 18px; background-color: #f8fafc; border-left: 4px solid #94a3b8; border-radius: 6px;">
      <p style="margin: 0; color: #475569; font-size: 12px; line-height: 1.5;">
        <strong>Confidentiality Notice:</strong> All project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.
      </p>
    </div>
    `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Inquiry: ${escapeHtml(serviceInfo.title)} with AsthaSoft</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 35px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); overflow: hidden; border: 1px solid #e2e8f0;">
          
          <!-- Brand Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0A1128 0%, #101F42 100%); padding: 32px 36px 26px 36px; text-align: left;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.2;">
                      Astha<span style="color: #38bdf8;">Soft</span>
                    </div>
                    <div style="font-size: 11px; font-weight: 500; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; margin-top: 4px;">
                      Enterprise Software &amp; Cloud Engineering
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 6px 12px; background-color: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 20px; font-size: 11px; font-weight: 600; color: #38bdf8;">
                      Ticket #${ticketId}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px 36px;">
              <!-- Headline -->
              <h1 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #0f172a; line-height: 1.3;">
                Your Scoping Request Has Been Received
              </h1>

              <p style="margin: 0 0 14px 0; font-size: 15px; color: #334155; line-height: 1.6;">
                Dear <strong>${safeName}</strong>,
              </p>

              <p style="margin: 0 0 18px 0; font-size: 14px; color: #334155; line-height: 1.6;">
                Thank you for contacting <strong>AsthaSoft Technologies</strong>. We have received your project details regarding <strong style="color: #0284c7;">${escapeHtml(serviceInfo.title)}</strong>.
              </p>

              <!-- SLA Commitment Box -->
              <div style="margin: 18px 0; padding: 14px 18px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 6px;">
                <p style="margin: 0; color: #0369a1; font-size: 13px; line-height: 1.5; font-weight: 500;">
                  ⏱ <strong>Response Commitment:</strong> A Senior Solution Architect is currently reviewing your project requirements and will connect with you within <strong>24 hours</strong> with technical insights and recommended architecture.
                </p>
              </div>

              <!-- ============================================== -->
              <!-- SERVICE DEEP-DIVE & ENGINEERING SPECIFICATION -->
              <!-- ============================================== -->
              <div style="margin: 26px 0; border: 1px solid #bfdbfe; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                <!-- Header of Service Panel -->
                <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 14px 20px; color: #ffffff;">
                  <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #93c5fd;">
                    Service Specification &amp; Capabilities
                  </div>
                  <div style="font-size: 16px; font-weight: 700; margin-top: 2px; color: #ffffff;">
                    ${escapeHtml(serviceInfo.title)}
                  </div>
                </div>

                <div style="padding: 20px;">
                  <!-- Tagline -->
                  <div style="font-size: 13px; font-weight: 700; color: #1e3a8a; margin-bottom: 8px;">
                    ${escapeHtml(serviceInfo.headline)}
                  </div>

                  <!-- Overview -->
                  <p style="margin: 0 0 16px 0; font-size: 13px; color: #475569; line-height: 1.6;">
                    ${escapeHtml(serviceInfo.overview)}
                  </p>

                  <!-- Included Deliverables -->
                  <div style="font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                    Key Deliverables &amp; Engineering Scope:
                  </div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
                    ${deliverablesHtml}
                  </table>

                  <!-- Recommended Technologies -->
                  <div style="font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                    Recommended Technology Stack:
                  </div>
                  <div style="margin-bottom: 16px;">
                    ${techBadgesHtml}
                  </div>

                  <!-- Delivery Timeline & Architecture Pillars -->
                  <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 14px; margin-top: 14px;">
                    <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
                      <strong>⏱ Typical Delivery Timeline:</strong> ${escapeHtml(serviceInfo.timeline)}
                    </div>
                    <div style="font-size: 12px; color: #475569; margin-bottom: 8px;">
                      <strong>⚡ Methodology:</strong> Agile 2-Week Sprints · Continuous Staging Deployments · Daily Standup Visibility
                    </div>
                    <div>
                      ${pillarsHtml}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Conditional NDA Paragraph -->
              ${ndaSection}

              <!-- Submission Summary Panel -->
              <div style="margin: 24px 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #f8fafc; padding: 10px 18px; border-bottom: 1px solid #e2e8f0; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #475569;">
                  Summary of Submitted Scope
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 14px 18px; font-size: 13px;">
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; width: 140px;">Service Requested:</td>
                    <td style="padding: 5px 0; color: #0f172a; font-weight: 600;">${safeService}</td>
                  </tr>
                  <tr>
                    <td style="padding: 5px 0; color: #64748b;">Contact Number:</td>
                    <td style="padding: 5px 0; color: #0f172a; font-weight: 500;">${safePhone}</td>
                  </tr>
                  ${data.budget ? `<tr><td style="padding: 5px 0; color: #64748b;">Budget Target:</td><td style="padding: 5px 0; color: #0f172a;">${escapeHtml(data.budget)}</td></tr>` : ''}
                  ${data.timeline ? `<tr><td style="padding: 5px 0; color: #64748b;">Desired Timeline:</td><td style="padding: 5px 0; color: #0f172a;">${escapeHtml(data.timeline)}</td></tr>` : ''}
                  <tr>
                    <td style="padding: 5px 0; color: #64748b; vertical-align: top;">Project Brief:</td>
                    <td style="padding: 5px 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${safeDescription}</td>
                  </tr>
                </table>
              </div>

              <!-- Next Steps Panel -->
              <div style="margin: 20px 0; padding: 16px 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div style="font-size: 12px; font-weight: 700; color: #0f172a; text-transform: uppercase; margin-bottom: 8px;">
                  What Happens Next:
                </div>
                <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.6;">
                  <li><strong>Scope Review:</strong> A dedicated Solution Architect reviews your specifications within 24 hours.</li>
                  <li><strong>Discovery Call:</strong> We align on technical architecture, sprint breakdown, and security requirements.</li>
                  <li><strong>Fixed-Scope Proposal:</strong> You receive an architecture document, sprint plan, and transparent milestone quote.</li>
                </ol>
              </div>

              <p style="margin: 0 0 20px 0; font-size: 13px; color: #475569; line-height: 1.6;">
                Have existing architecture diagrams, wireframes, or RFP documents to share? Simply reply directly to this email and our technical team will review them ahead of our call.
              </p>

              <!-- Sign-off -->
              <div style="margin-top: 26px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <p style="margin: 0; font-size: 14px; font-weight: 700; color: #0f172a;">
                  Strategic Consulting &amp; Engineering Team
                </p>
                <p style="margin: 3px 0 0 0; font-size: 12px; color: #64748b;">
                  AsthaSoft Technologies · Enterprise Solutions · sales@asthasoftindia.com
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 36px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b;">
                © ${new Date().getFullYear()} AsthaSoft Technologies. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 10px; color: #94a3b8;">
                ISO-Aligned Architecture · Strict NDA Security · Guaranteed 100% IP Transfer
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Customer Auto-Reply Email (Plain Text Representation)
 * Formats complete service details in a clean, universal text format.
 */
export function renderCustomerAutoReplyPlainText(data: ScopingSessionLead): string {
  const name = data.name || 'Valued Partner';
  const service = data.serviceRequired || 'Custom Enterprise Software';
  const description = data.projectDescription || 'No description provided';
  const phone = data.contactNumber || 'Not provided';
  const ticketId = data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;

  const serviceInfo = getServiceDetails(data.serviceRequired);

  const deliverablesText = serviceInfo.deliverables.map((item) => `  - ${item}`).join('\n');
  const techStackText = serviceInfo.techStack.join(', ');
  const pillarsText = serviceInfo.architecturePillars.join(' · ');

  return `ASTHASOFT TECHNOLOGIES - SCOPING SESSION CONFIRMATION
Ticket ID: #${ticketId}

Dear ${name},

Thank you for contacting AsthaSoft Technologies. We have successfully received your project scoping request regarding:
${serviceInfo.title}

============================================================
SERVICE SPECIFICATIONS & ARCHITECTURAL HIGHLIGHTS
============================================================
${serviceInfo.headline}

${serviceInfo.overview}

KEY DELIVERABLES & INCLUDED SCOPE:
${deliverablesText}

RECOMMENDED TECHNOLOGY STACK:
${techStackText}

TYPICAL DELIVERY TIMELINE:
${serviceInfo.timeline}
Methodology: Agile 2-Week Sprints with live demo environments & continuous CI/CD delivery.

ARCHITECTURAL PILLARS:
${pillarsText}

============================================================
SUMMARY OF SUBMITTED REQUIREMENTS
============================================================
Service Requested: ${service}
Contact Number   : ${phone}
${data.budget ? `Budget Target    : ${data.budget}\n` : ''}${data.timeline ? `Desired Timeline : ${data.timeline}\n` : ''}Project Brief    :
${description}

NDA Status       : ${data.requestNDA ? 'YES · Formal NDA Requested (legal team will provide mutual NDA)' : 'Standard Confidentiality Policy'}

============================================================
WHAT HAPPENS NEXT
============================================================
1. Scope Review   : A dedicated Solution Architect reviews your specifications within 24 hours.
2. Discovery Call : We schedule a call to align on technical architecture and milestone breakdowns.
3. Proposal Handover: You receive an architecture document, sprint plan, and transparent quote.

Need immediate assistance or have existing RFP/architecture documents to share?
Reply directly to this email or reach us at sales@asthasoftindia.com / +91 9664471637.

AsthaSoft Strategic Consulting & Engineering Team
AsthaSoft Technologies · Enterprise Solutions
`;
}

/**
 * Generates the clean Plain Text representation of the lead alert email
 * matching the user's expected deployment template.
 */
export function renderInternalLeadPlainText(data: ScopingSessionLead): string {
  const name = data.name || 'Not provided';
  const email = data.email || 'Not provided';
  const phone = data.contactNumber || 'Not provided';
  const service = data.serviceRequired || 'Custom Enterprise Software';
  const description = data.projectDescription || 'No description provided';
  const ticketId = data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });
  const source = data.source || 'Header CTA';
  const ndaText = data.requestNDA ? 'YES · Formal NDA Requested' : 'Standard Confidentiality';

  let extraSpecs = '';
  if (data.budget) extraSpecs += `Estimated Budget: ${data.budget}\n`;
  if (data.timeline) extraSpecs += `Delivery Target : ${data.timeline}\n`;
  if (data.preferredTime) extraSpecs += `Preferred Time  : ${data.preferredTime}\n`;

  return `ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET & INTAKE DETAILS
Ticket ID      : ${ticketId}
Date & Time    : ${timestamp}
Source Channel : ${source}

CLIENT INFORMATION
Full Name      : ${name}
Email Address  : ${email}
Phone Number   : ${phone}

PROJECT SPECIFICATIONS
Service Needed : ${service}
${extraSpecs}NDA Status     : ${ndaText}

PROJECT SCOPE & REQUIREMENTS
${description}

DIRECT ACTIONS
- Reply Email : ${email}
- Direct Call : ${phone}

Sent automatically by Asthasoft Technologies Lead Intake System.
`;
}

/**
 * Internal Lead Alert Email (HTML Template)
 * Styled with exact spacing and font matching the user's plain-text reference image.
 */
export function renderInternalSalesNotificationHtml(data: ScopingSessionLead): string {
  const safeName = escapeHtml(data.name || 'Not provided');
  const safeEmail = escapeHtml(data.email || 'Not provided');
  const safePhone = escapeHtml(data.contactNumber || 'Not provided');
  const safePhoneClean = (data.contactNumber || '').replace(/[^0-9+]/g, '');
  const safeService = escapeHtml(data.serviceRequired || 'Custom Enterprise Software');
  const safeDescription = escapeHtml(data.projectDescription || 'No description provided');
  const ticketId = escapeHtml(data.ticketId || `ASTHA-${Date.now().toString(36).toUpperCase()}`);
  const timestamp = escapeHtml(data.timestamp || new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  }));
  const safeSource = escapeHtml(data.source || 'Header CTA');
  const ndaText = data.requestNDA ? 'YES · Formal NDA Requested' : 'Standard Confidentiality';

  let extraSpecs = '';
  if (data.budget) extraSpecs += `Estimated Budget: ${escapeHtml(data.budget)}\n`;
  if (data.timeline) extraSpecs += `Delivery Target : ${escapeHtml(data.timeline)}\n`;
  if (data.preferredTime) extraSpecs += `Preferred Time  : ${escapeHtml(data.preferredTime)}\n`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Client Inquiry: ${safeName} - ${safeService}</title>
</head>
<body style="margin: 0; padding: 24px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827;">
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #111827; white-space: pre-wrap; word-break: break-word;">ASTHASOFT TECHNOLOGIES - NEW CLIENT LEAD

TICKET &amp; INTAKE DETAILS
Ticket ID      : ${ticketId}
Date &amp; Time    : ${timestamp}
Source Channel : ${safeSource}

CLIENT INFORMATION
Full Name      : ${safeName}
Email Address  : <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
Phone Number   : <a href="tel:${safePhoneClean}" style="color: #2563eb; text-decoration: underline;">${safePhone}</a>

PROJECT SPECIFICATIONS
Service Needed : ${safeService}
${extraSpecs}NDA Status     : ${ndaText}

PROJECT SCOPE &amp; REQUIREMENTS
${safeDescription}

DIRECT ACTIONS
- Reply Email : <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: underline;">${safeEmail}</a>
- Direct Call : <a href="tel:${safePhoneClean}" style="color: #2563eb; text-decoration: underline;">${safePhone}</a>

Sent automatically by Asthasoft Technologies Lead Intake System.</div>
</body>
</html>`;
}

