import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getDirection, type Language } from "../types/language";
import { LanguageContext } from "./LanguageContext";

/**
 * Holds the page language for the whole app (above the router, so it survives
 * navigation to child pages) and keeps <html dir/lang> in sync so native
 * browser behavior (spellcheck, form bubbles, default quotes) is RTL-aware too.
 */
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("english");
  const direction = getDirection(language);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language === "arabic" ? "ar" : "en";
  }, [direction, language]);

  const value = useMemo(() => ({ language, direction, setLanguage }), [language, direction]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
