import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Shield, Cpu, ChevronRight } from 'lucide-react';

interface PageEntranceAnimationProps {
  onComplete?: () => void;
}

export const PageEntranceAnimation: React.FC<PageEntranceAnimationProps> = ({
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [statusText, setStatusText] = useState('Booting Neural Clusters...');

  useEffect(() => {
    // Fast, high-energy progress counter (completes in ~1.1 seconds)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        const next = Math.min(prev + increment, 100);

        if (next < 35) {
          setStatusText('Verifying Cloud Infrastructure...');
        } else if (next < 70) {
          setStatusText('Loading AI Autonomous Modules...');
        } else if (next < 95) {
          setStatusText('Calibrating Enterprise Systems...');
        } else {
          setStatusText('Systems Operational · Welcome to Asthasoft');
        }

        return next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Handle escape key to skip immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="entrance-curtain"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050c1b] text-white overflow-hidden font-body select-none"
        >
          {/* Cyber Digital Circuit Backdrop */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ambient Radial Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#0066ff]/25 via-cyan-500/10 to-transparent rounded-full blur-3xl opacity-80" />

            {/* Subtle Grid Matrix */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1px, transparent 0)',
                backgroundSize: '36px 36px',
              }}
            />

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-[#0066ff]/15 rounded-br-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#ff5421]/15 rounded-tl-full blur-2xl" />
          </div>

          {/* Skip Button */}
          <button
            onClick={() => {
              setIsVisible(false);
              if (onComplete) onComplete();
            }}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer flex items-center gap-1.5 z-20"
          >
            <span>Skip intro</span>
            <span className="text-[10px] opacity-60">[ESC]</span>
          </button>

          {/* Central Logo & Pulse Showcase */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-md px-4 sm:px-6">
            {/* Logo Emblem Container with Spinning Energy Halo */}
            <div className="relative mb-5 sm:mb-6">
              {/* Outer Spinning Cyan Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 7, ease: 'linear', repeat: Infinity }}
                className="absolute -inset-4 rounded-full border border-dashed border-[#0066ff]/40 pointer-events-none"
              />

              {/* Pulsing Energy Aura */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#0066ff] via-cyan-400 to-[#ff5421] opacity-40 blur-md animate-pulse" />

              {/* Logo Badge */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-2xl shadow-blue-500/30 flex items-center justify-center"
              >
                <img
                  src="/logo.png"
                  alt="Asthasoft Technologies Pvt. Ltd."
                  className="w-full h-full object-contain rounded-full"
                />
              </motion.div>
            </div>

            {/* Typography Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-1 mb-6 sm:mb-8"
            >
              <div className="flex items-center justify-center brand-text">
                <span className="font-bold text-2xl sm:text-3xl text-white">
                  ASTHA
                </span>
                <span className="font-bold text-2xl sm:text-3xl text-[#0066ff]">
                  SOFT
                </span>
                <span className="text-[#0066ff] text-xs font-bold self-start mt-0.5 ml-0.5">
                  ®
                </span>
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                Technologies Pvt. Ltd.
              </span>
            </motion.div>

            {/* Sleek Minimal Progress Telemetry Bar */}
            <div className="w-full max-w-xs space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 flex items-center gap-1.5 truncate pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {statusText}
                </span>
                <span className="text-cyan-400 font-bold shrink-0">
                  {progress}%
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0066ff] via-cyan-400 to-[#ff5421] rounded-full shadow-sm shadow-cyan-400/50"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>

              {/* Verified Trust Tags */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  CMMI Level 5
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-sky-400" />
                  ISO 27001
                </span>
                <span className="text-white/20">·</span>
                <span className="text-amber-400">
                  AI Enterprise
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
