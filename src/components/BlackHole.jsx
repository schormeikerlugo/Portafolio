import { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/* ── Atmosphere Fresnel Shader ── */
class AtmosphereMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        glowColor: { value: new THREE.Color('#ffaa00') }, // Golden/Orange glow for realism
        coeficient: { value: 0.2 },
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
extend({ AtmosphereMaterial });

/* ── Black Hole Model ── */
function BlackHoleModel() {
  const meshRef = useRef();
  const diskRef = useRef();
  const atmosRef = useRef();
  const { viewport } = useThree();

  // Responsive scaling - Reduced by 20% (approx 1.4 max) per user request
  const scale = useMemo(() => {
    return Math.min(viewport.width * 0.15, 1.44);
  }, [viewport.width]);

  const diskTexture = useTexture('/textures/blackhole_disk_8k.png');

  useFrame((_, delta) => {
    // Slower, majestic rotation for realism
    if (diskRef.current) diskRef.current.rotation.z -= delta * 0.08;

    // Subtle ambient wobble
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group scale={scale}>
      {/* Event Horizon */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon Ring (Atmosphere) */}
      <mesh ref={atmosRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <atmosphereMaterial />
      </mesh>

      {/* Accretion Disk */}
      <mesh ref={diskRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ── Fallback ── */
function BlackHoleFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="black" />
      <mesh scale={[1.2, 1.2, 1.2]}>
        <ringGeometry args={[1.2, 2.5, 32]} />
        <meshBasicMaterial color="orange" wireframe />
      </mesh>
    </mesh>
  );
}

/* ── Error Boundary ── */
class ErrorBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

export default function BlackHole() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ErrorBoundary fallback={<BlackHoleFallback />}>
          <Suspense fallback={<BlackHoleFallback />}>
            <BlackHoleModel />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
}
