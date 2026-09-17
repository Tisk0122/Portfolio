"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/language-context";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

const AmbientBackground = dynamic(
  () => import("@/components/3d/AmbientBackground").then((mod) => mod.AmbientBackground),
  { ssr: false, loading: () => null }
);

export function PhilosophySection() {
  const { t } = useLanguage();

  return (
    <section id="philosophy" className="relative overflow-hidden py-28 sm:py-36">
      <AmbientBackground className="pointer-events-none absolute inset-0 -z-10 opacity-25" color="#ff9ecf" />
      <Container className="max-w-4xl">
        <RevealOnScroll>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.philosophy.kicker}
          </p>
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-[var(--fg)] sm:text-4xl">
            &ldquo;{t.philosophy.quote}&rdquo;
          </blockquote>
          <p className="mt-5 max-w-xl text-base text-[var(--fg-muted)] sm:text-lg">{t.philosophy.quoteSub}</p>
        </RevealOnScroll>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {t.philosophy.points.map((point, i) => (
            <RevealOnScroll key={point.title} delay={0.08 * i}>
              <div className="h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="mb-2 text-base font-semibold text-[var(--fg)]">{point.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--fg-muted)]">{point.body}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
