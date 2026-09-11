import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopGlobalBar } from './components/navigation/TopGlobalBar';
import { MainHeader } from './components/navigation/MainHeader';
import { MobileDrawer } from './components/navigation/MobileDrawer';
import { Hero } from './components/sections/Hero';
import { SocialProofBar } from './components/sections/SocialProofBar';
import { CapabilitiesGrid } from './components/sections/CapabilitiesGrid';
import { WhatWeDoShowcase } from './components/sections/WhatWeDoShowcase';
import { CaseStudyShowcase } from './components/sections/CaseStudyShowcase';
import { Footer } from './components/sections/Footer';
import { CustomSoftwareDevelopmentPage } from './pages/CustomSoftwareDevelopmentPage';
import { MobileAppDevelopmentPage } from './pages/MobileAppDevelopmentPage';
// import { PageEntranceAnimation } from './components/ui/PageEntranceAnimation';

// 5 Conversion Funnels
import { GlobalScopingModal } from './components/funnels/GlobalScopingModal';
import { PersistentEnquiryDrawer } from './components/funnels/PersistentEnquiryDrawer';
import { ContextualCallModal } from './components/funnels/ContextualCallModal';
import { StickyMobileContactBar } from './components/funnels/StickyMobileContactBar';
import { ExitIntentPromoBanner } from './components/funnels/ExitIntentPromoBanner';

export function App() {
  const [isScopingModalOpen, setIsScopingModalOpen] = useState(false);
  const [scopingSource, setScopingSource] = useState('Portal Exploration');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callContext, setCallContext] = useState('General Consultation');

  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname.replace(/\/$/, '') || '/';
    }
    return '/';
  });

  React.useEffect(() => {
    const handleLocationChange = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(p);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('app-navigate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('app-navigate', handleLocationChange);
    };
  }, []);

  const handleOpenScopingModal = (source: string = 'General Portal CTA') => {
    setScopingSource(source);
    setIsScopingModalOpen(true);
  };

  const handleOpenCallModal = (context: string = 'Rapid 30-Min Call') => {
    setCallContext(context);
    setIsCallModalOpen(true);
  };

  const isCustomSoftwarePage = currentPath === '/custom-software-development';
  const isMobileAppPage = currentPath === '/mobile-app-development-company';

  return (
    <div className="min-h-screen bg-[#0c1222] text-white selection:bg-[#0066ff] selection:text-white relative">
      {/* Cinematic Enterprise Page Entrance Animation */}
      {/* <PageEntranceAnimation /> */}

      {/* 1. Regional Hubs & Credentials Top Bar */}
      <TopGlobalBar />

      {/* 2. Main Sticky Header with Mega Menus, Glowing AI Button, and CTA */}
      <MainHeader
        onOpenScopingModal={handleOpenScopingModal}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
      />

      {/* 3. Mobile Slide-Over Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        onOpenScopingModal={handleOpenScopingModal}
      />

      {/* Animated Route Views */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {isMobileAppPage ? (
            <MobileAppDevelopmentPage
              onOpenScopingModal={handleOpenScopingModal}
              onOpenCallModal={handleOpenCallModal}
            />
          ) : isCustomSoftwarePage ? (
            <CustomSoftwareDevelopmentPage
              onOpenScopingModal={handleOpenScopingModal}
              onOpenCallModal={handleOpenCallModal}
            />
          ) : (
            <main>
              {/* Section 1: Hero matching Image 1 & 4 */}
              <Hero
                onOpenScopingModal={handleOpenScopingModal}
                onRequestCall={handleOpenCallModal}
              />

              {/* Clean 1-Row Trust & Credentials Bar */}
              <SocialProofBar />

              {/* Section 2: 6-Card Capabilities Grid matching Image 2 */}
              <CapabilitiesGrid onOpenScopingModal={handleOpenScopingModal} />

              {/* Section 3: What We Do & Legacy Modernization matching Image 3 */}
              <WhatWeDoShowcase onOpenScopingModal={handleOpenScopingModal} />

              {/* Section 4: Featured Case Study Card matching Latest Reference Images */}
              <CaseStudyShowcase onOpenScopingModal={handleOpenScopingModal} />
            </main>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Clean & Modern Footer */}
      <Footer onOpenScopingModal={handleOpenScopingModal} />

      {/* --- 5 Multi-Funnel Lead Capture Points --- */}

      {/* Funnel 1: Global Scoping Session Modal (#popup) */}
      <GlobalScopingModal
        isOpen={isScopingModalOpen}
        onClose={() => setIsScopingModalOpen(false)}
        initialSource={scopingSource}
      />

      {/* Funnel 2: Persistent Slide-In Enquiry Drawer (#enquiryPanel) */}
      <PersistentEnquiryDrawer />

      {/* Funnel 3: Contextual "Call in 30 Min" Lightbox */}
      <ContextualCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        serviceContext={callContext}
      />

      {/* Sticky Mobile Contact Bar: Call Now & WhatsApp matching reference (hidden when mobile drawer or modal is open) */}
      <StickyMobileContactBar isHidden={isMobileDrawerOpen || isScopingModalOpen || isCallModalOpen} />

      {/* Funnel 5: Exit-Intent / Inactivity Promo Banner (#promoPopup) */}
      <ExitIntentPromoBanner onClaimOffer={handleOpenScopingModal} />
    </div>
  );
}

export default App;
