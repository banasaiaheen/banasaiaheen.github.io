# Bana Saiaheen — Portfolio Site

## Editing the site's content

You don't need to touch any component code to update what's on the site. Everything editable lives in two places:

| What you want to change | Where to edit |
| --- | --- |
| Any English or Arabic text (nav labels, headings, form copy, 404) | `src/i18n/translations/en.ts` and `ar.ts` — grouped like the Figma content variables (`nav`, `home`, `about`, `contact.form`, ...) |
| Email address | `src/data/siteProfile.ts` |
| Nav items / page section order | `src/data/navigation.ts` — reordering renumbers every section automatically |
| Social links (email, LinkedIn, Figma) | `src/data/socialLinks.ts` |
| Work experience entries | `src/data/workExperience.ts` |
| Certificates (4 per page, the pager grows by itself) | `src/data/certificates.ts` |
| Project cards | `src/data/projects.ts` |
| A project's own page | `src/data/projectPages.ts` |
| Skills list | `src/data/skills.ts` |
| What Google and link previews show (page titles, descriptions, structured data) | `src/data/seo.ts` |

Each file under `src/data/` and `src/i18n/translations/` has a comment block at the top explaining its shape.

## Design system

The code mirrors the Figma file (kcDOoECGUtLG0KRMrZZfru): every Figma component has a React component with the same name and the same properties, and the Figma variables are Tailwind tokens. Build new UI from these pieces so the code and the Figma file stay in step.

### Figma component → code

| Figma component | Code |
| --- | --- |
| icons (`icon/ forward`, `backward`, `new-window`, `down`, `status-dot`, `flag-jordan`) | `src/components/icons/` |
| `button` (primary, link, link-xl) | `src/components/button/Button.tsx` |
| `input`, `dropdown-menu`, `dropdown-option` | `src/components/input/` |
| `navigation`, `pages`, `toggle-menu` | `src/components/navigation/` (`SiteNavigation` fills it with the site content, `PageLayout` is the frame every page uses) |
| `work-card`, `education-card`, `certificates-cards`, `carousel-indicator`, `skillVtool-card`, `projects-card`, `message` | `src/components/cards/` |
| `sections` (home, about, work-experience, education, projects, contact, not-found) | `src/components/sections/` |
| `child-page-header`, `child-page-sections` (text, list, gallery) | `src/components/child-page/` |

Each component's header comment names its Figma node and lists its properties. Figma properties map straight to props: `direction` (ltr / rtl, defaults to the page direction), `state`, `type`, text properties (`cta`, `title`, ...) and `show-*` toggles. The Figma `breakpoint` property (desktop / responsive) is handled with responsive CSS (`lg:`), not duplicated components.

### Tokens and text styles

`src/styles/tokens.css` holds the Figma variables: `brand/ink` → `bg-brand-ink`, `neutral/48` → `text-neutral-48`, and so on. Text styles keep their Figma names: `text-regular-16`, `text-bold-20`, `text-black-56`, `text-numbers-144`. Never hardcode a hex value or font size in a component; add or change the token instead.

Language-dependent values (font, line-heights, letter-spacing) switch with the page direction: English pages are `dir="ltr"` (Barlow Condensed), Arabic pages `dir="rtl"` (Cairo). Use logical classes (`ps-`, `pe-`, `start-`, `text-start`) so layouts mirror for free.

### Adding a project and its page

1. Add the project to `src/data/projects.ts` for both languages (give it a `slug` if it gets a page, or `disabled: true` for "Coming soon").
2. Add the same slug to `src/data/projectPages.ts` for both languages: a header (title, software, type, description, Figma link) and a list of `sections` (`text`, `list` or `gallery`).
3. Done — the card links to `/projects/<slug>`, the page is built from the child-page components and ends with the Contact section.

## Publishing on GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main` (or `master`). One-time setup in the repository on GitHub:

1. **Settings → Pages → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → New repository secret**, three times, with the values from your EmailJS dashboard (the same ones as in your local `.env`): `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

The site uses the custom domain **banasaiaheen.com** (the `public/CNAME` file, which is copied into every deployment) and is served from the root. Without a `CNAME` file, a repository named `<user>.github.io` is also served from the root and any other repository from `/<repository>/`; the workflow sets the base path for you.

Domain setup (at your registrar and under **Settings → Pages → Custom domain**): four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, plus a `CNAME` record for `www` pointing to `<user>.github.io`. Then tick **Enforce HTTPS** once GitHub has issued the certificate. `404.html` (written by the build and marked `noindex`) loads the app, so refreshing a page like `/projects/medconnect` still works.

The contact form sends through EmailJS: the recipient (your email) is set in the EmailJS email template (**To Email**), not in the code.

## Search engines (SEO) and speed

The app renders with JavaScript, so the build also pre-renders it: `npm run build` runs `vite build`, a server build of `src/entry-server.tsx`, then `scripts/prerender.mjs`. That writes one real HTML page per route (home and every project page) with its own `<title>`, description, canonical URL, link-preview (Open Graph / X) tags, structured data (JSON-LD) and the page content, plus `404.html` and `sitemap.xml`. The browser then attaches to the same markup (hydration), so nothing changes for visitors.

- **Titles, descriptions, structured data:** edit `src/data/seo.ts`. Keep titles under about 60 characters and descriptions under about 160. A new project page is added to the sitemap automatically; give it an entry in `PROJECT_SEO` for a hand-written title and description.
- **Fonts** are self-hosted (`src/styles/fonts.css`, from the `@fontsource` packages): only the weights in use, and Arabic glyphs only download for Arabic visitors. The first-screen fonts are preloaded.
- **Images** are WebP at their display size (`src/assets`). Convert new screenshots to WebP before adding them.
- **Scroll-in animation:** content fades up as it scrolls into view from below, and again each time you scroll back down to it; scrolling up never hides or replays anything. It lives in `src/hooks/useRevealOnScroll.ts`, where the `GROUPS` list at the top sets what animates. Everything stays plain, visible HTML until the page is running, the first screen is never hidden, and it is skipped for visitors who prefer reduced motion. To switch it off, remove the `useRevealOnScroll()` call in `PageLayout`.
- After a deploy, ask Google to re-read a page in Search Console (**URL inspection → Request indexing**).

## Project structure

```
src/
  styles/tokens.css       Figma variables + text styles
  i18n/                   LanguageProvider, useLanguage/useDirection, translations/{en,ar}.ts
  data/                   Repeatable content (work, certificates, projects, project pages, skills, nav, links)
  components/             The design-system components (see the table above)
  pages/                  Routes: HomePage, ProjectPage (/projects/:slug), NotFoundPage
  hooks/, utils/, lib/    Supporting logic (active section, scroll to hash, cn, EmailJS)
  App.tsx                 Language provider + routes
```

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
