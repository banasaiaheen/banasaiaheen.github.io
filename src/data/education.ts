import type { Language } from "../types/language";

/**
 * ============================================================================
 *  EDUCATION — the main degree entry, plus a list of smaller "sub" cards
 *  (courses/certifications). Add, remove, or reorder subEntries freely; each
 *  card's displayed number (00, 01, 02...) is generated from its position in
 *  the list automatically.
 * ============================================================================
 */
export interface EducationMainEntry {
  dateRange: string;
  degree: string;
  institution: string;
}

export interface EducationSubEntry {
  year: string;
  name: string;
  source: string;
}

export interface EducationContent {
  main: EducationMainEntry;
  subEntries: EducationSubEntry[];
}

export const EDUCATION: Record<Language, EducationContent> = {
  english: {
    main: {
      dateRange: "2016 — 2022",
      degree: "BACHELOR'S IN COMPUTER GRAPHICS & ANIMATION",
      institution: "Princess Sumaya University for Technology",
    },
    subEntries: [
      { year: "2025", name: "USER CENTERED", source: "IxDF" },
      { year: "2025", name: "USER CENTERED", source: "IxDF" },
      { year: "2025", name: "USER CENTERED", source: "IxDF" },
      { year: "2025", name: "USER CENTERED", source: "IxDF" },
    ],
  },
  arabic: {
    main: {
      dateRange: "2016 — 2022",
      degree: "بكالوريوس في الرسوم الحاسوبية والرسوم المتحركة",
      institution: "الجامعة الأميرة سمية للتكنولوجيا",
    },
    subEntries: [
      { year: "2025", name: "تصميم محوره المستخدم", source: "IxDF" },
      { year: "2025", name: "تصميم محوره المستخدم", source: "IxDF" },
      { year: "2025", name: "تصميم محوره المستخدم", source: "IxDF" },
      { year: "2025", name: "تصميم محوره المستخدم", source: "IxDF" },
    ],
  },
};
