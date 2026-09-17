"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

/** Wraps a card and tilts it in 3D toward the pointer for a tactile feel. */
function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 220, damping: 22 });
  const springY = useSpring(pointerY, { stiffness: 220, damping: 22 });
  const rotateY = useTransform(springX, [0, 1], [7, -7]);
  const rotateX = useTransform(springY, [0, 1], [-7, 7]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        pointerX.set(0.5);
        pointerY.set(0.5);
      }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function SkillsSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { t, locale } = useLanguage();

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(640px circle at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <SectionHeading headingLevel={headingLevel} kicker={t.skills.kicker} title={t.skills.title} intro={t.skills.intro} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, ci) => (
            <RevealOnScroll key={category.id} delay={0.08 * ci}>
              <TiltCard>
                <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-300 hover:border-[var(--accent)]/50">
                  <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                    {locale === "ja" ? category.title.ja : category.title.en}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, si) => (
                      <span
                        key={skill}
                        className="skill-chip rounded-full border border-[var(--border)] bg-[var(--bg)] px-3.5 py-1.5 text-sm text-[var(--fg)]"
                        style={{ animationDelay: `${(ci * category.skills.length + si) * 0.35}s` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}