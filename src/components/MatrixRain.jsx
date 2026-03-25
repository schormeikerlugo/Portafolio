import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import useMobileDetect from '../hooks/useMobileDetect';

/* ─────────────────────────────────────────────────────────────
   MatrixRain
   Desktop: 5-layer parallax (tiny → huge characters, rich depth)
   Mobile:  1 layer, wider spacing for performance
   Viewport-aware: GSAP ticker paused when canvas is off-screen
───────────────────────────────────────────────────────────── */
const MatrixRain = ({ opacity = 0.15 }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const isMobile = useMobileDetect();
    const isInViewRef = useRef(false); // use ref (not state) — no re-render needed

    useGSAP(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const characters = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789@#$%&*+=';

        // Desktop: 5 layers — mini, small, medium, large, giant
        // Mobile:  1 layer for performance
        const layers = isMobile
            ? [{ fontSize: 24, speed: 0.004, opacity: 0.25, tailLength: 30 }]
            : [
                { fontSize:  8, speed: 0.0015, opacity: 0.06, tailLength: 15 }, // micro — atmospheric depth
                { fontSize: 14, speed: 0.002,  opacity: 0.10, tailLength: 22 }, // small
                { fontSize: 24, speed: 0.004,  opacity: 0.26, tailLength: 32 }, // medium (main)
                { fontSize: 42, speed: 0.006,  opacity: 0.40, tailLength: 42 }, // large
                { fontSize: 56, speed: 0.008,  opacity: 0.18, tailLength: 20 }, // giant — sparse, dramatic
            ];

        const drops = layers.map(layer => {
            const colSpacing = isMobile ? layer.fontSize * 5 : layer.fontSize * 2.5;
            const columns = Math.ceil(width / colSpacing);
            return new Array(columns).fill(0).map(() => Math.random() * -100);
        });

        const activeChars = drops.map(layer => layer.map(() => ({
            char: characters[Math.floor(Math.random() * characters.length)],
        })));

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.fillRect(0, 0, width, height);

            layers.forEach((layer, layerIdx) => {
                ctx.font = `${layer.fontSize}px monospace`;
                const layerDrops = drops[layerIdx];
                const layerChars = activeChars[layerIdx];
                const colSpacing = isMobile ? layer.fontSize * 5 : layer.fontSize * 2.5;

                for (let i = 0; i < layerDrops.length; i++) {
                    const headY = layerDrops[i];

                    if (Math.random() > 0.99) {
                        layerChars[i].char = characters[Math.floor(Math.random() * characters.length)];
                    }

                    for (let j = 0; j < layer.tailLength; j++) {
                        const charY = headY - j;
                        const pixelY = charY * layer.fontSize;

                        if (pixelY < -layer.fontSize || pixelY > height + layer.fontSize) continue;

                        const progress = j / layer.tailLength;
                        const charOpacity = Math.max(0, (1 - progress) * layer.opacity);

                        ctx.fillStyle = j === 0
                            ? `rgba(255, 255, 255, ${layer.opacity + 0.3})`
                            : `rgba(204, 204, 204, ${charOpacity})`;

                        const char = j === 0
                            ? layerChars[i].char
                            : characters[Math.floor((layerChars[i].char.charCodeAt(0) + j) % characters.length)];

                        ctx.fillText(char, i * colSpacing, pixelY);
                    }

                    if (layerDrops[i] - layer.tailLength > height / layer.fontSize && Math.random() > 0.995) {
                        layerDrops[i] = 0;
                    }
                    layerDrops[i] += layer.speed * 28;
                }
            });
        };

        // ── Viewport-aware pausing via IntersectionObserver ──
        const observer = new IntersectionObserver(
            ([entry]) => { isInViewRef.current = entry.isIntersecting; },
            { threshold: 0.01 }
        );
        if (container) observer.observe(container);

        const ticker = () => {
            if (isInViewRef.current) draw();
        };
        gsap.ticker.add(ticker);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            gsap.ticker.remove(ticker);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, { scope: canvasRef });

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <motion.div
                className="w-full h-full"
                initial={{ filter: 'blur(0px)' }}
                animate={{ filter: 'blur(3px)' }}
                transition={{ duration: 2, delay: 6.0, ease: 'easeInOut' }}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ opacity }}
                />
            </motion.div>

            {/* Fade bottom edge to black */}
            <div
                className="absolute inset-0 z-10"
                style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)' }}
            />
        </div>
    );
};

export default MatrixRain;