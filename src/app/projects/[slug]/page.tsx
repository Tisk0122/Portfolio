import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getSortedProjects } from "@/data/projects";
import { ProjectDetailView } from "@/components/projects/ProjectDetailView";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getSortedProjects().map((project) => ({ slug: project.slug }));
}

// Only the slugs above exist. Anything else is a router-level 404 — decided
// before any streaming/loading kicks in (which was committing a 200 status
// first and then failing to swap in the 404 for unmatched slugs).
export const dynamicParams = false;

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  // Also triggered here (not just in the page body below): this route has a
  // loading.tsx, which makes Next.js stream the response. If notFound() is
  // only called in the page component, the 200 status can already be
  // committed before the async render reaches it. Calling notFound() during
  // metadata generation runs before streaming starts, so the 404 status is
  // set correctly.
  if (!project) notFound();

  const description = `${project.description.en} / ${project.description.ja}`;

  return {
    title: project.name,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} | Tisk`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Tisk`,
      description,
    },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description.en,
    url: `${siteUrl}/projects/${project.slug}`,
    ...(project.links.demo ? { sameAs: [project.links.demo, project.links.github].filter(Boolean) } : {}),
    creator: {
      "@type": "Person",
      name: "Taisuke Tokuda",
      alternateName: "Tisk",
    },
    ...(project.tech.length > 0 ? { keywords: project.tech.join(", ") } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailView project={project} />
    </>
  );
}
