import { useLanguage, useTranslations } from "../../i18n/useLanguage";
import { WORK_EXPERIENCE } from "../../data/workExperience";
import { getSectionNumber } from "../../data/navigation";
import WorkCard from "../cards/WorkCard";
import GhostNumber from "./GhostNumber";

/**
 * Figma: sections / section-name=work-experience. A red title panel beside the
 * list of work cards. Edit the title in src/i18n (experience.*) and the jobs in
 * src/data/workExperience.ts.
 */
export default function WorkExperienceSection() {
  const { language } = useLanguage();
  const t = useTranslations();
  const entries = WORK_EXPERIENCE[language];

  return (
    <section id="experience" className="flex w-full flex-col bg-brand-cream lg:min-h-[970px] lg:flex-row">
      <div className="relative flex min-h-[172px] flex-col justify-center overflow-hidden bg-brand-red px-4 py-14 text-brand-cream lg:flex-[580_1_0%] lg:justify-end lg:p-10">
        <h2 className="relative flex flex-col text-black-32 lg:text-black-56">
          <span>{t.experience.title[0]}</span>
          {/* Whitespace between the lines (ignored by the layout) keeps the heading readable as "WORK EXPERIENCE." as plain text. */}
          {" "}
          <span>{t.experience.title[1]}</span>
        </h2>
        <GhostNumber
          value={getSectionNumber("experience")}
          className="end-0 top-1/2 -translate-y-1/2 translate-x-[5%] text-[150px] rtl:-translate-x-[5%] lg:bottom-[135px] lg:end-auto lg:start-[-29px] lg:top-auto lg:translate-x-0 lg:translate-y-1/2 lg:text-[224px] lg:rtl:translate-x-0"
        />
      </div>

      <div className="flex flex-col justify-center px-4 lg:flex-[604_1_0%] lg:ps-6 lg:pe-8">
        {entries.map((entry) => (
          <WorkCard
            key={`${entry.from}-${entry.title}`}
            from={entry.from}
            to={entry.to}
            title={entry.title}
            subText={entry.subText}
            companyName={entry.companyName}
            employmentType={entry.employmentType}
            location={entry.location}
            showWorkDetails={Boolean(entry.companyName)}
          />
        ))}
      </div>
    </section>
  );
}
