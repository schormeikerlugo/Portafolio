import { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Atmosphere Fresnel Shader (identical technique to Jupiter) ── */
class SaturnAtmosphereMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                glowColor: { value: new THREE.Color('#d4a050') },
                coeficient: { value: 0.8 },
                power: { value: 3.5 },
            },
            vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform vec3 glowColor;
        uniform float coeficient;
        uniform float power;
        varying vec3 vNormal;
        varying vec3 vPositionNormal;
        void main() {
          float intensity = pow(coeficient + dot(vNormal, vPositionNormal), power);
          gl_FragColor = vec4(glowColor, intensity * 0.6);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            depthWrite: false,
        });
    }
}

extend({ SaturnAtmosphereMaterial });

/* ── Ring texture (procedural, high quality) ── */
function createRingTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 2048, 0);
    grad.addColorStop(0, 'rgba(180,160,120,0)');
    grad.addColorStop(0.05, 'rgba(200,180,140,0.02)');
    grad.addColorStop(0.1, 'rgba(210,185,140,0.25)');
    grad.addColorStop(0.18, 'rgba(200,175,135,0.5)');
    grad.addColorStop(0.22, 'rgba(180,160,120,0.08)');
    grad.addColorStop(0.25, 'rgba(220,200,160,0.55)');
    grad.addColorStop(0.32, 'rgba(210,190,150,0.7)');
    grad.addColorStop(0.38, 'rgba(200,180,140,0.6)');
    grad.addColorStop(0.42, 'rgba(180,160,120,0.1)');
    grad.addColorStop(0.45, 'rgba(195,175,135,0.4)');
    grad.addColorStop(0.55, 'rgba(210,185,145,0.65)');
    grad.addColorStop(0.62, 'rgba(200,180,140,0.5)');
    grad.addColorStop(0.7, 'rgba(190,170,130,0.35)');
    grad.addColorStop(0.8, 'rgba(180,160,120,0.15)');
    grad.addColorStop(0.9, 'rgba(170,150,110,0.05)');
    grad.addColorStop(1, 'rgba(160,140,100,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 2048, 64);

    /* Detailed ring structure lines */
    for (let i = 0; i < 150; i++) {
        const x = Math.random() * 2048;
        const w = 1 + Math.random() * 3;
        ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.05})`;
        ctx.fillRect(x, 0, w, 64);
    }
    /* Dark gaps (Cassini division, Encke gap) */
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(440, 0, 12, 64);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(1500, 0, 6, 64);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    return tex;
}

/* ── Saturn Rings ── */
function SaturnRings({ planetRadius }) {
    const ringRef = useRef();
    const ringTexture = useMemo(() => createRingTexture(), []);

    useFrame((_, delta) => {
        if (ringRef.current) ringRef.current.rotation.z += delta * 0.008;
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI * 0.5, 0, 0]}>
            <ringGeometry args={[planetRadius * 1.3, planetRadius * 2.5, 128]} />
            <meshBasicMaterial
                map={ringTexture}
                transparent
                opacity={0.8}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}

/* ── Saturn with real NASA texture ── */
function SaturnWithTexture() {
    const meshRef = useRef();
    const atmosRef = useRef();
    const lockedScale = useRef(null);
    const { viewport } = useThree();

    // Lock scale — Robust ring-aware scaling (Ring diameter is approx 10.5 units)
    if (lockedScale.current === null && viewport.width > 0.1) {
        const targetDiameter = 12.0; // Use 12.0 to provide a safe margin for 10.5 rings
        const byHeight = (viewport.height * 0.85) / targetDiameter;
        const byWidth = (viewport.width * 0.85) / targetDiameter;
        lockedScale.current = Math.min(byHeight, byWidth, 1.25);
    }
    const scale = lockedScale.current ?? 1.0;

    const colorMap = useTexture('/textures/saturn_realistic.jpg');

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.04;
    });

    const planetRadius = 2.1;

    return (
        <group scale={scale} rotation={[Math.PI * 0.15, 0, Math.PI * 0.04]}>
            {/* Planet body — slightly oblate like real Saturn */}
            <mesh ref={meshRef} rotation={[0, 0, 0]} scale={[1, 0.91, 1]}>
                <sphereGeometry args={[planetRadius, 128, 128]} />
                <meshPhysicalMaterial
                    map={colorMap}
                    roughness={0.7}
                    metalness={0.0}
                    clearcoat={0.1}
                    clearcoatRoughness={0.8}
                />
            </mesh>
            {/* Atmosphere glow */}
            <mesh ref={atmosRef} scale={[1.05, 0.97, 1.05]} rotation={[0, 0, 0]}>
                <sphereGeometry args={[2, 64, 64]} />
                <saturnAtmosphereMaterial />
            </mesh>
            {/* Rings */}
            <SaturnRings planetRadius={planetRadius} />
        </group>
    );
}

/* ── Procedural fallback (identical structure to Jupiter fallback) ── */
function createSaturnFallbackTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, 0, 512);
    base.addColorStop(0, '#c4a35a');
    base.addColorStop(0.15, '#d4b06a');
    base.addColorStop(0.3, '#b8944e');
    base.addColorStop(0.38, '#dcc080');
    base.addColorStop(0.45, '#c09855');
    base.addColorStop(0.52, '#d4b070');
    base.addColorStop(0.58, '#a08848');
    base.addColorStop(0.65, '#c8a878');
    base.addColorStop(0.72, '#8b7840');
    base.addColorStop(0.8, '#d0b890');
    base.addColorStop(0.9, '#b89870');
    base.addColorStop(1, '#c4a35a');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 1024, 512);

    const bands = [
        { y: 40, h: 20, color: 'rgba(160,130,70,0.5)' },
        { y: 80, h: 15, color: 'rgba(200,175,120,0.4)' },
        { y: 130, h: 30, color: 'rgba(140,110,60,0.6)' },
        { y: 180, h: 18, color: 'rgba(220,195,140,0.35)' },
        { y: 220, h: 35, color: 'rgba(120,95,50,0.55)' },
        { y: 280, h: 25, color: 'rgba(180,150,100,0.45)' },
        { y: 330, h: 40, color: 'rgba(100,80,40,0.6)' },
        { y: 390, h: 20, color: 'rgba(200,175,120,0.4)' },
        { y: 430, h: 30, color: 'rgba(150,120,70,0.5)' },
    ];

    for (const band of bands) {
        ctx.fillStyle = band.color;
        ctx.fillRect(0, band.y, 1024, band.h);
        for (let x = 0; x < 1024; x += 2) {
            const offset = Math.sin(x * 0.015) * 3 + Math.sin(x * 0.04) * 1.5;
            ctx.fillStyle = `rgba(${80 + Math.random() * 60}, ${70 + Math.random() * 50}, ${30 + Math.random() * 30}, ${0.06 + Math.random() * 0.04})`;
            ctx.fillRect(x, band.y + offset, 3, band.h * 0.6);
        }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
}

function SaturnFallback() {
    const meshRef = useRef();
    const atmosRef = useRef();
    const lockedScale = useRef(null);
    const { viewport } = useThree();

    if (lockedScale.current === null && viewport.width > 0.1) {
        const targetDiameter = 12.0;
        const byHeight = (viewport.height * 0.85) / targetDiameter;
        const byWidth = (viewport.width * 0.85) / targetDiameter;
        lockedScale.current = Math.min(byHeight, byWidth, 1.25);
    }
    const scale = lockedScale.current ?? 0.8;
    const texture = useMemo(() => createSaturnFallbackTexture(), []);

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.04;
    });

    const planetRadius = 2.1;

    return (
        <group scale={scale}>
            <mesh ref={meshRef} rotation={[0.1, 0, 0.05]} scale={[1, 0.91, 1]}>
                <sphereGeometry args={[planetRadius, 128, 128]} />
                <meshPhysicalMaterial
                    map={texture}
                    roughness={0.7}
                    metalness={0.0}
                    clearcoat={0.1}
                    clearcoatRoughness={0.8}
                />
            </mesh>
            <mesh ref={atmosRef} scale={[1.05, 0.97, 1.05]} rotation={[0.1, 0, 0.05]}>
                <sphereGeometry args={[2.1, 64, 64]} />
                <saturnAtmosphereMaterial />
            </mesh>
            <SaturnRings planetRadius={planetRadius} />
        </group>
    );
}

/* ── Error boundary (identical to Jupiter) ── */
class SaturnErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

/* ── Scene Lights (identical to Jupiter) ── */
function Lights() {
    return (
        <>
            <ambientLight intensity={0.3} color="#e8e0d8" />
            <directionalLight position={[6, 4, 6]} intensity={2.2} color="#fff8f0" />
            <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#8ab4f0" />
            <pointLight position={[-6, 2, -6]} intensity={1.5} color="#5588cc" distance={30} />
            <pointLight position={[0, -5, 2]} intensity={0.3} color="#000000" distance={20} />
        </>
    );
}

/* ── Exported component ── */
export default function Saturn() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Lights />
                <SaturnErrorBoundary
                    fallback={<SaturnFallback />}
                >
                    <Suspense fallback={<SaturnFallback />}>
                        <SaturnWithTexture />
                    </Suspense>
                </SaturnErrorBoundary>
            </Canvas>
        </div>
    );
}
