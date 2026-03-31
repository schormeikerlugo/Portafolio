import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Context & Hooks
import { SettingsProvider } from './context/SettingsContext';
import { useVimNavigation } from './hooks/useVimNavigation';

// Layout & Components
import Layout from './layouts/Layout';
import LoadingScreen from './components/LoadingScreen';
import ContactModal from './components/ContactModal';
import TerminalCursor from './components/TerminalCursor';
import HelpModal from './components/HelpModal';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import WritingPage from './pages/WritingPage';
import ProjectDetailView from './pages/ProjectDetailView';
import ContactPage from './pages/ContactPage';
import Approach from './pages/Approach';

/* ═══════════════════════════════════════════════
   BRUTALIST SCI-FI APP
   GSAP ScrollTrigger para efectos globales
   de transición y scroll.
   
   WHY SCROLLTRIGGER: Efectos globales que se
   aplican a toda la página, como el progress
   bar de scroll y las transiciones brutales.
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const location = useLocation();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const toggleHelp = useCallback(() => setHelpOpen(prev => !prev), []);

  // Initialize VIM navigation
  useVimNavigation(toggleHelp);

  // Handle route changes: scroll to top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Trigger page transition - very fast
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Lock scroll while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  // WHY GSAP SCROLLTRIGGER: Progress bar global
  // que muestra el progreso de scroll en toda la página
  useGSAP(() => {
    if (loading) return;

    // Scroll progress indicator
    gsap.to('.scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  return (
    <>
      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[10000] bg-cyan/20 origin-left">
        <div
          className="scroll-progress h-full bg-cyan origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <Layout key="main-layout" onOpenContact={openContact}>
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <PageTransition isLoading={pageLoading}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home onOpenContact={openContact} isAppLoading={loading} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/work" element={<PortfolioPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/writing" element={<WritingPage />} />
                <Route path="/portfolio/:id" element={<ProjectDetailView />} />
                <Route path="/approach" element={<Approach />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </Suspense>
      </Layout>
      <ContactModal isOpen={contactOpen} onClose={closeContact} />
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
      <TerminalCursor />
      <ScrollToTop />

      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
