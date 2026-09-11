import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface WhatWeDoShowcaseProps {
  onOpenScopingModal: (source?: string) => void;
}

export const WhatWeDoShowcase: React.FC<WhatWeDoShowcaseProps> = ({
  onOpenScopingModal,
}) => {
  const [activeTab, setActiveTab] = useState<'legacy' | 'ai' | 'cloud'>('legacy');

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#f4f7fb] font-body">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        {/* Section Header matching Image 3 */}
        <div className="max-w-3xl mb-8 sm:mb-12 space-y-2 sm:space-y-3">
          <span className="text-xs sm:text-sm font-heading font-extrabold text-[#0066ff] uppercase tracking-widest block">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            AI & Software Development Company that <span className="text-[#0066ff]">Thinks Like Your Business.</span>
          </h2>
        </div>

        {/* Feature Container Card with Blue Border matching Image 3 */}
        <div className="relative rounded-2xl sm:rounded-3xl border-2 border-[#0066ff]/20 bg-white shadow-2xl shadow-blue-500/5 p-5 sm:p-10 lg:p-12 overflow-hidden">
          {/* Top Pill Tab / Banner matching Image 3 */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-2xl sm:rounded-full bg-[#0066ff] text-white text-xs sm:text-sm font-heading font-bold shadow-md shadow-blue-500/30 text-left">
              <Zap className="w-4 h-4 text-amber-300 shrink-0" />
              <span>Hyperautomation & Enterprise Business Ecosystems</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-slate-900 leading-snug">
                Frictionless Legacy System Modernization
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Outdated enterprise systems work as bottlenecks to business growth, speed, and productivity. Ensuring high security and zero downtime, we lead high-stakes transitions of monolithic systems into agile, cloud-native environments.
              </p>

              {/* Checkmarks matching Image 3 */}
              <div className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Risk Mitigated Cloud Transition:</strong> We follow a stability-first methodology to ensure a <span className="font-semibold text-slate-900">zero-downtime</span> and <span className="font-semibold text-slate-900">zero data loss</span> migration from underperforming legacy to modernized cloud-native systems.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 text-[#0066ff] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Monoliths to Microservices Transition:</strong> We facilitate system infrastructure scale instantly and effortlessly with market demand by transitioning rigid monolithic systems to decoupled microservices.
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  onClick={() => onOpenScopingModal('What We Do Modernization Card')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full font-heading font-semibold text-xs sm:text-sm text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Modernize Your Infrastructure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Multi-Screen Dashboard Displays Mockup matching Image 3 */}
            <div className="lg:col-span-6 relative">
              {/* Pedestal Glow Base */}
              <div className="relative rounded-2xl bg-gradient-to-tr from-[#0b1324] via-[#0f1d38] to-[#070d1a] p-4 sm:p-8 border border-slate-700/60 shadow-2xl overflow-hidden">
                {/* Neon circular pedestal ring */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-80 h-28 rounded-full border-2 border-[#0066ff]/60 bg-blue-500/10 blur-[2px]" />

                {/* Dashboard Screen Mockup Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[10px] font-mono text-slate-400 ml-1 sm:ml-2">Asthasoft Cloud v5.4</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    NODES: 2,480
                  </span>
                </div>

                {/* Multi-screen Layout Mockup */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  {/* Main Large Display */}
                  <div className="col-span-1 sm:col-span-8 bg-[#09101f] rounded-xl p-3 sm:p-3.5 border border-blue-500/30 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold">
                      <span>Workload Ingestion</span>
                      <span className="text-[#38bdf8]">99.999% SLA</span>
                    </div>
                    {/* Simulated SVG Graph */}
                    <svg className="w-full h-20" viewBox="0 0 240 80">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0066ff" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#0066ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 60 Q 30 20, 60 45 T 120 25 T 180 40 T 240 10 L 240 80 L 0 80 Z"
                        fill="url(#chartGrad)"
                      />
                      <path
                        d="M0 60 Q 30 20, 60 45 T 120 25 T 180 40 T 240 10"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                      />
                    </svg>
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span>Latency: 4.8ms</span>
                      <span>Throughput: 84k req/s</span>
                    </div>
                  </div>

                  {/* Secondary Vertical Display */}
                  <div className="col-span-1 sm:col-span-4 bg-[#09101f] rounded-xl p-3 border border-white/10 space-y-2 flex flex-col justify-between">
                    <span className="text-[10px] font-semibold text-slate-300 block">Cluster Health</span>
                    <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-400 border-t-transparent animate-spin flex items-center justify-center text-[10px] font-bold text-white my-1">
                      100%
                    </div>
                    <span className="text-[9px] text-slate-400 block text-center">Zero Downtime</span>
                  </div>

                  {/* Bottom Horizontal Console Bar */}
                  <div className="col-span-1 sm:col-span-12 bg-[#09101f] rounded-xl p-3 border border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-ping" />
                      <span>K8s Cluster: Auto-Scaled</span>
                    </div>
                    <span className="text-emerald-400 font-bold">100% Migrated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
