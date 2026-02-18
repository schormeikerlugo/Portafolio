import { useRef, useEffect } from 'react';
import { useVisibility } from '../hooks/useVisibility';

/* ── Nebula: Canvas 2D animated background ── */
export default function Nebula() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const { ref: visRef, isVisible } = useVisibility({ rootMargin: '300px' });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * (window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio);
            canvas.height = rect.height * (window.devicePixelRatio > 1.5 ? 1.5 : window.devicePixelRatio);
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        };

        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            if (!isVisible) {
                animRef.current = requestAnimationFrame(draw);
                return;
            }

            time += 0.003;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            /* Nebula cloud 1 — cyan */
            const cx1 = w * 0.3 + Math.sin(time * 0.7) * w * 0.05;
            const cy1 = h * 0.4 + Math.cos(time * 0.5) * h * 0.04;
            const r1 = Math.min(w, h) * 0.35;
            const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, r1);
            g1.addColorStop(0, 'rgba(0, 229, 255, 0.06)');
            g1.addColorStop(0.4, 'rgba(0, 229, 255, 0.03)');
            g1.addColorStop(1, 'rgba(0, 229, 255, 0)');
            ctx.fillStyle = g1;
            ctx.fillRect(0, 0, w, h);

            /* Nebula cloud 2 — magenta */
            const cx2 = w * 0.7 + Math.cos(time * 0.6) * w * 0.04;
            const cy2 = h * 0.6 + Math.sin(time * 0.8) * h * 0.05;
            const r2 = Math.min(w, h) * 0.3;
            const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, r2);
            g2.addColorStop(0, 'rgba(224, 64, 251, 0.05)');
            g2.addColorStop(0.4, 'rgba(224, 64, 251, 0.02)');
            g2.addColorStop(1, 'rgba(224, 64, 251, 0)');
            ctx.fillStyle = g2;
            ctx.fillRect(0, 0, w, h);

            /* Nebula cloud 3 — warm accent */
            const cx3 = w * 0.5 + Math.sin(time * 0.4) * w * 0.06;
            const cy3 = h * 0.3 + Math.cos(time * 0.3) * h * 0.05;
            const r3 = Math.min(w, h) * 0.25;
            const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, r3);
            g3.addColorStop(0, 'rgba(0, 180, 255, 0.04)');
            g3.addColorStop(1, 'rgba(0, 180, 255, 0)');
            ctx.fillStyle = g3;
            ctx.fillRect(0, 0, w, h);

            /* Dust particles */
            for (let i = 0; i < 30; i++) {
                const px = (Math.sin(time * 0.2 + i * 1.7) * 0.5 + 0.5) * w;
                const py = (Math.cos(time * 0.15 + i * 2.3) * 0.5 + 0.5) * h;
                const ps = 0.5 + Math.sin(time + i) * 0.3;
                const pa = 0.05 + Math.sin(time * 0.5 + i * 0.8) * 0.03;
                ctx.beginPath();
                ctx.arc(px, py, ps, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 220, 255, ${pa})`;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        };

        animRef.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [isVisible]);

    return (
        <div ref={visRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
            />
        </div>
    );
}
