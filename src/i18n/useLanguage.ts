import { useContext } from "react";
import type { Direction } from "../types/language";
import { LanguageContext } from "./LanguageContext";
import { getTranslations, type Translations } from "./translations";

/** Current page language + direction. Components use this instead of a `language` prop. */
export function useLanguage() {
  return useContext(LanguageContext);
}

/** All UI copy (src/i18n/translations) for the current page language. */
export function useTranslations(): Translations {
  return getTranslations(useLanguage().language);
}

/**
 * Resolves a component's `direction` property (Figma: ltr | rtl). An explicit
 * prop wins; otherwise the page direction from context is used.
 */
export function useDirection(direction?: Direction): Direction {
  const { direction: pageDirection } = useLanguage();
  return direction ?? pageDirection;
}
