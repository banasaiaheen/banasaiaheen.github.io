import type { Language } from "../types/language";

/**
 * ============================================================================
 *  RESOURCES / PROJECTS — one entry per card in the Resources section, shown
 *  in this exact order. Add, remove, or reorder entries freely; each card's
 *  displayed number (00, 01, 02...) is generated from its position in the
 *  list automatically.
 *
 *  Set `disabled: true` to show a "Coming Soon" badge instead of a link.
 * ============================================================================
 */
export interface ResourceEntry {
  title: string;
  type?: string;
  subText: string;
  disabled?: boolean;
  href?: string;
  software?: string;
  /** Matches a key in src/data/caseStudies.ts if this card has a real sub-page. */
  slug?: string;
}

const behindTheScenesEn =
  "A behind-the-scenes look at how this portfolio was designed from concept to final product.";
const behindTheScenesAr = "نظرة خلف الكواليس على كيفية تصميم هذا الملف الشخصي من الفكرة إلى المنتج النهائي.";

export const RESOURCES: Record<Language, ResourceEntry[]> = {
  english: [
    {
      title: "Portfolio Design",
      type: "Personal",
      subText: behindTheScenesEn,
      href: "/resources/portfolio-design",
      slug: "portfolio-design",
      software: "FIGMA",
    },
    { title: "StayJO", type: "Freelance Work", subText: behindTheScenesEn, href: "#", software: "FIGMA" },
    { title: "MedConnect", type: "Case Study", subText: behindTheScenesEn, href: "#", software: "FIGMA" },
    { title: "Design System", disabled: true, subText: behindTheScenesEn, href: "#", software: "FIGMA" },
  ],
  arabic: [
    {
      title: "تصميم الملف الشخصي",
      type: "شخصي",
      subText: behindTheScenesAr,
      href: "/resources/portfolio-design",
      slug: "portfolio-design",
      software: "FIGMA",
    },
    { title: "StayJO", type: "عمل مستقل", subText: behindTheScenesAr, href: "#", software: "FIGMA" },
    { title: "MedConnect", type: "دراسة حالة", subText: behindTheScenesAr, href: "#", software: "FIGMA" },
    { title: "نظام التصميم", disabled: true, subText: behindTheScenesAr, href: "#", software: "FIGMA" },
  ],
};
