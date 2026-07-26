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
        "A bilingual portfolio designed in Figma and brought to life with Claude Code — every detail considered twice, once for English and once for Arabic.",
      role: "UX/UI Design & Direction",
      tools: "Figma, Claude Code",
      year: "2026",
      overview: [
        "The goal was a portfolio that feels equally native in English and Arabic — not a layout mirrored as an afterthought, but one where the type scale, spacing, and composition were considered for both reading directions from the very first sketch.",
        "Every section — hero, about, experience, education, resources, and contact — started as a design decision in Figma first: a dark, editorial palette carried by a single red accent, oversized outlined numerals marking each section, and Barlow Condensed's heavy display weight for English headlines, paired with Cairo for Arabic so the same bold, confident presence carries across both languages.",
      ],
      highlights: [
        {
          title: "Designed by me, built with Claude Code",
          description:
            "I made every visual and layout decision in Figma — spacing, type scale, color, hierarchy — and worked screen by screen with Claude Code to bring it to life exactly as designed, reviewing and refining each one until it matched.",
        },
        {
          title: "A bilingual design, not a translation",
          description:
            "Arabic isn't a mirrored afterthought. Borders, icons, and alignment flip with intention, and the display type switches to Cairo so Arabic headlines carry the same weight and confidence as the English ones.",
        },
        {
          title: "Content that stays out of the designer's way",
          description:
            "The visuals are separated from the words — swapping in a new project, rewriting a headline, or adding a skill never touches the design, and never risks breaking it.",
        },
        {
          title: "One visual language, everywhere",
          description:
            "Every card, number, and section title follows the same rules across the site, so new pages — like this one — read as if they were part of the original design from day one.",
        },
      ],
      gallery: [
        { caption: "Hero — bilingual landing with mirrored layout" },
        { caption: "Resources — the project grid this page lives in" },
        { caption: "Contact — a simple, focused way to reach out" },
      ],
      outcome: [
        "The result is a portfolio that reads as designed for both languages, not translated between them — with a visual system consistent enough that adding a new project or rewriting a headline never breaks the design.",
        "It was designed by hand in Figma and refined screen by screen with Claude Code, from the first sketch to the smallest spacing detail.",
      ],
    },
  },
  arabic: {
    "portfolio-design": {
      title: "تصميم الملف الشخصي",
      category: "مشروع شخصي",
      summary:
        "موقع شخصي ثنائي اللغة، صُمم في Figma وأُخرج إلى الواقع باستخدام Claude Code — كل تفصيلة فُكِّر فيها مرتين، مرة بالإنجليزية ومرة بالعربية.",
      role: "تصميم UX/UI والإشراف",
      tools: "Figma، Claude Code",
      year: "2026",
      overview: [
        "كان الهدف موقعًا يبدو أصيلًا بالتساوي في اللغتين الإنجليزية والعربية — لا تخطيطًا معكوسًا كفكرة لاحقة، بل تصميمًا رُوعي فيه مقياس الخطوط والتباعد والتكوين لكلا اتجاهي القراءة منذ أول رسم أولي.",
        "كل قسم — الرئيسية، نبذة عني، الخبرة العملية، التعليم، الموارد، والتواصل — بدأ كقرار تصميمي في Figma أولًا: لوحة ألوان داكنة وتحريرية يحملها لون أحمر واحد، وأرقام كبيرة مفرغة تُميّز كل قسم، ووزن Barlow Condensed الثقيل للعناوين الإنجليزية، مقترنًا بخط Cairo للعربية بحيث يحمل نفس الحضور الجريء والواثق في كلا اللغتين.",
      ],
      highlights: [
        {
          title: "صُمم بيدي، وأُخرج إلى الواقع باستخدام Claude Code",
          description:
            "توليت كل قرار بصري وتخطيطي في Figma — التباعد، مقياس الخطوط، الألوان، التسلسل الهرمي — وعملت مع Claude Code شاشة بشاشة لإخراجها كما صُممت تمامًا، مع مراجعة وتنقيح كل شاشة حتى تطابقت.",
        },
        {
          title: "تصميم ثنائي اللغة، لا ترجمة",
          description:
            "العربية ليست انعكاسًا كفكرة لاحقة. الحدود والأيقونات والمحاذاة تنعكس بقصد، ويتحول الخط إلى Cairo بحيث تحمل العناوين العربية نفس الثقل والثقة التي تحملها العناوين الإنجليزية.",
        },
        {
          title: "محتوى لا يقف في طريق التصميم",
          description:
            "المرئيات منفصلة عن الكلمات — فإضافة مشروع جديد، أو إعادة كتابة عنوان، أو إضافة مهارة لا يمسّ التصميم أبدًا، ولا يخاطر بكسره.",
        },
        {
          title: "لغة بصرية واحدة، في كل مكان",
          description:
            "كل بطاقة ورقم وعنوان قسم يتبع نفس القواعد في أنحاء الموقع، بحيث تبدو الصفحات الجديدة — كهذه الصفحة — وكأنها كانت جزءًا من التصميم الأصلي منذ اليوم الأول.",
        },
      ],
      gallery: [
        { caption: "الرئيسية — صفحة هبوط ثنائية اللغة بتخطيط معكوس" },
        { caption: "الموارد — شبكة المشاريع التي تعيش فيها هذه الصفحة" },
        { caption: "تواصل — طريقة بسيطة ومركّزة للتواصل" },
      ],
      outcome: [
        "النتيجة موقع يبدو مصممًا لكلا اللغتين، لا مترجمًا بينهما — بنظام بصري متسق بما يكفي بحيث لا تكسر إضافة مشروع جديد أو إعادة كتابة عنوان التصميم أبدًا.",
        "صُمم يدويًا في Figma ونُقّح شاشة بشاشة باستخدام Claude Code، من أول رسم أولي إلى أدق تفاصيل التباعد.",
      ],
    },
  },
};
