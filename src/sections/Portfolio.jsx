import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardValorant from '../components/CardValorant';
import { projects } from '../data/content';

const filters = ['Todos', 'Diseño', 'Desarrollo'];

export default function Portfolio({ onSelectProject }) {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filtered = activeFilter === 'Todos'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="projects" className="relative z-10 py-24 sm:py-32 px-6">
            <div className="max-w-[1600px] mx-auto">
                {/* Section label */}
                <motion.div
                    className="flex items-center gap-3 mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="hud-line flex-1 max-w-12" />
                    <span className="mono text-text-dim tracking-[0.3em]">MÓDULO 02</span>
                    <div className="hud-line flex-1" />
                </motion.div>

                <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    PROYECTOS DESTACADOS
                </motion.h2>
                <motion.p
                    className="text-text-secondary text-sm mb-10 max-w-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Panel de misiones completadas y sistemas activos.
                </motion.p>

                {/* Filters */}
                <div className="flex gap-2 mb-10 flex-wrap">
                    {filters.map((filter) => (
                        <motion.button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
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
                        </motion.button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <CardValorant
                                key={project.id}
                                title={project.title}
                                subtitle={project.subtitle}
                                image={project.image}
                                tags={project.tags}
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
