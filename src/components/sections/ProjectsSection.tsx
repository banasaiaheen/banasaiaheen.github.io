import { useLanguage, useTranslations } from "../../i18n/useLanguage";
import { PROJECTS } from "../../data/projects";
import { getSectionNumber } from "../../data/navigation";
import ProjectCard from "../cards/ProjectCard";
import SectionTitle from "./SectionTitle";

/**
 * Figma: sections / section-name=projects. The projects grid; each card links
 * to its child page. Edit the intro in src/i18n (projects.*) and the cards in
 * src/data/projects.ts.
 */
export default function ProjectsSection() {
  const { language } = useLanguage();
  const t = useTranslations();
  const projects = PROJECTS[language];

  return (
    <section
      id="projects"
      className="flex flex-col gap-6 bg-brand-cream px-4 py-8 lg:min-h-[970px] lg:justify-center lg:gap-[46px] lg:px-8 lg:py-0"
    >
      <div className="flex flex-col gap-4 lg:gap-[46px]">
        <SectionTitle number={getSectionNumber("projects")} title={t.projects.title} tone="light" />
        <p className="text-regular-18 text-neutral-37 lg:w-[450px]">{t.projects.subText}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            number={String(i).padStart(2, "0")}
            title={project.title}
            software={project.software}
            type={project.type}
            subText={project.subText}
            state={project.disabled ? "disabled" : "default"}
            badge={t.projects.badge}
            href={project.slug ? `/projects/${project.slug}` : "#projects"}
            className="lg:self-start"
          />
        ))}
      </div>
    </section>
  );
}
