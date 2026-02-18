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

/* ── Particle System ── */
function ParticleSystem({ count = 3000 }) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorInside = new THREE.Color('#ffffff'); // Hot white
    const colorMid = new THREE.Color('#ffaa00');    // Gold
    const colorOutside = new THREE.Color('#ff4500'); // OrangeRed

    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 2.9;
      const theta = Math.random() * Math.PI * 2;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      const y = (Math.random() - 0.5) * 0.1 * (1 / r);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 1.5;

      const normalizedR = (r - 1.6) / 2.9;
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
    if (pointsRef.current) pointsRef.current.rotation.y -= delta * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.positions.length / 3} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particles.colors.length / 3} array={particles.colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particles.sizes.length} array={particles.sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} sizeAttenuation={true} depthWrite={false} />
    </points>
  );
}

/* ── Animated Plasma Disk Shader ── */
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
varying vec3 vPosition;

// Simplex Noise (3D)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - 1.0 + D.yyy; 
  i = mod289(i);
  vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
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
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  float r = length(vPosition.xy);
  float angle = atan(vPosition.y, vPosition.x) + uTime * 0.15 + 4.0 / (r + 0.1); 
  vec3 noisePos = vec3(cos(angle) * r, sin(angle) * r, uTime * 0.4);

  float n1 = snoise(noisePos * 3.5); 
  float n2 = snoise(noisePos * 12.0 + vec3(2.0)); 
  float n3 = snoise(noisePos * 24.0 - vec3(uTime)); 
  
  float finalNoise = n1 * 0.6 + n2 * 0.3 + n3 * 0.1;
  
  // Revised Alpha Mask for Fusion: Starts closer (0.13) to sphere (0.14)
  float dist = length(vUv - 0.5);
  float alphaMask = smoothstep(0.13, 0.20, dist) * (1.0 - smoothstep(0.42, 0.5, dist));
  
  float solidity = smoothstep(0.1, 0.6, finalNoise + 0.5); 
  
  vec3 color = mix(uColorStart, uColorEnd, (dist - 0.14) * 3.0);
  color += vec3(solidity * 0.3);
  
  gl_FragColor = vec4(color, alphaMask * (0.8 + solidity * 0.2)); 
}
`;

const plasmaLensedFragmentShader = `
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
varying vec2 vUv;
varying vec3 vPosition;

// Resupply snoise due to shader scope
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; 
  vec3 x3 = x0 - 1.0 + D.yyy; 
  i = mod289(i);
  vec4 p = permute( permute( permute( i.z + vec4(0.0, i1.z, i2.z, 1.0 )) + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
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
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  float r = length(vUv - 0.5);
  vec3 noisePos = vec3(vUv.x * 2.0, vUv.y * 0.5, uTime * 0.3);
  float n = snoise(noisePos * 5.0);
  float dist = abs(r - 0.35); 
  float alpha = smoothstep(0.12, 0.0, dist);
  vec3 color = mix(uColorStart, uColorEnd, r * 2.5);
  color += vec3(n * 0.3);
  gl_FragColor = vec4(color, alpha * 0.8 * (0.6 + n * 0.4));
}
`;

function PlasmaDisk() {
  const meshRef = useRef();
  const materialRef = useRef();
  const lensedRef = useRef();
  const lensedMatRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (materialRef.current) materialRef.current.uniforms.uTime.value = time;
    if (lensedMatRef.current) lensedMatRef.current.uniforms.uTime.value = time;
    if (meshRef.current) meshRef.current.rotation.z -= 0.003;
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    // Updated colors: White Core -> Red Edge
    uColorStart: { value: new THREE.Color('#ffffff') },
    uColorEnd: { value: new THREE.Color('#ff3d00') },
  }), []);

  return (
    <group>
      <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]}>
        <planeGeometry args={[10, 10, 128, 128]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={plasmaVertexShader}
          fragmentShader={plasmaFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.NormalBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={lensedRef} rotation={[0, 0, 0]}>
        <planeGeometry args={[9, 9, 64, 64]} />
        <shaderMaterial
          ref={lensedMatRef}
          vertexShader={plasmaVertexShader}
          fragmentShader={plasmaLensedFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function BlackHoleModel() {
  const meshRef = useRef();
  const atmosRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002;
    if (atmosRef.current && atmosRef.current.material && atmosRef.current.material.uniforms) {
      atmosRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const scale = useMemo(() => {
    return Math.min(viewport.width * 0.15, 1.44);
  }, [viewport.width]);

  return (
    <group scale={scale}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={atmosRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <plasmaAtmosphereMaterial />
      </mesh>
      <PlasmaDisk />
      <group rotation={[Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI / 2.5, 0, 0]}>
          <ParticleSystem count={3000} />
        </group>
      </group>
    </group>
  );
}

function BlackHoleFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color="black" />
    </mesh>
  );
}

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
            {/* Key update to force remount */}
            <BlackHoleModel key="gargantua-v3-final" />
          </Suspense>
        </ErrorBoundary>
      </Canvas>
    </div>
  );
}
