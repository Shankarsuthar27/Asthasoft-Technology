import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';

interface ExitIntentPromoBannerProps {
  onClaimOffer: (source: string) => void;
}

const STORAGE_KEY = 'asthasoft_promo_dismissed_until';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const ExitIntentPromoBanner: React.FC<ExitIntentPromoBannerProps> = ({
  onClaimOffer,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed within 7 days
    try {
      const dismissedUntil = localStorage.getItem(STORAGE_KEY);
      if (dismissedUntil && Number(dismissedUntil) > Date.now()) {
        return;
      }
    } catch (e) {
      // Ignore localStorage errors
    }

    let hasTriggered = false;

    // 1. Exit intent detection (cursor moving up out of browser viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 15 && !hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
      }
    };

    // 2. Inactivity timer: 45 seconds of no interaction
    let inactivityTimer = setTimeout(() => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
      }
    }, 45000);

    const resetInactivity = () => {
      if (!hasTriggered) {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          if (!hasTriggered) {
            hasTriggered = true;
            setIsVisible(true);
          }
        }, 45000);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', resetInactivity, { passive: true });
    window.addEventListener('keydown', resetInactivity, { passive: true });
    window.addEventListener('scroll', resetInactivity, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', resetInactivity);
      window.removeEventListener('keydown', resetInactivity);
      window.removeEventListener('scroll', resetInactivity);
      clearTimeout(inactivityTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + SEVEN_DAYS_MS));
    } catch (e) {
      // Storage fallback
    }
  };

  const handleAccept = () => {
    handleDismiss();
    onClaimOffer('Exit Intent Promo: $2,500 Audit Voucher');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div id="promoPopup" className="fixed inset-0 z-50 flex items-center justify-center p-4 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Banner Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            className="relative w-full max-w-lg bg-gradient-to-br from-dark-charcoal via-dark-card to-dark-surface border-2 border-brand-orange/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-brand-orange/20 z-10 overflow-hidden text-center"
          >
            {/* Background glowing sphere */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-brand-orange/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

            {/* Close */}
            <button
              onClick={handleDismiss}
              aria-label="Close offer"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon badge */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-deep text-white flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-orange/30">
              <Gift className="w-8 h-8 animate-bounce" />
            </div>

            {/* Exclusive tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Before You Go — Executive Voucher</span>
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-snug mb-2">
              Claim a Complimentary <span className="text-gradient-orange">$2,500 Architectural Audit</span> & AI Roadmap
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-md mx-auto">
              Meet 1-on-1 with our Principal Engineering Lead to evaluate your system bottlenecks, scalability limits, and custom AI agent feasibility.
            </p>

            {/* Checkmark Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mb-6 bg-white/[0.03] border border-white/10 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Sales Push</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Signed Mutual NDA</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cloud Cost Optimization</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom PoC Blueprint</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleAccept}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-bright hover:from-brand-orange-bright hover:to-orange-500 text-white font-heading font-bold text-sm shadow-xl shadow-brand-orange/30 flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all"
              >
                <span>Claim Free Audit & Reserve SDE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="text-xs text-slate-400 hover:text-slate-200 py-1 transition-colors"
              >
                No thanks, I prefer standard scoping later.
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
