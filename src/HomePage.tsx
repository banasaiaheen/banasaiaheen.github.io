import { useEffect, useState } from "react";
import type { Language } from "./types/language";
import { getTranslations } from "./i18n/translations";
import { SITE_PROFILE, LOCATION_FLAG_IMAGE, COPYRIGHT_YEAR } from "./data/siteProfile";
import { NAV_ITEMS, getSectionNumber } from "./data/navigation";
import { SOCIAL_LINKS } from "./data/socialLinks";
import { useActiveSection } from "./hooks/useActiveSection";
import Navigation, { type NavigationPage, type NavigationSocialLink } from "./components/layout/Navigation";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import WorkSection from "./sections/WorkSection";
import EducationSection from "./sections/EducationSection";
import ResourcesSection from "./sections/ResourcesSection";
import ContactSection from "./sections/ContactSection";

/**
 * ============================================================================
 *  PAGE COMPOSITION ROOT — this file just wires language state + assembles
 *  the nav, then renders each section in order. There should be no copy or
 *  content literals here.
 *
 *  To change what's on the page, edit:
 *   - Text (English/Arabic)      -> src/i18n/translations/{en,ar}.ts
 *   - Nav items / section order  -> src/data/navigation.ts
 *   - Social links                -> src/data/socialLinks.ts
 *   - Name / title / location     -> src/data/siteProfile.ts
 *   - Work experience             -> src/data/workExperience.ts
 *   - Education entries           -> src/data/education.ts
 *   - Resources/projects          -> src/data/resources.ts
 *   - Skills                      -> src/data/skills.ts
 *   - Contact form dropdown       -> src/data/inquiryOptions.ts
 * ============================================================================
 */
export default function HomePage() {
  const [language, setLanguage] = useState<Language>("english");
  const isArabic = language === "arabic";
  const activeSection = useActiveSection();
  const t = getTranslations(language);
  const profile = SITE_PROFILE[language];

  const pages: NavigationPage[] = NAV_ITEMS.map((item) => ({
    number: getSectionNumber(item.id),
    nav: t.nav[item.id as keyof typeof t.nav],
    href: item.href,
    selected: item.href === `#${activeSection}`,
  }));

  const socialLinks: NavigationSocialLink[] = SOCIAL_LINKS.map((link) => ({
    cta: t.social[link.id as keyof typeof t.social],
    href: link.href,
    target: link.target,
    rel: link.rel,
  }));

  // Keeps native browser behavior (spellcheck, form validation bubbles, default
  // fonts/quotes) correctly RTL-aware in addition to our own layout classes.
  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen flex-col bg-[#0d0d0d] lg:flex-row">
      <Navigation
        language={language}
        version="responsive"
        name={profile.name}
        title={profile.title}
        location={profile.location}
        locationFlagSrc={LOCATION_FLAG_IMAGE}
        pages={pages}
        socialLinks={socialLinks}
        switchToLabel={t.nav.switchTo}
        rightsLabel={t.footer.rights}
        copyrightYear={COPYRIGHT_YEAR}
        onLanguageChange={setLanguage}
        className="flex lg:hidden"
      />
      <Navigation
        language={language}
        version="desktop"
        name={profile.name}
        title={profile.title}
        location={profile.location}
        locationFlagSrc={LOCATION_FLAG_IMAGE}
        pages={pages}
        socialLinks={socialLinks}
        switchToLabel={t.nav.switchTo}
        rightsLabel={t.footer.rights}
        copyrightYear={COPYRIGHT_YEAR}
        onLanguageChange={setLanguage}
        className="hidden lg:flex"
      />

      <main className="flex w-full min-w-0 flex-1 flex-col lg:min-w-[1184px]">
        <HeroSection language={language} />
        <AboutSection language={language} />
        <WorkSection language={language} />
        <EducationSection language={language} />
        <ResourcesSection language={language} />
        <ContactSection language={language} />
      </main>
    </div>
  );
}
