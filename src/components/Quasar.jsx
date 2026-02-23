import { useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Accretion Disk Shader ── */
class AccretionDiskMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color('#4466ff') },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 color;

        void main() {
          float dist = distance(vUv, vec2(0.5));
          if (dist > 0.5 || dist < 0.15) discard;
          
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float spiral = fract(angle * 3.0 + time * 2.0 + dist * 10.0);
          float alpha = smoothstep(0.5, 0.4, dist) * smoothstep(0.15, 0.2, dist);
          
          vec3 finalColor = color * (1.0 + spiral * 2.0);
          gl_FragColor = vec4(finalColor, alpha * 0.8 * spiral);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
        });
    }
}

/* ── Jet Beam Shader ── */
class JetMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                time: { value: 0 },
                color: { value: new THREE.Color('#00ffff') },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec3 color;

        void main() {
          float fade = 1.0 - vUv.y;
          float beam = 1.0 - abs(vUv.x - 0.5) * 4.0;
          beam = clamp(beam, 0.0, 1.0);
          float alpha = beam * fade * 0.6;
          
          // Flicker
          alpha *= (0.8 + 0.2 * sin(time * 20.0));
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
    }
}

extend({ AccretionDiskMaterial, JetMaterial });

function QuasarContent() {
    const diskRef = useRef();
    const jet1Ref = useRef();
    const jet2Ref = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        if (diskRef.current) {
            diskRef.current.material.uniforms.time.value = time;
            diskRef.current.rotation.z -= 0.02;
        }
        if (jet1Ref.current) jet1Ref.current.material.uniforms.time.value = time;
        if (jet2Ref.current) jet2Ref.current.material.uniforms.time.value = time;
    });

    return (
        <group rotation={[Math.PI * 0.1, 0, Math.PI * 0.15]}>
            {/* Central Black Hole (Placeholder for the void) */}
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="black" />
            </mesh>

            {/* Brilliant Event Horizon Glow */}
            <mesh scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>

            {/* Accretion Disk */}
            <mesh ref={diskRef} rotation={[Math.PI * 0.5, 0, 0]}>
                <planeGeometry args={[5, 5]} />
                <accretionDiskMaterial />
            </mesh>

            {/* Polar Jets */}
            <group>
                {/* Upper Jet */}
                <mesh ref={jet1Ref} position={[0, 2.5, 0]}>
                    <planeGeometry args={[0.8, 5]} />
                    <jetMaterial />
                </mesh>
                {/* Lower Jet */}
                <mesh ref={jet2Ref} position={[0, -2.5, 0]} rotation={[Math.PI, 0, 0]}>
                    <planeGeometry args={[0.8, 5]} />
                    <jetMaterial />
                </mesh>
            </group>
        </group>
    );
}

export default function Quasar() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <QuasarContent />
            </Canvas>
        </div>
    );
}
