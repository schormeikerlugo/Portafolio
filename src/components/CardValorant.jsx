import { motion } from 'framer-motion';

const sourceIcons = {
    behance: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.332-1.761-1.753-2.276-2.508-2.276-1.518 0-2.324.876-2.457 2.276zM9.789 17.938h-3.73A15.8 15.8 0 016.031 18H1V6h6.627c1.649 0 4.373.234 4.373 3.376 0 1.46-.8 2.306-1.683 2.726.993.377 1.985 1.284 1.985 3.099 0 3.376-3.18 2.737-2.513 2.737zM4.063 8.563v2.625h2.625c.76 0 1.574-.344 1.574-1.313 0-.968-.813-1.313-1.574-1.313H4.063zm0 5.063v2.813h2.719c.855 0 1.656-.438 1.656-1.406 0-.969-.801-1.406-1.656-1.406H4.063z" />
        </svg>
    ),
    github: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    ),
    dribbble: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm7.938 5.563A10.18 10.18 0 0122.12 12c-.313-.063-3.438-.688-6.594-.313-.063-.188-.125-.344-.188-.5-.188-.438-.375-.875-.594-1.313 3.5-1.438 5.063-3.5 5.194-3.688v-.001zm-1.313-1.188c-.125.156-1.563 2.125-4.938 3.375-1.5-2.75-3.156-5.031-3.406-5.375a10.226 10.226 0 016.156-.188 10.14 10.14 0 012.188 2.188zM9.031 2.688c.25.313 1.875 2.625 3.406 5.313-4.313 1.156-8.094 1.125-8.531 1.125a10.177 10.177 0 015.125-6.438zM1.875 12v-.313c.438.031 4.938.063 9.563-1.313.25.5.5 1.031.75 1.563-.125.031-.25.063-.375.125-4.75 1.531-7.25 5.719-7.406 5.969A10.14 10.14 0 011.875 12zm3.063 7.5c.094-.156 1.969-3.813 7.063-5.563.012-.004.023-.007.035-.011.625 1.625 1.125 3.5 1.344 4.75a10.193 10.193 0 01-8.442.824zm10.312-.313c-.188-.875-.625-2.625-1.188-4.188 2.938-.469 5.5.313 5.813.406a10.162 10.162 0 01-4.625 3.782z" />
        </svg>
    ),
};

const sourceColors = {
    behance: 'text-[#1769ff]',
    github: 'text-white',
    dribbble: 'text-[#ea4c89]',
};

export default function CardValorant({ title, subtitle, image, tags = [], onClick, index = 0, source, link, subcategory }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            onClick={onClick}
            className="group relative h-[280px] sm:h-[320px] w-full cursor-pointer overflow-hidden bg-[#0a0a0a] border border-white/5 transition-all duration-300 hover:scale-[1.02] hover:border-cyan/50 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40"
                    style={{ maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
            </div>

            {/* Top Right: Source Badge */}
            {source && (
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded ${sourceColors[source] || 'text-white'} opacity-70 group-hover:opacity-100 transition-opacity z-10`}>
                    {sourceIcons[source]}
                    <span className="mono text-[8px] tracking-wider uppercase">{source}</span>
                </div>
            )}

            {/* Top Left: Subcategory */}
            {subcategory && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-cyan/10 border border-cyan/20 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <span className="mono text-[8px] text-cyan tracking-wider uppercase">{subcategory}</span>
                </div>
            )}

            {/* Corner Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-1/2 right-4 w-[1px] h-12 bg-cyan/30 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute top-1/2 right-1 transform -translate-y-1/2 rotate-90 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-2">
                    <span className="mono text-[8px] text-cyan tracking-[0.2em]">SYSTEM</span>
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-5 sm:p-6 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="font-sans text-lg sm:text-xl font-black italic uppercase text-white mb-1.5 leading-none tracking-tight group-hover:text-cyan transition-colors">
                    {title}
                </h3>
                <p className="font-mono text-[9px] sm:text-[10px] text-text-secondary tracking-widest uppercase mb-3 border-l-2 border-cyan/50 pl-2">
                    {subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {tags.map((tag) => (
                        <span key={tag} className="text-[8px] sm:text-[9px] font-mono text-text-dim px-1.5 py-0.5 border border-white/10 bg-white/5 uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* External link indicator */}
            {link && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/30 flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-4 h-4 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
