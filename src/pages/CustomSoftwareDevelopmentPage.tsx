import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Cpu,
  Layers,
  Cloud,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Clock,
  Users,
  ChevronDown,
  Sparkles,
  Zap,
  Server,
  Database,
  Smartphone,
  BrainCircuit,
  Building2,
  Stethoscope,
  CreditCard,
  Truck,
  ShoppingCart,
  GraduationCap,
  FileCode2,
  Lock,
  Workflow,
  HelpCircle,
  PhoneCall,
  Terminal,
} from 'lucide-react';

interface CustomSoftwareDevelopmentPageProps {
  onOpenScopingModal: (source?: string) => void;
  onOpenCallModal: (context?: string) => void;
}

// Tech Stack Categories and Items
const TECH_STACK_CATEGORIES = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend & APIs' },
  { id: 'cloud', name: 'Cloud & DevOps' },
  { id: 'database', name: 'Databases' },
  { id: 'mobile', name: 'Mobile Apps' },
  { id: 'ai', name: 'AI & Data Engineering' },
];

const TECH_ITEMS = [
  { name: 'React.js', category: 'frontend', tag: 'UI Framework', icon: '⚛️' },
  { name: 'Next.js', category: 'frontend', tag: 'Full-Stack React', icon: '▲' },
  { name: 'TypeScript', category: 'frontend', tag: 'Typed JavaScript', icon: 'TS' },
  { name: 'Vue.js', category: 'frontend', tag: 'Progressive UI', icon: '🟢' },
  { name: 'Tailwind CSS', category: 'frontend', tag: 'Design Systems', icon: '🎨' },
  { name: 'Node.js', category: 'backend', tag: 'Runtime Engine', icon: '🟢' },
  { name: 'Python', category: 'backend', tag: 'Backend & AI', icon: '🐍' },
  { name: 'Go (Golang)', category: 'backend', tag: 'High-Concurrency', icon: '🐹' },
  { name: 'Java / Spring', category: 'backend', tag: 'Enterprise Grade', icon: '☕' },
  { name: '.NET Core', category: 'backend', tag: 'Robust Microservices', icon: '🔷' },
  { name: 'AWS Cloud', category: 'cloud', tag: 'Cloud Platform', icon: '☁️' },
  { name: 'Docker', category: 'cloud', tag: 'Containerization', icon: '🐳' },
  { name: 'Kubernetes', category: 'cloud', tag: 'Container Orchestration', icon: '☸️' },
  { name: 'Terraform', category: 'cloud', tag: 'Infrastructure as Code', icon: '🏗️' },
  { name: 'CI/CD Pipelines', category: 'cloud', tag: 'Automated Delivery', icon: '⚡' },
  { name: 'PostgreSQL', category: 'database', tag: 'Relational DB', icon: '🐘' },
  { name: 'MongoDB', category: 'database', tag: 'Document NoSQL', icon: '🍃' },
  { name: 'Redis', category: 'database', tag: 'In-Memory Cache', icon: '🔴' },
  { name: 'Elasticsearch', category: 'database', tag: 'Distributed Search', icon: '🔍' },
  { name: 'Flutter', category: 'mobile', tag: 'Cross-Platform', icon: '📱' },
  { name: 'React Native', category: 'mobile', tag: 'Native iOS & Android', icon: '📲' },
  { name: 'Swift / Kotlin', category: 'mobile', tag: 'Pure Native Mobile', icon: '🍎' },
  { name: 'PyTorch / TF', category: 'ai', tag: 'Deep Learning', icon: '🧠' },
  { name: 'LangChain / RAG', category: 'ai', tag: 'LLM Orchestration', icon: '🦜' },
  { name: 'OpenAI API', category: 'ai', tag: 'Generative Intelligence', icon: '🤖' },
];

export const CustomSoftwareDevelopmentPage: React.FC<CustomSoftwareDevelopmentPageProps> = ({
  onOpenScopingModal,
  onOpenCallModal,
}) => {
  const [selectedTechCategory, setSelectedTechCategory] = useState('frontend');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredTechItems = TECH_ITEMS.filter(
    (item) => item.category === selectedTechCategory
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-body selection:bg-[#0066ff] selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION matching uploaded screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f8fafc] to-[#ffffff] border-b border-slate-200/60">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[380px] h-[380px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headlines, Trust points & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                <span>AI-POWERED SOFTWARE SOLUTIONS</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                  AI-powered
                </h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
                  <span className="text-[#0066ff]">Custom Software</span>{' '}
                  <span className="text-[#0066ff]">Development</span> Company in INDIA
                </h1>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                We engineer mission-critical, bespoke software architectures and intelligent AI-driven systems.
                From legacy modernization to high-throughput cloud platforms, we empower forward-thinking enterprises
                to outperform market competition with zero tech debt.
              </p>

              {/* Key Trust Pillars */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Trusted by Fortune 500 companies & venture-backed scaleups globally</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Intellectual Property (IP) ownership and source code handover</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Zero vendor lock-in with open, cloud-native microservice architecture</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Custom Software Hero')}
                  className="px-8 py-4 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Let's Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenCallModal('Custom Software Discovery')}
                  className="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-base shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#0066ff]" />
                  <span>Schedule Rapid Call</span>
                </button>
              </div>
            </div>

            {/* Right Column: 3D Layered Glass Tech Graphic with Floating SLA Pill */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[480px]">
                {/* Visual Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl shadow-blue-500/10 border border-slate-200/80">
                  <img
                    src="/custom_software_hero.jpg"
                    alt="Layered Glass Enterprise Software Architecture"
                    className="w-full h-auto object-cover rounded-2xl"
                  />

                  {/* Floating Metric Card matching reference */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066ff] font-black text-lg">
                      <ShieldCheck className="w-5 h-5 text-[#0066ff]" />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-slate-900 leading-none">
                        99.9%
                      </div>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">
                        Platform Reliability & Uptime SLA
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ambient glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. TRUSTED BY CLIENTS / ACCREDITATIONS TICKER */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white py-6 border-b border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Trusted by Industry Leaders & Enterprise Innovators Across 25+ Countries
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-85 text-xs sm:text-sm font-bold text-slate-600">
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              🏆 CMMI Level 5 Certified
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              🔒 ISO 27001 Security Standard
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              ☁️ AWS Advanced Tier Partner
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              🔷 Microsoft Gold Partner
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              ⭐ 500+ Enterprise Deployments
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FULL-CYCLE SERVICES SECTION matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
                WHAT WE DO
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Explore Our Full-Cycle AI & Custom Software Development Services
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We engineer scalable, secure, and resilient software products tailored to solve your unique business
                challenges, modernize workflows, and accelerate market expansion.
              </p>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Software Consulting
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Strategic technical discovery, architectural blueprints, legacy code audits, and technology stack selection designed to maximize ROI and eliminate development risks.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore consulting</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Custom Software Development
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Bespoke enterprise applications, scalable SaaS platforms, automated workflow engines, and distributed microservices built for extreme reliability and high traffic.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore custom engineering</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Enterprise App Modernization
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Migrate legacy monoliths into cloud-native microservices, decouple outdated database schemas, and optimize core business systems for modern speed and scalability.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore modernization</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                Robust Cloud Architecture
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                High-availability cloud engineering on AWS, Azure, and GCP. Serverless backends, Docker containers, Kubernetes orchestration, and automated CI/CD pipelines.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore cloud architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group md:col-span-2 lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1.5">
                    AI & Machine Learning Integration
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    Empower your custom software with autonomous AI agents, retrieval-augmented generation (RAG), fine-tuned LLMs, predictive intelligence, and automated document processing.
                  </p>
                  <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                    <span>Explore AI integration</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. METHODOLOGY & PROCESS SECTION (Dark Navy Theme) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#0c1222] text-white relative overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-block text-xs font-bold tracking-widest text-[#0066ff] uppercase bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40">
              OUR PROCESS
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold tracking-tight leading-tight">
              Here's How We Tailor Software Solutions For Hyperautomated User Experience
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Our 6-phase engineering lifecycle eliminates guesswork, aligns technical execution with business KPIs,
              and guarantees predictability across every deployment sprint.
            </p>
          </div>

          {/* 6 Step Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#131b2e] border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all group">
              <div className="text-3xl font-black text-[#0066ff] mb-4">01</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Discovery & Requirement Analysis
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                We conduct deep architectural scoping, map end-user journeys, gather business logic constraints, and create precise Software Requirement Specifications (SRS).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#131b2e] border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all group">
              <div className="text-3xl font-black text-[#0066ff] mb-4">02</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Architecture & System Planning
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Design modular, fault-tolerant microservice topologies, database schema normalization, security compliance matrices, and third-party API integration maps.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#131b2e] border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all group">
              <div className="text-3xl font-black text-[#0066ff] mb-4">03</div>
              <h3 className="text-lg font-bold text-white mb-2">
                UI/UX Prototyping
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Craft human-centric design tokens, wireframes, and clickable interactive Figma prototypes validated with usability testing before any production code is committed.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#131b2e] border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all group">
              <div className="text-3xl font-black text-[#0066ff] mb-4">04</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Agile Sprints & Development
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Rapid two-week agile sprint cadences following clean-code standards (SOLID, DRY), peer code reviews, continuous automated integration, and bi-weekly client demos.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#131b2e] border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all group">
              <div className="text-3xl font-black text-[#0066ff] mb-4">05</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Testing & Quality Assurance
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Multi-layer testing: unit, integration, automated regression, stress load testing, and rigorous penetration assessments to guarantee a zero-defect production release.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-[#131b2e] border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/60 transition-all group">
              <div className="text-3xl font-black text-[#0066ff] mb-4">06</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Deployment & Hypercare Support
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Zero-downtime blue/green deployments, full CI/CD automation, comprehensive technical documentation handover, and 90-day dedicated hypercare support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. VALUE PROPOSITION / OPERATIONAL EFFICIENCY */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Points */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
                WHY CHOOSE US
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                When You Choose Custom Software Development with Us, You Choose Operational Efficiency
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Off-the-shelf software forces your enterprise into rigid, inefficient processes.
                Our custom software is built strictly around your proprietary workflows, driving seamless automation,
                slashing manual overhead, and providing 10x scalability.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Efficiency-Driven Architecture
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-0.5">
                      Streamlined codebases and automated data pipelines designed to eliminate friction and bottlenecks across business departments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 mt-0.5">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      100% Code & IP Ownership
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-0.5">
                      You own every single line of code, patentable algorithm, and data asset with zero ongoing royalties or vendor lock-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Stat Cards Grid matching screenshot */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#0066ff] mb-1.5">
                    40%+
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    Faster Time-to-Market
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Accelerated product launches utilizing pre-tested modular components and automated CI/CD.
                  </p>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#0066ff] mb-1.5">
                    99.9%
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    Platform Uptime SLA
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Fault-tolerant multi-zone cloud engineering with automated disaster recovery protocols.
                  </p>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#0066ff] mb-1.5">
                    60%
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    Reduction in TCO
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Eliminate recurring third-party seat licensing and legacy infrastructure bloat permanently.
                  </p>
                </div>

                <div className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl p-6 shadow-xs">
                  <div className="text-2xl sm:text-3xl font-black text-[#0066ff] mb-1.5">
                    24/7
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">
                    Dedicated Support Pods
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Continuous monitoring, proactive security patches, and instant incident resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. TECHNOLOGY STACK SECTION matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f1f5f9]/70 border-y border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              OUR TECH STACK
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We Follow A Powerful, Standard, & Reliable Technology Stack for Future-Proof Solutions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We architect custom platforms on battle-tested, high-performance modern frameworks with active developer ecosystems and rock-solid enterprise LTS support.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Vertical Category Tabs */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              {TECH_STACK_CATEGORIES.map((cat) => {
                const isActive = selectedTechCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedTechCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#0066ff] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {TECH_ITEMS.filter((i) => i.category === cat.id).length}
                    </span>
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Tech Stack Section')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Consult our Tech Lead</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Grid of Tech Cards */}
            <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs min-h-[420px]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredTechItems.map((tech) => (
                    <motion.div
                      key={tech.name}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all flex flex-col items-center text-center group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white shadow-xs flex items-center justify-center text-lg mb-2 group-hover:scale-110 transition-transform">
                        {tech.icon}
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {tech.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {tech.tag}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. INDUSTRIES WE SERVE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
                DOMAIN EXPERTISE
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Empowering A Wide Array of Business Industries With Custom Software Development Services
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From HIPAA-compliant healthcare portals to high-frequency fintech engines, our domain-specialized
                engineering pods build compliant software tailored to rigorous regulatory standards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Industry 1 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#131b2e] p-7 text-white border border-slate-800 shadow-md group hover:border-[#0066ff]/60 transition-all flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fintech & Banking
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  PCI-DSS compliant payment gateways, algorithmic fraud detection, digital wallets, and automated ledger systems built for microsecond latency.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>View Fintech solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Industry 2 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#131b2e] p-7 text-white border border-slate-800 shadow-md group hover:border-[#0066ff]/60 transition-all flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Healthcare & Telehealth
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  HIPAA/HITECH compliant EHR/EMR platforms, remote patient monitoring portals, smart appointment scheduling, and telemedicine infrastructure.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>View Healthcare solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Industry 3 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#131b2e] p-7 text-white border border-slate-800 shadow-md group hover:border-[#0066ff]/60 transition-all flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Supply Chain & Logistics
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Real-time IoT fleet tracking, automated warehouse dispatch, dynamic routing algorithms, and end-to-end shipment traceability systems.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>View Logistics solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Industry 4 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#131b2e] p-7 text-white border border-slate-800 shadow-md group hover:border-[#0066ff]/60 transition-all flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Retail & E-Commerce
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  High-throughput headless storefronts, multi-warehouse inventory synchronization, personalized AI recommendation engines, and seamless checkout.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>View Retail solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Industry 5 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#131b2e] p-7 text-white border border-slate-800 shadow-md group hover:border-[#0066ff]/60 transition-all flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Real Estate & PropTech
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Smart building IoT telemetry, automated digital lease management, tenant communication portals, and algorithmic property valuation engines.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>View PropTech solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Industry 6 */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1222] to-[#131b2e] p-7 text-white border border-slate-800 shadow-md group hover:border-[#0066ff]/60 transition-all flex flex-col justify-between min-h-[260px]">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  EdTech & Learning
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  SCORM-compliant LMS architectures, interactive digital classrooms, automated AI assessment grading, and personalized student mastery paths.
                </p>
              </div>
              <div className="pt-4 text-xs font-semibold text-blue-400 flex items-center gap-1">
                <span>View EdTech solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FULL-WIDTH HYPERAUTOMATION CTA BANNER */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-r from-[#003db3] via-[#0052cc] to-[#0066ff] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Let's Start Your Journey Towards <br />
            <span className="italic font-serif font-light text-blue-100">
              A Hyperautomated Digital Transformation
            </span>
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Connect with our Principal Software Architects to scope your project, evaluate feasibility,
            and receive a detailed technical roadmap within 24 hours.
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => onOpenScopingModal('Custom Software CTA Banner')}
              className="px-9 py-4 rounded-full bg-white hover:bg-slate-100 text-[#0066ff] font-bold text-base shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-98"
            >
              <span>Book A Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. GLOBAL PRESENCE & ENGAGEMENT MODELS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              ENGAGEMENT MODELS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Custom Software Development Company India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Transparent, flexible collaboration models engineered to match your organizational velocity and budget predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Model 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold">
                  <Users className="w-3.5 h-3.5" />
                  <span>DEDICATED TEAM</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Dedicated Development Pod
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Full-time dedicated senior software engineers, solution architects, and QA specialists integrated seamlessly into your internal sprint cycles and toolchains.
                </p>
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Direct Slack, Jira, and GitHub repository access</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Flexible monthly billing with zero overhead</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Scale pod capacity up or down with 2-week notice</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Dedicated Pod Model')}
                  className="w-full py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0066ff] font-bold text-sm transition-all cursor-pointer text-center"
                >
                  Hire Dedicated Pod →
                </button>
              </div>
            </div>

            {/* Model 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FIXED PRICE</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Milestone-Based Fixed Price
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Guaranteed delivery timelines and fixed budgets for clearly specified projects. You approve deliverables at every milestone before releasing payment.
                </p>
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Rigorous SRS and scope lock to avoid cost creep</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Strict milestone sign-offs & SLA guarantees</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>90-day post-launch warranty included</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Fixed Price Model')}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all cursor-pointer text-center"
                >
                  Get Fixed Price Estimate →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Heading & Contact note */}
            <div className="lg:col-span-4 space-y-4">
              <div className="w-10 h-1.5 bg-[#0066ff] rounded-full" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Everything you need to know about our custom software engineering practices, security guarantees, and engagement processes.
              </p>
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 mt-6">
                <div className="text-sm font-bold text-slate-900 mb-1">
                  Have a specific technical question?
                </div>
                <p className="text-xs text-slate-600 mb-3">
                  Our Principal Architects are available for direct technical scoping discussions.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenCallModal('FAQ Consultation')}
                  className="text-xs font-bold text-[#0066ff] flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>Request Architect Callback</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Accordion Items */}
            <div className="lg:col-span-8 space-y-3">
              {[
                {
                  q: 'What is custom software development and why do I need it?',
                  a: 'Custom software development is the process of conceptualizing, designing, engineering, and deploying bespoke software tailored specifically to your organization’s operational workflows, business rules, and security policies. Unlike off-the-shelf software with recurring license fees and rigid limitations, custom software gives you 100% intellectual property ownership, zero vendor lock-in, and infinite scalability.',
                },
                {
                  q: 'How do you ensure data security and intellectual property protection?',
                  a: 'We sign mutual Non-Disclosure Agreements (NDAs) before reviewing any confidential requirements. We strictly adhere to ISO 27001 security standards, SOC 2 compliance, and end-to-end data encryption (AES-256 in transit and at rest). Upon project completion, all intellectual property, source code, repositories, and documentation are transferred 100% to you.',
                },
                {
                  q: 'What development methodologies do you follow?',
                  a: 'We follow an agile Scrum framework with two-week iterative delivery sprints. Every sprint concludes with working demo releases, velocity burndown reports, and backlog refinement. You have direct visibility into our progress via shared Jira dashboards, daily Slack standups, and Git version control.',
                },
                {
                  q: 'What is the typical cost and timeline for a custom software project?',
                  a: 'Timelines typically range from 6 to 12 weeks for a production-ready Minimum Viable Product (MVP) and 3 to 6+ months for comprehensive enterprise platforms. Cost depends on architectural complexity, third-party integrations, and team pod size. We offer both transparent Fixed-Price milestone contracts and monthly Dedicated Team models.',
                },
                {
                  q: 'Do you provide post-launch maintenance and support?',
                  a: 'Yes. Every project includes a complimentary 90-day warranty and hypercare period post-launch to address any edge cases. Following this period, we provide proactive Service Level Agreement (SLA) maintenance tiers covering 24/7 monitoring, security patches, cloud cost optimization, and feature enhancements.',
                },
                {
                  q: 'How do we get started with your engineering team?',
                  a: 'Simply click "Let\'s Discuss Your Project" or schedule a rapid discovery call. Our solution architects will conduct an initial 30-minute technical discovery, analyze your requirements, and deliver a comprehensive scoping brief, architectural roadmap, and cost estimate within 24 to 48 hours.',
                },
              ].map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {faq.q}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                          isOpen ? 'bg-[#0066ff] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
