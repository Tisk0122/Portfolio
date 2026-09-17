import type { Metadata } from "next";
import { PhilosophySection } from "@/components/sections/PhilosophySection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description = "Technology is a tool. The goal is the experience it creates.";

export const metadata: Metadata = {
  title: "Philosophy",
  description,
  alternates: { canonical: "/philosophy" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/philosophy`,
    title: "Philosophy | Tisk",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Philosophy | Tisk",
    description,
  },
};

export default function PhilosophyPage() {
  return (
    <>
      <h1 className="sr-only">{description}</h1>
      <PhilosophySection />
    </>
  );
}
