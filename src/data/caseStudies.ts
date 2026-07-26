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
        "Red, black, and white — a portfolio built on the idea that great design doesn't need a big palette. Designed and prototyped entirely in Figma, then built by hand with Claude Code.",
      role: "UX/UI Design & Direction",
      tools: "Figma, Claude Code",
      year: "2026",
      overview: [
        "The idea was to create something entirely my own, using my three favourite colours: red, black, and white. I wanted a clean, responsive site available in both English and my native language, Arabic — and I kept everything neat and simple on purpose. I've always believed you don't need an overwhelming variety of colours or complex design to prove you can create something great.",
        "Everything was first designed and prototyped in Figma. Once the design system was in place, I prototyped the entire experience — navigation, interactions, both layouts — to validate the user flow and make sure it felt polished before development ever started.",
      ],
      highlights: [
        {
          title: "Built on variables, not one-off screens",
          description:
            "My favourite part of Figma is variables, so I built the whole design system on them: a numbers collection with reusable values that weren't limited to a specific scope, a typography collection that switches between English and Arabic type styles with a single click, a version collection for desktop and responsive layouts, a navigation collection that powered the nav prototype without building every state by hand, and a content collection that handled the language switcher and every piece of translated content.",
        },
        {
          title: "Prototyped before a line of code existed",
          description:
            "I prototyped the full experience in Figma before moving into development, so the navigation and interactions were already validated and the portfolio already felt polished across both desktop and responsive layouts.",
        },
        {
          title: "One set of components, two languages",
          description:
            "Rather than build separate translated components, the Arabic version just switches the layout from left-to-right to right-to-left. Once the right variable collection is selected, everything I built applies automatically.",
        },
        {
          title: "Designed by me, built with Claude Code",
          description:
            "My original plan was to publish this with Framer, but I decided to challenge myself and build it with Claude Code instead. I studied HTML, CSS, Java, and JavaScript at university, so I wasn't starting from zero — but Claude introduced a completely different way of building software. I won't lie, at first I mostly knew how to click \"Accept\" over and over again.",
        },
      ],
      gallery: [
        { caption: "Hero — bilingual landing with mirrored layout" },
        { caption: "Resources — the project grid this page lives in" },
        { caption: "Contact — a simple, focused way to reach out" },
      ],
      outcome: [
        "I'm incredibly happy with how everything turned out. It was a fun project, I learned a lot throughout the process, and it gave me the chance to combine design and development in a way I hadn't done before.",
        "It's exactly what I set out to build — clean, considered, and equally at home in English and Arabic.",
      ],
    },
  },
  arabic: {
    "portfolio-design": {
      title: "تصميم الملف الشخصي",
      category: "مشروع شخصي",
      summary:
        "الأحمر والأسود والأبيض — موقع شخصي بُني على فكرة أن التصميم الرائع لا يحتاج إلى لوحة ألوان كبيرة. صُمم ونُمذج بالكامل في Figma، ثم بُني يدويًا باستخدام Claude Code.",
      role: "تصميم UX/UI والإشراف",
      tools: "Figma، Claude Code",
      year: "2026",
      overview: [
        "كانت الفكرة إنشاء شيء خاص بي تمامًا، باستخدام ألواني الثلاثة المفضلة: الأحمر والأسود والأبيض. أردت موقعًا نظيفًا ومتجاوبًا ومتاحًا باللغتين الإنجليزية ولغتي الأم العربية — وحافظت على كل شيء بسيطًا ومرتبًا عن قصد. لطالما آمنت أنك لست بحاجة إلى تنوع ألوان مبالغ فيه أو تصميم معقّد لتثبت أنك قادر على صنع شيء رائع.",
        "صُمم كل شيء ونُمذج أوليًا في Figma أولًا. وبمجرد اكتمال نظام التصميم، جربت التجربة الكاملة — التنقل والتفاعلات وكلا التخطيطين — للتحقق من مسار المستخدم والتأكد من أنها تبدو مصقولة قبل أن تبدأ مرحلة التطوير.",
      ],
      highlights: [
        {
          title: "مبني على المتغيرات، لا على شاشات منفصلة",
          description:
            "ميزتي المفضلة في Figma هي المتغيرات، لذا بنيت نظام التصميم بالكامل عليها: مجموعة أرقام بقيم قابلة لإعادة الاستخدام وغير مقيدة بنطاق معين، ومجموعة طباعة تبدّل بين أنماط الخطوط الإنجليزية والعربية بنقرة واحدة، ومجموعة إصدارات للتبديل بين تخطيطي سطح المكتب والتجاوب، ومجموعة تنقل شغّلت نموذج التنقل الأولي دون الحاجة لبناء كل حالة يدويًا، ومجموعة محتوى تولّت مبدّل اللغة وكل جزء من المحتوى المترجم.",
        },
        {
          title: "نُمذج قبل أن يُكتب أي سطر كود",
          description:
            "جرّبت التجربة الكاملة في Figma قبل الانتقال إلى التطوير، بحيث كان التنقل والتفاعلات قد تحققت منها بالفعل، وكان الموقع يبدو مصقولاً بالفعل عبر تخطيطي سطح المكتب والتجاوب.",
        },
        {
          title: "مجموعة واحدة من المكونات، بلغتين",
          description:
            "بدلاً من بناء مكونات مترجمة منفصلة، تكتفي النسخة العربية بتبديل التخطيط من اليسار إلى اليمين (LTR) إلى اليمين إلى اليسار (RTL). بمجرد اختيار مجموعة المتغيرات المناسبة، يُطبَّق كل ما بنيته تلقائيًا.",
        },
        {
          title: "صممته بنفسي، وبنيته باستخدام Claude Code",
          description:
            "كانت خطتي الأصلية نشر الموقع عبر Framer، لكنني قررت تحدي نفسي وبنائه باستخدام Claude Code بدلاً من ذلك. درست HTML وCSS وJava وJavaScript في الجامعة، فلم أكن أبدأ من الصفر — لكن Claude قدّم لي طريقة مختلفة تمامًا لبناء البرمجيات. لن أكذب، في البداية كنت أعرف بالأساس كيفية الضغط على \"قبول\" مرارًا وتكرارًا.",
        },
      ],
      gallery: [
        { caption: "الرئيسية — صفحة هبوط ثنائية اللغة بتخطيط معكوس" },
        { caption: "الموارد — شبكة المشاريع التي تعيش فيها هذه الصفحة" },
        { caption: "تواصل — طريقة بسيطة ومركّزة للتواصل" },
      ],
      outcome: [
        "أنا سعيدة جدًا بالنتيجة النهائية. كان مشروعًا ممتعًا، تعلمت الكثير خلال العملية، ومنحني فرصة الجمع بين التصميم والتطوير بطريقة لم أختبرها من قبل.",
        "إنه بالضبط ما أردت بناءه — نظيف ومدروس ومريح بالتساوي في الإنجليزية والعربية.",
      ],
    },
  },
};
