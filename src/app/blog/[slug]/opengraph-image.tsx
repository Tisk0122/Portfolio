import { ImageResponse } from "next/og";
import { getBlogPostBySlug, getSortedBlogPosts } from "@/data/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getSortedBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const title = post?.title.en ?? "Blog | Tisk";
  const tags = post?.tags ?? [];
  const dateLabel = post
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

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
            background:
              "radial-gradient(circle at 20% 30%, rgba(111,227,196,0.18), transparent 45%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 26, color: "#9aa0a6", letterSpacing: 4, display: "flex" }}>
            TISK DEV LOG
          </div>
          {dateLabel ? (
            <div style={{ fontSize: 24, color: "#5a6068", display: "flex" }}>· {dateLabel}</div>
          ) : null}
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 46 : 58,
            fontWeight: 700,
            color: "#f4f5f6",
            marginTop: 24,
            lineHeight: 1.15,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>

        {tags.length > 0 ? (
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {tags.slice(0, 3).map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "#6fe3c4",
                  border: "2px solid #6fe3c433",
                  borderRadius: 999,
                  padding: "8px 22px",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        ) : null}

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: "#6fe3c4",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
