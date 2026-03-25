import { motion } from 'framer-motion';

export default function GlassContainerValorant({ children, className = '', active = false, ...props }) {
    return (
        <motion.div
            className={`group relative overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 transition-all duration-500 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] ${active ? 'border-cyan/40 shadow-[0_0_30px_rgba(0,229,255,0.1)]' : ''} ${className}`}
            {...props}
        >
            {/* Background Gradient & Noise */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-cyan/[0.02] pointer-events-none" />
            <div className="noise-overlay opacity-[0.2] pointer-events-none" />

            {/* HUD Scanline */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan/5 -translate-y-full group-hover:animate-scanline pointer-events-none" />

            {/* Valorant-style Border Lines (Reveal on Hover) */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top Left Corner */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? 'opacity-100' : ''}`} />
                {/* Bottom Right Corner */}
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? 'opacity-100' : ''}`} />

                {/* Vertical Line Decoration */}
                <div className={`absolute top-1/2 right-0 w-[1px] h-8 bg-cyan/30 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? 'opacity-100' : ''}`} />
                
                {/* HUD Corner Text */}
                <div className={`absolute bottom-1 right-1 font-mono text-[6px] text-white/10 select-none uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity ${active ? 'opacity-100' : ''}`}>
                    PRTC_01//SEC
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}
