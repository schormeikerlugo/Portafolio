import useMobileDetect from '../hooks/useMobileDetect';

/* ═══════════════════════════════════════════════
   SUBTLE BACKGROUND PATTERN
   Minimalista, sin vignette oscuro.
   ═══════════════════════════════════════════════ */

export default function SubtleBackground() {
    const isMobile = useMobileDetect();

    return (
        <div className="fixed inset-0 w-full h-full bg-void overflow-hidden -z-20">
            {/* Dot Grid - Very subtle */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(0,229,255,0.8) 0.5px, transparent 0.5px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Subtle horizontal lines */}
            {!isMobile && (
                <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
                    {[200, 400, 600, 800].map((y, i) => (
                        <line
                            key={i}
                            x1="0" y1={y} x2="100%" y2={y}
                            stroke="rgba(0,229,255,0.5)"
                            strokeWidth="0.5"
                            strokeDasharray="20 40"
                        />
                    ))}
                </svg>
            )}

            {/* Noise texture */}
            <div className="noise-overlay" />
        </div>
    );
}
