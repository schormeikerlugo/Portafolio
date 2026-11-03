export interface SkillCategory {
  title: string;
  category: string;
  items: { name: string; level: string; progress: number; details: string }[];
}

export const skills = {
    primary: {
        title: 'FRONTEND // ARQUITECTURA WEB',
        category: 'Development',
        items: [
            { name: 'React Ecosystem', level: 'EXPERT', progress: 95, details: 'React 19, Next.js, Typescript, Zustand' },
            { name: 'Visual Engineering', level: 'EXPERT', progress: 90, details: 'Tailwind CSS, Framer Motion, GSAP' },
            { name: 'WordPress & CMS', level: 'ADVANCED', progress: 85, details: 'Custom Themes, Headless, Elementor' },
        ]
    },
    secondary: {
        title: 'BACKEND // DATOS E INFRAESTRUCTURA',
        category: 'Infrastructure',
        items: [
            { name: 'Node.js Core', level: 'INTERMEDIATE', progress: 50, details: 'Express, REST APIs, Automation' },
            { name: 'Database / BaaS', level: 'INTERMEDIATE', progress: 60, details: 'Supabase, PostgreSQL, RLS' },
            { name: 'Python', level: 'BASIC', progress: 30, details: 'Scripting, Data Analysis' },
        ]
    },
    tactical: {
        title: 'HERRAMIENTAS // FLUJO DE TRABAJO',
        category: 'Workflow',
        items: [
            { name: 'Design Ops', level: 'EXPERT', progress: 92, details: 'Figma, Adobe Suite, Prototyping' },
            { name: 'Dev Ops', level: 'INTERMEDIATE', progress: 50, details: 'Git, Docker, Vercel CI/CD' },
            { name: 'Environment', level: 'ADVANCED', progress: 88, details: 'Linux, Hyprland, Neovim' },
        ]
    },
    ultimate: {
        title: 'INTELIGENCIA ARTIFICIAL // APLICADA',
        category: 'Intelligence',
        items: [
            { name: 'Generative AI', level: 'SPECIALIST', progress: 85, details: 'Stable Diffusion, Flux, ComfyUI' },
            { name: 'LLM Engineering', level: 'SPECIALIST', progress: 80, details: 'Ollama, Opencode, Open Web UI' },
            { name: 'Prompt Engineering', level: 'EXPERT', progress: 90, details: 'System Prompts, Chain-of-Thought' },
        ]
    },
};

export const telemetry = [
    { label: 'OS', value: 'ARCH LINUX // HYPRLAND WM' },
    { label: 'CPU', value: 'AMD RYZEN 7 5700X' },
    { label: 'GPU', value: '12GB NVIDIA RTX 3060' },
    { label: 'RAM', value: '64GB DDR4' },
];

export const experience = [
    {
        role: 'UI/UX Designer & Frontend Developer',
        company: 'AQOMI (Poland)',
        period: 'SEP 2023 — MAY 2025',
        description: 'Lideré el desarrollo de identidades visuales y prototipos de alta fidelidad. Implementé sitios WordPress personalizados e integré herramientas de IA (ChatGPT, Midjourney) para la exploración visual avanzada.',
        tech: ['Figma', 'WordPress', 'AI', 'React'],
    },
    {
        role: 'UI/UX Designer',
        company: 'SACSCLOUD.COM (Mexico)',
        period: 'AUG 2020 — AUG 2023',
        description: 'Rediseñé dashboards SaaS reduciendo el tiempo de navegación en un 30%. Establecí sistemas de diseño reutilizables para garantizar la consistencia visual en todo el ecosistema de la nube.',
        tech: ['Design Systems', 'UX Research'],
    },
    {
        role: 'UI/UX Designer',
        company: 'SPLINTERLANDS (USA)',
        period: 'NOV 2021 — MAR 2022',
        description: 'Diseñé interfaces para un popular juego Web3. Integré visuales generados por IA y colaboré con equipos de blockchain para el alineamiento de activos NFT.',
        tech: ['Blockchain', 'Game UI', 'Midjourney'],
    },
    {
        role: 'UI/UX Designer',
        company: 'TAKODEFI (Spain)',
        period: 'AUG 2020 — APR 2021',
        description: 'Diseñé interfaces DeFi para staking y farming. Creé flujos intuitivos para usuarios no familiarizados con cripto, reduciendo errores transaccionales significativamente.',
        tech: ['Web3', 'DeFi', 'User Research'],
    },
    {
        role: 'UI/UX Designer',
        company: 'KOOOMO (Colombia)',
        period: 'JUL 2020 — SEP 2020',
        description: 'Rediseñé tableros de eCommerce y realicé auditorías de UX para aumentar las tasas de adopción de funciones críticas.',
        tech: ['eCommerce', 'UX Audit'],
    },
    {
        role: 'Web Designer',
        company: 'LIMBIC (Chile)',
        period: '2020',
        description: 'Diseñé sitios institucionales receptivos y plataformas de eCommerce para startups tecnológicas, mejorando las tasas de conversión en un 20%.',
        tech: ['Adobe Suite', 'HTML/CSS'],
    },
    {
        role: 'Tech Support & Designer',
        company: 'PASSWORD TECHNOLOGY (Venezuela)',
        period: 'JAN 2018 — MAY 2020',
        description: 'Combiné soporte técnico con diseño visual para modernizar la imagen corporativa y mejorar la experiencia de atención al cliente.',
        tech: ['Adobe Suite', 'HTML/CSS', 'Support'],
    },
];

export const anomalies = [
    {
        code: 'ERR_HIGH_DEBT',
        title: 'Sistemas Inconsistentes',
        impact: 'Fatiga de mantenimiento',
        description: 'La fragmentación visual y técnica genera una deuda técnica que ralentiza los lanzamientos y confunde al usuario final.',
    },
    {
        code: 'ERR_SYNC_FAIL',
        title: 'Brecha Diseño-Ingeniería',
        impact: 'Fricción operativa',
        description: 'La falta de un lenguaje común entre diseñadores y desarrolladores resulta en implementaciones de baja fidelidad y fricción en los procesos.',
    },
    {
        code: 'ERR_NO_MODULAR',
        title: 'Arquitecturas Rígidas',
        impact: 'Falta de modularidad',
        description: 'Interfaces que no pueden evolucionar sin romperse. La ausencia de un sistema de diseño atómico impide el escalado eficiente.',
    },
];

export const protocols = [
    {
        id: '01',
        title: 'DESIGN SYSTEMS',
        subtitle: 'Escalabilidad Visual',
        description: 'Construcción de bibliotecas de componentes atómicos y documentación técnica. Aseguro la consistencia visual y la integridad del sistema.',
        deliverables: ['UI Kits Atómicos', 'Design Tokens', 'Componentes React', 'Guías de Estilo'],
    },
    {
        id: '02',
        title: 'INTERFACE ENGINEERING',
        subtitle: 'Fidelidad Técnica',
        description: 'Desarrollo frontend con React y animaciones. Especializado en optimizar el rendimiento de renderizado y crear micro-interacciones.',
        deliverables: ['Performance Optimization', 'React Rendering', 'Micro-interactions', 'Accesibilidad A11Y'],
    },
    {
        id: '03',
        title: 'PRODUCT STRATEGY',
        subtitle: 'Visión a Ejecución',
        description: 'Diagnóstico técnico y visual para definir el roadmap de producto. Elimino la fricción operativa entre stakeholders e ingeniería.',
        deliverables: ['Auditoría UX', 'Viabilidad Técnica', 'User Research', 'Wireframing'],
    },
    {
        id: '04',
        title: 'APPLIED AI RESEARCH',
        subtitle: 'Innovación Operativa',
        description: 'Implementación de flujos de trabajo inteligentes. Desde Ingeniería de Prompts hasta el despliegue de LLMs locales.',
        deliverables: ['Prompt Engineering', 'LLM Integration', 'Gen-AI Assets', 'Stable Diffusion'],
    },
];

export const bio = {
    paragraphs: [
        'Hola, mi nombre es Schormeiker Lugo, Diseñador UI/UX y Desarrollador Frontend con más de siete años de trayectoria profesional. Mi perfil une una capacidad técnica avanzada con un sólido conocimiento en Diseño de interfaces gráficas y prototipado. Esta combinación me facilita crear productos digitales que poseen una arquitectura robusta y priorizan la experiencia del usuario final.',
        'Mi metodología transforma flujos complejos en interfaces eficientes y atractivas. El proceso creativo se respalda con un dominio profundo de HTML, CSS y JavaScript. Además, construyo aplicaciones interactivas mediante React y Vite, y conecto estos entornos visuales con bases de datos ágiles utilizando herramientas como Supabase y PostgreSQL.',
        'El flujo de trabajo que utilizo integra la Inteligencia Artificial como un recurso fundamental. Mi experiencia en ingeniería de prompts maximiza el rendimiento de los modelos de lenguaje (LLMs), tanto en plataformas comerciales como en entornos de ejecución local. Esta adopción tecnológica acelera la ideación visual, automatiza tareas rutinarias y eleva la calidad general de cada proyecto.',
    ],
    phases: [
        { id: '01', title: 'Diseño UI/UX', description: 'Mi trayectoria comenzó con la estructuración de la estética y la interacción humana. El trabajo en startups y plataformas de comercio electrónico consolidó mis bases en la psicología visual y la arquitectura de la información.' },
        { id: '02', title: 'Ingeniería Frontend', description: 'La diferencia visual entre el diseño original y el producto final motivó un cambio de enfoque decisivo. Esta fricción operativa me impulsó a dominar arquitecturas basadas en React y Tailwind CSS.' },
        { id: '03', title: 'Sistemas Interactivos', description: 'Las interfaces estáticas presentan limitaciones en la retención del usuario. Los ecosistemas Web3 y los productos digitales avanzados requieren microinteracciones para construir confianza.' },
        { id: '04', title: 'IA y Automatización', description: 'Mi metodología resuelve este problema mediante la adopción de la Inteligencia Artificial en el ciclo diario de trabajo. Aplico técnicas avanzadas de ingeniería de prompts y ejecuto modelos de lenguaje (LLMs) en entornos locales.' },
    ],
    missionStatement: 'Cierro la brecha entre la ingeniería abstracta y la intuición humana.',
};

export const socialLinks = {
    github: 'https://github.com/schormeikerlugo',
    behance: 'https://behance.net/schormeikerlugo',
    linkedin: 'https://www.linkedin.com/in/schormeiker/',
    instagram: 'https://instagram.com/schormeiker_lugo',
    tiktok: 'https://tiktok.com/@schormeikerlugo',
    dribbble: 'https://dribbble.com/schormeiker',
};
