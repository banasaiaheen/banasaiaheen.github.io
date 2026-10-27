import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

export type EducationCardType = "main" | "sub";

/**
 * Figma: education-card (19:253). Degrees and certificates.
 *
 *  type       main = the degree card on a panel (years, degree, university) ·
 *             sub = a certificate with a bottom rule (year, name, source)
 *  year / name / source   the three lines of text — pass translated strings
 *  direction  ltr | rtl (defaults to the page direction)
 *
 * Certificates (sub) have no side padding, so their text lines up with the grid edge; the
 * degree (main) card is inset. The responsive layout (below `lg`) uses tighter padding.
 */
export interface EducationCardProps {
  type?: EducationCardType;
  year: string;
  name: string;
  source: string;
  direction?: Direction;
  className?: string;
}

export default function EducationCard({ type = "sub", year, name, source, direction, className }: EducationCardProps) {
  const dir = useDirection(direction);
  const isMain = type === "main";

  return (
    <div
      dir={dir}
      className={cn(
        "flex flex-col items-start justify-center text-start",
        isMain
          ? "gap-2 bg-brand-panel p-4 lg:px-8 lg:py-10"
          : "gap-1 border-b border-neutral-37 py-4 lg:gap-2 lg:py-6",
        className,
      )}
    >
      <span className={cn("w-full text-regular-12", isMain ? "text-brand-red-on-dark" : "text-brand-red-bright")}>
        {year}
      </span>
      <span className={cn("w-full text-bold-20", isMain ? "text-brand-white" : "text-brand-cream")}>{name}</span>
      <span className={cn("w-full", isMain ? "text-light-14 text-brand-white" : "text-regular-14 text-neutral-48")}>
        {source}
      </span>
    </div>
  );
}
