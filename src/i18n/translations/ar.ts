import type { Translations } from "./types";

/**
 * ============================================================================
 *  ARABIC SITE TEXT — edit anything below to change what's shown on the
 *  Arabic version of the site. Every key here has a matching key in en.ts;
 *  if you add one, add it there too (TypeScript will warn you if you don't).
 * ============================================================================
 */
const ar: Translations = {
  nav: {
    home: "الرئيسية",
    about: "نبذة عني",
    work: "الخبرة",
    education: "التعليم",
    resources: "الموارد",
    contact: "تواصل",
    switchTo: "English",
  },
  social: {
    email: "البريد الإلكتروني",
    linkedin: "LINKEDIN",
    figma: "FIGMA",
  },
  footer: {
    rights: "جميع الحقوق محفوظة",
  },
  hero: {
    portfolioLabel: "ملف الأعمال",
    subtext: "أصمم تجارب رقمية تجمع بين الحدس البشري والتصميم الهادف — بكسل تلو الآخر.",
    contactMe: "تواصل معي",
    tagline: "تصميم بهدف.",
  },
  about: {
    title: "نبذة عني.",
    bio: [
      "أنا مصممة UX/UI شغوفة بتحويل المشكلات المعقدة إلى حلول أنيقة تتمحور حول المستخدم. بعين حريصة على التفاصيل وعقلية تعتمد على البحث أولًا، أُصمم واجهات تبدو بديهية من أول تفاعل.",
      "يقع عملي عند تقاطع التصميم البصري وسهولة الاستخدام والسلوك الإنساني — دائمًا أتساءل: كيف يمكن لهذه التجربة أن تخدم مستخدمها بشكل أفضل؟",
    ],
  },
  work: {
    headingLine1: "الخبرة",
    headingLine2: "العملية.",
    experienceLetter: "خطاب الخبرة",
  },
  education: {
    title: "التعليم.",
  },
  resources: {
    title: "الموارد.",
    subtext: "أدوات وحزم وقوالب صممتها وجمعتها — متاحة مجانًا لمجتمع التصميم.",
    comingSoon: "قريبًا!",
  },
  contact: {
    line1: "لنصنع",
    line2: "معًا",
    line3: "شيئًا",
    line4: "رائعًا.",
    subtext1: "لديك مشروع في بالك؟ يسعدني سماع تفاصيله.",
    subtext2: "أرسل لي رسالة أو تواصل معي مباشرة.",
    directEmailLabel: "البريد المباشر",
    formTitle: "أرسل رسالة",
    formSubtext: "سأرد عليك في أقرب وقت",
  },
  form: {
    namePlaceholder: "اسمك",
    emailPlaceholder: "بريدك الإلكتروني",
    messagePlaceholder: "أخبرني عن مشروعك...",
    inquiryPlaceholder: "نوع الاستفسار...",
    send: "إرسال الرسالة",
    sending: "جارٍ الإرسال...",
    success: "تم إرسال رسالتك بنجاح. سأتواصل معك قريبًا.",
    error: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.",
    errors: {
      name: "يرجى إدخال اسمك.",
      email: "يرجى إدخال بريد إلكتروني صالح.",
      inquiry: "يرجى اختيار نوع الاستفسار.",
      message: "يرجى إدخال رسالة (10 أحرف على الأقل).",
    },
  },
  caseStudy: {
    overviewTitle: "نظرة عامة",
    highlightsTitle: "ماذا فعلت",
    galleryTitle: "شاشات مختارة",
    outcomeTitle: "النتيجة",
    figmaLinkLabel: "رابط Figma",
    ctaTitle: "لديك مشروع في بالك؟",
    ctaButton: "لنتحدث",
    notFoundTitle: "المشروع غير موجود.",
    notFoundMessage: "دراسة الحالة هذه غير متوفرة بعد — عد إلى الموارد لرؤية ما هو متاح.",
  },
};

export default ar;
