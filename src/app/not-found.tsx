"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  const { t, locale } = useLanguage();
  // The global not-found boundary is prerendered as a single static shell
  // (it doesn't know the requested path at build time), so usePathname()
  // here would report a different value during SSR than the real URL the
  // client is on — causing a hydration mismatch on truly unmatched routes.
  // Render a fixed placeholder for the initial (server-matching) render,
  // then swap in the real path client-side after mount.
  const [attempted, setAttempted] = useState("/unknown");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAttempted(window.location.pathname);
    }
  }, []);

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
            <p className="break-all text-[var(--fg-muted)]">
              <span className="text-[var(--accent)]">$</span> cd {attempted}
            </p>
            <p className="text-[var(--fg)]">
              cd: no such file or directory
            </p>
            <p className="text-[var(--fg-muted)]">
              <span className="text-[var(--accent)]">$</span> exit{" "}
              <span className="ml-1 inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-[var(--accent)] motion-safe:animate-[cursor-blink_1s_steps(2,start)_infinite]" />
            </p>
          </div>
        </div>

        <p className="mt-8 font-mono text-sm text-[var(--accent)]">Error 404</p>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--fg)] sm:text-3xl">
          {locale === "ja" ? "ページが見つかりません" : "Page not found"}
        </h1>
        <p className="mt-3 text-[var(--fg-muted)]">
          {locale === "ja"
            ? "お探しのページは存在しないか、移動した可能性があります。"
            : "The page you're looking for doesn't exist or may have moved."}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t.nav.home}
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--fg)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]"
          >
            <FolderGit2 size={16} aria-hidden="true" />
            {t.nav.projects}
          </Link>
        </div>

        <p className="mt-8 font-mono text-xs text-[var(--fg-muted)]">{t.common.pressQuestion}</p>
      </Container>
    </div>
  );
}