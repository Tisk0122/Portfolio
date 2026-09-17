"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

const SIZE = 46;
const STROKE = 2.5;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating "back to top" button in the bottom-right corner. Appears after a
 * little scroll and draws a progress ring around itself as you scroll down.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  const dashOffset = useTransform(progress, [0, 1], [CIRCUMFERENCE, 0]);

  useEffect(() => {
    const onScroll = () => setVisible(scrollY.get() > 640);
    onScroll();
    return scrollY.on("change", onScroll);
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]/80 text-[var(--fg-muted)] shadow-lg backdrop-blur-md transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          <ArrowUp size={18} aria-hidden="true" />
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -rotate-90"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--border)"
              strokeWidth={STROKE}
              opacity={0.6}
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}