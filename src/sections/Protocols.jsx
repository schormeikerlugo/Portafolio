import { useRef } from 'react';
import { Shield, Target, Cpu, Workflow, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrambleText from '../components/ScrambleText';
import CipherText from '../components/CipherText';
import TypewriterText from '../components/TypewriterText';
import { SectionLabel, CrosshairDot, FloatingGlyphs } from '../components/ValorantOverlays';
import DevParticles from '../components/DevParticles';

/* ═══════════════════════════════════════════════
   PROTOCOLS SECTION
   Animaciones sutiles sin desplazamiento de iconos.
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

export default function Protocols() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    const PROTOCOLS = [
        {
            id: 'ds',
            title: t('protocols.items.ds.title', 'PROTOCOL 01: DESIGN SYSTEMS'),
            subtitle: t('protocols.items.ds.subtitle', 'Escalabilidad Visual'),
            description: t('protocols.items.ds.desc', 'Construcción de bibliotecas de componentes atómicos y documentación técnica. Aseguro la consistencia visual y la integridad del sistema.'),
            icon: Layers,
        },
        {
            id: 'ui',
            title: t('protocols.items.ui.title', 'PROTOCOL 02: INTERFACE ENGINEERING'),
            subtitle: t('protocols.items.ui.subtitle', 'Fidelidad Técnica'),
            description: t('protocols.items.ui.desc', 'Desarrollo frontend con React y Framer Motion. Especializado en optimizar el rendimiento de renderizado y crear micro-interacciones.'),
            icon: Cpu,
        },
        {
            id: 'strategy',
            title: t('protocols.items.strategy.title', 'PROTOCOL 03: PRODUCT STRATEGY'),
            subtitle: t('protocols.items.strategy.subtitle', 'Visión a Ejecución'),
            description: t('protocols.items.strategy.desc', 'Diagnóstico técnico y visual para definir el roadmap de producto. Elimino la fricción operativa entre stakeholders e ingeniería.'),
            icon: Target,
        },
        {
            id: 'ai',
            title: t('protocols.items.ai.title', 'PROTOCOL 04: APPLIED AI RESEARCH'),
            subtitle: t('protocols.items.ai.subtitle', 'Innovación Operativa'),
            description: t('protocols.items.ai.desc', 'Implementación de flujos de trabajo inteligentes. Desde Ingeniería de Prompts hasta el despliegue de LLMs locales.'),
            icon: Workflow,
        },
    ];

    useGSAP(() => {
        const section = sectionRef.current;
        const grid = gridRef.current;

        if (!section || !grid) return;

        // Header animation
        gsap.fromTo('.protocols-header',
            { opacity: 0, x: -40, scale: 0.95 },
            {
                opacity: 1, x: 0, scale: 1,
                duration: 0.8, ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // Cards entry animation
        const protocolCards = grid.querySelectorAll('.protocol-card');
        protocolCards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.7, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="protocols" className="py-20 sm:py-24 px-6 relative overflow-hidden bg-void">
            {/* Code rain animation */}
            <DevParticles />
            <FloatingGlyphs />

            {/* Overlays */}
            <div className="protocols-overlay">
                <SectionLabel text="function solve(problem) { return design }" />
                <SectionLabel text="npm run build --production" side="right" />
            </div>

            <div className="max-w-[1400px] mx-auto">
                <header className="protocols-header mb-16 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-4 mb-2">
                        <CrosshairDot size={20} className="opacity-60" />
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X05 // PROTOCOLOS_OPERATIVOS
                        </span>
                    </div>

                    <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary mb-6 font-bold tracking-tighter break-words">
                        <CipherText text="¿Cómo Ayudo." />
                    </h2>

                    <p className="max-w-2xl text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                        <TypewriterText text={t('protocols.description', 'Estandarizo procesos y elimino la incertidumbre técnica mediante protocolos de ejecución diseñados para la excelencia operativa.')} delay={1.6} />
                    </p>
                </header>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {PROTOCOLS.map((protocol) => {
                        const IconComponent = protocol.icon;
                        return (
                            <div
                                key={protocol.id}
                                className="protocol-card group p-8 sm:p-10 border border-border bg-surface hover:border-cyan/30 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/20 group-hover:border-cyan transition-colors" />
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan/20 group-hover:border-cyan transition-colors" />
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan/20 group-hover:border-cyan transition-colors" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/20 group-hover:border-cyan transition-colors" />
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon with glow on hover */}
                                    <div className="mb-6 w-10 h-10 flex items-center justify-center border border-cyan/20 bg-cyan/5 group-hover:border-cyan/40 group-hover:bg-cyan/10 group-hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all duration-300">
                                        <IconComponent size={20} className="text-cyan" />
                                    </div>
                                    
                                    <div className="space-y-3 mb-6">
                                        <h3 className="mono text-[10px] text-cyan/80 tracking-widest uppercase">
                                            <ScrambleText text={protocol.title} />
                                        </h3>
                                        <h4 className="text-2xl font-sans font-bold text-text-primary tracking-tight uppercase group-hover:text-cyan transition-colors">
                                            {protocol.subtitle}
                                        </h4>
                                    </div>
                                    
                                    <p className="text-base text-text-secondary leading-relaxed font-sans mt-auto">
                                        {protocol.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
