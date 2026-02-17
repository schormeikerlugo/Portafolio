import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavbarSocials } from './SocialCTA';

const NAV_LINKS = [
    { label: 'INICIO', href: '#hero' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROYECTOS', href: '#projects' },
    { label: 'BIO', href: '#bio' },
];

function useScrollSpy(ids, offset = 120) {
    const [activeId, setActiveId] = useState(ids[0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: `-${offset}px 0px -40% 0px`, threshold: 0.1 }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids, offset]);

    return activeId;
}

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

export default function Navbar({ hidden = false, onOpenContact }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeId = useScrollSpy(['hero', 'skills', 'projects', 'bio']);
    const { visible, atTop } = useScrollDirection();

    const handleClick = useCallback((e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (hidden) return null;

    const show = visible || mobileOpen;

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 px-6 transition-colors duration-300 ${atTop ? 'bg-transparent' : 'bg-void/60 backdrop-blur-xl border-b border-white/[0.06]'
                    }`}
                initial={{ y: -80 }}
                animate={{ y: show ? 0 : -80 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-[1600px] mx-auto flex items-center justify-between h-14">
                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleClick(e, '#hero')}
                        className="flex items-center gap-2 group"
                    >
                        <span className="w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,229,255,0.6)]" />
                        <span className="font-mono text-xs font-medium tracking-widest text-text-primary group-hover:text-cyan transition-colors">
                            SL
                        </span>
                    </a>

                    {/* Desktop links + socials */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-1">
                            {NAV_LINKS.map(({ label, href }) => {
                                const id = href.replace('#', '');
                                const isActive = activeId === id;
                                return (
                                    <a
                                        key={href}
                                        href={href}
                                        onClick={(e) => handleClick(e, href)}
                                        className={`relative px-4 py-2 font-mono text-[11px] tracking-wider transition-colors duration-200 ${isActive
                                            ? 'text-cyan'
                                            : 'text-text-secondary hover:text-text-primary'
                                            }`}
                                    >
                                        {label}
                                        {isActive && (
                                            <span className="animate-pulse ml-0.5">_</span>
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute bottom-0 left-2 right-2 h-px bg-cyan shadow-[0_0_6px_rgba(0,229,255,0.4)]"
                                                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                            />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                        {/* Contact button */}
                        <button
                            onClick={onOpenContact}
                            className="ml-3 px-4 py-1.5 border border-cyan/30 font-mono text-[11px] tracking-wider text-cyan hover:bg-cyan/10 hover:border-cyan/50 transition-all duration-200 cursor-pointer"
                        >
                            CONTACTO
                        </button>
                        <NavbarSocials />
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        className="md:hidden p-2 text-text-secondary hover:text-cyan transition-colors"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
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
                            {NAV_LINKS.map(({ label, href }, i) => {
                                const id = href.replace('#', '');
                                const isActive = activeId === id;
                                return (
                                    <motion.a
                                        key={href}
                                        href={href}
                                        onClick={(e) => handleClick(e, href)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: i * 0.06, duration: 0.3 }}
                                        className={`font-mono text-lg tracking-[0.3em] transition-colors ${isActive ? 'text-cyan' : 'text-text-secondary'
                                            }`}
                                    >
                                        {isActive && <span className="text-cyan mr-2">›</span>}
                                        {label}
                                        {isActive && <span className="animate-pulse ml-1">_</span>}
                                    </motion.a>
                                );
                            })}
                            {/* Mobile contact button */}
                            <motion.button
                                onClick={() => { setMobileOpen(false); onOpenContact?.(); }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.3 }}
                                className="font-mono text-lg tracking-[0.3em] text-cyan border border-cyan/30 px-8 py-3 mt-4 hover:bg-cyan/10 transition-colors cursor-pointer"
                            >
                                CONTACTO
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
