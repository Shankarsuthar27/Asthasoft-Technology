import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Users,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface MetricsAndCaseStudiesProps {
  onOpenScopingModal: (source?: string) => void;
}

const METRICS = [
  {
    val: '$120M+',
    label: 'Client Enterprise Value Created',
    desc: 'Across early-stage seed through Series D portfolio partners.',
  },
  {
    val: '99.999%',
    label: 'Mission-Critical Cloud SLA',
    desc: 'Zero unplanned downtime across 500+ active production clusters.',
  },
  {
    val: '+340%',
    label: 'Average Process Acceleration',
    desc: 'Through autonomous AI agent integration & workflow automation.',
  },
  {
    val: '< 4 Hours',
    label: 'Rapid Preliminary Scoping SLA',
    desc: 'Fastest technical scoping turnaround in enterprise IT consulting.',
  },
];

const CASE_STUDIES = [
  {
    title: 'FinTech Neo-Bank Core Architecture Overhaul',
    client: 'Tier-1 Digital Bank (London & NYC)',
    impact: 'Sub-12ms Transaction Settling · 2.4M Active Accounts',
    description:
      'Re-engineered legacy Java monolithic core into event-driven Go microservices running on AWS EKS with zero transaction failure during peak Black Friday load.',
    tags: ['Go', 'Kafka', 'AWS EKS', 'PostgreSQL', 'PCI-DSS'],
  },
  {
    title: 'Autonomous Telemedicine & Clinical Diagnostics Engine',
    client: 'Global Health Network (Dubai & Singapore)',
    impact: '4.8x Triage Speed · 1.2M Annual Virtual Consultations',
    description:
      'Engineered an encrypted WebRTC consultation suite with real-time AI transcription, FHIR medical records synchronization, and automated ICD-10 coding.',
    tags: ['React', 'WebRTC', 'Python', 'FHIR', 'HIPAA'],
  },
  {
    title: 'AI Multi-Agent Fleet Dispatch & Route Optimization',
    client: 'Cross-Border Freight Logistics (North America)',
    impact: '22% Fuel Cost Reduction · 45,000 Daily Dispatches',
    description:
      'Built a distributed route optimization engine utilizing combinatorial solvers, dynamic traffic heuristics, and automated digital bill of lading smart contracts.',
    tags: ['Python', 'FastAPI', 'Rust', 'Docker', 'IoT Streaming'],
  },
];

export const MetricsAndCaseStudies: React.FC<MetricsAndCaseStudiesProps> = ({
  onOpenScopingModal,
}) => {
  return (
    <section className="py-20 lg:py-28 relative font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Numbers Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="p-6 rounded-3xl bg-dark-card border border-white/10 hover:border-brand-orange/40 transition-colors"
            >
              <div className="font-heading font-black text-3xl sm:text-4xl text-gradient-orange mb-2">
                {m.val}
              </div>
              <div className="font-heading font-bold text-sm text-white mb-1">
                {m.label}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Case Studies Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Proven Engineering Impact</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Real-World <span className="text-gradient-orange">Case Studies</span> & Architecture Blueprints
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              Discover how our elite engineering pods solve complex computational challenges for high-growth enterprises worldwide.
            </p>
          </div>

          <button
            onClick={() => onOpenScopingModal('Case Studies View All')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
          >
            <span>Request Full Portfolio Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
          </button>
        </div>

        {/* Case Studies Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.title}
              className="rounded-3xl p-6 sm:p-7 bg-dark-card border border-white/10 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 shadow-xl"
            >
              <div className="space-y-3">
                <div className="text-[11px] font-mono text-brand-orange font-semibold">
                  {cs.client}
                </div>
                <h3 className="font-heading font-bold text-lg text-white group-hover:text-brand-orange transition-colors leading-snug">
                  {cs.title}
                </h3>
                <div className="inline-block p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  {cs.impact}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {cs.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenScopingModal(`Case Study: ${cs.title}`)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Explore Architecture Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
