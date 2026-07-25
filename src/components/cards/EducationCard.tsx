import type { Language } from "../../types/language";
import { cn } from "../../utils/cn";

export type EducationCardVersion = "desktop" | "responsive";
export type EducationCardType = "main" | "sub";

export interface EducationCardProps {
  className?: string;
  language?: Language;
  version?: EducationCardVersion;
  type?: EducationCardType;
  /** "main" only */
  dateRange?: string;
  /** "main" only */
  degree?: string;
  /** "main" only */
  institution?: string;
  /** "sub" only */
  number?: string;
  /** "sub" only */
  year?: string;
  /** "sub" only */
  name?: string;
  /** "sub" only */
  source?: string;
}

/** Presentational only — content comes from src/data/education.ts. */
export default function EducationCard({
  className,
  language = "english",
  version = "desktop",
  type = "main",
  dateRange = "2016 — 2022",
  degree = "BACHELOR'S IN COMPUTER GRAPHICS & ANIMATION",
  institution = "Princess Sumaya University for Technology",
  number = "01",
  year = "2025",
  name = "USER CENTERED",
  source = "IxDF",
}: EducationCardProps) {
  const isArabic = language === "arabic";
  const isResponsive = version === "responsive";
  const dir = isArabic ? "rtl" : "ltr";

  if (type === "main") {
    return (
      <div
        dir={dir}
        className={cn(
          "relative flex items-start overflow-hidden border-b border-[#2a2a2a] bg-[#d42b2b]",
          isResponsive ? "w-full flex-col gap-2 p-4" : "w-[548px] min-w-[548px] flex-col gap-2 px-8 py-10",
          className,
        )}
      >
        <span
          aria-hidden="true"
          dir="ltr"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-barlow text-[80px] font-black leading-[80px] text-[#f7f4f0] opacity-[0.08] ${
            isArabic ? "-left-6" : "-right-6"
          }`}
        >
          00
        </span>
        <p className="relative w-full font-barlow text-[12px] text-white">{dateRange}</p>
        <p className="relative w-full font-barlow text-[20px] font-bold text-white">{degree}</p>
        <p className="relative w-full font-barlow text-[14px] font-light text-white">{institution}</p>
      </div>
    );
  }

  // DOM order stays constant (number before details, matching the English
  // reading order); the card's own `dir` mirrors it natively for Arabic.
  const numberEl = (
    <span
      dir="ltr"
      className={`w-[76px] shrink-0 whitespace-nowrap font-barlow text-[80px] font-black leading-[80px] text-transparent [-webkit-text-stroke:1.5px_#f7f4f0] ${
        isArabic ? "text-center" : ""
      }`}
      aria-hidden="true"
    >
      {number}
    </span>
  );

  const details = (
    <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2">
      <p className="w-full font-barlow text-[12px] text-[#e53737]">{year}</p>
      <p className="w-full whitespace-nowrap font-barlow text-[20px] font-bold text-[#f7f4f0]">{name}</p>
      <p className="w-full font-barlow text-[14px] font-light text-[#7a7a7a]">{source}</p>
    </div>
  );

  return (
    <div
      dir={dir}
      className={cn(
        "flex items-start gap-6 border-b border-[#5f5f5f]",
        isResponsive ? "w-full p-4" : "w-[548px] min-w-[548px] px-8 py-10",
        className,
      )}
    >
      {numberEl}
      {details}
    </div>
  );
}
