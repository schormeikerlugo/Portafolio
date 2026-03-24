import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MatrixRain from '../components/MatrixRain';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';

const Hero = ({ onOpenContact }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    return (
        <section id="hero" className="relative min-h-screen flex items-center px-6 z-10 bg-transparent overflow-hidden">
            {/* Cinematic Background Blur Overlay - Fades in after 6 seconds */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 backdrop-blur-[6px] bg-void/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 6.0 }}
            />

            {/* Extemely subtle matrix rain for OLED dark mode with Depth of Field */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <MatrixRain opacity={0.35} />
            </div>

            <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center justify-center text-center mt-24 sm:mt-0 relative z-10 px-4">

                {/* Typography Container */}
                <div className="flex flex-col items-center w-full">
                    {/* Visual Label: #include<iostream> */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 0.7, y: 0 }}
                        transition={{ duration: 0.8, delay: 6.0 }}
                        className="mono text-xs tracking-[0.2em] text-cyan mb-6"
                    >
                        #include&lt;iostream&gt;
                    </motion.div>

                    {/* Main Headline: Name with CipherText */}
                    <div className="min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center w-full">
                        <h1 className="relative text-[clamp(1.5rem,8vw,6rem)] font-sans text-text-primary font-bold leading-none tracking-tighter mix-blend-plus-lighter whitespace-nowrap">
                            <CipherText text="Schormeiker Lugo" delay={6.2} duration={1.5} />
                        </h1>
                    </div>

                    {/* Sub-headline: Roles with TypewriterText */}
                    <h2 className="text-base sm:text-lg font-mono text-text-secondary uppercase tracking-widest mb-8 min-h-[4rem] sm:min-h-[2rem]">
                        <TypewriterText text="Frontend Design Engineer // System Architect" delay={7.8} speed={0.03} />
                    </h2>

                    {/* Description: Value Proposition */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 9.0 }}
                        className="font-sans text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 mx-auto"
                    >
                        {t('hero.desc_new', 'En el desarrollo de las tecnologias web, Configuro entornos operativos de alto rendimiento. Soluciono la fricción entre diseño e ingeniería mediante código claro y ejecución precisa.')}
                    </motion.p>

                    {/* Sharp CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 9.3 }}
                        className="flex flex-wrap items-center justify-center gap-6"
                    >
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
                    </motion.div>
                </div>
            </div>

            {/* Subtle OLED gradient at bottom to blend into next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-void to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Hero;