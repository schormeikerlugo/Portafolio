import { motion } from 'framer-motion';

/* ── Certifications data from CV ── */
const CERTIFICATIONS = [
    {
        id: 'cert-1',
        title: 'Figma: Técnicas Avanzadas de Diseño',
        institution: 'Domestika / Platzi',
        date: 'Nov 2024',
        category: 'design',
        icon: '◆',
    },
    {
        id: 'cert-2',
        title: 'Figma: Prototyping e Interfaz',
        institution: 'Domestika / Platzi',
        date: 'Nov 2024',
        category: 'design',
        icon: '◆',
    },
    {
        id: 'cert-3',
        title: 'Adobe XD',
        institution: 'Domestika / Platzi',
        date: 'Nov 2024',
        category: 'design',
        icon: '◇',
    },
    {
        id: 'cert-4',
        title: 'Fundamentos de Diseño de Interfaces',
        institution: 'Domestika / Platzi',
        date: 'May 2024',
        category: 'ux',
        icon: '▣',
    },
    {
        id: 'cert-5',
        title: 'Arquitectura de Información y Usabilidad',
        institution: 'Domestika / Platzi',
        date: 'Nov 2024',
        category: 'ux',
        icon: '▣',
    },
    {
        id: 'cert-6',
        title: 'Curso Introductorio de Diseño',
        institution: 'Domestika / Platzi',
        date: 'Dic 2024',
        category: 'design',
        icon: '◇',
    },
    {
        id: 'cert-7',
        title: 'Matte Painting: Técnica Completa',
        institution: 'Domestika',
        date: 'Nov 2019',
        category: 'art',
        icon: '✦',
    },
];

/* ── Skills from CV ── */
const CORE_SKILLS = [
    { label: 'Figma', level: 95 },
    { label: 'HTML & CSS', level: 90 },
    { label: 'JavaScript', level: 80 },
    { label: 'React', level: 85 },
    { label: 'WordPress', level: 80 },
    { label: 'Photoshop', level: 85 },
    { label: 'Illustrator', level: 75 },
    { label: 'Wireframing', level: 90 },
    { label: 'Prototyping', level: 90 },
    { label: 'UI/UX', level: 95 },
];

/* ── Category badge colors ── */
const CATEGORY_STYLES = {
    design: 'border-cyan/30 text-cyan',
    ux: 'border-magenta/30 text-magenta',
    art: 'border-yellow-400/30 text-yellow-400',
    dev: 'border-green-400/30 text-green-400',
};

const CATEGORY_LABELS = {
    design: 'DISEÑO',
    ux: 'UX',
    art: 'ARTE',
    dev: 'DEV',
};

/* ── Single certification card ── */
function CertCard({ cert, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="panel glow-hover p-5 relative group"
        >
            {/* Icon and category */}
            <div className="flex items-start justify-between mb-3">
                <span className="text-cyan text-lg">{cert.icon}</span>
                <span
                    className={`mono text-[8px] px-1.5 py-0.5 border rounded-sm ${CATEGORY_STYLES[cert.category]}`}
                >
                    {CATEGORY_LABELS[cert.category]}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-white font-jura leading-snug mb-2">
                {cert.title}
            </h3>

            {/* Institution & date */}
            <p className="mono text-[9px] text-text-dim tracking-wider">
                {cert.institution}
            </p>
            <p className="mono text-[9px] text-text-dim tracking-wider mt-0.5">
                ⏱ {cert.date}
            </p>

            {/* Star connection line (decorative) */}
            <div className="absolute -bottom-4 left-1/2 w-px h-4 bg-gradient-to-b from-cyan/10 to-transparent hidden lg:block" />
        </motion.div>
    );
}

/* ── Skill bar ── */
function SkillBar({ skill, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex items-center gap-3"
        >
            <span className="mono text-[10px] text-text-secondary tracking-wider w-28 text-right shrink-0">
                {skill.label}
            </span>
            <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-cyan/60 to-cyan rounded-full"
                />
            </div>
            <span className="mono text-[9px] text-text-dim w-8 shrink-0">{skill.level}%</span>
        </motion.div>
    );
}

/* ── Certifications & Education Section ── */
export default function Certifications() {
    return (
        <section id="certifications" className="relative py-24 lg:py-32 px-6 z-10 overflow-hidden">
            <div className="max-w-[1200px] mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="mono text-[10px] text-text-dim tracking-widest">
                        MAPA ESTELAR DE CONOCIMIENTO
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jura text-white mt-3 tracking-tight">
                        FORMACIÓN
                    </h2>
                    <p className="text-text-secondary text-sm mt-4 max-w-lg mx-auto">
                        Cada certificación es una estrella en la constelación del conocimiento.
                        Aprendizaje continuo como combustible de la misión.
                    </p>
                    <div className="hud-line mt-6 w-48 mx-auto" />
                </motion.div>

                {/* Two-column layout: Certs grid + Skill bars */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Certifications grid */}
                    <div className="lg:col-span-7">
                        <h3 className="mono text-[11px] text-cyan tracking-widest mb-6">
                            ◇ CERTIFICACIONES
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {CERTIFICATIONS.map((cert, i) => (
                                <CertCard key={cert.id} cert={cert} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Skill proficiency bars */}
                    <div className="lg:col-span-5">
                        <h3 className="mono text-[11px] text-cyan tracking-widest mb-6">
                            ◆ DOMINIO TÉCNICO
                        </h3>
                        <div className="flex flex-col gap-4 panel p-6">
                            {CORE_SKILLS.map((skill, i) => (
                                <SkillBar key={skill.label} skill={skill} index={i} />
                            ))}
                        </div>

                        {/* Languages */}
                        <div className="mt-8">
                            <h3 className="mono text-[11px] text-cyan tracking-widest mb-4">
                                ◈ IDIOMAS
                            </h3>
                            <div className="panel p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary">Español</span>
                                    <span className="mono text-[10px] text-cyan border border-cyan/20 px-2 py-0.5 rounded-sm">
                                        NATIVO
                                    </span>
                                </div>
                                <div className="w-full h-px bg-white/[0.04]" />
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-text-secondary">English</span>
                                    <span className="mono text-[10px] text-text-dim border border-white/[0.08] px-2 py-0.5 rounded-sm">
                                        BÁSICO / TÉCNICO
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
