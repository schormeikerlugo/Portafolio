import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('INITIALIZING...');

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        tl.to({}, {
            duration: 2.5,
            onUpdate: function () {
                const p = Math.round(this.progress() * 100);
                setProgress(p);
                if (p < 20) setStatus('BOOTING CORE_KERNEL...');
                else if (p < 40) setStatus('MOUNTING FILESYSTEMS...');
                else if (p < 60) setStatus('ESTABLISHING SECURE_LINK...');
                else if (p < 80) setStatus('CALIBRATING VISUAL_HUD...');
                else setStatus('OPERATOR AUTHENTICATED.');
            }
        });

        // Glitch effect on bar
        tl.to('.progress-bar', {
            skewX: 20,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: 'none'
        }, "-=1.5");

    }, { dependencies: [onComplete] });

    return (
        <motion.div 
            className="loading-screen fixed inset-0 z-[9999] bg-void flex flex-col items-center justify-center p-6 font-mono"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="w-full max-w-xs space-y-8 text-center sm:text-left">
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] tracking-[0.2em] text-cyan/60 uppercase">
                        <span>System Loading</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                        <motion.div
                            className="progress-bar h-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                            initial={{ width: 0 }}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase">Status</p>
                    <p className="text-xs text-white tracking-[0.1em] uppercase min-h-[1.5em]">
                        {status}
                    </p>
                </div>

                <div className="pt-8 opacity-20">
                    <p className="text-[8px] tracking-[0.5em] text-white uppercase">
                        Schormeiker Lugo // Visual Systems Architect
                    </p>
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-px w-full bg-cyan mb-12"
                        style={{ opacity: Math.random() }}
                    />
                ))}
            </div>
        </motion.div>
    );
}