import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Testimonial data (placeholder — replace with real quotes) ── */
const TESTIMONIALS = [
    {
        id: 1,
        quote:
            'Schormeiker transformó nuestra visión en una interfaz que nuestros usuarios aman. Su capacidad para combinar estética con funcionalidad es excepcional.',
        name: 'Carlos Méndez',
        role: 'CEO',
        company: 'Sacscloud',
        avatar: '🧑‍💼',
    },
    {
        id: 2,
        quote:
            'Su trabajo en el diseño del dashboard redujo el tiempo de navegación en un 30%. Entiende la lógica del negocio y la traduce en experiencias intuitivas.',
        name: 'Ana Torres',
        role: 'Product Manager',
        company: 'Kooomo',
        avatar: '👩‍💻',
    },
    {
        id: 3,
        quote:
            'Excelente manejo de la identidad visual y diseño UI/UX. Entregó un sistema de diseño completo que aceleró nuestro proceso de desarrollo.',
        name: 'Paweł Kowalski',
        role: 'CTO',
        company: 'Aqomi',
        avatar: '👨‍🔬',
    },
    {
        id: 4,
        quote:
            'Diseñó flujos DeFi comprensibles para usuarios sin experiencia crypto. Su enfoque en la confianza del usuario fue clave para reducir la tasa de abandono.',
        name: 'Miguel Fernández',
        role: 'Founder',
        company: 'TakoDeFi',
        avatar: '🧑‍🚀',
    },
    {
        id: 5,
        quote:
            'Su integración de IA en el proceso creativo fue innovadora. Los assets generados enriquecieron enormemente nuestro universo visual del juego.',
        name: 'Sarah Chen',
        role: 'Art Director',
        company: 'Splinterlands',
        avatar: '🎨',
    },
];

/* ── Auto-scroll interval (ms) ── */
const AUTO_SCROLL_INTERVAL = 5000;

/* ── Single testimonial card ── */
function TestimonialCard({ testimonial }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="panel p-8 lg:p-10 max-w-[680px] w-full mx-auto relative"
        >
            {/* Decorative quote mark */}
            <div className="absolute top-4 left-6 text-5xl text-cyan/10 font-serif leading-none select-none">
                "
            </div>

            {/* Quote */}
            <blockquote className="text-base lg:text-lg text-text-secondary leading-relaxed mb-8 pl-4 border-l-2 border-cyan/15">
                {testimonial.quote}
            </blockquote>

            {/* Author info */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full border border-cyan/20 bg-white/[0.03] flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                </div>

                <div>
                    <p className="text-sm font-semibold text-white font-jura">
                        {testimonial.name}
                    </p>
                    <p className="mono text-[10px] text-text-dim tracking-wider">
                        {testimonial.role} · {testimonial.company}
                    </p>
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyan/10 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan/10 rounded-bl-sm" />
        </motion.div>
    );
}

/* ── Dot indicator ── */
function DotIndicator({ total, current, onSelect }) {
    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: total }, (_, i) => (
                <button
                    key={i}
                    onClick={() => onSelect(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current
                            ? 'bg-cyan shadow-[0_0_8px_rgba(0,229,255,0.5)] w-6'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                    aria-label={`Testimonio ${i + 1}`}
                />
            ))}
        </div>
    );
}

/* ── Testimonials Section ── */
export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    /* Auto-scroll */
    useEffect(() => {
        if (paused) return;
        const timer = setInterval(next, AUTO_SCROLL_INTERVAL);
        return () => clearInterval(timer);
    }, [paused, next]);

    return (
        <section id="testimonials" className="relative py-24 lg:py-32 px-6 z-10 overflow-hidden">
            <div className="max-w-[900px] mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="mono text-[10px] text-text-dim tracking-widest">
                        COMUNICACIONES RECIBIDAS
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jura text-white mt-3 tracking-tight">
                        TESTIMONIOS
                    </h2>
                    <p className="text-text-secondary text-sm mt-4 max-w-md mx-auto">
                        Señales interceptadas de compañeros de misión y comandantes de escuadrón.
                    </p>
                    <div className="hud-line mt-6 w-48 mx-auto" />
                </motion.div>

                {/* Carousel */}
                <div
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <TestimonialCard
                            key={TESTIMONIALS[current].id}
                            testimonial={TESTIMONIALS[current]}
                        />
                    </AnimatePresence>

                    <DotIndicator
                        total={TESTIMONIALS.length}
                        current={current}
                        onSelect={setCurrent}
                    />
                </div>

                {/* Navigation arrows */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={() =>
                            setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                        }
                        className="mono text-xs text-text-dim hover:text-cyan transition-colors border border-white/[0.06] px-4 py-2 hover:border-cyan/30 cursor-pointer"
                    >
                        ← PREV
                    </button>
                    <button
                        onClick={next}
                        className="mono text-xs text-text-dim hover:text-cyan transition-colors border border-white/[0.06] px-4 py-2 hover:border-cyan/30 cursor-pointer"
                    >
                        NEXT →
                    </button>
                </div>
            </div>
        </section>
    );
}
