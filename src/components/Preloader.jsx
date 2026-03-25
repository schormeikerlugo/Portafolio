import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════
   VALORANT-STYLE CINEMATIC PRELOADER
   Steps:
   0 → BG + HUD corners draw in
   1 → Central sigil assembles
   2 → Vertical ID text types in
   3 → Status messages cycle, progress bar fills
   4 → "ACCESS GRANTED" flash → exit
   ═══════════════════════════════════════════════ */

// Boot sequence messages
const BOOT_MSGS = [
    'BOOTING CORE_KERNEL............',
    'MOUNTING VISUAL_SYSTEMS.......',
    'VERIFYING OPERATOR IDENTITY...',
    'CALIBRATING INTERFACE_HUD.....',
    'ESTABLISHING SECURE_LINK......',
    'OPERATOR AUTHENTICATED........',
];

// Center crosshair/sigil SVG assembled with stagger
const ValorantSigil = ({ visible }) => (
    <motion.svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="absolute"
        aria-hidden="true"
    >
        {/* Outer dashed ring */}
        <motion.circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="rgba(0,229,255,0.2)"
            strokeWidth="0.5"
            strokeDasharray="8 6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={visible ? { opacity: 1, scale: 1, rotate: [0, 360] } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], rotate: { duration: 30, repeat: Infinity, ease: 'linear' } }}
        />
        {/* Mid ring */}
        <motion.circle
            cx="60" cy="60" r="38"
            fill="none"
            stroke="rgba(0,229,255,0.4)"
            strokeWidth="0.8"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Inner ring */}
        <motion.circle
            cx="60" cy="60" r="18"
            fill="none"
            stroke="rgba(0,229,255,0.6)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Cross lines */}
        {[
            { x1: 60, y1: 8, x2: 60, y2: 35 },      // top
            { x1: 60, y1: 85, x2: 60, y2: 112 },      // bottom
            { x1: 8, y1: 60, x2: 35, y2: 60 },         // left
            { x1: 85, y1: 60, x2: 112, y2: 60 },       // right
        ].map((line, i) => (
            <motion.line
                key={i}
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke="rgba(0,229,255,0.7)"
                strokeWidth="1"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={visible ? { opacity: 1, pathLength: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
            />
        ))}
        {/* Corner triangle ticks */}
        {[
            '60,22 55,30 65,30',
            '60,98 55,90 65,90',
            '22,60 30,55 30,65',
            '98,60 90,55 90,65',
        ].map((pts, i) => (
            <motion.polygon
                key={i}
                points={pts}
                fill="rgba(0,229,255,0.5)"
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: [0, 1, 0.6] } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.06 }}
            />
        ))}
        {/* Center dot — pulsing */}
        <motion.circle
            cx="60" cy="60" r="4"
            fill="rgba(0,229,255,0.9)"
            initial={{ opacity: 0, scale: 0 }}
            animate={visible ? { opacity: [0, 1, 0.7, 1], scale: [0, 1.5, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,229,255,1))' }}
        />
    </motion.svg>
);

// Segmented progress bar (Valorant-style notched bar)
const SegmentedBar = ({ progress, segments = 20 }) => {
    const filled = Math.floor((progress / 100) * segments);
    return (
        <div className="flex items-center gap-[2px] w-full">
            {Array.from({ length: segments }).map((_, i) => (
                <motion.div
                    key={i}
                    className="flex-1 h-[6px] relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                >
                    <div className="absolute inset-0 bg-white/5" />
                    <motion.div
                        className="absolute inset-0 bg-cyan"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: i < filled ? 1 : 0 }}
                        style={{
                            transformOrigin: 'left',
                            boxShadow: i < filled ? '0 0 8px rgba(0,229,255,0.6)' : 'none',
                        }}
                        transition={{ duration: 0.1, delay: i < filled ? i * 0.015 : 0 }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

// Background abstract SVG layer (Valorant triangles)
const LoaderBG = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            <defs>
                <filter id="loader-glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>
            {/* Large corner triangles */}
            <motion.polygon
                points="0,0 220,0 0,220"
                fill="rgba(0,229,255,0.02)"
                stroke="rgba(0,229,255,0.12)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.polygon
                points="1200,0 980,0 1200,220"
                fill="rgba(0,229,255,0.02)"
                stroke="rgba(0,229,255,0.12)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.polygon
                points="0,800 0,580 220,800"
                fill="rgba(0,229,255,0.02)"
                stroke="rgba(0,229,255,0.12)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            />
            <motion.polygon
                points="1200,800 980,800 1200,580"
                fill="rgba(0,229,255,0.02)"
                stroke="rgba(0,229,255,0.12)"
                strokeWidth="0.8"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            />
            {/* Diagonal accent line */}
            <motion.line
                x1="0" y1="400" x2="1200" y2="400"
                stroke="rgba(0,229,255,0.04)" strokeWidth="1" strokeDasharray="20 30"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.6 }}
            />
        </svg>
        {/* Horizontal scanlines (very subtle) */}
        <div className="absolute inset-0 opacity-[0.025]"
            style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,229,255,0.3) 0px, rgba(0,229,255,0.3) 1px, transparent 1px, transparent 4px)'
            }}
        />
    </div>
);

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [granted, setGranted] = useState(false);
    const [sigilVisible, setSigilVisible] = useState(false);

    useEffect(() => {
        // Sigil assembles a bit after mount
        const sigilTimer = setTimeout(() => setSigilVisible(true), 300);

        // Progress ticker
        const ticker = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(ticker);
                    return 100;
                }
                const jump = Math.random() > 0.85 ? 12 : Math.random() > 0.5 ? 4 : 1;
                return Math.min(prev + jump, 100);
            });
        }, 60);

        // Message cycler
        const msgTimer = setInterval(() => {
            setMsgIdx(i => Math.min(i + 1, BOOT_MSGS.length - 1));
        }, 420);

        return () => {
            clearTimeout(sigilTimer);
            clearInterval(ticker);
            clearInterval(msgTimer);
        };
    }, []);

    // When progress hits 100 → flash "ACCESS GRANTED" → exit
    useEffect(() => {
        if (progress >= 100) {
            const t = setTimeout(() => {
                setGranted(true);
                setTimeout(onComplete, 900);
            }, 200);
            return () => clearTimeout(t);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Abstract background */}
            <LoaderBG />

            {/* HUD Corner Brackets */}
            {[
                'top-6 left-6 border-t border-l',
                'top-6 right-6 border-t border-r',
                'bottom-6 left-6 border-b border-l',
                'bottom-6 right-6 border-b border-r',
            ].map((cls, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-8 h-8 border-cyan/30 ${cls}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                />
            ))}

            {/* Top HUD Bar */}
            <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <div className="w-2 h-2 bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                <span className="text-[9px] tracking-[0.5em] text-cyan/50 uppercase font-bold">
                    SC_PORTFOLIO // v4.0
                </span>
                <div className="w-2 h-2 bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
            </motion.div>

            {/* Central Sigil */}
            <div className="relative flex items-center justify-center w-32 h-32 mb-12">
                <ValorantSigil visible={sigilVisible} />
                {/* "ACCESS GRANTED" flash overlay */}
                <AnimatePresence>
                    {granted && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 0.6, times: [0, 0.1, 0.8, 1] }}
                        >
                            <div className="w-full h-full bg-cyan/10 flex items-center justify-center">
                                <span className="text-cyan text-[10px] tracking-[0.4em] font-bold uppercase whitespace-nowrap">
                                    ACCESS GRANTED
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main HUD Block */}
            <motion.div
                className="relative w-full max-w-sm px-6 space-y-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
            >
                {/* Operator ID */}
                <div className="space-y-1 border-l-2 border-cyan/30 pl-4">
                    <p className="text-[8px] text-cyan/40 tracking-[0.5em] uppercase">OPERATOR_ID</p>
                    <p className="text-xs text-white/90 tracking-widest uppercase font-bold">
                        Schormeiker Lugo
                    </p>
                    <p className="text-[9px] text-cyan/50 tracking-[0.3em] uppercase">
                        Visual Systems Architect
                    </p>
                </div>

                {/* Status message */}
                <div className="h-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={msgIdx}
                            className="text-[9px] text-cyan/70 tracking-[0.25em] uppercase"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                        >
                            {BOOT_MSGS[msgIdx]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-white/20 tracking-[0.4em] uppercase">Loading</span>
                        <motion.span
                            className="text-[11px] text-cyan font-bold tabular-nums"
                            animate={progress === 100 ? { color: ['rgba(0,229,255,1)', '#fff', 'rgba(0,229,255,1)'] } : {}}
                            transition={{ duration: 0.4, repeat: 2 }}
                        >
                            {Math.round(progress)}%
                        </motion.span>
                    </div>
                    <SegmentedBar progress={progress} segments={22} />
                </div>
            </motion.div>

            {/* Bottom HUD — coordinate readout */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[8px] text-white/15 tracking-[0.4em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <span>LAT: 10.6966° N</span>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span>LON: 71.5834° W</span>
                <div className="w-1 h-1 bg-white/20 rounded-full" />
                <span>NODE: CCS-04</span>
            </motion.div>

            {/* Cyan flash on "access granted" */}
            <AnimatePresence>
                {granted && (
                    <motion.div
                        className="absolute inset-0 bg-cyan/[0.06] pointer-events-none z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Preloader;
