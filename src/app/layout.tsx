import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { ScrollProgress } from "@/components/navigation/ScrollProgress";
import { SectionDots } from "@/components/navigation/SectionDots";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { PageTransition } from "@/components/animations/PageTransition";
import { TerminalBoot } from "@/components/effects/TerminalBoot";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { BackToTop } from "@/components/effects/BackToTop";
import { themeInitScript } from "@/lib/theme-context";
import { socialLinks } from "@/data/social";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taisuke Tokuda",
  alternateName: "Tisk",
  url: siteUrl,
  jobTitle: "Independent Developer",
  description:
    "Independent developer building small, useful web applications and tools that solve everyday problems.",
  sameAs: socialLinks.map((link) => link.url),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Taisuke Tokuda / Tisk — Independent Developer",
    template: "%s | Tisk",
  },
  description:
    "Tisk's personal portfolio — building web applications, tools, and digital experiences.",
  applicationName: "Tisk Portfolio",
  authors: [{ name: "Taisuke Tokuda" }],
  creator: "Taisuke Tokuda",
  keywords: [
    "Tisk",
    "Taisuke Tokuda",
    "Independent Developer",
    "Web Development",
    "Next.js",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Tisk Portfolio",
    title: "Taisuke Tokuda / Tisk — Independent Developer",
    description:
      "Tisk's personal portfolio — building web applications, tools, and digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taisuke Tokuda / Tisk — Independent Developer",
    description:
      "Tisk's personal portfolio — building web applications, tools, and digital experiences.",
  },
  icons: {
    icon: [
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className="dark" suppressHydrationWarning>
      <head>
        {/* Prevent a flash of the wrong theme before hydration */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <AppProviders>
          <TerminalBoot />
          <CursorGlow />
          <ScrollProgress />
          <Header />
          <SectionDots />
          <CommandPalette />
          <main id="main-content">
            <PageTransition>{children}</PageTransition>
          </main>
          <BackToTop />
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
