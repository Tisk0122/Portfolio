"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { certifications } from "@/data/certifications";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function CertificationsSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { t, locale } = useLanguage();
  const acquired = certifications.filter((c) => c.status === "acquired");
  const learning = certifications.filter((c) => c.status === "learning");

  return (
    <section id="certifications" className="relative py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(640px circle at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        }}
      />
      <Container>
        <SectionHeading
          headingLevel={headingLevel}
          kicker={t.certifications.kicker}
          title={t.certifications.title}
          intro={t.certifications.intro}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <RevealOnScroll>
            <div className="h-full rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-xl motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                {t.certifications.acquired}
              </h3>
              <ul className="space-y-4">
                {acquired.map((cert) => (
                  <li key={cert.name.en} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    <span className="text-[var(--fg)]">{locale === "ja" ? cert.name.ja : cert.name.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="h-full rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-xl motion-reduce:hover:translate-y-0 motion-reduce:transition-none">
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                {t.certifications.learning}
              </h3>
              <ul className="space-y-4">
                {learning.map((cert) => (
                  <li key={cert.name.en} className="flex items-start gap-3">
                    <Clock size={20} className="mt-0.5 shrink-0 text-amber-400" aria-hidden="true" />
                    <div>
                      <p className="text-[var(--fg)]">{locale === "ja" ? cert.name.ja : cert.name.en}</p>
                      <p className="mt-0.5 text-xs text-[var(--fg-muted)]">{t.certifications.learningNote}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
