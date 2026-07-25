import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { WORK_EXPERIENCE } from "../data/workExperience";
import { getSectionNumber } from "../data/navigation";
import WorkCard from "../components/cards/WorkCard";

export interface WorkSectionProps {
  language: Language;
}

/** Work experience timeline. Edit copy in src/i18n, entries in src/data/workExperience.ts. */
export default function WorkSection({ language }: WorkSectionProps) {
  const isArabic = language === "arabic";
  const t = getTranslations(language).work;
  const entries = WORK_EXPERIENCE[language];
  const sectionNumber = getSectionNumber("work");

  return (
    <section id="work" className="flex flex-col bg-[#f7f4f0] lg:flex-row lg:flex-wrap">
      <div className="relative flex min-h-[172px] w-full flex-col justify-center overflow-hidden bg-[#d42b2b] px-4 py-10 lg:min-h-[720px] lg:min-w-[400px] lg:flex-1 lg:justify-end lg:p-10">
        <span
          aria-hidden="true"
          dir="ltr"
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-barlow text-[150px] font-black leading-none text-[#f7f4f0] opacity-[0.08] lg:hidden ${
            isArabic ? "-left-4" : "-right-4"
          }`}
        >
          {sectionNumber}
        </span>
        <span
          aria-hidden="true"
          dir="ltr"
          className={`pointer-events-none absolute hidden bottom-[23px] whitespace-nowrap font-barlow text-[224px] font-black leading-none text-[#f7f4f0] opacity-[0.08] lg:block ${
            isArabic ? "right-[-29px]" : "left-[-29px]"
          }`}
        >
          {sectionNumber}
        </span>
        <h2 className="relative font-barlow text-[32px] font-black uppercase leading-[1] tracking-wide text-[#f7f4f0] lg:text-[48px]">
          {t.headingLine1}
          <br />
          {t.headingLine2}
        </h2>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center px-5 py-10 lg:px-8 lg:py-12">
        <div className="hidden w-full flex-col border-t-[0.8px] border-[#e0e0e0] lg:flex">
          {entries.map((entry) => (
            <WorkCard
              key={entry.title}
              version="desktop"
              language={language}
              experienceLetterLabel={t.experienceLetter}
              {...entry}
            />
          ))}
        </div>
        <div className="flex w-full flex-col border-t-[0.8px] border-[#e0e0e0] lg:hidden">
          {entries.map((entry) => (
            <WorkCard
              key={entry.title}
              version="responsive"
              language={language}
              experienceLetterLabel={t.experienceLetter}
              {...entry}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
