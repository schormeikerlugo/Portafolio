import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Button from '../components/Button';
import JupiterScene from '../components/Jupiter';
import CipherText from '../components/CipherText';
import HeroTabs from '../components/HeroTabs';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-start pt-10 lg:items-center lg:pt-0 px-6 z-10">
            <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                {/* Left: Content */}
                <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Status bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                        <span className="mono text-text-secondary">SISTEMA OPERATIVO // EN LÍNEA</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 1 }} // Opacity handled by CipherText mostly
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-jura tracking-tight text-white leading-[1.05] mb-4"
                    >
                        <CipherText text="SCHORMEIKER" delay={0.2} />
                        <span className="inline-block w-4 sm:w-6" />
                        <CipherText text="LUGO" delay={0.6} />
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }} // Fade in separately
                        transition={{ duration: 0.5, delay: 2.5 }}
                        className="mono text-cyan text-sm tracking-[0.2em] mb-8"
                    >
                        ARQUITECTURA VISUAL E INGENIERÍA DE INTERACCIÓN
                    </motion.h2>

                    {/* HUD divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 2.7 }}
                        className="hud-line mb-8 origin-center lg:origin-left"
                    />

                    {/* Intro / Tabs */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 3.0 }}
                        className="w-full flex justify-center lg:justify-start"
                    >
                        <HeroTabs />
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 3.5 }}
                    >
                        <Button
                            onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            EXPLORAR SISTEMAS
                        </Button>
                    </motion.div>
                </div>

                {/* Right: Jupiter */}
                <motion.div
                    className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center lg:justify-end lg:translate-x-12"
                    initial={{ opacity: 0, scale: 1, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2.0, delay: 1.5, ease: 'circOut' }}
                >
                    <Suspense
                        fallback={
                            <div className="w-full min-h-[350px] sm:min-h-[450px] flex items-center justify-center">
                                <span className="mono text-[10px] text-text-dim animate-pulse">
                                    CARGANDO TELEMETRÍA...
                                </span>
                            </div>
                        }
                    >
                        <div className="w-full h-[550px] lg:h-[750px]">
                            <JupiterScene />
                        </div>
                    </Suspense>


                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3, y: [0, 6, 0] }}
                transition={{ opacity: { delay: 1.5 }, y: { duration: 2.5, repeat: Infinity } }}
            >
                <ChevronDown size={18} strokeWidth={1} />
            </motion.div>
        </section>
    );
}
