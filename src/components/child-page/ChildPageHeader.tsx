import { useEffect, useState } from "react";
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
 * The header stays pinned while the page scrolls. On responsive it collapses to
 * the back link and a smaller title once scrolled, so it doesn't eat the
 * screen; on desktop it always shows in full.
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Parts that disappear when collapsed (responsive only: `lg:` always shows them).
  const collapsible = isScrolled ? "hidden lg:flex" : "flex";

  return (
    // top-[94.5px] sits this below the responsive nav bar (also sticky) so the two
    // don't stack; the desktop nav is a side bar, so the header pins to the top there.
    <header
      dir={dir}
      className={cn(
        "sticky top-[94.5px] z-10 flex flex-col overflow-hidden bg-brand-panel px-4 text-start lg:top-0 lg:gap-5 lg:p-8",
        isScrolled ? "gap-2 py-4" : "gap-5 py-8",
      )}
    >
      <GhostNumber
        value={number}
        outline
        className={cn(
          "end-4 top-4 text-[100px] leading-[0.89] lg:end-8 lg:top-6 lg:block",
          isScrolled && "hidden",
        )}
      />
      <Button
        type="link"
        cta={backLabel}
        href={backHref}
        showLeadingIcon
        className="self-start"
      />
      <p className={cn("flex-wrap gap-[2px] whitespace-nowrap text-regular-14 text-brand-red-on-dark", collapsible)}>
        <span>{software}</span>
        <span aria-hidden="true">·</span>
        <span>{type}</span>
      </p>
      <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
        <h1 className={cn("text-brand-cream lg:text-black-56", isScrolled ? "text-bold-24" : "text-black-56")}>
          {title}
        </h1>
        <a
          href={figmaHref}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "py-1 text-regular-14 text-brand-cream underline decoration-from-font transition-colors duration-150 hover:text-brand-red",
            isScrolled && "hidden lg:inline",
          )}
        >
          {figmaLabel}
        </a>
      </div>
      <p className={cn("text-regular-20 text-neutral-62", isScrolled ? "hidden lg:block" : "block")}>{description}</p>
    </header>
  );
}
