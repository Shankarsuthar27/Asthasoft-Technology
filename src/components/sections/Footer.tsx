import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandX,
} from '@tabler/icons-react';

interface FooterProps {
  onOpenScopingModal: (source?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScopingModal }) => {
  return (
    <footer className="bg-[#09101d] border-t border-white/10 text-slate-300 font-body pt-12 sm:pt-14 pb-20 sm:pb-14">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10 sm:mb-12">
          {/* Col 1: Brand */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 select-none">
              <img
                src="/logo.png"
                alt="Asthasoft Technologies Pvt. Ltd."
                className="h-11 sm:h-12 w-11 sm:w-12 object-contain rounded-full shadow-md bg-white p-0.5 shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center brand-text">
                  <span className="font-bold text-lg text-white">
                    ASTHA
                  </span>
                  <span className="font-bold text-lg text-[#0066ff]">
                    SOFT
                  </span>
                  <span className="text-[#0066ff] text-[9px] font-bold self-start mt-0.5 ml-0.5">®</span>
                </div>
                <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400">
                  Technologies Pvt. Ltd.
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Asthasoft Technologies Pvt. Ltd. — Enterprise AI Systems, Custom Software, and Cloud Infrastructure Engineering.
            </p>
            <div className="pt-1">
              <button
                onClick={() => onOpenScopingModal('Footer Scoping Button')}
                className="px-5 py-2 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              >
                Talk to an expert
              </button>
            </div>
          </div>

          {/* Col 2: Solutions & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Solutions & Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#capabilities" className="hover:text-[#0066ff] transition-colors">Custom Software Development</a></li>
              <li><a href="#capabilities" className="hover:text-[#0066ff] transition-colors">Enterprise AI & Autonomous Systems</a></li>
              <li><a href="#capabilities" className="hover:text-[#0066ff] transition-colors">Mobile App & Web Platforms</a></li>
              <li><a href="#capabilities" className="hover:text-[#0066ff] transition-colors">Cloud Engineering & DevOps</a></li>
              <li><a href="#capabilities" className="hover:text-[#0066ff] transition-colors">Blockchain & Smart Contracts</a></li>
              <li><a href="#case-study" className="hover:text-[#0066ff] transition-colors">Case Studies & Outcomes</a></li>
            </ul>
          </div>

          {/* Col 3: Office Address & Direct Calling */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>Office Location</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300">
                  Glitz cinema jalore, jalore, Rajasthan 343001
                </span>
              </div>
              <div className="pt-1 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="tel:+917023318111" className="hover:text-[#0066ff] text-slate-200 font-medium transition-colors">
                    +91-7023318111
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <a href="tel:+919664471637" className="hover:text-[#0066ff] text-slate-200 font-medium transition-colors">
                    +91 96644 71637
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Department Email Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0066ff]" />
              <span>Official Emails</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-between gap-1.5 p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 text-[11px] shrink-0">Admin:</span>
                <a href="mailto:info@asthasoftindia.com" className="hover:text-[#0066ff] text-slate-200 font-mono text-[11px] transition-colors break-all">
                  info@asthasoftindia.com
                </a>
              </div>
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-between gap-1.5 p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 text-[11px] shrink-0">Sales:</span>
                <a href="mailto:sales@asthasoftindia.com" className="hover:text-brand-orange text-slate-200 font-mono text-[11px] transition-colors break-all">
                  sales@asthasoftindia.com
                </a>
              </div>
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-between gap-1.5 p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 text-[11px] shrink-0">Accounts:</span>
                <a href="mailto:accounts@asthasoftindia.com" className="hover:text-[#0066ff] text-slate-200 font-mono text-[11px] transition-colors break-all">
                  accounts@asthasoftindia.com
                </a>
              </div>
              <div className="flex flex-wrap xs:flex-nowrap items-center justify-between gap-1.5 p-1.5 rounded-lg bg-white/5 border border-white/5">
                <span className="text-slate-400 text-[11px] shrink-0">Support:</span>
                <a href="mailto:support@asthasoftindia.com" className="hover:text-emerald-400 text-slate-200 font-mono text-[11px] transition-colors break-all">
                  support@asthasoftindia.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & socials */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Asthasoft Technology PVT. LTD. All Rights Reserved.
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded bg-white/10 hover:bg-[#0066ff] hover:text-white flex items-center justify-center transition-colors">
              <IconBrandLinkedin size={13} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors">
              <IconBrandX size={12} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded bg-white/10 hover:bg-[#ff5421] hover:text-white flex items-center justify-center transition-colors">
              <IconBrandInstagram size={13} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded bg-white/10 hover:bg-[#0066ff] hover:text-white flex items-center justify-center transition-colors">
              <IconBrandFacebook size={13} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-6 h-6 rounded bg-white/10 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors">
              <IconBrandYoutube size={13} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
