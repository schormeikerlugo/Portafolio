import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import GlassContainerValorant from '../components/GlassContainerValorant';
import ScrambleText from '../components/ScrambleText';

const CERTIFICATIONS = [
    {
        id: 1,
        title: 'Google UX Design Professional Certificate',
        issuer: 'Google',
        year: '2022',
        url: 'https://coursera.org/verify/professional-cert/UXDESIGN',
        skills: ['UX Research', 'Prototyping', 'Figma'],
        icon: '🎯'
    },
    {
        id: 2,
        title: 'Meta Front-End Developer Professional Certificate',
        issuer: 'Meta',
        year: '2023',
        url: 'https://coursera.org/verify/professional-cert/METAFRONTEND',
        skills: ['React', 'JavaScript', 'CSS', 'HTML'],
        icon: '⚛️'
    },
    {
        id: 3,
        title: 'Advanced React & Web Performance',
        issuer: 'Epic React',
        year: '2023',
        url: 'https://epicreact.dev/verify',
        skills: ['Performance', 'Architecture', 'Testing'],
        icon: '⚡'
    },
    {
        id: 4,
        title: 'Design Systems for Developers',
        issuer: 'Storybook',
        year: '2024',
        url: 'https://storybook.js.org/learn',
        skills: ['Design Systems', 'Atomic Design', 'Storybook'],
        icon: '🧩'
    }
];

export default function Certifications() {
    const { t } = useTranslation();

    return (
        <section id="certifications" className="relative py-24 lg:py-32 px-6 z-10">
            <div className="max-w-[1400px] mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="mono text-[10px] text-text-dim tracking-[0.3em] font-bold uppercase">
                        {t('certifications.tag', 'CREDENCIALES VALIDADAS')}
                    </span>
                    <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-bold font-mono text-white mt-4 tracking-tight uppercase break-words">
                        <ScrambleText text={t('certifications.title', 'FORMACIÓN')} />
                    </h2>
                    <p className="text-text-secondary text-base mt-6 max-w-xl mx-auto leading-relaxed font-light opacity-80 uppercase font-mono tracking-tighter text-xs">
                        {t('certifications.subtitle', 'Mejora continua del operativo.')}
                    </p>
                    <div className="hud-line mt-8 w-48 mx-auto" />
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CERTIFICATIONS.map((cert, idx) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                            <GlassContainerValorant className="p-0 h-full flex flex-col group/cert hover:scale-[1.02] transition-transform duration-300">
                                <div className="p-6 flex flex-col h-full">
                                    {/* Icon & Year */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-xl group-hover/cert:border-cyan/30 transition-colors">
                                            {cert.icon}
                                        </div>
                                        <span className="mono text-[10px] text-text-dim font-bold tracking-widest group-hover/cert:text-cyan transition-colors">
                                            {cert.year}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-sm font-bold text-white mb-2 font-mono uppercase leading-tight group-hover/cert:text-cyan transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="mono text-[9px] text-text-dim uppercase tracking-widest mb-4">
                                        ISSUER: {cert.issuer}
                                    </p>

                                    {/* Skills tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-6">
                                        {cert.skills.map(skill => (
                                            <span key={skill} className="text-[8px] mono px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40 uppercase">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Link button */}
                                    <a
                                        href={cert.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto w-full py-2 border border-white/10 font-mono text-[9px] text-text-secondary text-center hover:bg-cyan/10 hover:border-cyan/40 hover:text-cyan transition-all uppercase tracking-widest font-bold"
                                    >
                                        {t('certifications.verify', 'VERIFICAR CERTIFICADO')}
                                    </a>
                                </div>
                            </GlassContainerValorant>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
