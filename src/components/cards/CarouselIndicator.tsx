import { cn } from "../../utils/cn";

/**
 * Figma: carousel-indicator (265:612). Three-square pager for a carousel,
 * used under the certificates; the red square marks the current page. Keep
 * `count` equal to the number of pages.
 *
 *  active     current page, 1-based
 *  onSelect   called with the page number when a square is clicked
 *  label      accessible name of the pager; pageLabel names each square
 *
 * Figma keeps the squares left-to-right in Arabic too, so the row is forced to ltr.
 */
export interface CarouselIndicatorProps {
  count?: number;
  active: number;
  onSelect?: (page: number) => void;
  label?: string;
  pageLabel?: (page: number) => string;
  className?: string;
}

export default function CarouselIndicator({
  count = 3,
  active,
  onSelect,
  label = "Pages",
  pageLabel = (page) => `Page ${page}`,
  className,
}: CarouselIndicatorProps) {
  return (
    <div dir="ltr" role="group" aria-label={label} className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: count }, (_, i) => {
        const page = i + 1;
        const isActive = page === active;
        return (
          <button
            key={page}
            type="button"
            aria-label={pageLabel(page)}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect?.(page)}
            className={cn(
              "size-3 cursor-pointer border transition-colors duration-150",
              isActive
                ? "border-brand-red-bright bg-brand-red-bright"
                : "border-neutral-37 bg-transparent hover:border-neutral-68",
            )}
          />
        );
      })}
    </div>
  );
}
