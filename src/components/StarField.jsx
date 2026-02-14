import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Stars({ count = 1500, mouse }) {
    const mesh = useRef();

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 80;
            arr[i * 3 + 1] = (Math.random() - 0.5) * 80;
            arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
        }
        return arr;
    }, [count]);

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.x += 0.00003;
            mesh.current.rotation.y += 0.00005;
            if (mouse.current) {
                mesh.current.rotation.x += mouse.current.y * 0.00002;
                mesh.current.rotation.y += mouse.current.x * 0.00002;
            }
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function StarField() {
    const mouse = useRef({ x: 0, y: 0 });
    const [count, setCount] = useState(1500);

    useEffect(() => {
        if (window.innerWidth < 768) setCount(600);
        else if (window.innerWidth < 1024) setCount(1000);

        const handleMouseMove = (e) => {
            mouse.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 50 }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <Stars count={count} mouse={mouse} />
            </Canvas>
        </div>
    );
}
