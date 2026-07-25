# Bana Saiaheen — Portfolio Site

## Editing the site's content

You don't need to touch any component code to update what's on the site. Everything editable lives in two places:

| What you want to change | Where to edit |
| --- | --- |
| Any English or Arabic text (nav labels, buttons, headings, form copy) | `src/i18n/translations/en.ts` and `src/i18n/translations/ar.ts` |
| Your name, title, location, email | `src/data/siteProfile.ts` |
| Nav items / page section order | `src/data/navigation.ts` — reordering here also renumbers every section's decorative number automatically |
| Social links (email, LinkedIn, Figma) | `src/data/socialLinks.ts` |
| Work experience entries | `src/data/workExperience.ts` |
| Education (degree + course cards) | `src/data/education.ts` |
| Resources / project cards (links, badges, categories) | `src/data/resources.ts` |
| Skills list | `src/data/skills.ts` |
| Contact form "type of inquiry" options | `src/data/inquiryOptions.ts` |

Each file under `src/data/` and `src/i18n/translations/` has a comment block at the top explaining its shape. Adding, removing, or reordering entries in any list (work history, education cards, resources, skills, nav items) is safe — cards render however many entries exist, and the Education/Resources sections automatically paginate 4-per-page once you add a 5th item.

The `src/components/`, `src/sections/`, and `src/HomePage.tsx` files are UI/layout code — you shouldn't need to edit these to update content.

## Project structure

```
src/
  i18n/translations/   English + Arabic UI copy
  data/                 Repeatable content (work, education, resources, skills, nav, links)
  components/ui/        Generic reusable UI primitives (Button, Input, Pagination, ...)
  components/cards/      Reusable card components (WorkCard, EducationCard, ...)
  components/layout/     Navigation + nav links
  components/forms/      Contact form + its pieces
  sections/               One file per homepage section, composing components + data + i18n
  hooks/, utils/, lib/    Supporting logic
  HomePage.tsx            Composition root — wires language state and renders the sections in order
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
