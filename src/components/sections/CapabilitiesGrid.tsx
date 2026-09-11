import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CapabilitiesGridProps {
  onOpenScopingModal: (source?: string) => void;
}

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({
  onOpenScopingModal,
}) => {
  const capabilities = [
    {
      id: 'custom-software',
      title: 'Custom Software',
      desc: 'We build custom software products for web, mobile, and desktop platforms.',
      icon: (
        <svg className="w-10 h-10 text-[#0066ff]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="8" width="30" height="26" rx="4" />
          <path d="M14 18l-4 4 4 4" />
          <path d="M22 18l4 4-4 4" />
          <path d="M19 16l-2 12" />
          <circle cx="34" cy="34" r="7" />
          <path d="M34 29v2m0 6v2m-5-5h2m6 0h2" />
        </svg>
      ),
    },
    {
      id: 'product-engineering',
      title: 'Product Engineering',
      desc: 'We support market-disrupting business ideas with bespoke app development.',
      icon: (
        <svg className="w-10 h-10 text-[#0066ff]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6h18l10 10v22a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
          <circle cx="20" cy="22" r="6" />
          <path d="M20 16v6l4 2" />
          <circle cx="35" cy="35" r="5" />
          <path d="M35 32v1m0 4v1m-3-3h1m4 0h1" />
        </svg>
      ),
    },
    {
      id: 'enterprise-systems',
      title: 'Enterprise Systems',
      desc: 'We optimize enterprise operations with intelligent workflow development.',
      icon: (
        <svg className="w-10 h-10 text-[#0066ff]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="10" width="18" height="12" rx="3" />
          <rect x="22" y="24" width="20" height="16" rx="3" />
          <line x1="8" y1="16" x2="26" y2="16" />
          <circle cx="12" cy="13" r="1" fill="currentColor" />
          <circle cx="15" cy="13" r="1" fill="currentColor" />
          <circle cx="18" cy="32" r="5" />
          <path d="M18 29v1m0 4v1m-3-3h1m4 0h1" />
        </svg>
      ),
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      desc: 'We combine aesthetics and simplicity for an engaging user experience.',
      icon: (
        <svg className="w-10 h-10 text-[#0066ff]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="14" cy="14" r="3" fill="currentColor" />
          <circle cx="14" cy="28" r="3" fill="currentColor" />
          <circle cx="28" cy="14" r="3" fill="currentColor" />
          <circle cx="28" cy="28" r="3" fill="currentColor" />
          <path d="M8 20h24M20 8v24" stroke="currentColor" strokeDasharray="3 3" />
        </svg>
      ),
    },
    {
      id: 'blockchain',
      title: 'Blockchain',
      desc: 'We build decentralized ecosystems with tamper-proof data integrity and transparency.',
      icon: (
        <svg className="w-10 h-10 text-[#0066ff]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 6l14 8v16l-14 8-14-8V14L24 6z" />
          <path d="M24 22l14-8M24 22v18M24 22L10 14" />
          <circle cx="24" cy="6" r="3" fill="#0066ff" />
          <circle cx="38" cy="14" r="3" fill="#0066ff" />
          <circle cx="38" cy="30" r="3" fill="#0066ff" />
          <circle cx="24" cy="38" r="3" fill="#0066ff" />
          <circle cx="10" cy="30" r="3" fill="#0066ff" />
          <circle cx="10" cy="14" r="3" fill="#0066ff" />
        </svg>
      ),
    },
    {
      id: 'cloud-engineering',
      title: 'Cloud Engineering',
      desc: 'We ensure zero performance lag with cloud-native architecture development.',
      icon: (
        <svg className="w-10 h-10 text-[#0066ff]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 34a8 8 0 0 1-2-15.7A12 12 0 0 1 32 14a10 10 0 0 1 8 9.5A8 8 0 0 1 36 34H12z" />
          <circle cx="24" cy="28" r="4" />
          <path d="M24 22v2m0 8v2m-5-5h2m6 0h2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="capabilities" className="py-12 sm:py-20 lg:py-24 bg-[#edf2f8] font-body">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* Large White Container with 3x2 Grid separated by borders, exact duplicate of Image 2 */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/70 border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {/* Row 1 */}
            {capabilities.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-[#fafcff] transition-colors group cursor-pointer"
                onClick={() => onOpenScopingModal(`Capability: ${item.title}`)}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#0066ff] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Explore More link matching Image 2 */}
                <div className="pt-5 sm:pt-6">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0066ff] group-hover:gap-2.5 transition-all">
                    <span>Explore More</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Row 2 */}
              {capabilities.slice(3, 6).map((item) => (
                <div
                  key={item.id}
                  className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between hover:bg-[#fafcff] transition-colors group cursor-pointer"
                  onClick={() => onOpenScopingModal(`Capability: ${item.title}`)}
                >
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 group-hover:text-[#0066ff] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Explore More link matching Image 2 */}
                  <div className="pt-5 sm:pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0066ff] group-hover:gap-2.5 transition-all">
                      <span>Explore More</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
