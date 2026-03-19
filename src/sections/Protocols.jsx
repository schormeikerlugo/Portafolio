import { motion } from 'framer-motion';
import { Shield, Target, Cpu, Workflow } from 'lucide-react';

const PROTOCOLS = [
    {
        id: 'ds',
        title: 'PROTOCOL 01: DESIGN SYSTEMS',
        subtitle: 'Escalabilidad Visual',
        description: 'Construcción de bibliotecas de componentes atómicos y documentación técnica que reduce en un 40% el tiempo de desarrollo. Aseguro la consistencia visual y la integridad del sistema en productos de alto tráfico.',
        icon: <Layers size={24} className="text-cyan" />,
    },
    {
        id: 'ui',
        title: 'PROTOCOL 02: INTERFACE ENGINEERING',
        subtitle: 'Fidelidad Técnica',
        description: 'Desarrollo frontend de alta fidelidad con React y Framer Motion. Especializado en optimizar el rendimiento de renderizado y crear micro-interacciones que mejoran la retención del usuario.',
        icon: <Cpu size={24} className="text-cyan" />,
    },
    {
        id: 'strategy',
        title: 'PROTOCOL 03: PRODUCT STRATEGY',
        subtitle: 'Visión a Ejecución',
        description: 'Diagnóstico técnico y visual para definir el roadmap de producto. Elimino la fricción operativa entre stakeholders e ingeniería mediante prototipado de alta fidelidad y especificaciones claras.',
        icon: <Target size={24} className="text-cyan" />,
    },
    {
        id: 'ai',
        title: 'PROTOCOL 04: APPLIED AI RESEARCH',
        subtitle: 'Innovación Operativa',
        description: 'Implementación de flujos de trabajo inteligentes. Desde Ingeniería de Prompts para equipos creativos hasta el despliegue de LLMs locales (Ollama/Llama3) para automatizar procesos internos sin comprometer la privacidad.',
        icon: <Workflow size={24} className="text-cyan" />,
    },
];

import { Layers } from 'lucide-react';

export default function Protocols() {
    return (
        <section id="protocols" className="py-24 px-6 relative overflow-hidden bg-void/40 border-t border-white/[0.03]">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-cyan/5 border border-cyan/20 rounded-full"
                    >
                        <Shield size={12} className="text-cyan" />
                        <span className="mono text-[10px] text-cyan tracking-[0.3em]">PROTOCOLOS OPERATIVOS</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-jura text-white mb-6"
                    >
                        ¿CÓMO <span className="text-cyan font-light">AYUDO?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-2xl mx-auto text-text-secondary leading-relaxed"
                    >
                        Estandarizo procesos y elimino la incertidumbre técnica mediante protocolos de ejecución diseñados para la excelencia operativa.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROTOCOLS.map((protocol, i) => (
                        <motion.div
                            key={protocol.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 border border-white/[0.06] bg-white/[0.01] hover:bg-cyan/[0.02] hover:border-cyan/30 transition-all duration-300 relative group"
                        >
                            <div className="mb-6">{protocol.icon}</div>
                            <h3 className="mono text-[10px] text-cyan tracking-widest mb-2 italic">
                                {protocol.title}
                            </h3>
                            <h4 className="text-xl font-jura font-bold text-white mb-4">
                                {protocol.subtitle}
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed">
                                {protocol.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
