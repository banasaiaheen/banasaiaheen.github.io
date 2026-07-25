import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { SITE_PROFILE } from "../data/siteProfile";
import { getSectionNumber } from "../data/navigation";
import Button from "../components/ui/Button";

export interface HeroSectionProps {
  language: Language;
}

/** The red/cream landing section with name, tagline, and "Contact Me" CTA. Edit copy in src/i18n, name/title in src/data/siteProfile.ts. */
export default function HeroSection({ language }: HeroSectionProps) {
  const isArabic = language === "arabic";
  const t = getTranslations(language).hero;
  const profile = SITE_PROFILE[language];
  const sectionNumber = getSectionNumber("home");

  return (
    <section id="home" className="flex w-full flex-col items-stretch bg-[#f7f4f0] lg:min-h-[720px] lg:flex-row">
      <div
        className={`flex flex-1 flex-col items-start justify-between gap-6 border-b-[0.8px] border-[#ddd] px-5 py-10 lg:gap-10 lg:border-b-0 lg:px-9 lg:py-12 ${
          isArabic ? "lg:border-l-[0.8px]" : "lg:border-r-[0.8px]"
        }`}
      >
        <p className="font-barlow text-[11px] tracking-[3px] text-[#525252] lg:text-[12px] lg:tracking-[4px]">
          {t.portfolioLabel}
        </p>
        <div className="flex w-full flex-col items-start gap-3 lg:gap-3.5">
          <h1 className="font-barlow text-[36px] font-black uppercase leading-[1.05] tracking-wide text-[#0d0d0d] lg:text-[56px] lg:leading-[1.02]">
            {profile.name}
          </h1>
          <div
            className={`max-w-[357px] border-[#d42b2b] ${
              isArabic ? "border-r-2 pr-4 lg:pr-[18px]" : "border-l-2 pl-4 lg:pl-[18px]"
            }`}
          >
            <p className="font-barlow text-[15px] font-light text-[#525252] lg:text-[18px]">{t.subtext}</p>
          </div>
        </div>
        <Button
          variant="primary"
          cta={t.contactMe}
          language={language}
          href="#contact"
          className="w-full lg:w-[166px] lg:self-end"
        />
      </div>

      <div className="relative flex min-h-[420px] flex-1 flex-col overflow-hidden bg-[#d42b2b] px-6 py-10 lg:min-h-0 lg:px-10 lg:py-12">
        <p dir="ltr" className="font-barlow text-[11px] tracking-[3px] text-white lg:text-[12px] lg:tracking-[4px]">
          MMXXVI
        </p>
        <div className="flex flex-1 items-center justify-center py-8 lg:py-0">
          <p className="font-barlow text-[22px] font-bold text-white lg:text-[32px]">{t.tagline}</p>
        </div>
        <span
          aria-hidden="true"
          dir="ltr"
          className={`pointer-events-none absolute bottom-2 whitespace-nowrap font-barlow text-[110px] font-black leading-none text-[#f7f4f0] opacity-[0.08] lg:bottom-4 lg:text-[224px] ${
            isArabic ? "-left-4 lg:-left-10" : "-right-4 lg:-right-10"
          }`}
        >
          {sectionNumber}
        </span>
        <span
          aria-hidden="true"
          dir="ltr"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-barlow text-[110px] font-black leading-none text-[#0d0d0d] opacity-[0.08] lg:text-[224px]"
        >
          UX/UI
        </span>
      </div>
    </section>
  );
}
