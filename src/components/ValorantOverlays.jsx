import { motion } from 'framer-motion';

/* ══════════════════════════════════════════════════════
   VALORANT OVERLAYS — HUD Decorative Components
   Visibility: STRONG — meant to be seen, not hidden
   ══════════════════════════════════════════════════════ */

/**
 * Vertical Code Label — Rotated programming text on the edge.
 * Inspired by Valorant's side-panel vertical typography.
 */
export function SectionLabel({ text, side = 'left', className = '' }) {
    return (
        <div
            className={`
                absolute top-0 bottom-0 ${side === 'left' ? 'left-2 md:left-4 lg:left-6' : 'right-2 md:right-4 lg:right-6'}
                z-20 pointer-events-none
                hidden md:flex items-center
                ${className}
            `}
        >
            <div
                className="flex items-center gap-3"
                style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: side === 'left' ? 'rotate(180deg)' : 'none',
                }}
            >
                {/* Pulsing dot */}
                <span className="w-1.5 h-1.5 rounded-full bg-cyan shadow-[0_0_6px_rgba(0,229,255,0.6)] animate-pulse" />
                <span className="mono text-[10px] text-cyan/40 tracking-[0.5em] uppercase font-bold whitespace-nowrap">
                    {text}
                </span>
                {/* Line decoration */}
                <span className="block w-px h-16 bg-gradient-to-b from-cyan/30 to-transparent" style={{ writingMode: 'horizontal-tb' }} />
            </div>
        </div>
    );
}

/**
 * Ghost Text — Giant semi-transparent text. MORE VISIBLE this time.
 */
export function GhostText({ text, position = 'bottom-right', size = 'text-[200px] md:text-[300px]', className = '' }) {
    const posClass = {
        'bottom-right': 'bottom-0 right-0 translate-x-[10%] translate-y-[10%]',
        'bottom-left': 'bottom-0 left-0 -translate-x-[10%] translate-y-[10%]',
        'top-right': 'top-0 right-0 translate-x-[10%] -translate-y-[10%]',
        'top-left': 'top-0 left-0 -translate-x-[10%] -translate-y-[10%]',
        'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    }[position] || position;

    return (
        <div
            className={`absolute ${posClass} z-0 pointer-events-none select-none overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <span
                className={`block font-black uppercase leading-[0.75] tracking-tighter text-white/[0.04] ${size}`}
                style={{ fontFamily: 'var(--font-sans)' }}
            >
                {text}
            </span>
        </div>
    );
}

/**
 * Corner Brackets — HUD-style corner decorations.
 */
export function CornerBrackets({
    size = 12,
    color = 'border-cyan/30',
    hoverColor = 'group-hover:border-cyan/70',
    className = '',
    children
}) {
    const cornerBase = `absolute transition-all duration-500 ${color} ${hoverColor}`;
    const px = `${size}px`;

    return (
        <div className={`relative group ${className}`}>
            <span className={`${cornerBase} top-0 left-0 border-t-[1.5px] border-l-[1.5px]`} style={{ width: px, height: px }} />
            <span className={`${cornerBase} top-0 right-0 border-t-[1.5px] border-r-[1.5px]`} style={{ width: px, height: px }} />
            <span className={`${cornerBase} bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]`} style={{ width: px, height: px }} />
            <span className={`${cornerBase} bottom-0 right-0 border-b-[1.5px] border-r-[1.5px]`} style={{ width: px, height: px }} />
            {children}
        </div>
    );
}

/**
 * Crosshair Dot — Tactical dot with crossing lines. MORE visible.
 */
export function CrosshairDot({ size = 24, className = '' }) {
    const half = size / 2;
    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className={`pointer-events-none flex-shrink-0 ${className}`}
            aria-hidden="true"
        >
            <line x1="0" y1={half} x2={size} y2={half} stroke="rgba(0,229,255,0.35)" strokeWidth="0.8" />
            <line x1={half} y1="0" x2={half} y2={size} stroke="rgba(0,229,255,0.35)" strokeWidth="0.8" />
            <circle cx={half} cy={half} r="2" fill="rgba(0,229,255,0.5)" />
            <circle cx={half} cy={half} r="4" fill="none" stroke="rgba(0,229,255,0.2)" strokeWidth="0.5" />
        </svg>
    );
}

/**
 * Diagonal Line — Decorative angled line separator.
 */
export function DiagonalLine({ className = '', width = '100%', height = 40 }) {
    return (
        <div className={`relative overflow-hidden pointer-events-none ${className}`} style={{ width, height }}>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 40" aria-hidden="true">
                <line x1="0" y1="40" x2="1200" y2="0" stroke="url(#diag-grad)" strokeWidth="0.8" />
                <defs>
                    <linearGradient id="diag-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(0,229,255,0)" />
                        <stop offset="50%" stopColor="rgba(0,229,255,0.25)" />
                        <stop offset="100%" stopColor="rgba(0,229,255,0)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

/**
 * Chevron Marker — Animated directional indicator.
 */
export function ChevronMarker({ direction = 'down', className = '' }) {
    const rotation = { down: 0, up: 180, left: 90, right: -90 }[direction];

    return (
        <motion.div
            className={`flex flex-col items-center gap-1 pointer-events-none ${className}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            aria-hidden="true"
        >
            {[0, 1, 2].map((i) => (
                <motion.svg
                    key={i}
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    style={{ transform: `rotate(${rotation}deg)` }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' }}
                >
                    <path d="M1 1L8 8L15 1" stroke="rgba(0,229,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </motion.svg>
            ))}
        </motion.div>
    );
}

/**
 * Scanline Bar — Thin horizontal scanning bar with glow.
 */
export function ScanlineBar({ className = '' }) {
    return (
        <div className={`relative w-full h-px overflow-hidden pointer-events-none ${className}`}>
            <motion.div
                className="absolute top-0 left-0 w-1/3 h-full"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.5) 40%, rgba(0,229,255,0.8) 50%, rgba(0,229,255,0.5) 60%, transparent 100%)',
                    boxShadow: '0 0 8px rgba(0,229,255,0.3)',
                }}
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.08), transparent)' }} />
        </div>
    );
}

/**
 * FloatingGlyphs — Scattered code glyphs/symbols that float in the background.
 * These are abstract shapes: brackets, slashes, dots, angles.
 */
export function FloatingGlyphs({ className = '' }) {
    const glyphs = ['</', '/>', '{', '}', '()', '=>', '[]', '&&', '||', '::' , '/**', '*/', '!=', '==='];

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`} aria-hidden="true">
            {glyphs.map((glyph, i) => (
                <motion.span
                    key={i}
                    className="absolute mono text-cyan/[0.08] font-bold select-none"
                    style={{
                        fontSize: `${16 + (i % 5) * 8}px`,
                        left: `${5 + (i * 7.2) % 90}%`,
                        top: `${8 + (i * 13.7) % 85}%`,
                    }}
                    animate={{
                        opacity: [0.04, 0.15, 0.04],
                        y: [0, -10, 0],
                    }}
                    transition={{
                        duration: 4 + (i % 3) * 2,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: 'easeInOut',
                    }}
                >
                    {glyph}
                </motion.span>
            ))}
        </div>
    );
}
