import { ogImageSize, ogImageContentType, renderTerminalOgImage } from "@/lib/og-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Certifications | Taisuke Tokuda / Tisk";

export default async function Image() {
  return renderTerminalOgImage({
    command: "cat certifications.log",
    heading: "Certifications",
    subheading: "--status acquired,learning",
  });
}
