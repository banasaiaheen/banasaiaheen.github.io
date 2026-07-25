import type { Language } from "../types/language";
import jordanFlag from "../assets/jordan-flag.png";

/**
 * ============================================================================
 *  SITE IDENTITY — your name, title, location, and contact email as shown in
 *  the navigation and hero section. Edit the strings below; `name`/`title`/
 *  `location` are per-language since they're translated, the rest apply to
 *  both.
 * ============================================================================
 */
export const SITE_EMAIL = "banasaiaheen@gmail.com";
export const COPYRIGHT_YEAR = "2026";
/** Small flag icon shown next to the location in the nav. Swap the import to change it. */
export const LOCATION_FLAG_IMAGE = jordanFlag;

export interface SiteProfile {
  name: string;
  title: string;
  location: string;
}

export const SITE_PROFILE: Record<Language, SiteProfile> = {
  english: {
    name: "Bana Saiaheen",
    title: "UX/UI DESIGNER",
    location: "Amman, Jordan",
  },
  arabic: {
    name: "بانا الصيّاحيّن",
    title: "مصممة تجربة المستخدم وواجهة المستخدم",
    location: "عمّان، الأردن",
  },
};
