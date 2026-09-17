import type { Metadata } from "next";
import { CertificationsSection } from "@/components/sections/CertificationsSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description = "Certifications Tisk has earned, and what's currently being studied.";

export const metadata: Metadata = {
  title: "Certifications",
  description,
  alternates: { canonical: "/certifications" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/certifications`,
    title: "Certifications | Tisk",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications | Tisk",
    description,
  },
};

export default function CertificationsPage() {
  return <CertificationsSection headingLevel="h1" />;
}
