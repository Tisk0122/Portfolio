import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/**
 * Renders the same terminal-window OGP look used on the homepage, so every
 * page shares one consistent, recognizable social-preview style instead of
 * a plain generic fallback.
 */
export function renderTerminalOgImage({
  command,
  heading,
  subheading,
}: {
  /** Shown after the prompt, e.g. "cat about.md" */
  command: string;
  heading: string;
  subheading: string;
}) {
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
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px circle at 15% 20%, rgba(111,227,196,0.18), transparent 55%), radial-gradient(500px circle at 85% 80%, rgba(111,227,196,0.08), transparent 55%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: "#101215",
            border: "2px solid #23262b",
            borderRadius: 18,
            padding: "36px 44px 40px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 34, width: "100%" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ff5f57", display: "flex" }} />
              <div style={{ width: 14, height: 14, borderRadius: 999, background: "#febc2e", display: "flex" }} />
              <div style={{ width: 14, height: 14, borderRadius: 999, background: "#28c840", display: "flex" }} />
            </div>
            <div
              style={{
                marginLeft: 24,
                fontSize: 26,
                color: "#9aa0a6",
                fontFamily: "monospace",
                letterSpacing: 1,
                display: "flex",
              }}
            >
              tisk — zsh (portfolio)
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontFamily: "monospace", fontSize: 34, color: "#9aa0a6" }}>
              <span style={{ display: "flex", color: "#6fe3c4" }}>tisk@portfolio</span>
              <span style={{ display: "flex" }}>:~$ {command}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", marginLeft: 34, gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 68,
                  fontWeight: 800,
                  color: "#f4f5f6",
                  letterSpacing: -1,
                  lineHeight: 1.05,
                }}
              >
                {heading}
              </div>
              <div style={{ display: "flex", fontSize: 30, color: "#6fe3c4", fontFamily: "monospace" }}>
                {subheading}
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
                <div style={{ display: "flex", fontSize: 28, color: "#9aa0a6", fontFamily: "monospace" }}>
                  tisk@portfolio:~$
                </div>
                <div style={{ display: "flex", width: 22, height: 44, background: "#6fe3c4" }} />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 10,
            background: "linear-gradient(90deg, #6fe3c4, #2dd4bf)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...ogImageSize }
  );
}
