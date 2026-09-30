import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface TestimonialsShowcaseProps {
  onOpenScopingModal: (source?: string) => void;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatarInitials: string;
  avatarBg: string;
  rating: number;
  industry: string;
  project: string;
  quote: string;
  impactMetric: string;
  impactLabel: string;
}

export const TestimonialsShowcase: React.FC<TestimonialsShowcaseProps> = ({
  onOpenScopingModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'fintech' | 'health' | 'saas'>('all');

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      company: 'FinScale Payments',
      location: 'London, UK',
      avatarInitials: 'MV',
      avatarBg: 'bg-blue-600',
      rating: 5,
      industry: 'fintech',
      project: 'Core Payment Rails & Microservices',
      quote:
        'Asthasoft re-engineered our core payment rails and transactional microservices from scratch. Their team scaled our throughput to over 150k daily active users with 99.99% uptime. They do not just write code; they act as proactive engineering partners.',
      impactMetric: '+340%',
      impactLabel: 'Transaction throughput speed',
    },
    {
      id: '2',
      name: 'Dr. Aris Thorne',
      role: 'Founder & CEO',
      company: 'MediSync Telehealth',
      location: 'San Francisco, USA',
      avatarInitials: 'AT',
      avatarBg: 'bg-emerald-600',
      rating: 5,
      industry: 'health',
      project: 'HIPAA-Compliant Patient Portal',
      quote:
        'Building a HIPAA-compliant diagnostic platform with complex EHR integrations seemed daunting until Asthasoft stepped in. They delivered on schedule with immaculate code quality, full test coverage, and a smooth, human-centric patient UX.',
      impactMetric: '100%',
      impactLabel: 'HIPAA & SOC-2 compliance',
    },
    {
      id: '3',
      name: 'Elena Rostova',
      role: 'VP of Technology',
      company: 'NexaCorp Enterprise',
      location: 'Toronto, Canada',
      avatarInitials: 'ER',
      avatarBg: 'bg-purple-600',
      rating: 5,
      industry: 'saas',
      project: 'Legacy Monolith to Cloud Modernization',
      quote:
        'Their senior engineering pod migrated our 10-year-old monolithic CRM to a modern serverless cloud infrastructure in under 4 months. Our monthly hosting costs dropped by 45% while our feature delivery velocity tripled.',
      impactMetric: '-45%',
      impactLabel: 'Server and cloud costs',
    },
    {
      id: '4',
      name: 'Kavita Patel',
      role: 'Co-Founder & COO',
      company: 'EventPulse Marketplace',
      location: 'Mumbai & Singapore',
      avatarInitials: 'KP',
      avatarBg: 'bg-amber-600',
      rating: 5,
      industry: 'saas',
      project: 'Cross-Platform AI Mobile Marketplace',
      quote:
        'Asthasoft delivered our iOS, Android, and web apps with an integrated AI talent-matching engine in just 90 days. Their bi-weekly sprint demos kept our executive team completely aligned throughout the build.',
      impactMetric: '4.2x',
      impactLabel: 'User engagement in Month 1',
    },
  ];

  const filteredTestimonials =
    filter === 'all'
      ? testimonials
      : testimonials.filter((t) => t.industry === filter);

  return (
    <section className="py-14 sm:py-20 bg-white font-body border-t border-slate-200/80">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs font-heading font-bold uppercase tracking-wider">
              
              <span>Verified Client Success</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-slate-900 tracking-tight">
              Trusted by <span className="text-[#0066ff]">Founders & CTOs</span> Worldwide
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Direct feedback from technical leaders and business founders who scaled their software products with Asthasoft.
            </p>
          </div>

          {/* Filter Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none shrink-0">
            {[
              { label: 'All Reviews', value: 'all' },
              { label: 'FinTech', value: 'fintech' },
              { label: 'Healthcare', value: 'health' },
              { label: 'Enterprise SaaS', value: 'saas' },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => setFilter(btn.value as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all cursor-pointer whitespace-nowrap ${
                  filter === btn.value
                    ? 'bg-[#0066ff] text-white shadow-sm shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#f8fafc] rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-[#0066ff]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Stars + Project Tag */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                    {t.project}
                  </span>
                </div>

                {/* Quote Content */}
                <div className="relative mb-5">
                  <Quote className="w-6 h-6 text-slate-300 mb-2 opacity-70" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
                    "{t.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom Row: Client Info + Measurable Impact Box */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${t.avatarBg} text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                  >
                    {t.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900 leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {t.role} · <span className="font-medium text-slate-700">{t.company}</span>
                    </p>
                    <span className="text-[10px] text-slate-400 block">
                      {t.location}
                    </span>
                  </div>
                </div>

                {/* Impact Metric Badge */}
                <div className="bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 shrink-0 text-left sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1 text-[#0066ff] font-heading font-extrabold text-sm sm:text-base">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{t.impactMetric}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium block">
                    {t.impactLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating Metrics & Scoping CTA Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left w-full lg:w-auto">
              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-amber-400">
                  4.9 / 5.0
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Clutch Verified</span>
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-white">
                  250+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Shipped Projects
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-emerald-400">
                  99.4%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  On-Time Delivery
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-heading font-black text-sky-400">
                  12+ Years
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Engineering Track
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="shrink-0 w-full sm:w-auto text-center">
              <button
                onClick={() => onOpenScopingModal('Testimonials Showcase Strip')}
                className="w-full sm:w-auto px-6 py-3 rounded-full font-heading font-semibold text-xs sm:text-sm text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-md shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Partner With Asthasoft</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
