import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Shield, Target, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TypewriterText from '../components/TypewriterText';
import CipherText from '../components/CipherText';

const MISSIONS = [
    {
        id: 'mission-07',
        role: 'UI/UX Designer & Frontend Developer',
        company: 'AQOMI (Poland)',
        period: 'SEP 2023 — MAY 2025',
        tech: ['Figma', 'WordPress', 'AI', 'React'],
        description: 'Lideré el desarrollo de identidades visuales y prototipos de alta fidelidad. Implementé sitios WordPress personalizados e integré herramientas de IA (ChatGPT, Midjourney) para la exploración visual avanzada.',
    },
    {
        id: 'mission-06',
        role: 'UI/UX Designer',
        company: 'SACSCLOUD.COM (Mexico)',
        period: 'AUG 2020 — AUG 2023',
        tech: ['Figma', 'Design Systems', 'UX Research'],
        description: 'Rediseñé dashboards SaaS reduciendo el tiempo de navegación en un 30%. Establecí sistemas de diseño reutilizables para garantizar la consistencia visual en todo el ecosistema de la nube.',
    },
    {
        id: 'mission-05',
        role: 'UI/UX Designer',
        company: 'SPLINTERLANDS (USA)',
        period: 'NOV 2021 — MAR 2022',
        tech: ['Blockchain', 'Game UI', 'Midjourney'],
        description: 'Diseñé interfaces para un popular juego Web3. Integré visuales generados por IA y colaboré con equipos de blockchain para el alineamiento de activos NFT.',
    },
    {
        id: 'mission-04',
        role: 'UI/UX Designer',
        company: 'TAKODEFI (Spain)',
        period: 'AUG 2020 — APR 2021',
        tech: ['Web3', 'DeFi', 'User Research'],
        description: 'Diseñé interfaces DeFi para staking y farming. Creé flujos intuitivos para usuarios no familiarizados con cripto, reduciendo errores transaccionales significativamente.',
    },
    {
        id: 'mission-03',
        role: 'UI/UX Designer',
        company: 'KOOOMO (Colombia)',
        period: 'JUL 2020 — SEP 2020',
        tech: ['eCommerce', 'UX Audit', 'Figma'],
        description: 'Rediseñé tableros de eCommerce y realicé auditorías de UX para aumentar las tasas de adopción de funciones críticas.',
    },
    {
        id: 'mission-02',
        role: 'Web Designer',
        company: 'LIMBIC (Chile)',
        period: '2020',
        tech: ['Figma', 'WordPress', 'eCommerce'],
        description: 'Diseñé sitios institucionales receptivos y plataformas de eCommerce para startups tecnológicas, mejorando las tasas de conversión en un 20%.',
    },
    {
        id: 'mission-01',
        role: 'Tech Support & Designer',
        company: 'PASSWORD TECHNOLOGY (Venezuela)',
        period: 'JAN 2018 — MAY 2020',
        tech: ['Adobe Suite', 'HTML/CSS', 'Support'],
        description: 'Combiné soporte técnico con diseño visual para modernizar la imagen corporativa y mejorar la experiencia de atención al cliente.',
    },
];

const TechnicalTag = ({ icon: Icon, label, value, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="inline-flex items-center gap-2 px-3 py-1.5 border border-border bg-surface hover:border-cyan/30 transition-all rounded-sm"
    >
        <Icon size={12} className="text-cyan/60" />
        <span className="mono text-[10px] text-text-dim uppercase tracking-widest">{label}:</span>
        <span className="mono text-[10px] text-text-primary font-bold">{value}</span>
    </motion.div>
);

const TimelineItem = ({ m, index, isLast }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="relative px-6 sm:pl-16 pb-16 group text-center md:text-left"
    >
        {!isLast && (
            <div className="absolute left-[5px] sm:left-[9px] top-6 bottom-0 w-px bg-border hidden sm:block" />
        )}
        <div className="absolute left-[-4px] sm:left-0 top-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border bg-void hidden sm:flex items-center justify-center group-hover:border-cyan/50 transition-all z-10">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-text-dim group-hover:bg-cyan transition-colors" />
        </div>

        <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="mono text-xs text-text-secondary font-bold tracking-[0.2em] uppercase">
                    {m.period}
                </span>
                <div className="h-px flex-1 bg-border hidden sm:block" />
                <span className="mono text-[9px] text-text-dim uppercase tracking-widest bg-surface border border-border px-2 py-0.5 rounded-sm">
                    MISSION_ID: {MISSIONS.length - index}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-3">
                    <h3 className="font-sans text-2xl sm:text-3xl font-bold text-text-primary uppercase tracking-tight group-hover:text-cyan transition-colors">
                        {m.role}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <Globe size={14} className="text-cyan/80" />
                        <span className="mono text-[11px] sm:text-sm text-text-secondary uppercase tracking-widest">{m.company}</span>
                    </div>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans pt-2">
                        {m.description}
                    </p>
                </div>

                <div className="lg:col-span-4 space-y-3 pt-2 lg:pt-0">
                    <div className="flex items-center justify-center md:justify-start gap-2 opacity-50">
                        <Terminal size={12} />
                        <span className="mono text-[10px] text-text-secondary uppercase tracking-widest font-bold">TECH_STACK</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {m.tech.map(t => (
                            <span key={t} className="mono text-[10px] text-cyan/80 border border-cyan/20 px-2 py-1 bg-cyan/5 rounded-sm uppercase tracking-wider">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

export default function Bio({ isTeaser = false }) {
    const { t } = useTranslation();
    const timelineRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        timelineRef.current.style.setProperty('--mouse-x', `${x}px`);
        timelineRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const PHASES = [
        {
            title: "0X01 // FUNDAMENTOS_VISUALES: [ Figma, CMS ]",
            text: "Empecé orquestando la estética y la interacción humana. Diseñando para startups y entornos eCommerce, forjé mis raíces en la psicología visual y la arquitectura de la información. Me apoyé en estructuras como WordPress para tangibilizar las experiencias, desarrollando un ojo clínico para la consistencia y el impacto."
        },
        {
            title: "0X02 // INGENIERÍA_FRONTEND: [ React, Tailwind ]",
            text: "La asimetría entre diseño y producción impulsó mi transición. La fricción operativa de delegar interfaces me llevó a dominar React y Tailwind CSS, asumiendo yo mismo el control arquitectónico absoluto para asegurar implementaciones robustas con cero pérdida de fidelidad respecto al prototipo."
        },
        {
            title: "0X03 // ECOSISTEMAS_INTERACTIVOS: [ Web3, Framer Motion, GSAP ]",
            text: "Las pantallas estáticas alcanzaron un límite. Para la Web3 y ecosistemas DeFi, la micro-interacción es el puente hacia la confianza. Introduje ingenierías de movimiento (Framer Motion y GSAP) para hacer que las interfaces \"respiren\" y reaccionen como un entorno vivo ante cada input del usuario."
        },
        {
            title: "0X04 // IA_Y_AUTOMATIZACIÓN: [ Modelos_Locales, Prompt_Engineering ]",
            text: "En el presente, el cuello de botella ya no es el stack clásico. Integro orquestaciones de Inteligencia Artificial (Prompt Engineering y LLMs locales bajo estricta privacidad) directamente dentro del ciclo de desarrollo. Esto me permite escalar flujos de UX/UI y producir código iterativo a una velocidad terminal."
        }
    ];

    return (
        <section id="about" className="relative z-10 py-24 sm:py-32 px-6 overflow-hidden bg-void border-t border-border">

            {/* Fondo de Puntos Animado Sutil */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(0, 229, 255, 0.8) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Viñeta para difuminar los bordes hacia negro */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_80%)]" />
            </div>

            <div className="max-w-[1400px] mx-auto flex flex-col items-start relative z-10">
                <div className="w-full flex flex-col items-center md:items-start text-center md:text-left space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-2"
                    >
                        <span className="mono text-[10px] sm:text-xs text-text-dim tracking-[0.4em] uppercase">
                            0X03 // HISTORIA_DE_LA_MISIÓN
                        </span>
                    </motion.div>

                    <div className="space-y-6 w-full">
                        <h2 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans text-text-primary leading-[1] font-bold tracking-tighter mb-6 break-words">
                            <CipherText text="Orígenes." />
                        </h2>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                            <TechnicalTag icon={Cpu} label="Exp" value="+07 YRS" delay={0.1} />
                            <TechnicalTag icon={Terminal} label="Prod" value="12 UNIT" delay={0.2} />
                            <TechnicalTag icon={Shield} label="SLA" value="99.9%" delay={0.3} />
                            <TechnicalTag icon={Target} label="Lead" value="06 TEAM" delay={0.4} />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start w-full">
                        {/* Left: Texts */}
                        <div className="flex-1 space-y-10">
                            <div className="space-y-6 text-text-secondary text-lg sm:text-xl leading-relaxed font-sans">
                                <p>{t('bio.p1', 'Hola, mi nombre es Schormeiker Lugo, Diseñador UI/UX y Desarrollador Frontend con más de siete años de trayectoria profesional. Mi perfil une una capacidad técnica avanzada con un sólido conocimiento en Diseño de interfaces graficas y prototipado. Esta combinación me facilita crear productos digitales que poseen una arquitectura robusta y priorizan la experiencia del usuario final.')}</p>
                                <p>{t('bio.p2', 'Mi metodología transforma flujos complejos en interfaces eficientes y atractivas. El proceso creativo se respalda con un dominio profundo de HTML, CSS y JavaScript. Además, construyo aplicaciones interactivas mediante React y Vite, y conecto estos entornos visuales con bases de datos ágiles utilizando herramientas como Supabase y PostgreSQL.')}</p>
                                <p>{t('bio.p3', 'El flujo de trabajo que utilizo integra la Inteligencia Artificial como un recurso fundamental. Mi experiencia en ingeniería de prompts maximiza el rendimiento de los modelos de lenguaje (LLMs), tanto en plataformas comerciales como en entornos de ejecución local. Esta adopción tecnológica acelera la ideación visual, automatiza tareas rutinarias y eleva la calidad general de cada proyecto.')}</p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative p-6 sm:p-8 border-l-2 border-cyan bg-surface"
                            >
                                <p className="italic font-sans text-text-primary text-xl md:text-2xl leading-snug">
                                    "{t('bio.mission_statement', 'Cierro la brecha entre la ingeniería abstracta y la intuición humana.')}"
                                </p>
                            </motion.div>
                        </div>

                        {/* Right: Sci-Fi Profile Picture */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="w-full sm:w-[320px] lg:w-[360px] shrink-0 aspect-[4/5] relative group overflow-hidden bg-void/50 shadow-[0_0_30px_rgba(0,229,255,0.05)] border border-cyan/20"
                            style={{
                                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                        >
                            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                                <filter id="pixelate" x="-10%" y="-10%" width="120%" height="120%">
                                    <feFlood x="4" y="4" height="2" width="2" floodColor="white" />
                                    <feComposite width="10" height="10" />
                                    <feTile result="a" />
                                    <feComposite in="SourceGraphic" in2="a" operator="in" />
                                    <feMorphology operator="dilate" radius="5" />
                                </filter>
                            </svg>

                            <img
                                src="/media/perfil.jpg"
                                alt="Schormeiker Lugo"
                                className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:opacity-0 transition-opacity duration-300 z-0 opacity-80"
                            />
                            <img
                                src="/media/perfil.jpg"
                                alt="Schormeiker Lugo Pixelated"
                                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                style={{ filter: 'grayscale(100%) url(#pixelate)' }}
                            />

                            {/* Corner accents */}
                            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan/30 group-hover:border-cyan transition-colors z-20" />
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan/30 group-hover:border-cyan transition-colors z-20" />

                            {/* Scanline effect */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay opacity-30 z-20">
                                <div className="w-full h-[2px] bg-cyan/50 animate-scanline shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Evolución integrada sin cajones pesados */}
                    <div className="w-full space-y-12 mt-16 pt-16 border-t border-white/5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-10 text-text-secondary text-base sm:text-lg leading-relaxed font-sans max-w-2xl"
                        >
                            <div>
                                <h4 className="mono text-[10px] text-cyan uppercase tracking-widest block mb-1">{t('bio.phases.t1', '01 // Diseño UI/UX')}</h4>
                                <p>{t('bio.phases.d1', 'Mi trayectoria comenzó con la estructuración de la estética y la interacción humana. El trabajo en startups y plataformas de comercio electrónico consolidó mis bases en la psicología visual y la arquitectura de la información. Esta experiencia inicial afinó mi criterio para asegurar una alta consistencia técnica en cada interfaz.')}</p>
                            </div>

                            <div>
                                <h4 className="mono text-[10px] text-cyan uppercase tracking-widest block mb-1">{t('bio.phases.t2', '02 // Ingeniería Frontend')}</h4>
                                <p>{t('bio.phases.d2', 'La diferencia visual entre el diseño original y el producto final motivó un cambio de enfoque decisivo. Esta fricción operativa me impulsó a dominar arquitecturas basadas en React y Tailwind CSS. Hoy en día, asumo el control total del código para garantizar resultados exactos y prevenir cualquier pérdida de fidelidad visual.')}</p>
                            </div>

                            <div>
                                <h4 className="mono text-[10px] text-cyan uppercase tracking-widest block mb-1">{t('bio.phases.t3', '03 // Sistemas Interactivos')}</h4>
                                <p>{t('bio.phases.d3', 'Las interfaces estáticas presentan limitaciones en la retención del usuario. Los ecosistemas Web3 y los productos digitales avanzados requieren microinteracciones para construir confianza. Por esta razón, integro bibliotecas de animación como GSAP y Framer Motion. Estas tecnologías transforman pantallas planas en entornos dinámicos que responden de forma natural a cada acción de la persona.')}</p>
                            </div>

                            <div>
                                <h4 className="mono text-[10px] text-cyan uppercase tracking-widest block mb-1">{t('bio.phases.t4', '04 // IA y Automatización')}</h4>
                                <p>{t('bio.phases.d4', 'El tiempo de programación representa frecuentemente el mayor desafío técnico en la actualidad. Mi metodología resuelve este problema mediante la adopción de la Inteligencia Artificial en el ciclo diario de trabajo. Aplico técnicas avanzadas de ingeniería de prompts y ejecuto modelos de lenguaje (LLMs) en entornos locales. Esta estrategia acelera significativamente la escritura de código, la producción y la experimentación constante.')}</p>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {!isTeaser && (
                    <div className="w-full mt-32 pt-24 border-t border-border">
                        <header className="mb-16 flex flex-col items-center md:items-start text-center md:text-left">
                            <h3 className="text-[clamp(1.5rem,6vw,4rem)] md:text-6xl lg:text-7xl font-sans font-bold text-text-primary tracking-tighter break-words">
                                <CipherText text="Historial Operativo." />
                            </h3>
                        </header>
                        <div className="relative">
                            {MISSIONS.map((m, i) => (
                                <TimelineItem key={m.id} m={m} index={i} isLast={i === MISSIONS.length - 1} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
