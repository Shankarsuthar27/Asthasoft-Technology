import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  Sparkles,
  Bot,
  Zap,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

interface AISpotlightProps {
  onOpenScopingModal: (source?: string) => void;
}

const AI_PILLARS = [
  {
    id: 'agents',
    title: 'Autonomous Agentic Workflows',
    icon: 'bot',
    badge: 'LangGraph & AutoGen',
    description:
      'We build goal-directed AI agent swarms capable of complex multi-step reasoning, external API tool usage, code execution, and autonomous decision loops.',
    capabilities: [
      'Self-healing code and automated task execution',
      'Dynamic multi-agent consensus validation',
      'Human-in-the-loop intervention safeguards',
    ],
  },
  {
    id: 'rag',
    title: 'Enterprise RAG & Hybrid Retrieval',
    icon: 'database',
    badge: 'Zero Hallucinations',
    description:
      'Multi-modal vector indexing paired with dense BM25 sparse retrieval and cross-encoder re-ranking to unlock deep enterprise knowledge with strict source citation.',
    capabilities: [
      'Sub-15ms semantic search latency',
      'Document chunking with context-aware metadata',
      'Granular document-level RBAC access control',
    ],
  },
  {
    id: 'finetuning',
    title: 'Private LLM Fine-Tuning & Quantization',
    icon: 'cpu',
    badge: 'On-Prem / VPC',
    description:
      'Train, align (RLHF/DPO), and quantize state-of-the-art open models (Llama-3, DeepSeek, Mistral) on your proprietary datasets inside your private cloud boundary.',
    capabilities: [
      '100% data sovereignty & zero third-party leakage',
      '4-bit / 8-bit quantization for 70% lower inference cost',
      'Continuous synthetic dataset distillation',
    ],
  },
  {
    id: 'vision',
    title: 'Multi-Modal Computer Vision & Edge AI',
    icon: 'sparkles',
    badge: 'Edge Acceleration',
    description:
      'Deploy real-time visual inspection, defect detection, OCR document ingestion, and spatial AI pipelines accelerated on edge TPU/GPU hardware.',
    capabilities: [
      'Real-time 60fps video stream telemetry',
      'Edge TensorRT and ONNX runtime optimization',
      'Industrial IoT safety compliance triggers',
    ],
  },
];

export const AISpotlight: React.FC<AISpotlightProps> = ({ onOpenScopingModal }) => {
  const [selectedPillar, setSelectedPillar] = useState(AI_PILLARS[0]);

  return (
    <section id="services-ai" className="py-20 lg:py-28 relative font-body overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-brand-orange/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enterprise AI Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight leading-tight">
              Deploy <span className="text-gradient-orange">Autonomous AI Systems</span> with Sovereign Privacy
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Transform unstructured business knowledge into high-precision autonomous agents. We engineer production-grade LLM architectures backed by deterministic unit tests and security guardrails.
            </p>
          </div>

          <button
            onClick={() => onOpenScopingModal('AI Spotlight Header CTA')}
            className="self-start lg:self-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-bright hover:from-brand-orange-bright hover:to-orange-500 text-white font-heading font-bold text-xs sm:text-sm shadow-xl shadow-brand-orange/25 flex items-center gap-2 transition-all"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Schedule AI Feasibility Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {AI_PILLARS.map((pillar) => {
            const isSelected = selectedPillar.id === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-dark-surface to-dark-card border-brand-orange shadow-xl shadow-brand-orange/15 scale-[1.02]'
                    : 'bg-dark-card/90 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-brand-orange text-white'
                          : 'bg-white/5 text-brand-orange'
                      }`}
                    >
                      <BrainCircuit className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-brand-orange' : 'text-slate-400'}>
                    {isSelected ? 'Active Architecture' : 'View Blueprint'}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isSelected ? 'translate-x-1 text-brand-orange' : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Architecture Deep Dive Console */}
        <div className="rounded-3xl p-6 sm:p-8 bg-dark-card border border-white/15 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-orange">
                <Terminal className="w-4 h-4" />
                <span>ACTIVE DEPLOYMENT BLUEPRINT: {selectedPillar.title.toUpperCase()}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                Deterministic Output, Zero Hallucinations, 100% Client VPC Isolation
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedPillar.description}
              </p>

              <div className="space-y-2 pt-2">
                {selectedPillar.capabilities.map((cap) => (
                  <div key={cap} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => onOpenScopingModal(`AI Blueprint: ${selectedPillar.title}`)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-bright text-white font-heading font-semibold text-xs shadow-lg shadow-brand-orange/20 hover:brightness-110"
                >
                  Deploy This Architecture
                </button>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Confidential Data Handling SLA</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Code / Benchmark Card */}
            <div className="lg:col-span-5 bg-dark-pure rounded-2xl p-5 border border-white/10 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-slate-400">
                <span className="text-brand-orange font-bold">benchmark_telemetry.py</span>
                <span>Latency: 11.4ms</span>
              </div>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <p className="text-slate-400"># Initializing sovereign agent swarm</p>
                <p>
                  <span className="text-purple-400">from</span> asthasoft_core <span className="text-purple-400">import</span> NeuralCluster
                </p>
                <p>
                  cluster = NeuralCluster(mode=<span className="text-amber-300">"zero_leakage"</span>)
                </p>
                <p>
                  cluster.load_adapters(domain=<span className="text-emerald-300">"enterprise_knowledge"</span>)
                </p>
                <p className="text-emerald-400">
                  ✓ Vector Embeddings: 100% Ingested
                </p>
                <p className="text-emerald-400">
                  ✓ Semantic Accuracy: 99.4% F1-Score
                </p>
                <p className="text-brand-orange">
                  ✓ Guardrails Active: PII Scrubbed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
