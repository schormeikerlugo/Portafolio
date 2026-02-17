import { useState, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import ContactModal from './components/ContactModal';

import StarField from './components/StarField';
import CustomCursor from './components/CustomCursor';
import ShootingStars from './components/ShootingStars';
import Navbar from './components/Navbar';
import SocialCTA, { FooterSocials } from './components/SocialCTA';

import Hero from './sections/Hero';
import Bio from './sections/Bio';
import Skills from './sections/Skills';
import Portfolio from './sections/Portfolio';
import ProjectDetail from './sections/ProjectDetail';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);

  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  const handleSelectProject = useCallback((project) => {
    setSelectedProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    setSelectedProject(null);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <div className="relative min-h-screen">
      <ShootingStars />
      {/* Star field */}
      <motion.div style={{ y: bgY }} className="fixed inset-0 z-0">
        <StarField />
      </motion.div>

      {/* Crosshair cursor */}
      <CustomCursor />

      {/* Navbar */}
      <Navbar hidden={!!selectedProject} onOpenContact={openContact} />

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ProjectDetail
              project={selectedProject}
              onBack={handleBack}
              onSelectProject={handleSelectProject}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Hero onOpenContact={openContact} />
            <Skills />

            <SocialCTA
              title="TRANSMISIÓN ABIERTA"
              message="El universo no fue diseñado para explorarlo solo. Conecta con la estación y sigamos construyendo juntos."
              author="Comandante SL"
              networks={['instagram', 'tiktok', 'dribbble']}
            />

            <Portfolio onSelectProject={handleSelectProject} />

            <SocialCTA
              title="SEÑAL DETECTADA"
              message="Cada proyecto es una nueva órbita. Si buscas a alguien que diseñe con la precisión de un ingeniero y la visión de un artista... ya me encontraste."
              networks={['github', 'behance', 'linkedin', 'dribbble', 'instagram', 'tiktok']}
            />
            <Bio />

            {/* Footer */}
            <footer className="relative z-10 text-center py-12 px-6 border-t border-white/[0.04]">
              <p className="mono text-[10px] text-text-dim tracking-wider">
                © {new Date().getFullYear()} SCHORMEIKER LUGO // ALL SYSTEMS OPERATIONAL
              </p>
              <FooterSocials />
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal isOpen={contactOpen} onClose={closeContact} />
    </div>
  );
}