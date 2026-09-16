import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopGlobalBar } from './components/navigation/TopGlobalBar';
import { MainHeader } from './components/navigation/MainHeader';
import { MobileDrawer } from './components/navigation/MobileDrawer';

import { Hero } from './components/sections/Hero';
import { SocialProofBar } from './components/sections/SocialProofBar';
import { CapabilitiesGrid } from './components/sections/CapabilitiesGrid';
import { WhatWeDoShowcase } from './components/sections/WhatWeDoShowcase';
import { IndustriesAppSolutionsSection } from './components/sections/IndustriesAppSolutionsSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { CaseStudyShowcase } from './components/sections/CaseStudyShowcase';
import { SubBrandsShowcase } from './components/sections/SubBrandsShowcase';
import { ServicesDirectorySection } from './components/sections/ServicesDirectorySection';
import { Footer } from './components/sections/Footer';
import { CustomSoftwareDevelopmentPage } from './pages/CustomSoftwareDevelopmentPage';
import { MobileAppDevelopmentPage } from './pages/MobileAppDevelopmentPage';
import { ContactPage } from './pages/ContactPage';
// import { PageEntranceAnimation } from './components/ui/PageEntranceAnimation';

// Conversion Funnels
import { GlobalScopingModal } from './components/funnels/GlobalScopingModal';
import { PersistentEnquiryDrawer } from './components/funnels/PersistentEnquiryDrawer';
import { ContextualCallModal } from './components/funnels/ContextualCallModal';
import { StickyMobileContactBar } from './components/funnels/StickyMobileContactBar';

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
    // Disable automatic browser scroll restoration so page transitions always start cleanly at top
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleLocationChange = () => {
      const p = window.location.pathname.replace(/\/$/, '') || '/';
      setCurrentPath(p);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('app-navigate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('app-navigate', handleLocationChange);
    };
  }, []);

  // Guarantee scroll to top whenever currentPath changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(rafId);
  }, [currentPath]);

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
  const isContactPage = currentPath === '/contact';

  // Dynamic document title and meta description for BoFu SEO
  React.useEffect(() => {
    let title = 'Custom Software Development Company for Enterprises & FinTech | Asthasoft Technologies';
    let desc = 'Asthasoft Technologies is a leading custom software development company for enterprises, fintech app development agency, and cross-platform mobile app engineering team.';

    if (currentPath === '/contact') {
      title = 'Hire Dedicated Custom Software & Mobile App Developers | Asthasoft Technologies';
      desc = 'Schedule an enterprise scoping session with Asthasoft Technologies. Hire dedicated custom software developers, fintech specialists, and offshore mobile app engineering pods.';
    } else if (currentPath === '/mobile-app-development-company') {
      title = 'Cross Platform Mobile App Development Company | React Native & Flutter | Asthasoft';
      desc = 'Enterprise cross-platform mobile app development company. We engineer iOS, Android, React Native, and Flutter mobile applications with MVP builds and transparent cost breakdowns.';
    } else if (currentPath === '/custom-software-development') {
      title = 'Custom Software Development Company for Enterprises | Bespoke SaaS & Pods | Asthasoft';
      desc = 'Custom software development company for enterprises. Hire dedicated custom software development teams, bespoke business software development, and legacy modernization architects.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-[#0c1222] text-white selection:bg-[#0066ff] selection:text-white relative overflow-x-clip w-full max-w-full">
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
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }}
      >
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          onAnimationStart={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
        >
          {isContactPage ? (
            <ContactPage
              onOpenScopingModal={handleOpenScopingModal}
              onOpenCallModal={handleOpenCallModal}
            />
          ) : isMobileAppPage ? (
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

              {/* Clean 1-Row Trust & Credentials Bar + Sub-Brand Products Bar */}
              <SocialProofBar onOpenScopingModal={handleOpenScopingModal} />

              {/* Section 2: 6-Card Capabilities Grid matching Image 2 */}
              <CapabilitiesGrid onOpenScopingModal={handleOpenScopingModal} />

              {/* Section 3: What We Do & Legacy Modernization matching Image 3 */}
              <WhatWeDoShowcase onOpenScopingModal={handleOpenScopingModal} />

              {/* Industries We Serve with App Solutions matching user reference image */}
              <IndustriesAppSolutionsSection onOpenScopingModal={handleOpenScopingModal} />

              {/* Section 4: Enterprise Tech Stack Section with Verified Logos & Domain Switcher */}
              <TechStackSection
                onOpenScopingModal={handleOpenScopingModal}
                onOpenCallModal={handleOpenCallModal}
              />

              {/* Section 5: Featured Case Study Card matching Latest Reference Images */}
              <CaseStudyShowcase onOpenScopingModal={handleOpenScopingModal} />

              {/* Sub-Brand Products: AsthaSMS | AsthaHost | AsthaPay */}
              <SubBrandsShowcase onOpenScopingModal={handleOpenScopingModal} />

              {/* SEO & Geo-Targeted Services Directory */}
              <ServicesDirectorySection onOpenScopingModal={handleOpenScopingModal} />
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
    </div>
  );
}

export default App;
