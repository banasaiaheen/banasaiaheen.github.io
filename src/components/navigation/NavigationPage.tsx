import type { MouseEventHandler } from "react";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

export type NavigationPageState = "default" | "hover" | "selected";

/**
 * Figma: pages (19:842). One row of the navigation page list: section number
 * and label.
 *
 *  number     section number, 00–05 (always Latin digits)
 *  nav        section label — pass the translated string (content nav/tabs/*)
 *  state      default | hover | selected (the section currently in view). Real
 *             hover works through CSS; pass state="hover" only to force the look.
 *  href       target of the row (a "#section" anchor on the home page)
 *  direction  ltr | rtl (defaults to the page direction). rtl mirrors the row
 *             and the hover nudge.
 */
export interface NavigationPageProps {
  number: string;
  nav: string;
  state?: NavigationPageState;
  href?: string;
  direction?: Direction;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

// One class set per state so real :hover and the forced "hover" look can't clash.
const rowClasses: Record<NavigationPageState, string> = {
  default: "hover:ps-2",
  hover: "ps-2",
  selected: "text-brand-red",
};

const numberClasses: Record<NavigationPageState, string> = {
  default: "text-neutral-48 group-hover:text-neutral-16",
  hover: "text-neutral-16",
  selected: "",
};

const labelClasses: Record<NavigationPageState, string> = {
  default: "text-neutral-52 group-hover:text-brand-white",
  hover: "text-brand-white",
  selected: "",
};

export default function NavigationPage({
  number,
  nav,
  state = "default",
  href = "#",
  direction,
  onClick,
  className,
}: NavigationPageProps) {
  const dir = useDirection(direction);

  return (
    <a
      href={href}
      dir={dir}
      aria-current={state === "selected" ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "group flex w-full items-center gap-[10px] py-2 text-regular-18 leading-none transition-[padding] duration-150",
        rowClasses[state],
        className,
      )}
    >
      {/* Numbers stay Latin digits in Arabic too, as in the Figma "00" labels. */}
      <span className={cn("shrink-0 transition-colors duration-150", numberClasses[state])}>{number}</span>
      <span className={cn("shrink-0 transition-colors duration-150", labelClasses[state])}>{nav}</span>
    </a>
  );
}
