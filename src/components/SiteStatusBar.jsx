import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import { Music, Activity } from 'lucide-react';

export default function SiteStatusBar() {
    const { t } = useTranslation();
    const { settings } = useSettings();
    const { scrollYProgress } = useScroll();
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [scrollPercent, setScrollPercent] = useState(0);

    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setHasMounted(true), 6500);
        const clockTimer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        const unsubscribe = scrollYProgress.onChange(v => setScrollPercent(Math.round(v * 100)));
        return () => {
            clearTimeout(timer);
            clearInterval(clockTimer);
            unsubscribe();
        };
    }, [scrollYProgress]);

    return (
        <motion.div 
            initial={{ y: 32 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: hasMounted ? 0 : 6.0, ease: 'easeOut' }}
            className="fixed bottom-0 left-0 w-full h-8 bg-black/80 backdrop-blur-md border-t border-white/5 z-[9997] flex items-center px-4 justify-between pointer-events-none text-white/40"
        >
            {/* Left: System Status & Mode */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
                    <span className="mono text-[9px] uppercase tracking-widest font-bold">
                        {t('status.system_ready', 'SISTEMA_LISTO')}
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-4">
                    <span className="mono text-[9px] uppercase leading-none">
                        MODE: <span className="text-cyan/60">{settings.mode}</span>
                    </span>
                    <span className="mono text-[9px] uppercase leading-none border-l border-white/10 pl-4 flex items-center gap-2">
                        <Activity size={10} className="text-white/20" />
                        SCROLL: <span className="text-white/60">{scrollPercent}%</span>
                    </span>
                </div>
            </div>

            {/* Right: Music Widget & Clock */}
            <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-3 border-r border-white/10 pr-6">
                    <Music size={10} className="text-cyan/40 animate-pulse" />
                    <span className="mono text-[9px] uppercase tracking-tight text-white/30 truncate max-w-[150px]">
                        ♪ Playing: <span className="text-white/60 italic">CYBERPUNK_AMBIENCE.WAV</span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="mono text-[9px] uppercase tracking-widest font-medium">
                        {time}
                    </div>
                    <div className="mono text-[9px] px-2 py-0.5 border border-white/10 rounded-sm uppercase tracking-wider bg-white/5 text-white/60 font-bold">
                        V1.2.0-STABLE
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
