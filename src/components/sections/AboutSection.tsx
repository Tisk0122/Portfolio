"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { getSortedProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { certifications } from "@/data/certifications";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

/** Counts from 0 up to {@link to} once it scrolls into view. */
function CountUp({ to }: { to: number }) {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(() => (reducedMotion ? to : 0));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || value === to) return;
    if (reducedMotion) {
      // Reduce-motion users shouldn't land on "0"; show the final number.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 900;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, to, value]);

  return <span ref={ref}>{value}</span>;
}

export function AboutSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { t } = useLanguage();
  const stats = [
    { label: t.about.statProjects, value: getSortedProjects().length },
    {
      label: t.about.statSkills,
      value: skillCategories.reduce((total, category) => total + category.skills.length, 0),
    },
    {
      label: t.about.statCerts,
      value: certifications.filter((cert) => cert.status === "acquired").length,
    },
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(640px circle at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_320px] md:items-start">
          <div>
            <SectionHeading headingLevel={headingLevel} kicker={t.about.kicker} title={t.about.title} />
            <div className="mt-8 space-y-5">
              {t.about.body.map((paragraph, i) => (
                <RevealOnScroll key={i} delay={0.08 * i}>
                  <p className="max-w-2xl text-base leading-relaxed text-[var(--fg-muted)] sm:text-lg">
                    {paragraph}
                  </p>
                </RevealOnScroll>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 divide-x divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
              {stats.map((stat, i) => (
                <RevealOnScroll key={stat.label} delay={0.08 * i} className="px-2 py-5 text-center">
                  <p className="font-mono text-2xl font-semibold text-[var(--accent)] sm:text-3xl">
                    <CountUp to={stat.value} />
                  </p>
                  <p className="mt-1 text-xs text-[var(--fg-muted)]">{stat.label}</p>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          <RevealOnScroll delay={0.2}>
            <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
              <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-[var(--bg)] ring-1 ring-[var(--border)]">
                <Image
                  src="/images/icon-512.png"
                  alt="Tisk logo"
                  fill
                  sizes="128px"
                  className="object-contain p-3"
                  priority={false}
                />
              </div>
              <span className="absolute bottom-5 rounded-full border border-[var(--border)] bg-[var(--bg)]/70 px-3 py-1 font-mono text-xs text-[var(--fg-muted)] backdrop-blur-sm">
                {t.about.badge}
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
