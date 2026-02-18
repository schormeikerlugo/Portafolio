import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Counter data ── */
const STATS = [
    {
        value: 7,
        suffix: '+',
        label: 'AÑOS DE VUELO',
        description: 'Navegando el ecosistema digital',
        icon: '⏱',
    },
    {
        value: 25,
        suffix: '+',
        label: 'MISIONES COMPLETAS',
        description: 'Proyectos entregados con éxito',
        icon: '🚀',
    },
    {
        value: 15,
        suffix: '+',
        label: 'TECNOLOGÍAS',
        description: 'Herramientas en el arsenal',
        icon: '⚙',
    },
    {
        value: 6,
        suffix: '',
        label: 'PAÍSES',
        description: 'Venezuela, Chile, Colombia, España, USA, México, Polonia',
        icon: '🌎',
    },
];

/* ── Animated counter ── */
function AnimatedCounter({ value, suffix, duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = value;
        const increment = end / (duration * 60); // ~60fps
        let raf;

        const step = () => {
            start += increment;
            if (start >= end) {
                setCount(end);
                return;
            }
            setCount(Math.floor(start));
            raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}
            {suffix}
        </span>
    );
}

/* ── Single stat card ── */
function StatCard({ stat, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="panel glow-hover p-6 lg:p-8 text-center relative group"
        >
            {/* Icon */}
            <div className="text-2xl mb-4">{stat.icon}</div>

            {/* Counter */}
            <div className="text-4xl lg:text-5xl font-bold font-jura text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>

            {/* Label */}
            <div className="mono text-[11px] text-cyan tracking-widest mb-2">
                {stat.label}
            </div>

            {/* Description */}
            <p className="text-xs text-text-dim leading-relaxed">{stat.description}</p>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyan/10 rounded-tr-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyan/10 rounded-bl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
}

/* ── Metrics Section ── */
export default function Metrics() {
    return (
        <section id="metrics" className="relative py-24 lg:py-32 px-6 z-10 overflow-hidden">
            <div className="max-w-[1100px] mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <span className="mono text-[10px] text-text-dim tracking-widest">
                        TELEMETRÍA DEL SISTEMA
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jura text-white mt-3 tracking-tight">
                        MÉTRICAS
                    </h2>
                    <div className="hud-line mt-6 w-48 mx-auto" />
                </motion.div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {STATS.map((stat, i) => (
                        <StatCard key={stat.label} stat={stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
