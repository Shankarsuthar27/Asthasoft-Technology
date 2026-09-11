import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Palette,
  Sparkles,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Cpu,
  Layers,
  Shield,
  Zap,
} from 'lucide-react';
import { IconRenderer } from '../ui/IconRenderer';

interface ServicesShowcaseProps {
  onOpenScopingModal: (source?: string) => void;
  onRequestCall: (context?: string) => void;
}

const CATEGORIES = [
  { id: 'build', label: 'Build & Engineer', icon: 'code-2', desc: 'Full-cycle custom development & AI engines' },
  { id: 'cloud', label: 'Managed Cloud & IT', icon: 'server', desc: 'High-availability infrastructure & DevOps' },
  { id: 'design', label: 'Design & Web Systems', icon: 'palette', desc: 'Design systems & enterprise web portals' },
];

const SERVICES_DATA = {
  build: [
    {
      id: 'ai-development',
      title: 'AI Product Development',
      badge: 'High Demand',
      desc: 'Architect fine-tuned LLMs, enterprise RAG pipelines, autonomous agentic workflows, and predictive machine learning models with zero data leakage.',
      tech: ['PyTorch', 'LangChain', 'LlamaIndex', 'Ollama', 'FastAPI'],
      metrics: '40% Avg Process Automation',
      icon: 'brain-circuit',
      highlight: true,
    },
    {
      id: 'custom-software',
      title: 'Custom Enterprise Software',
      badge: 'Core Service',
      desc: 'Bespoke high-concurrency enterprise applications, core ERPs, and microservice architectures built for extreme transaction resilience.',
      tech: ['Java / Spring', 'Go', 'Node.js', 'PostgreSQL', 'Kafka'],
      metrics: '99.999% Fault-Tolerant Uptime',
      icon: 'layers',
    },
    {
      id: 'mobile-apps',
      title: 'Mobile App Engineering',
      badge: 'iOS & Android',
      desc: 'Native and cross-platform mobile solutions featuring offline-first sync, cryptographic local storage, and sub-100ms UI render times.',
      tech: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'SQLite'],
      metrics: '4.8+ Avg App Store Rating',
      icon: 'smartphone',
    },
    {
      id: 'blockchain-web3',
      title: 'Blockchain & Smart Contracts',
      desc: 'Security-audited smart contracts, layer-1/2 protocols, automated market makers, and institutional digital asset custody solutions.',
      tech: ['Solidity', 'Rust', 'EVM', 'Hardhat', 'Web3.js'],
      metrics: '$80M+ Audited TVL Secured',
      icon: 'shield',
    },
    {
      id: 'saas-platforms',
      title: 'SaaS Multi-Tenant Platforms',
      desc: 'Turnkey SaaS engines with isolated tenant schemas, automated stripe meter billing, granular role permissions, and global edge CDNs.',
      tech: ['Next.js', 'Node.js', 'Stripe', 'Redis', 'Docker'],
      metrics: '<8 Weeks MVP Acceleration',
      icon: 'zap',
    },
    {
      id: 'mvp-rapid-engineering',
      title: 'MVP Rapid Engineering',
      desc: 'Transform early product specifications into venture-backed production code in 6 to 12 weeks with production-ready scalability.',
      tech: ['TypeScript', 'Tailwind', 'Supabase', 'Vite', 'AWS'],
      metrics: 'Seed-Ready Architecture',
      icon: 'sparkles',
    },
  ],
  cloud: [
    {
      id: 'cloud-engineering',
      title: 'Cloud Modernization & Migration',
      badge: 'AWS / GCP / Azure',
      desc: 'Lift, shift, and refactor legacy on-prem infrastructure into autoscaling, serverless, containerized Kubernetes microservices.',
      tech: ['AWS ECS/EKS', 'GCP GKE', 'Terraform', 'Vault'],
      metrics: '35% Infrastructure Cost Reduction',
      icon: 'server',
      highlight: true,
    },
    {
      id: 'devops-automation',
      title: 'DevOps & GitOps CI/CD',
      desc: 'End-to-end continuous integration pipelines with automated security fuzzing, semantic versioning, and zero-downtime blue/green rollouts.',
      tech: ['GitHub Actions', 'ArgoCD', 'Docker', 'Kubernetes'],
      metrics: '15 Min Deployment Cycle',
      icon: 'cpu',
    },
    {
      id: 'it-ops-secops',
      title: '24/7 SecOps & SRE Monitoring',
      desc: 'Follow-the-sun continuous monitoring, SOC 2 compliance governance, automated vulnerability remediation, and active threat response.',
      tech: ['Datadog', 'Prometheus', 'Grafana', 'PagerDuty'],
      metrics: '<5 Min Incident Response SLA',
      icon: 'shield-check',
    },
    {
      id: 'dedicated-pods',
      title: 'Dedicated Senior Engineering Pods',
      badge: 'Scale in 48h',
      desc: 'Pre-vetted, elite full-stack pods (Architect, Senior SDEs, QA, DevOps) working natively in your time zone and Jira workflow.',
      tech: ['Full-Stack', 'Agile / Scrum', 'Dedicated Lead'],
      metrics: 'Zero Onboarding Overhead',
      icon: 'users',
      highlight: true,
    },
  ],
  design: [
    {
      id: 'ui-ux-strategy',
      title: 'UI/UX Product Architecture',
      badge: 'Enterprise UX',
      desc: 'Empirical user research, conversion wireframing, high-fidelity interactive Figma prototypes, and validated cognitive workflows.',
      tech: ['Figma', 'Protopie', 'UserTesting', 'Design Thinking'],
      metrics: '+65% Task Completion Speed',
      icon: 'palette',
      highlight: true,
    },
    {
      id: 'enterprise-web',
      title: 'Enterprise Web Systems',
      desc: 'High-performance headless web applications optimized for perfect Core Web Vitals, dynamic server caching, and internationalization.',
      tech: ['React 18+', 'Vite', 'Next.js', 'Tailwind CSS'],
      metrics: '99+ Google Lighthouse Score',
      icon: 'globe',
    },
    {
      id: 'accessible-design-systems',
      title: 'Design Systems & WCAG 2.1 AA',
      desc: 'Tokenized multi-brand component libraries and token architectures ensuring compliance with Americans with Disabilities Act (ADA) and WCAG.',
      tech: ['Radix UI', 'Storybook', 'Tailwind', 'Aria'],
      metrics: '100% Accessibility Compliance',
      icon: 'check-circle-2',
    },
  ],
};

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({
  onOpenScopingModal,
  onRequestCall,
}) => {
  const [activeTab, setActiveTab] = useState<'build' | 'cloud' | 'design'>('build');

  return (
    <section id="services" className="py-20 lg:py-28 relative font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-tight">
              Engineering What's Next in <span className="text-gradient-orange">Software & AI</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              From autonomous agentic workflows to enterprise microservices, our senior engineering pods deliver end-to-end technical excellence.
            </p>
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => onOpenScopingModal('Services Section Header')}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
          >
            <span>Request Custom Architecture</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-dark-card border border-white/10 max-w-2xl mb-10 overflow-x-auto">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[170px] py-3 px-4 rounded-xl text-xs sm:text-sm font-heading font-semibold flex items-center justify-center gap-2.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-brand-orange to-brand-orange-bright text-white shadow-lg shadow-brand-orange/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <IconRenderer name={tab.icon} className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES_DATA[activeTab].map((service) => (
              <div
                key={service.id}
                className={`rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 group hover:-translate-y-1.5 ${
                  service.highlight
                    ? 'bg-gradient-to-b from-dark-surface to-dark-card border-brand-orange/40 shadow-xl shadow-brand-orange/5'
                    : 'bg-dark-card/90 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-brand-orange/20 border border-white/10 group-hover:border-brand-orange/40 text-brand-orange flex items-center justify-center transition-colors">
                      <IconRenderer name={service.icon} className="w-6 h-6" />
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-orange transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Outcome Metric & Direct Contextual Action */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{service.metrics}</span>
                  </div>

                  {/* Contextual "Call in 30 Min" button */}
                  <button
                    onClick={() => onRequestCall(`${service.title} Consultation`)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-brand-orange hover:text-white text-slate-300 transition-colors"
                    title={`Request Instant 30-Min SDE Call for ${service.title}`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
