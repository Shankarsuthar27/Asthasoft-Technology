export interface SubLink {
  title: string;
  description: string;
  href: string;
  badge?: string;
  highlight?: boolean;
}

export interface NavColumn {
  category: string;
  icon: string;
  items: SubLink[];
}

export const WHO_WE_ARE_LINKS: SubLink[] = [
  {
    title: "About Asthasoft",
    description: "Our 12+ year journey, engineering philosophy & leadership team.",
    href: "#about",
  },
  {
    title: "Technical Engineering Blog",
    description: "Deep-dives into LLMs, distributed systems, and cloud architecture.",
    href: "#insights",
    badge: "New Articles",
  },
  {
    title: "Awards & Accreditations",
    description: "CMMI Level 5, ISO 27001, AWS Advanced Partner & Clutch Leader.",
    href: "#awards",
  },
  {
    title: "Careers & Culture",
    description: "Join the top 1% engineering talent. Remote-first opportunities.",
    href: "#careers",
    badge: "We're Hiring",
    highlight: true,
  },
  {
    title: "Press & Media Coverage",
    description: "Asthasoft innovations featured in TechCrunch, Forbes, and VentureBeat.",
    href: "#press",
  },
];

export const WHAT_WE_DO_COLUMNS: NavColumn[] = [
  {
    category: "Build & Engineer",
    icon: "code-2",
    items: [
      {
        title: "AI Product Development",
        description: "Autonomous agents, LLM fine-tuning, RAG pipelines, and vision models.",
        href: "#services-ai",
        badge: "Hot",
        highlight: true,
      },
      {
        title: "Custom Enterprise Software",
        description: "Bespoke microservices, high-throughput engines, and core ERP systems.",
        href: "#services-software",
      },
      {
        title: "Native & Cross-Platform Mobile",
        description: "High-performance iOS & Android applications with Swift, Kotlin, Flutter.",
        href: "#services-mobile",
      },
      {
        title: "Blockchain & Web3 Ecosystems",
        description: "Smart contracts, audited decentralized protocols, and custody wallets.",
        href: "#services-blockchain",
      },
      {
        title: "SaaS Multi-Tenant Platforms",
        description: "Scalable cloud subscriptions with automated billing and RBAC.",
        href: "#services-saas",
      },
      {
        title: "MVP Rapid Engineering",
        description: "Go-to-market validated architecture built in 6 to 12 weeks.",
        href: "#services-mvp",
      },
    ],
  },
  {
    category: "Managed IT Services",
    icon: "server",
    items: [
      {
        title: "Cloud Infrastructure & Migration",
        description: "Zero-downtime AWS, GCP, and Azure cloud-native modernization.",
        href: "#services-cloud",
      },
      {
        title: "DevOps & CI/CD Automation",
        description: "GitOps, Kubernetes clusters, Docker orchestration, and automated pipelines.",
        href: "#services-devops",
        badge: "GitOps",
      },
      {
        title: "24/7 IT Ops & SecOps Management",
        description: "Continuous SOC monitoring, threat mitigation, and 99.99% SLA assurance.",
        href: "#services-secops",
      },
      {
        title: "Dedicated Engineering Pods",
        description: "Augment your tech team with senior pre-vetted full-stack engineers.",
        href: "#services-pods",
        highlight: true,
      },
    ],
  },
  {
    category: "Design & Web Systems",
    icon: "palette",
    items: [
      {
        title: "UI/UX Product Strategy",
        description: "User research, cognitive design, interactive prototyping & Figma systems.",
        href: "#services-design",
      },
      {
        title: "Enterprise Web Platforms",
        description: "Ultra-fast headless web architectures built with React, Next.js & Vite.",
        href: "#services-web",
        badge: "Core Web Vitals",
      },
      {
        title: "Accessibility & Design Systems",
        description: "WCAG 2.1 AA compliant component libraries for global enterprises.",
        href: "#services-a11y",
      },
    ],
  },
];

export const SOLUTIONS_COLUMNS: NavColumn[] = [
  {
    category: "Business Operations",
    icon: "briefcase",
    items: [
      {
        title: "Enterprise HRMS & Payroll",
        description: "Workforce attendance, payroll automation, and appraisal intelligence.",
        href: "#sol-hrms",
      },
      {
        title: "Real-Time Employee Tracking",
        description: "Geo-fenced field executive dispatching, live routes & telemetry.",
        href: "#sol-tracking",
      },
      {
        title: "Omnichannel CRM & Pipeline",
        description: "AI lead qualification, customer timeline, and automated deal cadences.",
        href: "#sol-crm",
      },
      {
        title: "Service Desk & Helpdesk",
        description: "SLA-driven ticketing system with AI deflection chatbots.",
        href: "#sol-helpdesk",
      },
      {
        title: "Warehouse & Inventory ERP",
        description: "Multi-warehouse stock sync, barcode scanning, and supply optimization.",
        href: "#sol-inventory",
      },
      {
        title: "Campus & School ERP",
        description: "Admissions, grading, fee payment gateways, and student portals.",
        href: "#sol-school",
      },
    ],
  },
  {
    category: "Customer-Facing Apps",
    icon: "smartphone",
    items: [
      {
        title: "On-Demand Food Delivery",
        description: "Multi-restaurant marketplace, driver dispatch engine, and live tracking.",
        href: "#sol-food",
        badge: "Turnkey",
      },
      {
        title: "Ride-Hailing & Taxi Dispatch",
        description: "Uber-like algorithm for dynamic pricing, surge management & fleet telemetry.",
        href: "#sol-taxi",
      },
      {
        title: "On-Demand Home Services",
        description: "Handyman, cleaning, and beauty booking engine with verified providers.",
        href: "#sol-homeservices",
      },
      {
        title: "Multi-Vendor eCommerce",
        description: "Enterprise marketplace engine with vendor payout split & catalog tools.",
        href: "#sol-ecommerce",
        highlight: true,
      },
      {
        title: "Hyperlocal Grocery & Quick-Commerce",
        description: "10-minute dark store fulfillment, inventory reservations & route mapping.",
        href: "#sol-grocery",
      },
    ],
  },
  {
    category: "Industry Platforms",
    icon: "layers",
    items: [
      {
        title: "AI-Powered LMS & EdTech",
        description: "Adaptive student learning paths, live classes, proctoring & quiz engine.",
        href: "#sol-lms",
      },
      {
        title: "FinTech & Digital Neo-Banking",
        description: "PCI-DSS compliant virtual IBANs, multi-currency wallets, and KYC onboarding.",
        href: "#sol-fintech",
        badge: "PCI-DSS",
        highlight: true,
      },
      {
        title: "Micro-Lending & Credit Scoring",
        description: "Automated underwriting algorithms, loan servicing, and credit checks.",
        href: "#sol-lending",
      },
      {
        title: "Global Travel & Flight Booking",
        description: "GDS/Amadeus/Sabre API aggregation for hotels, flights, and packages.",
        href: "#sol-travel",
      },
      {
        title: "White-Label Reseller Portals",
        description: "Multi-tenant B2B portals with custom branding, domains, and commission ledger.",
        href: "#sol-reseller",
      },
    ],
  },
];

export const INDUSTRIES_LINKS: SubLink[] = [
  {
    title: "Healthcare & Telemedicine",
    description: "HIPAA-compliant EHR/EMR platforms, remote patient monitoring, and AI diagnostics.",
    href: "#ind-healthcare",
    badge: "HIPAA Certified",
    highlight: true,
  },
  {
    title: "Banking & Neo-Banking",
    description: "Core banking modernization, payment rails (SEPA/FedNow), and anti-fraud ML.",
    href: "#ind-banking",
    badge: "FinTech",
  },
  {
    title: "PropTech & Real Estate",
    description: "Smart property management, virtual 3D property tours, and tokenized real estate.",
    href: "#ind-proptech",
  },
  {
    title: "Logistics & Supply Chain",
    description: "Cold-chain IoT telemetry, predictive fleet maintenance, and freight forwarding.",
    href: "#ind-logistics",
  },
];
