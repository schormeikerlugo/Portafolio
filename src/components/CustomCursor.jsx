import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const targetRef = useRef({ x: -100, y: -100 });
    const rafRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e) => {
            targetRef.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const t = e.target;
            setIsHovering(
                t.tagName === 'A' || t.tagName === 'BUTTON' ||
                !!t.closest('button') || !!t.closest('a') ||
                t.classList.contains('cursor-pointer') || !!t.closest('.cursor-pointer')
            );
        };

        const animate = () => {
            setPosition(prev => ({
                x: prev.x + (targetRef.current.x - prev.x) * 0.2,
                y: prev.y + (targetRef.current.y - prev.y) * 0.2,
            }));
            rafRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', () => setIsVisible(false));
        document.addEventListener('mouseenter', () => setIsVisible(true));
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isVisible]);

    if (isTouch) return null;

    const size = isHovering ? 28 : 20;
    const half = size / 2;
    const lineLen = isHovering ? 8 : 6;
    const gap = 3;
    const color = isHovering ? 'rgba(0, 229, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)';

    return (
        <svg
            className="fixed pointer-events-none z-[9999] mix-blend-plus-lighter"
            style={{
                left: position.x - half,
                top: position.y - half,
                width: size,
                height: size,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.15s ease',
            }}
            viewBox={`0 0 ${size} ${size}`}
        >
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