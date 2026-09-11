import React from 'react';
import { motion } from 'framer-motion';
import { Check, Wrench, Sun, Calendar } from 'lucide-react';

interface HeroProps {
  onOpenScopingModal: (source?: string) => void;
  onRequestCall: (context?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenScopingModal,
}) => {
  const industries = [
    'Healthcare',
    'Business and Workflow Automation',
    'Ed-Tech',
    'Retail',
    'IOT',
    'Real Estate',
  ];

  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] bg-[#0c1222] text-white overflow-hidden py-12 sm:py-16 lg:py-20 font-jakarta flex items-center">
      {/* Deep Space / Cyber Equalizer Background Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Radial Ambient Blue Glow behind UI Cluster */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-br from-[#0066ff]/20 via-[#0044bb]/10 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0044bb]/15 rounded-full blur-3xl" />

        {/* Vertical Equalizer Telemetry Bars in Background matching reference */}
        <div className="absolute bottom-0 right-0 left-1/3 h-72 opacity-25 flex items-end justify-around gap-1 px-8">
          {[
            35, 60, 45, 80, 55, 90, 70, 40, 65, 85, 95, 50, 75, 110, 85, 60,
            130, 95, 70, 105, 120, 80, 65, 140, 100, 75, 90, 115, 60, 80, 120, 90
          ].map((height, i) => (
            <div
              key={i}
              className="w-1 rounded-t-full bg-gradient-to-t from-transparent via-[#0066ff]/40 to-[#38bdf8]/80 transition-all duration-1000"
              style={{
                height: `${height}px`,
                opacity: 0.3 + (i % 5) * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ========================================================
              LEFT COLUMN: Main Headline & CTA matching screenshot
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6 text-left"
          >
            {/* Main Headline in Plus Jakarta Sans */}
            <div>
              <h1 className="hero-title-light text-white">
                Custom Software
              </h1>
              <h2 className="hero-title-bold text-white">
                Development Firm
              </h2>
            </div>

            {/* Paragraph Subtitle in Plus Jakarta Sans */}
            <p className="hero-description">
              Add a technical edge to your business with our offshore software development services. We use state-of-the-art technologies to transform your software idea into a winning product.
            </p>

            {/* Primary Action Button in Plus Jakarta Sans */}
            <div className="pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => onOpenScopingModal('Hero CTA - Requirements')}
                className="cta-button bg-white text-[#0c1222] hover:bg-slate-100 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-blue-500/10 active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center border border-white/80"
              >
                Let&apos;s Discuss Your Requirements
              </button>
            </div>
          </motion.div>

          {/* ========================================================
              RIGHT COLUMN: Layered Futuristic UI Dashboard Cluster
             ======================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="lg:col-span-6 xl:col-span-6 relative w-full flex justify-center lg:justify-end"
          >
            {/* Scale wrapper for responsive presentation on phones/tablets */}
            <div className="relative w-full max-w-[560px] h-[390px] xs:h-[460px] sm:h-[530px] flex items-center justify-center select-none origin-center sm:origin-right scale-[0.70] min-[370px]:scale-[0.80] xs:scale-[0.92] sm:scale-100">
              
              {/* 1. Top-Left Floating Cyan/Blue Wave Metric Card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 sm:top-6 left-2 sm:left-4 z-20 w-32 sm:w-36 h-28 sm:h-32 bg-[#0062eb] rounded-2xl p-3.5 shadow-2xl border border-blue-400/40 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
                  <span className="text-[10px] font-mono text-blue-100 font-semibold">98.4%</span>
                </div>

                {/* Smooth Wavy Line with Indicator Slider */}
                <div className="relative h-12 flex items-center justify-between">
                  <svg className="w-20 h-10 overflow-visible" viewBox="0 0 80 40">
                    <path
                      d="M 0 30 Q 20 5, 40 25 T 80 10"
                      fill="none"
                      stroke="#facc15"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="80" cy="10" r="3" fill="#facc15" />
                  </svg>

                  {/* Vertical Capsule Slider Pill with Dot */}
                  <div className="w-4 h-12 bg-white/30 backdrop-blur-sm rounded-full flex flex-col items-center justify-center p-0.5 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 shadow-md" />
                  </div>
                </div>

                {/* Day Markers */}
                <div className="flex justify-between text-[8px] font-mono text-blue-200/80 tracking-tighter">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                </div>
              </motion.div>

              {/* 2. Central Main Dashboard: Split Dark Mode / Light Mode */}
              <div className="relative w-[92%] sm:w-[480px] h-[310px] sm:h-[340px] bg-[#091122] rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden flex z-10">
                
                {/* --- Left Half: Dark Mode UI (56%) --- */}
                <div className="w-[56%] h-full p-4 sm:p-5 flex flex-col justify-between border-r border-slate-700/70 bg-gradient-to-b from-[#091122] to-[#070c18] relative">
                  
                  {/* Monthly points line preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Telemetry
                      </span>
                      <span className="text-slate-500">Q3 Active</span>
                    </div>

                    <div className="h-14 w-full relative flex items-center">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 160 50">
                        <path
                          d="M 0 38 Q 40 10, 80 30 T 160 8"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                        />
                        <circle cx="80" cy="30" r="3" fill="#38bdf8" />
                        <circle cx="160" cy="8" r="3.5" fill="#60a5fa" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom metrics: Circular Donut Ring & Vertical Bar Graph */}
                  <div className="grid grid-cols-2 gap-2 pt-2 items-end">
                    {/* Donut Gauge */}
                    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#0e172c]/80 border border-slate-800">
                      <div className="relative w-12 h-12 flex items-center justify-center">
                        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-slate-800"
                            strokeWidth="3.5"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                          <path
                            className="text-[#38bdf8]"
                            strokeDasharray="72, 100"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-bold text-slate-200">72%</span>
                      </div>
                      <span className="text-[8px] font-mono text-slate-400 mt-1">Efficiency</span>
                    </div>

                    {/* Equalizer Vertical Bars */}
                    <div className="flex items-end justify-center gap-1.5 h-16 p-2 rounded-xl bg-[#0e172c]/80 border border-slate-800">
                      {[35, 55, 75, 95, 65].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-t-sm bg-gradient-to-t from-[#0066ff] to-[#38bdf8]"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Team member avatar row */}
                  <div className="flex items-center gap-2 pt-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 border border-white/20 flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                      S
                    </div>
                    <div className="h-1.5 w-16 bg-slate-800 rounded-full" />
                  </div>
                </div>

                {/* Glowing Sun/Moon Mode Switcher on Divider */}
                <div className="absolute left-[56%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <div className="w-7 h-7 rounded-full bg-[#0066ff] text-white flex items-center justify-center shadow-lg shadow-blue-500/50 border-2 border-[#091122]">
                    <div className="flex items-center text-[10px]">
                      <Sun className="w-3 h-3 text-amber-200" />
                    </div>
                  </div>
                </div>

                {/* --- Right Half: Light Mode UI (44%) --- */}
                <div className="w-[44%] h-full p-4 sm:p-5 flex flex-col justify-between bg-[#f1f5f9] text-slate-800">
                  <div className="space-y-3 pt-1">
                    {/* Header mock */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-2 bg-slate-300 rounded-full" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>

                    {/* User profile list items matching screenshot */}
                    <div className="space-y-2.5">
                      {/* Item 1 */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-500 border border-white flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                          A
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="w-16 h-1.5 bg-slate-300 rounded-full" />
                          <div className="w-10 h-1 bg-slate-200 rounded-full" />
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#f58634] border border-white flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                          R
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="w-20 h-1.5 bg-slate-300 rounded-full" />
                          <div className="w-12 h-1 bg-slate-200 rounded-full" />
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-600 border border-white flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                          M
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="w-14 h-1.5 bg-slate-300 rounded-full" />
                          <div className="w-8 h-1 bg-slate-200 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-[#0066ff] rounded-full" />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-slate-400">
                      <span>Sync</span>
                      <span className="text-[#0066ff] font-bold">100%</span>
                    </div>
                  </div>
                </div>

                {/* Attached Right Floating Tab: 'Book an Appointment' */}
                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Hero Floating Tab - Book Appointment')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0066ff] hover:bg-[#0052cc] text-white px-3 sm:px-4 py-2.5 rounded-l-md font-semibold text-xs sm:text-sm shadow-xl flex items-center gap-1.5 cursor-pointer z-30 transition-transform hover:-translate-x-1 group border-y border-l border-blue-300/30"
                  aria-label="Book an Appointment"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book an Appointment</span>
                </button>
              </div>

              {/* 3. Bottom-Left Card: 'Production status 256' */}
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 sm:bottom-0 left-0 sm:left-2 z-20 w-52 sm:w-60 bg-[#09101d]/95 backdrop-blur-md rounded-xl border border-slate-700/60 p-3.5 shadow-2xl space-y-3"
              >
                {/* Header with tool icon & 256 */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs font-mono font-medium">
                    <Wrench className="w-3.5 h-3.5 text-slate-400" />
                    <span>Production status</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-200">256</span>
                </div>

                {/* Equalizer visualization */}
                <div className="flex items-end justify-between gap-1 h-8 pt-1">
                  {[40, 65, 80, 50, 90, 70, 85, 45, 95, 60].map((bar, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-slate-700 to-[#38bdf8]"
                      style={{ height: `${bar}%` }}
                    />
                  ))}
                </div>

                {/* Connected Architecture Mini-Cards with Cyber Cable */}
                <div className="relative pt-1 flex items-center gap-3">
                  {/* Mini Window Card 1 */}
                  <div className="bg-slate-100 rounded-lg p-2 border border-slate-300 shadow-md w-28 space-y-1">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="h-1 w-16 bg-slate-300 rounded" />
                    <div className="h-1 w-10 bg-slate-200 rounded" />
                  </div>

                  {/* Cable Node */}
                  <div className="w-3.5 h-3.5 rounded-full bg-[#0066ff] border-2 border-slate-900 shadow-md flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                </div>
              </motion.div>

              {/* 4. Bottom-Right Card: Industry Domains Checklist */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-6 sm:-bottom-2 right-0 sm:right-2 z-20 w-52 sm:w-60 bg-[#091122]/95 backdrop-blur-md rounded-xl border border-blue-900/40 p-3.5 shadow-2xl space-y-2"
              >
                <div className="space-y-2">
                  {industries.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-[#0066ff] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
