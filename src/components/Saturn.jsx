import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Procedural Saturn texture ── */
function createSaturnTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    /* Base warm tan/gold */
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#c4a35a');
    grad.addColorStop(0.2, '#d4b06a');
    grad.addColorStop(0.35, '#b8944e');
    grad.addColorStop(0.5, '#c9a95f');
    grad.addColorStop(0.65, '#a88840');
    grad.addColorStop(0.8, '#d1ad65');
    grad.addColorStop(1, '#b89048');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 256);

    /* Horizontal bands */
    for (let i = 0; i < 40; i++) {
        const y = Math.random() * 256;
        const h = 1 + Math.random() * 6;
        const alpha = 0.05 + Math.random() * 0.15;
        const lightness = Math.random() > 0.5 ? 255 : 0;
        ctx.fillStyle = `rgba(${lightness},${lightness},${lightness > 0 ? lightness - 50 : 0},${alpha})`;
        ctx.fillRect(0, y, 512, h);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
}

/* ── Ring geometry — flat disk with inner/outer radius ── */
function SaturnRings({ scale }) {
    const ringRef = useRef();

    const ringTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');

        /* Transparent → rings → transparent */
        const grad = ctx.createLinearGradient(0, 0, 512, 0);
        grad.addColorStop(0, 'rgba(180,160,120,0)');
        grad.addColorStop(0.1, 'rgba(200,180,140,0.05)');
        grad.addColorStop(0.15, 'rgba(210,185,140,0.4)');
        grad.addColorStop(0.25, 'rgba(190,170,130,0.6)');
        grad.addColorStop(0.3, 'rgba(180,160,120,0.1)');
        grad.addColorStop(0.35, 'rgba(200,175,135,0.5)');
        grad.addColorStop(0.5, 'rgba(220,195,155,0.7)');
        grad.addColorStop(0.6, 'rgba(200,180,140,0.3)');
        grad.addColorStop(0.7, 'rgba(190,170,130,0.5)');
        grad.addColorStop(0.85, 'rgba(180,160,120,0.2)');
        grad.addColorStop(1, 'rgba(160,140,100,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 64);

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.ClampToEdgeWrapping;
        return tex;
    }, []);

    useFrame((_, delta) => {
        if (ringRef.current) {
            ringRef.current.rotation.z += delta * 0.02;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI * 0.42, 0, 0.15]}>
            <ringGeometry args={[1.3 * scale, 2.4 * scale, 64]} />
            <meshBasicMaterial
                map={ringTexture}
                transparent
                opacity={0.7}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}

/* ── Saturn sphere ── */
function SaturnSphere() {
    const meshRef = useRef();
    const { viewport } = useThree();

    /* Lock scale on first render */
    const lockedScale = useRef(null);
    if (lockedScale.current === null && viewport.width > 0.1) {
        const s = Math.min(viewport.width * 0.12, viewport.height * 0.14, 0.55);
        lockedScale.current = s;
    }
    const scale = lockedScale.current ?? 0.35;

    const texture = useMemo(() => createSaturnTexture(), []);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Planet body */}
            <mesh ref={meshRef} scale={[scale, scale * 0.9, scale]}>
                <sphereGeometry args={[4.2, 48, 32]} />
                <meshStandardMaterial
                    map={texture}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Rings */}
            <SaturnRings scale={scale * 4.2} />
        </group>
    );
}

/* ── Canvas wrapper ── */
function SaturnCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 40 }}
            gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
            dpr={[1, 1.5]}
            style={{ background: 'transparent' }}
        >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 3, 5]} intensity={1.2} color="#fff5e0" />
            <pointLight position={[-3, -2, 4]} intensity={0.3} color="#00e5ff" />
            <SaturnSphere />
        </Canvas>
    );
}

/* ── Exported component ── */
export default function Saturn() {
    return (
        <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px] overflow-hidden z-10 pointer-events-none">
            <SaturnCanvas />
        </div>
    );
}
