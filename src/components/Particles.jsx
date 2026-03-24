import { useEffect, useRef, useState } from 'react';

const Particles = ({ quantity = 40 }) => {
    const canvasRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    // Setup Intersection Observer for performance (pauses animation when out of view)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { rootMargin: "100px" }
        );
        if (canvasRef.current) observer.observe(canvasRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isInView) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;
        
        const particles = [];
        const maxVelocity = 0.15; // Elegantly slow
        const lineLength = 150; // Distance to connect
        const colorRGB = '0, 170, 255'; // Cyan-blue tint (Deep Sky Blue)

        const resize = () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
            }
        };
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.velocityX = (Math.random() * 2 - 1) * maxVelocity;
                this.velocityY = (Math.random() * 2 - 1) * maxVelocity;
            }
            update() {
                if (this.x + this.velocityX > width || this.x + this.velocityX < 0) this.velocityX *= -1;
                if (this.y + this.velocityY > height || this.y + this.velocityY < 0) this.velocityY *= -1;
                this.x += this.velocityX;
                this.y += this.velocityY;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${colorRGB}, 0.5)`;
                ctx.fill();
            }
        }

        const drawLines = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - particles[i].x;
                    const dy = particles[j].y - particles[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < lineLength) {
                        const opacity = 1 - (distance / lineLength);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.lineWidth = 0.5;
                        ctx.strokeStyle = `rgba(${colorRGB}, ${opacity * 0.3})`;
                        ctx.stroke();
                    }
                }
            }
        };

        const loop = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            drawLines();
            animationFrameId = requestAnimationFrame(loop);
        };

        for (let i = 0; i < quantity; i++) {
            particles.push(new Particle());
        }
        loop();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isInView, quantity]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            <canvas ref={canvasRef} className="w-full h-full opacity-50 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-b from-void/20 via-transparent to-void/80 pointer-events-none" />
        </div>
    );
};

export default Particles;
