import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import WritingPage from './pages/WritingPage';
import ProjectDetailView from './pages/ProjectDetailView';
import ContactPage from './pages/ContactPage';
import Approach from './pages/Approach';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
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

  return (
    <>
      <Layout key="main-layout" onOpenContact={openContact}>
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onOpenContact={openContact} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work" element={<PortfolioPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/portfolio/:id" element={<ProjectDetailView />} />
              <Route path="/approach" element={<Approach />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
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