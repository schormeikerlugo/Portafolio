import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, Terminal, Rocket, ExternalLink, X, Send, Cpu, Layout as LayoutIcon, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Lightbox({ image, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-void/95 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative max-w-[1400px] w-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute -top-12 right-0 text-white/40 hover:text-white transition-colors cursor-pointer p-2">
                    <X size={24} />
                </button>
                <img src={image} alt="" className="w-full h-auto border border-white/10 shadow-2xl" />
            </motion.div>
        </motion.div>
    );
}

const InfoBlock = ({ icon: Icon, label, value }) => (
    <div className="space-y-1">
        <div className="flex items-center gap-2 opacity-40">
            <Icon size={12} className="text-cyan" />
            <span className="mono text-[8px] uppercase tracking-widest font-bold">{label}</span>
        </div>
        <div className="mono text-[11px] text-white/80 uppercase font-bold">{value}</div>
    </div>
);

export default function ProjectDetail({ project, onBack }) {
    const { t } = useTranslation();
    const [lightboxImage, setLightboxImage] = useState(null);

    if (!project) return null;

    return (
        <motion.section
            className="fixed inset-0 z-[100] bg-void overflow-y-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Top Navigation Bar: IDE Style */}
            <nav className="sticky top-0 z-50 bg-void/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <button
                    onClick={onBack}
                    className="flex items-center gap-3 text-white/40 hover:text-cyan transition-colors mono text-[10px] font-bold tracking-widest uppercase"
                >
                    <ArrowLeft size={14} />
                    [ESC] CLOSE_SESSION
                </button>
                
                <div className="flex items-center gap-4">
                    <span className="mono text-[10px] text-white/20 uppercase hidden sm:block">STATUS: READ_ONLY</span>
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-cyan/10 text-cyan px-4 py-1.5 rounded-sm mono text-[10px] font-bold border border-cyan/20 hover:bg-cyan hover:text-void transition-all uppercase flex items-center gap-2"
                        >
                            <ExternalLink size={12} />
                            Live Demo
                        </a>
                    )}
                </div>
            </nav>

            <div className="max-w-[1400px] mx-auto py-16 px-6 space-y-24">
                
                {/* 01: HERO & METADATA */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8 space-y-8">
                        <header className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="mono text-[10px] text-cyan bg-cyan/10 px-2 py-0.5 rounded-sm font-bold">PROJECT_DEV</span>
                                <span className="text-white/10 mono text-[10px]">//</span>
                                <span className="mono text-[10px] text-white/40 uppercase tracking-widest">{project.subcategory}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold text-white tracking-tighter uppercase leading-[0.85]">
                                {project.title}
                            </h1>
                        </header>

                        <div className="aspect-video w-full bg-white/[0.02] border border-white/5 relative group overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                        {/* Quick Specs */}
                        <div className="p-8 border-l border-white/5 space-y-8 pt-0">
                            <InfoBlock icon={Target} label="Role" value={project.subtitle} />
                            <InfoBlock icon={Cpu} label="Core Tech" value={project.tags?.[0] || '---'} />
                            <InfoBlock icon={Rocket} label="Status" value="PROD_LIVE" />
                            
                            <div className="pt-8 border-t border-white/5 space-y-4">
                                <span className="mono text-[9px] text-white/20 uppercase tracking-[0.2em] font-bold">STACK_OVERVIEW</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags?.map(tag => (
                                        <span key={tag} className="mono text-[8px] text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-sm">
                                            {tag.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 02: NARRATIVE: PROBLEM & SOLUTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-24">
                        {/* Summary / Intro */}
                        <section className="space-y-6">
                            <h3 className="font-sans text-3xl font-bold text-white uppercase tracking-tight flex items-center gap-4">
                                <span className="text-cyan mono text-sm">[01]</span>
                                Executive Summary
                            </h3>
                            <p className="text-xl text-white/60 leading-relaxed font-light">
                                {project.mission || t('project.summary_placeholder', 'Investigación y desarrollo de sistemas visuales de alta precisión para optimizar la interacción del usuario con datos complejos.')}
                            </p>
                        </section>

                        {/* Problem Block */}
                        {project.problem && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                                    <Terminal size={18} className="text-white/20" />
                                    <h3 className="font-sans text-2xl font-bold text-white uppercase tracking-tight tracking-widest">The Challenge</h3>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 p-8 relative">
                                    <div className="absolute top-0 right-0 p-4 mono text-[10px] text-white/10 uppercase">ERR_LOG_0x04</div>
                                    <p className="text-white/50 text-base leading-relaxed font-mono uppercase tracking-tight whitespace-pre-wrap">
                                        {project.problem}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Solution Block */}
                        {project.solution && (
                            <section className="space-y-8">
                                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                                    <LayoutIcon size={18} className="text-cyan/40" />
                                    <h3 className="font-sans text-2xl font-bold text-white uppercase tracking-tight tracking-widest">Architectural Solution</h3>
                                </div>
                                <div className="space-y-6 text-white/80 text-lg leading-relaxed font-light first-letter:text-5xl first-letter:text-cyan first-letter:font-sans first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                                    {project.solution}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* 03: TECHNICAL GALLERY */}
                {project.gallery && project.gallery.length > 0 && (
                    <section className="space-y-12">
                        <header className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-cyan mono text-sm">[03]</span>
                                <h3 className="font-sans text-3xl font-bold text-white uppercase tracking-tight">Technical Gallery</h3>
                            </div>
                            <span className="mono text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold block bg-white/5 px-3 py-1 border border-white/5">
                                SOURCE: ASSET_SERVER
                            </span>
                        </header>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="cursor-pointer border border-white/5 bg-white/[0.02] relative group overflow-hidden"
                                    onClick={() => setLightboxImage(img)}
                                >
                                    <img src={img} alt="" className="w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-void/40 backdrop-blur-sm">
                                        <div className="flex items-center gap-2 mono text-[10px] text-white font-bold uppercase tracking-widest">
                                            <Eye size={14} /> View Asset
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Footer: IDE Command Style */}
                <footer className="pt-24 border-t border-white/5 text-center space-y-8">
                    <p className="mono text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold">
                        // END_OF_LOG // MISSION_COMPLETE
                    </p>
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-white text-void font-mono text-[11px] font-bold tracking-[0.2em] hover:bg-cyan hover:text-void transition-colors uppercase cursor-pointer"
                    >
                        Return to Dashboard
                    </button>
                </footer>
            </div>

            <AnimatePresence>
                {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
            </AnimatePresence>
        </motion.section>
    );
}
