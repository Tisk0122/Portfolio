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

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

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
