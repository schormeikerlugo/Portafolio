import { useRef, useMemo } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Star Surface Shader ── */
class StarSurfaceMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                time: { value: 0 },
                color1: { value: new THREE.Color('#ff2200') },
                color2: { value: new THREE.Color('#881100') },
            },
            vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;

        // Simple noise function
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          float t = time * 0.2;
          vec2 p = vUv * 5.0;
          float n = noise(p + t) * 0.5 + noise(p * 2.0 - t) * 0.25;
          vec3 color = mix(color1, color2, n);
          
          // Enhanced brightness toward edges
          float edgeAlpha = pow(1.0 - dot(vNormal, vec3(0,0,1)), 2.0);
          color += color1 * edgeAlpha * 0.5;
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
        });
    }
}

/* ── Coronal Glow Shader ── */
class CoronaMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                glowColor: { value: new THREE.Color('#ff4400') },
                coeficient: { value: 0.8 },
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
          gl_FragColor = vec4(glowColor, intensity * 0.8);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.BackSide,
            depthWrite: false,
        });
    }
}

extend({ StarSurfaceMaterial, CoronaMaterial });

function RedStarContent() {
    const meshRef = useRef();
    const atmosRef = useRef();
    const { viewport } = useThree();
    const lockedScale = useRef(null);

    // Lock scale to target Jupiter-like prominence
    if (lockedScale.current === null && viewport.width > 0.1) {
        const byHeight = (viewport.height * 0.72) / 4;
        const byWidth = (viewport.width * 0.82) / 4;
        lockedScale.current = Math.min(byHeight, byWidth, 1.4);
    }
    const scale = lockedScale.current ?? 1.0;

    useFrame(({ clock }, delta) => {
        const time = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.material.uniforms.time.value = time;
            meshRef.current.rotation.y += delta * 0.1;
            // Pulsation
            const pulse = 1 + Math.sin(time * 0.5) * 0.02;
            meshRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    return (
        <group scale={scale}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 64, 64]} />
                <starSurfaceMaterial />
            </mesh>
            <mesh ref={atmosRef} scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[2, 64, 64]} />
                <coronaMaterial />
            </mesh>
        </group>
    );
}

function StarLights() {
    return (
        <>
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 0, 0]} intensity={2.5} color="#ffaa88" distance={20} />
            <directionalLight position={[5, 3, 5]} intensity={0.5} color="#ffd4aa" />
        </>
    );
}

export default function RedStar() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <StarLights />
                <RedStarContent />
            </Canvas>
        </div>
    );
}
