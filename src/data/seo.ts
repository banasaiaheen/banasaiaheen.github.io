import { SITE_EMAIL } from "./siteProfile";
import { PROJECTS } from "./projects";
import { PROJECT_PAGES } from "./projectPages";

/**
 * ============================================================================
 *  SEO — what search engines and link previews (WhatsApp, LinkedIn, X ...) see
 *  for each page. The build (scripts/prerender.mjs) writes these into each
 *  page's HTML, so they are there before any JavaScript runs.
 *
 *  - Home:          edit SITE_TITLE / SITE_DESCRIPTION below.
 *  - Project pages: edit PROJECT_SEO below (a project without an entry still
 *                   gets a sensible title and description from its own page).
 *
 *  Keep titles under about 60 characters and descriptions under about 160, or
 *  Google cuts them off in the results.
 * ============================================================================
 */
export const SITE_URL = "https://banasaiaheen.com";
export const SITE_NAME = "Bana Saiaheen";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** The home page title (also the browser tab title). */
export const SITE_TITLE = "Bana Saiaheen — UX/UI Designer in Amman, Jordan";
export const SITE_DESCRIPTION =
  "Portfolio of Bana Saiaheen (بانا الصيّاحيّن), a UX/UI designer in Amman, Jordan. UX case studies, design systems, experience and freelance contact.";

/** Hand-written search titles/descriptions per project, keyed by the slug in src/data/projects.ts. */
const PROJECT_SEO: Record<string, { title: string; description: string }> = {
  "portfolio-design": {
    title: "Portfolio Design — UX/UI Case Study in Figma | Bana Saiaheen",
    description:
      "Behind the scenes of this bilingual English and Arabic UX/UI portfolio: how it was designed and prototyped in Figma, from concept to a responsive website.",
  },
  medconnect: {
    title: "MedConnect — Healthcare App UX/UI Case Study | Bana Saiaheen",
    description:
      "MedConnect, a Figma UX/UI case study: an app where patients book appointments and message doctors, and doctors manage patients and schedules.",
  },
};

export interface RouteSeo {
  /** Path inside the site, always with a leading and trailing slash ("/" or "/projects/<slug>/"). */
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  /** JSON-LD objects for this page. */
  jsonLd: object[];
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const PERSON = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  alternateName: ["Bana Khaldoon Saiaheen", "بانا خلدون الصيّاحيّن", "بانا الصيّاحيّن"],
  jobTitle: "UX/UI Designer",
  description:
    "UX/UI designer based in Amman, Jordan, with a background in 3D art and digital fashion design. Designs bilingual (English and Arabic) websites, apps and design systems.",
  url: `${SITE_URL}/`,
  image: OG_IMAGE,
  email: SITE_EMAIL,
  address: { "@type": "PostalAddress", addressLocality: "Amman", addressCountry: "JO" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Princess Sumaya University for Technology" },
  knowsAbout: ["UX design", "UI design", "Design systems", "Figma", "Responsive web design", "Arabic and English bilingual design"],
  sameAs: ["https://www.linkedin.com/in/bana-saiaheen", "https://www.figma.com/@banasaiaheen", "https://github.com/banasaiaheen"],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: ["en", "ar"],
  publisher: { "@id": PERSON_ID },
};

/** Every indexable page, in sitemap order. */
export function getAllRoutes(): RouteSeo[] {
  const home: RouteSeo = {
    path: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    canonical: `${SITE_URL}/`,
    ogType: "website",
    jsonLd: [
      { "@context": "https://schema.org", "@graph": [PERSON, WEBSITE, { "@type": "ProfilePage", "@id": `${SITE_URL}/#profile`, url: `${SITE_URL}/`, name: SITE_TITLE, mainEntity: { "@id": PERSON_ID }, inLanguage: "en" }] },
    ],
  };

  const projects = PROJECTS.english.flatMap((project): RouteSeo[] => {
    const slug = project.slug;
    const page = slug ? PROJECT_PAGES.english[slug] : undefined;
    if (!slug || !page) return [];

    const seo = PROJECT_SEO[slug] ?? {
      title: `${project.title} — ${project.type} | ${SITE_NAME}`,
      description: page.description,
    };
    const path = `/projects/${slug}/`;
    const url = `${SITE_URL}${path}`;
    const images = page.sections
      .flatMap((section) => (section.kind === "gallery" ? section.screens : []))
      .flatMap((screen) => (screen.src?.startsWith("/") ? [`${SITE_URL}${screen.src}`] : []));

    return [
      {
        path,
        title: seo.title,
        description: seo.description,
        canonical: url,
        ogType: "article",
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
                  { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/#projects` },
                  { "@type": "ListItem", position: 3, name: project.title, item: url },
                ],
              },
              {
                "@type": "CreativeWork",
                "@id": `${url}#project`,
                name: project.title,
                url,
                description: seo.description,
                genre: `${project.software} ${project.type}`,
                inLanguage: ["en", "ar"],
                author: { "@id": PERSON_ID },
                ...(images.length ? { image: images } : {}),
              },
              PERSON,
            ],
          },
        ],
      },
    ];
  });

  return [home, ...projects];
}

/** The SEO data of one page ("/" or "/projects/<slug>"), or undefined for a path that isn't a real page. */
export function getRouteSeo(pathname: string): RouteSeo | undefined {
  const path = `/${pathname.replace(/^\/+|\/+$/g, "")}/`.replace("//", "/");
  return getAllRoutes().find((route) => route.path === path);
}

/** The browser tab title of an English project page (same text search engines get). */
export function getProjectTitle(slug: string): string | undefined {
  return getRouteSeo(`/projects/${slug}`)?.title;
}
