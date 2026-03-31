import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

/* ═══════════════════════════════════════════════
   BRUTALIST SCI-FI CURSOR
   GSAP quickTo for buttery-smooth movement
   
   WHY GSAP quickTo: Optimizado para actualizaciones
   frecuentes como el movimiento del cursor. Reutiliza
   un solo tween en lugar de crear nuevos cada frame.
   ═══════════════════════════════════════════════ */

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorRef = useRef(null);
    const trailRef = useRef(null);
    const xTo = useRef(null);
    const yTo = useRef(null);
    const trailXTo = useRef(null);
    const trailYTo = useRef(null);

    // WHY GSAP quickTo: Para propiedades que se actualizan
    // frecuentemente (como la posición del cursor), quickTo
    // reutiliza un solo tween en lugar de crear nuevos cada frame
    useGSAP(() => {
        if (isTouch || !cursorRef.current) return;

        // Main cursor follows mouse directly
        xTo.current = gsap.quickTo(cursorRef.current, 'x', {
            duration: 0.1,
            ease: 'power3.out'
        });
        yTo.current = gsap.quickTo(cursorRef.current, 'y', {
            duration: 0.1,
            ease: 'power3.out'
        });

        // Trail follows with lag for brutalist effect
        if (trailRef.current) {
            trailXTo.current = gsap.quickTo(trailRef.current, 'x', {
                duration: 0.4,
                ease: 'power2.out'
            });
            trailYTo.current = gsap.quickTo(trailRef.current, 'y', {
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, [isTouch]);

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(true);
            return;
        }

        const handleMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);
            if (xTo.current) xTo.current(e.clientX);
            if (yTo.current) yTo.current(e.clientY);
            if (trailXTo.current) trailXTo.current(e.clientX);
            if (trailYTo.current) trailYTo.current(e.clientY);
        };

        const handleMouseOver = (e) => {
            const t = e.target;
            const isInteractive = t.tagName === 'A' || t.tagName === 'BUTTON' ||
                !!t.closest('button') || !!t.closest('a') ||
                t.classList.contains('cursor-pointer') || !!t.closest('.cursor-pointer');
            setIsHovering(isInteractive);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    // Hover animation with GSAP
    useGSAP(() => {
        if (!cursorRef.current) return;

        // WHY GSAP: Animación suave del estado hover
        // con efectos brutales (scale, rotation, color)
        if (isHovering) {
            gsap.to(cursorRef.current, {
                scale: 1.4,
                rotation: 45,
                duration: 0.3,
                ease: 'back.out(2)'
            });
            if (trailRef.current) {
                gsap.to(trailRef.current, {
                    scale: 1.6,
                    opacity: 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        } else {
            gsap.to(cursorRef.current, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            if (trailRef.current) {
                gsap.to(trailRef.current, {
                    scale: 1,
                    opacity: 0.15,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        }
    }, [isHovering]);

    // Click animation with GSAP
    useGSAP(() => {
        if (!cursorRef.current) return;

        if (isClicking) {
            // WHY GSAP: Efecto brutal de click con scale y skew
            gsap.to(cursorRef.current, {
                scale: 0.8,
                skewX: 10,
                duration: 0.1,
                ease: 'power2.in'
            });
            if (trailRef.current) {
                gsap.to(trailRef.current, {
                    scale: 0.6,
                    opacity: 0.4,
                    duration: 0.1,
                    ease: 'power2.in'
                });
            }
        } else {
            gsap.to(cursorRef.current, {
                scale: isHovering ? 1.4 : 1,
                skewX: 0,
                duration: 0.2,
                ease: 'back.out(2)'
            });
            if (trailRef.current) {
                gsap.to(trailRef.current, {
                    scale: isHovering ? 1.6 : 1,
                    opacity: isHovering ? 0.3 : 0.15,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }
    }, [isClicking, isHovering]);

    if (isTouch) return null;

    const size = isHovering ? 28 : 20;
    const half = size / 2;
    const lineLen = isHovering ? 8 : 6;
    const color = isHovering ? 'rgba(0, 229, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)';
    const trailColor = isHovering ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)';

    return (
        <>
            {/* Trail cursor — follows with lag */}
            <svg
                ref={trailRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-plus-lighter will-change-transform"
                style={{
                    width: size * 2,
                    height: size * 2,
                    opacity: isVisible ? 0.15 : 0,
                    transition: 'opacity 0.3s ease',
                }}
                viewBox={`0 0 ${size * 2} ${size * 2}`}
            >
                <style>
                    {`
                        body * { cursor: none !important; }
                        body { cursor: none !important; }
                    `}
                </style>
                {/* Outer ring */}
                <circle
                    cx={size}
                    cy={size}
                    r={size - 2}
                    fill="none"
                    stroke={trailColor}
                    strokeWidth={0.5}
                    strokeDasharray="4 4"
                />
                {/* Inner ring */}
                <circle
                    cx={size}
                    cy={size}
                    r={size / 2}
                    fill="none"
                    stroke={trailColor}
                    strokeWidth={0.3}
                />
            </svg>

            {/* Main cursor */}
            <svg
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-plus-lighter will-change-transform"
                style={{
                    width: size,
                    height: size,
                    opacity: isVisible ? 1 : 0,
                    transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
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
                {/* Corner accents on hover */}
                {isHovering && (
                    <>
                        <line x1={0} y1={0} x2={4} y2={4} stroke={color} strokeWidth={0.5} />
                        <line x1={size} y1={0} x2={size - 4} y2={4} stroke={color} strokeWidth={0.5} />
                        <line x1={0} y1={size} x2={4} y2={size - 4} stroke={color} strokeWidth={0.5} />
                        <line x1={size} y1={size} x2={size - 4} y2={size - 4} stroke={color} strokeWidth={0.5} />
                    </>
                )}
            </svg>
        </>
    );
}
