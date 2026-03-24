import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechParticles from './TechParticles';

export default function TechnicalBackground() {
    const { scrollY } = useScroll();
    const [activeSection, setActiveSection] = useState('hero');

    // Section colors and grid offsets
    const gridY = useTransform(scrollY, [0, 5000], [0, -200]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'diagnostico', 'operaciones', 'bio', 'metrics'];
            const scrollPos = window.scrollY + window.innerHeight / 2;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full bg-void overflow-hidden -z-20">
            {/* Global Dot Grid - More subtle */}
            <motion.div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`,
                    backgroundSize: '40px 40px',
                    y: gridY
                }}
            />

            {/* Dynamic Backgrounds per Section */}
            <div className="absolute inset-0 transition-opacity duration-1000">
                {/* Tech Particles mapped universally */}
                <TechParticles opacity={activeSection === 'diagnostico' ? 0.05 : 0.15} />

                {/* Diagnostic Scanner for Anomalies */}
                {activeSection === 'diagnostico' && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="w-full h-[2px] bg-cyan/10 blur-[1px] absolute top-0"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                )}
            </div>

            {/* Global Noise Overlay */}
            <div className="noise-overlay" />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

            {/* Static Scanline Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.02] bg-repeat"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px)',
                    backgroundSize: '100% 4px'
                }}
            />
        </div>
    );
}
