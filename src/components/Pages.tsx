import type { AnchorHTMLAttributes } from "react";

export type PagesLanguage = "english" | "arabic";

export interface PagesProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  className?: string;
  language?: PagesLanguage;
  nav?: string;
  number?: string;
  selected?: boolean;
}

export default function Pages({
  className,
  language = "english",
  nav = "NAV",
  number = "00",
  selected = false,
  ...rest
}: PagesProps) {
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
      className={[
        "group flex items-center gap-[10px] border-b-[0.8px] border-transparent pt-2 pb-[8.8px]",
        "transition-[padding] duration-150",
        selected ? "text-[#d42b2b]" : isArabic ? "hover:pr-2" : "hover:pl-2",
        className ?? "",
      ].join(" ")}
    >
      {numberEl}
      {navEl}
    </a>
  );
}
