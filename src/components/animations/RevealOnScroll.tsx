"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "li";
}

/**
 * Fades + slightly translates content into view as it enters the viewport.
 * Automatically becomes an instant, motion-free reveal when the user has
 * requested reduced motion.
 */
export function RevealOnScroll({ children, delay = 0, className, y = 24, as = "div" }: RevealOnScrollProps) {
  const prefersReducedMotion = useFramerReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.7, delay: prefersReducedMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
