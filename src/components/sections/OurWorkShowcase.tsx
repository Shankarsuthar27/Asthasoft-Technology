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
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { navigateTo } from '../../utils/navigation';

interface OurWorkShowcaseProps {
  onOpenScopingModal: (source?: string) => void;
}

const FEATURED_TABS = [
  {
    id: 'dashboard',
    label: 'Fleet Operations Dashboard',
    tag: 'Live Telematics & Dispatch',
    image: '/works/car-rental-dashboard.png',
    title: 'Real-Time Fleet Status & Dispatch Control',
    description:
      'Live vehicle availability counters, branch assignment filters (Jalore Main Branch), and instant one-click customer allocation.',
    features: [
      'Real-time vehicle status indicators (Total: 3, Available: 0, Running: 2, Unavailable: 1)',
      'Branch-aware dispatch engine with date & time precision scheduling',
      'Quick action shortcuts: "Assign Car", "+ Add Car", "Add Customer"',
    ],
  },
  {
    id: 'fleet',
    label: 'Vehicle Inventory & Lifecycle',
    tag: 'Fleet Asset Engine',
    image: '/works/car-rental-fleet.png',
    title: 'Fleet Database & Plate Management',
    description:
      'Complete vehicle asset tracking with model years, live registration plates (RJ16, RJ18, RJ12), and active rental status tags.',
    features: [
      'Visual vehicle cards with live availability badges (RENTED, INACTIVE)',
      'Granular search by make, model, registration #, and vehicle category',
      'One-click fleet registration and dynamic rental rate management',
    ],
  },
  {
    id: 'booking',
    label: 'Smart Billing & Dispatch',
    tag: 'Automated 18% GST Engine',
    image: '/works/car-rental-booking.png',
    title: 'Automated Billing & Digital Agreement',
    description:
      'Automated rental pricing calculator with starting odometer logging, refundable security deposit tally (₹10,000), Zero-Dep insurance, and 18% GST tax.',
    features: [
      'Zero-Dep insurance (+₹499) and chauffeur driver (+₹1000/day) add-on selection',
      'Real-time automated billing breakdown with refundable deposit protection',
      'Instant digital assignment confirmation linking car directly to customer DL profile',
    ],
  },
];

export const OurWorkShowcase: React.FC<OurWorkShowcaseProps> = ({
  onOpenScopingModal,
}) => {
  const [activeTabId, setActiveTabId] = useState('dashboard');

  const activeTab =
    FEATURED_TABS.find((t) => t.id === activeTabId) || FEATURED_TABS[0];

  return (
    <section id="our-work" className="py-16 sm:py-24 bg-[#0a0f1d] relative overflow-hidden border-t border-white/10 font-body">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#38bdf8] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Asthasoft Client Deliveries</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Featured Work:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] via-[#38bdf8] to-cyan-300">
                Car Rental & Fleet Operations ERP
              </span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 mt-2 max-w-2xl leading-relaxed">
              See how Asthasoft engineered a bespoke digital operations system for JSD Car Rental — eliminating double-bookings, automating 18% GST invoices, and managing fleet availability in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('/our-work')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-xs sm:text-sm border border-white/10 shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>View All Work & Case Studies</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
            </button>
          </div>
        </div>

        {/* Featured Showcase Card */}
        <div className="rounded-3xl bg-[#10192e] border border-white/10 p-5 sm:p-8 shadow-2xl relative">
          {/* Top Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-[#070b14] rounded-2xl border border-white/5 max-w-fit">
            {FEATURED_TABS.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0066ff] text-white shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Screenshot & Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Real Screenshot View */}
            <div className="lg:col-span-7">
              <div
                onClick={() => navigateTo('/our-work')}
                className="group relative rounded-2xl overflow-hidden border border-white/15 bg-[#090e1a] shadow-2xl cursor-pointer"
                title="Click to view interactive case study"
              >
                <div className="absolute top-3 left-3 z-20">
                  <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/10">
                    {activeTab.tag}
                  </span>
                </div>

                <img
                  src={activeTab.image}
                  alt={activeTab.title}
                  className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Explore interactive case study page
                  </span>
                  <span className="text-xs font-bold text-[#38bdf8] flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Features & Outcomes */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div>
                <span className="text-xs font-mono text-[#38bdf8] uppercase tracking-wider block mb-1">
                  Engineered by Asthasoft Technologies
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-tight">
                  {activeTab.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeTab.description}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-2.5">
                {activeTab.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200 leading-snug">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigateTo('/our-work')}
                  className="px-5 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Home Our Work Section CTA')}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-semibold border border-white/10 active:scale-95 transition-all cursor-pointer"
                >
                  Schedule Free Scoping Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
