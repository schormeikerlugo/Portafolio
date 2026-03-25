import { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Cpu, Zap, Shield, Target, Activity } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { PhilosophyVisuals } from '../components/PhilosophyVisuals';
import { SectionLabel, GhostText, FloatingGlyphs } from '../components/ValorantOverlays';
import { CircuitLines, AbstractShapes } from '../components/ValorantPatterns';
import ViewportPauser from '../components/ViewportPauser';
import GlassContainerValorant from '../components/GlassContainerValorant';

gsap.registerPlugin(ScrollTrigger);

const TechnicalSegment = ({ title, text, icon: Icon, index }) => {
    return (
        <div 
            className="segment absolute inset-0 flex flex-col justify-center px-6 md:px-24 pointer-events-none opacity-0"
            data-index={index}
        >
            <div className="max-w-[1400px] space-y-8 pointer-events-auto z-20">
                <div className="flex items-center gap-4 opacity-40">
                    <Icon size={18} className="text-cyan" />
                    <span className="mono text-[10px] uppercase tracking-[0.4em] font-bold text-cyan">MODULE_SYNC: 03.0{index + 1}</span>
                </div>
                
                <h3 className="text-4xl md:text-8xl font-sans font-black text-white uppercase tracking-tighter leading-[0.85] filter drop-shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                    {title}
                </h3>
                
                <GlassContainerValorant className="p-8 max-w-2xl border-l-2 border-l-cyan/40">
                    <p className="text-base md:text-xl text-white/70 leading-relaxed font-mono uppercase tracking-tighter">
                        {text}
                    </p>
                    
                    <div className="mt-10 flex items-center justify-between opacity-40">
                        <div className="flex items-center gap-3">
                            <Activity size={10} className="text-cyan animate-pulse" />
                            <span className="mono text-[8px] uppercase tracking-[0.4em] text-white">SYSTEM_RESPONSE_FAST</span>
                        </div>
                        <span className="mono text-[8px] uppercase tracking-widest text-cyan font-bold">NODE_STABLE</span>
                    </div>
                </GlassContainerValorant>
            </div>
        </div>
    );
};

export default function InteractiveBioTeaser() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const SEGMENTS = useMemo(() => [
        {
            title: "Optimización de Ecosistemas",
            text: "Optimizo sistemas digitales que han perdido su rumbo. Mi enfoque no se limita a \"crear interfaces\", sino a eliminar la fricción entre el diseño y la ingeniería. Resuelvo problemas estructurales mediante arquitecturas visuales escalables y sistemas de diseño que permiten a los equipos iterar sin romper el ecosistema.",
            icon: Zap
        },
        {
            title: "Ingeniería de la Información",
            text: "Como Design Engineer, priorizo la arquitectura de información y la psicología del usuario para reducir la carga cognitiva. Traduzco visiones complejas en código de alto rendimiento utilizando React, Vite y Framer Motion, asegurando que cada píxel tenga un propósito operativo.",
            icon: Cpu
        },
        {
            title: "Inteligencia Estratégica",
            text: "En la frontera de la innovación, he especializado mi práctica en la integración estratégica de Inteligencia Artificial. Mi dominio en Ingeniería de Prompts me permite orquestar modelos de lenguaje para optimizar flujos de trabajo, desde la ideación visual hasta la automatización de procesos lógicos.",
            icon: Target
        },
        {
            title: "Soberanía de Modelos Locales",
            text: "Poseo una capacidad distintiva para el despliegue y gestión de LLMs locales, lo que me permite trabajar con modelos de vanguardia bajo un control total de la privacidad, la latencia y la personalización, llevando la soberanía tecnológica al núcleo de cada proyecto.",
            icon: Shield
        }
    ], []);

    useGSAP(() => {
        const segments = gsap.utils.toArray(".segment");
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=2500",
                pin: true,
                scrub: 1
            }
        });

        segments.forEach((seg, i) => {
            // Entrance
            tl.fromTo(seg, 
                { opacity: 0, y: 30, filter: 'blur(10px)' }, 
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: "power2.out" }
            );
            
            // Static hold
            tl.to(seg, { duration: 1.5 }); 

            // Exit
            if (i < segments.length - 1) {
                tl.to(seg, { opacity: 0, y: -30, filter: 'blur(10px)', duration: 1, ease: "power2.in" });
            }
        });

    }, { scope: sectionRef });

    return (
        <section 
            ref={sectionRef} 
            className="relative bg-black overflow-hidden border-t border-white/5 z-20 w-full"
        >
            {/* Background */}
            <ViewportPauser>
                <CircuitLines opacity={0.08} />
                <FloatingGlyphs />
            </ViewportPauser>
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Valorant Overlays */}
            <SectionLabel text="class Philosophy extends Core {}" side="right" />
            <SectionLabel text="async function optimize(system) {}" />


            {/* Fixed Starfield Visual (Right Side) */}
            <PhilosophyVisuals />

            <div ref={containerRef} className="relative h-screen w-full overflow-hidden">
                {/* Header Static Status */}
                <div className="absolute top-12 left-6 md:left-24 z-30">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4"
                    >
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X03 // SYSTEM_PHILOSOPHY
                        </span>
                    </motion.div>
                </div>

                {/* Content Segments */}
                <div className="relative h-full w-full z-20 overflow-hidden text-white">
                    {SEGMENTS.map((seg, i) => (
                        <TechnicalSegment 
                            key={i} 
                            index={i} 
                            title={seg.title} 
                            text={seg.text} 
                            icon={seg.icon} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
