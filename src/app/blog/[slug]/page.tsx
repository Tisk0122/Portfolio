import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getSortedBlogPosts } from "@/data/blog";
import { BlogPostView } from "@/components/blog/BlogPostView";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getSortedBlogPosts().map((post) => ({ slug: post.slug }));
}

// Only the slugs above exist. Anything else is a router-level 404 — decided
// before any streaming kicks in. (Projects had the same pattern: a loading.tsx
// was committing a 200 status before the page body's notFound() could run.)
export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const description = `${post.excerpt.en} / ${post.excerpt.ja}`;

  return {
    title: post.title.en,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.title.en} | Tisk`,
      description,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title.en} | Tisk`,
      description,
    },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.en,
    description: post.excerpt.en,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    url: `${siteUrl}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: "Taisuke Tokuda",
      alternateName: "Tisk",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostView post={post} />
    </>
  );
}
