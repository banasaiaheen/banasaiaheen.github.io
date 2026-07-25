import type { Language } from "../types/language";

/**
 * ============================================================================
 *  SKILLS / TOOLS — shown as a list of tags in the About section, in this
 *  exact order. Add, remove, or reorder freely.
 * ============================================================================
 */
export const SKILLS: Record<Language, string[]> = {
  english: [
    "DESIGN SYSTEMS",
    "PROTOTYPING",
    "INTERACTIVE DESIGNS",
    "WIREFRAMING",
    "ACCESSIBILITY",
    "DESIGN THINKING",
    "USER RESEARCH",
    "USABILITY TESTING",
    "FIGMA",
  ],
  arabic: [
    "أنظمة التصميم",
    "النماذج الأولية",
    "تصاميم تفاعلية",
    "المخططات السلكية",
    "إمكانية الوصول",
    "التفكير التصميمي",
    "أبحاث المستخدم",
    "اختبار قابلية الاستخدام",
    "FIGMA",
  ],
};
