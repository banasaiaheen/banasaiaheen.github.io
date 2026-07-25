import type { Language } from "../../types/language";
import type { Translations } from "./types";
import en from "./en";
import ar from "./ar";

export type { Translations } from "./types";

const translations: Record<Language, Translations> = { english: en, arabic: ar };

/** Looks up all UI copy for a given language. Use this instead of importing en/ar directly. */
export function getTranslations(language: Language): Translations {
  return translations[language];
}
