"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";
import { createSeededRandom } from "@/lib/seeded-random";

interface NetworkCoreProps {
  reducedMotion: boolean;
  highQuality: boolean;
  color?: string;
  scrollProgress?: React.MutableRefObject<number>;
}

const NODE_COUNT = 12;

interface OrbitNode {
  x: number;
  y: number;
  z: number;
  axis: "x" | "y" | "z";
  size: number;
  speed: number;
  phase: number;
}

function orbitNodePosition(node: OrbitNode, t: number): [number, number, number] {
  const r = Math.sqrt(node.x * node.x + node.z * node.z);
  const phase = t * node.speed + node.phase;
  if (node.axis === "y") {
    return [Math.cos(phase) * r, node.y + Math.sin(phase * 0.7) * 0.3, Math.sin(phase) * r];
  }
  if (node.axis === "x") {
    return [node.x + Math.sin(phase * 0.5) * 0.2, Math.cos(phase) * r, Math.sin(phase) * r];
  }
  return [Math.cos(phase) * r, Math.sin(phase) * r, node.z + Math.cos(phase * 0.6) * 0.2];
}

/**
 * The signature object of the Hero: a glowing "processor cube" with
 * circuit traces etched across its faces, wrapped in a wireframe shell
 * and orbited by small data nodes tethered to the core — an abstract
 * programmer/IT motif rather than a literal model. Spins up and recedes
 * as the user scrolls past the Hero, reinforcing forward motion.
 */
export function NetworkCore({
  reducedMotion,
  highQuality,
  color = "#6fe3c4",
  scrollProgress,
}: NetworkCoreProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo<OrbitNode[]>(() => {
    const random = createSeededRandom(NODE_COUNT * 104729);
    return Array.from({ length: NODE_COUNT }, (_, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.4;
      const axis: OrbitNode["axis"] = (["y", "x", "z"] as const)[i % 3];
      let x = 0, y = 0, z = 0;
      if (axis === "y") {
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        y = (random() - 0.5) * 1.2;
      } else if (axis === "x") {
        y = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        x = (random() - 0.5) * 1.2;
      } else {
        x = Math.cos(angle) * radius;
        y = Math.sin(angle) * radius;
        z = (random() - 0.5) * 1.2;
      }
      return {
        x, y, z, axis,
        size: 0.08 + (i % 4) * 0.04,
        speed: 0.3 + (i % 5) * 0.1,
        phase: angle,
      };
    });
  }, []);

  const circuitPositions = useMemo(() => {
    const s = 0.7;
    const pairs: [number, number, number, number, number, number][] = [
      // Front face — horizontal & vertical traces
      [-s, -s * 0.3, s + 0.01, s, -s * 0.3, s + 0.01],
      [-s, s * 0.3, s + 0.01, s, s * 0.3, s + 0.01],
      [-s * 0.4, -s, s + 0.01, -s * 0.4, s, s + 0.01],
      [s * 0.4, -s, s + 0.01, s * 0.4, s, s + 0.01],
      // Right face — horizontal & vertical traces
      [s + 0.01, -s * 0.3, -s, s + 0.01, -s * 0.3, s],
      [s + 0.01, s * 0.5, -s, s + 0.01, s * 0.5, s],
      [s + 0.01, -s, -s * 0.5, s + 0.01, s, -s * 0.5],
      // Top face — diagonal traces
      [-s, s + 0.01, -s, s, s + 0.01, s],
      [-s, s + 0.01, s * 0.3, s * 0.3, s + 0.01, -s],
    ];
    return new Float32Array(pairs.flat());
  }, []);

  useFrame((state, delta) => {
    const scroll = scrollProgress?.current ?? 0;

    const t = state.clock.getElapsedTime();
    const spinBoost = reducedMotion ? 0 : 1 + scroll * 2.5;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.15 * spinBoost;
      coreRef.current.rotation.x += delta * 0.05 * spinBoost;
      coreRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.15 * spinBoost;
      wireRef.current.rotation.x += delta * 0.05 * spinBoost;
      if (coreRef.current) wireRef.current.position.y = coreRef.current.position.y;
    }

    if (groupRef.current) {
      const targetScale = 1 - scroll * 0.35;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      groupRef.current.position.z = -scroll * 2.5;
    }

    if (!reducedMotion && nodesGroupRef.current && linesRef.current) {
      const attr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      nodesGroupRef.current.children.forEach((child, i) => {
        const [nx, ny, nz] = orbitNodePosition(nodes[i], t);
        child.position.set(nx, ny, nz);
        attr.setXYZ(i * 2, 0, 0, 0);
        attr.setXYZ(i * 2 + 1, nx, ny, nz);
      });
      attr.needsUpdate = true;
    }
  });

const linePositions = useMemo(() => new Float32Array(NODE_COUNT * 2 * 3), []);

const pins = useMemo(() => {
  if (!highQuality) return [];
  const random = createSeededRandom(31337);
  const arr: { x: number; z: number; size: number }[] = [];
  for (let i = 0; i < 8; i++) {
    arr.push({
      x: -0.55 + random() * 1.1,
      z: -0.55 + random() * 1.1,
      size: 0.05 + random() * 0.05,
    });
  }
  return arr;
}, [highQuality]);

return (
  <group ref={groupRef}>
    {/* Central processor cube */}
    <mesh ref={coreRef}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial
        color={color}
        roughness={0.15}
        metalness={0.7}
        transparent
        opacity={0.35}
      />
      <Edges threshold={15} color={color} lineWidth={2} />
    </mesh>

    {/* CPU socket pins under the chip */}
    {pins.map((pin, i) => (
      <mesh key={i} position={[pin.x, -0.78, pin.z]}>
        <boxGeometry args={[pin.size, 0.14, pin.size]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} transparent opacity={0.7} />
      </mesh>
    ))}

      {/* Wireframe shell */}
      <mesh ref={wireRef}>
        <boxGeometry args={[1.62, 1.62, 1.62]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.1} />
      </mesh>

      {/* Circuit traces etched on the faces */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[circuitPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </lineSegments>

      {/* Orbiting data nodes */}
      {!reducedMotion && (
        <group ref={nodesGroupRef}>
          {nodes.map((node, i) => (
            <mesh key={i}>
              <boxGeometry args={[node.size, node.size, node.size]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} transparent opacity={0.9} />
              <Edges threshold={15} color={color} />
            </mesh>
          ))}
        </group>
      )}

      {/* Tether lines from core to data nodes */}
      {!reducedMotion && (
        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={color} transparent opacity={0.25} />
        </lineSegments>
      )}
    </group>
  );
}