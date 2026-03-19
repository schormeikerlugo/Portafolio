import { motion } from 'framer-motion';
import { AlertTriangle, Zap, Layers } from 'lucide-react';

const ANOMALIES = [
    {
        id: 'frag',
        title: 'SISTEMAS INCONSISTENTES',
        status: 'RED_ALERT',
        description: 'La fragmentación visual y técnica en productos digitales genera una deuda técnica que ralentiza los lanzamientos y confunde al usuario final.',
        impact: 'Crecimiento desordenado // Fatiga de mantenimiento',
        icon: <Zap className="text-red-400" size={20} />,
    },
    {
        id: 'gap',
        title: 'BRECHA DISEÑO-INGENIERÍA',
        status: 'CRITICAL',
        description: 'La falta de un lenguaje común entre diseñadores y desarrolladores resulta en implementaciones de baja fidelidad y fricción en los procesos de entrega.',
        impact: 'Pérdida de calidad // Fricción operativa',
        icon: <AlertTriangle className="text-amber-400" size={20} />,
    },
    {
        id: 'scale',
        title: 'ARQUITECTURAS RÍGIDAS',
        status: 'WARNING',
        description: 'Interfaces que no pueden evolucionar sin romperse. La ausencia de un sistema de diseño atómico impide el escalado eficiente de aplicaciones complejas.',
        impact: 'Rigidez estructural // Falta de modularidad',
        icon: <Layers className="text-cyan" size={20} />,
    },
];

export default function Anomalies() {
    return (
        <section id="anomalies" className="py-24 px-6 relative overflow-hidden bg-void/20">
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 mb-4"
                    >
                        <span className="w-8 h-px bg-cyan/50" />
                        <span className="mono text-[10px] text-cyan tracking-[0.3em]">DIAGNÓSTICO DE SISTEMAS</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold font-jura text-white mb-6"
                    >
                        DETECTANDO ANOMALÍAS <br />
                        <span className="text-text-secondary select-none opacity-50 font-light">DIGITALES</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="max-w-2xl text-text-secondary leading-relaxed"
                    >
                        Antes de construir, analizo. Identifico los puntos de fallo estructurales que impiden a un producto alcanzar su máxima velocidad de escape.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {ANOMALIES.map((anomaly, i) => (
                        <motion.div
                            key={anomaly.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-8 bg-white/[0.02] border border-white/[0.06] hover:border-cyan/30 transition-all duration-500 overflow-hidden"
                        >
                            {/* Scanning effect */}
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan/20 to-transparent -translate-y-full group-hover:translate-y-[400px] transition-transform duration-[2s] ease-linear" />
                            
                            <div className="flex items-start justify-between mb-8">
                                <div className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-sm group-hover:border-cyan/20 transition-colors">
                                    {anomaly.icon}
                                </div>
                                <span className="mono text-[8px] px-2 py-0.5 border border-white/10 text-text-dim group-hover:text-cyan/70 group-hover:border-cyan/20 transition-colors">
                                    {anomaly.status}
                                </span>
                            </div>

                            <h3 className="font-jura text-lg font-bold text-white mb-4 tracking-wider group-hover:text-cyan transition-colors">
                                {anomaly.title}
                            </h3>
                            
                            <p className="text-sm text-text-secondary leading-relaxed mb-6">
                                {anomaly.description}
                            </p>

                            <div className="pt-6 border-t border-white/[0.03] flex items-center justify-between">
                                <span className="mono text-[9px] text-text-dim tracking-tight">IMPACTO:</span>
                                <span className="mono text-[9px] text-white/50">{anomaly.impact}</span>
                            </div>

                            {/* Corner decorations */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
