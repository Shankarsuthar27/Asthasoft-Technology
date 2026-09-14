import React from 'react';
import { Mail } from 'lucide-react';
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandX,
} from '@tabler/icons-react';

export const TopGlobalBar: React.FC = () => {
  return (
    <div className="bg-[#09101d] border-b border-white/10 text-xs text-slate-300 relative z-50 font-body">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-9 gap-4 text-[11px] sm:text-xs">
          {/* Left: Direct Calling Numbers & Official Email */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 overflow-x-auto py-1 no-scrollbar">
            {/* Direct Line 1 */}
            <a
              href="tel:+917023318111"
              className="flex items-center gap-1.5 hover:text-brand-orange transition-colors group whitespace-nowrap"
              title="Direct Phone Line 1"
            >
              {/* India Flag SVG */}
              <svg className="w-4 h-3 rounded-[2px] shadow-sm shrink-0" viewBox="0 0 640 480">
                <path fill="#f93" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="40" fill="none" stroke="#008" strokeWidth="10"/>
              </svg>
              <span className="text-slate-300 font-medium">+91-7023318111</span>
            </a>

            <span className="text-white/20 hidden md:inline">|</span>

            {/* Direct Line 3 (Landline) */}
            <a
              href="tel:01169269401"
              className="hidden md:flex items-center gap-1.5 hover:text-brand-orange transition-colors group whitespace-nowrap"
              title="Delhi Landline"
            >
              <span className="text-slate-300 font-medium">011-69269401</span>
            </a>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* Official Sales Email */}
            <a
              href="mailto:sales@asthasoftindia.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-brand-orange transition-colors group whitespace-nowrap"
              title="Sales Enquiries"
            >
              <Mail className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-orange" />
              <span className="text-slate-300 font-medium">sales@asthasoftindia.com</span>
            </a>
          </div>

          {/* Center: Infinite Credentials Marquee */}
          <div className="hidden xl:flex flex-1 max-w-lg mx-4 overflow-hidden relative">
            <div className="marquee-track flex items-center gap-5 whitespace-nowrap text-[11px] font-medium text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <span>📍</span> Glitz cinema jalore, jalore , Rajasthan 343001
              </span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <span>🏆</span> CMMI Level 5 Certified
              </span>
              <span className="text-white/30">·</span>
              <span className="text-slate-200">ISO 27001 Certified</span>
              <span className="text-white/30">·</span>
              <span className="text-sky-400">500+ Enterprises Served Globally</span>
              <span className="text-white/30">·</span>
              <span className="text-slate-200">10+ Years of Engineering Excellence</span>
              <span className="text-white/30">·</span>
              {/* Duplicate track for seamless infinite marquee loop */}
              <span className="flex items-center gap-1 text-emerald-400">
                <span>📍</span> Glitz cinema jalore, jalore , Rajasthan 343001
              </span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1 text-amber-400">
                <span>🏆</span> CMMI Level 5 Certified
              </span>
              <span className="text-white/30">·</span>
              <span className="text-slate-200">ISO 27001 Certified</span>
              <span className="text-white/30">·</span>
              <span className="text-sky-400">500+ Enterprises Served Globally</span>
              <span className="text-white/30">·</span>
              <span className="text-slate-200">10+ Years of Engineering Excellence</span>
            </div>
          </div>

          {/* Right: Social Media Channels */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-5 h-5 rounded-[4px] bg-white/10 hover:bg-[#0066ff] hover:text-white flex items-center justify-center text-slate-300 transition-colors"
            >
              <IconBrandLinkedin size={12} stroke={2} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-5 h-5 rounded-[4px] bg-white/10 hover:bg-[#ff5421] hover:text-white flex items-center justify-center text-slate-300 transition-colors"
            >
              <IconBrandInstagram size={12} stroke={2} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-5 h-5 rounded-[4px] bg-white/10 hover:bg-[#0066ff] hover:text-white flex items-center justify-center text-slate-300 transition-colors"
            >
              <IconBrandFacebook size={12} stroke={2} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-5 h-5 rounded-[4px] bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-300 transition-colors"
            >
              <IconBrandYoutube size={12} stroke={2} />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-5 h-5 rounded-[4px] bg-white/10 hover:bg-white hover:text-black flex items-center justify-center text-slate-300 transition-colors"
            >
              <IconBrandX size={11} stroke={2} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
