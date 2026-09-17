"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { PROJECT_ICONS } from "./project-icons";
import { GithubStars } from "./GithubStars";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  statusLabel: string;
  ctaLabel: string;
}

export function ProjectCard({ project, locale, statusLabel, ctaLabel }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-8, 8]);
  const Icon = PROJECT_ICONS[project.symbol];

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  const isDisabled = project.status !== "live";

  const card = (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-colors duration-300 group-focus-visible:border-[var(--accent)]/60 motion-reduce:!transform-none"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-35 group-focus-visible:opacity-35"
        style={{ background: project.accentColor }}
        aria-hidden="true"
      />
      {/* Vertical shine sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-2/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[400%] motion-reduce:hidden"
      />
      <div
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ background: `${project.accentColor}1a`, color: project.accentColor }}
      >
        <Icon size={22} aria-hidden="true" />
      </div>

      <span
        className="mb-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
        style={{ borderColor: `${project.accentColor}55`, color: project.accentColor }}
      >
        {statusLabel}
      </span>

      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-semibold text-[var(--fg)]">{project.name}</h3>
        {project.links.github ? <GithubStars repoUrl={project.links.github} /> : null}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">
        {locale === "ja" ? project.tagline.ja : project.tagline.en}
      </p>

      {project.tech.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)] ring-1 ring-[var(--border)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}

      {!isDisabled ? (
        <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)]">
          {ctaLabel}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
          />
        </div>
      ) : null}
    </motion.div>
  );

  if (isDisabled) {
    return (
      <div className="h-full opacity-70" style={{ perspective: 800 }}>
        {card}
      </div>
    );
  }

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      style={{ perspective: 800 }}
    >
      {card}
    </Link>
  );
}
