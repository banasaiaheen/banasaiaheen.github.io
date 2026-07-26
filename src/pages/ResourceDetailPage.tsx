import { useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { CASE_STUDIES } from "../data/caseStudies";
import { SITE_PROFILE, LOCATION_FLAG_IMAGE, COPYRIGHT_YEAR } from "../data/siteProfile";
import { getNavPages, getNavSocialLinks } from "../lib/navChrome";
import Navigation from "../components/layout/Navigation";
import Breadcrumb from "../components/layout/Breadcrumb";
import Button from "../components/ui/Button";

export interface ResourceDetailPageProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

/**
 * A resource/project case study page (e.g. /resources/portfolio-design).
 * Content comes from src/data/caseStudies.ts, page chrome from the
 * `caseStudy` namespace in src/i18n/translations. Add a new sub-page by
 * adding entries to both — see the comment at the top of caseStudies.ts.
 *
 * Uses the same site-wide <Navigation> as the homepage (kept identical on
 * purpose, rather than a separate nav pattern) with "Resources" shown as the
 * active item, plus a Home / Resources / [title] breadcrumb above the title.
 */
export default function ResourceDetailPage({ language, onLanguageChange }: ResourceDetailPageProps) {
  const { slug = "" } = useParams();
  const isArabic = language === "arabic";
  const t = getTranslations(language);
  const profile = SITE_PROFILE[language];
  const pages = getNavPages(language, "resources");
  const socialLinks = getNavSocialLinks(language);
  const caseStudy = CASE_STUDIES[language][slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const navBars = (
    <>
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
        onLanguageChange={onLanguageChange}
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
        onLanguageChange={onLanguageChange}
        className="hidden lg:flex"
      />
    </>
  );

  if (!caseStudy) {
    return (
      <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen flex-col bg-[#0d0d0d] lg:flex-row">
        {navBars}
        <main className="flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center lg:min-w-[1184px]">
          <Breadcrumb
            language={language}
            items={[
              { label: t.nav.home, href: "/" },
              { label: t.nav.resources, href: "/#resources" },
              { label: t.caseStudy.notFoundTitle },
            ]}
          />
          <h1 className="font-barlow text-[32px] font-black text-[#f7f4f0]">{t.caseStudy.notFoundTitle}</h1>
          <p className="max-w-[420px] font-barlow text-[16px] font-light text-[#9e9e9e]">
            {t.caseStudy.notFoundMessage}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen flex-col bg-[#0d0d0d] lg:flex-row">
      {navBars}

      <main className="flex w-full min-w-0 flex-1 flex-col lg:min-w-[1184px]">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-16 px-5 py-14 lg:px-8 lg:py-24">
          <header className="flex flex-col gap-5">
            <Breadcrumb
              language={language}
              items={[
                { label: t.nav.home, href: "/" },
                { label: t.nav.resources, href: "/#resources" },
                { label: caseStudy.title },
              ]}
            />
            <p className="font-barlow text-[12px] tracking-[3px] text-[#d42b2b] lg:text-[13px] lg:tracking-[4px]">
              {caseStudy.category.toUpperCase()}
            </p>
            <h1 className="font-barlow text-[36px] font-black uppercase leading-[1.05] text-[#f7f4f0] lg:text-[56px]">
              {caseStudy.title}
            </h1>
            <p className="max-w-[560px] font-barlow text-[16px] font-light text-[#9e9e9e] lg:text-[20px]">
              {caseStudy.summary}
            </p>
            <div className="flex flex-wrap gap-x-10 gap-y-4 border-t-[0.8px] border-[#2a2a2a] pt-6">
              <div className="flex flex-col gap-1">
                <p className="font-barlow text-[12px] text-[#7a7a7a]">{t.caseStudy.roleLabel}</p>
                <p className="font-barlow text-[14px] text-[#f7f4f0]">{caseStudy.role}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-barlow text-[12px] text-[#7a7a7a]">{t.caseStudy.toolsLabel}</p>
                <p className="font-barlow text-[14px] text-[#f7f4f0]">{caseStudy.tools}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-barlow text-[12px] text-[#7a7a7a]">{t.caseStudy.yearLabel}</p>
                <p className="font-barlow text-[14px] text-[#f7f4f0]">{caseStudy.year}</p>
              </div>
            </div>
          </header>

          <section className="flex flex-col gap-4">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[28px]">
              {t.caseStudy.overviewTitle}
            </h2>
            <div className="flex flex-col gap-4 font-barlow text-[16px] font-light text-[#9e9e9e] lg:text-[18px]">
              {caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[28px]">
              {t.caseStudy.highlightsTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {caseStudy.highlights.map((item, i) => (
                <div key={item.title} className="flex gap-4 border-t-[0.8px] border-[#2a2a2a] pt-6 first:border-t-0 first:pt-0">
                  <span className="font-barlow text-[14px] text-[#d42b2b]">{String(i).padStart(2, "0")}</span>
                  <div className="flex flex-col gap-1">
                    <p className="font-barlow text-[16px] font-bold text-[#f7f4f0]">{item.title}</p>
                    <p className="font-barlow text-[14px] font-light text-[#9e9e9e] lg:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[28px]">
              {t.caseStudy.galleryTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {caseStudy.gallery.map((item) => (
                <div key={item.caption} className="flex flex-col gap-2">
                  <div className="flex aspect-[4/3] w-full items-center justify-center border border-[#2a2a2a] bg-[#1c1c1c]">
                    <span className="font-barlow text-[13px] text-[#3a3a3a]">{isArabic ? "معاينة" : "PREVIEW"}</span>
                  </div>
                  <p className="font-barlow text-[13px] font-light text-[#7a7a7a]">{item.caption}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[28px]">
              {t.caseStudy.outcomeTitle}
            </h2>
            <div className="flex flex-col gap-4 font-barlow text-[16px] font-light text-[#9e9e9e] lg:text-[18px]">
              {caseStudy.outcome.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="flex flex-col items-start gap-5 border-t-[0.8px] border-[#2a2a2a] pt-12">
            <h2 className="font-barlow text-[26px] font-black text-[#f7f4f0] lg:text-[32px]">
              {t.caseStudy.ctaTitle}
            </h2>
            <Button variant="primary" cta={t.caseStudy.ctaButton} language={language} href="/#contact" />
          </section>
        </div>
      </main>
    </div>
  );
}
