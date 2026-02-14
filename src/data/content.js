export const projects = [
    {
        id: 1,
        title: 'PROYECTO: KEPLER',
        subtitle: 'ESTADO: AR SPACE EXPLORATION',
        category: 'Desarrollo',
        tags: ['REACT', 'THREE.JS', 'TENSORFLOW', 'SUPABASE'],
        image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop',
        mission: 'Desarrollar una experiencia de exploración espacial en Realidad Aumentada que permita la identificación de objetos celestes en tiempo real con persistencia de datos para investigación educativa.',
        problem: '> kepler@mission-control:~$ diagnostics --run\n\nERROR: No existía una herramienta accesible para identificar\nobjetos celestes en tiempo real desde dispositivos móviles.\n\nWARN: Las soluciones existentes requerían hardware especializado\ncon costos superiores a $10K USD.\n\nCRITICAL: La latencia de procesamiento era de 4.8s por frame,\nimposibilitando la experiencia en tiempo real.',
        solution: 'Pipeline de procesamiento de visión con TensorFlow Lite para inferencia on-device en <200ms. Integración de Three.js para renderizado AR de órbitas y datos telemetricos. Persistencia en Supabase con sincronización offline-first.',
        gallery: [
            'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=500&fit=crop',
        ],
    },
    {
        id: 2,
        title: 'PROYECTO: ORION',
        subtitle: 'ESTADO: FINTECH DASHBOARD',
        category: 'Diseño',
        tags: ['FIGMA', 'UX RESEARCH', 'DESIGN SYSTEM', 'PROTOTIPADO'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
        mission: 'Rediseñar el dashboard analítico de una fintech procesando +2M transacciones diarias. Reducir el tiempo de interpretación de datos complejos en un 60%.',
        problem: '> orion@mission-control:~$ diagnostics --run\n\nERROR: Tasa de error en interpretación de datos: 34%.\nLos usuarios confundían métricas críticas con datos auxiliares.\n\nWARN: 12 vistas fragmentadas sin sistema de diseño unificado.\n\nCRITICAL: El tiempo promedio para localizar un insight\naccionable era de 4.2 minutos.',
        solution: 'Sistema de diseño atómico con 47 componentes reutilizables. Implementación de Progressive Disclosure para reducir la carga cognitiva. Visualizaciones de datos con D3.js que priorizan insights accionables sobre datos crudos. 15 sesiones de user testing iterativo.',
        gallery: [
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=500&fit=crop',
        ],
    },
    {
        id: 3,
        title: 'PROYECTO: ATLAS',
        subtitle: 'ESTADO: E-COMMERCE PLATFORM',
        category: 'Desarrollo',
        tags: ['NEXT.JS', 'TYPESCRIPT', 'REDIS', 'DOCKER'],
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop',
        mission: 'Construir una plataforma e-commerce de alto rendimiento con soporte para 50K usuarios concurrentes y tiempos de carga sub-segundo.',
        problem: '> atlas@mission-control:~$ diagnostics --run\n\nERROR: La plataforma colapsaba con >5K usuarios concurrentes.\nTTFB promedio: 3.2 segundos.\n\nWARN: Tasa de abandono del carrito: 87%.\n\nCRITICAL: Zero fault tolerance. Un solo punto de fallo\nderribaba todo el sistema.',
        solution: 'Arquitectura JAMStack con Next.js ISR, CDN edge distribuida y caché inteligente con Redis. Checkout optimizado de 3 pasos que redujo el abandono al 34%. Deploy containerizado con Docker y health checks automáticos.',
        gallery: [
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop',
        ],
    },
    {
        id: 4,
        title: 'PROYECTO: VOYAGER',
        subtitle: 'ESTADO: SOCIAL DEV PLATFORM',
        category: 'Desarrollo',
        tags: ['REACT', 'NODE.JS', 'WEBSOCKET', 'MONGODB'],
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
        mission: 'Crear una plataforma social de nicho para comunidades de desarrolladores con colaboración de código en tiempo real y sistema de reputación.',
        problem: '> voyager@mission-control:~$ diagnostics --run\n\nERROR: Latencia de mensajería en soluciones existentes: >2s.\n\nWARN: Zero soporte nativo para code snippets con\nsyntax highlighting.\n\nCRITICAL: Comunidades fragmentadas en 4+ plataformas\ncon datos no sincronizados.',
        solution: 'WebSockets con Socket.io para mensajería <50ms. Editor colaborativo con Monaco Editor (VSCode engine). Sistema de reputación gamificado con badges. Feed personalizado con algoritmo de relevancia basado en intereses.',
        gallery: [
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
            'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=500&fit=crop',
        ],
    },
];

export const skills = {
    primary: {
        title: 'PRIMARY WEAPON // FRONTEND ARCH',
        category: 'Development',
        items: [
            { name: 'React Ecosystem', level: 'EXPERT', progress: 95, details: 'React 19, Next.js, Zustand' },
            { name: 'Visual Engineering', level: 'EXPERT', progress: 90, details: 'Tailwind CSS, Framer Motion, GSAP' },
            { name: 'TypeScript', level: 'ADVANCED', progress: 85, details: 'Strict typing, Design Patterns' },
        ]
    },
    secondary: {
        title: 'SECONDARY WEAPON // BACKEND & DATA',
        category: 'Infrastructure',
        items: [
            { name: 'Node.js Core', level: 'ADVANCED', progress: 80, details: 'Express, REST APIs, Automation' },
            { name: 'Database / BaaS', level: 'INTERMEDIATE', progress: 75, details: 'Supabase, PostgreSQL, RLS' },
            { name: 'Python', level: 'INTERMEDIATE', progress: 70, details: 'Scripting, Data Analysis' },
        ]
    },
    tactical: {
        title: 'TACTICAL GEAR // TOOLS',
        category: 'Workflow',
        items: [
            { name: 'Design Ops', level: 'EXPERT', progress: 92, details: 'Figma, Adobe Suite, Prototyping' },
            { name: 'Dev Ops', level: 'ADVANCED', progress: 85, details: 'Git, Docker, Vercel CI/CD' },
            { name: 'Environment', level: 'ADVANCED', progress: 88, details: 'Linux, Hyprland, Neovim' },
        ]
    },
    ultimate: {
        title: 'ULTIMATE ABILITY // APPLIED AI',
        category: 'Intelligence',
        items: [
            { name: 'Generative AI', level: 'SPECIALIST', progress: 85, details: 'Stable Diffusion, Flux, ComfyUI' },
            { name: 'LLM Engineering', level: 'SPECIALIST', progress: 80, details: 'Local LLMs, Ollama, RAG Pipelines' },
            { name: 'Prompt Eng.', level: 'EXPERT', progress: 90, details: 'System Prompts, Chain-of-Thought' },
        ]
    },
};

export const telemetry = [
    { label: 'OS', value: 'ARCH LINUX // HYPRLAND WM' },
    { label: 'CPU', value: 'AMD RYZEN 7 5700X' },
    { label: 'GPU', value: 'NVIDIA RTX 3060' },
    { label: 'RAM', value: '32GB DDR4' },
];
