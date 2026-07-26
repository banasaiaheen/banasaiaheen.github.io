import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to the element matching the current URL hash on mount/navigation — lets links like "/#resources" from other routes land on the right section. */
export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);
}
