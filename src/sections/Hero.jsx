import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import MatrixRain from '../components/MatrixRain';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';
import { CornerBrackets, ChevronMarker, FloatingGlyphs } from '../components/ValorantOverlays';

/* ═══════════════════════════════════════════════
   HERO SECTION — Sequential Entry
   
   0.0s → Matrix rain
   3.0s → Backdrop blur + overlays
   3.5s → #include label
   3.8s → Nombre (CipherText)
   4.8s → Subtitle (TypewriterText)
   5.5s → Paragraph
   6.0s → Buttons
   6.3s → Vertical labels + Chevron
   ═══════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ onOpenContact, isAppLoading }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const blurRef = useRef(null);
    const overlayRef = useRef(null);
    const includeRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const paragraphRef = useRef(null);
    const buttonsRef = useRef(null);
    const verticalLeftRef = useRef(null);
    const verticalRightRef = useRef(null);
    const chevronRef = useRef(null);

    useGSAP(() => {
        const hero = heroRef.current;
        if (!hero || isAppLoading) return;

        const entryTl = gsap.timeline({ delay: 0.5 });

        gsap.set([
            blurRef.current,
            overlayRef.current,
            includeRef.current,
            titleRef.current,
            subtitleRef.current,
            paragraphRef.current,
            buttonsRef.current,
            verticalLeftRef.current,
            verticalRightRef.current,
            chevronRef.current
        ].filter(Boolean), { opacity: 0 });

        entryTl.to(blurRef.current, { opacity: 1, duration: 1.2, ease: 'power2.out' }, 3.0);
        entryTl.to(overlayRef.current, { opacity: 1, duration: 1.0, ease: 'power2.out' }, 3.0);
        entryTl.fromTo(includeRef.current, { opacity: 0, y: -10 }, { opacity: 0.7, y: 0, duration: 0.5 }, 3.5);
        entryTl.to(titleRef.current, { opacity: 1, duration: 0.3 }, 3.8);
        entryTl.to(subtitleRef.current, { opacity: 1, duration: 0.3 }, 4.8);
        entryTl.fromTo(paragraphRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 5.5);
        entryTl.fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 6.0);
        
        // Vertical labels
        entryTl.fromTo([verticalLeftRef.current, verticalRightRef.current],
            { opacity: 0 }, { opacity: 1, duration: 0.6 }, 6.3
        );
        
        entryTl.fromTo(chevronRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 6.5);

        // Scroll parallax
        gsap.to(contentRef.current, {
            opacity: 0.6, y: -30,
            scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 }
        });

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, { scope: heroRef, dependencies: [isAppLoading] });

    return (
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center px-6 z-10 bg-transparent overflow-hidden">
            {/* Matrix rain */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <MatrixRain opacity={0.35} />
            </div>

            {/* Backdrop blur */}
            <div ref={blurRef} className="absolute inset-0 pointer-events-none z-[1] backdrop-blur-[6px] bg-void/40 opacity-0" />

            {/* Overlays */}
            <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-[2] opacity-0">
                <FloatingGlyphs />
            </div>

            {/* Vertical label — left */}
            <div ref={verticalLeftRef} className="absolute top-0 bottom-0 left-2 md:left-4 lg:left-6 z-20 pointer-events-none hidden md:flex items-center opacity-0">
                <div className="flex items-center gap-3" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(0,229,255,0.6)] animate-pulse" />
                    <span className="mono text-[10px] text-cyan/40 tracking-[0.5em] uppercase font-bold whitespace-nowrap">
                        const init = () =&gt; // SYSTEM.BOOT
                    </span>
                    <span className="block w-px h-16 bg-gradient-to-b from-cyan/30 to-transparent" style={{ writingMode: 'horizontal-tb' }} />
                </div>
            </div>

            {/* Vertical label — right */}
            <div ref={verticalRightRef} className="absolute top-0 bottom-0 right-2 md:right-4 lg:right-6 z-20 pointer-events-none hidden md:flex items-center opacity-0">
                <div className="flex items-center gap-3" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(0,229,255,0.6)] animate-pulse" />
                    <span className="mono text-[10px] text-cyan/40 tracking-[0.5em] uppercase font-bold whitespace-nowrap">
                        import { '{ Portfolio }' } from '@sl'
                    </span>
                    <span className="block w-px h-16 bg-gradient-to-b from-cyan/30 to-transparent" style={{ writingMode: 'horizontal-tb' }} />
                </div>
            </div>

            {/* Main content */}
            <div ref={contentRef} className="max-w-[1400px] mx-auto w-full flex flex-col items-center justify-center text-center mt-24 sm:mt-0 relative z-10 px-4">
                <div className="flex flex-col items-center w-full">
                    <div ref={includeRef} className="mono text-xs tracking-[0.2em] text-cyan mb-6 opacity-0">
                        #include&lt;iostream&gt;
                    </div>

                    <div ref={titleRef} className="min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center w-full opacity-0">
                        <h1 className="relative text-[clamp(1.5rem,8vw,6rem)] font-sans text-text-primary font-bold leading-none tracking-tighter mix-blend-plus-lighter whitespace-nowrap">
                            <CipherText text="Schormeiker Lugo" delay={4.0} duration={1.0} />
                        </h1>
                    </div>

                    <h2 ref={subtitleRef} className="text-base sm:text-lg font-mono text-text-secondary uppercase tracking-widest mb-8 min-h-[4rem] sm:min-h-[2rem] opacity-0">
                        <TypewriterText text="Frontend Design Engineer // System Architect" delay={0} speed={0.025} />
                    </h2>

                    <p ref={paragraphRef} className="font-sans text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed mb-12 mx-auto opacity-0">
                        {t('hero.desc_new', 'En el desarrollo de las tecnologias web, Configuro entornos operativos de alto rendimiento. Soluciono la fricción entre diseño e ingeniería mediante código claro y ejecución precisa.')}
                    </p>

                    <div ref={buttonsRef} className="opacity-0">
                        <CornerBrackets size={16} color="border-cyan/10" hoverColor="group-hover:border-cyan/40" className="p-3">
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <button onClick={() => navigate('/about')} className="px-8 py-3 bg-cyan text-void font-mono text-[11px] tracking-[0.2em] font-bold hover:bg-white transition-colors duration-300 uppercase glow-hover cursor-pointer">
                                    [ {t('hero.cta_approach', 'VER MI ENFOQUE')} ]
                                </button>
                                <button onClick={() => navigate('/work')} className="px-8 py-3 border border-border text-text-primary font-mono text-[11px] tracking-[0.2em] hover:border-cyan hover:text-cyan hover-glow-soft transition-colors duration-300 uppercase cursor-pointer">
                                    [ {t('hero.cta_work', 'CASOS DE ESTUDIO')} ]
                                </button>
                            </div>
                        </CornerBrackets>
                    </div>
                </div>
            </div>

            {/* Chevron */}
            <div ref={chevronRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-0">
                <ChevronMarker direction="down" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-void to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default Hero;
