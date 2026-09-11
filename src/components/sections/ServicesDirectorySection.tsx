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
    title: 'App Development By Location',
    items: [
      { label: 'Mobile App Development Company', path: '/mobile-app-development-company' },
      { label: 'Off-Shore App Development Company' },
      { label: 'App Development Company in Delhi' },
      { label: 'App Development Company in Noida' },
      { label: 'App Development Company in Gurgaon' },
      { label: 'App Development Company in Chandigarh' },
      { label: 'App Development Company in Lucknow' },
      { label: 'App Development Company in Chennai' },
      { label: 'App Development Company in Bangalore' },
      { label: 'App Development Company in Hyderabad' },
      { label: 'App Development Company in Patna' },
      { label: 'App Development Company in Dubai' },
      { label: 'App Development Company in Agra' },
    ],
  },
  {
    title: 'App Development By Technology',
    items: [
      { label: 'Android App Development Company' },
      { label: 'iOS App Development Company' },
      { label: 'Flutter App Development Company' },
      { label: 'React Native App Development Company' },
    ],
  },
  {
    title: 'Website Design & Development Services',
    items: [
      { label: 'Web Development Company in Noida', path: '/custom-software-development' },
      { label: 'Web Design Company in Noida' },
    ],
  },
  {
    title: 'Digital Marketing Services',
    items: [
      { label: 'SEO Company in Noida' },
      { label: 'SEO Company in Delhi' },
      { label: 'SEO Company in Agra' },
      { label: 'SEO Company in Gurgaon' },
      { label: 'PPC Company in Noida' },
      { label: 'ORM Company in Noida' },
      { label: 'Social Media Company in Noida' },
      { label: 'Content Writing Company in Noida' },
      { label: 'Guest Post Company in Noida' },
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
