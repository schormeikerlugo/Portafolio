import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════════
   VALORANT-STYLE CINEMATIC LOADER
   Timeline:
   0.0s → BG + HUD corners assemble
   0.3s → Central sigil draws in
   0.6s → Operator ID + segmented bar appears
   0.0s—2.5s → Progress fills, messages cycle
   2.5s → "ACCESS GRANTED" flash → exit
   ═══════════════════════════════════════════════ */

const BOOT_MSGS = [
    'BOOTING_CORE_KERNEL............',
    'MOUNTING_VISUAL_SYSTEMS.......',
    'VERIFYING_OPERATOR_IDENTITY...',
    'CALIBRATING_INTERFACE_HUD.....',
    'ESTABLISHING_SECURE_LINK......',
    'OPERATOR_AUTHENTICATED........',
];

/* ── Assembling crosshair sigil ── */
const ValorantSigil = ({ visible }) => (
    <motion.svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="absolute"
        aria-hidden="true"
    >
        {/* Outer dashed ring — slow spin */}
        <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="rgba(0,229,255,0.15)"
            strokeWidth="0.6"
            strokeDasharray="10 8"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: '80px 80px', animation: visible ? 'spin 40s linear infinite' : 'none' }}
        />
        {/* Mid ring */}
        <motion.circle
            cx="80" cy="80" r="50"
            fill="none"
            stroke="rgba(0,229,255,0.3)"
            strokeWidth="0.8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Inner ring */}
        <motion.circle
            cx="80" cy="80" r="26"
            fill="none"
            stroke="rgba(0,229,255,0.55)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={visible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Cross lines */}
        {[
            { x1: 80, y1: 6, x2: 80, y2: 46 },
            { x1: 80, y1: 114, x2: 80, y2: 154 },
            { x1: 6, y1: 80, x2: 46, y2: 80 },
            { x1: 114, y1: 80, x2: 154, y2: 80 },
        ].map((line, i) => (
            <motion.line
                key={i}
                x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                stroke="rgba(0,229,255,0.8)"
                strokeWidth="1"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={visible ? { opacity: 1, pathLength: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.07, ease: 'easeOut' }}
            />
        ))}
        {/* Arrow tick marks on cross ends */}
        {[
            '80,14 74,24 86,24',
            '80,146 74,136 86,136',
            '14,80 24,74 24,86',
            '146,80 136,74 136,86',
        ].map((pts, i) => (
            <motion.polygon
                key={i}
                points={pts}
                fill="rgba(0,229,255,0.6)"
                initial={{ opacity: 0 }}
                animate={visible ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.65 + i * 0.05 }}
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
                <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(0,229,255,0.35)"
                    strokeWidth="1"
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
                />
            );
        })}
        {/* Pulsing center dot */}
        <motion.circle
            cx="80" cy="80" r="5"
            fill="rgba(0,229,255,0.95)"
            initial={{ opacity: 0, scale: 0 }}
            animate={visible ? { opacity: [0, 1, 0.7, 1], scale: [0, 1.5, 1] } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{ filter: 'drop-shadow(0 0 8px rgba(0,229,255,1))' }}
        />
    </motion.svg>
);

/* ── Valorant-style segmented progress bar ── */
const SegmentedBar = ({ progress, segments = 24 }) => {
    const filled = Math.floor((progress / 100) * segments);
    return (
        <div className="flex items-center gap-[2px] w-full">
            {Array.from({ length: segments }).map((_, i) => (
                <motion.div
                    key={i}
                    className="flex-1 h-[5px] relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.012 }}
                >
                    <div className="absolute inset-0 bg-white/[0.05]" />
                    <motion.div
                        className="absolute inset-0 bg-cyan"
                        animate={{ scaleX: i < filled ? 1 : 0 }}
                        style={{
                            transformOrigin: 'left',
                            boxShadow: i < filled ? '0 0 8px rgba(0,229,255,0.5)' : 'none',
                        }}
                        transition={{ duration: 0.08 }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

/* ── Subtle abstract BG ── */
const LoaderBG = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            {/* Corner triangles */}
            {[
                '0,0 260,0 0,260',
                '1440,0 1180,0 1440,260',
                '0,900 0,640 260,900',
                '1440,900 1180,900 1440,640',
            ].map((pts, i) => (
                <motion.polygon
                    key={i}
                    points={pts}
                    fill="rgba(0,229,255,0.015)"
                    stroke="rgba(0,229,255,0.1)"
                    strokeWidth="0.7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                />
            ))}
            {/* Subtle center horizontal line */}
            <motion.line
                x1="0" y1="450" x2="1440" y2="450"
                stroke="rgba(0,229,255,0.04)" strokeWidth="1" strokeDasharray="24 36"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
            />
        </svg>
        {/* Fine scanlines */}
        <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,229,255,0.6) 0px, rgba(0,229,255,0.6) 1px, transparent 1px, transparent 4px)'
            }}
        />
    </div>
);

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [granted, setGranted] = useState(false);
    const [sigilVisible, setSigilVisible] = useState(false);

    useEffect(() => {
        const sigilTimer = setTimeout(() => setSigilVisible(true), 300);

        const ticker = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) { clearInterval(ticker); return 100; }
                const jump = Math.random() > 0.85 ? 10 : Math.random() > 0.5 ? 3 : 1;
                return Math.min(prev + jump, 100);
            });
        }, 55);

        const msgTimer = setInterval(() => {
            setMsgIdx(i => Math.min(i + 1, BOOT_MSGS.length - 1));
        }, 380);

        return () => { clearTimeout(sigilTimer); clearInterval(ticker); clearInterval(msgTimer); };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const t = setTimeout(() => {
                setGranted(true);
                setTimeout(onComplete, 900);
            }, 150);
            return () => clearTimeout(t);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center font-mono overflow-hidden select-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <LoaderBG />

            {/* HUD Corner Brackets */}
            {[
                'top-5 left-5 border-t border-l',
                'top-5 right-5 border-t border-r',
                'bottom-5 left-5 border-b border-l',
                'bottom-5 right-5 border-b border-r',
            ].map((cls, i) => (
                <motion.div
                    key={i}
                    className={`absolute w-10 h-10 border-cyan/40 ${cls}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                />
            ))}

            {/* Top center HUD bar */}
            <motion.div
                className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="w-1.5 h-1.5 bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.9)]" />
                <span className="text-[9px] tracking-[0.5em] text-cyan/50 uppercase font-bold">
                    SL_PORTFOLIO // v4.0 // SYS_BOOT
                </span>
                <div className="w-1.5 h-1.5 bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.9)]" />
            </motion.div>

            {/* Central Sigil */}
            <div className="relative flex items-center justify-center w-44 h-44 mb-10">
                <ValorantSigil visible={sigilVisible} />
                {/* ACCESS GRANTED overlay */}
                <AnimatePresence>
                    {granted && (
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-10 bg-cyan/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 0.7, times: [0, 0.1, 0.8, 1] }}
                        >
                            <span className="text-cyan text-[10px] tracking-[0.5em] font-bold uppercase whitespace-nowrap">
                                ACCESS GRANTED
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main HUD Block */}
            <motion.div
                className="relative w-full max-w-sm px-6 space-y-5"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
            >
                {/* Operator identity card */}
                <div className="border-l-2 border-cyan/40 pl-4 space-y-1">
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
                        <motion.p
                            key={msgIdx}
                            className="text-[9px] text-cyan/70 tracking-[0.2em] uppercase"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.18 }}
                        >
                            {BOOT_MSGS[msgIdx]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[8px] text-white/20 tracking-[0.4em] uppercase">System Loading</span>
                        <motion.span
                            className="text-[12px] text-cyan font-bold tabular-nums"
                            animate={progress === 100 ? { color: ['#00e5ff', '#ffffff', '#00e5ff'] } : {}}
                            transition={{ duration: 0.4, repeat: 2 }}
                        >
                            {Math.round(progress)}%
                        </motion.span>
                    </div>
                    <SegmentedBar progress={progress} segments={24} />
                </div>
            </motion.div>

            {/* Bottom coordinate readout */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 text-[8px] text-white/15 tracking-[0.4em] uppercase whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
            >
                <span>LAT: 10.6966° N</span>
                <div className="w-1 h-1 bg-white/15 rounded-full" />
                <span>LON: 71.5834° W</span>
                <div className="w-1 h-1 bg-white/15 rounded-full" />
                <span>NODE: CCS-04</span>
            </motion.div>

            {/* Full-screen cyan flash on granted */}
            <AnimatePresence>
                {granted && (
                    <motion.div
                        className="absolute inset-0 bg-cyan/[0.07] pointer-events-none z-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>

            {/* Spin keyframe injected globally */}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </motion.div>
    );
}