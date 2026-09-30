import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Lock,
  CalendarCheck,
  Users2,
  FileCheck2,
  ChevronRight,
  Terminal,
  Activity,
  Sparkles,
} from 'lucide-react';

interface EngineeringProcessSectionProps {
  onOpenScopingModal: (source?: string) => void;
}

interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  timeline: string;
  icon: React.ReactNode;
  summary: string;
  deliverables: string[];
  toolsAndPractices: string[];
  visualType: 'architecture' | 'design' | 'code' | 'security' | 'cloud';
}

export const EngineeringProcessSection: React.FC<EngineeringProcessSectionProps> = ({
  onOpenScopingModal,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps: ProcessStep[] = [
    {
      id: 'discovery',
      stepNumber: '01',
      title: 'Discovery & Strategic Architecture',
      shortTitle: 'Discovery & Architecture',
      subtitle: 'De-risk your technical roadmap before writing a single line of code.',
      timeline: 'Week 1 – 2',
      icon: <Compass className="w-5 h-5" />,
      summary:
        'We dissect your business goals, user personas, and technical constraints to formulate an airtight system architecture blueprint, microservices roadmap, and milestone-based project estimation.',
      deliverables: [
        'Comprehensive Technical Specification & SRS document',
        'Database Entity-Relationship (ER) & Schema Design',
        'Cloud Infrastructure & Microservice Architecture Topology',
        'Milestone-Based Sprint Schedule & Cost Estimate',
      ],
      toolsAndPractices: ['Enterprise DDD', 'OpenAPI / Swagger', 'AWS Well-Architected', 'Jira Agile Roadmap'],
      visualType: 'architecture',
    },
    {
      id: 'ui-ux',
      stepNumber: '02',
      title: 'High-Fidelity UI/UX & Interactive Prototyping',
      shortTitle: 'UI/UX & Prototyping',
      subtitle: 'Pixel-perfect, human-centric interfaces engineered for seamless conversion.',
      timeline: 'Week 2 – 3',
      icon: <Palette className="w-5 h-5" />,
      summary:
        'Our product designers craft design systems, wireframes, and clickable interactive prototypes in Figma. We validate user flows through usability tests before engineering commences.',
      deliverables: [
        'Interactive, Clickable High-Fidelity Prototype (Figma)',
        'Atomic Design System (Tokens, Typography, Components)',
        'Multi-Platform User Journey & Responsive Breakpoints',
        'Developer-Handoff Assets with CSS & Accessibility Guidelines',
      ],
      toolsAndPractices: ['Figma Pro', 'Atomic Design Tokens', 'WCAG 2.1 AA Compliance', 'Usability Testing'],
      visualType: 'design',
    },
    {
      id: 'development',
      stepNumber: '03',
      title: 'Agile Sprint Engineering & CI/CD',
      shortTitle: 'Agile Sprints & Build',
      subtitle: 'Clean, modular, enterprise-grade code delivered in transparent bi-weekly cycles.',
      timeline: 'Sprint Cycles (2 Wks/Sprint)',
      icon: <Code2 className="w-5 h-5" />,
      summary:
        'Senior engineers build full-stack applications with test-driven workflows, clean modular architecture, and automated CI/CD pipelines. You get working demo deployments every 14 days.',
      deliverables: [
        'Bi-Weekly Staging Environment Deployments & Live Demos',
        'Strict Code Reviews, Branch Protection & Static Analysis',
        'RESTful & GraphQL APIs with automated documentation',
        'Direct Git Repository Access & Weekly Sprint Burndown Reports',
      ],
      toolsAndPractices: ['TypeScript', 'Next.js / React', 'Node / Go / Python', 'GitHub Actions CI/CD'],
      visualType: 'code',
    },
    {
      id: 'qa-security',
      stepNumber: '04',
      title: 'Enterprise Security, QA & Pen-Testing',
      shortTitle: 'QA & Security Auditing',
      subtitle: 'Zero-tolerance quality gates to guarantee bulletproof security and performance.',
      timeline: 'Continuous & Pre-Launch',
      icon: <ShieldCheck className="w-5 h-5" />,
      summary:
        'Every release undergoes rigorous automated end-to-end testing, OWASP Top-10 penetration assessments, cross-browser audits, and high-concurrency stress testing to ensure flawless operation.',
      deliverables: [
        'Automated E2E, Unit, and Integration Test Suites (>90% Coverage)',
        'OWASP Top-10 Vulnerability & Pen-Testing Certification',
        'Multi-Region Load & Concurrency Stress Testing Report',
        'ISO 27001, SOC-2 & GDPR Compliance Verification',
      ],
      toolsAndPractices: ['Playwright / Cypress', 'SonarQube Quality Gates', 'OWASP ZAP', 'k6 Concurrency Tests'],
      visualType: 'security',
    },
    {
      id: 'launch-sla',
      stepNumber: '05',
      title: 'Zero-Downtime Deployment & 24/7 SLA Support',
      shortTitle: 'Go-Live & 24/7 SLA',
      subtitle: 'Smooth market rollout backed by enterprise SLA guarantees and observability.',
      timeline: 'Go-Live & Ongoing Scale',
      icon: <Rocket className="w-5 h-5" />,
      summary:
        'We orchestrate zero-downtime blue-green or canary deployments across AWS, GCP, or Azure with auto-scaling, proactive APM monitoring, and continuous maintenance under signed SLAs.',
      deliverables: [
        'Zero-Downtime Blue-Green Production Release',
        'Centralized Telemetry, Sentry Error Tracking & APM Alerts',
        'Guaranteed 99.9% Uptime SLA with Dedicated On-Call Engineers',
        'Post-Launch Optimization, Security Patches & Feature Scaling',
      ],
      toolsAndPractices: ['Kubernetes / Docker', 'AWS / Cloudflare', 'Datadog / Prometheus', '24/7 SLA Operations'],
      visualType: 'cloud',
    },
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-[#f8fafc] via-[#ffffff] to-[#f1f5f9] font-body relative overflow-hidden border-t border-slate-200/80">
      {/* Background Subtle Tech Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs font-heading font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
            <span>Proven Engineering Lifecycle</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            How We Build & Deliver{' '}
            <span className="text-[#0066ff] relative inline-block">
              High-Impact Software
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-[#0066ff]/25"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
              >
                <path d="M0,0 Q50,12 100,0" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-1">
            From Day 1 technical scoping to enterprise zero-downtime deployment, our battle-tested 5-stage agile process ensures transparent velocity, zero scope surprises, and institutional-grade code.
          </p>
        </div>

        {/* 5-Step Interactive Navigation Bar */}
        <div className="mb-8 sm:mb-12">
          {/* Desktop Timeline Bar */}
          <div className="hidden lg:grid grid-cols-5 gap-3 p-2 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
            {steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isCompleted = idx < activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`group relative text-left p-3.5 rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-white shadow-lg shadow-blue-500/10 border-2 border-[#0066ff] text-slate-900'
                      : 'hover:bg-white/60 text-slate-600 hover:text-slate-900 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-[#0066ff] text-white'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span
                      className={`text-[11px] font-medium ${
                        isActive ? 'text-[#0066ff] font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {step.timeline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-blue-50 text-[#0066ff]'
                          : 'bg-slate-100 text-slate-500 group-hover:text-slate-700'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-xs font-heading font-bold line-clamp-1 leading-snug">
                      {step.shortTitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile / Tablet Horizontal Carousel Buttons */}
          <div className="flex lg:hidden overflow-x-auto gap-2.5 pb-2 scrollbar-none snap-x -mx-4 px-4">
            {steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`snap-start shrink-0 px-4 py-2.5 rounded-full text-xs font-heading font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0066ff] text-white border-[#0066ff] shadow-md shadow-blue-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{step.stepNumber}.</span>
                  <span>{step.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Deep-Dive Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/40 p-6 sm:p-10 lg:p-12 overflow-hidden mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Detailed Step Narrative & Deliverables */}
              <div className="lg:col-span-6 space-y-6">
                {/* Meta Badge */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-[#0066ff]/10 text-[#0066ff] text-xs font-heading font-bold uppercase tracking-wide">
                    Stage {currentStep.stepNumber} of 05
                  </span>
                  <span className="text-xs font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
                    Estimated Time: {currentStep.timeline}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-slate-900 leading-snug">
                    {currentStep.title}
                  </h3>
                  <p className="text-sm font-medium text-[#0066ff] mt-1.5">
                    {currentStep.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentStep.summary}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-heading font-extrabold text-slate-900 uppercase tracking-wider">
                    Key Tangible Deliverables:
                  </h4>
                  <div className="space-y-2.5">
                    {currentStep.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech & Framework Pills */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
                    Tools & Engineering Standards:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.toolsAndPractices.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() =>
                      onOpenScopingModal(`Process Section - ${currentStep.title}`)
                    }
                    className="px-6 py-3 rounded-full font-heading font-semibold text-xs sm:text-sm text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Schedule Technical Scoping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveStepIndex((prev) => (prev + 1) % steps.length)
                    }
                    className="px-5 py-3 rounded-full font-heading font-semibold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Stage</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Stage Graphic / Tech Card */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl bg-gradient-to-tr from-[#0b1120] via-[#0f172a] to-[#1e293b] p-5 sm:p-7 border border-slate-700/60 shadow-2xl overflow-hidden text-white">
                  {/* Subtle Background Glow */}
                  <div className="absolute -top-16 -right-16 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                  {/* Window Chrome Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">
                        asthasoft-lifecycle::{currentStep.id}.spec
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                      STAGE {currentStep.stepNumber}
                    </span>
                  </div>

                  {/* Dynamic Visual Content Based on Step */}
                  {currentStep.visualType === 'architecture' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between bg-slate-900/90 rounded-xl p-3 border border-slate-800">
                        <span className="text-xs font-mono text-slate-300">System Blueprint</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Validated 100%
                        </span>
                      </div>

                      {/* Architecture Node Diagram */}
                      <div className="grid grid-cols-3 gap-2.5 text-center text-[11px] font-mono">
                        <div className="bg-[#131f37] border border-blue-500/40 rounded-lg p-3 space-y-1">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mx-auto" />
                          <span className="text-white font-bold block">Client Tier</span>
                          <span className="text-[9px] text-slate-400 block">Web · iOS · Android</span>
                        </div>
                        <div className="bg-[#131f37] border border-emerald-500/40 rounded-lg p-3 space-y-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto" />
                          <span className="text-white font-bold block">API Gateway</span>
                          <span className="text-[9px] text-slate-400 block">Auth & Rate Limits</span>
                        </div>
                        <div className="bg-[#131f37] border border-purple-500/40 rounded-lg p-3 space-y-1">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mx-auto" />
                          <span className="text-white font-bold block">Microservices</span>
                          <span className="text-[9px] text-slate-400 block">Event-Driven Core</span>
                        </div>
                      </div>

                      {/* Scoping Checklist Box */}
                      <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 text-xs font-mono space-y-2">
                        <div className="text-slate-400 flex items-center justify-between">
                          <span>Sprint Estimation:</span>
                          <span className="text-white font-bold">Fixed & Milestone-Based</span>
                        </div>
                        <div className="text-slate-400 flex items-center justify-between">
                          <span>Data Compliance:</span>
                          <span className="text-emerald-400 font-bold">HIPAA / GDPR Ready</span>
                        </div>
                        <div className="text-slate-400 flex items-center justify-between">
                          <span>Scalability Target:</span>
                          <span className="text-sky-400 font-bold">100k+ Concurrent Users</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.visualType === 'design' && (
                    <div className="space-y-4">
                      {/* Design System Tokens Mock */}
                      <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-mono text-slate-300">Figma Design System Tokens</span>
                        <div className="flex gap-1">
                          <span className="w-3 h-3 rounded-full bg-[#0066ff]" />
                          <span className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="w-3 h-3 rounded-full bg-purple-500" />
                          <span className="w-3 h-3 rounded-full bg-amber-500" />
                        </div>
                      </div>

                      {/* Interactive UI Mock Wireframe Preview */}
                      <div className="bg-[#131f37] rounded-xl p-4 border border-blue-500/30 space-y-3">
                        <div className="h-4 bg-slate-700/60 rounded w-1/3 animate-pulse" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-14 bg-slate-800/80 rounded-lg border border-slate-700/50 p-2 space-y-1.5">
                            <div className="h-2 bg-blue-500/70 rounded w-2/3" />
                            <div className="h-2 bg-slate-700 rounded w-full" />
                          </div>
                          <div className="h-14 bg-slate-800/80 rounded-lg border border-slate-700/50 p-2 space-y-1.5">
                            <div className="h-2 bg-emerald-500/70 rounded w-1/2" />
                            <div className="h-2 bg-slate-700 rounded w-4/5" />
                          </div>
                        </div>
                        <div className="h-8 bg-[#0066ff] rounded-lg flex items-center justify-center text-[11px] font-heading font-bold text-white shadow-sm">
                          Interactive Clickable Prototype
                        </div>
                      </div>

                      <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
                        <span>Design Coverage: 100% Responsive</span>
                        <span className="text-emerald-400">Usability Passed</span>
                      </div>
                    </div>
                  )}

                  {currentStep.visualType === 'code' && (
                    <div className="space-y-4">
                      {/* Code Snippet Box */}
                      <div className="bg-[#090f1d] rounded-xl p-4 border border-slate-800 font-mono text-xs space-y-1.5 text-slate-300">
                        <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1 border-b border-slate-800">
                          <span className="flex items-center gap-1.5">
                            <Terminal className="w-3 h-3 text-[#0066ff]" />
                            <span>git commit -m "feat(core): sprint release"</span>
                          </span>
                          <span className="text-emerald-400">CI Passed</span>
                        </div>
                        <p className="text-blue-400 pt-1">
                          <span className="text-purple-400">export const</span> enterpriseEngine = () =&gt; &#123;
                        </p>
                        <p className="pl-4 text-emerald-300">
                          await sprintService.<span className="text-amber-300">deployStaging</span>(&#123;
                        </p>
                        <p className="pl-8 text-slate-400">version: 'v2.4.0',</p>
                        <p className="pl-8 text-slate-400">testCoverage: '94.8%',</p>
                        <p className="pl-8 text-slate-400">branch: 'release/staging'</p>
                        <p className="pl-4 text-emerald-300">&#125;);</p>
                        <p className="text-blue-400">&#125;;</p>
                      </div>

                      {/* Sprint Velocity Metric */}
                      <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                        <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
                          <span className="text-slate-400 text-[10px] block">Sprint Velocity</span>
                          <span className="text-emerald-400 font-bold text-sm">99.4% On-Time</span>
                        </div>
                        <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
                          <span className="text-slate-400 text-[10px] block">Direct Git Access</span>
                          <span className="text-sky-400 font-bold text-sm">Full Ownership</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.visualType === 'security' && (
                    <div className="space-y-4">
                      {/* Security Audit Score Card */}
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono">
                            A+
                          </div>
                          <div>
                            <span className="text-xs font-heading font-bold text-white block">
                              Security & Pen-Test Audit
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              OWASP Top-10 Zero Highs/Criticals
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                          PASSED
                        </span>
                      </div>

                      {/* Audit Progress Rows */}
                      <div className="space-y-2 bg-[#090f1d] rounded-xl p-3.5 border border-slate-800 text-xs font-mono">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>Automated E2E Tests</span>
                          <span className="text-emerald-400 font-semibold">1,240 / 1,240 Passed</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-full" />
                        </div>

                        <div className="flex items-center justify-between text-slate-300 pt-1">
                          <span>SQLi & XSS Penetration Defense</span>
                          <span className="text-sky-400 font-semibold">100% Immune</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-sky-400 h-full w-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep.visualType === 'cloud' && (
                    <div className="space-y-4">
                      {/* Multi-Region SLA Telemetry Card */}
                      <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="flex items-center gap-2 text-slate-300 font-bold">
                            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                            <span>Live Cluster SLA</span>
                          </span>
                          <span className="text-emerald-400 font-bold">99.99% Uptime</span>
                        </div>
                        {/* Live SLA SVG Pulse Graph */}
                        <svg className="w-full h-16" viewBox="0 0 240 60">
                          <defs>
                            <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0066ff" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#0066ff" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 45 Q 20 20, 50 35 T 100 20 T 150 25 T 200 15 T 240 20 L 240 60 L 0 60 Z"
                            fill="url(#cloudGrad)"
                          />
                          <path
                            d="M0 45 Q 20 20, 50 35 T 100 20 T 150 25 T 200 15 T 240 20"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
                          <span className="text-slate-400 text-[10px] block">Blue-Green Rollout</span>
                          <span className="text-emerald-400 font-bold">Zero Downtime</span>
                        </div>
                        <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800">
                          <span className="text-slate-400 text-[10px] block">Support SLA</span>
                          <span className="text-sky-400 font-bold">&lt; 15 Min Response</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enterprise Delivery Guarantees (4 Trust Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-heading font-bold text-slate-900">
              100% IP & Code Ownership
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              You retain complete ownership of all source code, repositories, IP, design files, and database schemas with zero vendor lock-in.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-heading font-bold text-slate-900">
              Strict Mutual NDA Protection
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              We sign strict non-disclosure agreements before reviewing technical architectures to keep your business vision strictly confidential.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-heading font-bold text-slate-900">
              Bi-Weekly Working Demos
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Inspect working software every 14 days on private staging environments. No blind development or unexpected launch surprises.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-heading font-bold text-slate-900">
              Dedicated Senior Pods
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Direct access to senior full-stack engineers, solution architects, and certified Scrum Masters via dedicated Slack channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
