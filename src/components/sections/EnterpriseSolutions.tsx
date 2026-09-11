import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Smartphone,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Code,
} from 'lucide-react';
import { IconRenderer } from '../ui/IconRenderer';

interface EnterpriseSolutionsProps {
  onOpenScopingModal: (source?: string) => void;
}

const SOLUTION_TABS = [
  { id: 'business', label: 'Business Operations', icon: 'briefcase', count: 6 },
  { id: 'customer', label: 'Customer-Facing Apps', icon: 'smartphone', count: 5 },
  { id: 'industry', label: 'Industry Platforms', icon: 'layers', count: 5 },
];

const SOLUTIONS_DATA = {
  business: [
    {
      name: 'Enterprise HRMS & Payroll Core',
      tagline: 'Automated attendance, tax compliance, performance KPIs, and multi-currency payroll.',
      features: ['Automated Tax Deductions', 'Biometric & Geo-Fencing', 'Employee Self-Service App'],
      delivery: 'Ready in 3-4 Weeks',
      badge: 'Turnkey Base',
    },
    {
      name: 'Real-Time Field Fleet & Employee Tracking',
      tagline: 'High-frequency GPS dispatching, automated route optimization, and geofence alerts.',
      features: ['Live Telemetry Map', 'Offline Signal Recovery', 'Kilometer Reimbursement Audit'],
      delivery: 'Ready in 2-3 Weeks',
    },
    {
      name: 'Omnichannel CRM & Pipeline Intelligence',
      tagline: 'Customer 360 view, AI conversation scoring, email sequencer, and deal forecasting.',
      features: ['WhatsApp & Email Sync', 'Automated Lead Routing', 'AI Meeting Summarizer'],
      delivery: 'Ready in 3-4 Weeks',
    },
    {
      name: 'SLA-Driven Service Desk & Helpdesk',
      tagline: 'Multi-tier ticketing engine, automated escalation rules, and customer CSAT surveys.',
      features: ['Omnichannel Intake', 'Automated SLA Timers', 'Generative AI Ticket Deflection'],
      delivery: 'Ready in 2 Weeks',
    },
    {
      name: 'Warehouse & Inventory ERP Engine',
      tagline: 'Real-time multi-depot stock sync, barcode scanning, purchase orders, and supplier portal.',
      features: ['FIFO / LIFO Costing', 'Automated Low-Stock Alerts', 'Batch & Expiry Management'],
      delivery: 'Ready in 4 Weeks',
    },
    {
      name: 'Higher Ed & Campus ERP System',
      tagline: 'End-to-end digital university administration, admissions, fees, and examination controller.',
      features: ['Online Fee Payment Gateway', 'Transcript Generation', 'Parent Mobile Portal'],
      delivery: 'Ready in 4-6 Weeks',
    },
  ],
  customer: [
    {
      name: 'On-Demand Multi-Restaurant Food Delivery',
      tagline: 'Triple-app ecosystem (Customer, Restaurant Partner, Driver) with live map tracking.',
      features: ['Dynamic Surge Commission', 'Driver Auto-Dispatch', 'In-App Payment Split'],
      delivery: 'Ready in 3-4 Weeks',
      badge: 'Most Popular',
    },
    {
      name: 'Ride-Hailing & Taxi Dispatch Platform',
      tagline: 'Uber-grade routing algorithms, pooled rides, emergency SOS, and driver earnings dashboard.',
      features: ['Surge Pricing Algorithms', 'Driver Payout Ledger', 'Multi-Language UI'],
      delivery: 'Ready in 4 Weeks',
    },
    {
      name: 'On-Demand Home & Professional Services',
      tagline: 'Book plumbers, electricians, or cleaners with hourly or fixed upfront pricing.',
      features: ['Service Provider KYC', 'Real-Time Job Scheduling', 'Escrow Escrow Release'],
      delivery: 'Ready in 3 Weeks',
    },
    {
      name: 'Multi-Vendor Enterprise Marketplace',
      tagline: 'Amazon-scale marketplace with vendor onboarding, automated commission, and review engine.',
      features: ['Vendor Merchant Dashboard', 'Multi-Warehouse Shipping', 'Sub-Account Payouts'],
      delivery: 'Ready in 4-6 Weeks',
      badge: 'Enterprise Grade',
    },
    {
      name: 'Hyperlocal 10-Min Quick Commerce',
      tagline: 'Dark-store picker applications, route clustering, and sub-second inventory decrement.',
      features: ['Picker App with Barcode', 'Micro-Fulfillment Logic', 'Real-Time Stock Lock'],
      delivery: 'Ready in 3-4 Weeks',
    },
  ],
  industry: [
    {
      name: 'Adaptive AI-Powered LMS & EdTech Platform',
      tagline: 'Interactive course builder, live WebRTC video classes, automated proctoring, and certificate generator.',
      features: ['SCORM & xAPI Compliant', 'Anti-Cheating Proctoring', 'Interactive Code Sandbox'],
      delivery: 'Ready in 4 Weeks',
      badge: 'AI Powered',
    },
    {
      name: 'Digital Neo-Banking & FinTech Core',
      tagline: 'PCI-DSS certified ledger engine, virtual debit cards, IBAN generation, and instant payment rails.',
      features: ['Multi-Currency Ledger', 'Automated eKYC / AML Checks', 'Virtual Visa/Mastercard'],
      delivery: 'Ready in 6-8 Weeks',
      badge: 'PCI-DSS',
    },
    {
      name: 'Micro-Lending & Instant Underwriting Engine',
      tagline: 'Alternative credit scoring algorithms, loan origination, e-signatures, and auto-disbursal.',
      features: ['Bank Statement Parsing', 'Automated Nach / Mandate', 'Collection Cadence Bot'],
      delivery: 'Ready in 4-6 Weeks',
    },
    {
      name: 'Global Flight, Hotel & Travel Booking Portal',
      tagline: 'Direct GDS aggregation (Amadeus / Sabre / Galileo), dynamic markup rules, and voucher issuing.',
      features: ['Real-Time PNR Generation', 'Markup & Commission Engine', 'Multi-Currency Settlement'],
      delivery: 'Ready in 4-5 Weeks',
    },
    {
      name: 'White-Label B2B Reseller Portal Engine',
      tagline: 'Multi-tenant architecture allowing downstream partners to brand, price, and sell your services.',
      features: ['Custom Domain / CNAME', 'Sub-Billing & Wallet Ledger', 'White-Label Mobile Apps'],
      delivery: 'Ready in 3-4 Weeks',
    },
  ],
};

export const EnterpriseSolutions: React.FC<EnterpriseSolutionsProps> = ({
  onOpenScopingModal,
}) => {
  const [activeTab, setActiveTab] = useState<'business' | 'customer' | 'industry'>('business');

  return (
    <section id="solutions" className="py-20 lg:py-28 bg-dark-pure/60 border-t border-white/5 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey Enterprise Accelerators</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            Battle-Tested <span className="text-gradient-orange">Solution Engines</span> Ready for Customization
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Skip 6+ months of boilerplate development. Deploy production-grade platforms with 100% intellectual property transfer, bespoke UI/UX, and zero recurring royalty fees.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-dark-card border border-white/10 overflow-x-auto max-w-full">
            {SOLUTION_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-5 rounded-xl text-xs sm:text-sm font-heading font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brand-orange to-brand-orange-bright text-white shadow-lg shadow-brand-orange/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconRenderer name={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Solutions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SOLUTIONS_DATA[activeTab].map((sol) => (
              <div
                key={sol.name}
                className="rounded-2xl p-6 bg-dark-card border border-white/10 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded font-semibold">
                      {sol.delivery}
                    </span>
                    {sol.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {sol.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-heading font-bold text-white group-hover:text-brand-orange transition-colors">
                    {sol.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sol.tagline}
                  </p>

                  {/* Checklist */}
                  <div className="space-y-1.5 pt-2 border-t border-white/5">
                    {sol.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    100% Source Code Transfer
                  </span>
                  <button
                    onClick={() => onOpenScopingModal(`Solution Demo: ${sol.name}`)}
                    className="text-xs font-bold text-brand-orange hover:text-brand-orange-bright flex items-center gap-1 group/btn"
                  >
                    <span>Request Demo & Scope</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-dark-surface via-dark-card to-dark-surface border border-brand-orange/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-heading font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Need a custom architecture not listed here?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our Senior Solutions Architects will construct a customized technical proposal and budget within 24 hours.
            </p>
          </div>

          <button
            onClick={() => onOpenScopingModal('Custom Architecture Banner')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-bright text-white font-heading font-semibold text-xs sm:text-sm shadow-xl shadow-brand-orange/20 hover:brightness-110 active:scale-95 transition-all whitespace-nowrap"
          >
            Talk to Solutions Architect
          </button>
        </div>
      </div>
    </section>
  );
};
