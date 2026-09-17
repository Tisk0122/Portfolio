"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { BlogPost } from "@/data/blog";
import { estimateReadingMinutes } from "@/data/blog";
import { getProjectBySlug } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function BlogPostView({ post }: { post: BlogPost }) {
  const { t, locale } = useLanguage();
  const dateLocale = locale === "ja" ? "ja-JP" : "en-US";
  const relatedProject = post.relatedProjectSlug ? getProjectBySlug(post.relatedProjectSlug) : undefined;

  return (
    <article className="py-28 sm:py-36">
      <Container className="max-w-2xl">
        <RevealOnScroll>
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t.blog.backToBlog}
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {t.blog.publishedOn}{" "}
                {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} aria-hidden="true" />
              {estimateReadingMinutes(post)} {t.blog.minRead}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[var(--fg)] sm:text-4xl">
            {locale === "ja" ? post.title.ja : post.title.en}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--surface)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)] ring-1 ring-[var(--border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </RevealOnScroll>

        <div className="mt-10 flex flex-col gap-6">
          {post.body.map((block, i) => (
            <RevealOnScroll key={i} delay={0.04 * i}>
              <p className="text-base leading-relaxed text-[var(--fg-muted)]">
                {locale === "ja" ? block.ja : block.en}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        {relatedProject ? (
          <RevealOnScroll delay={0.1}>
            <div className="mt-14 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-[var(--fg-muted)]">
                {t.detail.links}
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--fg)]">{relatedProject.name}</p>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">
                {locale === "ja" ? relatedProject.tagline.ja : relatedProject.tagline.en}
              </p>
              <div className="mt-4">
                <Button href={`/projects/${relatedProject.slug}`} variant="secondary">
                  {t.projects.viewProject}
                </Button>
              </div>
            </div>
          </RevealOnScroll>
        ) : null}
      </Container>
    </article>
  );
}
