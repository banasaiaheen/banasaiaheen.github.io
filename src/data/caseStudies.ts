import type { Language } from "../types/language";

/**
 * ============================================================================
 *  CASE STUDY / RESOURCE SUB-PAGES — content for individual project detail
 *  pages (src/pages/ResourceDetailPage.tsx), keyed by the same `slug` you set
 *  on the card in src/data/resources.ts.
 *
 *  To add a sub-page for another resource:
 *   1. Add `slug: "your-slug"` and `href: "/resources/your-slug"` to its
 *      entry in src/data/resources.ts (both languages).
 *   2. Add a "your-slug" entry below (both languages).
 *  Removing a slug's entry here (or from resources.ts) is safe — cards with
 *  no matching slug just aren't linked yet, and stale URLs show the "not
 *  found" state instead of crashing.
 * ============================================================================
 */
export interface CaseStudyHighlight {
  title: string;
  description: string;
}

export interface CaseStudyGalleryItem {
  caption: string;
}

export interface CaseStudyContent {
  title: string;
  category: string;
  summary: string;
  role: string;
  tools: string;
  year: string;
  overview: string[];
  highlights: CaseStudyHighlight[];
  gallery: CaseStudyGalleryItem[];
  outcome: string[];
}

export const CASE_STUDIES: Record<Language, Record<string, CaseStudyContent>> = {
  english: {
    "portfolio-design": {
      title: "Portfolio Design",
      category: "Personal Project",
      summary: "A bilingual, pixel-accurate portfolio built from Figma, refactored for real-world editability.",
      role: "UX/UI Design & Front-End Development",
      tools: "Figma, React, TypeScript, Tailwind CSS",
      year: "2026",
      overview: [
        "The goal was to turn a Figma design system into a real, production bilingual site (English/Arabic) with pixel-accurate right-to-left mirroring — not just a translated copy of an English layout.",
        "The scope covers every section: hero, about, work experience, education, resources, and contact — each built to match the Figma spec exactly, including hover states, spacing, and responsive breakpoints.",
      ],
      highlights: [
        {
          title: "Figma-to-code, pixel by pixel",
          description:
            "Pulled exact component specs — spacing, typography, color — straight from Figma's dev-mode tools instead of eyeballing screenshots, keeping the build faithful to the source design.",
        },
        {
          title: "Bilingual from day one",
          description:
            "Every component sets its own dir attribute and mirrors icons, borders, and padding for Arabic, with a Cairo/Barlow Condensed font-swap system so Latin and Arabic text each render in their correct display face.",
        },
        {
          title: "Refactored for real editability",
          description:
            "Split all content and translations out of the UI components into dedicated data/ and i18n/ folders, so text, work history, education, and resource cards can be edited without touching component code.",
        },
        {
          title: "Small, reusable systems",
          description:
            "Built a generic pagination system, a shared card set (Work/Education/Resources/SkillTool), and a single canonical Language type instead of duplicating it across nine components.",
        },
      ],
      gallery: [
        { caption: "Hero — bilingual landing with mirrored layout" },
        { caption: "Resources — paginated project cards" },
        { caption: "Contact — validated form with EmailJS" },
      ],
      outcome: [
        "The result is a site its owner can update herself — swapping in a new project, translating a headline, or reordering the nav — without writing code, while still matching the original Figma design pixel-for-pixel in both languages and at every breakpoint.",
      ],
    },
  },
  arabic: {
    "portfolio-design": {
      title: "تصميم الملف الشخصي",
      category: "مشروع شخصي",
      summary: "موقع شخصي ثنائي اللغة ودقيق التفاصيل مبني من Figma، أُعيدت هيكلته ليكون قابلاً للتعديل فعليًا.",
      role: "تصميم UX/UI وتطوير الواجهة الأمامية",
      tools: "Figma، React، TypeScript، Tailwind CSS",
      year: "2026",
      overview: [
        "كان الهدف تحويل نظام تصميم من Figma إلى موقع فعلي ثنائي اللغة (عربي/إنجليزي) بمحاذاة دقيقة للتخطيط من اليمين إلى اليسار — لا مجرد نسخة مترجمة من تخطيط إنجليزي.",
        "يغطي النطاق كل قسم: الرئيسية، نبذة عني، الخبرة العملية، التعليم، الموارد، والتواصل — كلها مبنية لتطابق مواصفات Figma تمامًا، بما في ذلك حالات التحويم والتباعد ونقاط الاستجابة.",
      ],
      highlights: [
        {
          title: "من Figma إلى الكود، بكسل ببكسل",
          description:
            "سحبت المواصفات الدقيقة للمكونات — التباعد والطباعة والألوان — مباشرة من أدوات وضع المطورين في Figma بدلاً من الاعتماد على لقطات الشاشة، للحفاظ على أمانة التصميم الأصلي.",
        },
        {
          title: "ثنائي اللغة منذ البداية",
          description:
            "كل مكون يضبط اتجاهه الخاص ويعكس الأيقونات والحدود والمسافات للعربية، مع نظام تبديل خطوط بين Cairo وBarlow Condensed لعرض النصوص العربية واللاتينية كل بخطها الصحيح.",
        },
        {
          title: "أُعيدت هيكلته ليكون قابلاً للتعديل فعليًا",
          description:
            "فصلت كل المحتوى والترجمات عن مكونات الواجهة إلى مجلدات data وi18n مخصصة، بحيث يمكن تعديل النصوص وسجل الخبرات والتعليم وبطاقات الموارد دون لمس كود المكونات.",
        },
        {
          title: "أنظمة صغيرة قابلة لإعادة الاستخدام",
          description:
            "بُني نظام ترقيم صفحات عام، ومجموعة بطاقات مشتركة (الخبرة، التعليم، الموارد، المهارات)، ونوع لغة واحد موحّد بدلاً من تكراره في تسعة مكونات.",
        },
      ],
      gallery: [
        { caption: "الرئيسية — صفحة هبوط ثنائية اللغة بتخطيط معكوس" },
        { caption: "الموارد — بطاقات مشاريع مقسمة على صفحات" },
        { caption: "تواصل — نموذج تحقق متكامل عبر EmailJS" },
      ],
      outcome: [
        "النتيجة موقع يمكن لصاحبته تحديثه بنفسها — بإضافة مشروع جديد، أو ترجمة عنوان، أو إعادة ترتيب التنقل — دون كتابة كود، مع الحفاظ على مطابقة تصميم Figma الأصلي بكسل ببكسل في كلا اللغتين وفي كل نقطة استجابة.",
      ],
    },
  },
};
