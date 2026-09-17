"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "skills",
  "certifications",
  "philosophy",
  "contact",
] as const;

type SectionId = (typeof SECTION_IDS)[number];

/**
 * A slim column of dots on the right edge of the viewport (desktop only)
 * showing which section of the one-page home is currently in view, and
 * letting the user jump directly to any of them. Only rendered on "/"
 * since the standalone sub-pages don't have all sections present.
 */
export function SectionDots() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId>("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(visible.target.id as SectionId);
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  const labels: Record<SectionId, string> = {
    home: t.nav.home,
    about: t.nav.about,
    projects: t.nav.projects,
    skills: t.nav.skills,
    certifications: t.nav.certifications,
    philosophy: t.nav.philosophy,
    contact: t.nav.contact,
  };

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {SECTION_IDS.map((id) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={labels[id]}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={
                "block rounded-full border transition-all duration-300 " +
                (isActive
                  ? "h-2.5 w-2.5 border-[var(--accent)] bg-[var(--accent)]"
                  : "h-1.5 w-1.5 border-[var(--fg-muted)] bg-transparent group-hover:h-2 group-hover:w-2 group-hover:border-[var(--fg)]")
              }
            />
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md bg-[var(--surface)] px-2.5 py-1 text-xs text-[var(--fg)] opacity-0 shadow-lg ring-1 ring-[var(--border)] transition-opacity duration-200 group-hover:opacity-100">
              {labels[id]}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
