/**
 * The site's single language type, shared by every component instead of each
 * one declaring its own "english" | "arabic" alias. To add a new language,
 * extend this union and then fill in the matching branch in every file under
 * src/i18n/ and src/data/ (TypeScript will point out what's missing).
 */
export type Language = "english" | "arabic";

/**
 * Figma's `direction` component property. It changes layout only (order,
 * alignment, mirrored icons). English pages use "ltr", Arabic pages "rtl".
 * Kept separate from Language so another right-to-left language can be added
 * later with the same rtl layout.
 */
export type Direction = "ltr" | "rtl";

/** Which direction a language reads in. */
export function getDirection(language: Language): Direction {
  return language === "arabic" ? "rtl" : "ltr";
}
