"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the user has requested reduced motion at the OS/browser
 * level. Always defaults to false on the server / before mount so SSR output
 * is stable, then syncs on the client.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Sync the real client-side value once after mount; SSR has no window,
    // so the safe default (false) is used for the very first render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(query.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
