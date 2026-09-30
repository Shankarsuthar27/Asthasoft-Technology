import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Maximize2,
  X,
  Cpu,
  PhoneCall,
  Check,
  Users,
} from 'lucide-react';

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
    title: 'Fleet Operations & Dispatch Hub',
    shortTitle: 'Fleet Dashboard',
    badge: 'Operations Hub',
    src: '/works/car-rental-dashboard.png',
    description:
      'Real-time operations center with live fleet availability, quick dispatch actions, branch selector, and instant booking search.',
    highlights: [
      'Live fleet status monitors (Available, Running, Hold)',
      'Branch-aware scheduling with date & time precision',
      'One-click shortcuts: Assign Car, Add Vehicle, Quick Return',
    ],
  },
  {
    id: 'fleet',
    title: 'Vehicle Fleet & Inventory Management',
    shortTitle: 'Fleet Inventory',
    badge: 'Fleet Inventory',
    src: '/works/car-rental-fleet.png',
    description:
      'Vehicle inventory tracking system managing registration numbers, rental specs, model years, and real-time status updates.',
    highlights: [
      'Visual vehicle cards with photos and model specifications',
      'Instant color-coded status tags (Rented, Available, Inactive)',
      'Multi-filter search by make, model, category, and branch',
    ],
  },
  {
    id: 'booking',
    title: 'Booking Dispatch & Automated GST Billing',
    shortTitle: 'Booking & Dispatch',
    badge: 'Billing & Invoicing',
    src: '/works/car-rental-booking.png',
    description:
      'Streamlined 3-step rental dispatch workflow with starting odometer verification, deposit tracking, and automated 18% GST tax calculation.',
    highlights: [
      'Starting odometer logging to eliminate mileage disputes',
      'Instant invoice breakdown with 18% GST and security deposits',
      'One-click add-ons for Zero-Dep insurance & chauffeur service',
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

const METRICS_DATA = [
  { value: '50+', label: 'Deployed Systems', color: 'text-slate-900' },
  { value: '99.98%', label: 'Proven Uptime', color: 'text-emerald-600' },
  { value: '₹100Cr+', label: 'Annual Volume', color: 'text-amber-600' },
  { value: '100%', label: 'On-Time Delivery', color: 'text-purple-600' },
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#0066ff] selection:text-white pb-20 font-body"
    >
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
              initial={{ scale: 0.93, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.93, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden max-w-6xl w-full shadow-2xl relative flex flex-col"
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

              <div className="p-3 sm:p-5 bg-slate-100 flex items-center justify-center overflow-auto max-h-[82vh]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="rounded-xl border border-slate-300 max-h-[78vh] w-auto object-contain shadow-xl"
                />
              </div>

              <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {lightboxImage.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setLightboxImage(null);
                    onOpenScopingModal('Our Work Modal Lightbox');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold shrink-0 cursor-pointer shadow-sm"
                >
                  Request Similar Software
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Area */}
      <section className="relative pt-6 sm:pt-10 pb-10 bg-white border-b border-slate-200/80">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          {/* HIGH-IMPACT TOP CTA HERO BANNER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-gradient-to-r from-[#0052cc] via-[#0066ff] to-[#0284c7] p-8 sm:p-12 md:p-14 text-center text-white shadow-xl shadow-blue-500/15 relative overflow-hidden mb-8"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-block px-3.5 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wider uppercase mb-3"
            >
              READY TO BUILD YOUR CUSTOM SYSTEM?
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.55 }}
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black max-w-4xl mx-auto leading-tight"
            >
              Let's Build Software That Powers Your Entire Business Operations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              className="mt-4 text-xs sm:text-sm md:text-base text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Whether you need a car rental ERP, fintech gateway, SaaS application, or internal workflow system — Asthasoft delivers within budget and strict timelines.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.55 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => onOpenScopingModal('Our Work Top CTA')}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-white text-[#0066ff] hover:bg-slate-50 font-heading font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Schedule Free Scoping Session
              </motion.button>

              {onOpenCallModal ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => onOpenCallModal('Our Work Consultation')}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Call in 30 Min</span>
                </motion.button>
              ) : (
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="tel:+917023318111"
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>Call +91-7023318111</span>
                </motion.a>
              )}
            </motion.div>

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
          </motion.div>

          {/* Simple Key Metrics Bar with Stagger Animation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {METRICS_DATA.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-center hover:border-blue-400/80 hover:shadow-sm transition-all cursor-default"
              >
                <span className={`block text-2xl sm:text-3xl font-black ${metric.color}`}>
                  {metric.value}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLAGSHIP CASE STUDY: CAR RENTAL & FLEET ERP */}
      <section className="py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0066ff] mb-1 block">
                Featured Case Study
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                JSD Car Rental & Fleet Operations ERP
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                A custom enterprise web application engineered for self-drive vehicle rentals, live fleet telemetry, automated 18% GST billing, and branch dispatching.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600">
                Automotive & Fleet ERP · Jalore, Rajasthan
              </span>
            </div>
          </motion.div>

          {/* Interactive Showcase Card in Light Theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="rounded-3xl bg-white border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-sm"
          >
            {/* Tab Navigation with Animated Sliding Indicator */}
            <div className="flex flex-wrap items-center gap-1.5 mb-6 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/70 max-w-fit">
              {CAR_RENTAL_SCREENSHOTS.map((tab) => {
                const isActive = activeScreenshotTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveScreenshotTab(tab.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-[#0066ff] rounded-xl shadow-xs"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{tab.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Screen Showcase with Smooth Cross-Fade Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreenshot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="flex flex-col lg:flex-row gap-7 lg:gap-8 items-start"
              >
                {/* Left: Screen Preview with Zoomable Lightbox */}
                <div className="w-full lg:w-[68%] xl:w-[70%] flex flex-col gap-2 shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.006 }}
                    transition={{ duration: 0.2 }}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md cursor-pointer"
                    onClick={() => setLightboxImage(activeScreenshot)}
                    title="Click to view full screen"
                  >
                    <div className="absolute top-3 right-3 z-20">
                      <div className="p-2 rounded-lg bg-slate-900/70 backdrop-blur-md text-white group-hover:bg-[#0066ff] transition-colors shadow-sm">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <img
                      src={activeScreenshot.src}
                      alt={activeScreenshot.title}
                      className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </motion.div>
                </div>

                {/* Right: Technical Architecture & Feature Highlights */}
                <div className="w-full lg:w-[32%] xl:w-[30%] flex flex-col gap-5">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {activeScreenshot.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {activeScreenshot.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    {activeScreenshot.highlights.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-700 leading-snug">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-[11px] font-semibold text-slate-500 mb-2">
                      Core Technologies:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['React 18', 'TypeScript', 'Node.js', 'PostgreSQL', 'Telematics Sync'].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-[11px] text-slate-700 font-mono"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="pt-1">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => onOpenScopingModal('Car Rental Case Study CTA')}
                      className="w-full py-3 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Request Similar Custom ERP</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Simplified Business Impact Metrics */}
            <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-3.5">
              {[
                { title: 'Check-in / Out Time', val: '< 4 Minutes' },
                { title: 'Booking Conflict Rate', val: '0.0%' },
                { title: 'Deposit & Invoicing', val: '100% Automated' },
                { title: 'Fleet Visibility', val: 'Real-Time Live' },
              ].map((m, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center hover:border-blue-300 transition-colors"
                >
                  <span className="text-xl font-extrabold text-slate-900 block">
                    {m.val}
                  </span>
                  <span className="text-xs text-slate-500 font-medium mt-1 block">
                    {m.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Feedback Quote */}
      <section className="py-4">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-blue-50/80 via-white to-sky-50/60 border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs"
          >
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

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onOpenScopingModal('Client Quote CTA')}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shrink-0 transition-colors cursor-pointer border border-slate-300 shadow-xs whitespace-nowrap"
            >
              Consult On Fleet Tech
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* MORE ASTHASOFT ENTERPRISE WORKS & PLATFORMS */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
          >
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

            {/* Filter Buttons with Animated Indicator */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
              {(['All', 'ERP & Logistics', 'Fintech & Telecom', 'Cloud Infrastructure'] as const).map(
                (filter) => {
                  const isActive = categoryFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setCategoryFilter(filter)}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-[#0066ff] rounded-lg shadow-xs"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">{filter}</span>
                    </button>
                  );
                }
              )}
            </div>
          </motion.div>

          {/* Grid of Projects with Animated Entrance and Hover */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
                      className="text-xs font-bold text-[#0066ff] hover:text-[#0052cc] transition-colors flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5"
                    >
                      <span>Request Architecture Brief</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <span className="text-[11px] font-mono text-slate-500">
                      Enterprise SLA
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* WHY PARTNER WITH ASTHASOFT FOR CUSTOM SOFTWARE */}
      <section className="py-12 sm:py-16 border-t border-slate-200/80 bg-white">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#0066ff] mb-2 block">
              The Asthasoft Advantage
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why High-Growth Companies Trust Our Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              We do not build disposable software. We architect hardened, production-ready enterprise platforms that streamline operations and maximize revenue.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <ShieldCheck className="w-5 h-5" />,
                iconBg: 'bg-blue-100 text-[#0066ff]',
                title: '100% IP & Code Ownership',
                desc: 'You own 100% of the intellectual property, git repositories, database schemas, and cloud deployment pipelines from Day 1. No vendor lock-in.',
              },
              {
                icon: <Cpu className="w-5 h-5" />,
                iconBg: 'bg-emerald-100 text-emerald-700',
                title: 'Real-Time Data & Business Logic',
                desc: 'From live vehicle availability and telematics to multi-currency and GST invoice calculations, we turn complex business math into seamless user experiences.',
              },
              {
                icon: <Users className="w-5 h-5" />,
                iconBg: 'bg-purple-100 text-purple-700',
                title: 'Direct Engineering Accountability',
                desc: 'Work directly with dedicated senior architects and full-stack software engineers in India who understand your business model and deliver on time.',
              },
            ].map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl ${adv.iconBg} flex items-center justify-center mb-4`}>
                  {adv.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};
