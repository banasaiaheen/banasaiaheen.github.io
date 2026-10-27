import { useTranslations } from "../../i18n/useLanguage";
import { NAV_ITEMS, getSectionNumber, type SectionId } from "../../data/navigation";
import { SOCIAL_LINKS } from "../../data/socialLinks";
import Navigation from "./Navigation";

/**
 * The site navigation wired to the site content: both Navigation breakpoints
 * (responsive top bar and desktop sidebar, shown per breakpoint) filled from
 * src/i18n, src/data/navigation.ts and src/data/socialLinks.ts.
 *
 *  activeId   the section to show as selected — the one in view on the home
 *             page, none on child pages
 */
export interface SiteNavigationProps {
  activeId?: SectionId;
}

export default function SiteNavigation({ activeId }: SiteNavigationProps) {
  const { nav } = useTranslations();

  const pages = NAV_ITEMS.map((item) => ({
    number: getSectionNumber(item.id),
    nav: nav.tabs[item.id],
    href: item.href,
    state: item.id === activeId ? ("selected" as const) : ("default" as const),
  }));

  const links = SOCIAL_LINKS.map((link) => ({
    cta: nav[link.id],
    href: link.href,
    target: link.target,
    rel: link.rel,
  }));

  const shared = {
    name: nav.name,
    title: nav.position,
    location: nav.location,
    pages,
    links,
    switchToLabel: nav.switchTo,
    copyright: nav.copyRight,
    openMenuLabel: nav.openMenu,
    closeMenuLabel: nav.closeMenu,
  };

  return (
    <>
      <Navigation breakpoint="responsive" className="lg:hidden" {...shared} />
      <Navigation breakpoint="desktop" className="hidden lg:flex" {...shared} />
    </>
  );
}
