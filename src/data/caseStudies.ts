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
      summary:
        "A bilingual, pixel-accurate portfolio designed in Figma and built with Claude Code — refactored into a system I can maintain myself.",
      role: "UX/UI Design, Direction & Front-End Development",
      tools: "Figma, React, TypeScript, Tailwind CSS, Claude Code",
      year: "2026",
      overview: [
        "The goal was to turn a Figma design system into a real, production bilingual site (English/Arabic) with pixel-accurate right-to-left mirroring — not just a translated copy of an English layout.",
        "I designed every screen in Figma, then built it with Claude Code, Anthropic's coding agent — translating each component from spec to production-ready React and Tailwind, including hover states, spacing, and responsive breakpoints, while I directed the design decisions and reviewed every screen against the source file.",
      ],
      highlights: [
        {
          title: "Designed by me, built with Claude Code",
          description:
            "I led every design decision in Figma; Claude Code handled the implementation — reading the Figma spec directly, writing the component code, and iterating with me screen by screen until it matched pixel-for-pixel.",
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
        "The result is a site I can update myself — swapping in a new project, translating a headline, or reordering the nav — without writing code, while still matching the original Figma design pixel-for-pixel in both languages and at every breakpoint.",
        "It was designed by hand and built through iterative pairing with Claude Code, from the first component to the final refactor.",
      ],
    },
  },
  arabic: {
    "portfolio-design": {
      title: "تصميم الملف الشخصي",
      category: "مشروع شخصي",
      summary:
        "موقع شخصي ثنائي اللغة ودقيق التفاصيل، صُمم في Figma وبُني باستخدام Claude Code — أُعيد هيكلته ليكون نظامًا أستطيع صيانته بنفسي.",
      role: "تصميم UX/UI، الإشراف، وتطوير الواجهة الأمامية",
      tools: "Figma، React، TypeScript، Tailwind CSS، Claude Code",
      year: "2026",
      overview: [
        "كان الهدف تحويل نظام تصميم من Figma إلى موقع فعلي ثنائي اللغة (عربي/إنجليزي) بمحاذاة دقيقة للتخطيط من اليمين إلى اليسار — لا مجرد نسخة مترجمة من تخطيط إنجليزي.",
        "صممت كل شاشة في Figma، ثم بنيتها باستخدام Claude Code، أداة الذكاء الاصطناعي البرمجية من Anthropic — التي حوّلت كل مكون من المواصفات إلى كود React وTailwind جاهز للإنتاج، بما في ذلك حالات التحويم والتباعد ونقاط الاستجابة، بينما توليت أنا قرارات التصميم وراجعت كل شاشة مقارنةً بالملف الأصلي.",
      ],
      highlights: [
        {
          title: "صُمم بيدي، وبُني باستخدام Claude Code",
          description:
            "توليت كل قرار تصميمي في Figma؛ تولى Claude Code التنفيذ — بقراءة مواصفات Figma مباشرة، وكتابة كود المكونات، والتكرار معي شاشة بشاشة حتى تطابقت بكسل ببكسل.",
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
        "النتيجة موقع أستطيع تحديثه بنفسي — بإضافة مشروع جديد، أو ترجمة عنوان، أو إعادة ترتيب التنقل — دون كتابة كود، مع الحفاظ على مطابقة تصميم Figma الأصلي بكسل ببكسل في كلا اللغتين وفي كل نقطة استجابة.",
        "صُمم يدويًا وبُني عبر تعاون تكراري مع Claude Code، من أول مكون حتى إعادة الهيكلة الأخيرة.",
      ],
    },
  },
};
