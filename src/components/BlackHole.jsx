import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Accretion disk texture (bright ring of light) ── */
function createAccretionTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(255,120,0,0)');
    grad.addColorStop(0.05, 'rgba(255,60,0,0.1)');
    grad.addColorStop(0.15, 'rgba(255,100,20,0.5)');
    grad.addColorStop(0.25, 'rgba(255,160,40,0.8)');
    grad.addColorStop(0.35, 'rgba(255,200,100,1)');
    grad.addColorStop(0.45, 'rgba(255,230,180,1)');
    grad.addColorStop(0.5, 'rgba(255,255,220,1)');
    grad.addColorStop(0.55, 'rgba(255,230,180,1)');
    grad.addColorStop(0.65, 'rgba(255,180,60,0.8)');
    grad.addColorStop(0.75, 'rgba(255,120,20,0.5)');
    grad.addColorStop(0.85, 'rgba(200,60,10,0.2)');
    grad.addColorStop(1, 'rgba(100,20,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    return tex;
}

/* ── Accretion disk ring ── */
function AccretionDisk({ scale }) {
    const diskRef = useRef();
    const texture = useMemo(() => createAccretionTexture(), []);

    useFrame((_, delta) => {
        if (diskRef.current) {
            diskRef.current.rotation.z += delta * 0.15;
        }
    });

    return (
        <mesh ref={diskRef} rotation={[Math.PI * 0.48, 0.1, 0]}>
            <ringGeometry args={[1.4 * scale, 3.5 * scale, 96]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ── Gravitational lensing ring (the Einstein ring) ── */
function LensingRing({ scale }) {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            const t = state.clock.elapsedTime;
            ringRef.current.material.opacity = 0.15 + Math.sin(t * 0.5) * 0.05;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI * 0.5, 0, 0]}>
            <torusGeometry args={[1.8 * scale, 0.03 * scale, 16, 100]} />
            <meshBasicMaterial
                color="#ff9040"
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ── The black sphere (event horizon) ── */
function EventHorizon({ scale }) {
    return (
        <mesh>
            <sphereGeometry args={[1.2 * scale, 48, 32]} />
            <meshBasicMaterial color="#000000" />
        </mesh>
    );
}

/* ── Glow around the black hole ── */
function BlackHoleGlow({ scale }) {
    const glowRef = useRef();

    useFrame((state) => {
        if (glowRef.current) {
            const t = state.clock.elapsedTime;
            glowRef.current.material.opacity = 0.08 + Math.sin(t * 0.3) * 0.03;
            glowRef.current.scale.setScalar(1 + Math.sin(t * 0.2) * 0.02);
        }
    });

    return (
        <mesh ref={glowRef}>
            <sphereGeometry args={[2.0 * scale, 32, 32]} />
            <meshBasicMaterial
                color="#ff6000"
                transparent
                opacity={0.08}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

/* ── Complete scene ── */
function BlackHoleScene() {
    const { viewport } = useThree();
    const lockedScale = useRef(null);

    if (lockedScale.current === null && viewport.width > 0.1) {
        const s = Math.min(viewport.width * 0.14, viewport.height * 0.16, 0.7);
        lockedScale.current = s;
    }
    const scale = lockedScale.current ?? 0.45;

    return (
        <group>
            <EventHorizon scale={scale} />
            <AccretionDisk scale={scale} />
            <LensingRing scale={scale} />
            <BlackHoleGlow scale={scale} />
        </group>
    );
}

/* ── Canvas wrapper ── */
export default function BlackHole() {
    return (
        <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[450px] overflow-hidden z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 1.5, 8], fov: 35 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <BlackHoleScene />
            </Canvas>

            {/* CSS radial glow behind the canvas */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,100,0,0.06) 0%, transparent 60%)',
                }}
            />
        </div>
    );
}
