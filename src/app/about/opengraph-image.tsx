import { ogImageSize, ogImageContentType, renderTerminalOgImage } from "@/lib/og-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "About | Taisuke Tokuda / Tisk";

export default async function Image() {
  return renderTerminalOgImage({
    command: "cat about.md",
    heading: "About",
    subheading: "--name \"Taisuke Tokuda\" --alias tisk",
  });
}
