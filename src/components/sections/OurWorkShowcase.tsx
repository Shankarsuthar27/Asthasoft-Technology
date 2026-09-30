import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  ShieldCheck,
  Zap,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Database,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck2,
  Clock,
  MapPin,
  TrendingUp,
  Receipt,
  Users
} from 'lucide-react';
import {
  IconBrandWhatsapp,
  IconGauge,
  IconSteeringWheel,
  IconShieldLock,
  IconBuildingStore
} from '@tabler/icons-react';

interface OurWorkShowcaseProps {
  onOpenScopingModal: (source?: string) => void;
  onRequestCall?: (context?: string) => void;
}

interface SoftwareScreen {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  urlBar: string;
  keyFeatures: string[];
  metrics: { label: string; value: string }[];
}

const CAR_RENTAL_SCREENS: SoftwareScreen[] = [
  {
    id: 'dashboard',
    tabLabel: 'Fleet Operations Dashboard',
    badge: 'Live Operations Center',
    title: 'Real-Time Fleet Status & Vehicle Dispatch Engine',
    subtitle: 'High-speed scheduling, dynamic availability query, and centralized branch operations.',
    description:
      'Engineered for high-turnover self-drive rental hubs. Operators can view live fleet status metrics (Total Fleet, Available, Running, Unavailable), perform instant date/time pickup queries, select branch pickup/return locations, and trigger 1-click car assignments.',
    image: '/works/car-rental-dashboard.png',
    urlBar: 'https://app.jsdcarrental.com/dashboard/fleet-operations',
    keyFeatures: [
      'Real-time fleet state synchronization across Total, Available & Running units',
      'Location-based pickup & return date/time booking scheduler (24h/48h duration)',
      'Quick-action shortcuts: Quick Car Assignment, Add Vehicle, Add Customer & Fast Return',
      'Branch-level fleet availability filters tailored for Jalore Main Branch'
    ],
    metrics: [
      { label: 'Fleet Sync Latency', value: '< 150ms' },
      { label: 'Booking Time', value: '< 60 Sec' },
      { label: 'Uptime SLA', value: '99.98%' }
    ]
  },
  {
    id: 'fleet-management',
    tabLabel: 'Vehicle Fleet Catalog',
    badge: 'Inventory & Specification Hub',
    title: 'Multi-Vehicle Fleet Inventory & Live Lifecycle Management',
    subtitle: 'Granular specification records, active rental badges, and fleet status monitoring.',
    description:
      'Complete digitized garage management module. Fleet managers can register new vehicles, update year/model specifications, monitor active rental tags (RENTED / INACTIVE / READY), toggle between card & table views, and filter across registration numbers (RJ16SB2020, RJ18CB1560, RJ12WH1883).',
    image: '/works/car-rental-fleet.png',
    urlBar: 'https://app.jsdcarrental.com/fleet/vehicle-management',
    keyFeatures: [
      'Comprehensive vehicle profile: Make, Model, Fuel Type, Year & Registration Number',
      'Live status tags (Rented, Available, Maintenance, Inactive/Hold) with instant badge alerts',
      'Multi-filter search engine: Query by make, model, registration #, and branch location',
      'Card & Table responsive layout toggles optimized for desktop and tablet dispatchers'
    ],
    metrics: [
      { label: 'Vehicles Handled', value: '50+ Units' },
      { label: 'Spec Update Time', value: 'Instant' },
      { label: 'Paperless Records', value: '100%' }
    ]
  },
  {
    id: 'booking-assignment',
    tabLabel: 'Smart Assignment & Billing',
    badge: 'Automated Billing & Escrow',
    title: 'Rental Terms, Starting KM & Automated GST / Escrow Engine',
    subtitle: 'Transparent pricing breakdown, insurance coverage add-ons, and handover checklists.',
    description:
      'End-to-end client assignment and financial settlement protocol. Automatically computes Base Rental for 48h durations, applies Zero-Dep Insurance (₹499) and 18% GST (₹89.82), handles refundable Security Deposit escrow (₹10,000), logs starting odometer KM, and binds customer KYC & DL credentials upon confirmation.',
    image: '/works/car-rental-booking.png',
    urlBar: 'https://app.jsdcarrental.com/rentals/assign-vehicle?step=schedule',
    keyFeatures: [
      'Automated financial calculation: Base Rental + Zero-Dep Insurance + 18% GST + Security Deposit',
      'Starting & Ending Odometer verification to eliminate dispute over mileage limits',
      'Customer KYC & Driving License number linking directly to digital assignment ticket',
      'Driver assignment add-on option and vehicle condition handover notes checklist'
    ],
    metrics: [
      { label: 'Deposit Accuracy', value: '100%' },
      { label: 'Automated GST', value: '18% Exact' },
      { label: 'Dispute Reduction', value: '94%' }
    ]
  }
];

export const OurWorkShowcase: React.FC<OurWorkShowcaseProps> = ({
  onOpenScopingModal,
  onRequestCall
}) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const activeScreen =
    CAR_RENTAL_SCREENS.find((s) => s.id === activeTab) || CAR_RENTAL_SCREENS[0];

  const handleOpenLightbox = (imgSrc: string) => {
    setLightboxImage(imgSrc);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  const handleNextLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = CAR_RENTAL_SCREENS.findIndex(
      (s) => s.image === lightboxImage
    );
    const nextIndex = (currentIndex + 1) % CAR_RENTAL_SCREENS.length;
    setLightboxImage(CAR_RENTAL_SCREENS[nextIndex].image);
  };

  const handlePrevLightbox = () => {
    if (!lightboxImage) return;
    const currentIndex = CAR_RENTAL_SCREENS.findIndex(
      (s) => s.image === lightboxImage
    );
    const prevIndex =
      (currentIndex - 1 + CAR_RENTAL_SCREENS.length) % CAR_RENTAL_SCREENS.length;
    setLightboxImage(CAR_RENTAL_SCREENS[prevIndex].image);
  };

  return (
    <section
      id="our-work"
      className="scroll-mt-24 bg-[#0a0f1d] text-white py-20 sm:py-28 relative overflow-hidden font-body border-t border-b border-white/10"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#0066ff]/15 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Asthasoft Works & Production Deployments</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Our Work:{' '}
            <span className="bg-gradient-to-r from-blue-400 via-[#0066ff] to-cyan-300 bg-clip-text text-transparent">
              Custom Software & Fleet Systems
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed">
            Take a deep dive into real-world software engineered from the ground up by{' '}
            <strong className="text-white font-semibold">Asthasoft Technologies</strong>.
            From high-concurrency mobility ERPs to telecom and fintech backbones, we build
            production solutions that power mission-critical daily business operations.
          </p>
        </div>

        {/* 2. CENTERPIECE SPOTLIGHT: JSD CAR RENTAL & FLEET OPERATIONS ERP */}
        <div className="bg-gradient-to-b from-[#0f172a]/95 via-[#0e1628]/95 to-[#0b1120]/95 border border-blue-500/30 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative backdrop-blur-xl mb-16">
          
          {/* Spotlight Header Meta Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-[#0066ff]/20 text-[#38bdf8] text-[11px] font-bold uppercase tracking-wider border border-[#0066ff]/40">
                  Featured Case Study
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Live Production System
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1 border border-slate-700">
                  <MapPin className="w-3 h-3 text-red-400" /> Jalore, Rajasthan Branch
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center gap-2.5 flex-wrap">
                <span>JSD — Premium Self-Drive Car Rental & Fleet Operations ERP</span>
              </h3>
            </div>

            {/* Quick Action CTA */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenScopingModal('Our Work - Car Rental ERP Inquire')}
                className="px-4 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>Request Software Like This</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {CAR_RENTAL_SCREENS.map((screen) => {
              const isActive = activeTab === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveTab(screen.id)}
                  className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer border ${
                    isActive
                      ? 'bg-[#0066ff] text-white border-blue-400/80 shadow-md shadow-blue-500/30'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-white/10'
                  }`}
                >
                  {screen.id === 'dashboard' && <IconGauge className="w-4 h-4" />}
                  {screen.id === 'fleet-management' && <Car className="w-4 h-4" />}
                  {screen.id === 'booking-assignment' && <Receipt className="w-4 h-4" />}
                  <span>{screen.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Screen Showcase Grid: Preview & Feature Deep Dive */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Browser Window Mockup */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl group relative">
                
                {/* Browser Window Chrome */}
                <div className="bg-[#1e293b]/90 px-4 py-2.5 border-b border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block" />
                  </div>
                  <div className="flex-1 max-w-sm mx-3 bg-slate-900/90 rounded-md px-3 py-1 text-[11px] font-mono text-slate-400 truncate text-center border border-slate-700/60 select-none">
                    🔒 {activeScreen.urlBar}
                  </div>
                  <button
                    onClick={() => handleOpenLightbox(activeScreen.image)}
                    className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Expand Full Screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Screenshot Frame with Lightbox Trigger */}
                <div
                  className="relative cursor-pointer overflow-hidden bg-slate-900 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center"
                  onClick={() => handleOpenLightbox(activeScreen.image)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeScreen.image}
                      src={activeScreen.image}
                      alt={activeScreen.title}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </AnimatePresence>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                    <span className="text-xs font-semibold text-white bg-blue-600/90 px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                      Click to expand full resolution
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded">
                      Asthasoft Production Build
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 Thumbnails Selector Row */}
              <div className="grid grid-cols-3 gap-3">
                {CAR_RENTAL_SCREENS.map((s, idx) => {
                  const isCurrent = activeTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(s.id)}
                      className={`relative rounded-xl overflow-hidden border p-1 transition-all text-left group cursor-pointer ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-500/10 shadow-md ring-2 ring-blue-500/40'
                          : 'border-white/10 bg-slate-900/60 hover:border-slate-600'
                      }`}
                    >
                      <div className="aspect-[16/9] rounded-lg overflow-hidden bg-slate-950 mb-1.5">
                        <img
                          src={s.image}
                          alt={s.tabLabel}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="px-1 pb-1">
                        <p className={`text-[11px] font-bold truncate ${isCurrent ? 'text-blue-400' : 'text-slate-300'}`}>
                          {idx + 1}. {s.tabLabel}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 5 Columns: Feature Deep-Dive & Architecture Breakdown */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
                  <span>{activeScreen.badge}</span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
                  {activeScreen.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {activeScreen.description}
                </p>

                {/* Key Engineered Capabilities */}
                <div className="space-y-2.5 mb-6">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Engineered Capabilities:
                  </h5>
                  {activeScreen.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI Performance Bar */}
              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-3 gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
                  {activeScreen.metrics.map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-sm sm:text-base font-extrabold text-[#38bdf8] font-heading">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 3. ARCHITECTURE & WORKFLOW HIGHLIGHTS OF CAR RENTAL SYSTEM */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Full-Stack Architecture & Feature Modules Built by Asthasoft</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Feature 1 */}
              <div className="bg-slate-900/60 border border-white/10 hover:border-blue-400/40 rounded-2xl p-4 transition-all">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <IconSteeringWheel className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">
                  Real-Time Fleet State Engine
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Instant status tracking across Available, Running, and Maintenance states with automated calendar reservation lock.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-900/60 border border-white/10 hover:border-blue-400/40 rounded-2xl p-4 transition-all">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Receipt className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">
                  18% GST & Deposit Escrow
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated Indian tax calculation (CGST/SGST), optional Zero-Dep accidental insurance, and refundable security deposit ledger.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-900/60 border border-white/10 hover:border-blue-400/40 rounded-2xl p-4 transition-all">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">
                  KYC & Driving License Audit
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Streamlined customer onboarding capturing Driving License credentials, emergency contacts, and fuel/RC handover sign-off.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-slate-900/60 border border-white/10 hover:border-blue-400/40 rounded-2xl p-4 transition-all">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <IconGauge className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">
                  Starting / Return Odometer Log
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Accurate kilometer auditing on vehicle handover and return, preventing dispute over excess usage and fuel depletion.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* 4. MORE ENTERPRISE WORKS BY ASTHASOFT ECOSYSTEM */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Explore More Production Works & Enterprise Platforms
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Asthasoft Technologies designs, builds, and maintains custom software ecosystems,
              scalable telecom gateways, and mission-critical cloud backends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: AsthaSMS */}
            <div className="bg-[#0f172a]/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    Telecom & Messaging Engine
                  </span>
                  <span className="text-xs text-slate-500 font-mono">10M+ SMS/mo</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  AsthaSMS Gateway
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  High-throughput telecom routing platform engineered for transactional OTPs,
                  bulk promotional campaigns, WhatsApp Business API dispatches, and voice broadcast alerts.
                </p>
              </div>
              <button
                onClick={() => onOpenScopingModal('AsthaSMS Technical Scoping')}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer pt-2 border-t border-white/5"
              >
                <span>Inquire for Telecom Platform</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: AsthaPay */}
            <div className="bg-[#0f172a]/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    FinTech Infrastructure
                  </span>
                  <span className="text-xs text-slate-500 font-mono">PCI-Ready</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  AsthaPay Merchant Settlement
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Ultra-secure multi-tier payment orchestration suite featuring automated webhook reconciliation,
                  UPI dynamic QR generation, instant merchant payouts, and escrow settlement logs.
                </p>
              </div>
              <button
                onClick={() => onOpenScopingModal('AsthaPay Technical Scoping')}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer pt-2 border-t border-white/5"
              >
                <span>Inquire for FinTech Engine</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: AsthaHost */}
            <div className="bg-[#0f172a]/80 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                    Cloud & Managed Hosting
                  </span>
                  <span className="text-xs text-slate-500 font-mono">99.99% SLA</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  AsthaHost Cloud Infrastructure
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Enterprise NVMe cloud hosting, distributed cPanel/Plesk environments, isolated staging sandboxes,
                  and 24/7 automated backup snapshots engineered for high-uptime portals.
                </p>
              </div>
              <button
                onClick={() => onOpenScopingModal('AsthaHost Technical Scoping')}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 cursor-pointer pt-2 border-t border-white/5"
              >
                <span>Inquire for Cloud Hosting</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>

        {/* 5. CALL TO ACTION STRIP */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-blue-900/60 via-[#0066ff]/20 to-blue-900/60 border border-blue-500/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Planning to build a Custom ERP, Rental Management, or Mobile App?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Get in touch with Asthasoft Technologies engineering pod. We provide preliminary architecture blueprints,
              transparent milestone estimates, and rapid MVP delivery timelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onOpenScopingModal('Our Work Banner - Request Scoping Session')}
              className="px-5 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Request a Scoping Session
            </button>
            {onRequestCall && (
              <button
                onClick={() => onRequestCall('Our Work - 30 Min Tech Consultation')}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer"
              >
                Talk to an Expert
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 6. FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={handleCloseLightbox}
          >
            <div
              className="relative max-w-6xl w-full bg-slate-950 rounded-2xl border border-white/20 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-blue-400" />
                  <span className="text-xs sm:text-sm font-bold text-white">
                    Asthasoft Works: JSD Car Rental & Fleet Operations ERP
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevLightbox}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Previous Screen"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextLightbox}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Next Screen"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCloseLightbox}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-600/80 text-slate-300 hover:text-white transition-colors cursor-pointer ml-2"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Image View */}
              <div className="overflow-auto p-2 sm:p-4 bg-slate-950 flex items-center justify-center flex-1">
                <img
                  src={lightboxImage}
                  alt="Car Rental Software Production Screen"
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-lg border border-slate-800"
                />
              </div>

              {/* Modal Footer Caption */}
              <div className="px-5 py-3 bg-slate-900/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
                <span>
                  Developed by <strong className="text-white">Asthasoft Technologies Private Limited</strong> for JSD Self-Drive Car Rental.
                </span>
                <span className="text-blue-400 font-mono text-[11px]">
                  Press Esc or click outside to dismiss
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
