"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { Container } from "@/components/ui/Container";

export default function ProjectNotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-[60vh] items-center py-28">
      <Container className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold text-[var(--fg)]">{t.projects.notFoundTitle}</h1>
        <p className="mt-3 text-[var(--fg-muted)]">{t.projects.notFoundBody}</p>
        <Link
          href="/#projects"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.projects.backToProjects}
        </Link>
      </Container>
    </div>
  );
}
