import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, Terminal, Rocket, ExternalLink, X, Send } from 'lucide-react';
import GlassContainer from '../components/GlassContainer';
import { projects } from '../data/content';

function Lightbox({ image, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <motion.div
                className="relative max-w-4xl w-full"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute -top-10 right-0 text-text-dim hover:text-white transition-colors cursor-pointer">
                    <X size={18} strokeWidth={1.5} />
                </button>
                <img src={image} alt="" className="w-full h-auto rounded-lg border border-white/[0.06]" />
            </motion.div>
        </motion.div>
    );
}

function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <GlassContainer className="p-6 sm:p-8 rounded-lg max-w-lg mx-auto">
            <h3 className="mono text-xs text-cyan tracking-[0.15em] mb-6">INICIAR TRANSMISIÓN</h3>

            {sent ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6"
                >
                    <Send className="text-cyan mx-auto mb-3" size={20} strokeWidth={1.5} />
                    <p className="text-text-primary text-sm font-medium mb-1">TRANSMISIÓN ENVIADA</p>
                    <p className="mono text-[10px] text-text-dim">TIEMPO DE RESPUESTA ESTIMADO: 24H</p>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                        placeholder="[NOMBRE]"
                        required
                        className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded text-text-primary placeholder:text-text-dim mono text-xs focus:outline-none focus:border-cyan/30 transition-colors duration-200"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        placeholder="[EMAIL]"
                        required
                        className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded text-text-primary placeholder:text-text-dim mono text-xs focus:outline-none focus:border-cyan/30 transition-colors duration-200"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                        placeholder="[MENSAJE]"
                        required
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded text-text-primary placeholder:text-text-dim mono text-xs focus:outline-none focus:border-cyan/30 transition-colors duration-200 resize-none"
                    />
                    <motion.button
                        type="submit"
                        className="w-full py-2.5 rounded border border-cyan/30 text-cyan mono text-xs tracking-wider cursor-pointer hover-glow-soft"
                        whileTap={{ scale: 0.98 }}
                    >
                        [INICIAR TRANSMISIÓN]
                    </motion.button>
                </form>
            )}
        </GlassContainer>
    );
}

function ProjectCarousel({ onSelectProject, currentId }) {
    const others = projects.filter(p => p.id !== currentId);
    const doubled = [...others, ...others];

    return (
        <div className="overflow-hidden py-8">
            <p className="mono text-[10px] text-text-dim tracking-[0.2em] text-center mb-6">
                MISIONES RELACIONADAS
            </p>
            <div className="flex animate-scroll-left gap-3 w-max">
                {doubled.map((project, i) => (
                    <motion.div
                        key={`${project.id}-${i}`}
                        className="flex-shrink-0 w-44 h-28 rounded-lg overflow-hidden cursor-pointer group panel glow-hover"
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => onSelectProject(project)}
                    >
                        <div className="relative w-full h-full">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-200" />
                            <div className="absolute bottom-2 left-2.5 right-2.5">
                                <p className="mono text-[9px] text-text-secondary truncate">{project.title}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function ProjectDetail({ project, onBack, onSelectProject }) {
    const [lightboxImage, setLightboxImage] = useState(null);

    return (
        <motion.section
            className="relative z-10 min-h-screen py-20 sm:py-28 px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Back */}
                <motion.button
                    onClick={onBack}
                    className="flex items-center gap-2 text-text-dim hover:text-cyan transition-colors mb-10 cursor-pointer mono text-xs tracking-wider"
                    whileHover={{ x: -3 }}
                    transition={{ duration: 0.15 }}
                >
                    <ArrowLeft size={14} strokeWidth={1.5} />
                    VOLVER AL SISTEMA
                </motion.button>

                {/* Hero image */}
                <motion.div
                    className="relative rounded-lg overflow-hidden mb-10 panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                >
                    <img src={project.image} alt={project.title} className="w-full h-56 sm:h-72 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                        <p className="mono text-[10px] text-text-dim mb-1.5">{project.subtitle}</p>
                        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">{project.title}</h1>
                    </div>
                </motion.div>

                {/* MISSION */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-8"
                >
                    <GlassContainer className="p-5 sm:p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={14} strokeWidth={1.5} className="text-cyan" />
                            <h2 className="mono text-xs text-cyan tracking-[0.15em]">MISIÓN</h2>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{project.mission}</p>
                    </GlassContainer>
                </motion.div>

                {/* PROBLEM — Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <Terminal size={14} strokeWidth={1.5} className="text-magenta" />
                        <h2 className="mono text-xs text-magenta tracking-[0.15em]">DIAGNÓSTICO</h2>
                    </div>
                    <div className="bg-black/60 border border-cyan/10 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.04]">
                            <div className="w-2 h-2 rounded-full bg-red-500/70" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                            <div className="w-2 h-2 rounded-full bg-green-500/70" />
                            <span className="ml-2 mono text-[10px] text-text-dim">diagnostics.sh</span>
                        </div>
                        <pre className="p-4 sm:p-5 font-mono text-xs text-cyan/80 leading-relaxed whitespace-pre-wrap">
                            {project.problem}
                        </pre>
                    </div>
                </motion.div>

                {/* SOLUTION */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="mb-10"
                >
                    <GlassContainer className="p-5 sm:p-6 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Rocket size={14} strokeWidth={1.5} className="text-cyan" />
                            <h2 className="mono text-xs text-cyan tracking-[0.15em]">SOLUCIÓN IMPLEMENTADA</h2>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{project.solution}</p>
                    </GlassContainer>
                </motion.div>

                {/* GALLERY */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="mb-10"
                >
                    <h2 className="mono text-xs text-text-dim tracking-[0.15em] mb-4">GALERÍA TÉCNICA</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {project.gallery?.map((img, i) => (
                            <motion.div
                                key={i}
                                className="relative rounded-lg overflow-hidden cursor-pointer group panel"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => setLightboxImage(img)}
                            >
                                <img src={img} alt="" className="w-full h-32 sm:h-36 object-cover" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-200" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <ExternalLink className="text-white/70" size={16} strokeWidth={1.5} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* STACK */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                    className="flex flex-wrap gap-1.5 mb-16"
                >
                    {project.tags?.map((tag) => (
                        <span key={tag} className="mono text-[10px] text-text-dim px-2.5 py-1 rounded border border-white/[0.05] bg-white/[0.02]">
                            [{tag}]
                        </span>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="hud-line mb-16" />

                {/* Contact form */}
                <ContactForm />

                {/* Related projects */}
                <div className="mt-16">
                    <ProjectCarousel onSelectProject={onSelectProject} currentId={project.id} />
                </div>

                {/* Footer */}
                <div className="text-center mt-12 pt-6 border-t border-white/[0.04]">
                    <p className="mono text-[10px] text-text-dim tracking-wider">
                        © {new Date().getFullYear()} SCHORMEIKER LUGO // ALL SYSTEMS OPERATIONAL
                    </p>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />}
            </AnimatePresence>
        </motion.section>
    );
}
