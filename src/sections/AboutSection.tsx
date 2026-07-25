import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { SKILLS } from "../data/skills";
import { getSectionNumber } from "../data/navigation";
import SectionTitle from "../components/ui/SectionTitle";
import SkillToolCard from "../components/cards/SkillToolCard";

export interface AboutSectionProps {
  language: Language;
}

/** Bio + skills list. Edit copy in src/i18n, skills in src/data/skills.ts. */
export default function AboutSection({ language }: AboutSectionProps) {
  const isArabic = language === "arabic";
  const t = getTranslations(language).about;
  const skills = SKILLS[language];

  return (
    <section id="about" className="flex flex-col gap-8 bg-[#0d0d0d] px-5 py-14 lg:gap-12 lg:px-8 lg:py-24">
      <SectionTitle number={getSectionNumber("about")} title={t.title} />
      <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap">
        <div className="relative w-[140px] self-start lg:w-[262px] lg:shrink-0">
          <div className="flex aspect-square w-full items-center justify-center border border-[#2a2a2a] bg-[#1c1c1c]">
            <span className="font-barlow text-[28px] font-black tracking-[4px] text-[#2a2a2a] lg:text-[80px]">
              B
            </span>
          </div>
          <div
            className={`pointer-events-none absolute bottom-0 h-1/2 w-1/2 border-b-[1.6px] border-[#d42b2b] ${
              isArabic ? "right-0 border-r-[1.6px]" : "left-0 border-l-[1.6px]"
            }`}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-col gap-4 font-barlow text-[16px] font-light text-[#9e9e9e] lg:text-[20px]">
            {t.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6">
            {skills.map((skill, i) => (
              <SkillToolCard key={skill} language={language} number={String(i).padStart(2, "0")} skillTool={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
