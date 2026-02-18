import { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Event Horizon Shader — gravitational lensing distortion ── */
class EventHorizonMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                glowColor: { value: new THREE.Color('#ff6000') },
                coeficient: { value: 0.6 },
                power: { value: 4.0 },
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
          gl_FragColor = vec4(glowColor, intensity * 0.7);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            depthWrite: false,
        });
    }
}

extend({ EventHorizonMaterial });

/* ── Accretion disk with sun texture for realistic hot plasma ── */
function AccretionDisk({ scale }) {
    const diskRef = useRef();
    const sunMap = useTexture('/textures/sun.jpg');

    /* Make the texture repeat to look like a hot plasma ring */
    useMemo(() => {
        sunMap.wrapS = THREE.RepeatWrapping;
        sunMap.wrapT = THREE.RepeatWrapping;
        sunMap.repeat.set(3, 1);
    }, [sunMap]);

    useFrame((state, delta) => {
        if (diskRef.current) {
            diskRef.current.rotation.z += delta * 0.12;
            /* Subtle UV animation via offset */
            sunMap.offset.x += delta * 0.02;
        }
    });

    return (
        <mesh ref={diskRef} rotation={[Math.PI * 0.47, 0.08, 0]}>
            <ringGeometry args={[1.5 * scale, 3.8 * scale, 128]} />
            <meshBasicMaterial
                map={sunMap}
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ── Thin photon ring — the bright Einstein ring ── */
function PhotonRing({ scale }) {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            const t = state.clock.elapsedTime;
            ringRef.current.material.opacity = 0.3 + Math.sin(t * 0.6) * 0.08;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI * 0.47, 0.08, 0]}>
            <torusGeometry args={[1.8 * scale, 0.035 * scale, 16, 128]} />
            <meshBasicMaterial
                color="#ff9040"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </mesh>
    );
}

/* ── The event horizon (pure black sphere) ── */
function EventHorizon({ scale }) {
    return (
        <mesh>
            <sphereGeometry args={[1.3 * scale, 64, 64]} />
            <meshBasicMaterial color="#000000" />
        </mesh>
    );
}

/* ── Orange glow around the black hole ── */
function OuterGlow({ scale }) {
    const glowRef = useRef();
    const atmosRef = useRef();

    useFrame((state) => {
        if (glowRef.current) {
            const t = state.clock.elapsedTime;
            glowRef.current.material.opacity = 0.06 + Math.sin(t * 0.25) * 0.02;
            glowRef.current.scale.setScalar(1 + Math.sin(t * 0.15) * 0.015);
        }
    });

    return (
        <>
            {/* Volumetric glow sphere */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2.5 * scale, 32, 32]} />
                <meshBasicMaterial
                    color="#ff5000"
                    transparent
                    opacity={0.06}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
            {/* Fresnel atmosphere glow */}
            <mesh ref={atmosRef} scale={[1.15, 1.15, 1.15]}>
                <sphereGeometry args={[1.3 * scale, 64, 64]} />
                <eventHorizonMaterial />
            </mesh>
        </>
    );
}

/* ── Complete black hole with texture ── */
function BlackHoleWithTexture() {
    const { viewport } = useThree();
    const lockedScale = useRef(null);

    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.5) / 3.8;
        const byWidth = (viewport.width * 0.55) / 3.8;
        lockedScale.current = Math.min(byHeight, byWidth, 0.85);
    }
    const scale = lockedScale.current ?? 0.5;

    return (
        <group>
            <EventHorizon scale={scale} />
            <AccretionDisk scale={scale} />
            <PhotonRing scale={scale} />
            <OuterGlow scale={scale} />
        </group>
    );
}

/* ── Procedural fallback accretion disk ── */
function createAccretionTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, 'rgba(255,120,0,0)');
    grad.addColorStop(0.15, 'rgba(255,100,20,0.5)');
    grad.addColorStop(0.3, 'rgba(255,180,60,0.8)');
    grad.addColorStop(0.5, 'rgba(255,255,200,1)');
    grad.addColorStop(0.7, 'rgba(255,160,40,0.8)');
    grad.addColorStop(0.85, 'rgba(200,60,10,0.3)');
    grad.addColorStop(1, 'rgba(100,20,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 64);

    return new THREE.CanvasTexture(canvas);
}

function BlackHoleFallback() {
    const { viewport } = useThree();
    const lockedScale = useRef(null);
    const diskRef = useRef();
    const diskTexture = useMemo(() => createAccretionTexture(), []);

    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.5) / 3.8;
        const byWidth = (viewport.width * 0.55) / 3.8;
        lockedScale.current = Math.min(byHeight, byWidth, 0.85);
    }
    const scale = lockedScale.current ?? 0.5;

    useFrame((_, delta) => {
        if (diskRef.current) diskRef.current.rotation.z += delta * 0.12;
    });

    return (
        <group>
            <EventHorizon scale={scale} />
            <mesh ref={diskRef} rotation={[Math.PI * 0.47, 0.08, 0]}>
                <ringGeometry args={[1.5 * scale, 3.8 * scale, 128]} />
                <meshBasicMaterial
                    map={diskTexture}
                    transparent opacity={0.85}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
            <PhotonRing scale={scale} />
            <OuterGlow scale={scale} />
        </group>
    );
}

/* ── Error boundary ── */
class BlackHoleErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

/* ── Exported component ── */
export default function BlackHole() {
    return (
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[480px] overflow-hidden z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 1.2, 8], fov: 35 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <BlackHoleErrorBoundary fallback={<BlackHoleFallback />}>
                    <Suspense fallback={<BlackHoleFallback />}>
                        <BlackHoleWithTexture />
                    </Suspense>
                </BlackHoleErrorBoundary>
            </Canvas>

            {/* CSS glow behind canvas */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,80,0,0.05) 0%, transparent 55%)',
                }}
            />
        </div>
    );
}
