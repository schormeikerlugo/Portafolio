import { useEffect, useRef } from 'react';
import useMobileDetect from '../hooks/useMobileDetect';

/* ═══════════════════════════════════════════════
   DEV PARTICLES v2 — Typing & Blinking Effect
   Simulates code snippets typing in and blinking 
   out randomly in the background.
   ═══════════════════════════════════════════════ */

const CODE_LINES = [
    '{ }', '</>', '[]', '()', '=>', '===', '!==', '||', '&&',
    'import { system }', 'export default', 'const MAX = 99;',
    'if (mounted) {', 'return null;', 'console.log()',
    'yield*', 'async_await', '0x1A4', 'null pointer',
    'void 0', 'typeof window', '__proto__', '010101',
    '101010', 'system.boot()'
];

export default function DevParticles({ opacity = 0.4 }) {
    const isMobile = useMobileDetect();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let elements = [];

        const initCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const count = Math.floor((canvas.width * canvas.height) / 150000);
            elements = [];

            for (let i = 0; i < count; i++) {
                elements.push(createNewElement(canvas));
            }
        };

        const createNewElement = (canvas) => {
            const fullText = CODE_LINES[Math.floor(Math.random() * CODE_LINES.length)];
            return {
                x: Math.random() * (canvas.width - 100) + 20,
                y: Math.random() * (canvas.height - 40) + 20,
                fullText,
                currentLength: 0,
                phase: 'waiting', // waiting, typing, holding, blinking_out
                timer: Math.random() * 300 + 100, // random start delay (wait much longer)
                speed: Math.random() * 2 + 1, // typing speed
                baseOpacity: Math.random() * 0.4 + 0.6, // Brightness variation 60% to 100%
                size: Math.floor(Math.random() * 4 + 10) // 10px to 14px text
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.textBaseline = 'middle';

            elements.forEach((el, index) => {
                // State machine logic
                el.timer -= 1;

                if (el.phase === 'waiting' && el.timer <= 0) {
                    el.phase = 'typing';
                }

                if (el.phase === 'typing') {
                    if (el.timer <= 0) {
                        el.currentLength += 1;
                        el.timer = el.speed; // Wait frames before next char
                    }
                    if (el.currentLength >= el.fullText.length) {
                        el.phase = 'holding';
                        el.timer = 60 + Math.random() * 100; // Hold for 1-2 seconds
                    }
                }

                let blinkAlpha = 1;
                if (el.phase === 'holding') {
                    if (el.timer <= 0) {
                        el.phase = 'blinking_out';
                        el.timer = 30; // 30 frames to blink out
                    }
                }

                if (el.phase === 'blinking_out') {
                    // Flash randomly before disappearing
                    blinkAlpha = Math.random() > 0.5 ? 0 : 1;
                    if (el.timer <= 0) {
                        // Reset and respawn
                        elements[index] = createNewElement(canvas);
                        return;
                    }
                }

                // Drawing logic
                if (el.phase !== 'waiting') {
                    const textToShow = el.fullText.substring(0, el.currentLength);
                    // Add cursor block at the end if typing or holding (blink cursor)
                    const showCursor = el.phase === 'typing' || (el.phase === 'holding' && el.timer % 20 > 10);

                    ctx.font = `${el.size}px monospace`;

                    // Final opacity is our prop (e.g. 0.15) * particle base * structural blink
                    const elementOpacity = opacity * el.baseOpacity * blinkAlpha;

                    // The text
                    ctx.fillStyle = `rgba(0, 229, 255, ${elementOpacity})`;
                    ctx.fillText(textToShow, el.x, el.y);

                    if (showCursor) {
                        ctx.fillStyle = `rgba(0, 229, 255, ${elementOpacity + 0.2})`;
                        const textWidth = ctx.measureText(textToShow).width;
                        ctx.fillRect(el.x + textWidth + 2, el.y - (el.size / 2) + 2, el.size * 0.6, el.size);
                    }
                }
            });

            animationId = requestAnimationFrame(draw);
        };

        initCanvas();
        draw();

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(initCanvas, 200);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
    }, [isMobile, opacity]);

    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        />
    );
}
