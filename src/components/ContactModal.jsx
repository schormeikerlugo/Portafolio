import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

/* ── Status states ── */
const STATUS = {
    IDLE: 'idle',
    SENDING: 'sending',
    SUCCESS: 'success',
    ERROR: 'error',
};

/* ── Backdrop + Panel animation ── */
const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const panelVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0, y: 20, scale: 0.98,
        transition: { duration: 0.3, ease: 'easeIn' },
    },
};

export default function ContactModal({ isOpen, onClose }) {
    const formRef = useRef(null);
    const [status, setStatus] = useState(STATUS.IDLE);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // Close on Escape
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) {
            window.addEventListener('keydown', handleKey);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(STATUS.SENDING);

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            );
            setStatus(STATUS.SUCCESS);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => {
                setStatus(STATUS.IDLE);
                onClose();
            }, 2500);
        } catch {
            setStatus(STATUS.ERROR);
            setTimeout(() => setStatus(STATUS.IDLE), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className="relative w-full max-w-[520px] border border-cyan/20 bg-[#0a0a12]/95 backdrop-blur-md"
                        variants={panelVariants}
                    >
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan/50" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/50" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan/50" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan/50" />

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                                <h3 className="mono text-[11px] tracking-[0.3em] text-cyan">
                                    CANAL DE COMUNICACIÓN
                                </h3>
                            </div>
                            <button
                                onClick={onClose}
                                className="mono text-[10px] text-text-dim hover:text-cyan transition-colors cursor-pointer tracking-wider"
                            >
                                [ESC]
                            </button>
                        </div>

                        {/* Form */}
                        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Name */}
                            <div>
                                <label className="mono text-[10px] text-text-secondary tracking-[0.2em] block mb-2">
                                    {'>'} IDENTIFICACIÓN
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                    className="w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-text-primary placeholder:text-text-dim/70 font-light focus:border-cyan/40 focus:outline-none focus:bg-white/[0.05] transition-all duration-300"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mono text-[10px] text-text-secondary tracking-[0.2em] block mb-2">
                                    {'>'} FRECUENCIA DE RETORNO
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="tu@email.com"
                                    className="w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-text-primary placeholder:text-text-dim/70 font-light focus:border-cyan/40 focus:outline-none focus:bg-white/[0.05] transition-all duration-300"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="mono text-[10px] text-text-secondary tracking-[0.2em] block mb-2">
                                    {'>'} TRANSMISIÓN
                                </label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Escribe tu mensaje..."
                                    className="w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-text-primary placeholder:text-text-dim/70 font-light resize-none focus:border-cyan/40 focus:outline-none focus:bg-white/[0.05] transition-all duration-300"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center justify-between pt-2">
                                <span className="mono text-[9px] text-text-dim/50 tracking-wider">
                                    {status === STATUS.SENDING && '⟳ TRANSMITIENDO...'}
                                    {status === STATUS.SUCCESS && '✓ TRANSMISIÓN EXITOSA'}
                                    {status === STATUS.ERROR && '✗ ERROR DE TRANSMISIÓN'}
                                    {status === STATUS.IDLE && <><span className="text-cyan">CANAL SEGURO</span> // <span className="text-white">ENCRIPTADO</span></>}
                                </span>

                                <motion.button
                                    type="submit"
                                    disabled={status === STATUS.SENDING || status === STATUS.SUCCESS}
                                    className={`
                                        mono text-xs tracking-[0.15em] px-6 py-3 cursor-pointer
                                        border transition-all duration-300
                                        ${status === STATUS.SUCCESS
                                            ? 'border-green-500/40 text-green-400 bg-green-500/10'
                                            : status === STATUS.ERROR
                                                ? 'border-red-500/40 text-red-400 bg-red-500/10'
                                                : 'border-cyan/30 text-cyan hover:bg-cyan/10 hover:border-cyan/50'
                                        }
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    `}
                                    whileHover={status === STATUS.IDLE ? { scale: 1.02 } : {}}
                                    whileTap={status === STATUS.IDLE ? { scale: 0.98 } : {}}
                                >
                                    {status === STATUS.SENDING && 'ENVIANDO...'}
                                    {status === STATUS.SUCCESS && 'ENVIADO ✓'}
                                    {status === STATUS.ERROR && 'REINTENTAR'}
                                    {status === STATUS.IDLE && 'ENVIAR SEÑAL'}
                                </motion.button>
                            </div>
                        </form>

                        {/* Footer scanline */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
