import { Link } from "react-router-dom";
import type { Language } from "../../types/language";
import Button from "../ui/Button";
import ChevronDownIcon from "../ui/ChevronDownIcon";

export interface SubPageNavProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  siteName: string;
  backLabel: string;
  /** Where the back link points, e.g. "/#resources". */
  backHref: string;
  switchToLabel: string;
}

/**
 * Lightweight sticky top bar for sub-pages (case studies, etc.) — deliberately
 * not the homepage's full anchor-list sidebar, since none of those same-page
 * anchors apply once you've navigated away. Just enough to stay oriented:
 * site name (→ home), a clear way back, and the language switch.
 */
export default function SubPageNav({ language, onLanguageChange, siteName, backLabel, backHref, switchToLabel }: SubPageNavProps) {
  const isArabic = language === "arabic";
  // Chevron points "back" toward the start of reading direction — left in
  // LTR, right in RTL — matching the same rotation logic used by Pagination's
  // previous-page control.
  const backRotation = isArabic ? "-rotate-90" : "rotate-90";

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className="sticky top-0 z-50 flex w-full items-center justify-between gap-4 border-b-[0.8px] border-[#2a2a2a] bg-[#0d0d0d] px-5 py-6 lg:px-8"
    >
      <div className="flex min-w-0 items-center gap-6">
        <Link
          to="/"
          className="shrink-0 whitespace-nowrap font-barlow text-[20px] font-bold text-[#f7f4f0] transition-colors duration-150 hover:text-[#d42b2b]"
        >
          {siteName}
        </Link>
        <Link
          to={backHref}
          className="flex min-w-0 items-center gap-2 font-barlow text-[14px] text-[#aeaeae] transition-colors duration-150 hover:text-[#d42b2b]"
        >
          <ChevronDownIcon size={12} className={`shrink-0 ${backRotation}`} />
          <span className="truncate">{backLabel}</span>
        </Link>
      </div>
      <Button
        variant="link"
        language={isArabic ? "english" : "arabic"}
        cta={switchToLabel}
        onClick={() => onLanguageChange(isArabic ? "english" : "arabic")}
      />
    </nav>
  );
}
