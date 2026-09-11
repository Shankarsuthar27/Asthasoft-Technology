import React from 'react';
import { Award, ShieldCheck, Star, Cloud } from 'lucide-react';

interface SocialProofBarProps {
  onOpenScopingModal?: (serviceTitle?: string) => void;
}

export const SocialProofBar: React.FC<SocialProofBarProps> = ({ onOpenScopingModal }) => {
  return (
    <div className="bg-white border-b border-slate-200/80 py-6 font-body">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        {/* Row 1: Credentials & Certifications */}
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-between gap-4 md:gap-6 text-slate-600 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">CMMI Level 5</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Certified</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">ISO 27001</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Compliant</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-[#0066ff] shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">AWS & Cloud</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Partner</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 block sm:inline">4.9 / 5 Rating</span>
              <span className="text-slate-400 text-[11px] sm:text-xs block sm:inline sm:ml-1">Clutch</span>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-2 pt-1 md:pt-0">
            <span className="text-base">🚀</span>
            <span className="font-semibold text-slate-800">500+ Deployments Worldwide</span>
          </div>
        </div>

        {/* Row 2: Sub-Brand Products Bar matching reference image */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          {/* Header Line */}
          <div className="text-xs sm:text-[13px] md:text-sm mb-2.5 leading-snug">
            <span className="font-bold text-slate-900">AsthaSMS | AsthaHost | AsthaPay</span>
            <span className="text-[#0066ff] font-medium ml-1.5">
              – Proud sub-brand products of Asthasoft Technologies Private Limited.
            </span>
          </div>

          {/* Sub-Brands 3-Column Card */}
          <div className="bg-[#f1f1f1] border border-slate-200/90 rounded-md sm:rounded-lg p-4 sm:p-5 md:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {/* Product 1: AsthaSMS */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="h-10 sm:h-12 flex items-center mb-2.5">
                    <img
                      src="/brands/astha-sms.png"
                      alt="AsthaSMS - Fast, Secure & Scalable Messaging Solutions"
                      className="max-h-10 sm:max-h-11 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Empowering business communication with Bulk SMS, Voice Calls, OTP, RCS and Business WhatsApp API solutions.{' '}
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0066ff] hover:underline font-medium inline-block"
                      title="Learn more about AsthaSMS"
                      onClick={(e) => {
                        if (onOpenScopingModal) {
                          // Allow opening scoping modal as well if clicked with modifier or standard click
                        }
                      }}
                    >
                      More...
                    </a>
                  </p>
                </div>
              </div>

              {/* Product 2: AsthaHost */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="h-10 sm:h-12 flex items-center mb-2.5">
                    <img
                      src="/brands/astha-host.png"
                      alt="AsthaHOST - Reliable Web Hosting & Cloud Servers"
                      className="max-h-10 sm:max-h-11 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Providing reliable hosting solutions including Web Hosting, Cloud Servers, Domain Registration, Business Email and VPS services.{' '}
                    <a
                      href=""
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0066ff] hover:underline font-medium inline-block"
                      title="Learn more about AsthaHost"
                    >
                      More...
                    </a>
                  </p>
                </div>
              </div>

              {/* Product 3: AsthaPay */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="h-10 sm:h-12 flex items-center mb-2.5">
                    <img
                      src="/brands/astha-pay.png"
                      alt="AsthaPay - Complete B2B Fintech Solutions"
                      className="max-h-10 sm:max-h-11 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    Delivering complete B2B fintech solutions including Recharge, AEPS, Aadhaar Pay, Money Transfer, mATM, BBPS and Ticket Booking services.{' '}
                    <a
                      href="https://asthapay.in"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0066ff] hover:underline font-medium inline-block"
                      title="Learn more about AsthaPay"
                    >
                      More...
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
