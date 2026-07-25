import type { Language } from "../../types/language";
import { cn } from "../../utils/cn";
import IconNewWindow from "../ui/IconNewWindow";

export type WorkCardVersion = "desktop" | "responsive";

export interface WorkCardProps {
  className?: string;
  title?: string;
  companyName?: string;
  employmentType?: string;
  location?: string;
  from?: string;
  to?: string;
  freelance?: boolean;
  recommendation?: boolean;
  experienceLetterHref?: string;
  /** Label for the "Experience Letter" link. Pass the translated string from src/i18n. */
  experienceLetterLabel?: string;
  subText?: string;
  language?: Language;
  version?: WorkCardVersion;
}

/** Presentational only — content comes from src/data/workExperience.ts, labels from src/i18n. */
export default function WorkCard({
  className,
  title = "UX/DESIGNER",
  companyName = "ADRES via Estarta Solutions",
  employmentType = "Full-time",
  location = "Hybrid",
  from = "2023",
  to = "2026",
  freelance = true,
  recommendation = true,
  experienceLetterHref = "#",
  experienceLetterLabel = "Experience Letter",
  subText,
  language = "english",
  version = "desktop",
}: WorkCardProps) {
  const isArabic = language === "arabic";
  const isResponsive = version === "responsive";
  const dir = isArabic ? "rtl" : "ltr";

  // DOM order stays constant (matching the English reading order); each card
  // sets its own `dir` so the browser mirrors it natively for Arabic instead of
  // us hand-reordering elements per language.
  const experienceLetterLink = recommendation && (
    <a
      href={experienceLetterHref}
      className="inline-flex shrink-0 items-center gap-[6px] py-1 font-barlow text-[14px] text-[#0d0d0d] transition-colors duration-150 hover:text-[#d42b2b]"
    >
      <span>{experienceLetterLabel}</span>
      <IconNewWindow size={14} language={language} />
    </a>
  );

  const titleRow = (
    <div className="flex w-full items-center gap-2">
      <span className="min-w-0 flex-1 font-barlow text-[24px] font-black text-[#0d0d0d]">{title}</span>
      {experienceLetterLink}
    </div>
  );

  const detailsRow = freelance && (
    <div className="flex w-full flex-wrap items-center gap-1 whitespace-nowrap font-barlow text-[14px] font-light text-[#6f6f6f]">
      <span>{companyName}</span>
      <span>·</span>
      <span>{employmentType}</span>
      <span>·</span>
      <span>{location}</span>
    </div>
  );

  const subTextEl = subText && (
    <p className="w-full font-barlow text-[18px] font-light text-[#666]">{subText}</p>
  );

  const yearInline = (
    <div className="flex shrink-0 items-center gap-1 whitespace-nowrap font-barlow text-[12px] text-[#d42b2b]">
      <span>{from}</span>
      <span>{to}</span>
    </div>
  );

  const yearStacked = (
    <div className="flex w-[71px] shrink-0 flex-col items-start gap-1 whitespace-nowrap font-barlow text-[12px] text-[#d42b2b]">
      <span>{from}</span>
      <span>{to}</span>
    </div>
  );

  const content = (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
      {titleRow}
      {detailsRow}
      {subTextEl}
    </div>
  );

  if (isResponsive) {
    return (
      <div
        dir={dir}
        className={cn(
          "flex w-full flex-col items-start gap-0 border-b-[0.8px] border-[#e0e0e0] pb-[16.8px] pt-4",
          className,
        )}
      >
        {yearInline}
        <div className="mt-2 w-full">{content}</div>
      </div>
    );
  }

  return (
    <div
      dir={dir}
      className={cn(
        "flex w-[548px] items-start gap-6 border-b-[0.8px] border-[#e0e0e0] pb-[32.8px] pt-8",
        className,
      )}
    >
      {yearStacked}
      {content}
    </div>
  );
}
