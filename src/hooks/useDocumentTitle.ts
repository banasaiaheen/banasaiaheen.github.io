import { useEffect } from "react";

/** The browser tab / search result title of the home page. Keep it in step with index.html. */
export const SITE_TITLE = "Bana Saiaheen — UX/UI Designer";

/** Sets the browser tab title (and so the title search engines show) for the current page. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
