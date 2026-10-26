/**
 * ============================================================================
 *  SOCIAL / CONTACT LINKS — shown in the site navigation (email, LinkedIn,
 *  Figma). `id` must match a key under `nav` in
 *  src/i18n/translations/{en,ar}.ts, which supplies the button label.
 *
 *  TODO: these hrefs are placeholders carried over from the original design —
 *  replace them with your real profile links.
 * ============================================================================
 */
export interface SocialLink {
  id: "email" | "linkedin" | "figma";
  href: string;
  target?: string;
  rel?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "email", href: "mailto:hello@example.com" },
  { id: "linkedin", href: "https://linkedin.com", target: "_blank", rel: "noreferrer" },
  { id: "figma", href: "https://figma.com", target: "_blank", rel: "noreferrer" },
];
