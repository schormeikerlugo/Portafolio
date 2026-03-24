import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FooterSocials } from '../components/SocialCTA';
import TechnicalBackground from '../components/TechnicalBackground';
import ShootingStars from '../components/ShootingStars';
import SiteStatusBar from '../components/SiteStatusBar';
import { useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Layout = ({ children, onOpenContact }) => {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen">
      <ShootingStars />
      {/* Star field */}
      <motion.div style={{ y: bgY }} className="fixed inset-0 z-0">
        <TechnicalBackground />
      </motion.div>

      {/* Navbar */}
      <Navbar onOpenContact={onOpenContact} />

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Site Status Bar */}
      <SiteStatusBar /> {/* Added SiteStatusBar component */}

      {/* Footer */}
      <footer className="relative z-10 py-16 lg:py-24 px-6 border-t border-border bg-void">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            
            {/* Col 1: Brand & Copy */}
            <div className="md:col-span-6 lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-cyan animate-pulse shadow-[0_0_10px_rgba(0,255,229,0.5)]" />
                 <h3 className="text-xl md:text-2xl font-black font-sans tracking-tight text-white uppercase">
                    Schormeiker Lugo
                 </h3>
              </div>
              <p className="text-text-secondary font-sans text-sm md:text-base max-w-md leading-relaxed">
                Ingeniero Frontend especializado en desarrollo de sistemas visuales limpios, reducción de fricción interactiva y creación de ecosistemas tácticos escalables.
              </p>
              
              <div className="pt-6">
                <FooterSocials />
              </div>
            </div>

            {/* Col 2: Dynamics & Status */}
            <div className="md:col-span-6 lg:col-span-4 flex flex-col md:items-end justify-between h-full space-y-12 md:space-y-0">
              <div className="flex flex-col md:items-end gap-3">
                 <span className="mono text-[10px] text-text-dim tracking-[0.3em] uppercase font-bold">
                    SYSTEM_STATUS
                 </span>
                 <div className="flex items-center gap-3 px-4 py-2 border border-cyan/20 bg-cyan/5">
                     <div className="w-2 h-2 bg-cyan shadow-[0_0_10px_rgba(0,255,229,0.8)]" />
                     <span className="font-sans text-xs sm:text-sm font-semibold text-cyan uppercase tracking-wider">
                         Operando al 100%
                     </span>
                 </div>
              </div>

              <div className="flex flex-col md:items-end gap-3 pt-8 md:pt-0">
                 <button 
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                   className="font-mono text-xs text-text-secondary hover:text-cyan transition-colors uppercase tracking-widest flex items-center gap-2 group cursor-pointer"
                 >
                    [ VOLVER_ARRIBA ] <span className="group-hover:-translate-y-1 transition-transform">↑</span>
                 </button>
                 <p className="font-sans text-xs text-text-dim">
                    © {new Date().getFullYear()} Schormeiker Lugo. All rights reserved.
                 </p>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
