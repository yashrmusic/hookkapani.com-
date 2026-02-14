'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveSculpture() {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();

        // Slow, breathing rotation
        meshRef.current.rotation.x = Math.sin(t / 4) / 2;
        meshRef.current.rotation.y = Math.cos(t / 2) / 2;
        meshRef.current.rotation.z += 0.005;

        // React to hover/active state
        const targetScale = active ? 1.5 : hovered ? 1.2 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setActive(!active)}
            castShadow
        >
            <icosahedronGeometry args={[1, 15]} />
            <MeshDistortMaterial
                color={hovered ? '#fafafa' : '#444'}
                speed={hovered ? 5 : 2}
                distort={hovered ? 0.6 : 0.3}
                radius={1}
                metalness={0.9}
                roughness={0.1}
            />
        </mesh>
    );
}

function WireframeOctahedron() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.z += 0.012;
    });

    return (
        <mesh ref={meshRef}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial wireframe color="#f72585" opacity={0.2} transparent />
        </mesh>
    );
}

export function KineticAnimation({ className = "h-full w-full" }: { className?: string }) {
    return (
        <div className={className}>
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f72585" />

                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <InteractiveSculpture />
                </Float>

                <WireframeOctahedron />

                <Environment preset="city" />
                <OrbitControls enableZoom={false} makeDefault />

                {/* Particles for depth */}
                <Particles count={100} />
            </Canvas>
        </div>
    );
}

export function KineticLab() {
    return (
        <section className="relative h-[70vh] w-full bg-[#050505] overflow-hidden border-y border-white/5">
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white/90 mb-4 font-mono">
                    KINETIC LAB
                </h2>
                <p className="text-sm md:text-lg text-white/40 max-w-xl uppercase tracking-[0.2em]">
                    Interactive materiality • Digital prototyping • Hover to manipulate
                </p>
            </div>

            <KineticAnimation />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-4 opacity-50 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-[10px] text-white font-mono uppercase tracking-widest">Physics Active</span>
                </div>
            </div>
        </section>
    );
}

function Particles({ count }: { count: number }) {
    const mesh = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.x += 0.0005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.5} />
        </points>
    );
}
