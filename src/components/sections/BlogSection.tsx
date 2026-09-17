"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { getSortedBlogPosts, estimateReadingMinutes } from "@/data/blog";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

export function BlogSection({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const { t, locale } = useLanguage();
  const posts = getSortedBlogPosts();
  const dateLocale = locale === "ja" ? "ja-JP" : "en-US";

  return (
    <section id="blog" className="relative py-28 sm:py-36">
      <Container className="max-w-3xl">
        <SectionHeading
          kicker={t.blog.kicker}
          title={t.blog.title}
          intro={t.blog.intro}
          headingLevel={headingLevel}
        />

        <ul className="mt-14 flex flex-col gap-6">
          {posts.map((post, i) => (
            <RevealOnScroll as="li" key={post.slug} delay={0.06 * i}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-colors hover:border-[var(--accent)]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--fg-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} aria-hidden="true" />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} aria-hidden="true" />
                    {estimateReadingMinutes(post)} {t.blog.minRead}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  {locale === "ja" ? post.title.ja : post.title.en}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-muted)]">
                  {locale === "ja" ? post.excerpt.ja : post.excerpt.en}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--bg)] px-2.5 py-1 text-[11px] text-[var(--fg-muted)] ring-1 ring-[var(--border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--fg)] transition-colors group-hover:text-[var(--accent)]">
                  {t.blog.readMore}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </ul>
      </Container>
    </section>
  );
}
