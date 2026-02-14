import { motion } from 'framer-motion';
import GlassContainerValorant from '../components/GlassContainerValorant';
import { skills } from '../data/content';

export default function Skills() {
    return (
        <section id="skills" className="relative z-10 py-24 sm:py-32 px-6">
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
                    <span className="mono text-text-dim tracking-[0.3em]">MÓDULO 01</span>
                    <div className="hud-line flex-1" />
                </motion.div>

                <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    MATRIZ DE HABILIDADES
                </motion.h2>
                <motion.p
                    className="text-text-secondary text-sm mb-12 max-w-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Stack tecnológico y capacidades de diseño del operador.
                </motion.p>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(skills).map(([key, category], catIdx) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: catIdx * 0.1 }}
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
                                                        'border-white/10 text-text-dim'
                                                    }`}>
                                                    {skill.level}
                                                </span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                                    className={`h-full absolute left-0 top-0 ${skill.level === 'EXPERT' ? 'bg-cyan' :
                                                        skill.level === 'SPECIALIST' ? 'bg-purple-500' :
                                                            'bg-white/40'
                                                        }`}
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
