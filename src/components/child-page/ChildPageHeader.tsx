import { useEffect, useRef, useState } from "react";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import Button from "../button/Button";
import GhostNumber from "../sections/GhostNumber";

/**
 * Figma: child-page-header (342:1028). The top of a project page: back link to
 * Projects, outlined project number, software · type, title with an underlined
 * Figma link, and the description.
 *
 *  number / title / software / type / description   the project's info
 *  figmaHref / figmaLabel   the external Figma link and its translated label
 *  backHref / backLabel     the back link (to the Projects section)
 *  direction                ltr | rtl (defaults to the page direction)
 *
 * The header scrolls away like normal content and a compact bar (back link +
 * title) takes its place at the top of the page, on desktop and responsive. The
 * bar is only faded in and out and never changes the page height, so scrolling
 * slowly near the switch can't make the layout jump back and forth.
 *
 * Render it inside a wrapper that also holds the page content: that wrapper is
 * what the pinned header and the compact bar stay in.
 */
export interface ChildPageHeaderProps {
  number: string;
  title: string;
  software: string;
  type: string;
  description: string;
  figmaHref: string;
  figmaLabel: string;
  backHref?: string;
  backLabel: string;
  direction?: Direction;
}

/** Height of the responsive nav bar the compact bar sits under (the desktop nav is a side bar, so there it is 0). */
const NAV_BAR_HEIGHT = 70;
/** Same breakpoint as Tailwind's `lg:`, where the navigation turns into a sidebar. */
const DESKTOP_QUERY = "(min-width: 1024px)";

export default function ChildPageHeader({
  number,
  title,
  software,
  type,
  description,
  figmaHref,
  figmaLabel,
  backHref = "/#projects",
  backLabel,
  direction,
}: ChildPageHeaderProps) {
  const dir = useDirection(direction);
  const headerRef = useRef<HTMLElement>(null);
  // True once the full header has scrolled out from under the nav bar.
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const query = window.matchMedia(DESKTOP_QUERY);
    let observer: IntersectionObserver | undefined;

    // (Re)start watching the header; the strip taken by the responsive nav bar counts as outside the viewport.
    const watch = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(([entry]) => setShowBar(!entry.isIntersecting), {
        rootMargin: `-${query.matches ? 0 : NAV_BAR_HEIGHT}px 0px 0px 0px`,
      });
      observer.observe(el);
    };

    watch();
    query.addEventListener("change", watch);
    return () => {
      query.removeEventListener("change", watch);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        dir={dir}
        className="relative z-10 flex flex-col gap-4 overflow-hidden bg-brand-panel px-4 pb-8 pt-6 text-start lg:gap-5 lg:p-8"
      >
        <GhostNumber
          value={number}
          outline
          className="end-4 top-4 text-[64px] leading-[0.89] lg:end-8 lg:top-6 lg:text-[100px]"
        />
        <Button type="link" cta={backLabel} href={backHref} showLeadingIcon className="self-start" />
        <p className="flex flex-wrap gap-[2px] whitespace-nowrap text-regular-14 text-brand-red-on-dark">
          <span>{software}</span>
          <span aria-hidden="true">·</span>
          <span>{type}</span>
        </p>
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <h1 className="text-black-56 text-brand-cream">{title}</h1>
          <a
            href={figmaHref}
            target="_blank"
            rel="noreferrer"
            className="py-1 text-regular-14 text-brand-cream underline decoration-from-font transition-colors duration-150 hover:text-brand-red"
          >
            {figmaLabel}
          </a>
        </div>
        <p className="text-regular-18 text-neutral-62 lg:text-regular-20">{description}</p>
      </header>

      {/* A zero-height sticky anchor holds the bar, so it takes no space in the page. On responsive it starts
          1px under the nav bar (which sits above it) so no sliver of the page can show between the two. */}
      <div className="sticky top-[69px] z-10 h-0 lg:top-0">
        <div
          dir={dir}
          aria-hidden={!showBar}
          className={cn(
            "absolute inset-x-0 top-0 flex flex-col gap-2 bg-brand-panel px-4 pb-4 pt-[17px] text-start transition-opacity duration-150 lg:px-8 lg:pt-4",
            showBar ? "opacity-100" : "pointer-events-none invisible opacity-0",
          )}
        >
          <Button type="link" cta={backLabel} href={backHref} showLeadingIcon className="self-start" />
          <p className="text-bold-24 text-brand-cream">{title}</p>
        </div>
      </div>
    </>
  );
}
