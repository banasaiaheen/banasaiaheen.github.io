import type { ReactNode } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import type { SectionId } from "../../data/navigation";
import SiteNavigation from "./SiteNavigation";

/**
 * The frame shared by every page: the site navigation (top bar on responsive,
 * sidebar on desktop — on the right in Arabic) beside the page content.
 * `activeId` marks the selected nav page; leave it out on pages that aren't a
 * home section (project pages, 404).
 */
export interface PageLayoutProps {
  activeId?: SectionId;
  children: ReactNode;
}

export default function PageLayout({ activeId, children }: PageLayoutProps) {
  const { direction } = useLanguage();
  // Content fades in as it scrolls into view (see the hook for what is animated and how to switch it off).
  useRevealOnScroll();
  return (
    <div dir={direction} className="flex min-h-screen flex-col bg-brand-ink lg:flex-row">
      <SiteNavigation activeId={activeId} />
      <main className="flex w-full min-w-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
