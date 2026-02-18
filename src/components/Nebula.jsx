import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Nebula particle cloud using Three.js ── */
function NebulaParticles() {
    const pointsRef = useRef();
    const { viewport } = useThree();

    const lockedScale = useRef(null);
    if (lockedScale.current === null && viewport.width > 0.1) {
        lockedScale.current = Math.min(viewport.width * 0.25, viewport.height * 0.3, 1.5);
    }
    const scale = lockedScale.current ?? 1.0;

    const { positions, colors, sizes } = useMemo(() => {
        const count = 4000;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const sz = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            /* Cloud distribution — Gaussian-like spread */
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = Math.pow(Math.random(), 0.4) * 6 * scale;

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.35;
            pos[i * 3 + 2] = r * Math.cos(phi);

            /* Color: mix of cyan, magenta, and white */
            const colorChoice = Math.random();
            if (colorChoice < 0.4) {
                /* Cyan nebula gas */
                col[i * 3] = 0;
                col[i * 3 + 1] = 0.7 + Math.random() * 0.3;
                col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
            } else if (colorChoice < 0.65) {
                /* Magenta / purple gas */
                col[i * 3] = 0.6 + Math.random() * 0.3;
                col[i * 3 + 1] = 0.1 + Math.random() * 0.2;
                col[i * 3 + 2] = 0.8 + Math.random() * 0.2;
            } else {
                /* White / warm stars */
                col[i * 3] = 0.8 + Math.random() * 0.2;
                col[i * 3 + 1] = 0.8 + Math.random() * 0.2;
                col[i * 3 + 2] = 0.9 + Math.random() * 0.1;
            }

            sz[i] = 0.02 + Math.random() * 0.04;
        }

        return { positions: pos, colors: col, sizes: sz };
    }, [scale]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.008;
            pointsRef.current.rotation.x += delta * 0.003;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
                <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                vertexColors
                transparent
                opacity={0.25}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ── Nebula core glow ── */
function NebulaGlow() {
    const glowRef = useRef();
    const glow2Ref = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (glowRef.current) {
            glowRef.current.material.opacity = 0.04 + Math.sin(t * 0.3) * 0.015;
        }
        if (glow2Ref.current) {
            glow2Ref.current.material.opacity = 0.03 + Math.cos(t * 0.25) * 0.01;
        }
    });

    return (
        <>
            <mesh ref={glowRef} position={[-1, 0, -1]}>
                <sphereGeometry args={[2.5, 16, 16]} />
                <meshBasicMaterial
                    color="#00e5ff"
                    transparent
                    opacity={0.04}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
            <mesh ref={glow2Ref} position={[1.5, 0, 0.5]}>
                <sphereGeometry args={[2, 16, 16]} />
                <meshBasicMaterial
                    color="#e040fb"
                    transparent
                    opacity={0.03}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </>
    );
}

/* ── Exported component (sits as background behind Skills) ── */
export default function Nebula() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
                style={{ background: 'transparent' }}
            >
                <NebulaParticles />
                <NebulaGlow />
            </Canvas>
        </div>
    );
}
