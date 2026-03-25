import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CardValorant from '../components/CardValorant';
import { projects } from '../data/content';
import CipherText from '../components/CipherText';
import TypewriterText from '../components/TypewriterText';
import Particles from '../components/Particles';
import { SectionLabel, GhostText, CrosshairDot, FloatingGlyphs } from '../components/ValorantOverlays';
import { TriangleField, AbstractShapes } from '../components/ValorantPatterns';

export default function Portfolio({ onSelectProject, isTeaser = false, limit = 6 }) {
    const { t } = useTranslation();
    
    const mainFilters = [
        { id: 'Todos', label: t('portfolio.filter_all', 'Todos') },
        { id: 'Diseño', label: t('portfolio.filter_design', 'Diseño') },
        { id: 'Desarrollo', label: t('portfolio.filter_dev', 'Desarrollo') },
    ];

    const subcategories = {
        'Diseño': ['Todos', 'Crypto', 'Videojuegos', 'App', 'Web', 'Dashboard'],
        'Desarrollo': ['Todos', 'Videojuegos', 'Web', 'IA'],
    };

    const [activeFilter, setActiveFilter] = useState('Todos');
    const [activeSub, setActiveSub] = useState('Todos');

    const currentSubs = subcategories[activeFilter] || null;

    // Stable random seed per page visit (different each time the component mounts)
    const seedRef = useRef(Math.random());

    const filtered = useMemo(() => {
        let result = projects;
        if (activeFilter !== 'Todos') {
            result = result.filter(p => p.category === activeFilter);
        }
        if (activeSub !== 'Todos' && currentSubs) {
            result = result.filter(p => p.subcategory === activeSub);
        }

        // Apply teaser limit with random shuffle so projects vary on each visit
        if (isTeaser) {
            // Seeded Fisher-Yates shuffle (stable within the same mount)
            const arr = [...result];
            let seed = seedRef.current;
            for (let i = arr.length - 1; i > 0; i--) {
                seed = (seed * 9301 + 49297) % 233280;
                const j = Math.floor((seed / 233280) * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr.slice(0, limit);
        }
        return result;
    }, [activeFilter, activeSub, currentSubs, isTeaser, limit]);

    const handleMainFilter = (filterId) => {
        setActiveFilter(filterId);
        setActiveSub('Todos');
    };

    return (
        <section id={isTeaser ? 'tease-work' : 'work'} className="relative z-10 py-24 sm:py-32 px-6 bg-void border-t border-border overflow-hidden">
            <Particles quantity={30} />
            <FloatingGlyphs />

            {/* Valorant Overlays */}
            <SectionLabel text="projects.map(p => deploy(p))" />
            <SectionLabel text="git push origin main --force" side="right" />
            <GhostText text="04" position="top-right" size="text-[180px] md:text-[260px]" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Section Header */}
                <header className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-2"
                    >
                        <CrosshairDot size={20} className="opacity-60" />
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X04 // OPERACIONES_DIGITALES
                        </span>
                    </motion.div>

                    <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary mb-6 font-bold tracking-tighter break-words">
                        <CipherText text={t('portfolio.title', 'Casos de Estudio.')} />
                    </h2>

                    {!isTeaser && (
                        <p className="max-w-2xl text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                            <TypewriterText text={t('portfolio.description', 'Selección de misiones críticas donde el diseño y la ingeniería se fusionan para resolver problemas complejos a escala.')} delay={1.6} />
                        </p>
                    )}
                </header>
                
                {/* Filter Controls - Hidden in Teaser */}
                {!isTeaser && (
                    <div className="flex gap-2 mb-10 flex-wrap justify-start border-b border-border pb-6">
                        {mainFilters.map((filter) => (
                            <motion.button
                                key={filter.id}
                                onClick={() => handleMainFilter(filter.id)}
                                className={`
                                    mono text-[11px] font-bold tracking-wider px-4 py-2 rounded-sm cursor-pointer
                                    border transition-all duration-200 uppercase
                                    ${activeFilter === filter.id
                                        ? 'border-cyan text-cyan bg-cyan/5'
                                        : 'border-border text-text-secondary hover:border-text-dim hover:text-text-primary bg-surface'
                                    }
                                `}
                                whileTap={{ scale: 0.97 }}
                            >
                                [{filter.label}]
                                <span className="ml-1.5 text-[9px] opacity-60">
                                    {filter.id === 'Todos'
                                        ? projects.length
                                        : projects.filter(p => p.category === filter.id).length
                                    }
                                </span>
                            </motion.button>
                        ))}
                    </div>
                )}

                {/* List Container - Switched from Grid to Flex Col */}
                <motion.div layout className="flex flex-col border-t border-border/40 mt-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <CardValorant
                                key={project.id}
                                title={project.title}
                                subtitle={project.subtitle}
                                image={project.image}
                                tags={project.tags}
                                source={project.source}
                                link={project.link}
                                subcategory={project.subcategory}
                                mission={project.mission}
                                problem={project.problem}
                                solution={project.solution}
                                index={i}
                                onClick={() => onSelectProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {isTeaser && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-12 flex justify-start"
                    >
                        <a href="/work" className="group inline-flex items-center gap-3 border border-border bg-surface px-6 py-3 hover:border-cyan/50 hover:bg-cyan/5 transition-all cursor-pointer rounded-sm">
                            <span className="mono text-xs text-text-primary font-bold tracking-widest uppercase group-hover:text-cyan transition-colors">
                                VER ARCHIVO COMPLETO
                            </span>
                            <div className="w-4 h-px bg-text-dim group-hover:bg-cyan group-hover:w-6 transition-all" />
                        </a>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
