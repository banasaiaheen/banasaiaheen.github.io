import { Link } from "react-router-dom";
import type { Language } from "../../types/language";

export interface BreadcrumbItem {
  label: string;
  /** Omit on the last item — the current page isn't a link. */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  language: Language;
}

/** Home / Resources / Page-title style trail for sub-pages — shows the current position in the site hierarchy and gives a one-click jump back to any ancestor level. */
export default function Breadcrumb({ items, language }: BreadcrumbProps) {
  const isArabic = language === "arabic";
  return (
    <nav
      aria-label="Breadcrumb"
      dir={isArabic ? "rtl" : "ltr"}
      className="flex flex-wrap items-center gap-2 font-barlow text-[13px]"
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden="true" className="text-[#3a3a3a]">
              /
            </span>
          )}
          {item.href ? (
            <Link to={item.href} className="text-[#7a7a7a] transition-colors duration-150 hover:text-[#d42b2b]">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-[#f7f4f0]">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
