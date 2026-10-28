import { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { getDirection, type Language } from "../types/language";
import { LanguageContext } from "./LanguageContext";

/** Where the visitor's language choice is remembered (also read by the small script in index.html). */
const STORAGE_KEY = "language";

/** useLayoutEffect only exists in the browser; on the server (the build's pre-rendering) use useEffect. */
const useBrowserLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function readStoredLanguage(): Language | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "arabic" || stored === "english" ? stored : null;
  } catch {
    // Storage can be blocked (private mode, strict settings): the site simply starts in English.
    return null;
  }
}

/**
 * Holds the page language for the whole app (above the router, so it survives
 * navigation to child pages) and keeps <html dir/lang> in sync so native
 * browser behavior (spellcheck, form bubbles, default quotes) is RTL-aware too.
 *
 * The choice is remembered in the browser, so a refresh (or a return visit) keeps the language. Every page
 * is built in English, so the first render is always English (the markup has to match the built page);
 * a saved Arabic choice is applied right after, before the browser paints.
 */
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("english");
  const direction = getDirection(language);

  useBrowserLayoutEffect(() => {
    const stored = readStoredLanguage();
    if (stored) setLanguageState(stored);
    // The script in index.html hides the page while it waits for a saved Arabic choice: show it now.
    document.documentElement.classList.remove("language-pending");
  }, []);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language === "arabic" ? "ar" : "en";
  }, [direction, language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not remembered, but the switch itself still works.
    }
  }, []);

  const value = useMemo(() => ({ language, direction, setLanguage }), [language, direction, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
