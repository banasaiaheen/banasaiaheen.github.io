import type { Language } from "../types/language";

/**
 * ============================================================================
 *  PROJECTS — one entry per card in the Projects section, shown in this exact
 *  order. Add, remove, or reorder entries freely; each card's displayed number
 *  (00, 01, 02...) is generated from its position in the list.
 *
 *  - slug      set it when the project has a child page: the card then links to
 *              /projects/<slug> (add the page in src/data/projectPages.ts)
 *  - disabled  shows the "Coming Soon" badge instead of a link
 *
 *  To add a project: add an entry here for both languages, then (optionally)
 *  its page in src/data/projectPages.ts.
 * ============================================================================
 */
export interface ProjectEntry {
  title: string;
  software: string;
  type: string;
  /** Hidden on disabled cards. */
  subText?: string;
  slug?: string;
  disabled?: boolean;
}

export const PROJECTS: Record<Language, ProjectEntry[]> = {
  english: [
    {
      title: "Portfolio Design",
      software: "FIGMA",
      type: "Personal",
      subText: "A behind-the-scenes look at how this portfolio was designed from concept to final product.",
      slug: "portfolio-design",
    },
    {
      title: "MedConnect",
      software: "FIGMA",
      type: "Case Study",
      subText: "One of the first case studies I created during my UX/UI journey.",
      slug: "medconnect",
    },
    { title: "Juthoor", software: "FIGMA", type: "Freelance Work", disabled: true },
  ],
  arabic: [
    {
      title: "تصميم ملف الأعمال",
      software: "FIGMA",
      type: "مشروع شخصي",
      subText: "نظرة من وراء الكواليس على كيفية تصميم ملف الأعمال هذا من الفكرة إلى المنتج النهائي.",
      slug: "portfolio-design",
    },
    {
      title: "MedConnect",
      software: "FIGMA",
      type: "دراسة حالة",
      subText: "إحدى أولى دراسات الحالة التي أنجزتها خلال رحلتي في تصميم تجربة المستخدم وواجهته.",
      slug: "medconnect",
    },
    { title: "Juthoor", software: "FIGMA", type: "عمل حر", disabled: true },
  ],
};
