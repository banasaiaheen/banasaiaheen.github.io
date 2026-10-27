import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the element matching the current URL hash on mount/navigation — lets links like "/#projects" from other routes land on the right section. */
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    // "#home" is the top of the page: go all the way up, not just to the section under the nav bar.
    if (hash === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);
}
