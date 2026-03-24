import { motion } from 'framer-motion';
import { Send, Terminal, Mail, MessageSquare, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ScrambleText from '../components/ScrambleText';

export default function ContactSection() {
    const { t } = useTranslation();

    return (
        <section id="contact" className="relative z-10 py-24 sm:py-32 px-6 bg-void">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Header/Info */}
                    <div className="lg:col-span-5 space-y-12">
                        <header className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <span className="bg-cyan/10 text-cyan px-2 py-0.5 rounded-sm mono text-[10px] font-bold tracking-tighter">09</span>
                                <span className="mono text-[10px] text-white/40 tracking-[0.4em] uppercase">
                                    // end.process
                                </span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-7xl font-sans text-white tracking-tighter uppercase leading-[0.85]"
                            >
                                <ScrambleText text={t('contact.title', 'INICIAR TRANSMISIÓN')} />
                            </motion.h2>
                        </header>

                        <div className="space-y-8">
                            <div className="p-8 border-l border-cyan/30 bg-cyan/[0.02] space-y-4">
                                <p className="text-white/60 text-lg font-light leading-relaxed">
                                    ¿Tienes un sistema que requiere una arquitectura visual de alto rendimiento? Mi terminal está abierta para nuevas colaboraciones.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="p-3 bg-white/5 border border-white/5 text-white/40 group-hover:text-cyan group-hover:border-cyan/20 transition-all">
                                        <Mail size={18} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="mono text-[9px] text-white/20 uppercase tracking-widest font-bold">DIRECT_COMMS</span>
                                        <p className="mono text-sm text-white/60 group-hover:text-white transition-colors">schormeiker@gmail.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="p-3 bg-white/5 border border-white/5 text-white/40 group-hover:text-cyan group-hover:border-cyan/20 transition-all">
                                        <MessageSquare size={18} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="mono text-[9px] text-white/20 uppercase tracking-widest font-bold">INSTANT_LINK</span>
                                        <p className="mono text-sm text-white/60 group-hover:text-white transition-colors">@schormeikerlugo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form: IDE Style */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white/[0.02] border border-white/5 p-8 sm:p-12 relative overflow-hidden"
                        >
                            {/* Form Header */}
                            <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                                <div className="flex items-center gap-3">
                                    <Terminal size={16} className="text-cyan/40" />
                                    <span className="mono text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">NEW_MESSAGE.SH</span>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-white/5" />
                                    <div className="w-2 h-2 rounded-full bg-white/5" />
                                    <div className="w-2 h-2 rounded-full bg-cyan/40 animate-pulse" />
                                </div>
                            </div>

                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="mono text-[9px] text-white/20 uppercase tracking-widest font-bold">IDENTIFIER</label>
                                        <input 
                                            type="text" 
                                            placeholder="[TU NOMBRE]" 
                                            className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan transition-colors mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="mono text-[9px] text-white/20 uppercase tracking-widest font-bold">CHANNEL_LINK</label>
                                        <input 
                                            type="email" 
                                            placeholder="[TU EMAIL]" 
                                            className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan transition-colors mono text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="mono text-[9px] text-white/20 uppercase tracking-widest font-bold">TRANSMISSION_DATA</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="[DESCRIBE TU MISIÓN...]" 
                                        className="w-full bg-transparent border-b border-white/10 py-3 text-white placeholder:text-white/10 focus:outline-none focus:border-cyan transition-colors mono text-sm resize-none"
                                    ></textarea>
                                </div>
                                
                                <button className="group flex items-center gap-4 bg-cyan text-void px-10 py-4 font-mono text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-white transition-all">
                                    <Send size={16} />
                                    Enviar Transmisión
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                            
                            {/* Background Overlay */}
                            <div className="absolute -bottom-12 -right-12 opacity-5 pointer-events-none">
                                <Terminal size={300} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
