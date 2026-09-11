import React from 'react';
import { ShieldCheck, Award, Star, CheckCircle, Cloud } from 'lucide-react';

const CREDENTIALS = [
  {
    name: 'CMMI Maturity Level 5',
    category: 'Highest Software Capability',
    icon: '🏆',
    highlight: true,
  },
  {
    name: 'ISO/IEC 27001:2022',
    category: 'Information Security Certified',
    icon: '🛡️',
  },
  {
    name: 'ISO 9001:2015',
    category: 'Quality Management System',
    icon: '✓',
  },
  {
    name: 'AWS Advanced Tier Partner',
    category: 'Cloud Architecture & Migration',
    icon: '☁️',
  },
  {
    name: 'Google Cloud Premier Partner',
    category: 'AI / ML & Infrastructure',
    icon: '⚡',
  },
  {
    name: 'Microsoft Solutions Partner',
    category: 'Azure & Enterprise Apps',
    icon: '❖',
  },
  {
    name: 'Clutch Global Leader (4.9 / 5)',
    category: '140+ Verified Enterprise Reviews',
    icon: '★',
    highlight: true,
  },
  {
    name: 'SOC 2 Type II Audited',
    category: 'Enterprise Data Governance',
    icon: '🔒',
  },
];

export const CredentialsTicker: React.FC = () => {
  return (
    <div className="py-8 bg-dark-charcoal/80 border-y border-white/5 relative overflow-hidden font-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-orange" />
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-slate-300">
            Certified Security, Cloud & Quality Standards
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <CheckCircle className="w-3 h-3" /> 100% Audit Cleared
          </span>
          <span>·</span>
          <span>Zero Vendor Lock-In</span>
          <span>·</span>
          <span>Guaranteed Code Escrow</span>
        </div>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="relative w-full overflow-hidden">
        <div className="marquee-track flex items-center gap-4 py-2">
          {CREDENTIALS.concat(CREDENTIALS).map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all shrink-0 ${
                item.highlight
                  ? 'bg-brand-orange/10 border-brand-orange/40 text-white shadow-lg shadow-brand-orange/10'
                  : 'bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <div>
                <span className="font-heading font-bold text-xs block text-white">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
