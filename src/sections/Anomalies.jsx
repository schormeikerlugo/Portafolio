import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Layers, Zap, Cpu } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';
import { CrosshairDot, FloatingGlyphs } from '../components/ValorantOverlays';

/* ═══════════════════════════════════════════════
   BRUTALIST SCI-FI ANOMALIES SECTION
   GSAP ScrollTrigger + stagger para entradas
   brutales con efectos de "corrupción de datos".
   
   WHY SCROLLTRIGGER BATCH: Anima múltiples
   elementos similares simultáneamente cuando
   entran en viewport, creando un efecto de
   "cascada brutalista" más efectivo que
   animaciones individuales.
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const ANOMALIES = [
    {
        id: 'anom-01',
        title: 'Sistemas Inconsistentes',
        code: 'ERR_HIGH_DEBT',
        impact: 'Fatiga de mantenimiento',
        description: 'La fragmentación visual y técnica genera una deuda técnica que ralentiza los lanzamientos y confunde al usuario final.',
        icon: Layers
    },
    {
        id: 'anom-02',
        title: 'Brecha Diseño-Ingeniería',
        code: 'ERR_SYNC_FAIL',
        impact: 'Fricción operativa',
        description: 'La falta de un lenguaje común entre diseñadores y desarrolladores resulta en implementaciones de baja fidelidad y fricción en los procesos.',
        icon: Zap
    },
    {
        id: 'anom-03',
        title: 'Arquitecturas Rígidas',
        code: 'ERR_NO_MODULAR',
        impact: 'Falta de modularidad',
        description: 'Interfaces que no pueden evolucionar sin romperse. La ausencia de un sistema de diseño atómico impide el escalado eficiente.',
        icon: Cpu
    }
];

const AnomalyItem = ({ item, index, containerRef }) => {
    const itemRef = useRef(null);

    useGSAP(() => {
        if (!itemRef.current) return;

        // WHY GSAP STAGGER: Animación escalonada brutal
        // que crea un efecto de "cascada de corrupción"
        // cuando los elementos entran en viewport
        gsap.fromTo(itemRef.current,
            {
                opacity: 0,
                y: 60,
                scale: 0.9,
                skewX: -3
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                skewX: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: 'top 85%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY GSAP: Efecto de "glitch" en hover
        // con skew y scale para brutalidad visual
        const handleMouseEnter = () => {
            gsap.to(itemRef.current, {
                scale: 1.02,
                skewX: 2,
                borderColor: 'rgba(0, 229, 255, 0.5)',
                duration: 0.2,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(itemRef.current, {
                scale: 1,
                skewX: 0,
                borderColor: 'rgba(255, 255, 255, 0.05)',
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        itemRef.current.addEventListener('mouseenter', handleMouseEnter);
        itemRef.current.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (itemRef.current) {
                itemRef.current.removeEventListener('mouseenter', handleMouseEnter);
                itemRef.current.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, { scope: itemRef });

    return (
        <div
            ref={itemRef}
            className="group relative p-8 bg-surface border border-border hover:border-cyan/30 transition-all duration-300 flex flex-col h-full"
            style={{ willChange: 'transform, opacity' }}
        >
            {/* Brutalist corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/20 group-hover:border-cyan transition-colors" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan/20 group-hover:border-cyan transition-colors" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan/20 group-hover:border-cyan transition-colors" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/20 group-hover:border-cyan transition-colors" />

            <div className="relative z-10 flex flex-col h-full space-y-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="mono text-xs text-text-dim font-bold tracking-widest uppercase">{item.code}</span>
                    </div>
                    <item.icon size={20} className="text-text-dim group-hover:text-cyan transition-colors" />
                </div>

                <div className="space-y-3 flex-grow">
                    <h3 className="text-xl font-mono font-bold text-text-primary uppercase tracking-tight group-hover:text-cyan transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed font-sans">
                        {item.description}
                    </p>
                </div>

                <div className="pt-6 mt-auto border-t border-border">
                    <p className="mono text-xs text-text-dim uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse"></span>
                        Impacto: <span className="text-text-secondary">{item.impact}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Anomalies() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const grid = gridRef.current;

        if (!section || !grid) return;

        // WHY SCROLLTRIGGER: Header se desplaza brutalmente
        // cuando la sección entra en viewport
        gsap.fromTo('.anomalies-header',
            {
                opacity: 0,
                x: -40,
                scale: 0.95
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY SCROLLTRIGGER: Grid items con stagger brutal
        // que crea un efecto de "cascada de corrupción"
        gsap.fromTo(grid.children,
            {
                opacity: 0,
                y: 60,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY SCROLLTRIGGER: Efecto parallax brutal
        // en los overlays decorativos
        gsap.to('.anomalies-overlay', {
            y: -30,
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="anomalias" className="relative z-10 py-20 sm:py-24 px-6 bg-void">
            {/* Subtle code particles */}
            <FloatingGlyphs />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <header className="anomalies-header mb-16 text-center md:text-left">
                    <div className="flex items-center gap-4 mb-6">
                        <CrosshairDot size={20} className="opacity-60" />
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X01 // DIAGNÓSTICO_DE_SISTEMAS
                        </span>
                    </div>

                    <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary mb-6 font-bold tracking-tighter break-words">
                        <CipherText text="Detectando Anomalías." />
                    </h2>

                    <p className="max-w-2xl text-text-secondary text-lg sm:text-xl leading-relaxed font-sans mb-16">
                        <TypewriterText text="Antes de construir, analizo. Identifico los puntos de fallo estructurales que impiden a un producto alcanzar su máxima velocidad de escape." delay={1.6} />
                    </p>
                </header>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ANOMALIES.map((item, i) => (
                        <AnomalyItem key={item.id} item={item} index={i} containerRef={sectionRef} />
                    ))}
                </div>
            </div>
        </section>
    );
}
