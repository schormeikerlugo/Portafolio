import { useRef, useEffect } from 'react';

interface MatrixRainProps {
  opacity?: number;
}

export default function MatrixRain({ opacity = 0.35 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isInView = false;
    let animId: number;

    const characters =
      'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789@#$%&*+=';

    const isMobile = window.innerWidth < 768;

    const layers = isMobile
      ? [
          { fontSize: 14, speed: 0.003, opacity: 0.30, tailLength: 24 },
          { fontSize: 22, speed: 0.004, opacity: 0.40, tailLength: 30 },
        ]
      : [
          { fontSize: 10, speed: 0.0015, opacity: 0.08, tailLength: 18 },
          { fontSize: 20, speed: 0.003, opacity: 0.18, tailLength: 26 },
          { fontSize: 34, speed: 0.005, opacity: 0.35, tailLength: 36 },
          { fontSize: 52, speed: 0.007, opacity: 0.25, tailLength: 22 },
        ];

    const drops = layers.map((layer) => {
      const colSpacing = isMobile ? layer.fontSize * 2.2 : layer.fontSize * 2.5;
      const columns = Math.ceil(width / colSpacing);
      return new Array(columns).fill(0).map(() => Math.random() * -100);
    });

    const activeChars = drops.map((layer) =>
      layer.map(() => ({
        char: characters[Math.floor(Math.random() * characters.length)],
      }))
    );

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, width, height);

      layers.forEach((layer, layerIdx) => {
        ctx.font = `${layer.fontSize}px monospace`;
        const layerDrops = drops[layerIdx];
        const layerChars = activeChars[layerIdx];
        const colSpacing = isMobile ? layer.fontSize * 3 : layer.fontSize * 2.5;

        for (let i = 0; i < layerDrops.length; i++) {
          const headY = layerDrops[i];

          if (Math.random() > 0.99) {
            layerChars[i].char =
              characters[Math.floor(Math.random() * characters.length)];
          }

          for (let j = 0; j < layer.tailLength; j++) {
            const charY = headY - j;
            const pixelY = charY * layer.fontSize;

            if (pixelY < -layer.fontSize || pixelY > height + layer.fontSize)
              continue;

            const progress = j / layer.tailLength;
            const charOpacity = Math.max(0, (1 - progress) * layer.opacity);

            ctx.fillStyle =
              j === 0
                ? `rgba(255, 255, 255, ${layer.opacity + 0.3})`
                : `rgba(204, 204, 204, ${charOpacity})`;

            const char =
              j === 0
                ? layerChars[i].char
                : characters[
                    Math.floor(
                      (layerChars[i].char.charCodeAt(0) + j) %
                        characters.length
                    )
                  ];

            ctx.fillText(char, i * colSpacing, pixelY);
          }

          if (
            layerDrops[i] - layer.tailLength > height / layer.fontSize &&
            Math.random() > 0.995
          ) {
            layerDrops[i] = 0;
          }
          layerDrops[i] += layer.speed * 28;
        }
      });
    };

    // Viewport-aware rendering
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    if (container) observer.observe(container);

    // Throttle on mobile: render every other frame to save CPU
    let frameCount = 0;
    const skipFrames = isMobile ? 2 : 1;

    const tick = () => {
      frameCount++;
      if (isInView && frameCount % skipFrames === 0) draw();
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div
        className="w-full h-full"
        style={{ opacity: opacity + 0.3, filter: 'blur(3px)' }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        }}
      />
    </div>
  );
}
