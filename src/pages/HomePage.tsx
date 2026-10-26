import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollToHash } from "../hooks/useScrollToHash";
import PageLayout from "../components/navigation/PageLayout";
import HomeSection from "../components/sections/HomeSection";
import AboutSection from "../components/sections/AboutSection";
import WorkExperienceSection from "../components/sections/WorkExperienceSection";
import EducationSection from "../components/sections/EducationSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ContactSection from "../components/sections/ContactSection";

/**
 * ============================================================================
 *  HOME PAGE — assembles the one-page site: the sections in nav order. There
 *  are no copy or content literals here.
 *
 *  To change what's on the page, edit:
 *   - Text (English/Arabic)      -> src/i18n/translations/{en,ar}.ts
 *   - Nav items / section order  -> src/data/navigation.ts
 *   - Social links               -> src/data/socialLinks.ts
 *   - Work experience            -> src/data/workExperience.ts
 *   - Certificates               -> src/data/certificates.ts
 *   - Projects                   -> src/data/projects.ts (+ projectPages.ts)
 *   - Skills                     -> src/data/skills.ts
 * ============================================================================
 */
export default function HomePage() {
  const activeSection = useActiveSection();
  useScrollToHash();

  return (
    <PageLayout activeId={activeSection}>
      <HomeSection />
      <AboutSection />
      <WorkExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </PageLayout>
  );
}
