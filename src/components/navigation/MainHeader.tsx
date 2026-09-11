import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Sparkles,
  ArrowRight,
  Menu,
  PhoneCall,
  Globe,
  Smartphone,
  Layers,
  Cpu,
  Building2,
  Package,
  Cloud,
  Terminal,
  UserCheck,
  Users,
  Palette,
  Monitor,
  Settings,
} from 'lucide-react';
import { WHO_WE_ARE_LINKS, SOLUTIONS_COLUMNS, INDUSTRIES_LINKS } from '../../data/navigationData';

interface MainHeaderProps {
  onOpenScopingModal: (source?: string) => void;
  onOpenMobileMenu: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  onOpenScopingModal,
  onOpenMobileMenu,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 160);
  };

  return (
    <header
      onMouseLeave={handleMouseLeave}
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-white shadow-sm py-3.5'
      } border-b border-slate-100 font-body`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Official Logo: Asthasoft Technologies Pvt. Ltd. */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.pathname !== '/') {
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('app-navigate'));
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer"
            aria-label="Asthasoft Technologies Pvt. Ltd. Home"
          >
            <img
              src="/logo.png"
              alt="Asthasoft Technologies Pvt. Ltd."
              className="h-10 sm:h-12 w-10 sm:w-12 object-contain rounded-full shadow-xs group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="flex flex-col select-none">
              <div className="flex items-center brand-text">
                <span className="font-bold text-base sm:text-xl text-slate-900 group-hover:text-brand-orange transition-colors">
                  ASTHA
                </span>
                <span className="font-bold text-base sm:text-xl text-[#0066ff]">
                  SOFT
                </span>
                <span className="text-[#0066ff] text-[8px] sm:text-[9px] font-bold self-start mt-0.5 ml-0.5">®</span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono font-bold tracking-wider text-slate-500 -mt-0.5">
                Technologies Pvt. Ltd.
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4" aria-label="Main Navigation">
            {/* Who We Are */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('who-we-are')}
            >
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === 'who-we-are' ? null : 'who-we-are')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeMenu === 'who-we-are'
                    ? 'text-[#0066ff] bg-[#eff6ff]'
                    : 'text-slate-700 hover:text-[#0066ff]'
                }`}
              >
                <span>Who we are</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'who-we-are' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeMenu === 'who-we-are' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl p-3 shadow-2xl z-50"
                  >
                    <div className="space-y-1">
                      {WHO_WE_ARE_LINKS.map((link) => (
                        <a
                          key={link.title}
                          href={link.href}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 group transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-brand-orange mt-1.5 shrink-0" />
                          <div>
                            <span className="text-xs font-semibold text-slate-900 group-hover:text-[#0066ff]">
                              {link.title}
                            </span>
                            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                              {link.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* What We Do - EXACT 3-Column Mega Menu matching Image 3 */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('what-we-do')}
            >
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === 'what-we-do' ? null : 'what-we-do')}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeMenu === 'what-we-do'
                    ? 'text-[#0066ff] bg-[#eff6ff]'
                    : 'text-slate-700 hover:text-[#0066ff]'
                }`}
              >
                <span>What We Do</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'what-we-do' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeMenu === 'what-we-do' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full -left-20 xl:-left-12 mt-2 w-[850px] bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl z-50"
                  >
                    <div className="grid grid-cols-3 gap-8">
                      {/* Column 1: BUILD & ENGINEER */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Build & Engineer</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'Custom Software Development', icon: Globe, href: '/custom-software-development' },
                            { name: 'Mobile App Development', icon: Smartphone, href: '/mobile-app-development-company' },
                            { name: 'Blockchain Development', icon: Layers, href: '#services' },
                            { name: 'AI Product Development', icon: Cpu, href: '#services-ai' },
                            { name: 'SaaS Development', icon: Building2, href: '#services' },
                            { name: 'MVP Development', icon: Package, href: '#services' },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => {
                                  if (item.href.startsWith('/')) {
                                    e.preventDefault();
                                    setActiveMenu(null);
                                    if (window.location.pathname !== item.href) {
                                      window.history.pushState({}, '', item.href);
                                      window.dispatchEvent(new Event('app-navigate'));
                                    }
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }
                                }}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors cursor-pointer"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 2: MANAGED IT SERVICES */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Managed IT Services</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'Cloud Engineering', icon: Cloud, href: '#services' },
                            { name: 'DevOps', icon: Terminal, href: '#services' },
                            { name: 'IT Ops Management', icon: UserCheck, href: '#services' },
                            { name: 'Dedicated Engineering Teams', icon: Users, href: '#services' },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 3: DESIGN & WEB */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Design & Web</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'UI/UX & Web Design', icon: Palette, href: '#services' },
                            { name: 'Custom Web Development', icon: Monitor, href: '#services' },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions - EXACT 3-Column Mega Menu matching Screenshot 1 */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
            >
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === 'solutions' ? null : 'solutions')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeMenu === 'solutions'
                    ? 'text-[#0066ff] bg-[#eff6ff]'
                    : 'text-slate-700 hover:text-[#0066ff]'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'solutions' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeMenu === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full -left-28 xl:-left-20 mt-2 w-[870px] bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl z-50"
                  >
                    <div className="grid grid-cols-3 gap-8">
                      {/* Column 1: BUSINESS OPERATIONS */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Business Operations</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'HRMS Software', icon: Users },
                            { name: 'Employee Tracking Software', icon: UserCheck },
                            { name: 'CRM Software', icon: Layers },
                            { name: 'Helpdesk Software', icon: Monitor },
                            { name: 'Inventory Management', icon: Package },
                            { name: 'School Management Software', icon: Globe },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href="#capabilities"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 2: CUSTOMER-FACING APPS */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Customer-Facing Apps</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'Food Delivery Software', icon: Package },
                            { name: 'Cab Booking Software', icon: Smartphone },
                            { name: 'Home Services Software', icon: Building2 },
                            { name: 'eCommerce Portal', icon: Globe },
                            { name: 'Restaurant Management System', icon: Layers },
                            { name: 'Grocery Software', icon: Package },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href="#capabilities"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 3: INDUSTRY PLATFORMS */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Industry Platforms</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'Learning Management (LMS)', icon: Monitor },
                            { name: 'Online Education Software', icon: Globe },
                            { name: 'Fintech Software Development', icon: Cpu },
                            { name: 'Loan Management Software', icon: Building2 },
                            { name: 'Travel Booking Software', icon: Smartphone },
                            { name: 'White-label Platform', icon: Layers },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href="#capabilities"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries - EXACT 2-Column Mega Menu matching Screenshot 2 */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('industries')}
            >
              <button
                type="button"
                onClick={() => setActiveMenu(activeMenu === 'industries' ? null : 'industries')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  activeMenu === 'industries'
                    ? 'text-[#0066ff] bg-[#eff6ff]'
                    : 'text-slate-700 hover:text-[#0066ff]'
                }`}
              >
                <span>Industries</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeMenu === 'industries' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeMenu === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full -left-20 xl:-left-12 mt-2 w-[600px] bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl z-50"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      {/* Column 1: HEALTHCARE & FINANCE */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Healthcare & Finance</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'Healthcare & fitness', icon: Monitor },
                            { name: 'Telemedicine', icon: Smartphone },
                            { name: 'Banking & fintech', icon: Cpu },
                            { name: 'Neo-banking', icon: Building2 },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href="#capabilities"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 2: CONSUMER & COMMERCE */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100">
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Consumer & Commerce</span>
                        </div>
                        <div className="space-y-1">
                          {[
                            { name: 'E-commerce & retail', icon: Globe },
                            { name: 'Real estate & PropTech', icon: Building2 },
                            { name: 'Travel & Hospitality', icon: Smartphone },
                            { name: 'Education & EdTech', icon: Monitor },
                            { name: 'Food & Beverage', icon: Package },
                            { name: 'Home services', icon: Layers },
                          ].map((item) => {
                            const IconComp = item.icon;
                            return (
                              <a
                                key={item.name}
                                href="#capabilities"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f4f8ff] group transition-colors"
                              >
                                <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#0066ff] flex items-center justify-center shrink-0 group-hover:bg-[#0066ff] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0066ff] transition-colors">
                                  {item.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Direct Links matching screenshot */}
            <a
              href="#services"
              className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-[#0066ff] transition-colors"
            >
              Our Work
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenScopingModal('Contact Nav Link');
              }}
              className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-[#0066ff] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Area: Circular Glowing AI Button + "Talk to an expert" */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Special glowing circular AI Button matching screenshot */}
            <a
              href="#services-ai"
              className="relative flex items-center justify-center group shrink-0"
              title="AI Development Services"
            >
              {/* Outer pulsing glow aura */}
              <div className="absolute -inset-1 rounded-full bg-blue-500/30 blur-[6px] group-hover:bg-blue-500/50 transition-all animate-pulse" />
              
              {/* Button sphere */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#0052cc] via-[#0066ff] to-[#38bdf8] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <span className="font-heading font-black text-xs sm:text-sm tracking-tighter">
                  Ai
                </span>
                <span className="absolute -top-0.5 -right-0.5 text-[8px] sm:text-[9px] text-amber-300 font-bold">
                  ✦
                </span>
              </div>
            </a>

            {/* "Talk to an expert" button - shown on tablet and desktop, mobile has sticky bar */}
            <button
              type="button"
              id="headerTalkExpertBtn"
              onClick={() => onOpenScopingModal('Header CTA')}
              className="hidden sm:inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-heading font-semibold text-xs sm:text-sm text-white bg-[#0066ff] hover:bg-[#0052cc] shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              Talk to an expert
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open Mobile Drawer"
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
