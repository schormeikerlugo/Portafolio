import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import CipherText from '../components/CipherText';
import Particles from '../components/Particles';

export default function ServicesPage() {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-20 lg:pt-32 bg-void"
        >
            <div className="relative z-10 py-12 lg:py-24">
                <Particles quantity={40} />

                <div className="max-w-[1400px] mx-auto px-6 space-y-32 lg:space-y-48">
                    
                    {/* MODULE 01: DESIGN SYSTEMS */}
                    <section className="relative group">
                        <header className="mb-12 flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="mono text-[10px] sm:text-xs text-cyan tracking-[0.4em] uppercase mb-4">
                                // PROTOCOL 01
                            </span>
                            <h2 className="text-[clamp(2rem,6vw,4.5rem)] md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.85] break-words">
                                <CipherText text="DESIGN SYSTEMS" />
                            </h2>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div className="space-y-8">
                                <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed">
                                    No diseño interfaces aisladas; construyo <strong>ecosistemas visuales escalables</strong>. Un Sistema de Diseño real no es una simple librería en Figma, es un contrato técnico estricto entre diseño y código.
                                </p>
                                <p className="text-text-dim text-sm sm:text-base leading-relaxed">
                                    Estandarizo tokens de diseño (tipografía, espacios, colores y sombras) para convertirlos en variables de React. Esto destruye la ambigüedad, asegurando que cada componente reaccione predeciblemente y permitiendo a tu equipo de ingeniería construir pantallas iterativas con un 100% de fiabilidad visual y estructural sin tener que "adivinar" el diseño.
                                </p>
                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="mono text-[10px] text-cyan uppercase tracking-widest mb-4">DELIVERABLES_</h4>
                                    <ul className="grid grid-cols-2 gap-4 mono text-xs text-text-secondary">
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> UI Kits Atómicos</li>
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> Design Tokens</li>
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> Componentes React</li>
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> Guías de Estilo</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="relative">
                                {/* Decorator Bracket */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan/40" />
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan/40" />
                                
                                <div className="p-8 bg-surface border border-border backdrop-blur-sm relative z-10 shadow-2xl overflow-hidden">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 border-b border-border pb-6">
                                            <div className="w-3 h-3 bg-cyan shadow-[0_0_15px_rgba(0,255,229,0.8)]" />
                                            <span className="mono text-sm text-cyan tracking-widest uppercase">Ecosistema UI</span>
                                        </div>
                                        <div className="space-y-4">
                                            {['Tokens Globales', 'Componentes Atómicos', 'Patrones de Interacción', 'Documentación Técnica'].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3">
                                                    <span className="text-text-primary text-sm font-sans">{item}</span>
                                                    <span className="mono text-[10px] text-text-dim tracking-widest">ESTANDARIZADO</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full flex justify-center"><div className="hud-line w-48 opacity-20" /></div>

                    {/* MODULE 02: INTERFACE ENGINEERING */}
                    <section className="relative group">
                        <header className="mb-12 flex flex-col items-center md:items-end text-center md:text-right">
                            <span className="mono text-[10px] sm:text-xs text-magenta tracking-[0.4em] uppercase mb-4">
                                // PROTOCOL 02
                            </span>
                            <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.85] break-words">
                                <CipherText text="INTERFACE ENGINEERING" />
                            </h2>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            
                            {/* Visual Left on Desktop */}
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-magenta/40" />
                                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-magenta/40" />
                                
                                <div className="p-8 bg-surface border border-border backdrop-blur-sm relative z-10 shadow-2xl overflow-hidden">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 border-b border-border pb-6">
                                            <div className="w-3 h-3 bg-magenta shadow-[0_0_15px_rgba(255,0,85,0.8)]" />
                                            <span className="mono text-sm text-magenta tracking-widest uppercase">Performance Target</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="bg-void border border-border p-4">
                                                <div className="flex justify-between mb-3"><span className="text-xs text-text-secondary mono tracking-widest uppercase">Frame_Rate</span><span className="text-xs text-magenta mono font-bold">120 FPS</span></div>
                                                <div className="w-full bg-white/5 h-1"><div className="bg-magenta h-1 w-[98%]" /></div>
                                            </div>
                                            <div className="bg-void border border-border p-4">
                                                <div className="flex justify-between mb-3"><span className="text-xs text-text-secondary mono tracking-widest uppercase">Input_Latency</span><span className="text-xs text-magenta mono font-bold">&lt; 16ms</span></div>
                                                <div className="w-full bg-white/5 h-1"><div className="bg-magenta h-1 w-[95%]" /></div>
                                            </div>
                                            <div className="bg-void border border-border p-4">
                                                <div className="flex justify-between mb-3"><span className="text-xs text-text-secondary mono tracking-widest uppercase">Render_Cost</span><span className="text-xs text-magenta mono font-bold">OPTIMIZED</span></div>
                                                <div className="w-full bg-white/5 h-1"><div className="bg-magenta h-1 w-full" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 order-1 lg:order-2 md:text-right">
                                <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed">
                                    Renderizado puro. Traduzco abstracciones de diseño en <strong>código limpio, nativo y predecible</strong>.
                                </p>
                                <p className="text-text-dim text-sm sm:text-base leading-relaxed">
                                    Combino React con manipulación estricta del DOM y Framer Motion para asegurar que cada interacción visual se sienta instintiva. No utilizo librerías infladas; cada milisegundo ganado en el árbol de renderizado se invierte en generar micro-interacciones (como cursores de hardware 1:1 o desenfoques orgánicos) que elevan la jerarquía táctil del usuario sin consumir los recursos del sistema final.
                                </p>
                                <div className="pt-6 border-t border-white/5 md:flex md:flex-col md:items-end">
                                    <h4 className="mono text-[10px] text-magenta uppercase tracking-widest mb-4">CAPABILITIES_</h4>
                                    <ul className="grid grid-cols-2 gap-4 md:text-right mono text-xs text-text-secondary w-full">
                                        <li>GSAP & Framer <span className="text-magenta pl-2">«</span></li>
                                        <li>React Rendering <span className="text-magenta pl-2">«</span></li>
                                        <li>Cero-Latencia <span className="text-magenta pl-2">«</span></li>
                                        <li>Accesibilidad A11Y <span className="text-magenta pl-2">«</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full flex justify-center"><div className="hud-line w-48 opacity-20" /></div>

                    {/* MODULE 03: PRODUCT STRATEGY */}
                    <section className="relative group">
                        <header className="mb-12 flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="mono text-[10px] sm:text-xs text-cyan tracking-[0.4em] uppercase mb-4">
                                // PROTOCOL 03
                            </span>
                            <h2 className="text-[clamp(2rem,6vw,4.5rem)] md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.85] break-words">
                                <CipherText text="PRODUCT STRATEGY" />
                            </h2>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            <div className="space-y-8">
                                <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed">
                                    Elimino el caos operativo trazando <strong>rutas críticas sin fricción</strong>. Todo buen código nace de una dirección táctica inquebrantable.
                                </p>
                                <p className="text-text-dim text-sm sm:text-base leading-relaxed">
                                    Actúo como el puente funcional entre la visión de negocio de los stakeholders y la viabilidad técnica del equipo de desarrollo. Realizo auditorías UX/UI agresivas para detectar cuello de botella interactivos y establezco roadmaps donde los recursos de ingeniería se envían únicamente a arquitecturas diseñadas para solventar carencias específicas, nunca al azar.
                                </p>
                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="mono text-[10px] text-cyan uppercase tracking-widest mb-4">METRICS_</h4>
                                    <ul className="grid grid-cols-2 gap-4 mono text-xs text-text-secondary">
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> Auditoría UX</li>
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> Viabilidad Técnica</li>
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> User Research</li>
                                        <li className="flex items-center gap-2"><span className="text-cyan">»</span> Wireframing</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan/40" />
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan/40" />
                                
                                <div className="p-8 bg-surface border border-border backdrop-blur-sm relative z-10 shadow-2xl overflow-hidden">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 border-b border-border pb-6">
                                            <div className="w-3 h-3 bg-cyan shadow-[0_0_15px_rgba(0,255,229,0.8)]" />
                                            <span className="mono text-sm text-cyan tracking-widest uppercase">Ruta de Ejecución</span>
                                        </div>
                                        <div className="space-y-6">
                                            {['Discovery & Análisis', 'Auditoría Técnica UX', 'Prototipado Táctico', 'Despliegue y Pruebas'].map((step, i) => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <span className="mono text-xs text-cyan border border-cyan/30 bg-cyan/10 px-2 py-1">0{i+1}</span>
                                                    <p className="text-base text-text-primary tracking-tight font-sans">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full flex justify-center"><div className="hud-line w-48 opacity-20" /></div>

                    {/* MODULE 04: APPLIED AI RESEARCH */}
                    <section className="relative group">
                        <header className="mb-12 flex flex-col items-center md:items-end text-center md:text-right">
                            <span className="mono text-[10px] sm:text-xs text-magenta tracking-[0.4em] uppercase mb-4">
                                // PROTOCOL 04
                            </span>
                            <h2 className="text-[clamp(1.8rem,5vw,4.5rem)] md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tighter uppercase leading-[0.85] break-words">
                                <CipherText text="APPLIED AI RESEARCH" />
                            </h2>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                            
                            <div className="relative order-2 lg:order-1">
                                <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-magenta/40" />
                                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-magenta/40" />
                                
                                <div className="p-8 bg-surface border border-border backdrop-blur-sm relative z-10 shadow-2xl overflow-hidden">
                                     <div className="space-y-6">
                                        <div className="flex items-center gap-4 border-b border-border pb-6">
                                            <div className="w-3 h-3 bg-magenta shadow-[0_0_15px_rgba(255,0,85,0.8)]" />
                                            <span className="mono text-sm text-magenta tracking-widest uppercase">Motor Generativo</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="border border-border bg-void/50 p-6 text-center hover:border-magenta/50 transition-colors">
                                                <span className="block text-3xl mb-3">🧠</span>
                                                <span className="text-[10px] text-text-secondary mono uppercase tracking-widest block">LLM Integration</span>
                                            </div>
                                            <div className="border border-border bg-void/50 p-6 text-center hover:border-magenta/50 transition-colors">
                                                <span className="block text-3xl mb-3">⚡</span>
                                                <span className="text-[10px] text-text-secondary mono uppercase tracking-widest block">Prompt Eng.</span>
                                            </div>
                                            <div className="border border-border bg-void/50 p-6 text-center hover:border-magenta/50 transition-colors">
                                                <span className="block text-3xl mb-3">👁️</span>
                                                <span className="text-[10px] text-text-secondary mono uppercase tracking-widest block">Computer Vision</span>
                                            </div>
                                            <div className="border border-border bg-void/50 p-6 text-center hover:border-magenta/50 transition-colors">
                                                <span className="block text-3xl mb-3">⚙️</span>
                                                <span className="text-[10px] text-text-secondary mono uppercase tracking-widest block">Automation</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 order-1 lg:order-2 md:text-right">
                                <p className="text-text-secondary text-lg sm:text-xl font-light leading-relaxed">
                                    Potenciación algorítmica. Despliego la inteligencia artificial no como un truco, sino como un <strong>compilador de procesos humanos</strong>.
                                </p>
                                <p className="text-text-dim text-sm sm:text-base leading-relaxed">
                                    Acelero las iteraciones de diseño un 60% mediante técnicas de Prompt Engineering estricto, empleando agentes locales y despliegue de LLMs para validaciones o reestructuramiento de bases de código gigante. Utilizo modelos generativos visuales como Midjourney para bocetar rápidamente variaciones abstractas antes de consolidar el diseño lógico en matriz SVG o React Code.
                                </p>
                                <div className="pt-6 border-t border-white/5 md:flex md:flex-col md:items-end">
                                    <h4 className="mono text-[10px] text-magenta uppercase tracking-widest mb-4">TOOLING_</h4>
                                    <ul className="grid grid-cols-2 gap-4 md:text-right mono text-xs text-text-secondary w-full">
                                        <li>Prompt Engineering <span className="text-magenta pl-2">«</span></li>
                                        <li>LLM Integration <span className="text-magenta pl-2">«</span></li>
                                        <li>Gen-AI Assets <span className="text-magenta pl-2">«</span></li>
                                        <li>Stable Diffusion <span className="text-magenta pl-2">«</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {/* Tidy bottom buffer */}
            <div className="h-32 bg-void" />
        </motion.div>
    );
}
