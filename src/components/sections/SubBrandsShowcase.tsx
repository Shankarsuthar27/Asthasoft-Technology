import React from 'react';

interface SubBrandsShowcaseProps {
  onOpenScopingModal?: (serviceTitle?: string) => void;
}

export const SubBrandsShowcase: React.FC<SubBrandsShowcaseProps> = ({ onOpenScopingModal }) => {
  return (
    <section className="bg-white border-b border-slate-200/80 py-12 sm:py-16 font-body">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6">
        
        {/* Header Line - Centered */}
        <div className="text-center mb-8 sm:mb-10 flex flex-col items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0066ff] text-xs font-bold uppercase tracking-wider mb-2.5 border border-blue-100 shadow-xs">
            <span>Enterprise Product Ecosystem</span>
          </div>
          <h2 className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl md:text-2xl">
            <span className="text-[#0066ff]">AsthaSMS</span>
            <span className="text-slate-300 mx-2 sm:mx-2.5 font-normal">|</span>
            <span className="text-[#059669]">AsthaHost</span>
            <span className="text-slate-300 mx-2 sm:mx-2.5 font-normal">|</span>
            <span className="text-[#2563eb]">AsthaPay</span>
          </h2>
          <p className="text-[#0066ff] font-semibold text-xs sm:text-[14px] md:text-base mt-1.5 max-w-2xl">
            – Proud sub-brand products of Asthasoft Technologies Private Limited.
          </p>
        </div>

        {/* Sub-Brands 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          
          {/* Product 1: AsthaSMS */}
          <div className="group relative bg-gradient-to-b from-white to-blue-50/20 border border-slate-200/90 hover:border-blue-300 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Logo & Category Pill */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="h-13 sm:h-14 flex items-center bg-white px-3.5 py-2 rounded-xl border border-slate-100 shadow-xs">
                  <img
                    src="/brands/astha-sms-transparent.png"
                    alt="AsthaSMS - Fast, Secure & Scalable Messaging Solutions"
                    className="max-h-10 sm:max-h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
                  Telecom & RCS
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3.5">
                Empowering business communication with Bulk SMS, Voice Calls, OTP, RCS and Business WhatsApp API solutions.{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenScopingModal?.('AsthaSMS Solutions Inquiry');
                  }}
                  className="text-[#0066ff] hover:text-[#0052cc] font-bold hover:underline inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                  title="Learn more about AsthaSMS"
                >
                  [More...]
                </a>
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Bulk SMS', 'Voice Calls', 'Fast OTP', 'RCS', 'WhatsApp API'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200/60 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Action */}
            <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                ⚡ <span>Sub-3s OTP Delivery</span>
              </span>
              <button
                type="button"
                onClick={() => onOpenScopingModal?.('AsthaSMS Solutions Inquiry')}
                className="font-bold text-[#0066ff] hover:text-[#0052cc] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
              >
                Explore SMS <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Product 2: AsthaHost */}
          <div className="group relative bg-gradient-to-b from-white to-emerald-50/20 border border-slate-200/90 hover:border-emerald-300 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Logo & Category Pill */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="h-13 sm:h-14 flex items-center bg-white px-3.5 py-2 rounded-xl border border-slate-100 shadow-xs">
                  <img
                    src="/brands/astha-host-transparent.png"
                    alt="AsthaHOST - Reliable Web Hosting & Cloud Servers"
                    className="max-h-10 sm:max-h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                  Cloud & Hosting
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3.5">
                Providing reliable hosting solutions including Web Hosting, Cloud Servers, Domain Registration, Business Email and VPS services.{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenScopingModal?.('AsthaHost Infrastructure Inquiry');
                  }}
                  className="text-[#0066ff] hover:text-[#0052cc] font-bold hover:underline inline-flex items-center gap-0.5 transition-colors cursor-pointer"
                  title="Learn more about AsthaHost"
                >
                  [More...]
                </a>
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['Web Hosting', 'Cloud Servers', 'Domains', 'Business Email', 'VPS'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200/60 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Action */}
            <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                🛡️ <span>99.99% Uptime SLA</span>
              </span>
              <button
                type="button"
                onClick={() => onOpenScopingModal?.('AsthaHost Infrastructure Inquiry')}
                className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
              >
                Explore Hosting <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Product 3: AsthaPay */}
          <div className="group relative bg-gradient-to-b from-white to-indigo-50/20 border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Logo & Category Pill */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="h-13 sm:h-14 flex items-center bg-white px-3.5 py-2 rounded-xl border border-slate-100 shadow-xs">
                  <img
                    src="/brands/astha-pay-transparent.png"
                    alt="AsthaPay - Complete B2B Fintech Solutions"
                    className="max-h-10 sm:max-h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                  B2B Fintech
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3.5">
                Delivering complete B2B fintech solutions including Recharge, AEPS, Aadhaar Pay, Money Transfer, mATM, BBPS and Ticket Booking services.{' '}
                <a
                  href="https://asthapay.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0066ff] hover:text-[#0052cc] font-bold hover:underline inline-flex items-center gap-0.5 transition-colors"
                  title="Learn more about AsthaPay"
                >
                  [More...]
                </a>
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {['AEPS', 'Aadhaar Pay', 'Money Transfer', 'mATM', 'BBPS', 'Recharge'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200/60 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Action */}
            <div className="pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                💳 <span>Instant Settlement</span>
              </span>
              <a
                href="https://asthapay.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-700 hover:text-indigo-800 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
              >
                Visit AsthaPay.in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
