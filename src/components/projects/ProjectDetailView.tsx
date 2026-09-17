"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getSortedProjects } from "@/data/projects";
import type { Project } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { PROJECT_ICONS } from "@/components/projects/project-icons";

const DETAIL_ORDER = [
  "overview",
  "whyIBuiltIt",
  "features",
  "technology",
  "design",
  "technicalPoints",
  "challenges",
  "privacy",
  "whatILearned",
] as const;

export function ProjectDetailView({ project }: { project: Project }) {
  const { t, locale } = useLanguage();
  const Icon = PROJECT_ICONS[project.symbol];

  const statusLabel =
    project.status === "live"
      ? t.projects.statusLive
      : project.status === "in-development"
        ? t.projects.statusDev
        : t.projects.statusComingSoon;

  const featureList = locale === "ja" ? project.features.ja : project.features.en;
  const detailEntries = project.detail
    ? DETAIL_ORDER.filter((key) => project.detail?.[key])
    : [];

  const projects = getSortedProjects();
  const projectIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex >= 0 && projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;

  return (
    <article className="py-28 sm:py-36">
      <Container className="max-w-3xl">
        <RevealOnScroll>
          <Link
            href="/#projects"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t.projects.backToProjects}
          </Link>

          <div className="flex items-center gap-4">
            <span
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: `${project.accentColor}1a`, color: project.accentColor }}
            >
              <Icon size={26} aria-hidden="true" />
            </span>
            <div>
              <span
                className="mb-1 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium"
                style={{ borderColor: `${project.accentColor}55`, color: project.accentColor }}
              >
                {statusLabel}
              </span>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
                {project.name}
              </h1>
            </div>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-[var(--fg-muted)]">
            {locale === "ja" ? project.description.ja : project.description.en}
          </p>
        </RevealOnScroll>

        {(project.links.demo || project.links.github) ? (
          <RevealOnScroll delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.demo ? (
                <Button href={project.links.demo} external variant="primary">
                  <ExternalLink size={16} aria-hidden="true" />
                  {t.projects.liveDemo}
                </Button>
              ) : null}
              {project.links.github ? (
                <Button href={project.links.github} external variant="secondary">
                  <Github size={16} aria-hidden="true" />
                  {t.projects.viewGithub}
                </Button>
              ) : null}
            </div>
          </RevealOnScroll>
        ) : null}

        {project.tech.length > 0 ? (
          <RevealOnScroll delay={0.15}>
            <div className="mt-12">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                {t.detail.techStack}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full bg-[var(--surface)] px-3 py-1.5 text-sm text-[var(--fg)] ring-1 ring-[var(--border)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        ) : null}

        {featureList.length > 0 ? (
          <RevealOnScroll delay={0.2}>
            <div className="mt-12">
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--fg-muted)]">
                {t.detail.features}
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {featureList.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-xl bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--fg-muted)] ring-1 ring-[var(--border)]"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        ) : null}

        {detailEntries.length > 0 ? (
          <div className="mt-14 space-y-10 border-t border-[var(--border)] pt-10">
            {detailEntries.map((key, i) => {
              const section = project.detail?.[key];
              if (!section) return null;
              return (
                <RevealOnScroll key={key} delay={0.05 * i}>
                  <h2 className="mb-2 text-lg font-semibold text-[var(--fg)]">{t.detail[key]}</h2>
                  <p className="leading-relaxed text-[var(--fg-muted)]">
                    {locale === "ja" ? section.ja : section.en}
                  </p>
                </RevealOnScroll>
);
          })}
          </div>
        ) : null}

        {(prevProject || nextProject) ? (
          <nav
            aria-label="Project navigation"
            className="mt-16 grid gap-4 border-t border-[var(--border)] pt-10 sm:grid-cols-2"
          >
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
              >
                <ChevronLeft size={18} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs text-[var(--fg-muted)]">{t.projects.prevProject}</span>
                  <span className="truncate text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)]">
                    {prevProject.name}
                  </span>
                </span>
              </Link>
            ) : null}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-right transition-colors hover:border-[var(--accent)]"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs text-[var(--fg-muted)]">{t.projects.nextProject}</span>
                  <span className="truncate text-sm font-medium text-[var(--fg)] group-hover:text-[var(--accent)]">
                    {nextProject.name}
                  </span>
                </span>
                <ChevronRight size={18} className="shrink-0 text-[var(--accent)]" aria-hidden="true" />
              </Link>
            ) : null}
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
