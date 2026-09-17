"use client";

import type { MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface CameraRigProps {
  reducedMotion: boolean;
  scrollProgress: MutableRefObject<number>;
}

/**
 * Subtly moves the camera based on pointer position for a parallax feel,
 * and dollies/rotates it forward as the user scrolls past the Hero — giving
 * the impression of moving through the 3D space toward the next section.
 * Disabled when reduced motion is requested, so the camera simply stays put.
 */
export function CameraRig({ reducedMotion, scrollProgress }: CameraRigProps) {
  const { camera, pointer } = useThree();

  // react-three-fiber's useFrame loop intentionally mutates the Three.js
  // camera object directly every frame for performance — this is the
  // standard R3F pattern, not React state, so it's exempt from the
  // React Compiler's immutability rule for hook return values.
  /* eslint-disable react-hooks/immutability */
  useFrame(() => {
    if (reducedMotion) {
      camera.position.set(0, 0, 8);
      camera.lookAt(0, 0, 0);
      return;
    }

    const scroll = scrollProgress.current;
    // Ease scroll progress for a smoother dolly-in feel near the end
    const eased = scroll * scroll * (3 - 2 * scroll);

    const targetX = pointer.x * 0.6 * (1 - eased * 0.6);
    const targetY = pointer.y * 0.35 * (1 - eased * 0.6) + eased * 0.4;
    const targetZ = 8 - eased * 3.2;

    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, -eased * 1.5);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}
