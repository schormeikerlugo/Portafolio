import { motion } from 'framer-motion';

export default function Card({ title, subtitle, image, tags = [], onClick, index = 0 }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
            onClick={onClick}
            className="group panel rounded-lg overflow-hidden cursor-pointer glow-hover"
        >
            {/* Image with technical overlay */}
            <div className="relative aspect-[16/9] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Status indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                    <span className="mono text-[10px] text-cyan/70">ACTIVO</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <p className="mono text-[10px] text-text-secondary tracking-widest">{subtitle}</p>
                <h3 className="text-sm font-semibold text-text-primary tracking-wide group-hover:text-cyan transition-colors duration-200">
                    {title}
                </h3>
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="mono text-[10px] text-text-dim px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] transition-colors duration-300 group-hover:text-cyan group-hover:border-cyan/40"
                            >
                                [{tag}]
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
