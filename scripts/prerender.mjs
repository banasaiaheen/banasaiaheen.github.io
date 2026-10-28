/**
 * Turns the built single-page app into real pages, one HTML file per route, each with its own
 * title, description, canonical URL, link-preview tags, structured data and the page content.
 *
 * Runs after `vite build` (dist/) and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`
 * (see the "build" script in package.json). It also writes sitemap.xml and the 404 page.
 *
 * Why: the app is rendered with JavaScript, so a plain HTML request used to return an empty page with
 * the home page's title. Search engines, link previews (WhatsApp, LinkedIn, X) and slow connections
 * now get the full page first, and the browser takes over from there.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DIST = "dist";
const BASE = process.env.BASE_PATH ?? "/";
const SITE_URL = "https://banasaiaheen.com";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const { render, getAllRoutes } = await import(pathToFileURL(resolve("dist-ssr/entry-server.js")).href);

const template = readFileSync(join(DIST, "index.html"), "utf8");
if (!template.includes("<!--seo-head-->")) throw new Error("index.html is missing the <!--seo-head--> marker");
if (!template.includes('<div id="root"></div>')) throw new Error('index.html is missing <div id="root"></div>');

const escapeAttr = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;");
// "<" inside JSON-LD could close the script tag early.
const jsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

// Preload the fonts the first screen uses, so text appears in the right font straight away.
// (Barlow Condensed Light/Regular/Black, Latin.) The files have hashed names, so look them up.
const assetFiles = readdirSync(join(DIST, "assets"));
const fontPreloads = ["300", "400", "900"]
  .map((weight) => assetFiles.find((file) => new RegExp(`^barlow-condensed-latin-${weight}-normal-.*\\.woff2$`).test(file)))
  .filter(Boolean)
  .map((file) => `    <link rel="preload" href="${BASE}assets/${file}" as="font" type="font/woff2" crossorigin />`);

function headTags(route) {
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);
  return [
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${route.canonical}" />`,
    `<meta property="og:type" content="${route.ogType}" />`,
    `<meta property="og:site_name" content="Bana Saiaheen" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:locale:alternate" content="ar_AR" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${route.canonical}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Bana Saiaheen, UX/UI designer in Amman, Jordan" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...fontPreloads.map((line) => line.trim()),
    ...route.jsonLd.map((data) => `<script type="application/ld+json">${jsonLd(data)}</script>`),
  ].join("\n    ");
}

function page({ title, head, body }) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeText(title)}</title>`)
    .replace("<!--seo-head-->", () => head)
    .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
}

function write(file, html) {
  const target = join(DIST, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

const routes = getAllRoutes();
const report = [];

for (const route of routes) {
  const body = render(route.path);
  const h1Count = (body.match(/<h1[\s>]/g) ?? []).length;
  if (h1Count !== 1) throw new Error(`${route.path} should have exactly one <h1>, found ${h1Count}`);
  write(route.path === "/" ? "index.html" : `${route.path.replace(/^\//, "")}index.html`, page({ title: route.title, head: headTags(route), body }));
  report.push(`${route.path}  ${(body.length / 1024).toFixed(0)} KB of content  "${route.title}" (${route.title.length}) / description ${route.description.length}`);
}

// 404 page: GitHub Pages serves it (with a 404 status) for any unknown path. It renders from scratch in the
// browser and must not be indexed.
write(
  "404.html",
  page({
    title: "Page not found — Bana Saiaheen",
    head: [`<meta name="robots" content="noindex" />`, ...fontPreloads.map((line) => line.trim())].join("\n    "),
    body: "",
  }),
);

// sitemap.xml from the same route list, so a new project page can't be forgotten.
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${route.canonical}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);

if (!existsSync(join(DIST, "404.html"))) throw new Error("404.html was not written");
console.log(`Prerendered ${routes.length} pages + 404.html + sitemap.xml\n  ${report.join("\n  ")}`);
