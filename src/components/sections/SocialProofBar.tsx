import React from 'react';
import { Award, ShieldCheck, Star, Cloud } from 'lucide-react';

export const SocialProofBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-100 py-6 font-body">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-between gap-4 md:gap-6 text-slate-600 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">CMMI Level 5</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Certified</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">ISO 27001</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Compliant</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-[#0066ff] shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">AWS & Cloud</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Partner</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">4.9 / 5 Rating</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Clutch</span>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-2 pt-1 md:pt-0">
            <span className="text-base">🚀</span>
            <span className="font-semibold text-slate-800">500+ Deployments Worldwide</span>
          </div>
        </div>
      </div>
    </div>
  );
};
