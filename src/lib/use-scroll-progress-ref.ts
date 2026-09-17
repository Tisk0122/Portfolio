"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks scroll progress as a plain ref (not React state) so it can be read
 * inside a useFrame loop every frame without triggering component re-renders.
 * Progress is normalized 0 → 1 across `viewportRatio` × the viewport height
 * (read safely inside the effect, never during render).
 */
export function useScrollProgressRef(viewportRatio: number = 0.9) {
  const progress = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const distance = window.innerHeight * viewportRatio;
      progress.current = Math.min(1, Math.max(0, window.scrollY / distance));
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [viewportRatio]);

  return progress;
}
