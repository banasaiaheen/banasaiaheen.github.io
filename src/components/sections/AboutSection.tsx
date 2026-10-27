import { useLanguage, useTranslations } from "../../i18n/useLanguage";
import { SKILLS } from "../../data/skills";
import { getSectionNumber } from "../../data/navigation";
import SkillToolCard from "../cards/SkillToolCard";
import SectionTitle from "./SectionTitle";

/**
 * Figma: sections / section-name=about. Photo placeholder, bio and the skills
 * grid. Edit the bio in src/i18n (about.*) and the skills in src/data/skills.ts.
 */
export default function AboutSection() {
  const { language } = useLanguage();
  const t = useTranslations();
  const skills = SKILLS[language];

  return (
    <section
      id="about"
      className="flex flex-col gap-6 bg-brand-ink px-4 py-8 lg:min-h-[970px] lg:justify-center lg:gap-[62px] lg:px-8 lg:py-0"
    >
      <SectionTitle number={getSectionNumber("about")} title={t.about.title} className="lg:gap-4" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          {/* photo placeholder: panel with a big "B" and a red corner at the bottom start */}
          <div className="relative h-[347px] w-full shrink-0 lg:size-[323px]">
            <div className="flex size-full items-center justify-center border border-neutral-16 bg-brand-panel">
              <span className="font-[family-name:var(--font-en)] text-[80px] font-black tracking-[4px] text-neutral-16">
                B
              </span>
            </div>
            <div className="pointer-events-none absolute bottom-0 start-0 h-1/2 w-1/2 border-b-[1.6px] border-s-[1.6px] border-brand-red" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-5 text-regular-20 text-neutral-62">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph} dir="auto">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3">
          {skills.map((skill, i) => (
            <SkillToolCard key={skill} number={String(i).padStart(2, "0")} skillTool={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
