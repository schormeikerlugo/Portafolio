import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('BOOTING_PROTOCOL_0x4F92...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        // Artificial jumps for technical feel
        const jump = Math.random() > 0.8 ? 15 : 2;
        return Math.min(prev + jump, 100);
      });
    }, 100);

    const statusInterval = setInterval(() => {
        const statuses = [
            'VERIFYING_CORE_NODES...',
            'SYNCING_SPACE_TELEMETRY...',
            'ESTABLISHING_ENCRYPTED_SIGNAL...',
            'SISTEMA_OPERATIVO_LISTO'
        ];
        setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 1200);

    return () => {
        clearInterval(interval);
        clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-64 space-y-4">
        <div className="flex justify-between items-end">
            <span className="font-mono text-[9px] text-cyan tracking-[0.2em] font-bold">
                {status}
            </span>
            <span className="font-mono text-[10px] text-cyan/60 font-bold">
                {Math.round(progress)}%
            </span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
            />
            {/* Glitch Overlay */}
            <motion.div 
                className="absolute top-0 left-0 h-full bg-white opacity-40"
                animate={{ 
                    x: ['-100%', '100%'],
                    opacity: [0, 0.4, 0]
                }}
                transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>

        {/* HUD Elements */}
        <div className="absolute -top-12 -left-12 w-8 h-8 border-t border-l border-cyan/20" />
        <div className="absolute -bottom-12 -right-12 w-8 h-8 border-b border-r border-cyan/20" />
      </div>
    </motion.div>
  );
};

export default Preloader;
