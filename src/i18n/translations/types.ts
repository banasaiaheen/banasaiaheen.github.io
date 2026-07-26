/**
 * Shape of every piece of translatable UI text on the site (nav labels,
 * section titles, buttons, form copy, etc). Both src/i18n/translations/en.ts
 * and ar.ts must satisfy this exactly, so adding a new field here forces you
 * to fill it in for both languages.
 *
 * This does NOT include repeatable content (work history, education entries,
 * resources/projects, skills) — that lives in src/data/ instead, since it's
 * naturally structured as lists rather than one-off UI strings.
 */
export interface Translations {
  nav: {
    /** Keyed by the nav item `id` from src/data/navigation.ts. */
    home: string;
    about: string;
    work: string;
    education: string;
    resources: string;
    contact: string;
    /** Label on the button that switches to the *other* language. */
    switchTo: string;
  };
  social: {
    email: string;
    linkedin: string;
    figma: string;
  };
  footer: {
    rights: string;
  };
  hero: {
    portfolioLabel: string;
    subtext: string;
    contactMe: string;
    tagline: string;
  };
  about: {
    title: string;
    bio: string[];
  };
  work: {
    headingLine1: string;
    headingLine2: string;
    experienceLetter: string;
  };
  education: {
    title: string;
  };
  resources: {
    title: string;
    subtext: string;
    comingSoon: string;
  };
  contact: {
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    subtext1: string;
    subtext2: string;
    directEmailLabel: string;
    formTitle: string;
    formSubtext: string;
  };
  form: {
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    inquiryPlaceholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
    errors: {
      name: string;
      email: string;
      inquiry: string;
      message: string;
    };
  };
  /** Chrome for resource sub-pages (e.g. src/pages/ResourceDetailPage.tsx). The case study content itself lives in src/data/caseStudies.ts. */
  caseStudy: {
    backToResources: string;
    overviewTitle: string;
    highlightsTitle: string;
    galleryTitle: string;
    outcomeTitle: string;
    roleLabel: string;
    toolsLabel: string;
    yearLabel: string;
    ctaTitle: string;
    ctaButton: string;
    notFoundTitle: string;
    notFoundMessage: string;
  };
}
