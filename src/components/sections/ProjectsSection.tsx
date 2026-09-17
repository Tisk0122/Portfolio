"use client";

import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getSortedProjects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { ProjectCard } from "@/components/projects/ProjectCard";

const AmbientBackground = dynamic(
  () => import("@/components/3d/AmbientBackground").then((mod) => mod.AmbientBackground),
  { ssr: false, loading: () => null }
);

export function ProjectsSection() {
  const { t, locale } = useLanguage();
  const projects = getSortedProjects();

  const statusLabels = {
    live: t.projects.statusLive,
    "in-development": t.projects.statusDev,
    "coming-soon": t.projects.statusComingSoon,
  } as const;

  return (
    <section id="projects" className="relative overflow-hidden py-28 sm:py-36">
      <AmbientBackground className="pointer-events-none absolute inset-0 -z-10 opacity-25" color="#7c9dff" />
      <Container>
        <SectionHeading kicker={t.projects.kicker} title={t.projects.title} intro={t.projects.intro} />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <RevealOnScroll as="li" key={project.slug} delay={0.06 * i} className="h-full">
              <ProjectCard
                project={project}
                locale={locale}
                statusLabel={statusLabels[project.status]}
                ctaLabel={t.projects.viewProject}
              />
            </RevealOnScroll>
          ))}

          <RevealOnScroll as="li" delay={0.06 * projects.length} className="h-full">
            <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[var(--border)] p-7 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface)] text-[var(--fg-muted)]">
                <Plus size={20} aria-hidden="true" />
              </span>
              <p className="text-sm font-medium text-[var(--fg)]">{t.projects.comingSoonTitle}</p>
              <p className="text-xs text-[var(--fg-muted)]">{t.projects.comingSoonBody}</p>
            </div>
          </RevealOnScroll>
        </ul>
      </Container>
    </section>
  );
}
