import { motion } from 'framer-motion';
import useMobileDetect from '../hooks/useMobileDetect';

/* ══════════════════════════════════════════════════════
   VALORANT PATTERNS — Abstract Animated Backgrounds
   V4: MOBILE-OPTIMIZED — all heavy SVG patterns disabled on mobile
   ══════════════════════════════════════════════════════ */

/**
 * AbstractShapes — Large geometric outlines that pulse and glow.
 * DISABLED on mobile to save GPU (SVG blur filters are iOS killers).
 */
export function AbstractShapes({ variant = 'default', className = '' }) {
    const isMobile = useMobileDetect();
    if (isMobile) return null;

    const isSideOnly = variant === 'side-only' || variant === 'portfolio';

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`} aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="glowStrong">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* ── Large triangle — top right ── */}
                <motion.polygon
                    points={
                        isSideOnly ? '1000,40 1150,280 850,280' :
                            variant === 'hero' ? '850,40 1050,280 650,280' :
                                '750,30 920,220 580,220'
                    }
                    fill="rgba(0,229,255,0.02)"
                    stroke="rgba(0,229,255,0.25)"
                    strokeWidth="1"
                    filter="url(#glow)"
                    animate={{ opacity: [0.15, 0.45, 0.15], strokeWidth: [0.8, 1.5, 0.8] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* ── Diamond — left ── */}
                <motion.polygon
                    points={
                        isSideOnly ? '30,350 120,450 30,550 -60,450' :
                            variant === 'hero' ? '60,350 150,450 60,550 -30,450' :
                                '80,280 170,370 80,460 -10,370'
                    }
                    fill="rgba(0,229,255,0.015)"
                    stroke="rgba(0,229,255,0.2)"
                    strokeWidth="0.8"
                    filter="url(#glow)"
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 1.5, ease: 'easeInOut' }}
                />

                {/* ── Small triangle — center bottom (Only if not side-only) ── */}
                {!isSideOnly && (
                    <motion.polygon
                        points="520,480 570,550 470,550"
                        fill="none"
                        stroke="rgba(0,229,255,0.3)"
                        strokeWidth="1"
                        filter="url(#glow)"
                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 3, ease: 'easeInOut' }}
                    />
                )}

                {/* ── Rotated square — right side ── */}
                <motion.polygon
                    points={
                        isSideOnly ? '1100,380 1160,440 1100,500 1040,440' :
                            variant === 'hero' ? '1050,380 1110,440 1050,500 990,440' :
                                '950,350 1010,410 950,470 890,410'
                    }
                    fill="rgba(0,229,255,0.015)"
                    stroke="rgba(0,229,255,0.2)"
                    strokeWidth="0.8"
                    filter="url(#glow)"
                    animate={{ opacity: [0.08, 0.35, 0.08] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 0.8, ease: 'easeInOut' }}
                />

                {/* ── Dashed angled lines ── */}
                <motion.line
                    x1={isSideOnly ? "10" : "50"} y1="120" x2={isSideOnly ? "200" : "400"} y2="60"
                    stroke="rgba(0,229,255,0.2)"
                    strokeWidth="0.8"
                    strokeDasharray="8 12"
                    animate={{ opacity: [0.1, 0.35, 0.1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.line
                    x1={isSideOnly ? "1000" : "700"} y1="520" x2={isSideOnly ? "1180" : "1150"} y2="420"
                    stroke="rgba(0,229,255,0.15)"
                    strokeWidth="0.6"
                    strokeDasharray="6 10"
                    animate={{ opacity: [0.08, 0.3, 0.08] }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
                />

                {/* ── Pulsing circles (target rings) ── */}
                {variant === 'hero' && (
                    <>
                        <motion.circle
                            cx="200" cy="180" r="50"
                            fill="none" stroke="rgba(0,229,255,0.15)"
                            strokeWidth="0.5" strokeDasharray="5 8"
                            animate={{ opacity: [0.05, 0.25, 0.05], r: [48, 55, 48] }}
                            transition={{ duration: 6, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
                        />
                        <motion.circle
                            cx="1000" cy="480" r="35"
                            fill="none" stroke="rgba(0,229,255,0.12)"
                            strokeWidth="0.5" strokeDasharray="4 6"
                            animate={{ opacity: [0.05, 0.2, 0.05], r: [33, 40, 33] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 3, ease: 'easeInOut' }}
                        />
                    </>
                )}

                {/* ── Bright pulsing dots at intersections ── */}
                {[
                    { cx: isSideOnly ? 1000 : 850, cy: 40, delay: 0 },
                    { cx: isSideOnly ? 30 : 60, cy: 350, delay: 1 },
                    ...(!isSideOnly ? [{ cx: 520, cy: 480, delay: 2 }] : []),
                    { cx: isSideOnly ? 1100 : 1050, cy: 380, delay: 0.5 },
                    { cx: isSideOnly ? 200 : 400, cy: 60, delay: 3 },
                ].map((dot, i) => (
                    <motion.circle
                        key={i}
                        cx={dot.cx} cy={dot.cy} r="3"
                        fill="rgba(0,229,255,0.7)"
                        filter="url(#glowStrong)"
                        animate={{ opacity: [0.2, 0.9, 0.2], r: [2, 4, 2] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
                    />
                ))}
            </svg>
        </div>
    );
}

/**
 * DiagonalHatch — DISABLED on mobile.
 */
export function DiagonalHatch({ opacity = 0.08, spacing = 50, className = '' }) {
    const isMobile = useMobileDetect();
    if (isMobile) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`} aria-hidden="true">
            <div
                className="absolute inset-0"
                style={{
                    opacity,
                    backgroundImage: `
                        repeating-linear-gradient(45deg, transparent, transparent ${spacing - 1}px, rgba(0,229,255,0.6) ${spacing - 1}px, rgba(0,229,255,0.6) ${spacing}px),
                        repeating-linear-gradient(-45deg, transparent, transparent ${spacing - 1}px, rgba(0,229,255,0.35) ${spacing - 1}px, rgba(0,229,255,0.35) ${spacing}px)
                    `,
                }}
            />
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <filter id="nodeGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                {[...Array(10)].map((_, i) => (
                    <motion.circle
                        key={i}
                        cx={`${8 + i * 9.5}%`}
                        cy={`${10 + (i * 19) % 80}%`}
                        r="3"
                        fill="rgba(0,229,255,0.6)"
                        filter="url(#nodeGlow)"
                        animate={{ opacity: [0.15, 0.8, 0.15], r: [2, 4.5, 2] }}
                        transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#000000_95%)]" />
        </div>
    );
}

/**
 * CircuitLines — DISABLED on mobile.
 */
export function CircuitLines({ opacity = 0.12, className = '' }) {
    const isMobile = useMobileDetect();
    if (isMobile) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`} aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" style={{ opacity }} preserveAspectRatio="none" viewBox="0 0 800 600">
                <defs>
                    <filter id="circuitGlow">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {[100, 220, 370, 500].map((y, i) => (
                    <g key={`h-${i}`}>
                        <motion.line
                            x1="0" y1={y} x2="800" y2={y}
                            stroke="rgba(0,229,255,0.5)"
                            strokeWidth="0.5"
                            strokeDasharray="15 30"
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: -150 }}
                            transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'linear' }}
                        />
                        {[100 + i * 90, 350 + i * 60, 600 - i * 50].map((x, j) => (
                            <motion.circle
                                key={`n-${i}-${j}`}
                                cx={x} cy={y} r="4"
                                fill="rgba(0,229,255,0.8)"
                                filter="url(#circuitGlow)"
                                animate={{ opacity: [0.3, 1, 0.3], r: [3, 6, 3] }}
                                transition={{ duration: 2 + j * 0.5, repeat: Infinity, delay: j * 0.6, ease: 'easeInOut' }}
                            />
                        ))}
                    </g>
                ))}

                {[180, 420, 650].map((x, i) => (
                    <motion.line
                        key={`v-${i}`}
                        x1={x} y1="0" x2={x} y2="600"
                        stroke="rgba(0,229,255,0.35)"
                        strokeWidth="0.5"
                        strokeDasharray="8 40"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -120 }}
                        transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#000000_95%)]" />
        </div>
    );
}

/**
 * RadialTarget — DISABLED on mobile.
 */
export function RadialTarget({ size = 500, className = '' }) {
    const isMobile = useMobileDetect();
    if (isMobile) return null;

    const center = size / 2;

    return (
        <div className={`absolute pointer-events-none z-[1] ${className}`} aria-hidden="true">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <filter id="targetGlow">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                {[0.15, 0.3, 0.5, 0.7, 0.9].map((r, i) => (
                    <motion.circle
                        key={i}
                        cx={center} cy={center} r={center * r}
                        fill="none"
                        stroke="rgba(0,229,255,0.2)"
                        strokeWidth={i === 2 ? '1' : '0.5'}
                        strokeDasharray={i % 2 === 0 ? 'none' : '6 10'}
                        animate={{ opacity: [0.15, 0.5, 0.15] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                    />
                ))}

                <line x1="0" y1={center} x2={size} y2={center} stroke="rgba(0,229,255,0.12)" strokeWidth="0.5" />
                <line x1={center} y1="0" x2={center} y2={size} stroke="rgba(0,229,255,0.12)" strokeWidth="0.5" />

                <motion.circle
                    cx={center} cy={center} r="5"
                    fill="rgba(0,229,255,0.8)"
                    filter="url(#targetGlow)"
                    animate={{ r: [4, 7, 4], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
            </svg>
        </div>
    );
}

/**
 * TriangleField — DISABLED on mobile.
 */
export function TriangleField({ className = '' }) {
    const isMobile = useMobileDetect();
    if (isMobile) return null;

    const triangles = [
        { points: '100,60 145,140 55,140', delay: 0 },
        { points: '320,180 370,260 270,260', delay: 1.2 },
        { points: '720,80 770,165 670,165', delay: 2.5 },
        { points: '500,380 545,455 455,455', delay: 0.6 },
        { points: '880,320 930,400 830,400', delay: 1.8 },
        { points: '180,470 220,530 140,530', delay: 3.2 },
        { points: '620,40 650,85 590,85', delay: 2 },
        { points: '950,480 985,530 915,530', delay: 0.9 },
    ];

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`} aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1100 600" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <filter id="triGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                {triangles.map((tri, i) => (
                    <motion.polygon
                        key={i}
                        points={tri.points}
                        fill="rgba(0,229,255,0.02)"
                        stroke="rgba(0,229,255,0.3)"
                        strokeWidth="1"
                        filter="url(#triGlow)"
                        animate={{ opacity: [0.08, 0.5, 0.08] }}
                        transition={{ duration: 3.5 + (i % 3), repeat: Infinity, delay: tri.delay, ease: 'easeInOut' }}
                    />
                ))}
                {triangles.slice(0, 5).map((tri, i) => {
                    const pts = tri.points.split(' ')[0].split(',');
                    return (
                        <motion.circle
                            key={`dot-${i}`}
                            cx={pts[0]} cy={pts[1]} r="3"
                            fill="rgba(0,229,255,0.7)"
                            filter="url(#triGlow)"
                            animate={{ opacity: [0.2, 0.9, 0.2], r: [2, 4, 2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: tri.delay + 0.5, ease: 'easeInOut' }}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

/**
 * HexGrid — DISABLED on mobile.
 */
export function HexGrid({ className = '' }) {
    const isMobile = useMobileDetect();
    if (isMobile) return null;

    return (
        <div className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`} aria-hidden="true">
            <div
                className="absolute inset-0"
                style={{
                    opacity: 0.08,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,2 55,15 55,37 30,50 5,37 5,15' fill='none' stroke='%2300e5ff' stroke-width='0.6'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 52px',
                }}
            />
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <filter id="hexGlow">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
                {[
                    { cx: '15%', cy: '25%', delay: 0 },
                    { cx: '55%', cy: '55%', delay: 1.2 },
                    { cx: '80%', cy: '18%', delay: 2.5 },
                    { cx: '35%', cy: '75%', delay: 0.8 },
                    { cx: '70%', cy: '40%', delay: 3 },
                    { cx: '25%', cy: '50%', delay: 1.8 },
                    { cx: '90%', cy: '70%', delay: 0.4 },
                ].map((node, i) => (
                    <motion.circle
                        key={i}
                        cx={node.cx} cy={node.cy} r="4"
                        fill="rgba(0,229,255,0.7)"
                        filter="url(#hexGlow)"
                        animate={{ opacity: [0.1, 0.85, 0.1], r: [3, 6, 3] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: node.delay, ease: 'easeInOut' }}
                    />
                ))}
            </svg>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#000000_98%)]" />
        </div>
    );
}
