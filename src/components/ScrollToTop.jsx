import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);
    const [footerVisible, setFooterVisible] = useState(false);
    const observerRef = useRef(null);

    // Show button after scrolling 400px
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Hide button when footer enters viewport
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => setFooterVisible(entry.isIntersecting),
            { threshold: 0.05 }
        );
        observerRef.current.observe(footer);

        return () => observerRef.current?.disconnect();
    }, []);

    const show = visible && !footerVisible;

    return (
        <AnimatePresence>
            {show && (
                <motion.button
                    key="scroll-to-top"
                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.9 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Volver arriba"
                    className="
                        fixed bottom-10 right-6 z-50
                        group flex flex-col items-center justify-center gap-1
                        w-12 h-12
                        border border-cyan/30 bg-void/80
                        hover:border-cyan hover:bg-cyan/5
                        backdrop-blur-sm
                        transition-all duration-300
                        cursor-pointer
                        shadow-[0_0_12px_rgba(0,255,229,0.08)]
                        hover:shadow-[0_0_20px_rgba(0,255,229,0.25)]
                    "
                >
                    {/* Corner decorations */}
                    <span className="absolute top-[3px] left-[3px] w-2 h-2 border-t border-l border-cyan/60 group-hover:border-cyan transition-colors" />
                    <span className="absolute top-[3px] right-[3px] w-2 h-2 border-t border-r border-cyan/60 group-hover:border-cyan transition-colors" />
                    <span className="absolute bottom-[3px] left-[3px] w-2 h-2 border-b border-l border-cyan/60 group-hover:border-cyan transition-colors" />
                    <span className="absolute bottom-[3px] right-[3px] w-2 h-2 border-b border-r border-cyan/60 group-hover:border-cyan transition-colors" />

                    {/* Arrow */}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-cyan/70 group-hover:text-cyan group-hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <path
                            d="M7 12V2M7 2L2.5 6.5M7 2L11.5 6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {/* Label below arrow */}
                    <span className="mono text-[7px] text-cyan/50 group-hover:text-cyan tracking-[0.2em] uppercase transition-colors leading-none">
                        TOP
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
