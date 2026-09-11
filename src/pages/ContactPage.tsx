import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  ShieldCheck,
  Award,
  Send,
  CheckCircle2,
  Globe2,
  ChevronRight,
  Sparkles,
  Mail,
} from 'lucide-react';
import { submitQuickEnquiry } from '../services/firebase';

interface ContactPageProps {
  onOpenScopingModal?: (context?: string) => void;
  onOpenCallModal?: (context?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenScopingModal,
  onOpenCallModal,
}) => {
  // Lead Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactNumber, setContactNumber] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('Not sure yet');
  const [projectBrief, setProjectBrief] = useState('');
  const [agreed, setAgreed] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !contactNumber || !service) {
      alert('Please fill in all required fields (Name, Email, Phone, Service).');
      return;
    }
    if (!agreed) {
      alert('Please agree to the terms to proceed.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitQuickEnquiry({
        fullName: fullName,
        email: email,
        phone: `${countryCode} ${contactNumber}`,
        service: service,
        budget: budget,
        notes: projectBrief || 'Enquiry submitted via /contact strategy brief form.',
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafbfc] text-slate-800 selection:bg-[#0066ff] selection:text-white font-body relative overflow-hidden">
      {/* Background Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.45]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* =========================================================================
          SECTION 1: HERO & TRANSFORMATION STRATEGY FORM
          ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-20">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Headline, Narrative & Stats */}
            <div className="lg:col-span-6 xl:col-span-6 pt-2">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#0066ff] text-xs font-semibold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0066ff] animate-pulse" />
                <span>Consult with Senior Engineers</span>
              </div>

              {/* Huge Headline matching reference */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
                Let’s Make Your <br />
                <span className="text-[#0066ff]">Workflows Intelligent.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
                Share with us the core problems creating friction in your business processes. Our senior
                software developers and AI engineers will guide you with a digital transformation strategy,
                implementation timeline, and budget.
              </p>

              {/* 4-Metric Grid Box matching reference */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm mb-6 max-w-xl">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-0 sm:divide-x divide-slate-100">
                  <div className="p-3 sm:p-0 sm:px-3 bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none text-center sm:text-left first:pl-0">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                      Projects Delivered
                    </span>
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      1500+
                    </span>
                  </div>

                  <div className="p-3 sm:p-0 sm:px-3 bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none text-center sm:text-left">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                      Awards Received
                    </span>
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      200+
                    </span>
                  </div>

                  <div className="p-3 sm:p-0 sm:px-3 bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none text-center sm:text-left">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                      Avg. Response
                    </span>
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      &lt; 4h
                    </span>
                  </div>

                  <div className="p-3 sm:p-0 sm:px-3 bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none text-center sm:text-left last:pr-0">
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-400 uppercase block mb-1">
                      Client Retention
                    </span>
                    <span className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      95%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Trust Highlights */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-500 font-bold">★</span>
                  <span>4.9 on Google</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NDA-ready engagements</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-[#0066ff]" />
                  <span>5 Locations · Global Access</span>
                </div>
              </div>
            </div>

            {/* Right Column: Strategy Form Card matching reference */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(0,102,255,0.08)] border border-slate-100 relative">
                {/* Header Tag */}
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0066ff] mb-2">
                  <span className="text-xs">◆</span>
                  <span>Tell Us Your Requirements</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                  Get Personalized Transformation Strategy
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center bg-emerald-50/80 border border-emerald-200 rounded-2xl"
                  >
                    <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Requirement Brief Received!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                      Thank you, <span className="font-semibold text-slate-800">{fullName}</span>. Our Principal
                      Solutions Architect has received your project parameters and will respond within 4 hours
                      with initial feasibility insights.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                    >
                      Submit Another Brief
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your Full Name"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Email ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Contact Number */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all shrink-0"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+49">🇩🇪 +49</option>
                        </select>
                        <input
                          type="tel"
                          required
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="Your Contact Number"
                          className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Service <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all"
                        >
                          <option value="">Select Your Service</option>
                          <option value="Custom Software Development">Custom Software Development</option>
                          <option value="Mobile App Development (iOS & Android)">Mobile App Development</option>
                          <option value="Enterprise AI & Agentic Systems">Enterprise AI & LLM Systems</option>
                          <option value="Cloud Architecture & DevOps">Cloud & DevOps Modernization</option>
                          <option value="FinTech & Digital Payment Gateway">FinTech & Payment Solutions</option>
                          <option value="Messaging & SMS/OTP/RCS Infrastructure">Messaging & SMS Infrastructure</option>
                          <option value="Legacy Codebase Modernization">Legacy System Modernization</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Budget
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all"
                        >
                          <option value="Not sure yet">Not sure yet</option>
                          <option value="₹3 Lakh – ₹5 Lakh ($4k - $6k)">₹3 Lakh – ₹5 Lakh</option>
                          <option value="₹5 Lakh – ₹15 Lakh ($6k - $18k)">₹5 Lakh – ₹15 Lakh</option>
                          <option value="₹15 Lakh – ₹35 Lakh ($18k - $45k)">₹15 Lakh – ₹35 Lakh</option>
                          <option value="₹35 Lakh+ ($45k+)">₹35 Lakh+ (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Project Brief */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Project Brief
                      </label>
                      <textarea
                        rows={3}
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Goals, timeline, references, anything that helps us scope it right."
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] transition-all resize-none"
                      />
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#0066ff] rounded border-slate-300 focus:ring-[#0066ff]"
                      />
                      <label htmlFor="contact-consent" className="text-xs text-slate-500 leading-snug">
                        I agree to be contacted by Asthasoft about my enquiry and accept the{' '}
                        <a href="#terms" className="text-[#0066ff] underline hover:text-blue-700">
                          Terms
                        </a>{' '}
                        and{' '}
                        <a href="#privacy" className="text-[#0066ff] underline hover:text-blue-700">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] active:bg-[#004099] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Processing Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Your brief</span>
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OFFICE LOCATION & INTERACTIVE GOOGLE MAP
          ========================================================================= */}
      <section className="relative py-16 sm:py-20 border-t border-slate-200/80 bg-slate-50/60">
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066ff] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#0066ff]" />
                Headquarters & Technology Center
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Office Location
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 md:mt-0 font-medium max-w-md">
              Visit our central engineering headquarters in Jalore, Rajasthan, or connect directly with our technical leadership.
            </p>
          </div>

          {/* Interactive Google Map & Office Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Interactive Embedded Google Map */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm flex flex-col">
              <div className="relative w-full h-[290px] sm:h-[420px] lg:h-full min-h-[290px] sm:min-h-[420px] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                <iframe
                  title="Asthasoft Office Location - Glitz Cinema Jalore"
                  src="https://maps.google.com/maps?q=Glitz+cinema+jalore,+jalore,+Rajasthan+343001&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Status Pill */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center gap-2 pointer-events-none z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800">Live Map · Jalore HQ</span>
                </div>
              </div>

              {/* Map Footer Link */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 px-2">
                <span className="text-xs text-slate-500 font-medium">
                  Glitz cinema jalore, jalore, Rajasthan 343001
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Glitz+cinema+jalore+jalore+Rajasthan+343001"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#0066ff] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right: Office Detail Card */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-full">
                <div>
                  {/* Top Bar: Country Badge & Studio City */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#0066ff] font-bold text-base flex items-center justify-center border border-blue-100 shadow-sm">
                        IN
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-[#0066ff] uppercase block">
                          INDIA — HEADQUARTERS
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900">Jalore</h3>
                      </div>
                    </div>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Glitz+cinema+jalore+jalore+Rajasthan+343001"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-[#0066ff] flex items-center justify-center transition-colors border border-slate-100"
                      title="View in Google Maps"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Address Box */}
                  <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 mb-5 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#0066ff] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-blue-900/60 uppercase block mb-0.5">
                        Office Address
                      </span>
                      <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed font-semibold">
                        Glitz cinema jalore, jalore, Rajasthan 343001
                      </p>
                    </div>
                  </div>

                  {/* Details Grid: Call & Hours */}
                  <div className="space-y-3 mb-6">
                    {/* Call Box */}
                    <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-100">
                      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-2">
                        <Phone className="w-3.5 h-3.5 text-[#0066ff]" />
                        Direct Call Lines
                      </span>
                      <div className="space-y-1.5">
                        <a
                          href="tel:+917023318111"
                          className="block text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#0066ff] transition-colors"
                        >
                          +91-7023318111
                        </a>
                        <a
                          href="tel:+919664471637"
                          className="block text-xs sm:text-sm font-semibold text-slate-800 hover:text-[#0066ff] transition-colors"
                        >
                          +91 96644 71637
                        </a>
                        <div className="flex items-center gap-2 pt-0.5">
                          <a
                            href="tel:01169269401"
                            className="block text-xs sm:text-sm font-bold text-slate-900 hover:text-[#0066ff] transition-colors"
                          >
                            011-69269401
                          </a>
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 border border-emerald-200">
                            Landline
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hours & Email Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1 mb-1.5">
                          <Clock className="w-3 h-3 text-[#0066ff]" />
                          Hours
                        </span>
                        <p className="text-xs font-semibold text-slate-800 leading-snug">
                          Mon-Sat · 10:00 AM – 7:00 PM IST
                        </p>
                      </div>

                      <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                        <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1 mb-1.5">
                          <Mail className="w-3 h-3 text-[#0066ff]" />
                          Email
                        </span>
                        <a
                          href="mailto:sales@asthasoftindia.com"
                          className="block text-xs font-semibold text-slate-800 hover:text-[#0066ff] transition-colors truncate"
                          title="sales@asthasoftindia.com"
                        >
                          sales@asthasoftindia.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Open in Google Maps Button */}
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Glitz+cinema+jalore+jalore+Rajasthan+343001"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {onOpenCallModal && (
                    <button
                      type="button"
                      onClick={() => onOpenCallModal('Contact Page - Office Location')}
                      className="w-full mt-2.5 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0066ff]" />
                      <span>Request an Instant Callback</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
