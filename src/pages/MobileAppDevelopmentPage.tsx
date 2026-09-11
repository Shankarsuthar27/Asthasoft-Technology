import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Apple,
  Layers,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Star,
  Download,
  Users,
  Award,
  Zap,
  Lock,
  Cloud,
  ChevronDown,
  PhoneCall,
  Send,
  Code2,
  Cpu,
  RefreshCw,
  Sliders,
  Check,
  Globe,
  Radio,
  ShoppingBag,
  HeartPulse,
  DollarSign,
  Truck,
  Building,
} from 'lucide-react';
import {
  IconBrandFlutter,
  IconBrandReact,
  IconBrandKotlin,
  IconBrandSwift,
  IconBrandFirebase,
  IconBrandAws,
} from '@tabler/icons-react';

interface MobileAppDevelopmentPageProps {
  onOpenScopingModal: (source?: string) => void;
  onOpenCallModal: (context?: string) => void;
}

export const MobileAppDevelopmentPage: React.FC<MobileAppDevelopmentPageProps> = ({
  onOpenScopingModal,
  onOpenCallModal,
}) => {
  // Tabs for Services
  const [selectedServiceTab, setSelectedServiceTab] = useState('android');
  // Tabs for Industries
  const [selectedIndustryTab, setSelectedIndustryTab] = useState('healthcare');
  // Tech stack category
  const [selectedTechStack, setSelectedTechStack] = useState('cross');
  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // In-page quick enquiry form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formBudget, setFormBudget] = useState('$10k - $25k');
  const [formBrief, setFormBrief] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInPageFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      onOpenScopingModal('Mobile App In-Page Lead Form');
    }, 400);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-body selection:bg-[#0066ff] selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION matching uploaded screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-[#eef5ff] via-[#f8fbff] to-[#ffffff] border-b border-slate-200/60">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[380px] h-[380px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Headlines, Trust Points & CTA */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
                <span>TOP RATED MOBILE APP FIRM</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12]">
                  Client-First <span className="text-[#0066ff]">Mobile App</span> <br />
                  Development Company
                </h1>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                Empowering startups and enterprises with high-performance native iOS, Android, and cross-platform
                Flutter & React Native applications engineered for engagement, retention, and frictionless scaling.
              </p>

              {/* 4 Stats Badges Grid matching screenshot */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 max-w-lg pt-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <span>4.9/5 Rating on Clutch</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                  <Award className="w-4 h-4 text-[#0066ff] shrink-0" />
                  <span>350+ Apps Delivered</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>98% Client Satisfaction</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white/80 border border-slate-200/80 p-2.5 rounded-xl shadow-xs">
                  <Download className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>50M+ User Downloads</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => onOpenScopingModal('Mobile App Hero')}
                  className="px-8 py-4 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Schedule a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onOpenCallModal('Mobile App Architecture')}
                  className="px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-base shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#0066ff]" />
                  <span>Rapid 30-Min Call</span>
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic Mobile App Mockup Illustration */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[460px]">
                {/* Visual Card Container */}
                <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl shadow-blue-500/10 border border-slate-200/80">
                  <img
                    src="/mobile_app_hero.jpg"
                    alt="Asthasoft Mobile App Development"
                    className="w-full h-auto object-cover rounded-2xl"
                  />

                  {/* Floating App Store Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-[#0066ff]">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-slate-900 leading-tight">
                        Native & Hybrid
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500">
                        iOS • Android • Flutter
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ambient glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-3xl blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. RECOGNITION / ACCREDITATIONS BAR */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white py-6 border-b border-slate-200/70">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Recognized as Top Mobile App Developers by Global Research Firms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-85 text-xs sm:text-sm font-bold text-slate-600">
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              ⭐ Clutch Global Leader 2026
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              🏅 GoodFirms Top Mobile Agency
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              🚀 Upwork Top Rated Plus
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              🏆 AppFutura Best App Developers
            </span>
            <span className="flex items-center gap-1.5 py-1 px-3 rounded-lg bg-slate-50 border border-slate-200">
              ⭐ 50M+ Installs Across Client Apps
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. WHY CHOOSE ASTHASOFT FOR MOBILE APPS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              WHY PARTNER WITH US
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Businesses Choose Asthasoft for Mobile App Development Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We build intuitive, fluid, and robust mobile applications that align with your business goals and delight end-users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Apple className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Native iOS and Android Precision
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Engineered with pure Swift and Kotlin for optimal hardware utilization, fluid 120fps animations, and full Apple & Google ecosystem integration.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>View native capabilities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <IconBrandFlutter size={26} stroke={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Cross-Platform Flutter & React Native
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Single codebase efficiency delivering native speed across iOS and Android, cutting development timelines by 40% without compromising visual fidelity.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>View cross-platform apps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Intuitive UX/UI & Motion Design
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Pixel-perfect user interfaces, frictionless checkout flows, and engaging micro-interactions adhering to Apple Human Interface and Material 3 guidelines.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore app UI/UX</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Enterprise Security & Encryption
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Biometric authentication (FaceID/TouchID), AES-256 data protection at rest, secure keychain storage, and strict OWASP Mobile Top 10 compliance.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>View security standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Cloud className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Scalable Backend & Cloud APIs
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Ultra-fast GraphQL & REST endpoints, serverless AWS architectures, Firebase real-time synchronizations, and zero-latency WebSocket integrations.
              </p>
              <div className="text-xs font-semibold text-[#0066ff] flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore cloud backends</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Card 6: Royal Blue CTA Card */}
            <div className="bg-gradient-to-br from-[#0052cc] to-[#0066ff] rounded-2xl p-7 text-white shadow-lg shadow-blue-500/20 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Have a Mobile App Concept?
                </h3>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Discuss your app idea under a mutual Non-Disclosure Agreement (NDA). Get a detailed scope document and timeline estimate.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenScopingModal('Mobile App Services Grid CTA')}
                className="mt-6 w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0066ff] font-bold text-sm transition-all cursor-pointer text-center active:scale-98"
              >
                Schedule a Free Scoping Call →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. CONNECTED VALUE PILL ROWS matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              When You Choose Asthasoft for Mobile App Development
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              We transform innovative app concepts into market-defining digital products with seamless omnichannel integration.
            </p>
          </div>

          {/* 4 Connected Pill Rows */}
          <div className="space-y-4">
            {[
              {
                leftTitle: 'Customized iOS & Android Engineering',
                leftDesc: 'Purpose-built for device hardware, camera APIs, and native gestures.',
                rightTitle: 'Cross-Platform Flutter & React Native Velocity',
                rightDesc: 'Deliver on two stores at the cost and timeline of one app.',
                icon: Smartphone,
              },
              {
                leftTitle: 'Human-Centered UI/UX Motion Design',
                leftDesc: 'Interactive prototypes, micro-animations, and verified usability tests.',
                rightTitle: 'High-Concurrency Real-Time Cloud Backends',
                rightDesc: 'Scale seamlessly from 1,000 to 1,000,000 active concurrent users.',
                icon: Cloud,
              },
              {
                leftTitle: 'Rigorous Automated QA & Multi-Device Testing',
                leftDesc: 'Tested across 50+ real physical Android and iOS phone devices.',
                rightTitle: 'End-to-End App Store & Google Play Launch',
                rightDesc: 'Full compliance with Apple App Review and Google Play guidelines.',
                icon: ShieldCheck,
              },
              {
                leftTitle: 'Strict 100% IP & Source Code Ownership',
                leftDesc: 'All repositories, design assets, and app keys transferred to you.',
                rightTitle: 'Continuous 24/7 Monitoring & Post-Launch SLAs',
                rightDesc: '90-day post-launch warranty with proactive OS upgrade maintenance.',
                icon: RefreshCw,
              },
            ].map((row, idx) => {
              const CenterIcon = row.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f8fafc] border border-slate-200/90 rounded-2xl sm:rounded-full p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs hover:border-blue-300 transition-all"
                >
                  <div className="w-full sm:w-5/12 text-center sm:text-right">
                    <div className="font-bold text-sm sm:text-base text-slate-900">
                      {row.leftTitle}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {row.leftDesc}
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#0066ff] text-white flex items-center justify-center shrink-0 shadow-md">
                    <CenterIcon className="w-5 h-5" />
                  </div>

                  <div className="w-full sm:w-5/12 text-center sm:text-left">
                    <div className="font-bold text-sm sm:text-base text-slate-900">
                      {row.rightTitle}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {row.rightDesc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. INDUSTRY SOLUTIONS TABS SHOWCASE */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f8fafc]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              INDUSTRY EXPERTISE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Mobile App Solutions Built for Diverse Industry Sectors
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tailored architectures that solve real-world industry bottlenecks and scale to millions of concurrent users.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {[
              { id: 'healthcare', name: 'Healthcare & Telehealth', icon: HeartPulse },
              { id: 'fintech', name: 'Fintech & Banking', icon: DollarSign },
              { id: 'retail', name: 'E-Commerce & Retail', icon: ShoppingBag },
              { id: 'logistics', name: 'Logistics & On-Demand', icon: Truck },
              { id: 'realestate', name: 'Real Estate & PropTech', icon: Building },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = selectedIndustryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedIndustryTab(tab.id)}
                  className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0066ff] text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Content Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-5">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {selectedIndustryTab === 'healthcare' && 'HIPAA-Compliant Healthcare & Telehealth Apps'}
                  {selectedIndustryTab === 'fintech' && 'Next-Gen Mobile Banking & Fintech Applications'}
                  {selectedIndustryTab === 'retail' && 'High-Conversion Omnichannel E-Commerce Apps'}
                  {selectedIndustryTab === 'logistics' && 'Real-Time Dispatch & On-Demand Logistics Apps'}
                  {selectedIndustryTab === 'realestate' && 'Smart Real Estate, Tenant & PropTech Apps'}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  We design mobile experiences focused on immediate value delivery, rock-solid compliance, and automated user onboarding.
                </p>
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>End-to-end encrypted user authentication & biometric security</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Offline-first SQLite/Realm local caching with automatic cloud sync</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>In-app payment integrations (Apple Pay, Google Pay, Stripe, Razorpay)</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Rich automated push notifications and customized deep linking</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenScopingModal(`Industry: ${selectedIndustryTab}`)}
                    className="px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Explore Industry Solutions</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center">
                <div className="w-full max-w-[320px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/mobile_app_hero.jpg"
                    alt="Industry App Showcase"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. OUR MOBILE APP SERVICES WITH TABS matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Our Mobile App Development Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              End-to-end mobile engineering capabilities from discovery to app store submission and continuous lifecycle scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Left Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {[
                { id: 'android', name: 'Android App Development' },
                { id: 'ios', name: 'iOS App Development' },
                { id: 'cross', name: 'Cross-Platform (Flutter/React Native)' },
                { id: 'pwa', name: 'Progressive Web Apps (PWA)' },
                { id: 'iot', name: 'Wearable & IoT App Solutions' },
                { id: 'design', name: 'Mobile App UI/UX Design' },
              ].map((service) => {
                const isActive = selectedServiceTab === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceTab(service.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-[#0066ff] border-[#0066ff]'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {service.name}
                  </button>
                );
              })}
            </div>

            {/* Right Tab Content */}
            <div className="lg:col-span-8 bg-[#f8fafc] rounded-2xl p-7 sm:p-8 border border-slate-200">
              {selectedServiceTab === 'android' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    High-Performance Android App Development
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Custom native Android applications developed using Kotlin and Jetpack Compose. Built to support diverse Android OS versions, screen sizes, and device chipsets with maximum responsiveness.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Optimized for Android 15 & backwards compatible to Android 8.0</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Google Play Store optimization (ASO) and policy compliance</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Zero memory leaks with automated performance profilers</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenScopingModal('Android Development')}
                      className="px-6 py-3 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0052cc] transition-all cursor-pointer"
                    >
                      Build an Android App →
                    </button>
                  </div>
                </div>
              )}

              {selectedServiceTab === 'ios' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Bespoke iOS App Engineering
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Native Swift & SwiftUI applications tailored for iPhones, iPads, and Apple Watch. Utilizing Apple ARKit, CoreML, and widgets to create magical user experiences.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Strict compliance with Apple App Store Review Guidelines</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Seamless Apple Pay, iCloud Sync, and FaceID integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Fluid 120Hz ProMotion animations and responsive layouts</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenScopingModal('iOS Development')}
                      className="px-6 py-3 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0052cc] transition-all cursor-pointer"
                    >
                      Build an iOS App →
                    </button>
                  </div>
                </div>
              )}

              {selectedServiceTab === 'cross' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Cross-Platform Flutter & React Native
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Write once and deploy everywhere with native compilation speed. Reduce development cost by 40% while preserving platform-specific look and feel.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Over 90% shared business logic between iOS and Android</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>High-velocity Hot Reload for rapid prototyping & testing</span>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenScopingModal('Cross-Platform Development')}
                      className="px-6 py-3 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0052cc] transition-all cursor-pointer"
                    >
                      Explore Cross-Platform →
                    </button>
                  </div>
                </div>
              )}

              {selectedServiceTab === 'pwa' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Progressive Web Apps (PWA)
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    App-like web experiences installable without App Store friction. Offline capabilities, background push notifications, and ultra-lightweight storage footprints.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenScopingModal('PWA Development')}
                      className="px-6 py-3 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0052cc] transition-all cursor-pointer"
                    >
                      Explore PWAs →
                    </button>
                  </div>
                </div>
              )}

              {selectedServiceTab === 'iot' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Wearable & IoT App Solutions
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Connecting smart hardware, BLE beacons, Apple Watch, and WearOS gadgets into a unified companion mobile ecosystem.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenScopingModal('IoT App Development')}
                      className="px-6 py-3 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0052cc] transition-all cursor-pointer"
                    >
                      Explore IoT Apps →
                    </button>
                  </div>
                </div>
              )}

              {selectedServiceTab === 'design' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    Mobile App UI/UX & Design Systems
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Comprehensive design tokens, interactive clickable wireframes, user testing feedback sessions, and conversion-optimized checkout layouts.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => onOpenScopingModal('Mobile UI/UX Design')}
                      className="px-6 py-3 rounded-xl bg-[#0066ff] text-white font-semibold text-sm hover:bg-[#0052cc] transition-all cursor-pointer"
                    >
                      Explore App Design →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. 5-STEP PROCESS SECTION WITH RIBBON BADGES matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              DELIVERY LIFECYCLE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Our Mobile App Development Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              A transparent, agile workflow that ensures on-time delivery from idea to store publication.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                step: 'Step 01',
                title: 'Strategy & Wireframing',
                desc: 'Scoping user journeys, MVP feature roadmaps, and technical architecture.',
              },
              {
                step: 'Step 02',
                title: 'UI/UX Design & Prototype',
                desc: 'Clickable Figma prototypes, design systems, and usability validation.',
              },
              {
                step: 'Step 03',
                title: 'Agile App Development',
                desc: 'Two-week sprint cadences with continuous code reviews and test-driven builds.',
              },
              {
                step: 'Step 04',
                title: 'Multi-Device QA & Testing',
                desc: 'Testing across real physical iOS/Android devices for speed, memory, and battery.',
              },
              {
                step: 'Step 05',
                title: 'Launch & Store Optimization',
                desc: 'App Store & Google Play submission, ASO keywords, and production monitoring.',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all text-center flex flex-col items-center group relative overflow-hidden"
              >
                {/* Blue ribbon icon */}
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066ff] flex items-center justify-center font-black text-sm mb-4 group-hover:scale-110 transition-transform">
                  {idx + 1}
                </div>
                <div className="text-xs font-bold text-[#0066ff] uppercase tracking-wider mb-1">
                  {p.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. TECH STACK SECTION matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              TECH STACK
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The Tech Stack Powering Your Mobile App
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Built using modern, scalable, and secure technologies tailored to your application needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#f8fafc] rounded-3xl p-6 sm:p-10 border border-slate-200">
            {/* Left Box with tabs */}
            <div className="md:col-span-4 bg-[#0066ff] text-white rounded-2xl p-5 space-y-2 shadow-md">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-200 mb-3 px-2">
                TECHNOLOGY LAYERS
              </div>
              {[
                { id: 'ios', name: 'iOS Native' },
                { id: 'android', name: 'Android Native' },
                { id: 'cross', name: 'Cross-Platform' },
                { id: 'backend', name: 'Backend & APIs' },
                { id: 'database', name: 'Database & Cache' },
              ].map((t) => {
                const isActive = selectedTechStack === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTechStack(t.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-white text-[#0066ff] shadow-xs'
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    <span>{t.name}</span>
                    {isActive && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>

            {/* Right: Tech items display */}
            <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedTechStack === 'ios' && (
                <>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Swift 6.0</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">SwiftUI</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Objective-C</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Apple ARKit</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">CoreML</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Combine</div>
                </>
              )}
              {selectedTechStack === 'android' && (
                <>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Kotlin</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Jetpack Compose</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Java 21</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Android NDK</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Coroutines</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Room DB</div>
                </>
              )}
              {selectedTechStack === 'cross' && (
                <>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Flutter 3.x</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">React Native</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Dart</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Expo CLI</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">TypeScript</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Redux / Zustand</div>
                </>
              )}
              {selectedTechStack === 'backend' && (
                <>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Node.js</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Python FastAPI</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">AWS Lambda</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">GraphQL</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Firebase Cloud</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">WebSockets</div>
                </>
              )}
              {selectedTechStack === 'database' && (
                <>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">PostgreSQL</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">MongoDB</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Redis</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">SQLite</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Realm Mobile</div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-center font-bold text-sm">Supabase</div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. REAL-WORLD CASE STUDY SHOWCASE */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="text-xs font-bold tracking-wider text-[#0066ff] uppercase">
              CASE STUDY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Success Stories & Real-World Impact
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore how our engineered mobile solutions drove million-dollar valuations, engagement spikes, and top app store rankings.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5 flex justify-center">
                <div className="w-full max-w-[340px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                    src="/mobile_app_hero.jpg"
                    alt="Kisan Network Mobile App"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <span>AGRI-COMMODITY & B2B FINTECH</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Scalable Marketplace & Auction Platform
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Engineered a cross-platform Flutter application with offline-first synchronizations, instant real-time bidding notifications, and multi-language support across rural geographies.
                </p>

                {/* 3 Outcome metric badges */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                    <div className="text-lg sm:text-xl font-black text-[#0066ff]">4.8 ★</div>
                    <div className="text-[11px] text-slate-500 font-medium">Store Rating</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                    <div className="text-lg sm:text-xl font-black text-[#0066ff]">2.5M+</div>
                    <div className="text-[11px] text-slate-500 font-medium">Active Users</div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-center">
                    <div className="text-lg sm:text-xl font-black text-[#0066ff]">65%</div>
                    <div className="text-[11px] text-slate-500 font-medium">Faster Load</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenScopingModal('Mobile Case Study')}
                    className="px-6 py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0066ff] text-white flex items-center justify-center font-black text-lg shrink-0">
                “
              </div>
              <div className="text-sm text-slate-700 italic leading-relaxed">
                “Asthasoft delivered our mobile app 3 weeks ahead of schedule. The UX is incredibly smooth and our active daily users grew 4x within the first 60 days.”
                <span className="block not-italic font-bold text-slate-900 mt-1">
                  — Head of Product Engineering, Enterprise Client
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. IN-PAGE APP CONSULTATION LEAD FORM matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-gradient-to-r from-[#003db3] via-[#0052cc] to-[#0066ff] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Heading & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Turn Your Mobile App Vision into Reality
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Connect with our Senior Mobile Solutions Architect. We sign strict NDAs and deliver a comprehensive technical blueprint and fixed estimate within 24 hours.
              </p>
              <div className="space-y-3 text-sm font-medium text-blue-100">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Mutual NDA signed before discussing project requirements</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Direct architectural scoping with Senior Mobile Lead</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Transparent timeline, sprint roadmap, and fixed cost breakdown</span>
                </div>
              </div>
            </div>

            {/* Right: Clean White Form Card */}
            <div className="lg:col-span-6 bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Request a Free App Estimate
              </h3>
              <p className="text-xs text-slate-500 mb-5">
                Fill out the quick brief below and our architect will reach out today.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <div className="text-base font-bold text-emerald-900">Request Dispatched!</div>
                  <div className="text-xs text-emerald-700">
                    Our Senior Mobile Architect has received your details and will dial you within 30 minutes.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleInPageFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066ff]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Budget Range</label>
                    <select
                      value={formBudget}
                      onChange={(e) => setFormBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066ff] bg-white"
                    >
                      <option value="< $10,000">&lt; $10,000 (MVP / Prototype)</option>
                      <option value="$10k - $25k">$10,000 - $25,000 (Standard App)</option>
                      <option value="$25k - $50k">$25,000 - $50,000 (Enterprise App)</option>
                      <option value="$50,000+">$50,000+ (High-Scale Platform)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Project Brief (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Brief us about your app concept, target users, or timeline..."
                      value={formBrief}
                      onChange={(e) => setFormBrief(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#0066ff]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Get Free Consultation</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 11. FAQS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              FAQs
            </h2>
            <p className="text-slate-500 text-sm">
              Answers to common queries regarding mobile app development with Asthasoft.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How long does it take to develop a custom mobile app from scratch?',
                a: 'A standard Minimum Viable Product (MVP) app typically takes 6 to 10 weeks. Comprehensive enterprise applications with intricate backends, multi-language localization, and payment integrations generally require 3 to 5 months. We follow two-week agile sprint cycles so you review working software at every stage.',
              },
              {
                q: 'Which is better for my project: Native (iOS/Android) or Cross-Platform (Flutter/React Native)?',
                a: 'If your app heavily relies on device-specific hardware (e.g. advanced ARKit, background Bluetooth beacons, or 3D rendering), Native iOS (Swift) and Android (Kotlin) are recommended. If you want to launch simultaneously on both platforms with up to 40% cost and time savings, Flutter or React Native is the ideal choice.',
              },
              {
                q: 'Do you assist with Apple App Store and Google Play Store submission?',
                a: 'Yes, 100%. We handle the entire publication lifecycle including provisioning profiles, cryptographic code signing, test flight releases, store metadata, screenshots, and compliance with Apple App Review and Google Play guidelines.',
              },
              {
                q: 'Who owns the intellectual property and source code of the mobile app?',
                a: 'You do. We provide a full IP and code transfer agreement. Upon project completion, all source code repositories, API credentials, and design assets belong 100% to your company with zero ongoing license royalties.',
              },
              {
                q: 'What kind of post-launch maintenance and support do you offer?',
                a: 'We provide a complimentary 90-day post-launch warranty period to fix any unforeseen bugs. Afterwards, we offer flexible monthly SLA packages for 24/7 server monitoring, OS upgrade patches (iOS/Android updates), security audits, and continuous feature enhancements.',
              },
            ].map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.q}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'bg-[#0066ff] text-white rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 12. BOTTOM BLUE CTA BANNER matching screenshot */}
      {/* ------------------------------------------------------------- */}
      <section className="py-14 bg-[#0066ff] text-white text-center">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Still have a question or a unique requirement in mind?
          </h3>
          <div>
            <button
              type="button"
              onClick={() => onOpenScopingModal('Mobile App Bottom CTA')}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-100 text-[#0066ff] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Let's Discuss Your App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
