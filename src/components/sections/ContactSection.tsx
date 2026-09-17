"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Github, Mail } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { socialLinks, contactEmail } from "@/data/social";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { Button } from "@/components/ui/Button";

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    if (!contactEmail) return;
    try {
      await navigator.clipboard.writeText(contactEmail);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = contactEmail;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(640px circle at 50% 0%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)",
        }}
      />
      <Container className="max-w-3xl text-center">
        <RevealOnScroll>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
            {t.contact.kicker}
          </p>
          {headingLevel === "h1" ? (
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl">
              {t.contact.message}
            </h1>
          ) : (
            <h2 className="text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-5xl">
              {t.contact.message}
            </h2>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((link) => (
              <Button key={link.url} href={link.url} external variant="primary">
                <Github size={16} aria-hidden="true" />
                {link.label}
              </Button>
            ))}
            {contactEmail ? (
              <div className="flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={t.contact.copy}
                  className="group inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 font-mono text-sm text-[var(--fg-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
                >
                  <span className="group-hover:underline">{contactEmail}</span>
                  {copied ? (
                    <Check size={14} className="text-[var(--accent)]" aria-hidden="true" />
                  ) : (
                    <Copy size={14} aria-hidden="true" />
                  )}
                </button>
                <Button href={`mailto:${contactEmail}`} variant="secondary">
                  <Mail size={16} aria-hidden="true" />
                  {t.contact.email}
                </Button>
                <span className="sr-only" role="status" aria-live="polite">
                  {copied ? t.contact.emailCopied : ""}
                </span>
              </div>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[var(--border)] px-6 py-3 text-sm text-[var(--fg-muted)]">
                <Mail size={16} aria-hidden="true" />
                {t.contact.emailUnavailable}
              </span>
            )}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
