import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, Zap, Cpu } from 'lucide-react';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';
import { SectionLabel, GhostText, CrosshairDot, FloatingGlyphs } from '../components/ValorantOverlays';
import { DiagonalHatch, AbstractShapes } from '../components/ValorantPatterns';

const ANOMALIES = [
    {
        id: 'anom-01',
        title: 'Sistemas Inconsistentes',
        code: 'ERR_HIGH_DEBT',
        impact: 'Fatiga de mantenimiento',
        description: 'La fragmentación visual y técnica genera una deuda técnica que ralentiza los lanzamientos y confunde al usuario final.',
        icon: Layers
    },
    {
        id: 'anom-02',
        title: 'Brecha Diseño-Ingeniería',
        code: 'ERR_SYNC_FAIL',
        impact: 'Fricción operativa',
        description: 'La falta de un lenguaje común entre diseñadores y desarrolladores resulta en implementaciones de baja fidelidad y fricción en los procesos.',
        icon: Zap
    },
    {
        id: 'anom-03',
        title: 'Arquitecturas Rígidas',
        code: 'ERR_NO_MODULAR',
        impact: 'Falta de modularidad',
        description: 'Interfaces que no pueden evolucionar sin romperse. La ausencia de un sistema de diseño atómico impide el escalado eficiente.',
        icon: Cpu
    }
];

const AnomalyItem = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative p-8 bg-surface border border-border hover:border-cyan/30 transition-all duration-300 flex flex-col h-full"
    >
        <div className="relative z-10 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <span className="mono text-xs text-text-dim font-bold tracking-widest uppercase">{item.code}</span>
                </div>
                <item.icon size={20} className="text-text-dim group-hover:text-cyan transition-colors" />
            </div>

            <div className="space-y-3 flex-grow">
                <h3 className="text-xl font-mono font-bold text-text-primary uppercase tracking-tight group-hover:text-cyan transition-colors">
                    {item.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed font-sans">
                    {item.description}
                </p>
            </div>

            <div className="pt-6 mt-auto border-t border-border">
                <p className="mono text-xs text-text-dim uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse"></span>
                    Impacto: <span className="text-text-secondary">{item.impact}</span>
                </p>
            </div>
        </div>
    </motion.div>
);

export default function Anomalies() {
    const { t } = useTranslation();

    return (
        <section id="anomalias" className="relative z-10 py-24 sm:py-32 px-6 bg-void border-t border-border">
            {/* Valorant-style backgrounds */}
            <DiagonalHatch opacity={0.06} spacing={50} />
            <AbstractShapes variant="side-only" />
            <FloatingGlyphs />

            {/* Valorant Overlays */}
            <SectionLabel text="try { diagnose() } catch(e) { fix(e) }" />
            <SectionLabel text="throw new Error('SYSTEM_ANOMALY')" side="right" />
            <GhostText text="ERR" position="bottom-right" size="text-[180px] md:text-[280px]" />

            <div className="max-w-[1400px] mx-auto relative z-10">
                <header className="mb-16 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <CrosshairDot size={20} className="opacity-60" />
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X01 // DIAGNÓSTICO_DE_SISTEMAS
                        </span>
                    </motion.div>

                    <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary mb-6 font-bold tracking-tighter break-words">
                        <CipherText text="Detectando Anomalías." />
                    </h2>

                    <p className="max-w-2xl text-text-secondary text-lg sm:text-xl leading-relaxed font-sans mb-16">
                        <TypewriterText text="Antes de construir, analizo. Identifico los puntos de fallo estructurales que impiden a un producto alcanzar su máxima velocidad de escape." delay={1.6} />
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ANOMALIES.map((item, i) => (
                        <AnomalyItem key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}