import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FileText,
  X,
  Send,
  Sparkles,
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
      phone: '',
      service: 'AI & Machine Learning',
      budget: '$25,000 - $50,000',
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
    <div id="enquiryPanel" className="fixed right-0 top-1/2 -translate-y-1/2 z-40 font-body">
      {/* Fixed Desktop Edge Tab */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            setIsOpen(true);
            setSuccessMessage(null);
          }}
          className="hidden md:flex items-center gap-2 px-3 py-4 bg-gradient-to-b from-brand-orange to-brand-orange-deep text-white rounded-l-2xl shadow-2xl shadow-brand-orange/30 hover:shadow-brand-orange/50 hover:-translate-x-1 transition-all duration-300 group cursor-pointer border border-r-0 border-white/20"
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
      )}

      {/* Slide-In Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay for focus */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[460px] bg-dark-charcoal border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-brand-orange/20 text-brand-orange">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        Quick Project Estimate
                      </h3>
                      <p className="text-xs text-slate-400">
                        Get transparent budget & timeline feasibility in &lt;4h.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close panel"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {successMessage ? (
                  <div className="my-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-white">
                      Estimate Request Queued
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {successMessage}
                    </p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs hover:brightness-110"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 mt-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Sarah Jenkins"
                        {...register('fullName')}
                        className="w-full px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                      {errors.fullName && (
                        <p className="text-[10px] text-red-400 mt-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="sarah@fintech.io"
                        {...register('email')}
                        className="w-full px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-400 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 234-5678"
                        {...register('phone')}
                        className="w-full px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-red-400 mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Target Service
                      </label>
                      <select
                        {...register('service')}
                        className="w-full px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      >
                        <option value="AI & Machine Learning">AI & Machine Learning (Agents, LLMs)</option>
                        <option value="Custom Enterprise Web & SaaS">Custom Enterprise Web & SaaS</option>
                        <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                        <option value="Cloud Modernization & DevOps">Cloud Modernization & DevOps</option>
                        <option value="Blockchain Protocol">Blockchain Protocol</option>
                      </select>
                    </div>

                    {/* Budget & Timeline Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Estimated Budget
                        </label>
                        <select
                          {...register('budget')}
                          className="w-full px-2.5 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                        >
                          <option value="$10,000 - $25,000">$10k - $25k</option>
                          <option value="$25,000 - $50,000">$25k - $50k</option>
                          <option value="$50,000 - $100,000">$50k - $100k</option>
                          <option value="$100,000+">$100k+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Delivery Target
                        </label>
                        <select
                          {...register('timeline')}
                          className="w-full px-2.5 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                        >
                          <option value="Immediate (< 4 weeks)">Immediate (&lt; 4 wks)</option>
                          <option value="1 - 3 Months">1 - 3 Months</option>
                          <option value="3 - 6 Months">3 - 6 Months</option>
                          <option value="Long-term Dedicated">Long-term Pod</option>
                        </select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        High-Level Requirements
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary of features or system architecture..."
                        {...register('notes')}
                        className="w-full px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange resize-none"
                      />
                      {errors.notes && (
                        <p className="text-[10px] text-red-400 mt-1">{errors.notes.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-bright text-white font-heading font-semibold text-xs shadow-lg shadow-brand-orange/20 hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Calculating Estimate...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Request Estimate & Timeline</span>
                        </>
                      )}
                    </button>

                    <div className="text-center text-[10px] text-slate-400 pt-1">
                      Direct Line: <a href="tel:+917023318111" className="text-brand-orange font-bold hover:underline">+91-7023318111</a>
                      <span className="mx-1 text-white/30">|</span>
                      <a href="tel:+919664471637" className="text-slate-200 hover:underline">9664471637</a>
                    </div>
                  </form>
                )}
              </div>

              {/* Footer Trust Bar */}
              <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  NDA Covered
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  &lt;4h SDE Turnaround
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
