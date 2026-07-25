import { useEffect, useState } from "react";
import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { EDUCATION } from "../data/education";
import { getSectionNumber } from "../data/navigation";
import { getTotalPages, paginate } from "../utils/pagination";
import SectionTitle from "../components/ui/SectionTitle";
import EducationCard from "../components/cards/EducationCard";
import Pagination from "../components/ui/Pagination";

export interface EducationSectionProps {
  language: Language;
}

const ITEMS_PER_PAGE = 4;

/** Degree + course/certification cards, with pagination once there are more than 4. Edit copy in src/i18n, entries in src/data/education.ts. */
export default function EducationSection({ language }: EducationSectionProps) {
  const t = getTranslations(language).education;
  const content = EDUCATION[language];
  // Numbers (00, 01, 02...) are derived from position in the full list before
  // pagination, so they stay stable across pages.
  const numberedSubEntries = content.subEntries.map((entry, i) => ({
    ...entry,
    number: String(i).padStart(2, "0"),
  }));

  const [page, setPage] = useState(1);
  const totalPages = getTotalPages(numberedSubEntries.length, ITEMS_PER_PAGE);
  const pageEntries = paginate(numberedSubEntries, page, ITEMS_PER_PAGE);

  // Clamp back to the last valid page if the item count ever shrinks
  // (e.g. fewer entries in the data file) while on a later page.
  useEffect(() => {
    setPage((prev) => Math.max(1, Math.min(prev, totalPages)));
  }, [totalPages]);

  return (
    <section id="education" className="flex flex-col gap-8 bg-[#0d0d0d] px-5 py-14 lg:gap-12 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-end">
        <SectionTitle number={getSectionNumber("education")} title={t.title} className="lg:min-w-[500px] lg:flex-1" />
        <div className="hidden lg:block">
          <EducationCard type="main" version="desktop" language={language} {...content.main} />
        </div>
        <div className="lg:hidden">
          <EducationCard type="main" version="responsive" language={language} {...content.main} />
        </div>
      </div>
      <div className="hidden flex-wrap gap-6 lg:flex">
        {pageEntries.map((entry) => (
          <EducationCard key={entry.number} type="sub" version="desktop" language={language} {...entry} />
        ))}
      </div>
      <div className="flex flex-col lg:hidden">
        {pageEntries.map((entry) => (
          <EducationCard key={entry.number} type="sub" version="responsive" language={language} {...entry} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} language={language} />
    </section>
  );
}
