"use client";

import { useEffect, useRef } from "react";

/**
 * A soft accent-colored glow that trails the pointer across the page.
 * Only powers up on fine-pointer devices (mouse/trackpad) and is skipped
 * entirely when the user prefers reduced motion. Never blocks interaction.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const glow = glowRef.current;

    const isFinePointer =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!glow || !isFinePointer || prefersReducedMotion) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const current = { x: target.x, y: target.y };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
    };

    let frame = 0;
    const loop = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      glow.style.background = `radial-gradient(
          480px circle at ${current.x.toFixed(1)}px ${current.y.toFixed(1)}px,
          rgba(111, 227, 196, 0.06),
          transparent 65%
        )`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      glow.style.background = "transparent";
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
    />
  );
}