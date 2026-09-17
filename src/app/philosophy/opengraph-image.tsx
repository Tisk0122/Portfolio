import { ogImageSize, ogImageContentType, renderTerminalOgImage } from "@/lib/og-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Philosophy | Taisuke Tokuda / Tisk";

export default async function Image() {
  return renderTerminalOgImage({
    command: "cat philosophy.md",
    heading: "Philosophy",
    subheading: "--principle \"honest over impressive\"",
  });
}
