import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../components/MatrixRain';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';
import { SectionLabel, GhostText, CornerBrackets, ChevronMarker, FloatingGlyphs } from '../components/ValorantOverlays';
import { AbstractShapes } from '../components/ValorantPatterns';

const Hero = ({ onOpenContact }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    /* ── Animation timeline (fast, cinematic) ──
       0s   → Matrix rain starts
       5.0s → Backdrop blur + AbstractShapes fade in
       5.5s → Vertical labels typewrite in (CipherText)
       6.0s → #include<iostream> label
       6.2s → Name CipherText
       7.0s → Subtitle typewriter
       7.6s → Paragraph fade
       7.9s → Buttons slide up
       8.5s → Chevron
    */

    return (
        <section id="hero" className="relative min-h-screen flex items-center px-6 z-10 bg-transparent overflow-hidden">
            {/* Cinematic Background Blur Overlay */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 backdrop-blur-[6px] bg-void/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 5.0 }}
            />

            {/* Matrix rain */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <MatrixRain opacity={0.35} />
            </div>

            {/* === VALORANT ART OVERLAYS — fade in with backdrop === */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 5.0 }}
            >
                <AbstractShapes variant="hero" />
                <FloatingGlyphs />
                <GhostText text="SL" position="bottom-right" size="text-[200px] md:text-[350px]" />
            </motion.div>

            {/* Vertical labels — appear with CipherText effect at 5.5s */}
            <motion.div
                className="absolute top-0 bottom-0 left-2 md:left-4 lg:left-6 z-20 pointer-events-none hidden md:flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 5.5 }}
            >
                <div className="flex items-center gap-3" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(0,229,255,0.6)] animate-pulse" />
                    <span className="mono text-[10px] text-cyan/40 tracking-[0.5em] uppercase font-bold whitespace-nowrap">
                        <CipherText text="const init = () => // SYSTEM.BOOT" delay={5.5} duration={0.8} />
                    </span>
                    <span className="block w-px h-16 bg-gradient-to-b from-cyan/30 to-transparent" style={{ writingMode: 'horizontal-tb' }} />
                </div>
            </motion.div>
            <motion.div
                className="absolute top-0 bottom-0 right-2 md:right-4 lg:right-6 z-20 pointer-events-none hidden md:flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 5.5 }}
            >
                <div className="flex items-center gap-3" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(0,229,255,0.6)] animate-pulse" />
                    <span className="mono text-[10px] text-cyan/40 tracking-[0.5em] uppercase font-bold whitespace-nowrap">
                        <CipherText text="import { Portfolio } from '@sl'" delay={5.5} duration={0.8} />
                    </span>
                    <span className="block w-px h-16 bg-gradient-to-b from-cyan/30 to-transparent" style={{ writingMode: 'horizontal-tb' }} />
                </div>
            </motion.div>

            <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center justify-center text-center mt-24 sm:mt-0 relative z-10 px-4">
                <div className="flex flex-col items-center w-full">
                    {/* #include<iostream> */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ duration: 0.5, delay: 6.0 }}
                        className="mono text-xs tracking-[0.2em] text-cyan mb-6"
                    >
                        #include&lt;iostream&gt;
                    </motion.div>

                    {/* Name — CipherText */}
                    <div className="min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center w-full">
                        <h1 className="relative text-[clamp(1.5rem,8vw,6rem)] font-sans text-text-primary font-bold leading-none tracking-tighter mix-blend-plus-lighter whitespace-nowrap">
                            <CipherText text="Schormeiker Lugo" delay={6.2} duration={1.2} />
                        </h1>
                    </div>

                    {/* Subtitle — Typewriter (faster) */}
                    <h2 className="text-base sm:text-lg font-mono text-text-secondary uppercase tracking-widest mb-8 min-h-[4rem] sm:min-h-[2rem]">
                        <TypewriterText text="Frontend Design Engineer // System Architect" delay={7.0} speed={0.02} />
                    </h2>

                    {/* Paragraph */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 7.6 }}
                        className="font-sans text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 mx-auto"
                    >
                        {t('hero.desc_new', 'En el desarrollo de las tecnologias web, Configuro entornos operativos de alto rendimiento. Soluciono la fricción entre diseño e ingeniería mediante código claro y ejecución precisa.')}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 7.9 }}
                    >
                        <CornerBrackets size={16} color="border-cyan/10" hoverColor="group-hover:border-cyan/40" className="p-3">
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <button
                                    onClick={() => navigate('/about')}
                                    className="px-8 py-3 bg-cyan text-void font-mono text-[11px] tracking-[0.2em] font-bold hover:bg-white transition-colors duration-300 uppercase glow-hover cursor-pointer"
                                >
                                    [ {t('hero.cta_approach', 'VER MI ENFOQUE')} ]
                                </button>
                                <button
                                    onClick={() => navigate('/work')}
                                    className="px-8 py-3 border border-border text-text-primary font-mono text-[11px] tracking-[0.2em] hover:border-cyan hover:text-cyan hover-glow-soft transition-colors duration-300 uppercase cursor-pointer"
                                >
                                    [ {t('hero.cta_work', 'CASOS DE ESTUDIO')} ]
                                </button>
                            </div>
                        </CornerBrackets>
                    </motion.div>
                </div>
            </div>

            {/* Chevron scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 8.5, duration: 1 }}
                >
                    <ChevronMarker direction="down" />
                </motion.div>
            </div>

            {/* Gradient to next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-void to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Hero;