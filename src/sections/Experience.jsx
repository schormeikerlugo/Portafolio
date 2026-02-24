import { motion } from 'framer-motion';

/* ── Experience data from CV ── */
const MISSIONS = [
    {
        id: 'mission-07',
        label: 'MISIÓN 07',
        role: 'UI/UX Designer & Frontend Developer',
        company: 'Aqomi',
        location: 'Polonia',
        period: 'Sep 2023 — May 2025',
        description:
            'Desarrollé identidades visuales completas para marcas emergentes. Diseñé y prototipé interfaces web en Figma para sitios corporativos y landing pages orientadas a conversión. Utilicé herramientas de IA como ChatGPT para generar contenido de soporte y Midjourney para exploraciones visuales conceptuales. Implementé sitios WordPress personalizados, optimizados para rendimiento y experiencia mobile.',
        tech: ['Figma', 'WordPress', 'ChatGPT', 'Midjourney', 'HTML/CSS'],
        type: 'contract',
    },
    {
        id: 'mission-06',
        label: 'MISIÓN 06',
        role: 'UI/UX Designer',
        company: 'Sacscloud.com',
        location: 'México',
        period: 'Ago 2020 — Ago 2023',
        description:
            'Rediseñé el dashboard de administración para una plataforma SaaS, reduciendo el tiempo de navegación del usuario en un 30%. Implementé prototipos interactivos con Figma para validar ideas con stakeholders antes de la fase de desarrollo. Establecí sistemas de diseño reutilizables que mejoraron la consistencia visual.',
        tech: ['Figma', 'Design Systems', 'Prototyping', 'UX Research'],
        type: 'contract',
    },
    {
        id: 'mission-05',
        label: 'MISIÓN 05',
        role: 'UI/UX Designer',
        company: 'Splinterlands',
        location: 'USA',
        period: 'Nov 2021 — Mar 2022',
        description:
            'Diseñé interfaces de usuario para nuevas funcionalidades in-game, mejorando la retención diaria de jugadores. Integré visuales generados con Midjourney para enriquecer el universo visual del juego. Colaboré con desarrolladores y el equipo blockchain para alinear el diseño con dinámicas de tokens y NFTs.',
        tech: ['Figma', 'Midjourney', 'Blockchain', 'Game UI'],
        type: 'contract',
    },
    {
        id: 'mission-04',
        label: 'MISIÓN 04',
        role: 'UI/UX Designer',
        company: 'TakoDeFi',
        location: 'España',
        period: 'Ago 2020 — Abr 2021',
        description:
            'Diseñé la interfaz de usuario para una plataforma DeFi enfocada en staking y farming de tokens, enfatizando la claridad visual y la confianza del usuario. Creé flujos intuitivos para personas sin experiencia previa en crypto, reduciendo significativamente errores en transacciones y tasas de abandono.',
        tech: ['Figma', 'Web3', 'DeFi', 'User Research'],
        type: 'contract',
    },
    {
        id: 'mission-03',
        label: 'MISIÓN 03',
        role: 'UI/UX Designer',
        company: 'Kooomo',
        location: 'Colombia',
        period: 'Jul 2020 — Sep 2020',
        description:
            'Rediseñé módulos de dashboard y flujos de usuario para una plataforma de gestión eCommerce, mejorando la eficiencia de navegación para retailers. Realicé auditorías UX y propuse soluciones basadas en análisis heurístico que aumentaron la tasa de adopción de nuevas funcionalidades.',
        tech: ['Figma', 'UX Audit', 'eCommerce', 'Design Systems'],
        type: 'freelance',
    },
    {
        id: 'mission-02',
        label: 'MISIÓN 02',
        role: 'Web Designer',
        company: 'Limbic',
        location: 'Chile',
        period: '2020',
        description:
            'Conceptualicé y diseñé sitios web institucionales y e-commerce para startups tecnológicas. Proporcioné soluciones accesibles y responsivas que mejoraron las tasas de conversión en un promedio del 20%.',
        tech: ['Figma', 'HTML/CSS', 'WordPress', 'eCommerce'],
        type: 'freelance',
    },
    {
        id: 'mission-01',
        label: 'MISIÓN 01',
        role: 'Tech Support & Designer',
        company: 'Password Technology',
        location: 'Venezuela',
        period: 'Ene 2018 — May 2020',
        description:
            'Colaboré con equipos de soporte técnico para mejorar la experiencia del cliente en servicios digitales. Inicié una transición visual hacia un diseño más moderno, mejorando la imagen corporativa.',
        tech: ['Photoshop', 'Illustrator', 'HTML/CSS'],
        type: 'fulltime',
    },
];

/* ── Type badge colors ── */
const TYPE_STYLES = {
    contract: 'border-cyan/30 text-cyan',
    freelance: 'border-magenta/30 text-magenta',
    fulltime: 'border-white/20 text-text-secondary',
};

const TYPE_LABELS = {
    contract: 'CONTRATO',
    freelance: 'FREELANCE',
    fulltime: 'TIEMPO COMPLETO',
};

/* ── Single mission card ── */
function MissionCard({ mission, index, isLeft }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative flex justify-center ${isLeft ? 'lg:justify-end lg:pr-12' : 'lg:justify-start lg:pl-12'} w-full lg:w-1/2 ${isLeft ? 'lg:self-start' : 'lg:self-start lg:ml-auto'}`}
        >
            {/* Connection dot on timeline */}
            <div
                className={`hidden lg:block absolute top-6 ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-3 h-3 rounded-full border-2 border-cyan bg-void z-10`}
            />

            {/* Card */}
            <div className="panel glow-hover w-full max-w-[520px] p-6 relative group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="mono text-[10px] text-cyan tracking-widest">
                            {mission.label}
                        </span>
                        <h3 className="text-lg font-semibold text-white mt-1 font-jura">
                            {mission.role}
                        </h3>
                        <p className="mono text-[11px] text-text-secondary mt-0.5">
                            {mission.company} · {mission.location}
                        </p>
                    </div>
                    <span
                        className={`mono text-[9px] px-2 py-1 border rounded-sm ${TYPE_STYLES[mission.type]}`}
                    >
                        {TYPE_LABELS[mission.type]}
                    </span>
                </div>

                {/* Period */}
                <div className="mono text-[10px] text-text-dim mb-3 tracking-wider">
                    ⏱ {mission.period}
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {mission.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                    {mission.tech.map((t) => (
                        <span
                            key={t}
                            className="mono text-[9px] px-2 py-0.5 border border-white/[0.08] bg-white/[0.02] text-white/80 rounded-sm transition-colors duration-300 group-hover:text-cyan group-hover:border-cyan/40"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* Subtle corner decoration */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan/20 rounded-tl-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan/20 rounded-br-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.div>
    );
}

/* ── Experience Section ── */
export default function Experience() {
    return (
        <section id="experience" className="relative py-24 lg:py-32 px-6 z-10 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <span className="mono text-[10px] text-text-dim tracking-widest">
                        BITÁCORA DE MISIONES
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jura text-white mt-3 tracking-tight">
                        EXPERIENCIA
                    </h2>
                    <p className="text-text-secondary text-sm mt-4 max-w-lg mx-auto">
                        +7 años navegando por el ecosistema digital, diseñando interfaces que
                        conectan la visión creativa con la ejecución técnica.
                    </p>
                    <div className="hud-line mt-6 w-48 mx-auto" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central timeline line (desktop only) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan/20 to-transparent" />

                    {/* Mission cards */}
                    <div className="flex flex-col gap-8 lg:gap-12">
                        {MISSIONS.map((mission, i) => (
                            <MissionCard
                                key={mission.id}
                                mission={mission}
                                index={i}
                                isLeft={i % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
