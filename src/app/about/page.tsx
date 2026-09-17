import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description =
  "Taisuke Tokuda (Tisk) is an independent developer building small, useful web tools and services.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/about`,
    title: "About | Tisk",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Tisk",
    description,
  },
};

export default function AboutPage() {
  return <AboutSection headingLevel="h1" />;
}
