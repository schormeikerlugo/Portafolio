export interface ProjectMeta {
  role: string[];
  roleEn: string[];
  metrics?: { value: string; label: string; labelEn: string }[];
}

const meta: Record<number, ProjectMeta> = {
  // ═══ DISEÑO — CRYPTO ═══
  1: {
    role: ['UI Design', 'UX Research', 'Design System', 'Prototyping'],
    roleEn: ['UI Design', 'UX Research', 'Design System', 'Prototyping'],
    metrics: [
      { value: '-62%', label: 'Tasa de abandono', labelEn: 'Abandonment rate' },
      { value: '7→3', label: 'Pasos de staking', labelEn: 'Staking steps' },
      { value: '+15', label: 'Pantallas diseñadas', labelEn: 'Screens designed' },
    ],
  },
  2: {
    role: ['UI Design', 'Visual Identity', 'Motion Concepts'],
    roleEn: ['UI Design', 'Visual Identity', 'Motion Concepts'],
    metrics: [
      { value: '100%', label: 'Identidad nueva', labelEn: 'New identity' },
      { value: 'Dark', label: 'Theme premium', labelEn: 'Premium theme' },
    ],
  },
  3: {
    role: ['UI Design', 'Landing Page', 'Dashboard'],
    roleEn: ['UI Design', 'Landing Page', 'Dashboard'],
    metrics: [
      { value: '2', label: 'Plataformas', labelEn: 'Platforms' },
      { value: 'UX', label: 'Gamificación', labelEn: 'Gamification' },
    ],
  },
  4: {
    role: ['UI Concept', 'Game UI', 'NFT Interface'],
    roleEn: ['UI Concept', 'Game UI', 'NFT Interface'],
    metrics: [
      { value: 'P2E', label: 'Modelo de juego', labelEn: 'Game model' },
      { value: 'NFT', label: 'Marketplace integrado', labelEn: 'Integrated marketplace' },
    ],
  },
  5: {
    role: ['UI Kit', 'Dashboard Design', 'Freebie'],
    roleEn: ['UI Kit', 'Dashboard Design', 'Freebie'],
    metrics: [
      { value: '+5K', label: 'Descargas', labelEn: 'Downloads' },
      { value: '15+', label: 'Pantallas', labelEn: 'Screens' },
    ],
  },

  // ═══ DISEÑO — VIDEOJUEGOS ═══
  6: {
    role: ['Game UI Concept', 'HUD Design', 'Art Direction'],
    roleEn: ['Game UI Concept', 'HUD Design', 'Art Direction'],
    metrics: [
      { value: 'HUD', label: 'Diegético', labelEn: 'Diegetic' },
      { value: '6', label: 'Pantallas concepto', labelEn: 'Concept screens' },
    ],
  },
  7: {
    role: ['UI/UX Redesign', 'Desktop App', 'E-commerce'],
    roleEn: ['UI/UX Redesign', 'Desktop App', 'E-commerce'],
    metrics: [
      { value: '4', label: 'Secciones rediseñadas', labelEn: 'Sections redesigned' },
      { value: 'Dark', label: 'Theme gaming', labelEn: 'Gaming theme' },
    ],
  },
  8: {
    role: ['Dashboard UI', 'Data Visualization', 'Analytics'],
    roleEn: ['Dashboard UI', 'Data Visualization', 'Analytics'],
    metrics: [
      { value: 'Stats', label: 'Visualización radial', labelEn: 'Radial visualization' },
      { value: 'Dark', label: 'Mode responsive', labelEn: 'Responsive mode' },
    ],
  },
  9: {
    role: ['UI/UX Redesign', 'Prototype', 'User Research'],
    roleEn: ['UI/UX Redesign', 'Prototype', 'User Research'],
    metrics: [
      { value: 'Grid', label: 'Biblioteca dinámica', labelEn: 'Dynamic library' },
      { value: 'Social', label: 'Perfiles mejorados', labelEn: 'Enhanced profiles' },
    ],
  },
  10: {
    role: ['Web Design', 'AI Assets Integration', 'Parallax'],
    roleEn: ['Web Design', 'AI Assets Integration', 'Parallax'],
    metrics: [
      { value: 'IA', label: 'Assets generados', labelEn: 'Generated assets' },
      { value: 'Parallax', label: 'Landing inmersiva', labelEn: 'Immersive landing' },
    ],
  },
  11: {
    role: ['Web UI Concept', 'Art Direction', 'Visual Effects'],
    roleEn: ['Web UI Concept', 'Art Direction', 'Visual Effects'],
    metrics: [
      { value: 'Glitch', label: 'Efectos surrealistas', labelEn: 'Surreal effects' },
      { value: 'Kojima', label: 'Estética narrativa', labelEn: 'Narrative aesthetic' },
    ],
  },
  12: {
    role: ['Web UI Concept', 'HUD Design', 'Military Aesthetic'],
    roleEn: ['Web UI Concept', 'HUD Design', 'Military Aesthetic'],
    metrics: [
      { value: 'HUD', label: 'Elementos tácticos', labelEn: 'Tactical elements' },
      { value: 'Parallax', label: 'Transiciones agresivas', labelEn: 'Aggressive transitions' },
    ],
  },
  13: {
    role: ['E-commerce UI', 'Product Design', 'Checkout Flow'],
    roleEn: ['E-commerce UI', 'Product Design', 'Checkout Flow'],
    metrics: [
      { value: '2', label: 'Pasos de checkout', labelEn: 'Checkout steps' },
      { value: '360°', label: 'Vista de producto', labelEn: 'Product view' },
    ],
  },

  // ═══ DISEÑO — APP ═══
  14: {
    role: ['Mobile UI', 'Sports UX', 'Real-time Input'],
    roleEn: ['Mobile UI', 'Sports UX', 'Real-time Input'],
    metrics: [
      { value: '1 tap', label: 'Input de score', labelEn: 'Score input' },
      { value: '5', label: 'Pantallas clave', labelEn: 'Key screens' },
    ],
  },
  15: {
    role: ['Mobile UI Concept', 'Fan Engagement', 'Sports'],
    roleEn: ['Mobile UI Concept', 'Fan Engagement', 'Sports'],
    metrics: [
      { value: 'Live', label: 'Modo partido', labelEn: 'Match mode' },
      { value: '3', label: 'Pantallas principales', labelEn: 'Main screens' },
    ],
  },
  16: {
    role: ['App UI/UX', 'Dual Profile', 'System Design'],
    roleEn: ['App UI/UX', 'Dual Profile', 'System Design'],
    metrics: [
      { value: '2', label: 'Perfiles (huésped/staff)', labelEn: 'Profiles (guest/staff)' },
      { value: '<30s', label: 'Tiempo por tarea', labelEn: 'Time per task' },
    ],
  },
  17: {
    role: ['App UI/UX', 'Map Design', 'AR Navigation'],
    roleEn: ['App UI/UX', 'Map Design', 'AR Navigation'],
    metrics: [
      { value: 'AR', label: 'Navegación aumentada', labelEn: 'Augmented navigation' },
      { value: 'Clusters', label: 'Zoom inteligente', labelEn: 'Smart zoom' },
    ],
  },

  // ═══ DISEÑO — WEB ═══
  18: {
    role: ['Web Design', 'AI Platform', 'Landing Page'],
    roleEn: ['Web Design', 'AI Platform', 'Landing Page'],
    metrics: [
      { value: '3', label: 'Clicks al onboarding', labelEn: 'Clicks to onboard' },
      { value: 'Enterprise', label: 'Audiencia target', labelEn: 'Target audience' },
    ],
  },
  19: {
    role: ['Web Design', 'Fitness Brand', 'Community'],
    roleEn: ['Web Design', 'Fitness Brand', 'Community'],
    metrics: [
      { value: 'Video', label: 'Hero con comunidad real', labelEn: 'Real community hero' },
      { value: '3', label: 'Niveles de programa', labelEn: 'Program levels' },
    ],
  },
  20: {
    role: ['Web Design', 'Agency Portfolio', 'Case Studies'],
    roleEn: ['Web Design', 'Agency Portfolio', 'Case Studies'],
    metrics: [
      { value: 'Balance', label: 'Creatividad + usabilidad', labelEn: 'Creativity + usability' },
      { value: 'Filtros', label: 'Portfolio por industria', labelEn: 'Portfolio by industry' },
    ],
  },
  21: {
    role: ['E-commerce UI', 'Product Photography', 'Dark Theme'],
    roleEn: ['E-commerce UI', 'Product Photography', 'Dark Theme'],
    metrics: [
      { value: '360°', label: 'Zoom de producto', labelEn: 'Product zoom' },
      { value: '4', label: 'Categorías de filtro', labelEn: 'Filter categories' },
    ],
  },
  22: {
    role: ['News Redesign', 'Accessibility', 'COVID Response'],
    roleEn: ['News Redesign', 'Accessibility', 'COVID Response'],
    metrics: [
      { value: '+15%', label: 'Tipografía ampliada', labelEn: 'Enlarged typography' },
      { value: 'Real-time', label: 'Datos COVID por región', labelEn: 'COVID data by region' },
    ],
  },
  23: {
    role: ['Corporate Web', 'Finance', 'Data Visualization'],
    roleEn: ['Corporate Web', 'Finance', 'Data Visualization'],
    metrics: [
      { value: '<8s', label: 'Juicio de confianza', labelEn: 'Trust judgment' },
      { value: 'Live', label: 'Datos de rendimiento', labelEn: 'Performance data' },
    ],
  },
  24: {
    role: ['Promotional Web', 'Tourism', 'Parallax'],
    roleEn: ['Promotional Web', 'Tourism', 'Parallax'],
    metrics: [
      { value: '979m', label: 'Cascada más alta', labelEn: 'Tallest waterfall' },
      { value: 'UNESCO', label: 'Patrimonio mundial', labelEn: 'World heritage' },
    ],
  },
  25: {
    role: ['Streaming UI', 'Content Discovery', 'Video Player'],
    roleEn: ['Streaming UI', 'Content Discovery', 'Video Player'],
    metrics: [
      { value: '-7min', label: 'Tiempo buscando', labelEn: 'Search time' },
      { value: 'Autoplay', label: 'Previews al hover', labelEn: 'Hover previews' },
    ],
  },
  26: {
    role: ['Sports Profile', 'Athlete Brand', 'Social Integration'],
    roleEn: ['Sports Profile', 'Athlete Brand', 'Social Integration'],
    metrics: [
      { value: '<30s', label: 'Evaluación de sponsor', labelEn: 'Sponsor evaluation' },
      { value: 'Live', label: 'Alcance social', labelEn: 'Social reach' },
    ],
  },

  // ═══ DISEÑO — DASHBOARD ═══
  27: {
    role: ['SaaS Dashboard', 'Data Visualization', 'Role-based UI'],
    roleEn: ['SaaS Dashboard', 'Data Visualization', 'Role-based UI'],
    metrics: [
      { value: '-30%', label: 'Tiempo navegación', labelEn: 'Navigation time' },
      { value: '200+', label: 'Empresas en México', labelEn: 'Companies in Mexico' },
      { value: '3', label: 'Niveles de drill-down', labelEn: 'Drill-down levels' },
    ],
  },
  28: {
    role: ['Fintech UI', 'CRM Pipeline', 'Enterprise'],
    roleEn: ['Fintech UI', 'CRM Pipeline', 'Enterprise'],
    metrics: [
      { value: '-3h/día', label: 'Tiempo de búsqueda', labelEn: 'Search time' },
      { value: '4', label: 'Columnas de pipeline', labelEn: 'Pipeline columns' },
    ],
  },
  29: {
    role: ['POS Dashboard', 'Retail UI', 'Keyboard Shortcuts'],
    roleEn: ['POS Dashboard', 'Retail UI', 'Keyboard Shortcuts'],
    metrics: [
      { value: '<15s', label: 'Transacción en pico', labelEn: 'Peak transaction' },
      { value: '2', label: 'Modos (cajero/admin)', labelEn: 'Modes (cashier/admin)' },
    ],
  },

  // ═══ DESARROLLO — VIDEOJUEGOS ═══
  30: {
    role: ['Game Development', 'Engine Architecture', 'Pixel Art'],
    roleEn: ['Game Development', 'Engine Architecture', 'Pixel Art'],
    metrics: [
      { value: 'Phaser', label: 'Motor 2D custom', labelEn: '2D custom engine' },
      { value: 'IA', label: 'Enemigos con estados', labelEn: 'State-based enemies' },
      { value: 'Modular', label: 'Arquitectura', labelEn: 'Architecture' },
    ],
  },
  31: {
    role: ['Full-stack Dev', 'Game Design', 'Multiplayer', 'PWA'],
    roleEn: ['Full-stack Dev', 'Game Design', 'Multiplayer', 'PWA'],
    metrics: [
      { value: '6', label: 'Tipos de power-up', labelEn: 'Power-up types' },
      { value: '2', label: 'Modos multijugador', labelEn: 'Multiplayer modes' },
      { value: '15', label: 'Pantallas', labelEn: 'Screens' },
    ],
  },

  // ═══ DESARROLLO — WEB ═══
  32: {
    role: ['Full-stack Dev', 'Supabase', 'Edge Functions'],
    roleEn: ['Full-stack Dev', 'Supabase', 'Edge Functions'],
    metrics: [
      { value: 'RLS', label: 'Seguridad de datos', labelEn: 'Data security' },
      { value: 'Real-time', label: 'Tickets en vivo', labelEn: 'Live tickets' },
      { value: 'Email', label: 'Notificaciones', labelEn: 'Notifications' },
    ],
  },
  33: {
    role: ['Frontend Dev', 'CSS Architecture', 'Responsive'],
    roleEn: ['Frontend Dev', 'CSS Architecture', 'Responsive'],
    metrics: [
      { value: 'Pixel', label: 'Perfect desde mockup', labelEn: 'Perfect from mockup' },
      { value: '3', label: 'Breakpoints custom', labelEn: 'Custom breakpoints' },
    ],
  },
  34: {
    role: ['Full-stack Dev', 'AI/ML', 'React Native', 'Computer Vision'],
    roleEn: ['Full-stack Dev', 'AI/ML', 'React Native', 'Computer Vision'],
    metrics: [
      { value: 'YOLOv11', label: 'Detección local', labelEn: 'Local detection' },
      { value: '<50ms', label: 'Latencia por token', labelEn: 'Token latency' },
      { value: 'Offline', label: 'Funciona sin internet', labelEn: 'Works without internet' },
    ],
  },
  35: {
    role: ['Frontend Dev', 'SPA Architecture', 'WebGL'],
    roleEn: ['Frontend Dev', 'SPA Architecture', 'WebGL'],
    metrics: [
      { value: '<1s', label: 'Tiempo de carga', labelEn: 'Load time' },
      { value: '0', label: 'Frameworks usados', labelEn: 'Frameworks used' },
      { value: '#1 CA', label: 'Ranking en Clutch', labelEn: 'Clutch ranking' },
    ],
  },
  36: {
    role: ['Full-stack Dev', 'Three.js', 'GLSL Shaders', 'Python'],
    roleEn: ['Full-stack Dev', 'Three.js', 'GLSL Shaders', 'Python'],
    metrics: [
      { value: '3D', label: 'Planetas procedurales', labelEn: 'Procedural planets' },
      { value: 'NASA', label: 'Datos reales', labelEn: 'Real data' },
      { value: 'PL/pgSQL', label: 'Habitabilidad auto', labelEn: 'Auto habitability' },
    ],
  },
  37: {
    role: ['Frontend Dev', 'Astro SSG', 'SVG Animation'],
    roleEn: ['Frontend Dev', 'Astro SSG', 'SVG Animation'],
    metrics: [
      { value: '1,350+', label: 'Instalaciones', labelEn: 'Facilities' },
      { value: '$1T+', label: 'Activos gestionados', labelEn: 'Managed assets' },
      { value: '0 JS', label: 'En páginas estáticas', labelEn: 'On static pages' },
    ],
  },
};

export function getProjectMeta(id: number): ProjectMeta | null {
  return meta[id] || null;
}
