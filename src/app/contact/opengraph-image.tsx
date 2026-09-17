import { ogImageSize, ogImageContentType, renderTerminalOgImage } from "@/lib/og-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Contact | Taisuke Tokuda / Tisk";

export default async function Image() {
  return renderTerminalOgImage({
    command: "mail --compose",
    heading: "Contact",
    subheading: "--reach-out \"let's talk\"",
  });
}
