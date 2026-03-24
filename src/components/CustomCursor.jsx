import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            if (cursorRef.current) {
                // Direct DOM manipulation completely bypassing React to zero-out latency.
                // translate(-50%, -50%) handles the centering automatically regardless of the cursor's size changes.
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        const handleMouseOver = (e) => {
            const t = e.target;
            const isInteractive = t.tagName === 'A' || t.tagName === 'BUTTON' ||
                !!t.closest('button') || !!t.closest('a') ||
                t.classList.contains('cursor-pointer') || !!t.closest('.cursor-pointer');
            setIsHovering(isInteractive);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    if (isTouch) return null;

    const size = isHovering ? 28 : 20;
    const half = size / 2;
    const lineLen = isHovering ? 8 : 6;
    const color = isHovering ? 'rgba(0, 229, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)';

    return (
        <svg
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-plus-lighter will-change-transform"
            style={{
                width: size,
                height: size,
                opacity: isVisible ? 1 : 0,
                // Transition only affects the hover state expansion and initial visibility, NOT movement.
                transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease', 
            }}
            viewBox={`0 0 ${size} ${size}`}
        >
            <style>
                {`
                    body * { cursor: none !important; }
                    body { cursor: none !important; }
                `}
            </style>
            {/* Top */}
            <line x1={half} y1={0} x2={half} y2={lineLen} stroke={color} strokeWidth={0.8} />
            {/* Bottom */}
            <line x1={half} y1={size} x2={half} y2={size - lineLen} stroke={color} strokeWidth={0.8} />
            {/* Left */}
            <line x1={0} y1={half} x2={lineLen} y2={half} stroke={color} strokeWidth={0.8} />
            {/* Right */}
            <line x1={size} y1={half} x2={size - lineLen} y2={half} stroke={color} strokeWidth={0.8} />
            {/* Center dot */}
            <circle cx={half} cy={half} r={isHovering ? 1.5 : 0.8} fill={color} />
        </svg>
    );
}