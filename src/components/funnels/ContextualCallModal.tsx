import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PhoneCall,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Shield,
  Zap,
} from 'lucide-react';
import { QuickCallSchema, type QuickCallFormData } from './LeadSchema';
import { submitQuickCall } from '../../services/firebase';

interface ContextualCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceContext?: string;
}

export const ContextualCallModal: React.FC<ContextualCallModalProps> = ({
  isOpen,
  onClose,
  serviceContext = 'AI Product Development',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResponse, setSuccessResponse] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickCallFormData>({
    resolver: zodResolver(QuickCallSchema),
    defaultValues: {
      fullName: '',
      countryCode: '+1',
      phone: '',
      preferredTime: 'Within 30 Minutes',
      serviceContext,
    },
  });

  const onSubmit = async (data: QuickCallFormData) => {
    setIsSubmitting(true);
    try {
      const res = await submitQuickCall({
        ...data,
        serviceContext,
      });
      setSuccessResponse(res.message);
      reset();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-dark-charcoal border border-white/10 rounded-2xl p-6 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-amber-400 to-orange-600" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {successResponse ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h4 className="font-heading font-extrabold text-xl text-white">
                  Call Scheduled in 30 Min
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                  {successResponse}
                </p>
                <div className="p-3 rounded-xl bg-white/5 text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-orange" />
                  <span>Senior Principal Engineer Assigned</span>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-brand-orange text-white font-semibold text-xs hover:brightness-110"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/20 border border-brand-orange/40 text-brand-orange flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">
                      Request Call in 30 Min
                    </h3>
                    <span className="text-[11px] font-mono text-brand-orange font-medium">
                      Context: {serviceContext}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Skip the discovery forms. Leave your name and direct number for an immediate 15-minute engineering feasibility call.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. David Sterling"
                      {...register('fullName')}
                      className="w-full px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                    {errors.fullName && (
                      <p className="text-[10px] text-red-400 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Direct Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        {...register('countryCode')}
                        className="w-24 px-2 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+49">🇩🇪 +49</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="555-019-2834"
                        {...register('phone')}
                        className="flex-1 px-3 py-2 rounded-xl bg-dark-pure border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[10px] text-red-400 mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-bright text-white font-heading font-semibold text-xs shadow-lg shadow-brand-orange/20 hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Paging Available SDE...</span>
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Confirm Instant 30-Min Call</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-3 text-center">
                  <span className="text-[11px] text-slate-400">Or dial directly: </span>
                  <a href="tel:+917023318111" className="text-xs text-brand-orange font-bold hover:underline">
                    +91-7023318111
                  </a>
                  <span className="text-white/30 mx-1.5">|</span>
                  <a href="tel:+919664471637" className="text-xs text-slate-200 hover:underline">
                    9664471637
                  </a>
                </div>

                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Shield className="w-3 h-3" />
                    Zero Spam Policy
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-brand-orange" />
                    Direct Senior SDE
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
