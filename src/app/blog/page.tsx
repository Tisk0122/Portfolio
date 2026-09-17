import type { Metadata } from "next";
import { BlogSection } from "@/components/sections/BlogSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description =
  "Dev log — design decisions, what didn't work, and what Tisk learned building small tools and Security AI.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Blog | Tisk",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Tisk",
    description,
  },
};

export default function BlogPage() {
  return <BlogSection headingLevel="h1" />;
}
