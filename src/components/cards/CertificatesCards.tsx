import { useState } from "react";
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
 */
export interface CertificatesCardsProps {
  certificates: Certificate[];
  perPage?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  indicatorLabel?: string;
  direction?: Direction;
  className?: string;
}

export default function CertificatesCards({
  certificates,
  perPage = 4,
  page: pageProp,
  onPageChange,
  indicatorLabel,
  direction,
  className,
}: CertificatesCardsProps) {
  const dir = useDirection(direction);
  const [internalPage, setInternalPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(certificates.length / perPage));
  // Clamp so a shrinking list can never leave the carousel on a page that no longer exists.
  const page = Math.min(Math.max(pageProp ?? internalPage, 1), totalPages);
  const visible = certificates.slice((page - 1) * perPage, page * perPage);

  const selectPage = (next: number) => {
    setInternalPage(next);
    onPageChange?.(next);
  };

  return (
    <div dir={dir} className={cn("flex w-full flex-col items-center gap-6", className)}>
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2 lg:gap-y-6">
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
        <CarouselIndicator count={totalPages} active={page} onSelect={selectPage} label={indicatorLabel} />
      )}
    </div>
  );
}
