/**
 * Shape of every piece of translatable UI text on the site. The groups mirror
 * the Figma `content` variable collection (nav/*, home/*, about/*, ...), so a
 * Figma variable `contact/form/title` lives at `contact.form.title` here.
 * Both src/i18n/translations/en.ts and ar.ts must satisfy this exactly, so
 * adding a field here forces you to fill it in for both languages.
 *
 * This does NOT include repeatable content (work history, projects,
 * certificates, skills) — that lives in src/data/ since it is naturally
 * structured as lists rather than one-off UI strings.
 */
export interface Translations {
  /** Figma: nav/* */
  nav: {
    name: string;
    position: string;
    location: string;
    /** Full copyright line. */
    copyRight: string;
    /** Label on the button that switches to the *other* language. */
    switchTo: string;
    email: string;
    linkedin: string;
    figma: string;
    openMenu: string;
    closeMenu: string;
    /** Keyed by the nav item `id` from src/data/navigation.ts. */
    tabs: {
      home: string;
      about: string;
      experience: string;
      education: string;
      projects: string;
      contact: string;
    };
  };
  /** Figma: home/* */
  home: {
    portfolio: string;
    year: string;
    subText: string;
    tagline: string;
    contactMe: string;
  };
  /** Figma: about/* */
  about: {
    title: string;
    paragraphs: [string, string];
  };
  /** Figma: experience/* — the title is set on two lines. */
  experience: {
    title: [string, string];
  };
  /** Figma: education/* */
  education: {
    title: string;
    degree: {
      year: string;
      degree: string;
      uni: string;
    };
    certificatesLabel: string;
    pageLabel: string;
  };
  /** Figma: projects/* */
  projects: {
    title: string;
    subText: string;
    badge: string;
  };
  /** Figma: contact/* */
  contact: {
    /** The three lines of the headline; the middle one is red. */
    title: [string, string, string];
    subText: string;
    label: string;
    form: {
      title: string;
      subText: string;
      placeholders: {
        name: string;
        email: string;
        inquiry: string;
        message: string;
      };
      /** The "Type of inquiry" dropdown options (contact/inquiry/option-*). */
      inquiryOptions: string[];
      send: string;
      sending: string;
      required: string;
      invalidEmail: string;
      /** Confirmation that replaces the form once the message is sent. */
      sent: {
        title: string;
        text: string;
        again: string;
      };
      /** Notice (the `message` component) shown when sending fails. */
      error: {
        title: string;
        text: string;
      };
    };
  };
  /** Figma: not-found/* — the 404 page. */
  notFound: {
    label: string;
    title: string;
    subText: string;
    tagline: string;
    backHome: string;
  };
  /** Chrome of project (child) pages. The project content itself lives in src/data/projectPages.ts. */
  childPage: {
    figmaLink: string;
  };
}
