"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function SectionHeading({
  kicker,
  title,
  intro,
  headingLevel = "h2",
}: {
  kicker: string;
  title: string;
  intro?: string;
  /** Standalone pages need an h1; home sections keep h2 */
  headingLevel?: "h1" | "h2";
}) {
  const reducedMotion = useReducedMotion();
  const HeadingTag = headingLevel === "h1" ? "h1" : "h2";
  const underlineProps = reducedMotion
    ? {}
    : {
        initial: { scaleX: 0, opacity: 0 } as const,
        whileInView: { scaleX: 1, opacity: 1 } as const,
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.12 },
        style: { transformOrigin: "left" },
        className:
          "mt-3 block h-0.5 w-16 rounded-full bg-gradient-to-r from-[var(--accent)] to-transparent",
      };

  return (
    <RevealOnScroll className="max-w-2xl">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
        {kicker}
      </p>
      <HeadingTag className="text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
        {title}
      </HeadingTag>
      {reducedMotion ? (
        <span
          aria-hidden="true"
          className="mt-3 block h-0.5 w-16 rounded-full bg-gradient-to-r from-[var(--accent)] to-transparent"
        />
      ) : (
        <motion.span aria-hidden="true" {...underlineProps} />
      )}
      {intro ? <p className="mt-4 text-base leading-relaxed text-[var(--fg-muted)]">{intro}</p> : null}
    </RevealOnScroll>
  );
}
