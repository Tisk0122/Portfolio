import { ogImageSize, ogImageContentType, renderTerminalOgImage } from "@/lib/og-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Skills | Taisuke Tokuda / Tisk";

export default async function Image() {
  return renderTerminalOgImage({
    command: "ls skills/",
    heading: "Skills",
    subheading: "--stack frontend,backend,ml,languages",
  });
}
