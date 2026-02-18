import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Spiral Galaxy using particle system ── */
function GalaxyParticles() {
    const pointsRef = useRef();
    const { viewport } = useThree();

    const lockedScale = useRef(null);
    if (lockedScale.current === null && viewport.width > 0.1) {
        lockedScale.current = Math.min(viewport.width * 0.15, viewport.height * 0.18, 0.8);
    }
    const scale = lockedScale.current ?? 0.5;

    const { positions, colors } = useMemo(() => {
        const count = 6000;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const arms = 4;

        for (let i = 0; i < count; i++) {
            const arm = i % arms;
            const armAngle = (arm / arms) * Math.PI * 2;

            /* Distance from center */
            const dist = Math.pow(Math.random(), 0.6) * 4;

            /* Spiral angle */
            const spiralAngle = dist * 1.2 + armAngle;

            /* Spread — more at outer edges */
            const spread = dist * 0.15;
            const offX = (Math.random() - 0.5) * spread;
            const offY = (Math.random() - 0.5) * 0.15;
            const offZ = (Math.random() - 0.5) * spread;

            pos[i * 3] = (Math.cos(spiralAngle) * dist + offX) * scale;
            pos[i * 3 + 1] = offY * scale;
            pos[i * 3 + 2] = (Math.sin(spiralAngle) * dist + offZ) * scale;

            /* Color: center=warm white, arms=cyan/blue */
            const t = dist / 4;
            if (t < 0.3) {
                col[i * 3] = 1;
                col[i * 3 + 1] = 0.9;
                col[i * 3 + 2] = 0.7;
            } else if (Math.random() > 0.5) {
                col[i * 3] = 0;
                col[i * 3 + 1] = 0.7 + Math.random() * 0.3;
                col[i * 3 + 2] = 1;
            } else {
                col[i * 3] = 0.6 + Math.random() * 0.4;
                col[i * 3 + 1] = 0.6 + Math.random() * 0.4;
                col[i * 3 + 2] = 0.8 + Math.random() * 0.2;
            }
        }

        return { positions: pos, colors: col };
    }, [scale]);

    useFrame((_, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.03;
        }
    });

    return (
        <points ref={pointsRef} rotation={[Math.PI * 0.35, 0, 0.2]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    array={colors}
                    count={colors.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ── Bright galaxy core ── */
function GalaxyCore() {
    const coreRef = useRef();

    useFrame((state) => {
        if (coreRef.current) {
            const t = state.clock.elapsedTime;
            coreRef.current.material.opacity = 0.15 + Math.sin(t * 0.4) * 0.03;
        }
    });

    return (
        <mesh ref={coreRef}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial
                color="#ffe8c0"
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ── Canvas wrapper ── */
export default function Galaxy() {
    return (
        <div className="relative w-full h-[250px] sm:h-[320px] lg:h-[400px] overflow-hidden z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 2, 6], fov: 40 }}
                gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <GalaxyParticles />
                <GalaxyCore />
            </Canvas>
        </div>
    );
}
