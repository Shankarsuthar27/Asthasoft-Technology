import React from 'react';
import {
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Lock,
  FileCheck2,
  CalendarCheck,
  Users2,
  Sparkles,
} from 'lucide-react';

interface EngineeringProcessSectionProps {
  onOpenScopingModal: (source?: string) => void;
}

export const EngineeringProcessSection: React.FC<EngineeringProcessSectionProps> = ({
  onOpenScopingModal,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Architecture',
      timeline: 'Week 1 – 2',
      icon: <Compass className="w-5 h-5 text-[#0066ff]" />,
      description:
        'We define business objectives, technical requirements, cloud topology, and a milestone-based roadmap before writing code.',
      highlights: ['System architecture blueprint', 'Database & API specifications', 'Milestone sprint estimate'],
    },
    {
      number: '02',
      title: 'UI/UX Prototyping',
      timeline: 'Week 2 – 3',
      icon: <Palette className="w-5 h-5 text-[#0066ff]" />,
      description:
        'Our designers create interactive, clickable prototypes in Figma to validate user flows and interfaces with your team.',
      highlights: ['Clickable Figma prototype', 'Design system tokens', 'Multi-device responsive layouts'],
    },
    {
      number: '03',
      title: 'Agile Development',
      timeline: 'Sprint Cycles',
      icon: <Code2 className="w-5 h-5 text-[#0066ff]" />,
      description:
        'Engineers build modular, clean code in transparent 2-week sprints with working demo deployments delivered regularly.',
      highlights: ['Bi-weekly staging demos', 'Automated CI/CD pipelines', 'Direct Git repository access'],
    },
    {
      number: '04',
      title: 'QA & Security Testing',
      timeline: 'Pre-Launch',
      icon: <ShieldCheck className="w-5 h-5 text-[#0066ff]" />,
      description:
        'Comprehensive automated testing, penetration checks, and performance benchmarks ensure rock-solid stability.',
      highlights: ['Automated E2E test suites', 'OWASP security verification', 'High-concurrency stress testing'],
    },
    {
      number: '05',
      title: 'Launch & 24/7 SLA',
      timeline: 'Go-Live & Scale',
      icon: <Rocket className="w-5 h-5 text-[#0066ff]" />,
      description:
        'Zero-downtime production deployment backed by continuous monitoring, fast response times, and guaranteed SLA support.',
      highlights: ['Zero-downtime deployment', 'Centralized telemetry & alerts', 'Guaranteed 99.9% uptime SLA'],
    },
  ];

  const guarantees = [
    {
      icon: <Lock className="w-4 h-4 text-[#0066ff]" />,
      title: '100% IP Ownership',
      desc: 'All source code and assets are entirely yours.',
    },
    {
      icon: <FileCheck2 className="w-4 h-4 text-emerald-600" />,
      title: 'Strict Mutual NDA',
      desc: 'Signed confidentiality before technical review.',
    },
    {
      icon: <CalendarCheck className="w-4 h-4 text-amber-600" />,
      title: 'Bi-Weekly Demos',
      desc: 'Inspect real progress on staging every 14 days.',
    },
    {
      icon: <Users2 className="w-4 h-4 text-purple-600" />,
      title: 'Dedicated Senior Pod',
      desc: 'Direct Slack access to developers and leads.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc] font-body border-t border-slate-200/80">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs font-heading font-bold uppercase tracking-wider">
           
            <span>How We Work</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight">
            Our 5-Step <span className="text-[#0066ff]">Engineering Process</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            A transparent, predictable roadmap designed to take your idea from initial architecture to market-ready launch with zero surprises.
          </p>
        </div>

        {/* 5-Step Clean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-[#0066ff]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Header: Step Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#0066ff] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50/80 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                {/* Title & Timeline */}
                <h3 className="text-base font-heading font-bold text-slate-900 mb-1 leading-snug">
                  {step.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-500 block mb-3">
                  {step.timeline}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Bullet Highlights */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                {step.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0066ff] shrink-0 mt-0.5" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Clean Guarantees Bar & CTA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {guarantees.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${index !== 0 ? 'pt-4 sm:pt-0 sm:pl-5' : ''}`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-normal mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="text-xs sm:text-sm font-heading font-bold text-slate-900">
                Ready to plan your software roadmap?
              </p>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Book a 30-minute technical scoping call with our senior architects.
              </p>
            </div>
            <button
              onClick={() => onOpenScopingModal('Engineering Process Section')}
              className="px-5 py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Schedule Scoping Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
