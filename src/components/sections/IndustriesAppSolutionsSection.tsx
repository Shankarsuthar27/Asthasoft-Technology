import React from 'react';
import { motion } from 'framer-motion';

interface IndustriesAppSolutionsSectionProps {
  onOpenScopingModal?: (industryName?: string) => void;
}

interface IndustryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const IndustriesAppSolutionsSection: React.FC<IndustriesAppSolutionsSectionProps> = ({
  onOpenScopingModal,
}) => {
  const industries: IndustryItem[] = [
    // Row 1
    {
      id: 'ai-app',
      name: 'AI App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Chip base */}
          <rect x="14" y="14" width="36" height="36" rx="8" fill="#0f172a" />
          <rect x="18" y="18" width="28" height="28" rx="5" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
          {/* Pins */}
          <path d="M22 14V8M32 14V8M42 14V8M22 56V50M32 56V50M42 56V50M14 22H8M14 32H8M14 42H8M56 22H50M56 32H50M56 42H50" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          {/* AI Text */}
          <text x="32" y="37" fill="#fbbf24" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">AI</text>
        </svg>
      ),
    },
    {
      id: 'astrology-app',
      name: 'Astrology App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="24" fill="#831843" opacity="0.9" />
          <circle cx="32" cy="32" r="20" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="14" stroke="#fb7185" strokeWidth="1" />
          <circle cx="32" cy="32" r="7" fill="#f43f5e" />
          {/* Rays & Stars */}
          <path d="M32 8v48M8 32h48M15 15l34 34M15 49l34-34" stroke="#fda4af" strokeWidth="1.2" opacity="0.75" />
          <circle cx="32" cy="32" r="2" fill="#fff" />
        </svg>
      ),
    },
    {
      id: 'beauty-salon-app',
      name: 'Beauty Salon App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Salon Storefront */}
          <rect x="14" y="24" width="36" height="28" rx="4" fill="#0284c7" />
          {/* Awning */}
          <path d="M12 24h40l-3-8H15l-3 8z" fill="#f43f5e" />
          <rect x="18" y="12" width="28" height="6" rx="2" fill="#fb7185" />
          {/* Door & Window */}
          <rect x="22" y="32" width="10" height="20" rx="2" fill="#38bdf8" />
          <circle cx="40" cy="36" r="6" fill="#f472b6" />
          {/* Scissors Icon */}
          <path d="M38 34l4 4M42 34l-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'dating-app',
      name: 'Dating App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Phone */}
          <rect x="20" y="10" width="24" height="44" rx="6" fill="#1e293b" />
          <rect x="22" y="14" width="20" height="36" rx="3" fill="#ffe4e6" />
          {/* Avatar & Heart */}
          <circle cx="32" cy="25" r="5" fill="#f43f5e" />
          <path d="M26 36c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="#f43f5e" />
          {/* Floating Hearts */}
          <path d="M42 14c-1.5-2-4 0-4 1.8 0 2.2 4 4.2 4 4.2s4-2 4-4.2c0-1.8-2.5-3.8-4-1.8z" fill="#e11d48" />
          <path d="M20 22c-1.2-1.6-3.2 0-3.2 1.4 0 1.8 3.2 3.4 3.2 3.4s3.2-1.6 3.2-3.4c0-1.4-2-3-3.2-1.4z" fill="#f43f5e" />
        </svg>
      ),
    },
    {
      id: 'e-commerce-app',
      name: 'E-Commerce App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Computer Monitor */}
          <rect x="14" y="14" width="36" height="26" rx="4" fill="#334155" />
          <rect x="17" y="17" width="30" height="20" rx="2" fill="#f8fafc" />
          <path d="M28 40l-3 8h14l-3-8" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Shopping Cart on Screen */}
          <path d="M22 23h3l3 8h10l2.5-6H27" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="29" cy="33" r="1.5" fill="#334155" />
          <circle cx="37" cy="33" r="1.5" fill="#334155" />
          <circle cx="32" cy="26" r="3" fill="#f97316" />
        </svg>
      ),
    },
    {
      id: 'entertainment-app',
      name: 'Entertainment App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Clapperboard */}
          <rect x="12" y="24" width="28" height="26" rx="3" fill="#0f172a" />
          <path d="M12 24l28-8v8H12z" fill="#334155" />
          <path d="M16 23l4-4M24 21l4-4M32 19l4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          {/* Popcorn bucket */}
          <path d="M36 28l4 22h14l3-22H36z" fill="#dc2626" />
          <path d="M40 28l2 22M46 28l1 22M52 28l-1 22" stroke="#fff" strokeWidth="2" />
          <circle cx="42" cy="25" r="3" fill="#fef08a" />
          <circle cx="47" cy="24" r="3.5" fill="#fde047" />
          <circle cx="53" cy="26" r="3" fill="#fef08a" />
        </svg>
      ),
    },

    // Row 2
    {
      id: 'education-app',
      name: 'Education App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Graduation Cap */}
          <path d="M32 12l20 8-20 8-20-8 20-8z" fill="#0284c7" />
          <path d="M46 23.5v9c0 4-6.3 7.5-14 7.5s-14-3.5-14-7.5v-9" stroke="#0369a1" strokeWidth="2.5" />
          <path d="M48 20v14" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="35" r="2" fill="#ca8a04" />
          {/* Books */}
          <rect x="18" y="44" width="28" height="6" rx="1.5" fill="#f43f5e" />
          <rect x="22" y="38" width="20" height="6" rx="1.5" fill="#10b981" />
        </svg>
      ),
    },
    {
      id: 'e-learning-app',
      name: 'E-learning App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Laptop display */}
          <rect x="16" y="16" width="32" height="22" rx="3" fill="#1e293b" />
          <rect x="19" y="19" width="26" height="16" rx="1.5" fill="#e0f2fe" />
          {/* Graduation cap on top-right */}
          <path d="M38 12l10 4-10 4-10-4 10-4z" fill="#0284c7" />
          <path d="M46 16v5" stroke="#f59e0b" strokeWidth="1.5" />
          {/* Laptop base */}
          <path d="M10 42h44l-4 6H14l-4-6z" fill="#475569" />
          {/* Screen chart */}
          <path d="M23 30l4-4 4 2 6-6" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'fitness-app',
      name: 'Fitness App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Mobile phone */}
          <rect x="20" y="10" width="24" height="44" rx="6" fill="#0284c7" />
          <rect x="23" y="15" width="18" height="34" rx="3" fill="#f0f9ff" />
          {/* Dumbbell on screen */}
          <path d="M26 31h12M28 27v8M36 27v8M25 28v6M39 28v6" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          {/* Pulse ECG */}
          <path d="M24 23h3l2-3 3 6 2-3h4" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="44" r="2" fill="#38bdf8" />
        </svg>
      ),
    },
    {
      id: 'fintech-app',
      name: 'Fintech App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Phone */}
          <rect x="20" y="10" width="24" height="44" rx="6" fill="#334155" />
          <rect x="22" y="14" width="20" height="36" rx="3" fill="#ecfdf5" />
          {/* Currency coins floating */}
          <circle cx="18" cy="22" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="18" y="25" fill="#854d0e" fontSize="9" fontWeight="bold" textAnchor="middle">$</text>
          <circle cx="45" cy="38" r="6" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <text x="45" y="41" fill="#854d0e" fontSize="9" fontWeight="bold" textAnchor="middle">₹</text>
          {/* Transfer arrow */}
          <path d="M26 30h12m-3-3l3 3-3 3" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'food-delivery-app',
      name: 'Food Delivery App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Delivery Rider Scooter */}
          <circle cx="20" cy="46" r="6" fill="#1e293b" />
          <circle cx="20" cy="46" r="3" fill="#e2e8f0" />
          <circle cx="44" cy="46" r="6" fill="#1e293b" />
          <circle cx="44" cy="46" r="3" fill="#e2e8f0" />
          {/* Scooter Body */}
          <path d="M20 46h16l6-14h-8" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M42 32l-4-10h-6" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          {/* Delivery Box */}
          <rect x="14" y="24" width="12" height="12" rx="2" fill="#f59e0b" />
          {/* Rider Helmet */}
          <circle cx="34" cy="18" r="5" fill="#0284c7" />
          <path d="M30 24c0-2 2-4 5-4" stroke="#0284c7" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'gaming-app',
      name: 'Gaming App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Game Controller */}
          <path d="M16 26c0-6 7-10 16-10s16 4 16 10c0 10-2 22-8 22-4 0-5-6-8-6s-4 6-8 6c-6 0-8-12-8-22z" fill="#6b21a8" />
          {/* D-Pad */}
          <path d="M22 28v6M19 31h6" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
          {/* Action buttons */}
          <circle cx="40" cy="28" r="2" fill="#f43f5e" />
          <circle cx="44" cy="31" r="2" fill="#38bdf8" />
          <circle cx="40" cy="34" r="2" fill="#facc15" />
          <circle cx="36" cy="31" r="2" fill="#4ade80" />
          {/* Center light */}
          <circle cx="32" cy="27" r="2" fill="#fbbf24" />
        </svg>
      ),
    },

    // Row 3
    {
      id: 'grocery-delivery-app',
      name: 'Grocery Delivery App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Brown Grocery Bag */}
          <path d="M16 26l3 26h26l3-26H16z" fill="#d97706" opacity="0.9" />
          <path d="M24 26V18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8" stroke="#b45309" strokeWidth="3" fill="none" />
          {/* Fresh Produce */}
          <circle cx="26" cy="23" r="5" fill="#ef4444" />
          <circle cx="34" cy="20" r="6" fill="#22c55e" />
          <path d="M38 15l6 9-3 3-6-9" fill="#f97316" />
          <circle cx="42" cy="24" r="4" fill="#eab308" />
        </svg>
      ),
    },
    {
      id: 'healthcare-app',
      name: 'Healthcare App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Smartphone */}
          <rect x="20" y="10" width="24" height="44" rx="6" fill="#0f766e" />
          <rect x="23" y="14" width="18" height="34" rx="3" fill="#f0fdfa" />
          {/* Red Medical Cross */}
          <path d="M32 20v8M28 24h8" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          {/* Heartbeat Pulse */}
          <path d="M25 35h3l2-3 3 6 2-3h4" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="43" r="2" fill="#14b8a6" />
        </svg>
      ),
    },
    {
      id: 'home-services-app',
      name: 'Home Services App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* House outline */}
          <path d="M14 30L32 14l18 16v22a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V30z" fill="#0284c7" />
          <path d="M12 30L32 12l20 18" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {/* Door */}
          <rect x="26" y="36" width="12" height="18" rx="2" fill="#f8fafc" />
          {/* Tools: Wrench & Screwdriver */}
          <path d="M29 42l6 6M35 42l-6 6" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'hotel-booking-app',
      name: 'Hotel Booking App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Hotel building */}
          <rect x="18" y="14" width="28" height="40" rx="4" fill="#4338ca" />
          {/* Windows */}
          <rect x="23" y="20" width="5" height="5" rx="1" fill="#fef08a" />
          <rect x="36" y="20" width="5" height="5" rx="1" fill="#fef08a" />
          <rect x="23" y="29" width="5" height="5" rx="1" fill="#fef08a" />
          <rect x="36" y="29" width="5" height="5" rx="1" fill="#fef08a" />
          {/* Entrance & Star */}
          <rect x="29" y="42" width="6" height="12" rx="1" fill="#f8fafc" />
          <polygon points="32,9 33.5,12 37,12.5 34.5,15 35,18.5 32,17 29,18.5 29.5,15 27,12.5 30.5,12" fill="#facc15" />
        </svg>
      ),
    },
    {
      id: 'ludo-game-app',
      name: 'Ludo Game App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Red 3D Dice */}
          <rect x="14" y="14" width="36" height="36" rx="8" fill="#dc2626" />
          {/* White Pips (Die dots: 5 pattern) */}
          <circle cx="23" cy="23" r="3.2" fill="#ffffff" />
          <circle cx="41" cy="23" r="3.2" fill="#ffffff" />
          <circle cx="32" cy="32" r="3.2" fill="#ffffff" />
          <circle cx="23" cy="41" r="3.2" fill="#ffffff" />
          <circle cx="41" cy="41" r="3.2" fill="#ffffff" />
        </svg>
      ),
    },
    {
      id: 'ott-app',
      name: 'OTT App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Smart Screen / TV */}
          <rect x="12" y="16" width="40" height="28" rx="4" fill="#090d16" stroke="#334155" strokeWidth="2" />
          <rect x="15" y="19" width="34" height="22" rx="2" fill="#1e1b4b" />
          {/* Red play triangle */}
          <polygon points="28,25 28,35 38,30" fill="#ef4444" />
          {/* Stand */}
          <path d="M26 44h12l-2 6H28l-2-6z" fill="#475569" />
          {/* Popcorn snack */}
          <circle cx="46" cy="46" r="3" fill="#facc15" />
          <circle cx="43" cy="48" r="2.5" fill="#fde047" />
        </svg>
      ),
    },

    // Row 4
    {
      id: 'pet-care-app',
      name: 'Pet Care App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Cute Dog Face */}
          <ellipse cx="32" cy="34" rx="14" ry="12" fill="#fde68a" />
          {/* Ears */}
          <ellipse cx="19" cy="25" rx="5" ry="9" fill="#d97706" />
          <ellipse cx="45" cy="25" rx="5" ry="9" fill="#d97706" />
          {/* Eyes */}
          <circle cx="27" cy="32" r="2.2" fill="#1e293b" />
          <circle cx="37" cy="32" r="2.2" fill="#1e293b" />
          {/* Nose & Mouth */}
          <ellipse cx="32" cy="37" rx="2.5" ry="1.8" fill="#1e293b" />
          <path d="M30 40c1 1 3 1 4 0" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round" />
          {/* Collar with bone */}
          <rect x="24" y="44" width="16" height="3" rx="1.5" fill="#ef4444" />
          <circle cx="32" cy="48" r="2" fill="#ca8a04" />
        </svg>
      ),
    },
    {
      id: 'political-app',
      name: 'Political App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Parliament / Capitol Building */}
          <polygon points="32,10 16,20 48,20" fill="#334155" />
          <rect x="18" y="20" width="28" height="4" fill="#0284c7" />
          {/* Pillars */}
          <rect x="20" y="24" width="4" height="20" fill="#94a3b8" />
          <rect x="27" y="24" width="4" height="20" fill="#94a3b8" />
          <rect x="34" y="24" width="4" height="20" fill="#94a3b8" />
          <rect x="41" y="24" width="4" height="20" fill="#94a3b8" />
          {/* Steps */}
          <rect x="14" y="44" width="36" height="5" rx="1" fill="#475569" />
          {/* Flag */}
          <path d="M32 6v4" stroke="#ca8a04" strokeWidth="1.5" />
          <polygon points="32,6 38,8 32,10" fill="#ef4444" />
        </svg>
      ),
    },
    {
      id: 'real-estate-app',
      name: 'Real Estate App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* House Structure */}
          <polygon points="32,12 14,26 14,50 50,50 50,26" fill="#b91c1c" />
          <polygon points="32,10 12,26 16,28 32,15 48,28 52,26" fill="#991b1b" />
          {/* Windows */}
          <rect x="20" y="30" width="8" height="8" rx="1" fill="#fef08a" />
          <rect x="36" y="30" width="8" height="8" rx="1" fill="#fef08a" />
          {/* Front Door */}
          <rect x="28" y="38" width="8" height="12" rx="1" fill="#f8fafc" />
          <circle cx="34" cy="44" r="0.8" fill="#334155" />
        </svg>
      ),
    },
    {
      id: 'social-media-app',
      name: 'Social Media App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Smartphone */}
          <rect x="20" y="10" width="24" height="44" rx="6" fill="#3b82f6" />
          <rect x="23" y="14" width="18" height="34" rx="3" fill="#eff6ff" />
          {/* Chat bubbles & Hearts floating around */}
          <circle cx="16" cy="22" r="5" fill="#ec4899" />
          <path d="M14 22l2 2 4-4" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="38" y="16" width="12" height="8" rx="3" fill="#10b981" />
          <circle cx="45" cy="40" r="4.5" fill="#f59e0b" />
          <path d="M26 26h12M26 31h8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'taxi-booking-app',
      name: 'Taxi Booking App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Smartphone */}
          <rect x="18" y="8" width="28" height="48" rx="6" fill="#1e293b" />
          <rect x="21" y="13" width="22" height="36" rx="3" fill="#fef9c3" />
          {/* GPS Pin */}
          <circle cx="32" cy="22" r="4" fill="#ef4444" />
          <path d="M32 26v4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          {/* Yellow Taxi Cab */}
          <rect x="22" y="34" width="20" height="9" rx="2" fill="#facc15" />
          <polygon points="26,34 29,31 35,31 38,34" fill="#eab308" />
          <circle cx="26" cy="43" r="2" fill="#0f172a" />
          <circle cx="38" cy="43" r="2" fill="#0f172a" />
        </svg>
      ),
    },
    {
      id: 'travel-app',
      name: 'Travel App',
      icon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow-sm" viewBox="0 0 64 64" fill="none">
          {/* Suitcase */}
          <rect x="20" y="24" width="24" height="26" rx="4" fill="#0284c7" />
          <path d="M27 24v-6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6" stroke="#0369a1" strokeWidth="2.5" fill="none" />
          {/* Luggage straps */}
          <rect x="26" y="24" width="2" height="26" fill="#38bdf8" />
          <rect x="36" y="24" width="2" height="26" fill="#38bdf8" />
          {/* Airplane flying */}
          <path d="M38 12l8 8-4 1-4-4-3 1 1 3-2 1-3-7z" fill="#f59e0b" />
          {/* Sun */}
          <circle cx="46" cy="20" r="4" fill="#facc15" />
        </svg>
      ),
    },
  ];

  return (
    <section id="industries-app-solutions" className="py-10 sm:py-14 lg:py-16 bg-[#ffffff] font-body relative overflow-hidden border-t border-slate-200/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-9">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-slate-900 tracking-tight">
            Industries We Serve with App Solutions
          </h2>
          
          {/* Characteristic Cyan/Blue Underline from reference image */}
          <div className="flex items-center justify-center gap-1.5 mt-2.5">
            <span className="w-5 h-0.5 bg-[#22d3ee] rounded-full" />
            <span className="w-12 h-0.5 bg-[#0066ff] rounded-full" />
          </div>
        </div>

        {/* 24-Item Compact Grid: 2 cols on mobile, 3 on sm, 4 on md, 6 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 lg:gap-3.5">
          {industries.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: Math.min(idx * 0.015, 0.3) }}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              onClick={() => onOpenScopingModal?.(`Industry App Solution: ${item.name}`)}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-lg hover:border-blue-300 p-2.5 sm:p-3 flex flex-col items-center justify-center text-center transition-all cursor-pointer group select-none min-h-[90px] sm:min-h-[102px]"
            >
              {/* Illustration / Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-[11px] sm:text-xs font-bold text-slate-800 group-hover:text-[#0066ff] transition-colors mt-1.5 sm:mt-2 leading-tight tracking-tight">
                {item.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
