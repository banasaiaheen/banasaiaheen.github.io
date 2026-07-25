import type { Language } from "../types/language";

/**
 * ============================================================================
 *  CONTACT FORM — "Type of inquiry" dropdown options. Add, remove, or
 *  reorder freely.
 * ============================================================================
 */
export const INQUIRY_OPTIONS: Record<Language, string[]> = {
  english: ["Freelance", "Full-time", "Part-time", "Design Systems", "Other"],
  arabic: ["عمل حر", "دوام كامل", "دوام جزئي", "أنظمة التصميم", "أخرى"],
};
