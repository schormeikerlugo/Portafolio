import { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Earth Atmosphere Shader (Fresnel glow — blue) ── */
class EarthAtmosphereMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                glowColor: { value: new THREE.Color('#4da6ff') },
                coeficient: { value: 0.7 },
                power: { value: 3.2 },
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

extend({ EarthAtmosphereMaterial });

/* ── Galaxy star particles ── */
function GalaxyStars({ scale }) {
    const pointsRef = useRef();

    const { positions, colors } = useMemo(() => {
        const count = 8000;
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const arms = 4;

        for (let i = 0; i < count; i++) {
            const arm = i % arms;
            const armAngle = (arm / arms) * Math.PI * 2;
            const dist = Math.pow(Math.random(), 0.55) * 5;
            const spiralAngle = dist * 1.1 + armAngle;
            const spread = dist * 0.12;

            pos[i * 3] = (Math.cos(spiralAngle) * dist + (Math.random() - 0.5) * spread) * scale;
            pos[i * 3 + 1] = ((Math.random() - 0.5) * 0.12) * scale;
            pos[i * 3 + 2] = (Math.sin(spiralAngle) * dist + (Math.random() - 0.5) * spread) * scale;

            const t = dist / 5;
            if (t < 0.25) {
                col[i * 3] = 1; col[i * 3 + 1] = 0.92; col[i * 3 + 2] = 0.75;
            } else if (Math.random() > 0.4) {
                col[i * 3] = 0.3; col[i * 3 + 1] = 0.7 + Math.random() * 0.3; col[i * 3 + 2] = 1;
            } else {
                col[i * 3] = 0.7 + Math.random() * 0.3;
                col[i * 3 + 1] = 0.7 + Math.random() * 0.3;
                col[i * 3 + 2] = 0.85 + Math.random() * 0.15;
            }
        }
        return { positions: pos, colors: col };
    }, [scale]);

    useFrame((_, delta) => {
        if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.025;
    });

    return (
        <points ref={pointsRef} rotation={[Math.PI * 0.35, 0, 0.15]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
                <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                vertexColors
                transparent
                opacity={0.85}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ── Earth with NASA texture (focal point of galaxy) ── */
function EarthWithTexture({ scale }) {
    const meshRef = useRef();
    const atmosRef = useRef();
    const colorMap = useTexture('/textures/earth.jpg');

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.08;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.06;
    });

    const r = 0.4 * scale;

    return (
        <group position={[1.2 * scale, 0.1 * scale, 0.5 * scale]}>
            <mesh ref={meshRef} rotation={[0.2, 0, 0.1]}>
                <sphereGeometry args={[r, 64, 64]} />
                <meshPhysicalMaterial
                    map={colorMap}
                    roughness={0.6}
                    metalness={0.0}
                    clearcoat={0.15}
                    clearcoatRoughness={0.7}
                />
            </mesh>
            <mesh ref={atmosRef} scale={[1.06, 1.06, 1.06]} rotation={[0.2, 0, 0.1]}>
                <sphereGeometry args={[r, 32, 32]} />
                <earthAtmosphereMaterial />
            </mesh>
        </group>
    );
}

/* ── Galaxy core glow ── */
function GalaxyCore({ scale }) {
    const coreRef = useRef();

    useFrame((state) => {
        if (coreRef.current) {
            const t = state.clock.elapsedTime;
            coreRef.current.material.opacity = 0.2 + Math.sin(t * 0.35) * 0.04;
        }
    });

    return (
        <mesh ref={coreRef}>
            <sphereGeometry args={[0.2 * scale, 16, 16]} />
            <meshBasicMaterial
                color="#ffe8c0"
                transparent
                opacity={0.2}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

/* ── Full Galaxy with Earth texture ── */
function GalaxyWithTexture() {
    const { viewport } = useThree();
    const lockedScale = useRef(null);

    if (lockedScale.current === null && viewport.width > 0.1) {
        lockedScale.current = Math.min(viewport.width * 0.12, viewport.height * 0.14, 0.65);
    }
    const scale = lockedScale.current ?? 0.4;

    return (
        <group>
            <GalaxyStars scale={scale} />
            <GalaxyCore scale={scale} />
            <EarthWithTexture scale={scale} />
        </group>
    );
}

/* ── Fallback without Earth texture ── */
function GalaxyFallback() {
    const { viewport } = useThree();
    const lockedScale = useRef(null);

    if (lockedScale.current === null && viewport.width > 0.1) {
        lockedScale.current = Math.min(viewport.width * 0.12, viewport.height * 0.14, 0.65);
    }
    const scale = lockedScale.current ?? 0.4;

    return (
        <group>
            <GalaxyStars scale={scale} />
            <GalaxyCore scale={scale} />
        </group>
    );
}

/* ── Error boundary ── */
class GalaxyErrorBoundary extends Component {
    constructor(props) { super(props); this.state = { hasError: false }; }
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

/* ── Lights ── */
function Lights() {
    return (
        <>
            <ambientLight intensity={0.2} color="#c8d0e8" />
            <directionalLight position={[4, 3, 4]} intensity={1.5} color="#fff8f0" />
            <pointLight position={[-3, 2, -3]} intensity={0.6} color="#4488cc" distance={20} />
        </>
    );
}

/* ── Exported component ── */
export default function Galaxy() {
    return (
        <div className="relative w-full h-[280px] sm:h-[360px] lg:h-[420px] overflow-hidden z-10 pointer-events-none">
            <Canvas
                camera={{ position: [0, 2, 6], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Lights />
                <GalaxyErrorBoundary fallback={<GalaxyFallback />}>
                    <Suspense fallback={<GalaxyFallback />}>
                        <GalaxyWithTexture />
                    </Suspense>
                </GalaxyErrorBoundary>
            </Canvas>
        </div>
    );
}
