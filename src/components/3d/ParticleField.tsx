"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "@/lib/seeded-random";

interface ParticleFieldProps {
  count: number;
  reducedMotion: boolean;
  color?: string;
  radius?: number;
}

/**
 * A soft sphere of drifting points used as ambient depth behind the main
 * 3D object. Rotates extremely slowly; frozen entirely when the user has
 * requested reduced motion.
 */
export function ParticleField({ count, reducedMotion, color = "#7ee8d0", radius = 6 }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const random = createSeededRandom(count * 7919 + Math.round(radius * 1000));
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute points within a sphere shell for a starfield-like depth
      const r = radius * (0.4 + random() * 0.6);
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.02;
    groupRef.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}
