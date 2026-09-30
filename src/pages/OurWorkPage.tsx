import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Maximize2,
  X,
  ChevronRight,
  Cpu,
  PhoneCall,
  Check,
  Users,
} from 'lucide-react';
import { navigateTo } from '../utils/navigation';

interface OurWorkPageProps {
  onOpenScopingModal: (source?: string) => void;
  onOpenCallModal?: (context?: string) => void;
}

interface ScreenshotItem {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  src: string;
  description: string;
  highlights: string[];
}

const CAR_RENTAL_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'dashboard',
    title: 'Fleet Operations & Live Dispatch Control Hub',
    shortTitle: 'Fleet Dashboard',
    badge: 'Operations Command Center',
    src: '/works/car-rental-dashboard.png',
    description:
      'Real-time operational dashboard featuring immediate fleet health indicators (Total, Available, Running, Unavailable), quick car dispatch shortcuts, Jalore branch selector, and intuitive booking search engine.',
    highlights: [
      'Live fleet status monitors: 3 total units, 2 running on road, 1 hold/service',
      'Branch-aware booking filters (Jalore Main Branch) with date & time precision',
      'Quick action shortcuts: "Assign Car", "+ Add Car", "Add Customer", "Quick Return"',
      'Role-based left navigation with real-time notifications and payment audits',
    ],
  },
  {
    id: 'fleet',
    title: 'Vehicle Fleet Inventory & Lifecycle Management',
    shortTitle: 'Fleet Inventory',
    badge: 'Asset & Status Engine',
    src: '/works/car-rental-fleet.png',
    description:
      'Granular vehicle inventory tracking system managing registration numbers (RJ16, RJ18, RJ12), rental specifications, model years, and instant status updates (Rented, Available, Inactive).',
    highlights: [
      'Dynamic inventory cards with photos, registration numbers, and manufacture year',
      'Instant status tags: "RENTED", "AVAILABLE", "INACTIVE" with visual color coding',
      'Multi-filter search by make, model, registration #, vehicle category, and branch',
      'Supports single-click vehicle registration and detailed rate card adjustments',
    ],
  },
  {
    id: 'booking',
    title: 'Smart Rental Terms, Dispatch & Automated GST Billing',
    shortTitle: 'Booking & Dispatch',
    badge: 'Automated Billing & Invoicing',
    src: '/works/car-rental-booking.png',
    description:
      'Intelligent 3-step rental dispatch workflow with starting odometer verification, refundable security deposit accounting (₹10,000), Zero-Dep insurance addons, and automated 18% GST tax calculation.',
    highlights: [
      'Accurate schedule & starting KM odometer logging to prevent mileage disputes',
      'Custom add-ons: Zero-Dep Insurance Cover (₹499) & Chauffeur / Driver service (₹1,000/day)',
      'Automated real-time invoice breakdown: Base Rental + Insurance + 18% GST + Refundable Deposit',
      'Instant digital agreement confirmation linking vehicle directly to customer KYC profile',
    ],
  },
];

const ADDITIONAL_PROJECTS = [
  {
    title: 'AsthaSMS Enterprise Messaging Gateway',
    client: 'Asthasoft Cloud Suite',
    category: 'Telecom & Cloud API',
    tag: 'Enterprise Infrastructure',
    description:
      'Ultra-high throughput SMS & OTP dispatch engine built with DLT compliance, smart carrier fallback routing, and real-time delivery analytics handling millions of messages daily.',
    stats: [
      { label: 'Carrier Delivery', value: '99.98%' },
      { label: 'Throughput', value: '10k+ SMS/sec' },
      { label: 'Latency', value: '< 1.8s OTP' },
    ],
    tech: ['Node.js', 'Redis Queue', 'SMPP Gateway', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'AsthaPay Multi-Rail Payment Gateway',
    client: 'Fintech Division',
    category: 'Fintech & Digital Banking',
    tag: 'Digital Payments',
    description:
      'Seamless unified checkout supporting UPI intent, QR codes, cards, and net banking with sub-second webhook notifications, auto-reconciliation, and fraud protection heuristics.',
    stats: [
      { label: 'Success Rate', value: '98.6%' },
      { label: 'Processed Volume', value: '₹100Cr+' },
      { label: 'API Uptime', value: '99.99%' },
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'AWS KMS', 'PCI-DSS'],
  },
  {
    title: 'AsthaHost Cloud Server Management Cluster',
    client: 'Hosting Operations',
    category: 'Cloud Infrastructure',
    tag: 'Server Cloud',
    description:
      'Custom hosting orchestrator providing high-availability Linux/cPanel instances, automated SSL provisioning, real-time DDoS attack filtering, and snapshot backup management.',
    stats: [
      { label: 'Network Uptime', value: '99.99%' },
      { label: 'Active Domains', value: '5,000+' },
      { label: 'Storage', value: 'NVMe RAID' },
    ],
    tech: ['Linux Kernel Tuning', 'cPanel API', 'Ceph Storage', 'NGINX'],
  },
  {
    title: 'CarePulse Telehealth & Clinic ERP',
    client: 'Private Healthcare Provider',
    category: 'Healthcare & SaaS',
    tag: 'HealthTech',
    description:
      'Comprehensive clinic automation suite featuring encrypted WebRTC video consults, patient electronic health records (EHR), automated prescription generation, and lab report portals.',
    stats: [
      { label: 'Consultations', value: '150k+' },
      { label: 'Patient Retention', value: '+42%' },
      { label: 'Security', value: 'HIPAA Standard' },
    ],
    tech: ['React Native', 'WebRTC', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
  },
];

export const OurWorkPage: React.FC<OurWorkPageProps> = ({
  onOpenScopingModal,
  onOpenCallModal,
}) => {
  const [activeScreenshotTab, setActiveScreenshotTab] = useState('dashboard');
  const [lightboxImage, setLightboxImage] = useState<ScreenshotItem | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'ERP & Logistics' | 'Fintech & Telecom' | 'Cloud Infrastructure'>('All');

  const activeScreenshot =
    CAR_RENTAL_SCREENSHOTS.find((s) => s.id === activeScreenshotTab) ||
    CAR_RENTAL_SCREENSHOTS[0];

  const filteredProjects = ADDITIONAL_PROJECTS.filter((p) => {
    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'ERP & Logistics') return p.category.includes('ERP') || p.category.includes('Healthcare');
    if (categoryFilter === 'Fintech & Telecom') return p.category.includes('Fintech') || p.category.includes('Telecom');
    if (categoryFilter === 'Cloud Infrastructure') return p.category.includes('Cloud');
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#0066ff] selection:text-white pb-20 font-body">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-5xl w-full shadow-2xl relative flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide">
                    {lightboxImage.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxImage(null)}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 sm:p-5 bg-slate-100 flex items-center justify-center overflow-auto max-h-[75vh]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="rounded-xl border border-slate-300 max-h-[70vh] w-auto object-contain shadow-xl"
                />
              </div>

              <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {lightboxImage.description}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setLightboxImage(null);
                    onOpenScopingModal('Our Work Modal Lightbox');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold shrink-0 cursor-pointer shadow-sm"
                >
                  Request Similar Software
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Area */}
      <section className="relative pt-8 sm:pt-12 pb-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex items-center gap-2 text-xs text-slate-500">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('/');
                  }}
                  className="hover:text-slate-900 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="text-[#0066ff] font-semibold">Our Work & Case Studies</li>
            </ol>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/70 text-[#0066ff] text-xs font-semibold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
            <span>Asthasoft Client Deliveries & Works</span>
          </div>

          {/* HIGH-IMPACT TOP CTA HERO BANNER */}
          <div className="rounded-3xl bg-gradient-to-r from-[#0052cc] via-[#0066ff] to-[#0284c7] p-8 sm:p-12 md:p-14 text-center text-white shadow-xl shadow-blue-500/15 relative overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase mb-3">
              READY TO BUILD YOUR CUSTOM SYSTEM?
            </span>

            <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black max-w-4xl mx-auto leading-tight">
              Let's Build Software That Powers Your Entire Business Operations
            </h1>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Whether you need a car rental ERP, fintech gateway, SaaS application, or internal workflow system — Asthasoft delivers within budget and strict timelines.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onOpenScopingModal('Our Work Top CTA')}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-white text-[#0066ff] hover:bg-slate-50 font-heading font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Schedule Free Scoping Session
              </button>

              {onOpenCallModal ? (
                <button
                  type="button"
                  onClick={() => onOpenCallModal('Our Work Consultation')}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-heading font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Call in 30 Min</span>
                </button>
              ) : (
                <a
                  href="tel:+917023318111"
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-heading font-bold text-xs sm:text-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Call +91-7023318111</span>
                </a>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-6 text-xs text-blue-100 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" /> No Obligation Consultation
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" /> Strict NDA Signed First
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-white" /> Transparent Milestone Pricing
              </span>
            </div>
          </div>

          {/* Simple Key Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-slate-900">50+</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Deployed Systems
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600">99.98%</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Proven Uptime
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-amber-600">₹100Cr+</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Annual Volume
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center">
              <span className="block text-2xl sm:text-3xl font-black text-purple-600">100%</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                On-Time Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FLAGSHIP CASE STUDY: CAR RENTAL & FLEET ERP */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs font-bold uppercase tracking-wider mb-2">
                <Car className="w-3.5 h-3.5" />
                <span>Featured Client Delivery</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                JSD Car Rental & Fleet Operations ERP
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                A custom enterprise web application engineered for self-drive vehicle rentals, live fleet telemetry, automated 18% GST billing, and on-ground branch dispatching.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-600">
                Industry: <strong className="text-slate-900">Automotive & Fleet ERP</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono text-slate-600">
                Client: <strong className="text-slate-900">Jalore, Rajasthan, India</strong>
              </span>
            </div>
          </div>

          {/* Interactive Showcase Card in Light Theme */}
          <div className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-8 shadow-sm">
            {/* Tab Navigation */}
            <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70 max-w-fit">
              {CAR_RENTAL_SCREENSHOTS.map((tab) => {
                const isActive = activeScreenshotTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveScreenshotTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#0066ff] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <span>{tab.shortTitle}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Screen Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Screen Preview with Zoomable Lightbox */}
              <div className="lg:col-span-8 flex flex-col gap-2.5">
                <div
                  className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md cursor-pointer"
                  onClick={() => setLightboxImage(activeScreenshot)}
                  title="Click to view full screen"
                >
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/20">
                      {activeScreenshot.badge}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-900/70 backdrop-blur-md text-white group-hover:bg-[#0066ff] transition-colors shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <img
                    src={activeScreenshot.src}
                    alt={activeScreenshot.title}
                    className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                      Click image for full-screen zoom preview
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>Module: {activeScreenshot.title}</span>
                  <span className="text-[#0066ff] font-mono text-[11px] font-semibold">Production Build · Asthasoft Verified</span>
                </div>
              </div>

              {/* Right: Technical Architecture & Feature Highlights */}
              <div className="lg:col-span-4 flex flex-col gap-5">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0066ff] mb-1">
                    System Functionality
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {activeScreenshot.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {activeScreenshot.description}
                  </p>
                </div>

                {/* Specific Capabilities */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Key Engineered Capabilities:
                  </span>
                  {activeScreenshot.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-700 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Telematics Sync'].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenScopingModal('Car Rental Case Study CTA')}
                    className="w-full py-3 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Similar Custom ERP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Business Impact Metrics */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">
                  Check-in / Out Time
                </span>
                <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                  &lt; 4 Minutes
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
                  ↓ Down from 25 min manual paper check
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">
                  Booking Conflict Rate
                </span>
                <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                  0.0% Conflicts
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
                  100% automated time-slot lock
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">
                  Deposit & Invoicing Accuracy
                </span>
                <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                  100% Automated
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
                  Instant GST 18% & security deposit tally
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-xs text-slate-500 font-medium block">
                  Fleet Visibility
                </span>
                <span className="text-xl font-extrabold text-slate-900 mt-1 block">
                  Real-Time Live
                </span>
                <span className="text-[11px] text-emerald-600 font-medium mt-0.5 block">
                  Across Jalore & Rajasthan branches
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Feedback Quote */}
      <section className="py-4">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-sky-50/60 border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#0066ff]/10 text-[#0066ff] flex items-center justify-center shrink-0 border border-blue-200">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "Asthasoft built our car rental software exactly to our workflow. From live odometer tracking to the automated 18% GST and ₹10,000 security deposit calculations, our branch operations run seamlessly without a single booking dispute."
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Operations Director</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-[#0066ff] font-medium">JSD Premium Self-Drive Car Rental, Jalore</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenScopingModal('Client Quote CTA')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shrink-0 transition-colors cursor-pointer border border-slate-300 shadow-xs whitespace-nowrap"
            >
              Consult On Fleet Tech
            </button>
          </div>
        </div>
      </section>

      {/* MORE ASTHASOFT ENTERPRISE WORKS & PLATFORMS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Diverse Engineering Portfolio</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                More Software & Cloud Platforms By Asthasoft
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                Explore our proprietary sub-brands and enterprise client systems deployed across telecom, payments, and infrastructure.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'ERP & Logistics', 'Fintech & Telecom', 'Cloud Infrastructure'] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setCategoryFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      categoryFilter === filter
                        ? 'bg-[#0066ff] text-white shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all duration-200 relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 border border-blue-200/60 text-[#0066ff] text-[11px] font-semibold">
                      {project.tag}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0066ff] transition-colors mb-1.5">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Stats Pill */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                    {project.stats.map((s, sIdx) => (
                      <div key={sIdx}>
                        <div className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {s.value}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase font-medium mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono text-slate-700 border border-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onOpenScopingModal(`Project: ${project.title}`)}
                    className="text-xs font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Architecture Brief</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-500">
                    Enterprise SLA
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH ASTHASOFT FOR CUSTOM SOFTWARE */}
      <section className="py-12 sm:py-16 border-t border-slate-200/80 bg-white">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066ff] mb-2 block">
              The Asthasoft Advantage
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why High-Growth Companies Trust Our Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We do not build disposable software. We architect hardened, production-ready enterprise platforms that streamline operations and maximize revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0066ff] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                100% IP & Code Ownership
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You own 100% of the intellectual property, git repositories, database schemas, and cloud deployment pipelines from Day 1. No vendor lock-in.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Real-Time Data & Business Logic
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                From live vehicle availability and telematics to multi-currency and GST invoice calculations, we turn complex business math into seamless user experiences.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Direct Engineering Accountability
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Work directly with dedicated senior architects and full-stack software engineers in India who understand your business model and deliver on time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
