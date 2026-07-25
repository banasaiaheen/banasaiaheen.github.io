import type { AnchorHTMLAttributes } from "react";
import type { Language } from "../../types/language";
import { cn } from "../../utils/cn";

export interface NavLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  className?: string;
  language?: Language;
  nav?: string;
  number?: string;
  selected?: boolean;
}

/** A single numbered row in the site navigation (e.g. "01  ABOUT"). */
export default function NavLink({
  className,
  language = "english",
  nav = "NAV",
  number = "00",
  selected = false,
  ...rest
}: NavLinkProps) {
  const isArabic = language === "arabic";

  const numberEl = (
    <span className={`shrink-0 font-barlow text-[18px] ${selected ? "" : "text-[#2a2a2a]"}`}>
      {number}
    </span>
  );
  const navEl = (
    <span
      className={`shrink-0 font-barlow text-[18px] transition-colors duration-150 ${
        selected ? "" : "text-[#666] group-hover:text-white"
      }`}
    >
      {nav}
    </span>
  );

  return (
    <a
      aria-current={selected ? "page" : undefined}
      {...rest}
      dir={isArabic ? "rtl" : "ltr"}
      className={cn(
        "group flex items-center gap-[10px] border-b-[0.8px] border-transparent pt-2 pb-[8.8px]",
        "transition-[padding] duration-150",
        selected ? "text-[#d42b2b]" : isArabic ? "hover:pr-2" : "hover:pl-2",
        className,
      )}
    >
      {numberEl}
      {navEl}
    </a>
  );
}
