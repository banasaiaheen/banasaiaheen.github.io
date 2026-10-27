import { useRef, useState, type TouchEvent } from "react";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import CarouselIndicator from "./CarouselIndicator";
import EducationCard from "./EducationCard";

export interface Certificate {
  year: string;
  name: string;
  source: string;
}

/**
 * Figma: certificates-cards (262:1796). Paged grid of education-card
 * (type=sub) certificates with a carousel-indicator: two columns on desktop,
 * one column on responsive.
 *
 *  certificates   every certificate, in order; they are split into pages
 *  perPage        certificates per page (Figma shows 4)
 *  page           optional controlled page (1-based); leave out for a live carousel
 *  onPageChange   called when a square of the indicator is picked
 *  direction      ltr | rtl (defaults to the page direction)
 *
 * The indicator always shows `Math.ceil(certificates / perPage)` squares, so
 * adding certificates to src/data adds pages automatically.
 *
 * On touch screens the pages can also be swiped: swipe towards the start of the
 * reading direction for the next page (left in English, right in Arabic), the
 * other way to go back. Swiping past the last page wraps to the first, and back
 * from the first to the last. Vertical scrolling still works as usual.
 */

/** A swipe must travel at least this far sideways, and mostly sideways, to count. */
const SWIPE_MIN_DISTANCE = 50;
const SWIPE_DIRECTION_RATIO = 1.5;
export interface CertificatesCardsProps {
  certificates: Certificate[];
  perPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  indicatorLabel?: string;
  /** Word before the page number in each square's accessible name, e.g. "Page". */
  pageLabel?: string;
  direction?: Direction;
  className?: string;
}

export default function CertificatesCards({
  certificates,
  perPage = 4,
  page: pageProp,
  onPageChange,
  indicatorLabel,
  pageLabel = "Page",
  direction,
  className,
}: CertificatesCardsProps) {
  const dir = useDirection(direction);
  const [internalPage, setInternalPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(certificates.length / perPage));
  // Clamp so a shrinking list can never leave the carousel on a page that no longer exists.
  const page = Math.min(Math.max(pageProp ?? internalPage, 1), totalPages);
  const visible = certificates.slice((page - 1) * perPage, page * perPage);

  // Which way the page change came from, so the new page can slide in from that side.
  const [slideFrom, setSlideFrom] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  /** `forward` says which way the new page slides in from; it defaults to "later page" (a wrap-around passes it). */
  const selectPage = (next: number, forward = next > page) => {
    const target = Math.min(Math.max(next, 1), totalPages);
    if (target === page) return;
    // Going forward slides in from the end side: right in English, left in Arabic.
    setSlideFrom(forward === (dir === "ltr") ? 16 : -16);
    setInternalPage(target);
    onPageChange?.(target);
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_DISTANCE || Math.abs(dx) < Math.abs(dy) * SWIPE_DIRECTION_RATIO) return;
    // Swiping against the reading direction (left in English, right in Arabic) goes forward.
    const forward = dir === "ltr" ? dx < 0 : dx > 0;
    // Wrap around: forward from the last page goes to the first, back from the first goes to the last.
    const next = forward ? (page % totalPages) + 1 : page === 1 ? totalPages : page - 1;
    selectPage(next, forward);
  };

  return (
    <div
      dir={dir}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => (touchStart.current = null)}
      // pan-y keeps vertical page scrolling while the sideways swipe is ours.
      className={cn("flex w-full touch-pan-y flex-col items-center gap-6", className)}
    >
      <div
        key={page}
        style={{ "--slide-from": `${slideFrom}px` } as React.CSSProperties}
        className="grid w-full animate-page-in grid-cols-1 gap-x-6 gap-y-4 motion-reduce:animate-none lg:grid-cols-2 lg:gap-y-6"
      >
        {visible.map((certificate) => (
          <EducationCard
            key={`${certificate.name}-${certificate.year}`}
            type="sub"
            year={certificate.year}
            name={certificate.name}
            source={certificate.source}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <CarouselIndicator
          count={totalPages}
          active={page}
          onSelect={selectPage}
          label={indicatorLabel}
          pageLabel={(n) => `${pageLabel} ${n}`}
        />
      )}
    </div>
  );
}
