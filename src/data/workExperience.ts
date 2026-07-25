import type { Language } from "../types/language";

/**
 * ============================================================================
 *  WORK EXPERIENCE — one entry per job/role, shown in the Experience section
 *  in this exact order. Add, remove, or reorder entries freely.
 *
 *  Fields:
 *   - freelance: shows the company/employment-type/location row when true
 *   - recommendation: shows the "Experience Letter" link when true
 *   - experienceLetterHref: where that link points (only used if recommendation is true)
 * ============================================================================
 */
export interface WorkExperienceEntry {
  title: string;
  freelance?: boolean;
  recommendation?: boolean;
  experienceLetterHref?: string;
  from?: string;
  to?: string;
  subText?: string;
  companyName?: string;
  employmentType?: string;
  location?: string;
}

export const WORK_EXPERIENCE: Record<Language, WorkExperienceEntry[]> = {
  english: [
    {
      title: "FREELANCE",
      freelance: false,
      recommendation: false,
      from: "2026",
      to: "PRESENT",
      subText: "Touching grass between pixels.",
    },
    {
      title: "UX/UI DESIGNER",
      experienceLetterHref: "#",
      companyName: "ADRES via Estarta Solutions",
      employmentType: "Full-time",
      location: "Hybrid",
      from: "2023",
      to: "2026",
      subText:
        "Designed the digital real estate experience for Digital Sharjah and TAMM Abu Dhabi, translating complex government services into clear and accessible digital experiences. Collaborated with my team on ADREC and created the product's design system, enabling scalable, consistent experiences across the platform.",
    },
  ],
  arabic: [
    {
      title: "عمل حر",
      freelance: false,
      recommendation: false,
      from: "2026",
      to: "حتى الآن",
      subText: "لحظة راحة بين وحدات البكسل.",
    },
    {
      title: "مصممة تجربة المستخدم وواجهة المستخدم",
      experienceLetterHref: "#",
      companyName: "ADRES via Estarta Solutions",
      employmentType: "دوام كامل",
      location: "عمل هجين",
      from: "2023",
      to: "2026",
      subText:
        "صممت تجربة العقارات الرقمية لكل من الشارقة الرقمية وتم أبوظبي، محولةً خدمات حكومية معقدة إلى تجارب رقمية واضحة وسهلة الوصول. تعاونت مع فريقي في مشروع ADREC وأنشأت نظام التصميم الخاص بالمنتج، مما مكّن من تجارب متسقة وقابلة للتوسع عبر المنصة.",
    },
  ],
};
