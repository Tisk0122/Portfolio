"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Surfaces Core Web Vitals (LCP, CLS, INP, FCP, TTFB) in the browser console
 * during local development, so real numbers can be checked on this specific
 * page (3D hero + animations) instead of guessed at.
 *
 * This intentionally does NOT send data anywhere — analytics wiring is a
 * separate decision. To forward these to a real analytics endpoint later,
 * replace the console.debug call below with a `navigator.sendBeacon(...)`
 * or fetch() call.
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV !== "production") {
      const rounded = Math.round(metric.value * 100) / 100;
      console.debug(`[web-vitals] ${metric.name}: ${rounded} (${metric.rating})`);
    }
  });

  return null;
}
