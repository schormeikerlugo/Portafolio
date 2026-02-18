import { useRef, useMemo, Suspense, Component } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Animated Plasma Atmosphere Shader (Event Horizon) ── */
class PlasmaAtmosphereMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        glowColor: { value: new THREE.Color('#ffaa00') }, // Gold/Orange
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
        uniform float uTime;
        uniform vec3 glowColor;
        uniform float power;
        varying vec3 vNormal;
        varying vec3 vPositionNormal;

        void main() {
          float intensity = pow(0.35 + dot(vNormal, vPositionNormal), power);
          
          // Add subtle pulse/noise to intensity
          float noise = sin(uTime * 2.0 + vPositionNormal.y * 10.0) * 0.15;
          
          gl_FragColor = vec4(glowColor, (intensity + noise) * 0.9);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }
}
extend({ PlasmaAtmosphereMaterial });

/* ── Animated Plasma Disk Shader (Volumetric Accretion Disk) ── */
const plasmaVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const plasmaFragmentShader = `
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Simplex Noise (3D)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  // Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - 1.0 + D.yyy; 

  // Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857; 
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z); 

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );   

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  // Rotate UVs for swirl effect
  float r = length(vPosition.xy);
  float angle = atan(vPosition.y, vPosition.x) + uTime * 0.3 + 2.0 / (r + 0.05); // Faster swirl
  vec3 noisePos = vec3(cos(angle) * r, sin(angle) * r, uTime * 0.8);

  // Generate plasma noise
  float n = snoise(noisePos * 4.0);
  float n2 = snoise(noisePos * 8.0 + vec3(5.0));
  
  // Combine noise
  float finalNoise = n * 0.7 + n2 * 0.3;
  
  // Mask edges (disk shape)
  // Inner hole: 0.25 radius, Outer 0.5 radius in UV space
  // Map UV (0..1) to centered (-0.5..0.5)
  float dist = length(vUv - 0.5);
  
  // Sharp inner edge (0.15), Soft outer edge (0.45)
  float alpha = smoothstep(0.1, 0.15, dist) * (1.0 - smoothstep(0.4, 0.48, dist));
  
  // Intensity
  float intensity = smoothstep(0.3, 0.9, finalNoise + 0.6);
  
  // Color palette: Hot Center -> Cool Edge
  // mix based on distance
  vec3 color = mix(uColorStart, uColorEnd, (dist - 0.15) * 3.0);
  
  // Boost brightness for "Plasma" look
  color += vec3(intensity * 0.4); 
  
  gl_FragColor = vec4(color, alpha * intensity * 0.95);
}
`;

function PlasmaDisk() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      // 3D rotation of the disk plane
      meshRef.current.rotation.z -= 0.002;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorStart: { value: new THREE.Color('#ffaa00') }, // Gold/Yellow
    uColorEnd: { value: new THREE.Color('#ff2200') },   // Red/Orange (More Interstellar, less Purple)
  }), []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[10, 10, 128, 128]} /> {/* Larger, High Poly for smooth noise */}
      <shaderMaterial
        ref={materialRef}
        vertexShader={plasmaVertexShader}
        fragmentShader={plasmaFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Black Hole Model ── */
function BlackHoleModel() {
  const meshRef = useRef();
  const atmosRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    // Subtle ambient wobble of the sphere
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }

    // Update atmosphere time
    if (atmosRef.current && atmosRef.current.material && atmosRef.current.material.uniforms) {
      atmosRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  // Responsive scaling - Reduced by 20% (approx 1.4 max) per user request
  const scale = useMemo(() => {
    return Math.min(viewport.width * 0.15, 1.44);
  }, [viewport.width]);

  return (
    <group scale={scale}>
      {/* Event Horizon */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon Ring (Plasma Atmosphere) */}
      <mesh ref={atmosRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <plasmaAtmosphereMaterial />
      </mesh>

      {/* Dynamic Plasma Disk (Code-based) */}
      <PlasmaDisk />
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
