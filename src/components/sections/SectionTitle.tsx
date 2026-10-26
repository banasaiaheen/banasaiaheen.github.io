import { cn } from "../../utils/cn";

export type SectionTitleTone = "dark" | "light";

/**
 * The "01  ABOUT ME." heading at the top of a section: an outlined number and
 * the section title. Part of the section components, not a Figma component of
 * its own.
 *
 *  number   zero-padded section number (derive it with getSectionNumber)
 *  tone     dark = on the ink background (cream title) ·
 *           light = on the cream background (ink title)
 */
export interface SectionTitleProps {
  number: string;
  title: string;
  tone?: SectionTitleTone;
  className?: string;
}

export default function SectionTitle({ number, title, tone = "dark", className }: SectionTitleProps) {
  const isDark = tone === "dark";
  return (
    <div className={cn("flex w-full items-end gap-4 lg:gap-6", className)}>
      <span
        aria-hidden="true"
        dir="ltr"
        className={cn(
          "shrink-0 whitespace-nowrap text-numbers-100 text-transparent lg:text-numbers-144",
          isDark ? "[-webkit-text-stroke:1.5px_var(--color-neutral-48)]" : "[-webkit-text-stroke:1.5px_var(--color-neutral-80)]",
        )}
      >
        {number}
      </span>
      <h2 className={cn("text-black-32 leading-none lg:text-black-56", isDark ? "text-brand-cream" : "text-brand-ink")}>
        {title}
      </h2>
    </div>
  );
}
