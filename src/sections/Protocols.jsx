import { motion } from 'framer-motion';
import { Shield, Target, Cpu, Workflow, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrambleText from '../components/ScrambleText';
import CipherText from '../components/CipherText';
import TypewriterText from '../components/TypewriterText';
import Particles from '../components/Particles';
import { SectionLabel, GhostText, CrosshairDot, CornerBrackets, FloatingGlyphs } from '../components/ValorantOverlays';
import { DiagonalHatch, AbstractShapes } from '../components/ValorantPatterns';

export default function Protocols() {
    const { t } = useTranslation();

    const PROTOCOLS = [
        {
            id: 'ds',
            title: t('protocols.items.ds.title', 'PROTOCOL 01: DESIGN SYSTEMS'),
            subtitle: t('protocols.items.ds.subtitle', 'Escalabilidad Visual'),
            description: t('protocols.items.ds.desc', 'Construcción de bibliotecas de componentes atómicos y documentación técnica. Aseguro la consistencia visual y la integridad del sistema.'),
            icon: <Layers size={24} className="text-cyan group-hover:scale-110 transition-transform duration-500" />,
        },
        {
            id: 'ui',
            title: t('protocols.items.ui.title', 'PROTOCOL 02: INTERFACE ENGINEERING'),
            subtitle: t('protocols.items.ui.subtitle', 'Fidelidad Técnica'),
            description: t('protocols.items.ui.desc', 'Desarrollo frontend con React y Framer Motion. Especializado en optimizar el rendimiento de renderizado y crear micro-interacciones.'),
            icon: <Cpu size={24} className="text-cyan group-hover:scale-110 transition-transform duration-500" />,
        },
        {
            id: 'strategy',
            title: t('protocols.items.strategy.title', 'PROTOCOL 03: PRODUCT STRATEGY'),
            subtitle: t('protocols.items.strategy.subtitle', 'Visión a Ejecución'),
            description: t('protocols.items.strategy.desc', 'Diagnóstico técnico y visual para definir el roadmap de producto. Elimino la fricción operativa entre stakeholders e ingeniería.'),
            icon: <Target size={24} className="text-cyan group-hover:scale-110 transition-transform duration-500" />,
        },
        {
            id: 'ai',
            title: t('protocols.items.ai.title', 'PROTOCOL 04: APPLIED AI RESEARCH'),
            subtitle: t('protocols.items.ai.subtitle', 'Innovación Operativa'),
            description: t('protocols.items.ai.desc', 'Implementación de flujos de trabajo inteligentes. Desde Ingeniería de Prompts hasta el despliegue de LLMs locales.'),
            icon: <Workflow size={24} className="text-cyan group-hover:scale-110 transition-transform duration-500" />,
        },
    ];

    return (
        <section id="protocols" className="py-24 sm:py-32 px-6 relative overflow-hidden bg-void border-t border-border">
            <DiagonalHatch opacity={0.05} spacing={60} />
            <AbstractShapes variant="grid" />
            <FloatingGlyphs />

            {/* Valorant Overlays */}
            <SectionLabel text="function solve(problem) { return design }" />
            <SectionLabel text="npm run build --production" side="right" />
            <GhostText text="PRTC" position="bottom-left" size="text-[140px] md:text-[220px]" />
            <div className="max-w-[1400px] mx-auto">
                <header className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-2"
                    >
                        <CrosshairDot size={20} className="opacity-60" />
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X05 // PROTOCOLOS_OPERATIVOS
                        </span>
                    </motion.div>

                    <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary mb-6 font-bold tracking-tighter break-words">
                        <CipherText text="¿Cómo Ayudo." />
                    </h2>

                    <p className="max-w-2xl text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                        <TypewriterText text={t('protocols.description', 'Estandarizo procesos y elimino la incertidumbre técnica mediante protocolos de ejecución diseñados para la excelencia operativa.')} delay={1.6} />
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    {PROTOCOLS.map((protocol, i) => (
                        <motion.div
                            key={protocol.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 sm:p-10 border border-border bg-surface hover:bg-surface/80 hover:border-cyan/50 transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
                        >
                            {/* Glass reflection effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">{protocol.icon}</div>
                                
                                <div className="space-y-3 mb-6">
                                    <h3 className="mono text-[10px] text-cyan/80 tracking-widest uppercase flex items-center gap-2">
                                        <ScrambleText text={protocol.title} />
                                    </h3>
                                    <h4 className="text-2xl font-sans font-bold text-text-primary tracking-tight uppercase group-hover:text-cyan transition-colors">
                                        {protocol.subtitle}
                                    </h4>
                                </div>
                                
                                <p className="text-base text-text-secondary leading-relaxed font-sans mt-auto">
                                    {protocol.description}
                                </p>
                            </div>

                            {/* Corner accents — Valorant style (behind text) */}
                            <CornerBrackets size={10} color="border-cyan/0 group-hover:border-cyan/40" hoverColor="" className="absolute inset-0 pointer-events-none z-0" />
                        </motion.div>
                    ))}
                </div>
            </div>
            
            <Particles quantity={25} />
        </section>
    );
}
