import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import GlassContainerValorant from '../components/GlassContainerValorant';
import { skills } from '../data/content';
import CipherText from '../components/CipherText';
import TypewriterText from '../components/TypewriterText';
import { CrosshairDot, FloatingGlyphs } from '../components/ValorantOverlays';

/* ═══════════════════════════════════════════════
   BRUTALIST SCI-FI SKILLS SECTION
   GSAP ScrollTrigger para efectos de "carga de
   datos" brutales con progress bars animadas.
   
   WHY SCROLLTRIGGER: Las barras de progreso se
   animan cuando entran en viewport, creando un
   efecto de "inicialización de módulos" brutal.
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        const grid = gridRef.current;

        if (!section || !grid) return;

        // WHY SCROLLTRIGGER: Header se desplaza brutalmente
        gsap.fromTo('.skills-header',
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
        // que crea un efecto de "cascada de inicialización"
        gsap.fromTo(grid.children,
            {
                opacity: 0,
                y: 50,
                scale: 0.95,
                rotateX: 5
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY SCROLLTRIGGER: Progress bars se llenan
        // cuando entran en viewport con efecto brutal
        const progressBars = grid.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, i) => {
            const progress = parseInt(bar.dataset.progress) || 0;
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    width: `${progress}%`,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        });

        // WHY SCROLLTRIGGER: Efecto parallax brutal
        // en los overlays decorativos
        gsap.to('.skills-overlay', {
            y: -20,
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
        <section ref={sectionRef} id="skills" className="relative z-10 py-20 sm:py-24 px-6 bg-void overflow-hidden">
            {/* Subtle code particles */}
            <FloatingGlyphs />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <header className="skills-header mb-16 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-4 mb-2">
                        <CrosshairDot size={20} className="opacity-60" />
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X02 // MATRIZ_DE_HABILIDADES
                        </span>
                    </div>

                    <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary mb-6 font-bold tracking-tighter break-words">
                        <CipherText text="Matriz de Habilidades." />
                    </h2>
                    
                    <p className="max-w-2xl text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                        <TypewriterText text="Stack tecnológico y capacidades de diseño del operador." delay={1.6} />
                    </p>
                </header>

                {/* Skills Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(skills).map(([key, category], catIdx) => (
                        <div
                            key={key}
                            className="h-full"
                        >
                            <GlassContainerValorant className="p-0 h-full flex flex-col relative group/card">
                                {/* Header */}
                                <div className="p-5 border-b border-white/5 bg-white/[0.01]">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="mono text-xs text-cyan tracking-[0.15em] uppercase">
                                            {category.title}
                                        </h3>
                                        <span className="mono text-[10px] text-text-dim">MK-IV</span>
                                    </div>
                                    <p className="text-[10px] text-text-dim uppercase tracking-wider">{category.category} MODULE</p>
                                </div>

                                {/* Items List */}
                                <div className="p-5 flex-1 space-y-5">
                                    {category.items.map((skill, i) => (
                                        <div
                                            key={skill.name}
                                            className="group/item relative"
                                            onMouseEnter={() => {
                                                const console = document.getElementById(`console-${key}`);
                                                if (console) {
                                                    console.innerHTML = `<span class="text-cyan">> DETECTED:</span> ${skill.name}<br/><span class="text-text-dim">> ${skill.details}</span>`;
                                                    console.classList.add('active');
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                const console = document.getElementById(`console-${key}`);
                                                if (console) {
                                                    console.innerHTML = `<span class="text-text-dim opacity-50">> SYSTEM IDLE // AWAITING INPUT...</span>`;
                                                    console.classList.remove('active');
                                                }
                                            }}
                                        >
                                            {/* Label & Level */}
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium text-text-secondary group-hover/item:text-white transition-colors cursor-default">
                                                    {skill.name}
                                                </span>
                                                <span className={`mono text-[9px] px-1.5 py-0.5 rounded border ${skill.level === 'EXPERT' ? 'border-cyan/30 text-cyan bg-cyan/5' :
                                                    skill.level === 'SPECIALIST' ? 'border-purple-500/30 text-purple-400 bg-purple-500/5' :
                                                        skill.level === 'ADVANCED' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' :
                                                            skill.level === 'INTERMEDIATE' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5' :
                                                                'border-white/10 text-text-dim'
                                                    }`}>
                                                    {skill.level}
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                                                <div
                                                    className={`skill-progress h-full absolute left-0 top-0 ${skill.level === 'EXPERT' ? 'bg-cyan' :
                                                        skill.level === 'SPECIALIST' ? 'bg-purple-500' :
                                                            skill.level === 'ADVANCED' ? 'bg-blue-500' :
                                                                skill.level === 'INTERMEDIATE' ? 'bg-emerald-500' :
                                                                    'bg-white/40'
                                                        }`}
                                                    data-progress={skill.progress}
                                                    style={{ width: '0%' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tactical Console (Fixed Footer) */}
                                <div className="p-4 mt-auto border-t border-white/5 bg-black/20 h-[72px] flex items-center overflow-hidden">
                                    <p
                                        id={`console-${key}`}
                                        className="mono text-[10px] uppercase tracking-wide leading-relaxed transition-colors duration-200"
                                    >
                                        <span className="text-text-dim opacity-50">&gt; SYSTEM IDLE // AWAITING INPUT...</span>
                                    </p>
                                </div>
                            </GlassContainerValorant>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
