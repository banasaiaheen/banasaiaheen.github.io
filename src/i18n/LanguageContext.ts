import { createContext } from "react";
import type { Direction, Language } from "../types/language";

export interface LanguageContextValue {
  language: Language;
  /** ltr for English, rtl for Arabic — the Figma `direction` property. */
  direction: Direction;
  setLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: "english",
  direction: "ltr",
  setLanguage: () => {},
});
