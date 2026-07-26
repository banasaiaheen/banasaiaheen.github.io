import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { NAV_ITEMS, getSectionNumber } from "../data/navigation";
import { SOCIAL_LINKS } from "../data/socialLinks";
import type { NavigationPage, NavigationSocialLink } from "../components/layout/Navigation";

/**
 * Builds the props for <Navigation>'s `pages` list, shared by every page that
 * renders the site nav (HomePage, resource sub-pages, ...). `activeId` is
 * whichever nav item should show as selected — the in-view section on the
 * homepage, or a fixed id (e.g. "resources") on a sub-page that belongs to
 * that section.
 */
export function getNavPages(language: Language, activeId: string): NavigationPage[] {
  const t = getTranslations(language);
  return NAV_ITEMS.map((item) => ({
    number: getSectionNumber(item.id),
    nav: t.nav[item.id as keyof typeof t.nav],
    href: item.href,
    selected: item.id === activeId,
  }));
}

export function getNavSocialLinks(language: Language): NavigationSocialLink[] {
  const t = getTranslations(language);
  return SOCIAL_LINKS.map((link) => ({
    cta: t.social[link.id as keyof typeof t.social],
    href: link.href,
    target: link.target,
    rel: link.rel,
  }));
}
