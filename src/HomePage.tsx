import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import Navigation, { type NavigationPage } from "./components/Navigation";
import Button from "./components/Button";
import Input, { type InputLanguage } from "./components/Input";
import WorkCard from "./components/WorkCard";
import EducationCard from "./components/EducationCard";
import ResourcesCard from "./components/ResourcesCard";
import SkillToolCard from "./components/SkillToolCard";
import ChevronDownIcon from "./components/ChevronDownIcon";
import { sendContactEmail } from "./lib/emailjs";

const INQUIRY_OPTIONS_BY_LANGUAGE: Record<InputLanguage, string[]> = {
  english: ["Freelance", "Full-time", "Part-time", "Design Systems", "Other"],
  arabic: ["عمل حر", "دوام كامل", "دوام جزئي", "أنظمة التصميم", "أخرى"],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_COPY = {
  english: {
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    messagePlaceholder: "Tell me about your project...",
    inquiryPlaceholder: "Type of inquiry...",
    send: "SEND MESSAGE",
    sending: "SENDING...",
    success: "Your message has been sent. I'll get back to you shortly.",
    error: "Something went wrong sending your message. Please try again.",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      inquiry: "Please select a type of inquiry.",
      message: "Please enter a message (at least 10 characters).",
    },
  },
  arabic: {
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
} as const satisfies Record<InputLanguage, Record<string, unknown>>;

// Page-level copy for the sections built directly in HomePage (not covered by a
// component's own `language` prop).
const PAGE_COPY = {
  english: {
    portfolioLabel: "PORTFOLIO",
    heroName: "Bana Saiaheen",
    designerTitle: "UX/UI DESIGNER",
    location: "Amman, Jordan",
    heroSubtext:
      "Crafting digital experiences that bridge human intuition with purposeful design — one pixel at a time.",
    contactMe: "Contact Me",
    tagline: "Design with Purpose.",
    aboutTitle: "About Me.",
    bio: [
      "I'm a UX/UI designer passionate about turning complex problems into elegant, user-centred solutions. With a sharp eye for detail and a research-first mindset, I design interfaces that feel intuitive from the very first interaction.",
      "My work lives at the intersection of visual design, usability, and human behaviour — always asking: how can this experience serve the person using it better?",
    ],
    workHeadingLine1: "WORK",
    workHeadingLine2: "EXPERIENCE.",
    educationTitle: "Education.",
    resourcesTitle: "Resources.",
    resourcesSubtext:
      "Tools, kits, and templates I've designed and curated — freely available for the design community.",
    contactLine1: "LET'S",
    contactLine2: "MAKE",
    contactLine3: "SOMETHING",
    contactLine4: "GREAT.",
    contactSubtext1: "Have a project in mind? I'd love to hear about it.",
    contactSubtext2: "Drop me a message or reach out directly.",
    directEmailLabel: "DIRECT EMAIL",
    sendAMessageTitle: "SEND A MESSAGE",
    sendAMessageSubtext: "I'll get back to you shortly",
  },
  arabic: {
    portfolioLabel: "ملف الأعمال",
    heroName: "بانا الصيّاحيّن",
    designerTitle: "مصممة تجربة المستخدم وواجهة المستخدم",
    location: "عمّان، الأردن",
    heroSubtext: "أصمم تجارب رقمية تجمع بين الحدس البشري والتصميم الهادف — بكسل تلو الآخر.",
    contactMe: "تواصل معي",
    tagline: "تصميم بهدف.",
    aboutTitle: "نبذة عني.",
    bio: [
      "أنا مصممة UX/UI شغوفة بتحويل المشكلات المعقدة إلى حلول أنيقة تتمحور حول المستخدم. بعين حريصة على التفاصيل وعقلية تعتمد على البحث أولًا، أُصمم واجهات تبدو بديهية من أول تفاعل.",
      "يقع عملي عند تقاطع التصميم البصري وسهولة الاستخدام والسلوك الإنساني — دائمًا أتساءل: كيف يمكن لهذه التجربة أن تخدم مستخدمها بشكل أفضل؟",
    ],
    workHeadingLine1: "الخبرة",
    workHeadingLine2: "العملية.",
    educationTitle: "التعليم.",
    resourcesTitle: "الموارد.",
    resourcesSubtext: "أدوات وحزم وقوالب صممتها وجمعتها — متاحة مجانًا لمجتمع التصميم.",
    contactLine1: "لنصنع",
    contactLine2: "معًا",
    contactLine3: "شيئًا",
    contactLine4: "رائعًا.",
    contactSubtext1: "لديك مشروع في بالك؟ يسعدني سماع تفاصيله.",
    contactSubtext2: "أرسل لي رسالة أو تواصل معي مباشرة.",
    directEmailLabel: "البريد المباشر",
    sendAMessageTitle: "أرسل رسالة",
    sendAMessageSubtext: "سأرد عليك في أقرب وقت",
  },
} as const satisfies Record<InputLanguage, Record<string, unknown>>;

interface NavItem {
  number: string;
  nav: string;
  href: string;
}

const NAV_LABELS: Record<InputLanguage, string[]> = {
  english: ["HOME", "ABOUT", "EXPERIENCE", "EDUCATION", "RESOURCES", "CONTACT"],
  arabic: ["الرئيسية", "نبذة عني", "الخبرة", "التعليم", "الموارد", "تواصل"],
};

const NAV_HREFS = ["#home", "#about", "#work", "#education", "#resources", "#contact"];

function getNavItems(language: InputLanguage): NavItem[] {
  return NAV_LABELS[language].map((nav, i) => ({
    number: String(i).padStart(2, "0"),
    nav,
    href: NAV_HREFS[i],
  }));
}

const SECTION_IDS = NAV_HREFS.map((href) => href.slice(1));

function useActiveSection() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

const SKILLS_BY_LANGUAGE: Record<InputLanguage, string[]> = {
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

function StrokeNumber({
  value,
  size,
  strokeColor,
  strokeWidth = 1.5,
  className = "",
}: {
  value: string;
  size: number;
  strokeColor: string;
  strokeWidth?: number;
  className?: string;
}) {
  const style: CSSProperties = {
    fontSize: size,
    lineHeight: 1,
    WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
  };
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={`font-barlow font-black tracking-[-0.02em] text-transparent whitespace-nowrap ${className}`}
      style={style}
    >
      {value}
    </span>
  );
}

function SectionTitle({
  number,
  title,
  dark = true,
  className = "",
}: {
  number: string;
  title: string;
  dark?: boolean;
  className?: string;
}) {
  const strokeColor = dark ? "#7a7a7a" : "#CCCCCC";
  return (
    <div className={`flex items-baseline gap-3 lg:gap-4 ${className}`}>
      <StrokeNumber value={number} size={89} strokeColor={strokeColor} className="lg:hidden" />
      <StrokeNumber value={number} size={144} strokeColor={strokeColor} className="hidden lg:inline" />
      <h2
        className={`font-barlow text-[28px] font-black uppercase leading-none tracking-wide lg:text-[56px] ${
          dark ? "text-[#f7f4f0]" : "text-[#0d0d0d]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

function InquirySelect({
  value,
  onChange,
  language = "english",
  placeholder = "Type of inquiry...",
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  language?: InputLanguage;
  placeholder?: string;
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasValue = value.length > 0;
  const isRtl = language === "arabic";
  const options = INQUIRY_OPTIONS_BY_LANGUAGE[language];

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        dir={isRtl ? "rtl" : "ltr"}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid}
        className={`flex w-full items-center gap-2 bg-[#1c1c1c] px-5 py-4 font-barlow text-[14px] font-light transition-colors duration-150 focus-within:bg-[#343434] ${
          isRtl ? "text-right" : "text-left"
        } ${hasValue ? "text-white" : "text-[#848484]"}`}
      >
        <span className="min-w-0 flex-1 truncate">{hasValue ? value : placeholder}</span>
        <ChevronDownIcon
          size={16}
          className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          dir={isRtl ? "rtl" : "ltr"}
          className="absolute left-0 right-0 top-full z-10 mt-[2px] bg-[#1c1c1c] shadow-lg"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={value === option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-5 py-3 font-barlow text-[14px] font-light text-[#848484] transition-colors duration-150 hover:bg-[#343434] hover:text-white ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ContactFormProps {
  language?: InputLanguage;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

interface ContactFormValues {
  name: string;
  email: string;
  inquiry: string;
  message: string;
}

function ContactForm({ language = "english" }: ContactFormProps) {
  const copy = CONTACT_COPY[language];
  const [values, setValues] = useState<ContactFormValues>({ name: "", email: "", inquiry: "", message: "" });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Re-validate against the current language's option list if the user switches
  // language mid-selection, so a stale value from the other language can't slip through.
  useEffect(() => {
    setValues((prev) =>
      INQUIRY_OPTIONS_BY_LANGUAGE[language].includes(prev.inquiry) ? prev : { ...prev, inquiry: "" },
    );
  }, [language]);

  // Re-translate any already-shown field errors when the language changes,
  // instead of leaving stale English/Arabic messages until the next submit.
  useEffect(() => {
    setFieldErrors((prev) => (Object.keys(prev).length === 0 ? prev : validate()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const setField = <K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): Partial<Record<keyof ContactFormValues, string>> => {
    const errors: Partial<Record<keyof ContactFormValues, string>> = {};
    if (values.name.trim().length < 2) errors.name = copy.errors.name;
    if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = copy.errors.email;
    if (!INQUIRY_OPTIONS_BY_LANGUAGE[language].includes(values.inquiry)) errors.inquiry = copy.errors.inquiry;
    if (values.message.trim().length < 10) errors.message = copy.errors.message;
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Guards against duplicate submissions from double-clicks or repeated Enter presses.
    if (status === "sending") return;

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    try {
      await sendContactEmail(values);
      setStatus("success");
      setValues({ name: "", email: "", inquiry: "", message: "" });
      setFieldErrors({});
    } catch (err) {
      console.error("Failed to send contact email:", err);
      setStatus("error");
    }
  };

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate dir={language === "arabic" ? "rtl" : "ltr"} className="flex w-full flex-col gap-[2px]">
      <div className="flex w-full flex-col gap-[2px] lg:flex-row">
        <div className="min-w-0 flex-1">
          <Input
            placeholder={copy.namePlaceholder}
            language={language}
            value={values.name}
            onChange={(value) => setField("name", value)}
          />
          {fieldErrors.name && <FieldError language={language}>{fieldErrors.name}</FieldError>}
        </div>
        <div className="min-w-0 flex-1">
          <Input
            placeholder={copy.emailPlaceholder}
            language={language}
            value={values.email}
            onChange={(value) => setField("email", value)}
          />
          {fieldErrors.email && <FieldError language={language}>{fieldErrors.email}</FieldError>}
        </div>
      </div>

      <InquirySelect
        value={values.inquiry}
        onChange={(value) => setField("inquiry", value)}
        language={language}
        placeholder={copy.inquiryPlaceholder}
        invalid={Boolean(fieldErrors.inquiry)}
      />
      {fieldErrors.inquiry && <FieldError language={language}>{fieldErrors.inquiry}</FieldError>}

      <Input
        placeholder={copy.messagePlaceholder}
        freeInputField
        language={language}
        value={values.message}
        onChange={(value) => setField("message", value)}
      />
      {fieldErrors.message && <FieldError language={language}>{fieldErrors.message}</FieldError>}

      <button
        type="submit"
        disabled={isSending}
        aria-busy={isSending}
        className="w-full bg-[#d42b2b] py-3 font-barlow text-[18px] text-[#f7f4f0] transition-colors duration-150 hover:bg-[#a22222] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#d42b2b]"
      >
        {isSending ? copy.sending : copy.send}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className={`pt-1 font-barlow text-[13px] text-[#f7f4f0] ${language === "arabic" ? "text-right" : "text-left"}`}>
            {copy.success}
          </p>
        )}
        {status === "error" && (
          <p className={`pt-1 font-barlow text-[13px] text-[#e53737] ${language === "arabic" ? "text-right" : "text-left"}`}>
            {copy.error}
          </p>
        )}
      </div>
    </form>
  );
}

function FieldError({ language = "english", children }: { language?: InputLanguage; children: string }) {
  return (
    <p className={`pt-1 font-barlow text-[12px] text-[#e53737] ${language === "arabic" ? "text-right" : "text-left"}`}>
      {children}
    </p>
  );
}

interface WorkCardData {
  title: string;
  freelance?: boolean;
  recommendation?: boolean;
  from?: string;
  to?: string;
  subText?: string;
  companyName?: string;
  employmentType?: string;
  location?: string;
}

function getWorkCards(language: InputLanguage): WorkCardData[] {
  if (language === "arabic") {
    return [
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
        companyName: "ADRES via Estarta Solutions",
        employmentType: "دوام كامل",
        location: "عمل هجين",
        from: "2023",
        to: "2026",
        subText:
          "صممت تجربة العقارات الرقمية لكل من الشارقة الرقمية وتم أبوظبي، محولةً خدمات حكومية معقدة إلى تجارب رقمية واضحة وسهلة الوصول. تعاونت مع فريقي في مشروع ADREC وأنشأت نظام التصميم الخاص بالمنتج، مما مكّن من تجارب متسقة وقابلة للتوسع عبر المنصة.",
      },
    ];
  }
  return [
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
      subText:
        "Designed the digital real estate experience for Digital Sharjah and TAMM Abu Dhabi, translating complex government services into clear and accessible digital experiences. Collaborated with my team on ADREC and created the product's design system, enabling scalable, consistent experiences across the platform.",
    },
  ];
}

const EDUCATION_SUB_NUMBERS = ["01", "02", "03", "04"];

const ITEMS_PER_PAGE = 4;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  language,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  language: InputLanguage;
}) {
  if (totalPages <= 1) return null;
  const isArabic = language === "arabic";
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // The chevron is a "down" arrow by default; rotating it 90° clockwise points
  // left, 90° counter-clockwise points right.
  const prevRotation = isArabic ? "-rotate-90" : "rotate-90";
  const nextRotation = isArabic ? "rotate-90" : "-rotate-90";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex items-center gap-4 font-barlow text-[16px]">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center justify-center text-[#7a7a7a] transition-colors duration-150 hover:text-[#d42b2b] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#7a7a7a]"
      >
        <ChevronDownIcon size={16} className={prevRotation} />
      </button>
      <div className="flex items-center gap-3">
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`transition-colors duration-150 ${
              page === currentPage ? "text-[#d42b2b]" : "text-[#7a7a7a] hover:text-[#d42b2b]"
            }`}
          >
            {String(page - 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center justify-center text-[#7a7a7a] transition-colors duration-150 hover:text-[#d42b2b] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#7a7a7a]"
      >
        <ChevronDownIcon size={16} className={nextRotation} />
      </button>
    </div>
  );
}

const EDUCATION_COPY = {
  english: {
    dateRange: "2016 — 2022",
    degree: "BACHELOR'S IN COMPUTER GRAPHICS & ANIMATION",
    institution: "Princess Sumaya University for Technology",
    subYear: "2025",
    subName: "USER CENTERED",
    subSource: "IxDF",
  },
  arabic: {
    dateRange: "2016 — 2022",
    degree: "بكالوريوس في الرسوم الحاسوبية والرسوم المتحركة",
    institution: "الجامعة الأميرة سمية للتكنولوجيا",
    subYear: "2025",
    subName: "تصميم محوره المستخدم",
    subSource: "IxDF",
  },
} as const satisfies Record<InputLanguage, Record<string, string>>;

interface ResourcesCardData {
  title: string;
  number: string;
  type?: string;
  subText: string;
  disabled?: boolean;
}

function getResourcesCards(language: InputLanguage): ResourcesCardData[] {
  const behindTheScenes =
    language === "arabic"
      ? "نظرة خلف الكواليس على كيفية تصميم هذا الملف الشخصي من الفكرة إلى المنتج النهائي."
      : "A behind-the-scenes look at how this portfolio was designed from concept to final product.";

  if (language === "arabic") {
    return [
      { title: "تصميم الملف الشخصي", number: "00", type: "شخصي", subText: behindTheScenes },
      { title: "StayJO", number: "01", type: "عمل مستقل", subText: behindTheScenes },
      { title: "MedConnect", number: "02", type: "دراسة حالة", subText: behindTheScenes },
      { title: "نظام التصميم", number: "03", disabled: true, subText: behindTheScenes },
    ];
  }
  return [
    { title: "Portfolio Design", number: "00", subText: behindTheScenes },
    { title: "StayJO", number: "01", type: "Freelance Work", subText: behindTheScenes },
    { title: "MedConnect", number: "02", type: "Case Study", subText: behindTheScenes },
    { title: "Design System", number: "03", disabled: true, subText: behindTheScenes },
  ];
}

export default function HomePage() {
  const [language, setLanguage] = useState<InputLanguage>("english");
  const isArabic = language === "arabic";
  const activeSection = useActiveSection();
  const copy = PAGE_COPY[language];
  const eduCopy = EDUCATION_COPY[language];
  const pages: NavigationPage[] = getNavItems(language).map((item) => ({
    ...item,
    selected: item.href === `#${activeSection}`,
  }));
  const workCards = getWorkCards(language);
  const resourcesCards = getResourcesCards(language);
  const skills = SKILLS_BY_LANGUAGE[language];

  const [educationPage, setEducationPage] = useState(1);
  const educationTotalPages = Math.ceil(EDUCATION_SUB_NUMBERS.length / ITEMS_PER_PAGE);
  const paginatedEducationNumbers = EDUCATION_SUB_NUMBERS.slice(
    (educationPage - 1) * ITEMS_PER_PAGE,
    educationPage * ITEMS_PER_PAGE,
  );

  const [resourcesPage, setResourcesPage] = useState(1);
  const resourcesTotalPages = Math.ceil(resourcesCards.length / ITEMS_PER_PAGE);
  const paginatedResourcesCards = resourcesCards.slice(
    (resourcesPage - 1) * ITEMS_PER_PAGE,
    resourcesPage * ITEMS_PER_PAGE,
  );

  // Clamp back to the last valid page if the item count ever shrinks
  // (e.g. fewer items become available) while on a later page.
  useEffect(() => {
    setEducationPage((prev) => Math.max(1, Math.min(prev, educationTotalPages)));
  }, [educationTotalPages]);
  useEffect(() => {
    setResourcesPage((prev) => Math.max(1, Math.min(prev, resourcesTotalPages)));
  }, [resourcesTotalPages]);

  // Keeps native browser behavior (spellcheck, form validation bubbles, default
  // fonts/quotes) correctly RTL-aware in addition to our own layout classes.
  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen flex-col bg-[#0d0d0d] lg:flex-row">
      <Navigation
        language={language}
        version="responsive"
        name={copy.heroName}
        title={copy.designerTitle}
        location={copy.location}
        pages={pages}
        onLanguageChange={setLanguage}
        className="flex lg:hidden"
      />
      <Navigation
        language={language}
        version="desktop"
        name={copy.heroName}
        title={copy.designerTitle}
        location={copy.location}
        pages={pages}
        onLanguageChange={setLanguage}
        className="hidden lg:flex"
      />

      <main className="flex w-full min-w-0 flex-1 flex-col lg:min-w-[1184px]">
        <section
          id="home"
          className="flex w-full flex-col items-stretch bg-[#f7f4f0] lg:min-h-[720px] lg:flex-row"
        >
          <div
            className={`flex flex-1 flex-col items-start justify-between gap-6 border-b-[0.8px] border-[#ddd] px-5 py-10 lg:gap-10 lg:border-b-0 lg:px-9 lg:py-12 ${
              isArabic ? "lg:border-l-[0.8px]" : "lg:border-r-[0.8px]"
            }`}
          >
            <p className="font-barlow text-[11px] tracking-[3px] text-[#525252] lg:text-[12px] lg:tracking-[4px]">
              {copy.portfolioLabel}
            </p>
            <div className="flex w-full flex-col items-start gap-3 lg:gap-3.5">
              <h1 className="font-barlow text-[36px] font-black uppercase leading-[1.05] tracking-wide text-[#0d0d0d] lg:text-[56px] lg:leading-[1.02]">
                {copy.heroName}
              </h1>
              <div
                className={`max-w-[357px] border-[#d42b2b] ${
                  isArabic ? "border-r-2 pr-4 lg:pr-[18px]" : "border-l-2 pl-4 lg:pl-[18px]"
                }`}
              >
                <p className="font-barlow text-[15px] font-light text-[#525252] lg:text-[18px]">{copy.heroSubtext}</p>
              </div>
            </div>
            <Button
              variant="primary"
              cta={copy.contactMe}
              language={language}
              href="#contact"
              className="w-full lg:w-[166px] lg:self-end"
            />
          </div>

          <div className="relative flex min-h-[420px] flex-1 flex-col overflow-hidden bg-[#d42b2b] px-6 py-10 lg:min-h-0 lg:px-10 lg:py-12">
            <p dir="ltr" className="font-barlow text-[11px] tracking-[3px] text-white lg:text-[12px] lg:tracking-[4px]">
              MMXXVI
            </p>
            <div className="flex flex-1 items-center justify-center py-8 lg:py-0">
              <p className="font-barlow text-[22px] font-bold text-white lg:text-[32px]">{copy.tagline}</p>
            </div>
            <span
              aria-hidden="true"
              dir="ltr"
              className={`pointer-events-none absolute bottom-2 whitespace-nowrap font-barlow text-[110px] font-black leading-none text-[#f7f4f0] opacity-[0.08] lg:bottom-4 lg:text-[224px] ${
                isArabic ? "-left-4 lg:-left-10" : "-right-4 lg:-right-10"
              }`}
            >
              00
            </span>
            <span
              aria-hidden="true"
              dir="ltr"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-barlow text-[110px] font-black leading-none text-[#0d0d0d] opacity-[0.08] lg:text-[224px]"
            >
              UX/UI
            </span>
          </div>
        </section>

        <section id="about" className="flex flex-col gap-8 bg-[#0d0d0d] px-5 py-14 lg:gap-12 lg:px-8 lg:py-24">
          <SectionTitle number="01" title={copy.aboutTitle} />
          <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap">
            <div className="relative w-full lg:w-[262px] lg:shrink-0">
              <div className="flex aspect-[4/3] w-full items-center justify-center border border-[#2a2a2a] bg-[#1c1c1c] lg:aspect-square">
                <span className="font-barlow text-[36px] font-black tracking-[4px] text-[#2a2a2a] lg:text-[80px]">
                  B
                </span>
              </div>
              <div
                className={`pointer-events-none absolute bottom-0 h-1/2 w-1/2 border-b-[1.6px] border-[#d42b2b] ${
                  isArabic ? "right-0 border-r-[1.6px]" : "left-0 border-l-[1.6px]"
                }`}
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-5">
              <div className="flex flex-col gap-4 font-barlow text-[16px] font-light text-[#9e9e9e] lg:text-[20px]">
                {copy.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6">
                {skills.map((skill, i) => (
                  <SkillToolCard key={skill} language={language} number={String(i).padStart(2, "0")} skillTool={skill} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="flex flex-col bg-[#f7f4f0] lg:flex-row lg:flex-wrap">
          <div className="relative flex min-h-[172px] w-full flex-col justify-center overflow-hidden bg-[#d42b2b] px-4 py-10 lg:min-h-[720px] lg:min-w-[400px] lg:flex-1 lg:justify-end lg:p-10">
            <span
              aria-hidden="true"
              dir="ltr"
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-barlow text-[150px] font-black leading-none text-[#f7f4f0] opacity-[0.08] lg:hidden ${
                isArabic ? "-left-4" : "-right-4"
              }`}
            >
              02
            </span>
            <span
              aria-hidden="true"
              dir="ltr"
              className={`pointer-events-none absolute hidden bottom-[23px] whitespace-nowrap font-barlow text-[224px] font-black leading-none text-[#f7f4f0] opacity-[0.08] lg:block ${
                isArabic ? "right-[-29px]" : "left-[-29px]"
              }`}
            >
              02
            </span>
            <h2 className="relative font-barlow text-[32px] font-black uppercase leading-[1] tracking-wide text-[#f7f4f0] lg:text-[48px]">
              {copy.workHeadingLine1}
              <br />
              {copy.workHeadingLine2}
            </h2>
          </div>
          <div className="flex w-full flex-1 flex-col items-center justify-center px-5 py-10 lg:px-8 lg:py-12">
            <div className="hidden w-full flex-col border-t-[0.8px] border-[#e0e0e0] lg:flex">
              {workCards.map((card) => (
                <WorkCard key={card.title} version="desktop" language={language} {...card} />
              ))}
            </div>
            <div className="flex w-full flex-col border-t-[0.8px] border-[#e0e0e0] lg:hidden">
              {workCards.map((card) => (
                <WorkCard key={card.title} version="responsive" language={language} {...card} />
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="flex flex-col gap-8 bg-[#0d0d0d] px-5 py-14 lg:gap-12 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-end">
            <SectionTitle number="03" title={copy.educationTitle} className="lg:min-w-[500px] lg:flex-1" />
            <div className="hidden lg:block">
              <EducationCard
                type="main"
                version="desktop"
                language={language}
                dateRange={eduCopy.dateRange}
                degree={eduCopy.degree}
                institution={eduCopy.institution}
              />
            </div>
            <div className="lg:hidden">
              <EducationCard
                type="main"
                version="responsive"
                language={language}
                dateRange={eduCopy.dateRange}
                degree={eduCopy.degree}
                institution={eduCopy.institution}
              />
            </div>
          </div>
          <div className="hidden flex-wrap gap-6 lg:flex">
            {paginatedEducationNumbers.map((number) => (
              <EducationCard
                key={number}
                type="sub"
                version="desktop"
                language={language}
                number={number}
                year={eduCopy.subYear}
                name={eduCopy.subName}
                source={eduCopy.subSource}
              />
            ))}
          </div>
          <div className="flex flex-col lg:hidden">
            {paginatedEducationNumbers.map((number) => (
              <EducationCard
                key={number}
                type="sub"
                version="responsive"
                language={language}
                number={number}
                year={eduCopy.subYear}
                name={eduCopy.subName}
                source={eduCopy.subSource}
              />
            ))}
          </div>
          <Pagination
            currentPage={educationPage}
            totalPages={educationTotalPages}
            onPageChange={setEducationPage}
            language={language}
          />
        </section>

        <section id="resources" className="flex flex-col gap-6 bg-[#f7f4f0] px-5 py-14 lg:gap-8 lg:px-8 lg:py-24">
          <SectionTitle number="04" title={copy.resourcesTitle} dark={false} />
          <p className="font-barlow text-[13px] font-light text-[#6f6f6f] lg:text-[14px]">{copy.resourcesSubtext}</p>
          <div className="hidden grid-cols-2 gap-6 lg:grid">
            {paginatedResourcesCards.map((card) => (
              <ResourcesCard key={card.title} version="desktop" language={language} {...card} />
            ))}
          </div>
          <div className="flex flex-col lg:hidden">
            {paginatedResourcesCards.map((card) => (
              <ResourcesCard key={card.title} version="responsive" language={language} {...card} />
            ))}
          </div>
          <Pagination
            currentPage={resourcesPage}
            totalPages={resourcesTotalPages}
            onPageChange={setResourcesPage}
            language={language}
          />
        </section>

        <section id="contact" className="flex flex-col items-stretch bg-[#0d0d0d] lg:flex-row lg:flex-wrap">
          <div
            className={`relative isolate flex w-full flex-col items-start justify-center gap-6 overflow-hidden border-b-[0.8px] border-[#2a2a2a] bg-[#1c1c1c] px-5 py-12 lg:min-h-[720px] lg:min-w-[580px] lg:flex-1 lg:border-b-0 lg:py-16 ${
              isArabic ? "lg:border-l-[0.8px] lg:pr-8 lg:pl-[12.8px]" : "lg:border-r-[0.8px] lg:pl-8 lg:pr-[12.8px]"
            }`}
          >
            <div
              className={`flex w-full flex-col gap-[2px] font-barlow text-[44px] font-black uppercase lg:text-[88px] ${
                isArabic ? "leading-[1.3]" : "leading-[0.92] tracking-[1.76px]"
              }`}
            >
              <div className="text-[#f7f4f0]">
                <p className="m-0">{copy.contactLine1}</p>
                <p className="m-0">{copy.contactLine2}</p>
              </div>
              <p className="m-0 text-[#d42b2b]">{copy.contactLine3}</p>
              <p className="m-0 text-[#f7f4f0]">{copy.contactLine4}</p>
            </div>
            <div
              className={`w-full border-[#2a2a2a] font-barlow text-[14px] font-light text-[#848484] ${
                isArabic ? "border-r-2 pr-5" : "border-l-2 pl-5"
              }`}
            >
              <p className="m-0">{copy.contactSubtext1}</p>
              <p className="m-0">{copy.contactSubtext2}</p>
            </div>
            <div className="relative isolate flex w-full flex-col gap-2">
              <p className="font-barlow text-[12px] text-[#848484]">{copy.directEmailLabel}</p>
              <Button
                variant="link-xl"
                cta="BANASAIAHEEN@GMAIL.COM"
                language={language}
                trailingIcon
                href="mailto:banasaiaheen@gmail.com"
              />
              <StrokeNumber
                value="05"
                size={89}
                strokeColor="hsla(0, 0%, 28%, 1)"
                strokeWidth={2}
                className={`pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2 lg:hidden ${
                  isArabic ? "left-0" : "right-0"
                }`}
              />
            </div>
            <StrokeNumber
              value="05"
              size={96}
              strokeColor="hsla(0, 0%, 28%, 1)"
              strokeWidth={2}
              className={`pointer-events-none absolute bottom-10 -z-10 hidden lg:block ${isArabic ? "left-6" : "right-6"}`}
            />
          </div>
          <div
            className={`flex w-full flex-1 flex-col items-start justify-center gap-5 px-5 py-12 lg:min-w-[604px] ${
              isArabic ? "lg:pr-6 lg:pl-8" : "lg:pl-6 lg:pr-8"
            }`}
          >
            <div>
              <h3 className="font-barlow text-[26px] font-black text-[#f7f4f0] lg:text-[32px]">
                {copy.sendAMessageTitle}
              </h3>
              <p className="font-barlow text-[15px] text-[#7a7a7a] lg:text-[16px]">{copy.sendAMessageSubtext}</p>
            </div>
            <ContactForm language={language} />
          </div>
        </section>
      </main>
    </div>
  );
}
