import { motion } from 'framer-motion';
import { Check, X, Users, Zap, ShieldAlert, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrambleText from '../components/ScrambleText';

const COMPATIBILITY = {
    fit: [
        { t: 'Product-Led Companies', d: 'Equipos que priorizan la experiencia del usuario y el diseño como motor de crecimiento.' },
        { t: 'Fintech & Web3', d: 'Sistemas que requieren alta densidad de datos y precisión visual extrema.' },
        { t: 'Design-First Startups', d: 'Fundadores que entienden el valor de una marca técnica y brutalista.' }
    ],
    noFit: [
        { t: 'Short-Term Gig Projects', d: 'Soluciones rápidas sin visión de escalabilidad o mantenimiento a largo plazo.' },
        { t: 'Legacy-Only Mindset', d: 'Equipos que temen a la innovación visual o a la refactorización necesaria.' },
        { t: 'Massive Agencies', d: 'Prefiero el contacto directo con el producto y los tomadores de decisiones.' }
    ]
};

const CompatibilityBlock = ({ items, type }) => (
    <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <div className={`p-2 rounded-sm ${type === 'fit' ? 'bg-cyan/10 text-cyan' : 'bg-red-500/10 text-red-500'}`}>
                {type === 'fit' ? <Check size={14} /> : <X size={14} />}
            </div>
            <span className="mono text-[10px] font-bold uppercase tracking-widest text-white/60">
                {type === 'fit' ? 'COMPATIBILIDAD_ALTA' : 'SISTEMA_INCOMPATIBLE'}
            </span>
        </div>
        <div className="space-y-6">
            {items.map((item, i) => (
                <div key={i} className="group space-y-2">
                    <h4 className={`font-sans text-xl font-bold uppercase tracking-tight transition-colors ${type === 'fit' ? 'group-hover:text-cyan' : 'group-hover:text-red-400'}`}>
                        {item.t}
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed lowercase tracking-tight">
                        {item.d}
                    </p>
                </div>
            ))}
        </div>
    </div>
);

export default function Audience() {
    const { t } = useTranslation();

    return (
        <section id="audience" className="relative z-10 py-24 sm:py-32 px-6 overflow-hidden bg-white/[0.01]">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    
                    {/* Intro */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-12">
                        <header className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <span className="bg-cyan/10 text-cyan px-2 py-0.5 rounded-sm mono text-[10px] font-bold tracking-tighter">06</span>
                                <span className="mono text-[10px] text-white/40 tracking-[0.4em] uppercase">
                                    // section.audience
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-sans text-white tracking-tighter uppercase leading-[0.9]"
                            >
                                <ScrambleText text={t('audience.title', 'PROTOCOLO DE SELECCIÓN')} />
                            </motion.h2>
                        </header>

                        <div className="space-y-6 text-white/50 mono text-xs tracking-tight uppercase leading-relaxed border-l border-white/10 pl-8">
                            <p>Para garantizar resultados de élite, opero bajo un criterio de compatibilidad estricto.</p>
                            <p>No todos los proyectos requieren una arquitectura brutalista, pero para aquellos que sí, mi compromiso es absoluto.</p>
                        </div>
                        
                        <div className="pt-8 flex items-center gap-4">
                            <Target size={24} className="text-cyan/20" />
                            <div className="h-px flex-1 bg-white/5" />
                        </div>
                    </div>

                    {/* Compatibility Grid */}
                    <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                        <CompatibilityBlock items={COMPATIBILITY.fit} type="fit" />
                        <CompatibilityBlock items={COMPATIBILITY.noFit} type="noFit" />
                    </div>
                </div>
            </div>
        </section>
    );
}
