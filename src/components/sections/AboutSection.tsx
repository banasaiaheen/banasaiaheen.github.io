import { useLanguage, useTranslations } from "../../i18n/useLanguage";
import { SKILLS } from "../../data/skills";
import { PROFILE_PHOTO } from "../../data/siteProfile";
import { getSectionNumber } from "../../data/navigation";
import SkillToolCard from "../cards/SkillToolCard";
import SectionTitle from "./SectionTitle";

/**
 * Figma: sections / section-name=about. Portrait, bio and the skills
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
          {/* portrait on a panel, with a red corner at the bottom start */}
          <div className="relative aspect-square w-[358px] max-w-full shrink-0 lg:size-[323px]">
            <div className="size-full overflow-hidden border border-neutral-16 bg-brand-panel">
              <img
                src={PROFILE_PHOTO}
                alt={t.nav.name}
                width={720}
                height={829}
                loading="lazy"
                decoding="async"
                className="size-full object-cover object-[50%_20%]"
              />
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
