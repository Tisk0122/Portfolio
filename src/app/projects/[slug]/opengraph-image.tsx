import { ImageResponse } from "next/og";
import { getProjectBySlug, getSortedProjects } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getSortedProjects().map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const name = project?.name ?? "Tisk";
  const tagline = project ? project.tagline.en : "Independent Developer";
  const accent = project?.accentColor ?? "#6fe3c4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08090b",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 20% 30%, ${accent}2e, transparent 45%)`,
            display: "flex",
          }}
        />
        <div style={{ fontSize: 26, color: "#9aa0a6", letterSpacing: 4, display: "flex" }}>
          TISK PROJECT
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, color: "#f4f5f6", marginTop: 20, display: "flex" }}>
          {name}
        </div>
        <div style={{ fontSize: 30, color: accent, marginTop: 20, maxWidth: 860, display: "flex" }}>
          {tagline}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: accent,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
