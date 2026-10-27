import { SITE_EMAIL } from "./siteProfile";

/**
 * ============================================================================
 *  SOCIAL / CONTACT LINKS — shown in the site navigation (email, LinkedIn,
 *  Figma). `id` must match a key under `nav` in
 *  src/i18n/translations/{en,ar}.ts, which supplies the button label.
 * ============================================================================
 */
export interface SocialLink {
  id: "email" | "linkedin" | "figma";
  href: string;
  target?: string;
  rel?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "email", href: `mailto:${SITE_EMAIL}` },
  { id: "linkedin", href: "https://www.linkedin.com/in/bana-saiaheen", target: "_blank", rel: "noreferrer" },
  { id: "figma", href: "https://www.figma.com/@banasaiaheen", target: "_blank", rel: "noreferrer" },
];
