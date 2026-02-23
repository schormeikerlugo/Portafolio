import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardValorant from '../components/CardValorant';
import { projects } from '../data/content';

const mainFilters = ['Todos', 'Diseño', 'Desarrollo'];

const subcategories = {
    'Diseño': ['Todos', 'Crypto', 'Videojuegos', 'App', 'Web', 'Dashboard'],
    'Desarrollo': ['Todos', 'Videojuegos', 'Web', 'IA'],
};

export default function Portfolio({ onSelectProject }) {
    const [activeFilter, setActiveFilter] = useState('Todos');
    const [activeSub, setActiveSub] = useState('Todos');

    const currentSubs = subcategories[activeFilter] || null;

    const filtered = useMemo(() => {
        let result = projects;
        if (activeFilter !== 'Todos') {
            result = result.filter(p => p.category === activeFilter);
        }
        if (activeSub !== 'Todos' && currentSubs) {
            result = result.filter(p => p.subcategory === activeSub);
        }
        return result;
    }, [activeFilter, activeSub, currentSubs]);

    const handleMainFilter = (filter) => {
        setActiveFilter(filter);
        setActiveSub('Todos');
    };

    return (
        <section id="projects" className="relative z-10 py-24 sm:py-32 px-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Section label */}
                <motion.div
                    className="flex items-center gap-3 mb-10 justify-center lg:justify-start"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="hud-line flex-1 lg:max-w-12" />
                    <span className="mono text-text-dim tracking-[0.3em] shrink-0">MÓDULO 02</span>
                    <div className="hud-line flex-1" />
                </motion.div>

                <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3 text-center lg:text-left"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    PROYECTOS DESTACADOS
                </motion.h2>
                <motion.p
                    className="text-text-secondary text-sm mb-10 max-w-lg text-center lg:text-left mx-auto lg:mx-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Panel de misiones completadas y sistemas activos.
                </motion.p>

                {/* Main Filters */}
                <div className="flex gap-2 mb-4 flex-wrap justify-center lg:justify-start">
                    {mainFilters.map((filter) => (
                        <motion.button
                            key={filter}
                            onClick={() => handleMainFilter(filter)}
                            className={`
                mono text-[11px] tracking-wider px-4 py-2 rounded cursor-pointer
                border transition-all duration-200
                ${activeFilter === filter
                                    ? 'border-cyan/40 text-cyan bg-cyan/5'
                                    : 'border-white/[0.06] text-text-dim hover:border-white/15 hover:text-text-secondary'
                                }
              `}
                            whileTap={{ scale: 0.97 }}
                        >
                            [{filter.toUpperCase()}]
                            <span className="ml-1.5 text-[9px] opacity-60">
                                {filter === 'Todos'
                                    ? projects.length
                                    : projects.filter(p => p.category === filter).length
                                }
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* Subcategory Filters */}
                <AnimatePresence mode="wait">
                    {currentSubs && (
                        <motion.div
                            key={activeFilter}
                            className="flex gap-1.5 mb-10 flex-wrap pl-2 border-l border-cyan/20 justify-center lg:justify-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentSubs.map((sub) => {
                                const count = sub === 'Todos'
                                    ? projects.filter(p => p.category === activeFilter).length
                                    : projects.filter(p => p.category === activeFilter && p.subcategory === sub).length;
                                return (
                                    <motion.button
                                        key={sub}
                                        onClick={() => setActiveSub(sub)}
                                        className={`
                          mono text-[10px] tracking-wider px-3 py-1.5 rounded cursor-pointer
                          border transition-all duration-200
                          ${activeSub === sub
                                                ? 'border-cyan/30 text-cyan bg-cyan/5'
                                                : 'border-white/[0.04] text-text-dim/70 hover:border-white/10 hover:text-text-dim'
                                            }
                        `}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {sub.toUpperCase()}
                                        <span className="ml-1 text-[8px] opacity-50">{count}</span>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* No subcategories spacer */}
                {!currentSubs && <div className="mb-10" />}

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                                index={i}
                                onClick={() => onSelectProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
