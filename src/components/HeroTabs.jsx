import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    {
        id: 'profile',
        label: 'LOG 01 // ARQUITECTURA',
        content: (
            <>
                <p className="mb-4">
                    Optimizo sistemas digitales que han perdido su rumbo. Mi enfoque no se limita a "crear interfaces", sino a eliminar la fricción entre el diseño y la ingeniería. Resuelvo problemas estructurales mediante arquitecturas visuales escalables y sistemas de diseño que permiten a los equipos iterar sin romper el ecosistema.
                </p>
                <p>
                    Como <span className="text-cyan">Design Engineer</span>, priorizo la arquitectura de información y la psicología del usuario para reducir la carga cognitiva. Traduzco visiones complejas en código de alto rendimiento utilizando <span className="text-cyan">React</span>, <span className="text-cyan">Vite</span> y <span className="text-cyan">Framer Motion</span>, asegurando que cada píxel tenga un propósito operativo.
                </p>
            </>
        ),
    },
    {
        id: 'ai',
        label: 'LOG 02 // INTELIGENCIA',
        content: (
            <>
                <p className="mb-4">
                    En la frontera de la innovación, he especializado mi práctica en la integración estratégica de Inteligencia Artificial. Mi dominio en <span className="text-cyan">Ingeniería de Prompts</span> me permite orquestar modelos de lenguaje para optimizar flujos de trabajo, desde la ideación visual hasta la automatización de procesos lógicos.
                </p>
                <p>
                    Poseo una capacidad distintiva para el despliegue y gestión de <span className="text-cyan">LLMs locales</span>, lo que me permite trabajar con modelos de vanguardia bajo un control total de la privacidad, la latencia y la personalización, llevando la soberanía tecnológica al núcleo de cada proyecto.
                </p>
            </>
        ),
    },
];

export default function HeroTabs() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="w-full mb-12">
            {/* Tab Headers */}
            <div className="flex gap-6 mb-6 border-b border-cyan/20 pb-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`mono text-xs tracking-widest transition-colors duration-300 relative pb-2 -mb-2.5 ${activeTab === tab.id
                            ? 'text-cyan border-b-2 border-cyan'
                            : 'text-text-dim hover:text-white hover:border-b-2 hover:border-white/20'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="relative min-h-[200px] sm:min-h-[160px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-text-secondary leading-relaxed text-sm sm:text-base text-justify"
                    >
                        {tabs.find((t) => t.id === activeTab)?.content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
