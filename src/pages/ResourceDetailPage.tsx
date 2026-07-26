import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { CASE_STUDIES } from "../data/caseStudies";
import { RESOURCES } from "../data/resources";
import { SITE_PROFILE, LOCATION_FLAG_IMAGE, COPYRIGHT_YEAR } from "../data/siteProfile";
import { getNavPages, getNavSocialLinks } from "../lib/navChrome";
import Navigation from "../components/layout/Navigation";
import Button from "../components/ui/Button";
import IconArrow from "../components/ui/IconArrow";
import StrokeNumber from "../components/ui/StrokeNumber";

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
 * Uses the same site-wide <Navigation> as the homepage, but with no page
 * marked as active — this is a sub-page, not one of the anchor sections, so
 * nothing in the nav should read as "selected" (matches the Figma spec).
 */
export default function ResourceDetailPage({ language, onLanguageChange }: ResourceDetailPageProps) {
  const { slug = "" } = useParams();
  const isArabic = language === "arabic";
  const t = getTranslations(language);
  const profile = SITE_PROFILE[language];
  const pages = getNavPages(language, "");
  const socialLinks = getNavSocialLinks(language);
  const caseStudy = CASE_STUDIES[language][slug];
  // The ghost numeral reuses this resource's own position in the Resources
  // grid (e.g. "00" for the first card), matching the number on its card.
  const resourceIndex = RESOURCES[language].findIndex((r) => r.slug === slug);
  const resourceNumber = String(Math.max(resourceIndex, 0)).padStart(2, "0");

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

  const backLink = (
    <Link
      to="/#resources"
      className="flex w-fit items-center gap-2 font-barlow text-[14px] text-[#f7f4f0] transition-colors duration-150 hover:text-[#d42b2b]"
    >
      {/* IconArrow points "forward" (right in LTR); mirror it in English to point
          back, and leave it unmirrored in Arabic so it points right — "back"
          toward the start of RTL reading direction. */}
      <IconArrow size={14} className={isArabic ? "" : "-scale-x-100"} />
      {t.nav.resources}
    </Link>
  );

  if (!caseStudy) {
    return (
      <div dir={isArabic ? "rtl" : "ltr"} className="flex min-h-screen flex-col bg-[#0d0d0d] lg:flex-row">
        {navBars}
        <main className="flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center lg:min-w-[1184px]">
          {backLink}
          <h1 className="font-barlow text-[32px] font-black text-[#f7f4f0]">{t.caseStudy.notFoundTitle}</h1>
          <p className="max-w-[420px] font-barlow text-[16px] font-normal text-[#9e9e9e]">
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
        <header className="relative flex flex-col gap-5 overflow-hidden bg-[#1c1c1c] px-5 py-8 lg:px-8">
          <StrokeNumber
            value={resourceNumber}
            size={90}
            strokeColor="#3a3a3a"
            strokeWidth={2}
            className={`pointer-events-none absolute top-4 lg:top-6 ${isArabic ? "left-4 lg:left-8" : "right-4 lg:right-8"}`}
          />
          {backLink}
          <div className="flex flex-wrap items-center gap-x-[6px] gap-y-1 font-barlow text-[14px] text-[#d42b2b]">
            <span>{caseStudy.tools}</span>
            <span>·</span>
            <span>{caseStudy.category}</span>
            <span>·</span>
            <span>{caseStudy.role}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="font-barlow text-[36px] font-black uppercase leading-[1.05] tracking-[1.68px] text-[#f7f4f0] lg:text-[56px]">
              {caseStudy.title}
            </h1>
            <a
              href={caseStudy.figmaHref}
              className="font-barlow text-[14px] text-[#f7f4f0] transition-colors duration-150 hover:text-[#d42b2b]"
            >
              {t.caseStudy.figmaLinkLabel}
            </a>
          </div>
          <p className="font-barlow text-[16px] font-normal text-[#9e9e9e] lg:text-[20px]">{caseStudy.summary}</p>
        </header>

        <div className="flex flex-col gap-12 px-5 py-10 lg:gap-[62px] lg:px-8 lg:py-8">
          <section className="flex flex-col gap-6">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[32px]">
              {t.caseStudy.overviewTitle}
            </h2>
            <div className="flex flex-col gap-4 font-barlow text-[16px] font-normal text-[#9e9e9e] lg:text-[20px]">
              {caseStudy.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[32px]">
              {t.caseStudy.highlightsTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {caseStudy.highlights.map((item, i) => (
                <div key={item.title} className="flex flex-col gap-4 border-b border-[#2a2a2a] pb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-barlow text-[16px] text-[#e53737]">{String(i).padStart(2, "0")}</span>
                    <span className="font-barlow text-[20px] font-bold text-[#f7f4f0]">{item.title}</span>
                  </div>
                  <p className="ps-[30px] font-barlow text-[16px] font-normal text-[#9e9e9e] lg:text-[20px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[32px]">
              {t.caseStudy.galleryTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {caseStudy.gallery.map((item) => (
                <div key={item.caption} className="flex flex-col gap-2">
                  <div className="flex aspect-[2/1] w-full items-center justify-center border border-[#2a2a2a] bg-[#1c1c1c]">
                    <span className="font-barlow text-[13px] text-[#3a3a3a]">{isArabic ? "معاينة" : "PREVIEW"}</span>
                  </div>
                  <p className="font-barlow text-[13px] font-normal text-[#7a7a7a]">{item.caption}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className="font-barlow text-[22px] font-black uppercase text-[#f7f4f0] lg:text-[32px]">
              {t.caseStudy.outcomeTitle}
            </h2>
            <div className="flex flex-col gap-4 font-barlow text-[16px] font-normal text-[#9e9e9e] lg:text-[20px]">
              {caseStudy.outcome.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 z-10 flex flex-wrap items-center justify-center gap-5 bg-[#f7f4f0] px-5 py-3 lg:px-8">
          <h2 className="font-barlow text-[22px] font-black text-[#1e1e1e] lg:text-[32px]">{t.caseStudy.ctaTitle}</h2>
          <Button variant="primary" cta={t.caseStudy.ctaButton} language={language} href="/#contact" />
        </div>
      </main>
    </div>
  );
}
