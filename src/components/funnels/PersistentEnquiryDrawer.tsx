import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FileText,
  X,
  Send,
  CheckCircle2,
  RefreshCw,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { QuickEnquirySchema, type QuickEnquiryFormData } from './LeadSchema';
import { submitQuickEnquiry } from '../../services/firebase';

export const PersistentEnquiryDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickEnquiryFormData>({
    resolver: zodResolver(QuickEnquirySchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: '+91',
      phone: '',
      service: 'Custom Software Development',
      budget: '₹5 lac – ₹10 lac ($6k - $12k)',
      timeline: '1 - 3 Months',
      notes: '',
    },
  });

  const onSubmit = async (data: QuickEnquiryFormData) => {
    setIsSubmitting(true);
    try {
      const response = await submitQuickEnquiry(data);
      setSuccessMessage(response.message);
      reset();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Fixed Desktop Edge Tab - only rendered when drawer is closed */}
      {!isOpen && (
        <div id="enquiryPanel" className="fixed right-0 top-1/2 -translate-y-1/2 z-40 font-body pointer-events-auto">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setSuccessMessage(null);
            }}
            className="hidden md:flex items-center gap-2 px-3 py-4 bg-[#0066ff] hover:bg-[#0052cc] text-white rounded-l-2xl shadow-2xl shadow-blue-500/35 hover:-translate-x-1.5 transition-all duration-300 group cursor-pointer border border-r-0 border-white/20"
            style={{ writingMode: 'vertical-rl' }}
            title="Quick Project Estimate"
          >
            <div className="flex items-center gap-2 transform rotate-180">
              <span className="font-heading font-extrabold text-xs tracking-wider uppercase">
                Quick Estimate
              </span>
              <FileText className="w-4 h-4 text-white group-hover:scale-125 transition-transform" />
            </div>
          </button>
        </div>
      )}

      {/* Slide-In Drawer Panel - rendered directly at root viewport level (not inside transformed div) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 font-body flex justify-end">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Slide-Over Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full sm:w-[440px] md:w-[460px] h-full max-h-screen bg-white border-l border-slate-200 shadow-2xl z-10 flex flex-col justify-between overflow-hidden text-slate-900"
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-[#0066ff] via-blue-500 to-[#0052cc] shrink-0" />

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-[#0066ff] border border-blue-100 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-slate-900">
                        Quick Project Estimate
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        Transparent feasibility & ballpark scope in &lt;4h.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close panel"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {successMessage ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-slate-900">
                      Estimate Request Received!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                      {successMessage}
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 mt-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Jenkins"
                        {...register('fullName')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all"
                      />
                      {errors.fullName && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sarah@company.com"
                        {...register('email')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone Number with Country Code */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <select
                          {...register('countryCode')}
                          className="w-24 px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+65">🇸🇬 +65</option>
                        </select>
                        <input
                          type="tel"
                          placeholder=""
                          {...register('phone')}
                          className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Target Service */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Service
                      </label>
                      <select
                        {...register('service')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="Mobile App Development (iOS/Android)">Mobile App Development (iOS/Android)</option>
                        <option value="AI & Machine Learning (Agents/LLMs)">AI & Machine Learning (Agents/LLMs)</option>
                        <option value="Enterprise Cloud & DevOps">Enterprise Cloud & DevOps</option>
                        <option value="Legacy Modernization & Refactoring">Legacy Modernization & Refactoring</option>
                        <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                      </select>
                    </div>

                    {/* Budget & Timeline Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Estimated Budget
                        </label>
                        <select
                          {...register('budget')}
                          className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="₹3 lac – ₹5 lac ($4k - $6k)">₹3 lac – ₹5 lac</option>
                          <option value="₹5 lac – ₹10 lac ($6k - $12k)">₹5 lac – ₹10 lac</option>
                          <option value="₹10 lac – ₹20 lac ($12k - $24k)">₹10 lac – ₹20 lac</option>
                          <option value="₹20 lac+ ($24k+)">₹20 lac+</option>
                          <option value="Not sure yet / Flexible">Flexible / To Scope</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Delivery Target
                        </label>
                        <select
                          {...register('timeline')}
                          className="w-full px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="Immediate (< 4 weeks)">Immediate (&lt; 4 wks)</option>
                          <option value="1 - 3 Months">1 - 3 Months</option>
                          <option value="3 - 6 Months">3 - 6 Months</option>
                          <option value="Long-term Dedicated Pod">Long-term Pod</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes (Optional) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Requirements / Notes <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary of requirements or system architecture..."
                        {...register('notes')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:bg-white transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#0066ff] hover:bg-[#0052cc] text-white font-heading font-semibold text-xs shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Calculating Feasibility...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Estimate & Timeline</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Footer Trust Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between shrink-0">
                <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NDA Protected · 100% Confidential
                </span>
                <span className="flex items-center gap-1 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#0066ff]" />
                  &lt;4h SDE Turnaround
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
