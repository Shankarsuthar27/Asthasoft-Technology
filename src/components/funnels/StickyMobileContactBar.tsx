import React from 'react';
import { Phone } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';

interface StickyMobileContactBarProps {
  isHidden?: boolean;
}

export const StickyMobileContactBar: React.FC<StickyMobileContactBarProps> = ({ isHidden = false }) => {
  if (isHidden) return null;

  const whatsappNumber = '917023318111';
  const whatsappText = encodeURIComponent(
    'Hello Asthasoft Technologies, I would like to discuss our software project requirements.'
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappText}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex items-stretch h-12 shadow-2xl select-none">
      {/* Call Now Button: Vibrant Blue matching screenshot */}
      <a
        href="tel:+917023318111"
        className="w-1/2 bg-[#0066ff] hover:bg-[#0052cc] text-white flex items-center justify-center gap-2 font-bold text-sm border-r border-white/20 active:opacity-90 transition-all cursor-pointer"
        aria-label="Call Now"
      >
        <Phone className="w-4 h-4 fill-white text-white rotate-[-12deg]" />
        <span>Call Now</span>
      </a>

      {/* WhatsApp Button: WhatsApp Green matching screenshot */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 bg-[#25d366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 font-bold text-sm active:opacity-90 transition-all cursor-pointer"
        aria-label="WhatsApp"
      >
        <IconBrandWhatsapp size={19} stroke={2.2} className="text-white fill-white/20" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
};

