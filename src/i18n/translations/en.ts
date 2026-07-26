import type { Translations } from "./types";

/**
 * ============================================================================
 *  ENGLISH SITE TEXT — edit anything below to change what's shown on the
 *  English version of the site. Every key here has a matching key in ar.ts;
 *  if you add one, add it there too (TypeScript will warn you if you don't).
 * ============================================================================
 */
const en: Translations = {
  nav: {
    home: "HOME",
    about: "ABOUT",
    work: "EXPERIENCE",
    education: "EDUCATION",
    resources: "RESOURCES",
    contact: "CONTACT",
    switchTo: "العربية",
  },
  social: {
    email: "EMAIL",
    linkedin: "LINKEDIN",
    figma: "FIGMA",
  },
  footer: {
    rights: "ALL RIGHTS RESERVED",
  },
  hero: {
    portfolioLabel: "PORTFOLIO",
    subtext:
      "Crafting digital experiences that bridge human intuition with purposeful design — one pixel at a time.",
    contactMe: "Contact Me",
    tagline: "Design with Purpose.",
  },
  about: {
    title: "About Me.",
    bio: [
      "I'm a UX/UI designer passionate about turning complex problems into elegant, user-centred solutions. With a sharp eye for detail and a research-first mindset, I design interfaces that feel intuitive from the very first interaction.",
      "My work lives at the intersection of visual design, usability, and human behaviour — always asking: how can this experience serve the person using it better?",
    ],
  },
  work: {
    headingLine1: "WORK",
    headingLine2: "EXPERIENCE.",
    experienceLetter: "Experience Letter",
  },
  education: {
    title: "Education.",
  },
  resources: {
    title: "Resources.",
    subtext: "Tools, kits, and templates I've designed and curated — freely available for the design community.",
    comingSoon: "Coming Soon!",
  },
  contact: {
    line1: "LET'S",
    line2: "MAKE",
    line3: "SOMETHING",
    line4: "GREAT.",
    subtext1: "Have a project in mind? I'd love to hear about it.",
    subtext2: "Drop me a message or reach out directly.",
    directEmailLabel: "DIRECT EMAIL",
    formTitle: "SEND A MESSAGE",
    formSubtext: "I'll get back to you shortly",
  },
  form: {
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
  caseStudy: {
    backToResources: "Back to Resources",
    overviewTitle: "Overview",
    highlightsTitle: "What I Did",
    galleryTitle: "Selected Screens",
    outcomeTitle: "Outcome",
    roleLabel: "Role",
    toolsLabel: "Tools",
    yearLabel: "Year",
    ctaTitle: "Have a project in mind?",
    ctaButton: "Let's Talk",
    notFoundTitle: "Project not found.",
    notFoundMessage: "This case study doesn't exist yet — head back to Resources to see what's available.",
  },
};

export default en;
