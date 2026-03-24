import { useState, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';

export default function TerminalCursor() {
    const { settings } = useSettings();
    const cursorRef = useRef(null);
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!settings.customCursor) return;

        const handleMouseMove = (e) => {
            // Uninterrupted 120fps hardware-accelerated DOM manipulation, bypassing React render queue entirely.
            // translate(-50%, -50%) mathematically shifts the physical center of the bracket shape directly onto the raw mouse tip.
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
            
            setIsVisible(true);
            
            const target = e.target;
            const isClickable = 
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('a') !== null || 
                target.closest('button') !== null;

            setIsPointer(prev => prev !== isClickable ? isClickable : prev);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [settings.customCursor]);

    if (!settings.customCursor) return null;

    return (
        <div 
            ref={cursorRef}
            className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform' }}
        >
            {/* Brackets [ ] Cursor */}
            <div className={`relative flex items-center justify-center transition-all duration-300 ${isPointer ? 'scale-150' : 'scale-100'}`}>
                <span className="text-cyan text-lg font-mono">[</span>
                <div className={`w-1 h-1 bg-cyan rounded-full mx-1 transition-opacity ${isPointer ? 'opacity-100' : 'opacity-40'}`} />
                <span className="text-cyan text-lg font-mono">]</span>
            </div>
        </div>
    );
}
