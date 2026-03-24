import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NavbarSocials } from './SocialCTA';

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const currentLang = (i18n.language || 'en').split('-')[0]; // Handle cases like 'en-US'

    const toggleLanguage = () => {
        const nextLang = currentLang === 'en' ? 'es' : 'en';
        i18n.changeLanguage(nextLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/5 rounded transition-colors group cursor-pointer"
            title="Toggle Language"
        >
            <Globe size={12} className="text-text-dim group-hover:text-cyan transition-colors" />
            <span className="font-mono text-[10px] text-text-dim group-hover:text-white uppercase tracking-tighter">
                {currentLang}
            </span>
        </button>
    );
};

function useScrollDirection() {
    const [visible, setVisible] = useState(true);
    const [atTop, setAtTop] = useState(true);

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY;
                    setAtTop(currentY < 20);
                    if (currentY < 20) {
                        setVisible(true);
                    } else if (currentY < lastY - 5) {
                        setVisible(true);
                    } else if (currentY > lastY + 5) {
                        setVisible(false);
                    }
                    lastY = currentY;
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return { visible, atTop };
}

export default function Navbar({ onOpenContact }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const { visible, atTop } = useScrollDirection();
    const { t } = useTranslation();
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => setHasMounted(true), 6500);
        return () => clearTimeout(timer);
    }, []);

    const NAV_LINKS = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Work', path: '/work' },
        { label: 'Services', path: '/services' },
        { label: 'Writing', path: '/writing' },
        { label: 'Contact', path: '/contact' },
    ];

    const show = visible || mobileOpen;

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 px-6 transition-colors duration-300 ${atTop ? 'bg-transparent' : 'bg-void/60 backdrop-blur-xl border-b border-white/[0.06]'
                    }`}
                initial={{ y: -80 }}
                animate={{ y: show ? 0 : -80 }}
                transition={{ duration: 0.3, delay: hasMounted ? 0 : 6.0, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14">
                    {/* Logo: Minimalist SL */}
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 group"
                    >
                        <span className="font-mono text-[11px] font-bold tracking-[0.3em] text-white group-hover:text-cyan transition-colors">
                            SL // SYSTEM
                        </span>
                    </Link>

                    {/* Desktop links + socials */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-0 mr-6">
                            {NAV_LINKS.map(({ label, path }) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={({ isActive }) => 
                                        `relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-200 ${isActive
                                            ? 'text-cyan'
                                            : 'text-white/40 hover:text-white'
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 h-6 border-l border-white/5 pl-4">
                            <LanguageSelector />
                            
                            {/* Settings trigger or mode display can go here if needed */}
                        </div>
                        
                        <NavbarSocials />
                    </div>

                    {/* Mobile hamburger */}
                    <div className="md:hidden flex items-center gap-4">
                        <LanguageSelector />
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="p-2 text-text-secondary hover:text-cyan transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-void/90 backdrop-blur-2xl md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-8">
                            {NAV_LINKS.map(({ label, path }, i) => (
                                <NavLink
                                    key={path}
                                    to={path}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) => 
                                        `font-mono text-lg tracking-[0.3em] transition-colors ${isActive ? 'text-cyan' : 'text-text-secondary'}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && <span className="text-cyan mr-2">›</span>}
                                            {label}
                                            {isActive && <span className="animate-pulse ml-1">_</span>}
                                        </>
                                    )}
                                </NavLink>
                            ))}
                            {/* Mobile contact button */}
                            <motion.button
                                onClick={() => { setMobileOpen(false); onOpenContact?.(); }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                                className="font-mono text-lg tracking-[0.3em] text-cyan border border-cyan/30 px-8 py-3 mt-4 hover:bg-cyan/10 transition-colors cursor-pointer"
                            >
                                {t('nav.contact_btn', 'CONTACTO')}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
