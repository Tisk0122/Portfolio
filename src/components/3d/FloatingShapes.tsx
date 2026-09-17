"use client";

import { useMemo } from "react";
import { Float, Octahedron, Torus } from "@react-three/drei";
import { createSeededRandom } from "@/lib/seeded-random";

interface FloatingShapesProps {
  reducedMotion: boolean;
  count: number;
  color?: string;
}

const SHAPE_TYPES = ["octahedron", "torus"] as const;

/**
 * A handful of small geometric primitives drifting slowly around the core.
 * Purely decorative depth — count is capped by device quality.
 */
export function FloatingShapes({ reducedMotion, count, color = "#a5f3e0" }: FloatingShapesProps) {
  const shapes = useMemo(() => {
    const random = createSeededRandom(count * 104729);
    return Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.2 + random() * 1.6;
      return {
        id: i,
        position: [
          Math.cos(angle) * radius,
          (random() - 0.5) * 2.4,
          Math.sin(angle) * radius - 1,
        ] as [number, number, number],
        scale: 0.18 + random() * 0.22,
        type: SHAPE_TYPES[i % SHAPE_TYPES.length],
        floatSpeed: 0.6 + random() * 0.8,
      };
    });
  }, [count]);

  return (
    <>
      {shapes.map((shape) => (
        <Float
          key={shape.id}
          speed={reducedMotion ? 0 : shape.floatSpeed}
          floatIntensity={reducedMotion ? 0 : 1.2}
          rotationIntensity={reducedMotion ? 0 : 0.8}
        >
          {shape.type === "octahedron" ? (
            <Octahedron args={[shape.scale, 0]} position={shape.position}>
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} transparent opacity={0.7} />
            </Octahedron>
          ) : (
            <Torus args={[shape.scale, shape.scale * 0.35, 8, 20]} position={shape.position}>
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} transparent opacity={0.7} />
            </Torus>
          )}
        </Float>
      ))}
    </>
  );
}
