import { useRef } from 'react';
import { Cpu, Terminal, Shield, Target, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';

/* ═══════════════════════════════════════════════
   BRUTALIST SCI-FI BIO SECTION
   GSAP ScrollTrigger scrub para efectos de
   "reconstrucción de datos" brutales.
   
   WHY SCROLLTRIGGER SCRUB: Vincula la animación
   al scroll para crear un efecto de "revelación
   progresiva" brutalista donde los elementos
   se reconstruyen a medida que el usuario scrollea.
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const MISSIONS = [
    {
        id: 'mission-07',
        role: 'UI/UX Designer & Frontend Developer',
        company: 'AQOMI (Poland)',
        period: 'SEP 2023 — MAY 2025',
        tech: ['Figma', 'WordPress', 'AI', 'React'],
        description: 'Lideré el desarrollo de identidades visuales y prototipos de alta fidelidad. Implementé sitios WordPress personalizados e integré herramientas de IA (ChatGPT, Midjourney) para la exploración visual avanzada.',
    },
    {
        id: 'mission-06',
        role: 'UI/UX Designer',
        company: 'SACSCLOUD.COM (Mexico)',
        period: 'AUG 2020 — AUG 2023',
        tech: ['Figma', 'Design Systems', 'UX Research'],
        description: 'Rediseñé dashboards SaaS reduciendo el tiempo de navegación en un 30%. Establecí sistemas de diseño reutilizables para garantizar la consistencia visual en todo el ecosistema de la nube.',
    },
    {
        id: 'mission-05',
        role: 'UI/UX Designer',
        company: 'SPLINTERLANDS (USA)',
        period: 'NOV 2021 — MAR 2022',
        tech: ['Blockchain', 'Game UI', 'Midjourney'],
        description: 'Diseñé interfaces para un popular juego Web3. Integré visuales generados por IA y colaboré con equipos de blockchain para el alineamiento de activos NFT.',
    },
    {
        id: 'mission-04',
        role: 'UI/UX Designer',
        company: 'TAKODEFI (Spain)',
        period: 'AUG 2020 — APR 2021',
        tech: ['Web3', 'DeFi', 'User Research'],
        description: 'Diseñé interfaces DeFi para staking y farming. Creé flujos intuitivos para usuarios no familiarizados con cripto, reduciendo errores transaccionales significativamente.',
    },
    {
        id: 'mission-03',
        role: 'UI/UX Designer',
        company: 'KOOOMO (Colombia)',
        period: 'JUL 2020 — SEP 2020',
        tech: ['eCommerce', 'UX Audit', 'Figma'],
        description: 'Rediseñé tableros de eCommerce y realicé auditorías de UX para aumentar las tasas de adopción de funciones críticas.',
    },
    {
        id: 'mission-02',
        role: 'Web Designer',
        company: 'LIMBIC (Chile)',
        period: '2020',
        tech: ['Figma', 'WordPress', 'eCommerce'],
        description: 'Diseñé sitios institucionales receptivos y plataformas de eCommerce para startups tecnológicas, mejorando las tasas de conversión en un 20%.',
    },
    {
        id: 'mission-01',
        role: 'Tech Support & Designer',
        company: 'PASSWORD TECHNOLOGY (Venezuela)',
        period: 'JAN 2018 — MAY 2020',
        tech: ['Adobe Suite', 'HTML/CSS', 'Support'],
        description: 'Combiné soporte técnico con diseño visual para modernizar la imagen corporativa y mejorar la experiencia de atención al cliente.',
    },
];

const TechnicalTag = ({ icon: Icon, label, value }) => (
    <div className="bio-tag inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-surface hover:border-cyan/30 transition-all rounded-sm">
        <Icon size={12} className="text-cyan/60" />
        <span className="mono text-[10px] text-text-dim uppercase tracking-widest">{label}:</span>
        <span className="mono text-[10px] text-text-primary font-bold">{value}</span>
    </div>
);

const TimelineItem = ({ m, index, isLast, containerRef }) => {
    const itemRef = useRef(null);

    useGSAP(() => {
        if (!itemRef.current) return;

        // WHY SCROLLTRIGGER SCRUB: Animación vinculada
        // al scroll para revelación progresiva brutal
        gsap.fromTo(itemRef.current,
            {
                opacity: 0,
                x: index % 2 === 0 ? -60 : 60,
                scale: 0.9,
                rotateY: index % 2 === 0 ? -5 : 5
            },
            {
                opacity: 1,
                x: 0,
                scale: 1,
                rotateY: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1, // Suaviza el scroll
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
                duration: 0.2,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            gsap.to(itemRef.current, {
                scale: 1,
                skewX: 0,
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
            className="relative px-6 sm:pl-16 pb-16 group text-center md:text-left"
            style={{ willChange: 'transform, opacity' }}
        >
            {!isLast && (
                <div className="absolute left-[5px] sm:left-[9px] top-6 bottom-0 w-px bg-border hidden sm:block" />
            )}
            <div className="absolute left-[-4px] sm:left-0 top-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border bg-void hidden sm:flex items-center justify-center group-hover:border-cyan/50 transition-all z-10">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-text-dim group-hover:bg-cyan transition-colors" />
            </div>

            {/* Brutalist corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan/10 group-hover:border-cyan transition-colors" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan/10 group-hover:border-cyan transition-colors" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan/10 group-hover:border-cyan transition-colors" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan/10 group-hover:border-cyan transition-colors" />

            <div className="w-full space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="mono text-xs text-text-secondary font-bold tracking-[0.2em] uppercase">
                        {m.period}
                    </span>
                    <div className="h-px flex-1 bg-border hidden sm:block" />
                    <span className="mono text-[9px] text-text-dim uppercase tracking-widest bg-surface border border-border px-2 py-0.5 rounded-sm">
                        MISSION_ID: {MISSIONS.length - index}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-8 space-y-3">
                        <h3 className="font-sans text-2xl sm:text-3xl font-bold text-text-primary uppercase tracking-tight group-hover:text-cyan transition-colors">
                            {m.role}
                        </h3>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <Globe size={14} className="text-cyan/80" />
                            <span className="mono text-[11px] sm:text-sm text-text-secondary uppercase tracking-widest">{m.company}</span>
                        </div>
                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans pt-2">
                            {m.description}
                        </p>
                    </div>

                    <div className="lg:col-span-4 space-y-3 pt-2 lg:pt-0">
                        <div className="flex items-center justify-center md:justify-start gap-2 opacity-50">
                            <Terminal size={12} />
                            <span className="mono text-[10px] text-text-secondary uppercase tracking-widest font-bold">TECH_STACK</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            {m.tech.map(t => (
                                <span key={t} className="mono text-[10px] text-cyan/80 border border-cyan/20 px-2 py-1 bg-cyan/5 rounded-sm uppercase tracking-wider">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Bio({ isTeaser = false }) {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const profileRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // WHY SCROLLTRIGGER: Header se desplaza brutalmente
        gsap.fromTo('.bio-header',
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

        // WHY SCROLLTRIGGER: Tags se animan con stagger
        gsap.fromTo('.bio-tag',
            {
                opacity: 0,
                y: 20,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY SCROLLTRIGGER SCRUB: Texto se revela
        // progresivamente con el scroll
        gsap.fromTo('.bio-text',
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: '.bio-text',
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1,
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY SCROLLTRIGGER: Profile image con efecto brutal
        if (profileRef.current) {
            gsap.fromTo(profileRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    rotateY: 10
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: profileRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    }
                }
            );
        }

        // WHY SCROLLTRIGGER: Mission statement con efecto brutal
        gsap.fromTo('.mission-statement',
            {
                opacity: 0,
                scale: 0.95,
                borderLeftWidth: 0
            },
            {
                opacity: 1,
                scale: 1,
                borderLeftWidth: 2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.mission-statement',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        // WHY SCROLLTRIGGER: Timeline header con efecto brutal
        gsap.fromTo('.timeline-header',
            {
                opacity: 0,
                x: -30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.timeline-header',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                }
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="about" className="relative z-10 py-24 sm:py-32 px-6 bg-void border-t border-border">

            {/* Fondo de Puntos Animado Sutil */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.8) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Viñeta para difuminar los bordes hacia negro */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_80%)]" />
            </div>

            <div className="max-w-[1400px] mx-auto flex flex-col items-start relative z-10">
                <div className="w-full flex flex-col items-center md:items-start text-center md:text-left space-y-12">
                    <div className="bio-header flex items-center gap-4 mb-2">
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X03 // HISTORIA_DE_LA_MISIÓN
                        </span>
                    </div>

                    <div className="space-y-6 w-full">
                        <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary leading-[1] font-bold tracking-tighter mb-6 break-words">
                            <CipherText text="Orígenes." />
                        </h2>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                            <TechnicalTag icon={Cpu} label="Exp" value="+07 YRS" />
                            <TechnicalTag icon={Terminal} label="Prod" value="12 UNIT" />
                            <TechnicalTag icon={Shield} label="SLA" value="99.9%" />
                            <TechnicalTag icon={Target} label="Lead" value="06 TEAM" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start w-full">
                        {/* Left: Texts */}
                        <div className="bio-text flex-1 space-y-10">
                            <div className="space-y-6 text-text-secondary text-lg sm:text-xl leading-relaxed font-sans max-w-3xl">
                                <p>{t('bio.p1', 'Hola, mi nombre es Schormeiker Lugo, Diseñador UI/UX y Desarrollador Frontend con más de siete años de trayectoria profesional. Mi perfil une una capacidad técnica avanzada con un sólido conocimiento en Diseño de interfaces graficas y prototipado. Esta combinación me facilita crear productos digitales que poseen una arquitectura robusta y priorizan la experiencia del usuario final.')}</p>
                                <p>{t('bio.p2', 'Mi metodología transforma flujos complejos en interfaces eficientes y atractivas. El proceso creativo se respalda con un dominio profundo de HTML, CSS y JavaScript. Además, construyo aplicaciones interactivas mediante React y Vite, y conecto estos entornos visuales con bases de datos ágiles utilizando herramientas como Supabase y PostgreSQL.')}</p>
                                <p>{t('bio.p3', 'El flujo de trabajo que utilizo integra la Inteligencia Artificial como un recurso fundamental. Mi experiencia en ingeniería de prompts maximiza el rendimiento de los modelos de lenguaje (LLMs), tanto en plataformas comerciales como en entornos de ejecución local. Esta adopción tecnológica acelera la ideación visual, automatiza tareas rutinarias y eleva la calidad general de cada proyecto.')}</p>
                            </div>

                            {/* Evolución integrada sin cajones pesados */}
                            <div className="space-y-10 text-text-secondary text-base sm:text-lg leading-relaxed font-sans border-t border-white/5 pt-10 max-w-3xl">
                                <div>
                                    <h4 className="mono text-lg sm:text-xl text-cyan uppercase tracking-[0.2em] block mb-2 font-bold opacity-90">{t('bio.phases.t1', '01 // Diseño UI/UX')}</h4>
                                    <p>{t('bio.phases.d1', 'Mi trayectoria comenzó con la estructuración de la estética y la interacción humana. El trabajo en startups y plataformas de comercio electrónico consolidó mis bases en la psicología visual y la arquitectura de la información. Esta experiencia inicial afinó mi criterio para asegurar una alta consistencia técnica en cada interfaz.')}</p>
                                </div>

                                <div>
                                    <h4 className="mono text-lg sm:text-xl text-cyan uppercase tracking-[0.2em] block mb-2 font-bold opacity-90">{t('bio.phases.t2', '02 // Ingeniería Frontend')}</h4>
                                    <p>{t('bio.phases.d2', 'La diferencia visual entre el diseño original y el producto final motivó un cambio de enfoque decisivo. Esta fricción operativa me impulsó a dominar arquitecturas basadas en React y Tailwind CSS. Hoy en día, asumo el control total del código para garantizar resultados exactos y prevenir cualquier pérdida de fidelidad visual.')}</p>
                                </div>

                                <div>
                                    <h4 className="mono text-lg sm:text-xl text-cyan uppercase tracking-[0.2em] block mb-2 font-bold opacity-90">{t('bio.phases.t3', '03 // Sistemas Interactivos')}</h4>
                                    <p>{t('bio.phases.d3', 'Las interfaces estáticas presentan limitaciones en la retención del usuario. Los ecosistemas Web3 y los productos digitales avanzados requieren microinteracciones para construir confianza. Por esta razón, integro bibliotecas de animación como GSAP y Framer Motion. Estas tecnologías transforman pantallas planas en entornos dinámicos que responden de forma natural a cada acción de la persona.')}</p>
                                </div>

                                <div>
                                    <h4 className="mono text-lg sm:text-xl text-cyan uppercase tracking-[0.2em] block mb-2 font-bold opacity-90">{t('bio.phases.t4', '04 // IA y Automatización')}</h4>
                                    <p>{t('bio.phases.d4', 'El tiempo de programación representa frecuentemente el mayor desafío técnico en la actualidad. Mi metodología resuelve este problema mediante la adopción de la Inteligencia Artificial en el ciclo diario de trabajo. Aplico técnicas avanzadas de ingeniería de prompts y ejecuto modelos de lenguaje (LLMs) en entornos locales. Esta estrategia acelera significativamente la escritura de código, la producción y la experimentación constante.')}</p>
                                </div>
                            </div>

                            <div className="mission-statement relative p-6 sm:p-8 border-l-2 border-cyan bg-surface">
                                <p className="italic font-sans text-text-primary text-xl md:text-2xl leading-snug">
                                    "{t('bio.mission_statement', 'Cierro la brecha entre la ingeniería abstracta y la intuición humana.')}"
                                </p>
                            </div>
                        </div>

                        {/* Right: Sci-Fi Profile Picture (Sticky) */}
                        <div ref={profileRef} className="hidden lg:block w-[320px] lg:w-[360px] shrink-0 sticky top-40 self-start">
                            <div
                                className="aspect-[4/5] relative group overflow-hidden bg-void/50 shadow-[0_0_30px_rgba(0,229,255,0.05)] border border-cyan/20 z-10"
                                style={{
                                    clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                                }}
                            >
                            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                                <filter id="pixelate-strong" x="-20%" y="-20%" width="140%" height="140%">
                                    <feFlood x="6" y="6" height="3" width="3" floodColor="white" />
                                    <feComposite width="12" height="12" />
                                    <feTile result="a" />
                                    <feComposite in="SourceGraphic" in2="a" operator="in" />
                                    <feMorphology operator="dilate" radius="3" />
                                </filter>
                            </svg>

                            {/* Default: Glitched/Pixelated State */}
                            <div className="absolute inset-0 z-10 group-hover:opacity-0 transition-opacity duration-500">
                                <img
                                    src="/media/perfil.jpg"
                                    alt="Schormeiker Lugo Glitched"
                                    className="absolute inset-0 w-full h-full object-cover animate-profile-glitch"
                                    style={{ filter: 'grayscale(100%) url(#pixelate-strong)' }}
                                />
                                {/* RGB Split Layer */}
                                <img
                                    src="/media/perfil.jpg"
                                    alt="Schormeiker Lugo RGB"
                                    className="absolute inset-0 w-full h-full object-cover animate-profile-glitch opacity-40 mix-blend-screen"
                                    style={{ 
                                        filter: 'grayscale(100%) url(#pixelate-strong) sepia(100%) saturate(500%) hue-rotate(180deg)',
                                        transform: 'translateX(3px)'
                                    }}
                                />
                                {/* Scanline effect (internal to glitch state) */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-50">
                                    <div className="w-full h-[2px] bg-cyan/50 animate-scanline shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                                </div>
                            </div>

                            {/* Hover/Tap: Clear Reveal State */}
                            <img
                                src="/media/perfil.jpg"
                                alt="Schormeiker Lugo Revealed"
                                className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"
                            />

                            {/* Corner accents */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/30 group-hover:border-cyan transition-colors z-20" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan/30 group-hover:border-cyan transition-colors z-20" />


                            </div>
                        </div>

                        {/* Mobile Profile Picture (Non-sticky fallback) */}
                        <div
                            className="lg:hidden w-full sm:w-[320px] aspect-[4/5] relative group overflow-hidden bg-void/50 shadow-[0_0_30px_rgba(0,229,255,0.05)] border border-cyan/20 mt-8"
                            style={{
                                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                        >
                            {/* Same Glitch Setup for Mobile */}
                            <div className="absolute inset-0 z-10 group-hover:opacity-0 transition-opacity duration-500">
                                <img
                                    src="/media/perfil.jpg"
                                    alt="Schormeiker Lugo Glitched Mobile"
                                    className="absolute inset-0 w-full h-full object-cover animate-profile-glitch"
                                    style={{ filter: 'grayscale(100%) url(#pixelate-strong)' }}
                                />
                                {/* Scanline effect (Mobile) */}
                                <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-50">
                                    <div className="w-full h-[2px] bg-cyan/50 animate-scanline shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                                </div>
                            </div>

                            <img
                                src="/media/perfil.jpg"
                                alt="Schormeiker Lugo Revealed Mobile"
                                className="absolute inset-0 w-full h-full object-cover filter grayscale opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"
                            />

                            {/* Corner accents */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/30 group-hover:border-cyan transition-colors z-20" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan/30 group-hover:border-cyan transition-colors z-20" />


                        </div>
                    </div>

                </div>

                {!isTeaser && (
                    <div className="w-full mt-32 pt-24 border-t border-border">
                        <header className="timeline-header mb-16 flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans font-bold text-text-primary tracking-tighter break-words">
                                <CipherText text="Historial Operativo." />
                            </h3>
                        </header>
                        <div ref={timelineRef} className="relative">
                            {MISSIONS.map((m, i) => (
                                <TimelineItem key={m.id} m={m} index={i} isLast={i === MISSIONS.length - 1} containerRef={sectionRef} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
