"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { NetworkCore } from "./NetworkCore";
import { ParticleField } from "./ParticleField";
import { FloatingShapes } from "./FloatingShapes";
import { CameraRig } from "./CameraRig";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useDeviceQuality } from "@/lib/device-quality";
import { useScrollProgressRef } from "@/lib/use-scroll-progress-ref";

function MouseLight({ reducedMotion }: { reducedMotion: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current || reducedMotion) return;
    lightRef.current.position.x = state.pointer.x * 4;
    lightRef.current.position.y = state.pointer.y * 3;
  });

  return <pointLight ref={lightRef} position={[2, 2, 4]} intensity={2.2} color="#8ff5dd" />;
}

interface HeroSceneProps {
  accentColor?: string;
}

export function HeroScene({ accentColor = "#6fe3c4" }: HeroSceneProps) {
  const reducedMotion = useReducedMotion();
  const quality = useDeviceQuality();
  // Camera dollies forward across roughly one viewport height of scroll,
  // giving the impression of moving through the scene into the next section.
  const scrollProgress = useScrollProgressRef(0.9);

  // Freeze the render loop when the canvas leaves the viewport (it lives at
  // the very top of the page) or the tab is hidden. React Three Fiber keeps
  // drawing every frame otherwise, which is wasted GPU work.
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((entry) => entry.isIntersecting);
        setPaused(document.hidden || !inView);
      },
      { rootMargin: "240px 0px", threshold: 0 }
    );
    observer.observe(el);

    const onVisibilityChange = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div ref={canvasWrapRef} className="absolute inset-0">
      <Canvas
        frameloop={paused ? "never" : "always"}
        dpr={quality.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8], fov: 42 }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.55} />
        <MouseLight reducedMotion={reducedMotion} />
        <directionalLight position={[-4, 3, 2]} intensity={0.4} color="#ffffff" />
        <Suspense fallback={null}>
          <NetworkCore
            reducedMotion={reducedMotion}
            highQuality={quality.quality !== "low"}
            color={accentColor}
            scrollProgress={scrollProgress}
          />
          <ParticleField
            count={quality.particleCount}
            reducedMotion={reducedMotion}
            color={accentColor}
          />
          <FloatingShapes
            reducedMotion={reducedMotion}
            count={quality.quality === "high" ? 8 : quality.quality === "medium" ? 5 : 3}
            color={accentColor}
          />
        </Suspense>
        <CameraRig reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

export default HeroScene;
