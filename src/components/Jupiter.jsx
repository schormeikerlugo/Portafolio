import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Atmosphere Fresnel Shader ── */
class AtmosphereMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                glowColor: { value: new THREE.Color('#4da6ff') },
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

extend({ AtmosphereMaterial });

/* ── Procedural fallback texture ── */
function createJupiterTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const base = ctx.createLinearGradient(0, 0, 0, 512);
    base.addColorStop(0, '#c4a882');
    base.addColorStop(0.15, '#d4b896');
    base.addColorStop(0.3, '#b8956a');
    base.addColorStop(0.38, '#e8d0b0');
    base.addColorStop(0.45, '#c09060');
    base.addColorStop(0.52, '#d4a070');
    base.addColorStop(0.58, '#a07848');
    base.addColorStop(0.65, '#c8a878');
    base.addColorStop(0.72, '#8b6840');
    base.addColorStop(0.8, '#d0b890');
    base.addColorStop(0.9, '#b89870');
    base.addColorStop(1, '#c4a882');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 1024, 512);

    const bands = [
        { y: 30, h: 25, color: 'rgba(160,120,80,0.6)' },
        { y: 70, h: 18, color: 'rgba(200,170,130,0.5)' },
        { y: 110, h: 35, color: 'rgba(140,100,60,0.7)' },
        { y: 160, h: 20, color: 'rgba(220,190,150,0.4)' },
        { y: 195, h: 40, color: 'rgba(120,85,50,0.65)' },
        { y: 250, h: 30, color: 'rgba(180,140,100,0.5)' },
        { y: 295, h: 45, color: 'rgba(100,70,40,0.7)' },
        { y: 355, h: 25, color: 'rgba(200,170,130,0.5)' },
        { y: 395, h: 35, color: 'rgba(150,110,70,0.6)' },
        { y: 445, h: 20, color: 'rgba(190,160,120,0.4)' },
    ];

    for (const band of bands) {
        ctx.fillStyle = band.color;
        ctx.fillRect(0, band.y, 1024, band.h);
        for (let x = 0; x < 1024; x += 2) {
            const offset = Math.sin(x * 0.02) * 4 + Math.sin(x * 0.05) * 2;
            ctx.fillStyle = `rgba(${80 + Math.random() * 60}, ${60 + Math.random() * 40}, ${30 + Math.random() * 30}, ${0.08 + Math.random() * 0.06})`;
            ctx.fillRect(x, band.y + offset, 3, band.h * 0.6);
        }
    }

    // Great Red Spot
    ctx.save();
    ctx.translate(680, 290);
    ctx.scale(1.6, 1);
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#b05030';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#c06040';
    ctx.fill();
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
}

/* ── Jupiter with NASA texture ── */
function JupiterWithTexture() {
    const meshRef = useRef();
    const atmosRef = useRef();
    const lockedScale = useRef(null);
    const { viewport } = useThree();

    // Lock scale on first meaningful render — prevents scroll-triggered recalculations
    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.78) / 4.2;
        const byWidth = (viewport.width * 0.90) / 4.2;
        lockedScale.current = Math.min(byHeight, byWidth, 1.44);
    }
    const scale = lockedScale.current ?? 0.8;

    const colorMap = useTexture('/textures/jupiter.jpg');

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.04;
    });

    return (
        <group scale={scale}>
            <mesh ref={meshRef} rotation={[0.1, 0, 0.05]}>
                <sphereGeometry args={[2.1, 128, 128]} />
                <meshPhysicalMaterial
                    map={colorMap}
                    roughness={0.7}
                    metalness={0.0}
                    clearcoat={0.1}
                    clearcoatRoughness={0.8}
                />
            </mesh>
            <mesh ref={atmosRef} scale={[1.05, 1.05, 1.05]} rotation={[0.1, 0, 0.05]}>
                <sphereGeometry args={[2, 64, 64]} />
                <atmosphereMaterial />
            </mesh>
        </group>
    );
}

/* ── Fallback: procedural Jupiter ── */
function JupiterFallback() {
    const meshRef = useRef();
    const atmosRef = useRef();
    const lockedScale = useRef(null);
    const { viewport } = useThree();

    // Lock scale on first meaningful render — prevents scroll-triggered recalculations
    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.78) / 4.2;
        const byWidth = (viewport.width * 0.90) / 4.2;
        lockedScale.current = Math.min(byHeight, byWidth, 1.44);
    }
    const scale = lockedScale.current ?? 0.8;
    const texture = useMemo(() => createJupiterTexture(), []);

    useFrame((_, delta) => {
        if (meshRef.current) meshRef.current.rotation.y += delta * 0.06;
        if (atmosRef.current) atmosRef.current.rotation.y += delta * 0.04;
    });

    return (
        <group scale={scale}>
            <mesh ref={meshRef} rotation={[0.1, 0, 0.05]}>
                <sphereGeometry args={[2.1, 128, 128]} />
                <meshPhysicalMaterial
                    map={texture}
                    roughness={0.7}
                    metalness={0.0}
                    clearcoat={0.1}
                    clearcoatRoughness={0.8}
                />
            </mesh>
            <mesh ref={atmosRef} scale={[1.05, 1.05, 1.05]} rotation={[0.1, 0, 0.05]}>
                <sphereGeometry args={[2.1, 64, 64]} />
                <atmosphereMaterial />
            </mesh>
        </group>
    );
}

/* ── Error boundary wrapper ── */
import { Component } from 'react';

class PlanetErrorBoundary extends Component {
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

/* ── Scene Lights ── */
function Lights() {
    return (
        <>
            <ambientLight intensity={0.3} color="#e8e0d8" />
            <directionalLight position={[6, 4, 6]} intensity={2.2} color="#fff8f0" />
            <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#8ab4f0" />
            <pointLight position={[-6, 2, -6]} intensity={1.5} color="#5588cc" distance={30} />
            <pointLight position={[0, -5, 2]} intensity={0.3} color="#000000ff" distance={20} />
        </>
    );
}

export default function JupiterScene() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Lights />
                <PlanetErrorBoundary
                    fallback={<JupiterFallback />}
                >
                    <Suspense fallback={<JupiterFallback />}>
                        <JupiterWithTexture />
                    </Suspense>
                </PlanetErrorBoundary>
            </Canvas>
        </div>
    );
}
