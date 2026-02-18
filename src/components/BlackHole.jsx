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

/* ── Particle System (Plasma Sparks) ── */
function ParticleSystem({ count = 2000 }) {
  const pointsRef = useRef();
  const { viewport } = useThree();

  // Generate random points in a disk shape
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color('#ffffff'); // Hot white
    const colorMid = new THREE.Color('#ffaa00');    // Gold
    const colorOutside = new THREE.Color('#8a2be2'); // Violet

    for (let i = 0; i < count; i++) {
      // Radius: concentrated in the accretion disk zone (1.6 to 4.0)
      const r = 1.6 + Math.random() * 2.4;
      // Angle
      const theta = Math.random() * Math.PI * 2;

      // Thin disk with slight vertical spread
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta); // Switch Z/Y for horizontal orientation later
      const y = (Math.random() - 0.5) * 0.2 * (1 / r); // Thinner at edges

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Size variation
      sizes[i] = Math.random() * 1.5;

      // Color based on radius (Temperature gradient)
      const normalizedR = (r - 1.6) / 2.4;
      const tempColor = new THREE.Color();
      if (normalizedR < 0.2) tempColor.copy(colorInside);
      else if (normalizedR < 0.6) tempColor.copy(colorMid).lerp(colorOutside, (normalizedR - 0.2) * 2.5);
      else tempColor.copy(colorOutside);

      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }
    return { positions, sizes, colors };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Rotate the entire system
      pointsRef.current.rotation.y -= delta * 0.15; // Orbit

      // Jitter for "plasma" energy look?
      // Expensive to update positions every frame, rotation is enough for flow.
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

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

      {/* Accretion Disk (Gaseous Base) */}
      <mesh ref={diskRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial
          map={diskTexture}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Plasma Particles */}
      <group rotation={[-Math.PI / 2.5, 0, 0]}>
        {/* Tilt matches disk */}
        {/* Actually, ParticleSystem generates in X/Z plane (y=0). 
               So we rotate the group to match the X-tilted disk plane. 
               Disk plane rotation is [-Math.PI / 2.5, 0, 0].
               But wait, planeGeometry is XY. Rotating X makes it XZ inclined.
               My ParticleSystem produces XZ (y=flat).
               So I just need to rotate the ParticleSystem group the same way.
           */}
        <group rotation={[Math.PI / 2, 0, 0]}> {/* Points are XZ, Plane is XY. Align. */}
          <ParticleSystem count={3000} />
        </group>
      </group>
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
