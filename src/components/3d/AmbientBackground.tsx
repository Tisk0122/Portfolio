"use client";

import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useDeviceQuality } from "@/lib/device-quality";

interface AmbientBackgroundProps {
  color?: string;
  className?: string;
}

/**
 * A cheap, mostly-static particle field used purely as ambience behind
 * text sections. Skipped entirely on low-end devices to protect
 * performance — the sections read perfectly fine without it.
 */
export function AmbientBackground({ color = "#6fe3c4", className }: AmbientBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const quality = useDeviceQuality();

  if (quality.quality === "low") return null;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <ParticleField
          count={Math.round(quality.particleCount * 0.4)}
          reducedMotion={reducedMotion}
          color={color}
          radius={5}
        />
      </Canvas>
    </div>
  );
}
