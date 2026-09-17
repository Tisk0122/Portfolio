import type { Metadata } from "next";
import { SkillsSection } from "@/components/sections/SkillsSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description = "Technologies Tisk works with, grouped by category.";

export const metadata: Metadata = {
  title: "Skills",
  description,
  alternates: { canonical: "/skills" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/skills`,
    title: "Skills | Tisk",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills | Tisk",
    description,
  },
};

export default function SkillsPage() {
  return <SkillsSection headingLevel="h1" />;
}
