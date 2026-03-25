import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import useMobileDetect from '../hooks/useMobileDetect';

const MatrixRain = ({ opacity = 0.15 }) => {
    const canvasRef = useRef(null);
    const isMobile = useMobileDetect();

    useGSAP(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Prevent crashes if ref isn't immediately available
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const characters = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789@#$%&*+=';

        const layers = isMobile
            ? [{ fontSize: 24, speed: 0.004, opacity: 0.25, tailLength: 30 }]
            : [
                { fontSize: 14, speed: 0.002, opacity: 0.1, tailLength: 20 },
                { fontSize: 24, speed: 0.004, opacity: 0.25, tailLength: 30 },
                { fontSize: 42, speed: 0.006, opacity: 0.40, tailLength: 40 }
            ];

        const drops = layers.map(layer => {
            const colSpacing = isMobile ? layer.fontSize * 5 : layer.fontSize * 3;
            const columns = Math.ceil(width / colSpacing);
            return new Array(columns).fill(0).map(() => Math.random() * -100);
        });

        // Track characters per drop position to control "tipeo" speed
        const activeChars = drops.map(layer => layer.map(() => ({
            char: characters[Math.floor(Math.random() * characters.length)],
            lastUpdate: 0
        })));

        const draw = () => {
            // Fondo sólido para rastro manejado manualmente
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.fillRect(0, 0, width, height);

            layers.forEach((layer, layerIdx) => {
                ctx.font = `${layer.fontSize}px monospace`;
                const layerDrops = drops[layerIdx];
                const layerChars = activeChars[layerIdx];

                for (let i = 0; i < layerDrops.length; i++) {
                    const headY = layerDrops[i];

                    // Solo actualizamos el caracter de la "cabeza" muy raramente
                    if (Math.random() > 0.99) {
                        layerChars[i].char = characters[Math.floor(Math.random() * characters.length)];
                    }

                    // Dibujamos la cadena (tail) de cabeza a cola
                    for (let j = 0; j < layer.tailLength; j++) {
                        const charY = headY - j; // Eliminado Math.floor para una caída de interpolación sutil sub-pixel!
                        const pixelY = charY * layer.fontSize;

                        if (pixelY < -layer.fontSize || pixelY > height + layer.fontSize) continue;

                        // Gradiente de opacidad: 100% en cabeza, 0% en final de cola
                        const progress = j / layer.tailLength;
                        const charOpacity = Math.max(0, (1 - progress) * layer.opacity);

                        // Primer caracter (cabeza) es más brillante
                        if (j === 0) {
                            ctx.fillStyle = `rgba(255, 255, 255, ${layer.opacity + 0.3})`;
                        } else {
                            // Escala de gris al 80% (204, 204, 204)
                            ctx.fillStyle = `rgba(204, 204, 204, ${charOpacity})`;
                        }

                        // Caracter estático o con muy poco parpadeo
                        const char = j === 0 ? layerChars[i].char : characters[Math.floor((layerChars[i].char.charCodeAt(0) + j) % characters.length)];

                        const colSpacing = isMobile ? layer.fontSize * 5 : layer.fontSize * 3;
                        ctx.fillText(char, i * colSpacing, pixelY);
                    }

                    // Reposición y movimiento
                    if (layerDrops[i] - layer.tailLength > height / layer.fontSize && Math.random() > 0.995) {
                        layerDrops[i] = 0;
                    }
                    layerDrops[i] += layer.speed * 28; // Incrementado ligeramente el multiplicador para fluidez
                }
            });
        };

        const ticker = () => draw();
        gsap.ticker.add(ticker);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            gsap.ticker.remove(ticker);
            window.removeEventListener('resize', handleResize);
        };
    }, { scope: canvasRef });

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* El Canvas con el efecto de lluvia */}
            <motion.div
                className="w-full h-full"
                initial={{ filter: 'blur(0px)' }}
                animate={{ filter: 'blur(3px)' }}
                transition={{ duration: 2, delay: 6.0, ease: 'easeInOut' }}
            >
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ opacity: opacity }}
                />
            </motion.div>

            {/* DEGRADADO FRONTAL #000 (0 a 100%) */}
            {/* Este div se asegura de que la lluvia se desvanezca hacia el negro al final */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)'
                }}
            />
        </div>
    );
};

export default MatrixRain;