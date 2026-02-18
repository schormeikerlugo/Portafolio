import { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Atmosphere Fresnel Shader (same technique as Jupiter) ── */
class SaturnAtmosphereMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                glowColor: { value: new THREE.Color('#d4a050') },
                coeficient: { value: 0.75 },
                power: { value: 3.0 },
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
          gl_FragColor = vec4(glowColor, intensity * 0.5);
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
    canvas.width = 1024;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1024, 0);
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
    ctx.fillRect(0, 0, 1024, 64);

    /* Subtle ring detail lines */
    for (let i = 0; i < 80; i++) {
        const x = Math.random() * 1024;
        const w = 1 + Math.random() * 2;
        ctx.fillStyle = `rgba(255,255,255,${0.02 + Math.random() * 0.04})`;
        ctx.fillRect(x, 0, w, 64);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    return tex;
}

/* ── Saturn Rings ── */
function SaturnRings({ planetRadius }) {
    const ringRef = useRef();
    const ringTexture = useMemo(() => createRingTexture(), []);

    useFrame((_, delta) => {
        if (ringRef.current) ringRef.current.rotation.z += delta * 0.015;
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI * 0.42, 0, 0.15]}>
            <ringGeometry args={[planetRadius * 1.3, planetRadius * 2.5, 128]} />
            <meshBasicMaterial
                map={ringTexture}
                transparent
                opacity={0.75}
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

    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.55) / 2.1;
        const byWidth = (viewport.width * 0.6) / 2.1;
        lockedScale.current = Math.min(byHeight, byWidth, 1.1);
    }
    const scale = lockedScale.current ?? 0.6;

    const colorMap = useTexture('/textures/saturn.jpg');

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.04;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.03;
    });

    const planetRadius = 2.1;

    return (
        <group scale={scale}>
            {/* Planet body — slightly oblate */}
            <mesh ref={meshRef} rotation={[0.15, 0, 0.05]} scale={[1, 0.92, 1]}>
                <sphereGeometry args={[planetRadius, 128, 128]} />
                <meshPhysicalMaterial
                    map={colorMap}
                    roughness={0.75}
                    metalness={0.0}
                    clearcoat={0.08}
                    clearcoatRoughness={0.85}
                />
            </mesh>
            {/* Atmosphere glow */}
            <mesh ref={atmosRef} scale={[1.06, 0.98, 1.06]} rotation={[0.15, 0, 0.05]}>
                <sphereGeometry args={[planetRadius, 64, 64]} />
                <saturnAtmosphereMaterial />
            </mesh>
            {/* Rings */}
            <SaturnRings planetRadius={planetRadius} />
        </group>
    );
}

/* ── Procedural fallback ── */
function createSaturnFallbackTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#c4a35a');
    grad.addColorStop(0.2, '#d4b06a');
    grad.addColorStop(0.35, '#b8944e');
    grad.addColorStop(0.5, '#c9a95f');
    grad.addColorStop(0.65, '#a88840');
    grad.addColorStop(0.8, '#d1ad65');
    grad.addColorStop(1, '#b89048');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    for (let i = 0; i < 50; i++) {
        const y = Math.random() * 512;
        const h = 1 + Math.random() * 8;
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? 255 : 0},${Math.random() > 0.5 ? 200 : 0},${Math.random() > 0.5 ? 150 : 0},${0.04 + Math.random() * 0.1})`;
        ctx.fillRect(0, y, 1024, h);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    return texture;
}

function SaturnFallback() {
    const meshRef = useRef();
    const atmosRef = useRef();
    const lockedScale = useRef(null);
    const { viewport } = useThree();

    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.55) / 2.1;
        const byWidth = (viewport.width * 0.6) / 2.1;
        lockedScale.current = Math.min(byHeight, byWidth, 1.1);
    }
    const scale = lockedScale.current ?? 0.6;
    const texture = useMemo(() => createSaturnFallbackTexture(), []);

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.04;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.03;
    });

    const planetRadius = 2.1;

    return (
        <group scale={scale}>
            <mesh ref={meshRef} rotation={[0.15, 0, 0.05]} scale={[1, 0.92, 1]}>
                <sphereGeometry args={[planetRadius, 128, 128]} />
                <meshPhysicalMaterial map={texture} roughness={0.75} metalness={0.0} clearcoat={0.08} clearcoatRoughness={0.85} />
            </mesh>
            <mesh ref={atmosRef} scale={[1.06, 0.98, 1.06]} rotation={[0.15, 0, 0.05]}>
                <sphereGeometry args={[planetRadius, 64, 64]} />
                <saturnAtmosphereMaterial />
            </mesh>
            <SaturnRings planetRadius={planetRadius} />
        </group>
    );
}

/* ── Error boundary ── */
class SaturnErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

/* ── Lights ── */
function Lights() {
    return (
        <>
            <ambientLight intensity={0.25} color="#e8ddd0" />
            <directionalLight position={[5, 3, 5]} intensity={2.0} color="#fff5e0" />
            <directionalLight position={[-3, -2, 3]} intensity={0.4} color="#8ab4f0" />
            <pointLight position={[-5, 2, -5]} intensity={1.0} color="#5588cc" distance={30} />
        </>
    );
}

/* ── Exported component ── */
export default function Saturn() {
    return (
        <div className="relative w-full h-[300px] sm:h-[380px] lg:h-[420px] overflow-hidden z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0.5, 8], fov: 38 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Lights />
                <SaturnErrorBoundary fallback={<SaturnFallback />}>
                    <Suspense fallback={<SaturnFallback />}>
                        <SaturnWithTexture />
                    </Suspense>
                </SaturnErrorBoundary>
            </Canvas>
        </div>
    );
}
