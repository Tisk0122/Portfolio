"use client";

import Link from "next/link";
import { AlertTriangle, Home, RotateCw } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Container } from "@/components/ui/Container";

export default function Error({ reset }: { reset: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[75vh] items-center py-28">
      <Container className="max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-[var(--fg-muted)]">tisk — zsh</span>
          </div>

          <div className="space-y-1.5 p-6 font-mono text-sm leading-7">
            <p className="text-[var(--fg-muted)]">
              <span className="text-[var(--accent)]">$</span> ./portfolio --serve
            </p>
            <p className="text-rose-400">
              zsh: segmentation fault{" "}
              <span className="text-[var(--fg-muted)]">(core dumped)</span>
            </p>
            <p className="text-[var(--fg-muted)]">
              <span className="text-[var(--accent)]">$</span>{" "}
              <span className="inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-[var(--accent)] motion-safe:animate-[cursor-blink_1s_steps(2,start)_infinite]" />
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <AlertTriangle size={20} className="shrink-0 text-rose-400" aria-hidden="true" />
          <div>
            <h1 className="text-2xl font-semibold text-[var(--fg)] sm:text-3xl">{t.error.title}</h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">{t.error.body}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            <RotateCw size={16} aria-hidden="true" />
            {t.error.retry}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--fg)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]"
          >
            <Home size={16} aria-hidden="true" />
            {t.nav.home}
          </Link>
        </div>
      </Container>
    </div>
  );
}