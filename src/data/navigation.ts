/**
 * ============================================================================
 *  NAVIGATION STRUCTURE — add, remove, or reorder nav items / page sections
 *  here. The row number shown in the nav (00, 01, 02...) and each section's
 *  large decorative background number are both derived from this order
 *  automatically, so reordering here keeps everything in sync.
 *
 *  Each `id` must match:
 *   - a key under `nav.tabs` in src/i18n/translations/{en,ar}.ts
 *   - the `id="..."` on the matching section in src/components/sections/
 * ============================================================================
 */
export type SectionId = "home" | "about" | "experience" | "education" | "projects" | "contact";

export interface NavItem {
  id: SectionId;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "experience", href: "#experience" },
  { id: "education", href: "#education" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
];

export const SECTION_IDS: SectionId[] = NAV_ITEMS.map((item) => item.id);

/**
 * Zero-padded position of a section in NAV_ITEMS, e.g. getSectionNumber("experience") -> "02".
 * Used for both the nav row number and each section's decorative ghost number.
 */
export function getSectionNumber(id: SectionId): string {
  const index = NAV_ITEMS.findIndex((item) => item.id === id);
  return String(Math.max(index, 0)).padStart(2, "0");
}
