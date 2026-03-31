import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

/* ═══════════════════════════════════════════════
   BRUTALIST SCI-FI LOADING SCREEN
   GSAP Timeline-driven cinematic loader
   
   WHY GSAP TIMELINE: Control preciso de secuencia
   de animaciones con callbacks y labels para
   sincronización perfecta de efectos brutales.
   ═══════════════════════════════════════════════ */

const BOOT_MSGS = [
    'INITIALIZING QUANTUM CORE...',
    'LOADING VISUAL MATRIX...',
    'VERIFYING OPERATOR SIGNATURE...',
    'CALIBRATING NEURAL INTERFACE...',
    'ESTABLISHING SECURE CHANNEL...',
    'OPERATOR VERIFIED — ACCESS GRANTED',
];

/* ── Brutalist Crosshair Sigil ── */
const BrutalistSigil = ({ containerRef }) => {
    const sigilRef = useRef(null);

    useGSAP(() => {
        if (!sigilRef.current) return;
        const circles = sigilRef.current.querySelectorAll('.sigil-circle');
        const lines = sigilRef.current.querySelectorAll('.sigil-line');
        const dots = sigilRef.current.querySelectorAll('.sigil-dot');

        // Brutalist assembly: circles scale in with elastic ease
        gsap.fromTo(circles,
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'elastic.out(1, 0.5)',
                delay: 0.3
            }
        );

        // Lines draw in with brutal snap
        gsap.fromTo(lines,
            { strokeDashoffset: 100, opacity: 0 },
            {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power4.out',
                delay: 0.8
            }
        );

        // Center dot with violent pulse
        gsap.fromTo(dots,
            { scale: 0 },
            {
                scale: 1,
                duration: 0.4,
                ease: 'back.out(3)',
                delay: 1.2
            }
        );

    }, { scope: sigilRef });

    return (
        <svg
            ref={sigilRef}
            width="160"
            height="160"
            viewBox="0 0 160 160"
            className="absolute"
            aria-hidden="true"
        >
            {/* Outer dashed ring — slow spin */}
            <circle
                className="sigil-circle"
                cx="80" cy="80" r="70"
                fill="none"
                stroke="rgba(0,229,255,0.15)"
                strokeWidth="0.6"
                strokeDasharray="10 8"
                style={{ transformOrigin: '80px 80px', animation: 'spin 40s linear infinite' }}
            />
            {/* Mid ring */}
            <circle
                className="sigil-circle"
                cx="80" cy="80" r="50"
                fill="none"
                stroke="rgba(0,229,255,0.3)"
                strokeWidth="0.8"
            />
            {/* Inner ring */}
            <circle
                className="sigil-circle"
                cx="80" cy="80" r="26"
                fill="none"
                stroke="rgba(0,229,255,0.55)"
                strokeWidth="1"
            />
            {/* Cross lines */}
            {[
                { x1: 80, y1: 6, x2: 80, y2: 46 },
                { x1: 80, y1: 114, x2: 80, y2: 154 },
                { x1: 6, y1: 80, x2: 46, y2: 80 },
                { x1: 114, y1: 80, x2: 154, y2: 80 },
            ].map((line, i) => (
                <line
                    key={i}
                    className="sigil-line"
                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                    stroke="rgba(0,229,255,0.8)"
                    strokeWidth="1"
                    strokeDasharray="100"
                    strokeDashoffset="100"
                />
            ))}
            {/* Arrow tick marks on cross ends */}
            {[
                '80,14 74,24 86,24',
                '80,146 74,136 86,136',
                '14,80 24,74 24,86',
                '146,80 136,74 136,86',
            ].map((pts, i) => (
                <polygon
                    key={i}
                    className="sigil-dot"
                    points={pts}
                    fill="rgba(0,229,255,0.6)"
                />
            ))}
            {/* Diagonal accent hash marks */}
            {[45, 135, 225, 315].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 80 + Math.cos(rad) * 38;
                const y1 = 80 + Math.sin(rad) * 38;
                const x2 = 80 + Math.cos(rad) * 50;
                const y2 = 80 + Math.sin(rad) * 50;
                return (
                    <line
                        key={i}
                        className="sigil-line"
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="rgba(0,229,255,0.35)"
                        strokeWidth="1"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                    />
                );
            })}
            {/* Pulsing center dot */}
            <circle
                className="sigil-dot"
                cx="80" cy="80" r="5"
                fill="rgba(0,229,255,0.95)"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,1))' }}
            />
        </svg>
    );
};

/* ── Brutalist Segmented Progress Bar ── */
const SegmentedBar = ({ progress, segments = 24 }) => {
    const barRef = useRef(null);
    const filled = Math.floor((progress / 100) * segments);

    useGSAP(() => {
        if (!barRef.current) return;
        const bars = barRef.current.querySelectorAll('.bar-segment');
        // Brutal fill animation
        bars.forEach((bar, i) => {
            if (i < filled) {
                gsap.to(bar, {
                    scaleX: 1,
                    duration: 0.08,
                    ease: 'power2.out',
                    overwrite: true
                });
            } else {
                gsap.to(bar, {
                    scaleX: 0,
                    duration: 0.05,
                    ease: 'power2.in',
                    overwrite: true
                });
            }
        });
    }, [filled]);

    return (
        <div ref={barRef} className="flex items-center gap-[2px] w-full">
            {Array.from({ length: segments }).map((_, i) => (
                <div
                    key={i}
                    className="bar-segment flex-1 h-[5px] relative overflow-hidden bg-cyan"
                    style={{
                        transformOrigin: 'left',
                        transform: 'scaleX(0)',
                        boxShadow: i < filled ? '0 0 8px rgba(0,229,255,0.5)' : 'none'
                    }}
                />
            ))}
        </div>
    );
};

/* ── Scanline Effect ── */
const ScanlineEffect = ({ containerRef }) => {
    const scanRef = useRef(null);

    useGSAP(() => {
        if (!scanRef.current) return;
        const scanline = scanRef.current;

        // Continuous scanline sweep
        gsap.fromTo(scanline,
            { y: '-100%' },
            {
                y: '100vh',
                duration: 3,
                repeat: -1,
                ease: 'none',
                delay: 0.5
            }
        );
    }, { scope: scanRef });

    return (
        <div ref={scanRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-full h-[2px] bg-cyan/30 shadow-[0_0_10px_rgba(0,229,255,0.8)]" />
        </div>
    );
};

/* ── Data Corruption Effect ── */
const DataCorruption = ({ active }) => {
    const corruptRef = useRef(null);

    useGSAP(() => {
        if (!corruptRef.current || !active) return;
        const blocks = corruptRef.current.querySelectorAll('.corrupt-block');

        // Brutal glitch effect
        gsap.fromTo(blocks,
            { opacity: 0, x: 0 },
            {
                opacity: 1,
                x: () => gsap.utils.random(-20, 20),
                duration: 0.1,
                stagger: 0.02,
                repeat: 3,
                yoyo: true,
                ease: 'steps(5)',
                onComplete: () => {
                    gsap.to(blocks, { opacity: 0, duration: 0.1 });
                }
            }
        );
    }, [active]);

    return (
        <div ref={corruptRef} className="absolute inset-0 pointer-events-none z-20">
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="corrupt-block absolute w-full bg-cyan/10"
                    style={{
                        height: `${gsap.utils.random(5, 15)}px`,
                        top: `${i * 12}%`,
                        opacity: 0
                    }}
                />
            ))}
        </div>
    );
};

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [granted, setGranted] = useState(false);
    const [corrupting, setCorrupting] = useState(false);
    const containerRef = useRef(null);
    const tl = useRef(null);

    // Main GSAP Timeline
    useGSAP(() => {
        // WHY GSAP TIMELINE: Permite secuenciar animaciones
        // con labels y callbacks para sincronización perfecta
        tl.current = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // 0.0s: Container fades in
        tl.current.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        );

        // 0.3s: HUD corners assemble with brutal snap
        tl.current.fromTo('.hud-corner',
            { scale: 0, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: 'back.out(2)'
            },
            0.3
        );

        // 0.8s: Top HUD bar slides in
        tl.current.fromTo('.hud-bar',
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
            0.8
        );

        // 1.2s: Sigil assembles (handled by its own useGSAP)

        // 1.8s: Operator ID card slides in
        tl.current.fromTo('.operator-card',
            { x: -30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            1.8
        );

        // 2.2s: Status messages begin cycling
        tl.current.call(() => {
            const msgTimer = setInterval(() => {
                setMsgIdx(i => {
                    if (i >= BOOT_MSGS.length - 1) {
                        clearInterval(msgTimer);
                        return i;
                    }
                    return i + 1;
                });
            }, 400);
        }, null, 2.2);

        // 2.5s: Progress bar appears
        tl.current.fromTo('.progress-container',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4 },
            2.5
        );

        // 3.0s: Bottom coordinates appear
        tl.current.fromTo('.coordinates',
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            3.0
        );

        // Start progress animation
        const ticker = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(ticker);
                    return 100;
                }
                const jump = Math.random() > 0.85 ? 10 : Math.random() > 0.5 ? 3 : 1;
                return Math.min(prev + jump, 100);
            });
        }, 55);

        return () => {
            clearInterval(ticker);
            if (tl.current) tl.current.kill();
        };
    }, { scope: containerRef });

    // Handle progress completion
    useEffect(() => {
        if (progress >= 100) {
            // Trigger corruption effect
            setCorrupting(true);

            // WHY GSAP TIMELINE: Secuencia de salida brutal
            const exitTl = gsap.timeline({
                onComplete: () => {
                    setGranted(true);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 900);
                }
            });

            exitTl
                .to('.loading-content', {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'power2.in'
                })
                .to('.loading-content', {
                    scale: 1,
                    duration: 0.1,
                    ease: 'power2.out'
                })
                .to(containerRef.current, {
                    opacity: 0,
                    scale: 1.03,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1]
                });

            return () => exitTl.kill();
        }
    }, [progress, onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden select-none"
        >
            {/* Brutalist Background Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                    {/* Corner triangles — brutalist architecture */}
                    {[
                        '0,0 260,0 0,260',
                        '1440,0 1180,0 1440,260',
                        '0,900 0,640 260,900',
                        '1440,900 1180,900 1440,640',
                    ].map((pts, i) => (
                        <polygon
                            key={i}
                            points={pts}
                            fill="rgba(0,229,255,0.015)"
                            stroke="rgba(0,229,255,0.1)"
                            strokeWidth="0.7"
                        />
                    ))}
                    {/* Horizontal grid lines */}
                    {Array.from({ length: 20 }).map((_, i) => (
                        <line
                            key={i}
                            x1="0" y1={i * 45} x2="1440" y2={i * 45}
                            stroke="rgba(0,229,255,0.02)"
                            strokeWidth="1"
                            strokeDasharray="24 36"
                        />
                    ))}
                    {/* Vertical grid lines */}
                    {Array.from({ length: 32 }).map((_, i) => (
                        <line
                            key={i}
                            x1={i * 45} y1="0" x2={i * 45} y2="900"
                            stroke="rgba(0,229,255,0.02)"
                            strokeWidth="1"
                            strokeDasharray="24 36"
                        />
                    ))}
                </svg>
                {/* Fine scanlines */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,229,255,0.6) 0px, rgba(0,229,255,0.6) 1px, transparent 1px, transparent 4px)'
                    }}
                />
            </div>

            {/* Scanline Effect */}
            <ScanlineEffect containerRef={containerRef} />

            {/* Data Corruption Effect */}
            <DataCorruption active={corrupting} />

            {/* HUD Corner Brackets */}
            {[
                'top-5 left-5 border-t border-l',
                'top-5 right-5 border-t border-r',
                'bottom-5 left-5 border-b border-l',
                'bottom-5 right-5 border-b border-r',
            ].map((cls, i) => (
                <div
                    key={i}
                    className={`hud-corner absolute w-10 h-10 border-cyan/40 ${cls}`}
                />
            ))}

            {/* Top center HUD bar */}
            <div className="hud-bar absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.9)]" />
                <span className="text-[9px] tracking-[0.5em] text-cyan/50 uppercase font-bold">
                    SL_PORTFOLIO // v4.0 // SYS_BOOT
                </span>
                <div className="w-1.5 h-1.5 bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.9)]" />
            </div>

            {/* Loading Content */}
            <div className="loading-content relative">
                {/* Central Sigil */}
                <div className="relative flex items-center justify-center w-44 h-44 mb-10">
                    <BrutalistSigil containerRef={containerRef} />
                    {/* ACCESS GRANTED overlay */}
                    <AnimatePresence>
                        {granted && (
                            <div className="absolute inset-0 flex items-center justify-center z-10 bg-cyan/10">
                                <span className="text-cyan text-[10px] tracking-[0.5em] font-bold uppercase whitespace-nowrap">
                                    ACCESS GRANTED
                                </span>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main HUD Block */}
                <div className="relative w-full max-w-sm px-6 space-y-5">
                    {/* Operator identity card */}
                    <div className="operator-card border-l-2 border-cyan/40 pl-4 space-y-1">
                        <p className="text-[8px] text-cyan/40 tracking-[0.55em] uppercase">OPERATOR_ID</p>
                        <p className="text-sm text-white font-bold tracking-[0.15em] uppercase">
                            Schormeiker Lugo
                        </p>
                        <p className="text-[9px] text-cyan/60 tracking-[0.3em] uppercase">
                            Visual Systems Architect
                        </p>
                    </div>

                    {/* Status message */}
                    <div className="h-4 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <p
                                key={msgIdx}
                                className="text-[9px] text-cyan/70 tracking-[0.2em] uppercase"
                            >
                                {BOOT_MSGS[msgIdx]}
                            </p>
                        </AnimatePresence>
                    </div>

                    {/* Progress */}
                    <div className="progress-container space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[8px] text-white/20 tracking-[0.4em] uppercase">System Loading</span>
                            <span className="text-[12px] text-cyan font-bold tabular-nums">
                                {Math.round(progress)}%
                            </span>
                        </div>
                        <SegmentedBar progress={progress} segments={24} />
                    </div>
                </div>
            </div>

            {/* Bottom coordinate readout */}
            <div className="coordinates absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 text-[8px] text-white/15 tracking-[0.4em] uppercase whitespace-nowrap">
                <span>LAT: 10.6966° N</span>
                <div className="w-1 h-1 bg-white/15 rounded-full" />
                <span>LON: 71.5834° W</span>
                <div className="w-1 h-1 bg-white/15 rounded-full" />
                <span>NODE: CCS-04</span>
            </div>

            {/* Full-screen cyan flash on granted */}
            <AnimatePresence>
                {granted && (
                    <div className="absolute inset-0 bg-cyan/[0.07] pointer-events-none z-20" />
                )}
            </AnimatePresence>

            {/* Spin keyframe injected globally */}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
