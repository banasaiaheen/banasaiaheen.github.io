import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.tsx";

/**
 * Build-time entry (see scripts/prerender.mjs): renders a page of the site to an HTML string so the
 * built page already contains its content, before any JavaScript runs. That is what search engines,
 * link previews and slow connections get first; the browser then takes over (hydrates) the same markup.
 */
export function render(path: string): string {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");
  return renderToString(
    <StaticRouter location={`${basename}${path}`} basename={basename}>
      <App />
    </StaticRouter>,
  );
}

export { getAllRoutes } from "./data/seo.ts";
