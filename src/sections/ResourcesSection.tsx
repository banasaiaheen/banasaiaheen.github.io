import { useEffect, useState } from "react";
import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { RESOURCES } from "../data/resources";
import { getSectionNumber } from "../data/navigation";
import { getTotalPages, paginate } from "../utils/pagination";
import SectionTitle from "../components/ui/SectionTitle";
import ResourcesCard from "../components/cards/ResourcesCard";
import Pagination from "../components/ui/Pagination";

export interface ResourcesSectionProps {
  language: Language;
}

const ITEMS_PER_PAGE = 4;

/** Resources/project cards, with pagination once there are more than 4. Edit copy in src/i18n, entries in src/data/resources.ts. */
export default function ResourcesSection({ language }: ResourcesSectionProps) {
  const t = getTranslations(language).resources;
  const entries = RESOURCES[language];
  // Numbers (00, 01, 02...) are derived from position in the full list before
  // pagination, so they stay stable across pages.
  const numberedEntries = entries.map((entry, i) => ({ ...entry, number: String(i).padStart(2, "0") }));

  const [page, setPage] = useState(1);
  const totalPages = getTotalPages(numberedEntries.length, ITEMS_PER_PAGE);
  const pageEntries = paginate(numberedEntries, page, ITEMS_PER_PAGE);

  // Clamp back to the last valid page if the item count ever shrinks
  // (e.g. fewer entries in the data file) while on a later page.
  useEffect(() => {
    setPage((prev) => Math.max(1, Math.min(prev, totalPages)));
  }, [totalPages]);

  return (
    <section id="resources" className="flex flex-col gap-6 bg-[#f7f4f0] px-5 py-14 lg:gap-8 lg:px-8 lg:py-24">
      <SectionTitle number={getSectionNumber("resources")} title={t.title} dark={false} />
      <p className="font-barlow text-[13px] font-light text-[#6f6f6f] lg:text-[14px]">{t.subtext}</p>
      <div className="hidden grid-cols-2 gap-6 lg:grid">
        {pageEntries.map((entry) => (
          <ResourcesCard key={entry.title} version="desktop" language={language} comingSoonLabel={t.comingSoon} {...entry} />
        ))}
      </div>
      <div className="flex flex-col lg:hidden">
        {pageEntries.map((entry) => (
          <ResourcesCard key={entry.title} version="responsive" language={language} comingSoonLabel={t.comingSoon} {...entry} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} language={language} />
    </section>
  );
}
