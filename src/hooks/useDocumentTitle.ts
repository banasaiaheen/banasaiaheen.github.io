import { useEffect } from "react";
import { SITE_TITLE } from "../data/seo";

/** The browser tab / search result title of the home page (edit it in src/data/seo.ts). */
export { SITE_TITLE };

/** Sets the browser tab title (and so the title search engines show) for the current page. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
