import { motion } from 'framer-motion';
import { Monitor, Cpu, CircuitBoard, MemoryStick } from 'lucide-react';
import GlassContainerValorant from '../components/GlassContainerValorant';
import { telemetry } from '../data/content';

const icons = {
    OS: Monitor,
    CPU: Cpu,
    GPU: CircuitBoard,
    RAM: MemoryStick,
};

export default function Bio() {
    return (
        <section id="bio" className="relative z-10 py-24 sm:py-32 px-6">
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
                    <span className="mono text-text-dim tracking-[0.3em]">MÓDULO 03</span>
                    <div className="hud-line flex-1" />
                </motion.div>

                <GlassContainerValorant className="rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left: Bio */}
                        <motion.div
                            className="p-6 sm:p-8 md:border-r border-white/[0.06]"
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <h3 className="mono text-cyan text-xs tracking-[0.2em] mb-5">
                                PERFIL OPERATIVO
                            </h3>
                            <p className="text-text-secondary text-sm leading-relaxed">
                                Especialista en la integración estratégica de IA aplicada al
                                diseño y desarrollo. Optimización de procesos mediante Ingeniería
                                de Prompts y despliegue de LLMs locales para flujos de trabajo
                                eficientes y privados.
                            </p>
                            <div className="mt-6 pt-5 border-t border-white/[0.05]">
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    Enfoque en arquitecturas modernas con React y Supabase.
                                    Experiencia en diseño de sistemas escalables y prototipado
                                    rápido con Figma.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right: Telemetry */}
                        <motion.div
                            className="p-6 sm:p-8 bg-white/[0.01]"
                            initial={{ opacity: 0, x: 15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h3 className="mono text-cyan text-xs tracking-[0.2em] mb-5">
                                ESPECIFICACIONES DE LA ESTACIÓN
                            </h3>
                            <div className="space-y-4">
                                {telemetry.map((spec, i) => {
                                    const Icon = icons[spec.label] || Monitor;
                                    return (
                                        <motion.div
                                            key={spec.label}
                                            className="flex items-start gap-3 group"
                                            initial={{ opacity: 0, y: 8 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                                        >
                                            <Icon
                                                size={14}
                                                strokeWidth={1.5}
                                                className="text-text-dim mt-0.5 group-hover:text-cyan transition-colors duration-200"
                                            />
                                            <div className="font-mono text-xs leading-relaxed">
                                                <span className="text-text-dim">[{spec.label}]</span>{' '}
                                                <span className="text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Status footer */}
                            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                                <span className="mono text-[10px] text-text-dim tracking-wider">
                                    TODOS LOS SISTEMAS OPERATIVOS
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </GlassContainerValorant>
            </div>
        </section>
    );
}
