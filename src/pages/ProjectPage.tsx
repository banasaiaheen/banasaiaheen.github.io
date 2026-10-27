import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLanguage, useTranslations } from "../i18n/useLanguage";
import { PROJECTS } from "../data/projects";
import { PROJECT_PAGES } from "../data/projectPages";
import PageLayout from "../components/navigation/PageLayout";
import ChildPageHeader from "../components/child-page/ChildPageHeader";
import ChildPageSections from "../components/child-page/ChildPageSections";
import ContactSection from "../components/sections/ContactSection";
import NotFoundSection from "../components/sections/NotFoundSection";

/**
 * A project's own page (/projects/:slug): the child-page header, the content
 * sections, then the Contact section. The content comes from
 * src/data/projectPages.ts; unknown slugs show the 404 page. No nav page is
 * selected here, as in the Figma design.
 */
export default function ProjectPage() {
  const { slug = "" } = useParams();
  const { language } = useLanguage();
  const t = useTranslations();
  const page = PROJECT_PAGES[language][slug];
  // The header's outlined number reuses the project's position in the Projects
  // grid, matching the number on its card.
  const projectIndex = PROJECTS[language].findIndex((project) => project.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <PageLayout>
        <NotFoundSection />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* The header pins only within this wrapper, so it scrolls away before the Contact section. */}
      <div>
        <ChildPageHeader
          number={String(Math.max(projectIndex, 0)).padStart(2, "0")}
          title={page.title}
          software={page.software}
          type={page.type}
          description={page.description}
          figmaHref={page.figmaHref}
          figmaLabel={t.childPage.figmaLink}
          backLabel={t.nav.tabs.projects}
        />
        <ChildPageSections sections={page.sections} />
      </div>
      <ContactSection />
    </PageLayout>
  );
}
