"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Container } from "@/components/ui/Container";

export default function BlogPostNotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[60vh] items-center py-28">
      <Container className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold text-[var(--fg)]">{t.blog.notFoundTitle}</h1>
        <p className="mt-3 text-[var(--fg-muted)]">{t.blog.notFoundBody}</p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.blog.backToBlog}
        </Link>
      </Container>
    </div>
  );
}
