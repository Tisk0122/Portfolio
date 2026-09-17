"use client";

import { useEffect, useState } from "react";

export type DeviceQuality = "high" | "medium" | "low";

export interface QualitySettings {
  quality: DeviceQuality;
  dpr: [number, number];
  particleCount: number;
  enablePostFX: boolean;
  shadows: boolean;
}

function detectQuality(): DeviceQuality {
  if (typeof window === "undefined" || typeof navigator === "undefined") return "medium";

  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrow = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    ?.saveData;

  if (saveData) return "low";
  if ((isCoarsePointer && isNarrow) || cores <= 4 || memory <= 4) {
    return isCoarsePointer && isNarrow && (cores <= 4 || memory <= 4) ? "low" : "medium";
  }
  if (cores >= 8 && memory >= 8 && !isCoarsePointer) return "high";
  return "medium";
}

const QUALITY_PRESETS: Record<DeviceQuality, QualitySettings> = {
  high: { quality: "high", dpr: [1, 2], particleCount: 1400, enablePostFX: true, shadows: true },
  medium: { quality: "medium", dpr: [1, 1.5], particleCount: 700, enablePostFX: false, shadows: false },
  low: { quality: "low", dpr: [1, 1], particleCount: 250, enablePostFX: false, shadows: false },
};

/**
 * Detects a rough device performance tier once on mount and returns the
 * matching 3D quality preset (particle counts, pixel ratio cap, etc).
 */
export function useDeviceQuality(): QualitySettings {
  const [settings, setSettings] = useState<QualitySettings>(QUALITY_PRESETS.medium);

  useEffect(() => {
    // Device capability detection requires `window`/`navigator`, so it can
    // only run after mount; the "medium" preset is used for the SSR pass.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(QUALITY_PRESETS[detectQuality()]);
  }, []);

  return settings;
}
