import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Server,
  Smartphone,
  Cloud,
  Database,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { TechLogo } from '../ui/TechLogo';

interface TechStackSectionProps {
  onOpenScopingModal?: (source?: string) => void;
  onOpenCallModal?: (context?: string) => void;
}

interface TechCategory {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TechItem {
  name: string;
  category: string;
  tag: string;
  description?: string;
}

const TECH_CATEGORIES: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend & Web',
    subtitle: 'Responsive, lightning-fast web applications',
    icon: Code2,
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    subtitle: 'High-throughput microservices and secure APIs',
    icon: Server,
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    subtitle: 'Native and cross-platform iOS & Android',
    icon: Smartphone,
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    subtitle: 'Scalable infrastructure with automated CI/CD',
    icon: Cloud,
  },
  {
    id: 'database',
    name: 'Databases & Storage',
    subtitle: 'ACID-compliant relational & high-scale NoSQL',
    icon: Database,
  },
  {
    id: 'ai',
    name: 'AI & Data Engineering',
    subtitle: 'LLMs, intelligent agents, and neural pipelines',
    icon: BrainCircuit,
  },
];

const TECH_ITEMS: TechItem[] = [
  // Frontend
  { name: 'React.js', category: 'frontend', tag: 'UI Framework', description: 'Component-driven interactive web interfaces' },
  { name: 'Next.js', category: 'frontend', tag: 'Full-Stack React', description: 'SSR, SSG, and edge-rendered performance' },
  { name: 'TypeScript', category: 'frontend', tag: 'Typed JavaScript', description: 'Type-safe enterprise software architecture' },
  { name: 'Vue.js', category: 'frontend', tag: 'Progressive UI', description: 'Reactive, modular frontend experiences' },
  { name: 'Tailwind CSS', category: 'frontend', tag: 'Design Systems', description: 'Modern, utility-first rapid interface styling' },

  // Backend
  { name: 'Node.js', category: 'backend', tag: 'High Concurrency', description: 'Event-driven, asynchronous I/O runtime' },
  { name: 'Python', category: 'backend', tag: 'Backend & AI', description: 'Enterprise APIs, Django, FastAPI & data engines' },
  { name: 'Java / Spring', category: 'backend', tag: 'Enterprise Grade', description: 'Mission-critical distributed architectures' },
  { name: '.NET Core', category: 'backend', tag: 'Robust Microservices', description: 'High-performance C# enterprise solutions' },
  { name: 'Go (Golang)', category: 'backend', tag: 'Ultra Low Latency', description: 'Distributed systems & sub-millisecond networking' },
  { name: 'PHP / Laravel', category: 'backend', tag: 'Rapid Web Apps', description: 'Elegant MVC architectures and RESTful platforms' },

  // Mobile
  { name: 'Flutter', category: 'mobile', tag: 'Cross-Platform', description: 'Single codebase for iOS, Android & web' },
  { name: 'React Native', category: 'mobile', tag: 'Native Performance', description: 'Native rendering with shared JavaScript logic' },
  { name: 'Swift (iOS)', category: 'mobile', tag: 'Apple Native', description: 'High-performance native iOS & iPadOS apps' },
  { name: 'Kotlin (Android)', category: 'mobile', tag: 'Google Native', description: 'Modern, safe native Android application engineering' },

  // Cloud & DevOps
  { name: 'AWS Cloud', category: 'cloud', tag: 'Cloud Platform', description: 'EC2, ECS, Lambda, S3, RDS & multi-zone VPCs' },
  { name: 'Google Cloud (GCP)', category: 'cloud', tag: 'Cloud Infrastructure', description: 'Kubernetes Engine, BigQuery, and AI vertexes' },
  { name: 'Docker', category: 'cloud', tag: 'Containerization', description: 'Portable, predictable application environments' },
  { name: 'Kubernetes', category: 'cloud', tag: 'Orchestration', description: 'Automated container scaling and zero-downtime rollouts' },
  { name: 'Terraform', category: 'cloud', tag: 'Infrastructure as Code', description: 'Declarative, automated cloud provisioning' },
  { name: 'CI/CD Pipelines', category: 'cloud', tag: 'Automated Delivery', description: 'GitHub Actions, automated test suites & blue/green deploys' },

  // Databases
  { name: 'PostgreSQL', category: 'database', tag: 'Relational DB', description: 'Extensible, ACID-compliant enterprise database' },
  { name: 'MySQL', category: 'database', tag: 'High-Volume Relational', description: 'Proven transactional speed & scalability' },
  { name: 'MongoDB', category: 'database', tag: 'Document NoSQL', description: 'Flexible JSON schema for dynamic data models' },
  { name: 'Redis', category: 'database', tag: 'In-Memory Cache', description: 'Sub-millisecond latency data caching & pub/sub' },
  { name: 'Elasticsearch', category: 'database', tag: 'Distributed Search', description: 'Instant full-text search & real-time analytics' },
  { name: 'Firebase', category: 'database', tag: 'Realtime Backend', description: 'Realtime database, authentication & cloud functions' },

  // AI & Data
  { name: 'OpenAI API', category: 'ai', tag: 'Generative Intelligence', description: 'GPT-4o, reasoning models & assistant APIs' },
  { name: 'LangChain / RAG', category: 'ai', tag: 'LLM Orchestration', description: 'Contextual retrieval and enterprise knowledge graphs' },
  { name: 'PyTorch / TF', category: 'ai', tag: 'Deep Learning', description: 'Custom neural networks & predictive ML training' },
  { name: 'AI Chatbots', category: 'ai', tag: 'Autonomous Virtual Agents', description: 'Multilingual conversational customer support pods' },
];

export const TechStackSection: React.FC<TechStackSectionProps> = ({
  onOpenScopingModal,
  onOpenCallModal,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('frontend');

  const activeCategory =
    TECH_CATEGORIES.find((cat) => cat.id === selectedCategoryId) || TECH_CATEGORIES[0];

  const filteredItems = TECH_ITEMS.filter(
    (item) => item.category === selectedCategoryId
  );

  return (
    <section id="tech-stack" className="py-16 sm:py-24 bg-white border-y border-slate-200/90 font-body relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-50/70 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-indigo-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
            We Follow A Powerful, Standard, & Reliable Technology Stack
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We architect custom digital platforms on battle-tested, high-performance modern frameworks with active developer ecosystems, zero vendor lock-in, and rock-solid enterprise LTS support.
          </p>
        </div>

        {/* Layout: Left Category Tabs + Right Tech Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vertical Category Tabs */}
          <div className="lg:col-span-4 bg-[#f8fafc] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs space-y-2">
            <div className="px-3 pt-1 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Technology Domains
              </span>
            </div>

            <div className="space-y-1.5">
              {TECH_CATEGORIES.map((cat) => {
                const CatIcon = cat.icon;
                const isActive = cat.id === selectedCategoryId;
                const count = TECH_ITEMS.filter((i) => i.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-[#0066ff] text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-700 hover:bg-white hover:text-slate-900 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white text-[#0066ff] border border-slate-200 group-hover:border-blue-200'
                        }`}
                      >
                        <CatIcon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-sm leading-tight">{cat.name}</div>
                        <div
                          className={`text-[11px] truncate mt-0.5 ${
                            isActive ? 'text-blue-100' : 'text-slate-400'
                          }`}
                        >
                          {cat.subtitle}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/70 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Architecture Advisory CTA Box */}
            <div className="pt-4 mt-3 border-t border-slate-200/80 px-2 space-y-2.5">
              <div className="text-xs font-semibold text-slate-600 leading-snug">
                Unsure which stack fits your scalability requirements?
              </div>
              <button
                type="button"
                onClick={() => onOpenScopingModal?.('Home Tech Stack Section')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Consult our Tech Lead</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Grid of Tech Cards */}
          <div className="lg:col-span-8 bg-[#f8fafc] rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-xs min-h-[440px] flex flex-col justify-between">
            <div>
              {/* Category Header Inside Content Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-200/80">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066ff] block mb-1">
                    Selected Stack Domain
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {activeCategory.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Production-Grade LTS Supported</span>
                </div>
              </div>

              {/* Grid of Tech Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <AnimatePresence mode="wait">
                  {filteredItems.map((tech) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group cursor-default"
                    >
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 group-hover:scale-110 transition-transform">
                          <TechLogo name={tech.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 text-sm group-hover:text-[#0066ff] transition-colors leading-tight">
                            {tech.name}
                          </div>
                          <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {tech.tag}
                          </span>
                        </div>
                      </div>

                      {tech.description && (
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {tech.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Value Banner */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Code & Intellectual Property Handover with zero recurring license fees.</span>
              </div>
              {onOpenCallModal && (
                <button
                  type="button"
                  onClick={() => onOpenCallModal('Home Tech Stack Quick Call')}
                  className="font-bold text-[#0066ff] hover:underline cursor-pointer shrink-0"
                >
                  Request Technical Architecture Call →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
