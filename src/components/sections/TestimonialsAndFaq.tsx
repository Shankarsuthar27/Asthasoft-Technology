import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  HelpCircle,
  Quote,
  CheckCircle2,
} from 'lucide-react';

interface TestimonialsAndFaqProps {
  onOpenScopingModal: (source?: string) => void;
}

const TESTIMONIALS = [
  {
    author: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'QuantVenture Financials (New York)',
    rating: 5,
    verified: 'Verified Clutch Review',
    quote:
      'Asthasoft re-engineered our core trading execution engine in 10 weeks flat. We went from periodic latency spikes to sub-15ms deterministic processing. Their senior architects operate at a level far above typical agencies.',
  },
  {
    author: 'Dr. Evelyn Chen',
    role: 'VP of Product Engineering',
    company: 'SynapseBio AI (Boston)',
    rating: 5,
    verified: 'Verified GoodFirms Review',
    quote:
      'Deploying private LLMs inside a strictly governed HIPAA VPC is notoriously hard. Asthasoft accomplished it with zero third-party API dependencies. The code quality, documentation, and security hygiene were impeccable.',
  },
  {
    author: 'Tariq Al-Mansoor',
    role: 'Founder & Managing Director',
    company: 'HyperRoute Logistics (Dubai)',
    rating: 5,
    verified: 'Verified Clutch Review',
    quote:
      'Their follow-the-sun model gave us seamless engineering velocity. Over 45,000 drivers in the UAE rely on the mobile dispatch app Asthasoft engineered. We secured our Series B shortly after launch.',
  },
];

const FAQS = [
  {
    q: 'How do you guarantee 100% IP ownership and confidential NDA protection?',
    a: 'Prior to any code discovery or technical scoping, we execute a mutual, binding Non-Disclosure Agreement (NDA). All source code, Git repositories, architectural schemas, and model weights developed during the engagement are transferred entirely to your organization with full intellectual property assignment.',
  },
  {
    q: 'How fast can a senior engineering pod be mobilized?',
    a: 'For dedicated engineering pods (Lead Architect, Senior Full-Stack Engineers, QA Automation, and DevOps), we can onboard and integrate into your existing Slack, Jira, and GitHub workflows within 48 to 72 hours.',
  },
  {
    q: 'How do you structure timezone overlap for US, UK, and Middle East clients?',
    a: 'We operate a Follow-the-Sun delivery framework with regional engineering hubs in California (PST/EST), Dubai (GST), and India (IST). We guarantee a minimum of 4 to 6 hours of real-time operational overlap every single business day.',
  },
  {
    q: 'What engagement models do you offer for enterprise software & AI?',
    a: 'We offer three flexible models: (1) Dedicated Engineering Pods for continuous product velocity, (2) Fixed-Scope Milestone Engagements with guaranteed deliverables and timeline SLAs, and (3) Strategic Architectural Consulting & Security Audits.',
  },
  {
    q: 'Can you deploy generative AI models on our private on-prem or VPC servers?',
    a: 'Absolutely. We specialize in sovereign AI engineering. We fine-tune and quantize open-weight models (such as LLaMA 3, Mistral, and Qwen) deployed exclusively within your private AWS, GCP, Azure VPC, or air-gapped on-premise GPU clusters, ensuring zero third-party data egress.',
  },
];

export const TestimonialsAndFaq: React.FC<TestimonialsAndFaqProps> = ({
  onOpenScopingModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-dark-pure/60 border-t border-white/5 font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-brand-orange" />
            <span>Client Endorsements & Ratings</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
            Trusted by <span className="text-gradient-orange">CTOs & Product Leaders</span> Worldwide
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read verified reviews from enterprise technology leaders who partnered with Asthasoft for mission-critical software engineering.
          </p>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="rounded-3xl p-6 sm:p-8 bg-dark-card border border-white/10 hover:border-brand-orange/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {t.verified}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-brand-orange/30" />

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="font-heading font-bold text-sm text-white">
                  {t.author}
                </h4>
                <p className="text-xs text-brand-orange font-medium">
                  {t.role}
                </p>
                <p className="text-[11px] text-slate-400">
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-10">
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Enterprise Engagement FAQ</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Clear answers regarding security, compliance, code transfer, and engineering operations.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/10 bg-dark-card overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-heading font-semibold text-white hover:text-brand-orange transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-orange shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
            <p className="text-xs sm:text-sm text-slate-300">
              Have a specific technical constraint, RFP, or security questionnaire?
            </p>
            <button
              onClick={() => onOpenScopingModal('FAQ Section Footer')}
              className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-bright text-white font-semibold text-xs transition-colors"
            >
              Consult with Security & Compliance Officer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
