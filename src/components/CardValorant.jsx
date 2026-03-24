import { motion } from 'framer-motion';
import { ExternalLink, Github, Globe, ArrowUpRight } from 'lucide-react';

const sourceIcons = {
    behance: <Globe size={14} />,
    github: <Github size={14} />,
    dribbble: <Globe size={14} />,
};

export default function CardValorant({ title, subtitle, image, tags = [], onClick, index = 0, source, link, subcategory, mission, problem, solution }) {
    // Extract status text clearly
    const statusText = subtitle.replace('ESTADO: ', '');
    const idString = `0${index + 1}`.slice(-2);
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={onClick}
            className="group relative w-full cursor-pointer border-b border-border/40 hover:bg-surface/30 transition-all duration-300 py-8 px-4 flex flex-col md:flex-row gap-6 md:gap-8 items-start"
        >
            {/* Hover Indicator Line */}
            <div className="absolute left-0 w-[2px] h-0 bg-cyan top-1/2 -translate-y-1/2 group-hover:h-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />

            {/* 1. Meta & Title (Left Column) */}
            <div className="w-full md:w-[35%] flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-3 opacity-60">
                    <span className="mono text-[10px] text-cyan uppercase tracking-[0.2em] font-bold">
                        ID: {idString}
                    </span>
                    <span className="text-text-dim mono text-[10px]">//</span>
                    <span className="mono text-[9px] text-text-secondary uppercase tracking-[0.2em]">
                        {statusText}
                    </span>
                </div>
                
                <h3 className="font-sans text-2xl sm:text-3xl font-bold text-text-primary tracking-tight uppercase flex items-center gap-3 group-hover:text-cyan transition-colors">
                    {title}
                    <ArrowUpRight size={18} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-cyan" />
                </h3>

                {subcategory && (
                    <span className="mono text-[9px] text-text-dim tracking-widest uppercase mt-1">
                        [{subcategory}]
                    </span>
                )}
            </div>

            {/* 2. Description & Tags (Middle Column) */}
            <div className="w-full md:w-[45%] flex flex-col justify-between gap-4 h-full">
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-sans line-clamp-3">
                    {solution || mission || 'Optimización de interfaz y experiencia de usuario para garantizar escalabilidad y rendimiento.'}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                    {tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="mono text-[9px] text-text-dim border border-border/50 px-2 py-1 bg-void/50 rounded-sm uppercase tracking-wider group-hover:border-cyan/30 group-hover:text-cyan transition-colors">
                            {tag}
                        </span>
                    ))}
                    {tags.length > 4 && (
                        <span className="mono text-[9px] text-text-dim px-1 py-1 uppercase tracking-wider">
                            +{tags.length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* 3. Visual Thumbnail & Actions (Right Column) */}
            <div className="hidden md:flex w-full md:w-[20%] flex-col items-end justify-between self-stretch shrink-0">
                {source && (
                    <div className="p-2 border border-border/30 bg-void/50 rounded-sm text-text-dim group-hover:text-cyan group-hover:border-cyan/30 transition-colors mb-4">
                        {sourceIcons[source] || <ExternalLink size={14} />}
                    </div>
                )}
                <div className="relative w-full aspect-[16/9] max-w-[160px] rounded-sm overflow-hidden border border-border/30 group-hover:border-cyan/50 transition-colors mt-auto">
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />
                </div>
            </div>

            {/* Mobile Image (Visible only on small screens) */}
            <div className="md:hidden w-full relative aspect-video rounded-sm overflow-hidden border border-border/30 mt-2">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
            </div>
        </motion.div>
    );
}
