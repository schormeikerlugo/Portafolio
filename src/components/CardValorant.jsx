import { motion } from 'framer-motion';

export default function CardValorant({ title, subtitle, image, tags = [], onClick, index = 0 }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={onClick}
            className="group relative h-[320px] w-full cursor-pointer overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
        >
            {/* Background Image (Darkened) */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40"
                    style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }} // Fade out at bottom
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
            </div>

            {/* Valorant-style Border Lines (Reveal on Hover) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left Corner */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Bottom Right Corner */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Vertical Line Decoration */}
                <div className="absolute top-1/2 right-4 w-[1px] h-12 bg-cyan/30 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Rotated Text */}
                <div className="absolute top-1/2 right-1 transform -translate-y-1/2 rotate-90 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-2">
                    <span className="mono text-[8px] text-cyan tracking-[0.2em]">SYSTEM</span>
                </div>
            </div>

            {/* Content Content - Bottom Aligned */}
            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                {/* Title (Big & Bold) */}
                <h3 className="font-sans text-2xl font-black italic uppercase text-white mb-2 leading-none tracking-tight group-hover:text-cyan transition-colors">
                    {title}
                </h3>

                {/* Subtitle / Description */}
                <p className="font-mono text-[10px] text-text-secondary tracking-widest uppercase mb-4 border-l-2 border-cyan/50 pl-2">
                    {subtitle}
                </p>

                {/* Tags (Hidden initially, reveal on hover? Or just there) */}
                <div className="flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono text-text-dim px-1.5 py-0.5 border border-white/10 bg-white/5 uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
