import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Check,
  Clock,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { LeadSchema, type LeadFormData } from './LeadSchema';
import { submitEnquiry } from '../../services/firebase';
import { sendLeadEmailNotification } from '../../services/emailService';

interface GlobalScopingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSource?: string;
}

interface MathProblem {
  num1: number;
  num2: number;
  operator: '+' | '-' | '×';
  answer: number;
}

const COUNTRY_OPTIONS = [
  { code: '+91', name: 'India', flag: '🇮🇳', placeholder: '7123 4567890' },
  { code: '+1', name: 'USA', flag: '🇺🇸', placeholder: '7123 4567890' },
  { code: '+971', name: 'UAE', flag: '🇦🇪', placeholder: '50 123 4567' },
  { code: '+44', name: 'UK', flag: '🇬🇧', placeholder: '7911 123456' },
  { code: '+61', name: 'Australia', flag: '🇦🇺', placeholder: '412 345 678' },
  { code: '+49', name: 'Germany', flag: '🇩🇪', placeholder: '151 23456789' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬', placeholder: '8123 4567' },
];

export const GlobalScopingModal: React.FC<GlobalScopingModalProps> = ({
  isOpen,
  onClose,
  initialSource = 'Talk to an expert CTA',
}) => {
  const [mathProblem, setMathProblem] = useState<MathProblem>({
    num1: 2,
    num2: 2,
    operator: '×',
    answer: 4,
  });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0]);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    ticketId: string;
    message: string;
  } | null>(null);

  // Generate arithmetic problem matching screenshot (e.g. 2 x 2 = 4)
  const generateMathProblem = () => {
    const op = Math.random();
    if (op < 0.4) {
      const n1 = Math.floor(Math.random() * 4) + 2;
      const n2 = Math.floor(Math.random() * 4) + 2;
      setMathProblem({ num1: n1, num2: n2, operator: '×', answer: n1 * n2 });
    } else if (op < 0.7) {
      const n1 = Math.floor(Math.random() * 10) + 10;
      const n2 = Math.floor(Math.random() * 6) + 1;
      setMathProblem({ num1: n1, num2: n2, operator: '-', answer: n1 - n2 });
    } else {
      const n1 = Math.floor(Math.random() * 10) + 2;
      const n2 = Math.floor(Math.random() * 10) + 2;
      setMathProblem({ num1: n1, num2: n2, operator: '+', answer: n1 + n2 });
    }
    setCaptchaError(null);
  };

  useEffect(() => {
    if (isOpen) {
      generateMathProblem();
      setSubmissionSuccess(null);
      setCaptchaError(null);
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: selectedCountry.code,
      phone: '',
      service: 'Custom Enterprise Software',
      projectDescription: '',
      ndaRequested: true,
      source: initialSource,
    },
  });

  const handleCountryChange = (code: string) => {
    const found = COUNTRY_OPTIONS.find((c) => c.code === code) || COUNTRY_OPTIONS[0];
    setSelectedCountry(found);
    setValue('countryCode', found.code);
  };

  const onSubmit = async (data: LeadFormData) => {
    if (Number(data.mathCaptchaAnswer) !== mathProblem.answer) {
      setCaptchaError(
        `Incorrect captcha answer (${data.mathCaptchaAnswer}). Please calculate: ${mathProblem.num1} ${mathProblem.operator} ${mathProblem.num2}`
      );
      generateMathProblem();
      return;
    }

    setCaptchaError(null);
    setIsSubmitting(true);

    try {
      const response = await submitEnquiry({
        ...data,
        source: initialSource,
      });

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0066ff', '#1d4ed8', '#10b981', '#ff5421'],
        });
      } catch (e) {
        // Fallback
      }

      setSubmissionSuccess({
        ticketId: response.enquiryId,
        message: response.message,
      });

      // Dispatch real-time email notification to admin via Resend API
      sendLeadEmailNotification({
        fullName: data.fullName,
        email: data.email,
        countryCode: selectedCountry.code,
        phone: data.phone,
        service: data.service || 'Custom Enterprise Software',
        projectDescription: data.projectDescription,
        ndaRequested: Boolean(data.ndaRequested),
        source: initialSource || 'Request a Scoping Session Modal',
        ticketId: response.enquiryId,
      }).catch((emailErr) => {
        console.warn('Background admin email dispatch error:', emailErr);
      });

      reset();
    } catch (err: any) {
      console.error('Submission failed:', err);
      setCaptchaError('Transmission failed. Please email sales@asthasoftindia.com directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="popup"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-[480px] lg:max-w-[940px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto font-body border border-slate-200/50 max-h-[92vh] overflow-y-auto"
          >
            {submissionSuccess ? (
              /* Success Confirmation Screen */
              <div className="p-6 sm:p-12 text-center space-y-6 max-w-lg mx-auto py-12 sm:py-16">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <ShieldCheck className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded bg-blue-100 text-[#1d4ed8]">
                    TICKET #{submissionSuccess.ticketId}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
                    Scoping Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {submissionSuccess.message}
                  </p>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Cryptographic NDA Automatically Queued</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                    <span>Asthasoft Senior Architect will respond within 24 hours.</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-[#1d4ed8] text-white font-heading font-semibold text-sm hover:bg-[#1e40af] transition-all cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            ) : (
              /* Exact Dual Panel Layout on Desktop, Single Clean White Panel on Mobile */
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Dark Cyber Graphic Panel (Visible on Desktop only) */}
                <div className="hidden lg:flex lg:col-span-5 relative p-7 lg:p-9 flex-col justify-between overflow-hidden bg-[#071126] text-white">
                  {/* Cybernetic Handshake Background Graphic */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none"
                    style={{ backgroundImage: "url('/cyber_handshake.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071126] via-[#071126]/75 to-transparent pointer-events-none" />

                  {/* Top Text */}
                  <div className="relative z-10">
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 block mb-2 sm:mb-3">
                      GET IN TOUCH
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight">
                      Switch to Intelligent Workflows with A Smart Strategy.
                    </h3>
                  </div>

                  {/* Middle: Handshake Visual Space */}
                  <div className="relative z-10 my-4 sm:my-8 py-1 sm:py-2">
                    <div className="w-full h-32 rounded-xl overflow-hidden relative border border-white/10 shadow-lg">
                      <img
                        src="/cyber_handshake.jpg"
                        alt="Human AI Handshake"
                        className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#071126]/60 to-transparent" />
                    </div>
                  </div>

                  {/* Bottom: 5 Trust Checkmarks matching Screenshot */}
                  <div className="relative z-10 space-y-2 sm:space-y-2.5 pt-3 sm:pt-0">
                    {[
                      'No Sales Pressures.',
                      'Direct Assistance from Senior SDEs.',
                      'Fast Response within <4h.',
                      'Follow-the-Sun Model',
                      'NDA Assurance From Day 1.',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-[13px] text-slate-100 font-medium leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Clean White Form Panel matching Screenshot exactly */}
                <div className="w-full lg:col-span-7 p-5 sm:p-7 lg:p-9 bg-white relative flex flex-col justify-between">
                  {/* Close Button at top right */}
                  {/* Close Button at top right matching screenshot */}
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer z-20"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    {/* Header */}
                    <div className="pr-8 mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        Request a Scoping Session
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1.5 leading-relaxed">
                        Share your project scope and our strategic consultants will respond with technical insights within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Name * */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register('fullName')}
                          className={`w-full pb-2 pt-1 border-b text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors ${
                            errors.fullName
                              ? 'border-red-500'
                              : 'border-slate-200 focus:border-[#1d4ed8]'
                          }`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-red-500 mt-1">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      {/* Email * and Contact Number * in 2 Columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email * */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="john@company.com"
                            {...register('email')}
                            className={`w-full pb-2 pt-1 border-b text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors ${
                              errors.email
                                ? 'border-red-500'
                                : 'border-slate-200 focus:border-[#1d4ed8]'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-[11px] text-red-500 mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Contact Number * with Flag Selector */}
                        <div>
                          <label className="block text-xs font-bold text-slate-800 mb-1">
                            Contact Number <span className="text-red-500">*</span>
                          </label>
                          <div
                            className={`flex items-center gap-1.5 pb-2 pt-1 border-b transition-colors ${
                              errors.phone
                                ? 'border-red-500'
                                : 'border-slate-200 focus-within:border-[#1d4ed8]'
                            }`}
                          >
                            <select
                              value={selectedCountry.code}
                              onChange={(e) => handleCountryChange(e.target.value)}
                              aria-label="Country Code"
                              className="text-xs text-slate-700 bg-transparent outline-none cursor-pointer pr-1 shrink-0 font-medium"
                            >
                              {COUNTRY_OPTIONS.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.flag} {c.code}
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              placeholder={selectedCountry.placeholder}
                              {...register('phone')}
                              className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-[11px] text-red-500 mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Project Description (How can we help?) * */}
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          Project Description (How can we help?) <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Brief us About Your Requirements."
                          {...register('projectDescription')}
                          className={`w-full pb-2 pt-1 border-b text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none transition-colors ${
                            errors.projectDescription
                              ? 'border-red-500'
                              : 'border-slate-200 focus:border-[#1d4ed8]'
                          }`}
                        />
                        {errors.projectDescription && (
                          <p className="text-[11px] text-red-500 mt-0.5">
                            {errors.projectDescription.message}
                          </p>
                        )}
                      </div>

                      {/* NDA Checkbox matching Screenshot */}
                      <div className="pt-1">
                        <label className="flex items-start gap-2.5 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            defaultChecked
                            {...register('ndaRequested')}
                            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#1d4ed8] focus:ring-[#1d4ed8] cursor-pointer"
                          />
                          <span className="text-xs text-slate-600 leading-snug">
                            Request NDA (Non-Disclosure Agreement) before sharing specific technical requirements.
                          </span>
                        </label>
                      </div>

                      {/* Bottom Row: Security Check and Submit Button matching Screenshot */}
                      <div className="pt-2 space-y-3">
                        {/* Security Check Box */}
                        <div className="border border-slate-200 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50/70 flex items-center justify-between text-xs font-mono font-bold text-slate-700 select-none">
                          <span className="text-[11px] sm:text-xs tracking-tight uppercase">
                            SECURITY CHECK: {mathProblem.num1} {mathProblem.operator} {mathProblem.num2} =
                          </span>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder=""
                              {...register('mathCaptchaAnswer', { valueAsNumber: true })}
                              className="w-14 h-8 sm:h-9 rounded border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 text-center outline-none focus:border-[#1a44a5]"
                            />
                            <button
                              type="button"
                              onClick={generateMathProblem}
                              title="Refresh equation"
                              className="p-1 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Submit Request Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-3 sm:py-3.5 rounded-lg bg-[#1a44a5] hover:bg-[#15368a] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Request</span>
                              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                            </>
                          )}
                        </button>
                      </div>

                      {captchaError && (
                        <p className="text-[11px] text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {captchaError}
                        </p>
                      )}
                      {errors.mathCaptchaAnswer && (
                        <p className="text-[11px] text-red-500">
                          {errors.mathCaptchaAnswer.message}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
