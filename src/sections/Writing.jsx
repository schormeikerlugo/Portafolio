import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, FileText, X, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrambleText from '../components/ScrambleText';
import SyntaxHighlight from '../components/SyntaxHighlight';

const PAPERS = [
    {
        id: 'post-01',
        title: 'La Muerte del Minimalismo Genérico',
        date: 'MAR 2024',
        read: '5 MIN',
        tags: ['UX', 'BRUTALISM'],
        summary: 'En un mundo saturado de interfaces "limpias" que carecen de alma, el brutalismo web emerge como un acto de rebelión técnica. No se trata de fealdad, sino de honestidad estructural.',
        content: `El minimalismo moderno se ha convertido en una plantilla de bajo esfuerzo. Optimizamos interfaces para que no molesten, pero al hacerlo, eliminamos cualquier rastro de identidad de marca.

Como Design Engineer, mi enfoque es "Brutalismo Refinado". Implemento sistemas con React y Tailwind v4 que priorizan la arquitectura de información sobre la estética vacía. 

Un dashboard no debería ser "bonito"; debería ser operativo. La claridad no es negociable. Cuando buildeamos productos con una visión técnica, cada píxel debe deployar una función lógica. // END_TRANSMISSION`
    },
    {
        id: 'post-02',
        title: 'Optimización de Latencia en SPAs Complejas',
        date: 'FEB 2024',
        read: '8 MIN',
        tags: ['PERFORMANCE', 'REACT'],
        summary: 'La percepción del tiempo es la métrica de UX más crítica. Una latencia de 100ms puede ser la diferencia entre una herramienta fluida y una barrera tecnológica.',
        content: `La optimización no es un paso final, es un proceso de diseño. En mi flujo de trabajo con React y Vite, la latencia es el primer problema que resuelvo.

Utilizo GSAP para micro-interacciones que enmascaran procesos asíncronos pesados. Si el usuario siente que el sistema está "pensando", hemos fallado.

Implemento arquitecturas visuales escalables donde el render inicial se reduce al mínimo. Cada milisegundo ganado es un incremento en la estabilidad del ecosistema. // PERFORMANCE_AUDIT_LOG: SUCCESS`
    },
    {
        id: 'post-03',
        title: 'Sistemas de Diseño: De la UI a la Ingeniería',
        date: 'JAN 2024',
        read: '12 MIN',
        tags: ['DESIGN_SYSTEMS', 'SCALABILITY'],
        summary: 'Un sistema de diseño no es una librería de Figma. Es un contrato vivo entre diseño e ingeniería que garantiza la soberanía del producto final.',
        content: `Los equipos suelen fallar porque ven el Design System como una colección de botones. La verdadera soberanía tecnológica ocurre cuando el código y el diseño hablan el mismo idioma.

En mis misiones, configuro arquitecturas donde cada componente es una unidad atómica reutilizable. La fricción se reduce drásticamente cuando los desarrolladores no tienen que "adivinar" el diseño.

Este ecosistema permite a los equipos iterar sin romper el ecosistema global. Es una arquitectura de información que protege la integridad visual de la marca a gran escala. // SYSTEM_SYNC: 100%`
    }
];

const PaperItem = ({ paper, i, onSelect }) => (
    <motion.div
        layoutId={paper.id}
        onClick={() => onSelect(paper)}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        className="group block py-10 border-b border-white/5 hover:border-cyan/30 transition-all relative overflow-hidden cursor-pointer"
    >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-4 max-w-4xl">
                <div className="flex items-center gap-3">
                    <span className="mono text-[8px] text-cyan/60 uppercase tracking-widest font-bold">WRITING_SESSION // 0{i + 1}</span>
                    <span className="text-white/10 mono text-[8px]">//</span>
                    <div className="flex gap-2">
                        {paper.tags.map(t => (
                            <span key={t} className="mono text-[8px] text-white/20 uppercase tracking-tighter">{t}</span>
                        ))}
                    </div>
                </div>
                <h3 className="font-sans text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter group-hover:text-cyan transition-colors leading-[0.9]">
                    {paper.title}
                </h3>
                <p className="text-white/30 text-xs md:text-sm uppercase tracking-tight max-w-2xl group-hover:text-white/50 transition-colors">
                    <SyntaxHighlight text={paper.summary} />
                </p>
            </div>

            <div className="flex items-center gap-8 md:text-right">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 md:justify-end opacity-40">
                        <Clock size={12} className="text-cyan" />
                        <span className="mono text-[9px] uppercase tracking-widest font-bold">READ_TIME</span>
                    </div>
                    <div className="mono text-[11px] text-white/80 font-bold">{paper.read}</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm group-hover:bg-cyan group-hover:text-void transition-all">
                    <BookOpen size={20} />
                </div>
            </div>
        </div>
        
        {/* Background Decor */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full group-hover:translate-x-10 transition-transform duration-700 opacity-5 pointer-events-none">
            <span className="font-sans text-9xl font-black italic whitespace-nowrap uppercase">{paper.tags[0]}</span>
        </div>
    </motion.div>
);

export default function Writing() {
    const { t } = useTranslation();
    const [selectedPaper, setSelectedPaper] = useState(null);

    return (
        <section id="writing" className="relative z-10 py-24 sm:py-32 px-6 bg-void min-h-[80vh]">
            <div className="max-w-[1400px] mx-auto">
                <AnimatePresence mode="wait">
                    {!selectedPaper ? (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-24"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                <div className="lg:col-span-8">
                                    <header className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <span className="bg-cyan/10 text-cyan px-2 py-0.5 rounded-sm mono text-[10px] font-bold tracking-tighter">07</span>
                                            <span className="mono text-[10px] text-white/40 tracking-[0.4em] uppercase">
                                                // section.writing
                                            </span>
                                        </div>
                                        <h2 className="text-[clamp(1.5rem,5vw,3rem)] md:text-8xl font-sans text-white tracking-tighter uppercase leading-[0.85] font-black break-words">
                                            <ScrambleText text={t('writing.title', 'DOCUMENTACIÓN TÉCNICA')} />
                                        </h2>
                                    </header>
                                </div>
                                <div className="lg:col-span-4 flex items-end">
                                    <p className="text-white/40 mono text-[10px] uppercase tracking-widest leading-relaxed border-l-2 border-cyan/30 pl-8">
                                        Pensamientos críticos sobre ingeniería de interfaces, diseño sistémico y el futuro de la interacción visual en la web brutalista.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-white/5">
                                {PAPERS.map((paper, i) => (
                                    <PaperItem key={paper.id} paper={paper} i={i} onSelect={setSelectedPaper} />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="article"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="max-w-4xl mx-auto py-12"
                        >
                            <button 
                                onClick={() => setSelectedPaper(null)}
                                className="flex items-center gap-3 mono text-[10px] text-cyan uppercase tracking-[0.4em] mb-16 hover:text-white transition-colors"
                            >
                                <ChevronLeft size={16} /> Volver al listado
                            </button>

                            <article className="space-y-12">
                                <header className="space-y-6">
                                    <div className="flex items-center gap-4 opacity-40">
                                        <span className="mono text-[10px] text-white uppercase tracking-widest">{selectedPaper.date}</span>
                                        <span className="text-cyan">//</span>
                                        <span className="mono text-[10px] text-white uppercase tracking-widest">{selectedPaper.read} READ</span>
                                    </div>
                                    <h1 className="text-4xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter leading-tight">
                                        {selectedPaper.title}
                                    </h1>
                                    <div className="flex gap-4">
                                        {selectedPaper.tags.map(t => (
                                            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 mono text-[9px] text-cyan uppercase">{t}</span>
                                        ))}
                                    </div>
                                </header>

                                <div className="text-white/60 text-xl md:text-2xl leading-relaxed font-light uppercase tracking-tight space-y-8">
                                    {selectedPaper.content.split('\n\n').map((para, i) => (
                                        <p key={i}>
                                            <SyntaxHighlight text={para} />
                                        </p>
                                    ))}
                                </div>

                                <footer className="pt-24 border-t border-white/5 flex justify-between items-center">
                                    <div className="mono text-[10px] text-white/20 uppercase tracking-[0.4em]">
                                        DOCUMENT_ID: {selectedPaper.id} // VERIFIED_SOURCE
                                    </div>
                                    <div className="flex gap-4">
                                        <FileText size={16} className="text-white/20" />
                                        <ArrowUpRight size={16} className="text-white/20" />
                                    </div>
                                </footer>
                            </article>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
