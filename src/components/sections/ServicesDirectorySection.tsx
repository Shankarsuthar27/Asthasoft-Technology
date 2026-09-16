import React from 'react';
import { IconHandFingerRight } from '@tabler/icons-react';
import { navigateTo } from '../../utils/navigation';

interface DirectoryColumn {
  title: string;
  items: {
    label: string;
    path?: string;
  }[];
}

const directoryData: DirectoryColumn[] = [
  {
    title: 'Custom Software Development (Enterprise)',
    items: [
      { label: 'Custom Software Development Company for Enterprises', path: '/custom-software-development' },
      { label: 'Hire Dedicated Custom Software Development Team' },
      { label: 'Bespoke Business Software Development Services' },
      { label: 'Custom SaaS Application Development Agency' },
      { label: 'Legacy Software Modernization Company' },
      { label: 'Cloud Native Software Development Services' },
      { label: 'Microservices Architecture Development Agency' },
      { label: 'Custom API Integration and Development Services' },
      { label: 'Enterprise Workflow Automation Software Developers' },
      { label: 'Enterprise Custom Software Development Services' },
    ],
  },
  {
    title: 'Mobile App Engineering & Platforms',
    items: [
      { label: 'Cross Platform Mobile App Development Company', path: '/mobile-app-development-company' },
      { label: 'Enterprise iOS and Android App Development Services' },
      { label: 'React Native App Development Company' },
      { label: 'React Native Mobile App Development Services' },
      { label: 'Flutter Mobile Application Development Agency' },
      { label: 'MVP Mobile App Development for Startups' },
      { label: 'Mobile App Development Cost Breakdown for Business' },
      { label: 'Hire Offshore Mobile App Developers' },
      { label: 'B2B Mobile App Development Agency' },
    ],
  },
  {
    title: 'FinTech Software & Digital Banking',
    items: [
      { label: 'FinTech App Development Company' },
      { label: 'FinTech Software Development Company' },
      { label: 'White Label Digital Banking Software Development' },
      { label: 'Custom Digital Wallet Application Development' },
      { label: 'White Label Digital Wallet App Development' },
      { label: 'Core Banking System Software Development' },
      { label: 'Turnkey Neo Banking Software Solutions' },
      { label: 'Custom Payment Gateway Integration Services' },
      { label: 'P2P Lending Software Development Company' },
      { label: 'PCI DSS Compliant Software Development Agency' },
      { label: 'Open Banking API Development Services' },
      { label: 'Crypto Wallet and Trading Platform Development' },
      { label: 'How Much Does It Cost to Build a FinTech App' },
    ],
  },
  {
    title: 'Regional Pods & Global Delivery',
    items: [
      { label: 'Custom Software Development Company in Delhi NCR' },
      { label: 'Custom Software Development Company in Bangalore' },
      { label: 'Custom Software Development Company in Noida', path: '/custom-software-development' },
      { label: 'Custom Software Development Company in Hyderabad' },
      { label: 'Custom Software Development Company in Mumbai' },
      { label: 'Custom Software Development Company in Dubai' },
      { label: 'Custom Software Development Company in USA & Global' },
      { label: 'Off-Shore App Development Company', path: '/mobile-app-development-company' },
      { label: 'Web Development Company in Noida' },
      { label: 'Mobile App Development Company in India' },
    ],
  },
];

interface ServicesDirectorySectionProps {
  onOpenScopingModal?: (source?: string) => void;
}

export const ServicesDirectorySection: React.FC<ServicesDirectorySectionProps> = ({
  onOpenScopingModal,
}) => {
  const handleClick = (e: React.MouseEvent, item: { label: string; path?: string }) => {
    e.preventDefault();
    if (item.path) {
      navigateTo(item.path);
    } else if (onOpenScopingModal) {
      onOpenScopingModal(`Directory: ${item.label}`);
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#1b104c] via-[#211463] to-[#180c45] border-t border-white/10 text-white font-sans py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle ambient glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1340px] mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {directoryData.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Category Header with Pointing Hand */}
              <div className="flex items-center gap-2.5 pb-2.5 mb-4 border-b border-white/20">
                <IconHandFingerRight
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0 drop-shadow-sm"
                  stroke={1.8}
                />
                <h3 className="text-white font-bold text-[14.5px] sm:text-[15.5px] tracking-wide leading-tight">
                  {col.title}
                </h3>
              </div>

              {/* Links List */}
              <ul className="space-y-2 sm:space-y-2.5">
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href={item.path || '#'}
                      onClick={(e) => handleClick(e, item)}
                      className="group flex items-center gap-2 text-[12.5px] sm:text-[13px] text-slate-200 hover:text-white transition-colors duration-150 cursor-pointer"
                    >
                      <span className="text-slate-300 font-bold group-hover:text-white group-hover:translate-x-0.5 transition-transform duration-150 shrink-0 text-sm">
                        &rarr;
                      </span>
                      <span className="leading-snug group-hover:underline underline-offset-2">
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
