import type { Language } from "../../types/language";
import ChevronDownIcon from "./ChevronDownIcon";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  language: Language;
}

/** Prev/next chevrons (reusing the dropdown's chevron, rotated) plus 00-indexed page numbers. Hidden when there's only one page. */
export default function Pagination({ currentPage, totalPages, onPageChange, language }: PaginationProps) {
  if (totalPages <= 1) return null;
  const isArabic = language === "arabic";
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // The chevron is a "down" arrow by default; rotating it 90° clockwise points
  // left, 90° counter-clockwise points right.
  const prevRotation = isArabic ? "-rotate-90" : "rotate-90";
  const nextRotation = isArabic ? "rotate-90" : "-rotate-90";

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex items-center gap-4 font-barlow text-[16px]">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center justify-center text-[#7a7a7a] transition-colors duration-150 hover:text-[#d42b2b] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#7a7a7a]"
      >
        <ChevronDownIcon size={16} className={prevRotation} />
      </button>
      <div className="flex items-center gap-3">
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`transition-colors duration-150 ${
              page === currentPage ? "text-[#d42b2b]" : "text-[#7a7a7a] hover:text-[#d42b2b]"
            }`}
          >
            {String(page - 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center justify-center text-[#7a7a7a] transition-colors duration-150 hover:text-[#d42b2b] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-[#7a7a7a]"
      >
        <ChevronDownIcon size={16} className={nextRotation} />
      </button>
    </div>
  );
}
