import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

/**
 * Figma: work-card (43:2894). One experience entry on the cream Work
 * Experience panel.
 *
 *  from / to           start and end year (or the translated "Present")
 *  title / subText     role and a short description
 *  companyName / employmentType / location
 *                      the details row under the title
 *  showWorkDetails     shows that details row. Turn it off for entries without
 *                      those details, such as freelance work.
 *  direction           ltr | rtl (defaults to the page direction)
 *
 * Desktop stacks the years in a column beside the content; the responsive
 * layout (below `lg`) puts them in one line above it.
 */
export interface WorkCardProps {
  from: string;
  to: string;
  title: string;
  subText: string;
  companyName?: string;
  employmentType?: string;
  location?: string;
  showWorkDetails?: boolean;
  direction?: Direction;
  className?: string;
}

export default function WorkCard({
  from,
  to,
  title,
  subText,
  companyName,
  employmentType,
  location,
  showWorkDetails = true,
  direction,
  className,
}: WorkCardProps) {
  const dir = useDirection(direction);
  const details = [companyName, employmentType, location].filter(Boolean);

  return (
    <article
      dir={dir}
      className={cn(
        "flex w-full flex-col items-start border-b-[0.8px] border-neutral-87 pb-[16.8px] pt-4 text-start",
        "lg:flex-row lg:gap-6 lg:pb-[32.8px] lg:pt-8",
        className,
      )}
    >
      {/* years: one line on responsive, a column (from / — / to) on desktop */}
      <div className="flex shrink-0 items-center gap-[2px] whitespace-nowrap text-regular-12 text-brand-red lg:w-[71px] lg:flex-col lg:items-start lg:gap-0">
        <span>{from}</span>
        <span className="text-center lg:w-5">—</span>
        <span>{to}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2 lg:gap-3">
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-black-24 text-brand-ink">{title}</h3>
          {showWorkDetails && details.length > 0 && (
            <p className="flex flex-wrap gap-1 text-regular-14 text-neutral-37">
              {details.map((detail, i) => (
                <span key={detail} className="flex gap-1">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span>{detail}</span>
                </span>
              ))}
            </p>
          )}
        </div>
        <p className="w-full text-regular-18 text-neutral-37">{subText}</p>
      </div>
    </article>
  );
}
