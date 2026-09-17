import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog | Tisk";

export default async function Image() {
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
        <div style={{ fontSize: 26, color: "#9aa0a6", letterSpacing: 4, display: "flex" }}>
          TISK DEV LOG
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "#f4f5f6",
            marginTop: 20,
            display: "flex",
          }}
        >
          Blog
        </div>
        <div style={{ fontSize: 30, color: "#6fe3c4", marginTop: 20, maxWidth: 860, display: "flex" }}>
          Design decisions, what didn&apos;t work, and what I learned.
        </div>
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
