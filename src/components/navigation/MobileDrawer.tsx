import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronDown,
  Globe,
  Smartphone,
  Hexagon,
  Cpu,
  Layers,
  FileCode,
  Settings,
  Cloud,
  Terminal,
  UserCheck,
  Box,
  Palette,
  Monitor,
  Clock,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import {
  WHO_WE_ARE_LINKS,
  SOLUTIONS_COLUMNS,
  INDUSTRIES_LINKS,
} from '../../data/navigationData';
import { navigateTo } from '../../utils/navigation';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenScopingModal: (source?: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenScopingModal,
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setOpenSection(null);
    }
  }, [isOpen]);

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    navigateTo(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          />

          {/* Slide-over Drawer Panel - White background matching screenshot */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[380px] bg-white border-l border-slate-200 z-[70] flex flex-col justify-between shadow-2xl lg:hidden font-body text-slate-800"
          >
            {/* Header with Asthasoft Logo and Blue Square Close Button matching screenshot */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-white">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="flex items-center gap-2.5 cursor-pointer focus:outline-none"
              >
                <img
                  src="/logo.png"
                  alt="Asthasoft Technologies Pvt. Ltd."
                  className="w-10 h-10 object-contain rounded-full shadow-xs bg-white p-0.5 shrink-0"
                />
                <div className="flex flex-col">
                  <div className="flex items-center brand-text">
                    <span className="font-bold text-base text-slate-900">
                      ASTHA
                    </span>
                    <span className="font-bold text-base text-[#0066ff]">
                      SOFT
                    </span>
                    <span className="text-[#0066ff] text-[8px] font-bold ml-0.5">®</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 -mt-0.5">
                    Technologies Pvt. Ltd.
                  </span>
                </div>
              </a>

              {/* Blue Square Close Button with White X matching screenshot */}
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 rounded-md bg-[#0066ff] hover:bg-[#0052cc] text-white flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
              {/* 1. Who we are */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('who-we-are')}
                  className={`w-full py-2.5 px-3 flex items-center justify-between text-sm font-semibold transition-all ${
                    openSection === 'who-we-are'
                      ? 'bg-[#eff6ff] text-[#0066ff] border-l-4 border-[#0066ff] rounded-r-xl'
                      : 'text-slate-800 hover:text-[#0066ff]'
                  }`}
                >
                  <span>Who we are</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSection === 'who-we-are' ? 'rotate-180 text-[#0066ff]' : 'text-slate-700'
                    }`}
                  />
                </button>
                {openSection === 'who-we-are' && (
                  <div className="px-3 py-2 space-y-2 border-l border-blue-100 ml-4 my-1">
                    {WHO_WE_ARE_LINKS.map((link) => (
                      <a
                        key={link.title}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block py-1 text-xs text-slate-600 hover:text-[#0066ff] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <span>{link.title}</span>
                          {link.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-[#0066ff] font-bold">
                              {link.badge}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. What We Do (matching exact Image 1 screenshot) */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('what-we-do')}
                  className={`w-full py-2.5 px-3 flex items-center justify-between text-sm font-semibold transition-all ${
                    openSection === 'what-we-do'
                      ? 'bg-[#eff6ff] text-[#0066ff] border-l-4 border-[#0066ff] rounded-r-xl'
                      : 'text-slate-800 hover:text-[#0066ff]'
                  }`}
                >
                  <span>What We Do</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSection === 'what-we-do' ? 'rotate-180 text-[#0066ff]' : 'text-slate-700'
                    }`}
                  />
                </button>

                {openSection === 'what-we-do' && (
                  <div className="pl-4 pr-1 py-3 space-y-4">
                    {/* BUILD & ENGINEER */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>BUILD & ENGINEER</span>
                      </div>
                      <div className="space-y-0.5">
                        <a
                          href="/custom-software-development"
                          onClick={(e) => handleLinkClick(e, '/custom-software-development')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Globe className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Custom Software Development</span>
                        </a>
                        <a
                          href="/mobile-app-development-company"
                          onClick={(e) => handleLinkClick(e, '/mobile-app-development-company')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Smartphone className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Mobile App Development</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Hexagon className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Blockchain Development</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Cpu className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>AI Product Development</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Layers className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>SaaS Development</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <FileCode className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>MVP Development</span>
                        </a>
                      </div>
                    </div>

                    {/* MANAGED IT SERVICES */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 pt-1">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>MANAGED IT SERVICES</span>
                      </div>
                      <div className="space-y-0.5">
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Cloud className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Cloud Engineering</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Terminal className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>DevOps</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <UserCheck className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>IT Ops Management</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Box className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Dedicated Engineering Teams</span>
                        </a>
                      </div>
                    </div>

                    {/* DESIGN & WEB */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 pt-1">
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>DESIGN & WEB</span>
                      </div>
                      <div className="space-y-0.5">
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Palette className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>UI/UX & web design</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Monitor className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Custom web development</span>
                        </a>
                        <a
                          href="#capabilities"
                          onClick={(e) => handleLinkClick(e, '#capabilities')}
                          className="flex items-center gap-3 py-1.5 px-1 rounded-md text-xs sm:text-[13px] text-slate-700 hover:text-[#0066ff] hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <Box className="w-4 h-4 text-slate-600 shrink-0" />
                          <span>Dedicated engineering teams</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Solutions */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('solutions')}
                  className={`w-full py-2.5 px-3 flex items-center justify-between text-sm font-semibold transition-all ${
                    openSection === 'solutions'
                      ? 'bg-[#eff6ff] text-[#0066ff] border-l-4 border-[#0066ff] rounded-r-xl'
                      : 'text-slate-800 hover:text-[#0066ff]'
                  }`}
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSection === 'solutions' ? 'rotate-180 text-[#0066ff]' : 'text-slate-700'
                    }`}
                  />
                </button>
                {openSection === 'solutions' && (
                  <div className="pl-4 pr-1 py-2 space-y-3">
                    {SOLUTIONS_COLUMNS.map((col) => (
                      <div key={col.category} className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          {col.category}
                        </span>
                        <div className="space-y-1">
                          {col.items.map((item) => (
                            <a
                              key={item.title}
                              href={item.href}
                              onClick={(e) => handleLinkClick(e, item.href)}
                              className="block py-1 text-xs text-slate-600 hover:text-[#0066ff] cursor-pointer"
                            >
                              {item.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Industries */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleSection('industries')}
                  className={`w-full py-2.5 px-3 flex items-center justify-between text-sm font-semibold transition-all ${
                    openSection === 'industries'
                      ? 'bg-[#eff6ff] text-[#0066ff] border-l-4 border-[#0066ff] rounded-r-xl'
                      : 'text-slate-800 hover:text-[#0066ff]'
                  }`}
                >
                  <span>Industries</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openSection === 'industries' ? 'rotate-180 text-[#0066ff]' : 'text-slate-700'
                    }`}
                  />
                </button>
                {openSection === 'industries' && (
                  <div className="pl-4 pr-1 py-2 space-y-1.5">
                    {INDUSTRIES_LINKS.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className="block py-1 text-xs text-slate-600 hover:text-[#0066ff] cursor-pointer"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* 5. Our Work */}
              <a
                href="#case-study"
                onClick={(e) => handleLinkClick(e, '#case-study')}
                className="block py-2.5 px-3 text-sm font-semibold text-slate-800 hover:text-[#0066ff] transition-colors cursor-pointer"
              >
                Our Work
              </a>

              {/* 6. Contact */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigateTo('/contact');
                }}
                className="block w-full text-left py-2.5 px-3 text-sm font-semibold text-slate-800 hover:text-[#0066ff] transition-colors cursor-pointer"
              >
                Contact
              </button>

              {/* Direct Connect Section */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>DIRECT CONNECT</span>
                </div>

                <div className="space-y-3.5 px-1">
                  {/* India */}
                  <div className="flex items-center gap-3">
                    <svg className="w-7 h-5 rounded-[2px] shadow-xs shrink-0" viewBox="0 0 640 480">
                      <path fill="#f93" d="M0 0h640v160H0z" />
                      <path fill="#fff" d="M0 160h640v160H0z" />
                      <path fill="#128807" d="M0 320h640v160H0z" />
                      <circle cx="320" cy="240" r="40" fill="none" stroke="#008" strokeWidth="10" />
                    </svg>
                    <div>
                      <span className="text-sm font-bold text-slate-900 block leading-tight">
                        India
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#0066ff]">
                        <a href="tel:+917023318111" className="hover:underline">
                          +91-7023318111
                        </a>
                        <span className="text-slate-300">/</span>
                        <a href="tel:01169269401" className="hover:underline">
                          011-69269401
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office address */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 px-1">
                  <div className="flex items-start gap-2 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">
                      Glitz cinema jalore, jalore , Rajasthan 343001
                    </span>
                  </div>

                  {/* Timezone Status */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium pt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Mon-Fri, 9:00AM–6:00PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Talk to an Expert CTA Button */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/80">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenScopingModal('Mobile Drawer Bottom CTA');
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-heading font-semibold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <span>Talk to an expert</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
