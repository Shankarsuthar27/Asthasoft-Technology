import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Zap,
  TrendingUp,
  Smartphone,
  Star,
} from 'lucide-react';

interface CaseStudyShowcaseProps {
  onOpenScopingModal: (source?: string) => void;
}

interface CaseStudyData {
  id: string;
  category: string;
  title: string;
  scenario: string;
  solution: string;
  aiHighlights: string[];
  outcomes: {
    stat: string;
    label: string;
  }[];
  accentColor: string;
  mockupTitle: string;
}

const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'event-tech',
    category: 'EVENT TECH · CROSS-PLATFORM APP',
    title: 'A Niche Marketplace Built From Scratch That Drove 4x Engagement From Month 1',
    scenario:
      'An event management business (NDA-Protected) connects party organizers to entertainers, was facing chaotic workflows. The manual workflow was killing ROI.',
    solution:
      'To connect the event organizers with professional talent in real time, our team invented a cross-platform event networking application (NDA-protected) from scratch for the event management agency. The app automated the process and helped the business in digitalization.',
    aiHighlights: [
      'SMART RECOMMENDATION ENGINE',
      'BEHAVIORAL PATTERN ANALYSIS',
    ],
    outcomes: [
      { stat: '90%', label: 'Faster talent matchmaking' },
      { stat: '75%', label: 'Reduction in manual workflows' },
      { stat: '25%', label: 'Increase in repeat bookings' },
    ],
    accentColor: '#0066ff',
    mockupTitle: 'AI-Powered Event Networking Marketplace Platform',
  },
  {
    id: 'fintech',
    category: 'FINTECH · DIGITAL BANKING',
    title: 'Sub-Second Global Payment Rails & Smart Fraud Engine For Neo-Bank',
    scenario:
      'A cross-border neo-banking provider suffered from high reconciliation drop-offs, slow legacy clearing times, and elevated chargeback vulnerabilities.',
    solution:
      'Asthasoft engineered a distributed event-driven payment engine with PCI-DSS compliant vaulting, real-time AML scoring, and automated multicurrency settlement ledgers.',
    aiHighlights: [
      'ANOMALY DETECTION ML',
      'SUB-12MS LEDGER CLEARING',
    ],
    outcomes: [
      { stat: '99.99%', label: 'Payment processing uptime' },
      { stat: '68%', label: 'Drop in fraud false-positives' },
      { stat: '3.8x', label: 'Transaction volume growth' },
    ],
    accentColor: '#ff5421',
    mockupTitle: 'Autonomous High-Frequency Clearing & Ledger Console',
  },
  {
    id: 'healthcare',
    category: 'HEALTHCARE & TELEMEDICINE',
    title: 'HIPAA-Compliant Remote Diagnostics Suite Serving 1.2M Patients',
    scenario:
      'A hospital network needed an emergency telemedicine suite with seamless EHR sync, low-latency video streaming in rural zones, and zero patient data leaks.',
    solution:
      'Delivered an encrypted WebRTC consultation platform with automated clinical transcription, FHIR interoperability, and intelligent symptom triage pipelines.',
    aiHighlights: [
      'CLINICAL NLP SUMMARIZER',
      'ADAPTIVE WEBRTC ENCODING',
    ],
    outcomes: [
      { stat: '82%', label: 'Faster patient triage' },
      { stat: '100%', label: 'HIPAA & GDPR compliance' },
      { stat: '4.9★', label: 'Average patient satisfaction' },
    ],
    accentColor: '#059669',
    mockupTitle: 'NextGen Clinical Telehealth & Diagnostic Portal',
  },
];

export const CaseStudyShowcase: React.FC<CaseStudyShowcaseProps> = ({
  onOpenScopingModal,
}) => {
  const [activeTab, setActiveTab] = useState<string>('event-tech');
  const currentStudy =
    CASE_STUDIES.find((s) => s.id === activeTab) || CASE_STUDIES[0];

  return (
    <section id="case-study" className="py-12 sm:py-16 bg-[#f8fafc] border-y border-slate-200/80 font-body">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff6ff] text-[#0066ff] text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Proven Impact & Case Studies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight">
              Real Results From <span className="text-[#0066ff]">Asthasoft</span> Engineering Pods
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 max-w-full">
            {CASE_STUDIES.map((study) => {
              const isActive = study.id === activeTab;
              return (
                <button
                  key={study.id}
                  onClick={() => setActiveTab(study.id)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#0066ff] text-white shadow-md shadow-blue-500/25'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {study.id === 'event-tech'
                    ? 'Event Tech'
                    : study.id === 'fintech'
                    ? 'FinTech Rails'
                    : 'Healthcare & EHR'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Case Study Card matching Reference Screenshot */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-5 sm:p-8 lg:p-12 relative"
        >
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-[#0066ff] to-[#ff5421]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStudy.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Left Column: Case Narrative (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  {/* Category Pill Tag */}
                  <div className="text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#0066ff] mb-2">
                    {currentStudy.category}
                  </div>

                  {/* Main Headline */}
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#0066ff] tracking-tight leading-snug mb-4 sm:mb-6">
                    {currentStudy.title}
                  </h3>

                  {/* Scenario */}
                  <div className="mb-4 sm:mb-5">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0066ff] mb-1.5">
                      THE SCENARIO
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                      {currentStudy.scenario}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-5 sm:mb-6">
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0066ff] mb-1.5">
                      THE SOLUTION
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                      {currentStudy.solution}
                    </p>
                  </div>

                  {/* AI Highlights */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#0066ff] mb-2">
                      AI HIGHLIGHTS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStudy.aiHighlights.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg bg-[#eff6ff] text-[#0066ff] text-[10px] sm:text-[11px] font-bold tracking-wider border border-blue-100"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Call To Action */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={() =>
                      onOpenScopingModal(`Case Study - ${currentStudy.title}`)
                    }
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:gap-3 cursor-pointer"
                  >
                    <span>Engineer Similar Platform</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium justify-center sm:justify-start">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>NDA Protected · 90-Day Delivery</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Dark Showcase Card with Floating Mockups & Outcomes (5 cols) */}
              <div className="lg:col-span-5 bg-gradient-to-b from-[#091224] via-[#0b162c] to-[#060c18] rounded-2xl p-4 sm:p-7 text-white relative overflow-hidden border border-slate-800 shadow-2xl flex flex-col justify-between">
                {/* Background Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Mockup Header Bar */}
                <div className="relative z-10 mb-5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2.5 mb-4">
                    <div className="flex items-center gap-1.5 font-mono text-slate-300">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live Production</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500">Asthasoft Telemetry</span>
                  </div>

                  {/* Floating App Mockup Screens Area */}
                  <div className="space-y-3">
                    {/* Mockup Card 1: Talent / Service Match */}
                    <div className="bg-[#121d38]/90 border border-slate-700/80 rounded-xl p-3 sm:p-3.5 backdrop-blur-md shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#0066ff] text-white flex items-center justify-center text-xs font-black shrink-0">
                            AS
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-none">
                              Alex Rivera · DJ & Host
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              Verified Entertainer · 98% Match
                            </div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          Instant Book
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] bg-[#091224]/80 p-2 rounded-lg border border-slate-800">
                        <div>
                          <span className="text-slate-500 block">Response Time:</span>
                          <span className="text-slate-200 font-bold">&lt; 90 Seconds</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Escrow Security:</span>
                          <span className="text-emerald-400 font-bold">100% Guaranteed</span>
                        </div>
                      </div>
                    </div>

                    {/* Mockup Card 2: AI Dispatch & Recommendation */}
                    <div className="bg-[#121d38]/90 border border-slate-700/80 rounded-xl p-3 backdrop-blur-md shadow-lg">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-blue-400 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>AI Recommendation Engine</span>
                        </span>
                        <span className="text-[10px] text-slate-400">Autonomous</span>
                      </div>
                      <div className="mt-1.5 text-[11px] text-slate-300 leading-snug">
                        Synthesized 42 talent matches based on audience demographics, venue acoustics, and budget.
                      </div>
                    </div>
                  </div>
                </div>

                {/* THE OUTCOMES Section matching Reference Screenshot */}
                <div className="relative z-10 pt-3">
                  <div className="relative flex items-center justify-center my-3 sm:my-4">
                    <div className="border-t border-slate-700/70 w-full" />
                    <span className="px-3 text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase bg-[#091224] absolute">
                      THE OUTCOMES
                    </span>
                  </div>

                  {/* 3 Outcome Circles */}
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 text-center pt-1 sm:pt-2">
                    {currentStudy.outcomes.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#0066ff] bg-[#0066ff]/15 flex items-center justify-center shadow-lg shadow-blue-500/20 group hover:scale-105 transition-transform">
                          <span className="text-sm xs:text-base sm:text-2xl font-black text-white tracking-tight">
                            {item.stat}
                          </span>
                        </div>
                        <p className="text-[9px] sm:text-[11px] text-slate-300 font-medium text-center mt-1 sm:mt-2 leading-snug">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
