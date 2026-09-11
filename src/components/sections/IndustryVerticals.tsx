import React from 'react';
import {
  Stethoscope,
  Landmark,
  Building2,
  Truck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface IndustryVerticalsProps {
  onOpenScopingModal: (source?: string) => void;
}

const INDUSTRIES = [
  {
    id: 'healthcare',
    title: 'Healthcare & Telemedicine',
    badge: 'HIPAA & HITECH Certified',
    icon: Stethoscope,
    tagline: 'Empowering digital health systems with sub-second telemedicine, IoMT telemetry, and AI diagnosis assistance.',
    useCases: [
      'FHIR / HL7 EHR & EMR Interoperability',
      'Encrypted WebRTC Virtual Consultation Suites',
      'Remote Patient Monitoring (RPM) Device Sync',
      'Medical Image DICOM Viewer & AI Segmentation',
    ],
    highlight: true,
  },
  {
    id: 'fintech',
    title: 'Banking & Neo-Banking',
    badge: 'PCI-DSS Level 1 Compliant',
    icon: Landmark,
    tagline: 'High-throughput core transaction ledgers, digital onboarding eKYC, and automated AML anomaly detection.',
    useCases: [
      'Sub-50ms Payment Rails (FedNow, SEPA, UPI)',
      'Multi-Currency Digital Wallets & Virtual Cards',
      'Machine Learning Anti-Fraud Scoring Engines',
      'Automated Commercial Lending Underwriting',
    ],
  },
  {
    id: 'proptech',
    title: 'PropTech & Real Estate Systems',
    badge: 'Smart Property Systems',
    icon: Building2,
    tagline: 'Next-generation asset management, automated lease contracts, IoT building telemetry, and virtual tours.',
    useCases: [
      'Smart Tenant & Resident Engagement Apps',
      'Automated Commercial Lease Billing & Escrow',
      '3D Digital Twin & BIM Spatial Integrations',
      'Automated Property Valuation Algorithms (AVM)',
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    badge: 'Real-Time IoT Telemetry',
    icon: Truck,
    tagline: 'Optimizing global supply chains with automated route dispatching, freight broker TMS, and cold-chain sensing.',
    useCases: [
      'Autonomous Driver Route Optimization',
      'Cold-Chain Temperature Sensor Streaming',
      'Electronic Bill of Lading (eBOL) Verification',
      'Cross-Dock Warehouse Management Systems',
    ],
  },
];

export const IndustryVerticals: React.FC<IndustryVerticalsProps> = ({
  onOpenScopingModal,
}) => {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-dark-pure/80 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Regulated Industry Expertise</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            Engineered for <span className="text-gradient-orange">High-Stakes Compliance</span> & Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            We understand the stringent regulatory, security, and audit burdens of mission-critical sectors. Every line of code conforms to industry governance standards.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((ind) => {
            const IconComp = ind.icon;
            return (
              <div
                key={ind.id}
                className={`rounded-3xl p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                  ind.highlight
                    ? 'bg-gradient-to-br from-dark-surface to-dark-card border-brand-orange/40 shadow-2xl shadow-brand-orange/5'
                    : 'bg-dark-card border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-colors shadow-lg">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                      {ind.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-brand-orange transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {ind.tagline}
                    </p>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {ind.useCases.map((uc) => (
                      <div key={uc} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{uc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Dedicated Compliance SLA</span>
                  <button
                    onClick={() => onOpenScopingModal(`Industry Scoping: ${ind.title}`)}
                    className="text-xs font-bold text-brand-orange hover:text-brand-orange-bright flex items-center gap-1 group/btn"
                  >
                    <span>Request Industry Whitepaper</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
