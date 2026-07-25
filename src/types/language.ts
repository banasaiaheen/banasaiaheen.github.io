/**
 * The site's single language type, shared by every component instead of each
 * one declaring its own "english" | "arabic" alias. To add a new language,
 * extend this union and then fill in the matching branch in every file under
 * src/i18n/ and src/data/ (TypeScript will point out what's missing).
 */
export type Language = "english" | "arabic";
