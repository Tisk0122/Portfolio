export interface SocialLink {
  label: string;
  url: string;
}

/**
 * Add more platforms here any time — X/Twitter, Zenn, Qiita, etc.
 * Each entry just needs a label and a URL.
 */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/Tisk0122" },
];

/**
 * Contact email is intentionally not hardcoded here.
 * Set NEXT_PUBLIC_CONTACT_EMAIL in your environment to enable it.
 */
export const contactEmail: string | undefined = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
