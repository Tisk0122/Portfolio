import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const description = "Let's build something — get in touch with Tisk.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    title: "Contact | Tisk",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Tisk",
    description,
  },
};

export default function ContactPage() {
  return <ContactSection headingLevel="h1" />;
}
