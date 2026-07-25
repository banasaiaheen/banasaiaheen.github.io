import type { Language } from "../types/language";
import { getTranslations } from "../i18n/translations";
import { SITE_EMAIL } from "../data/siteProfile";
import { getSectionNumber } from "../data/navigation";
import Button from "../components/ui/Button";
import StrokeNumber from "../components/ui/StrokeNumber";
import ContactForm from "../components/forms/ContactForm";

export interface ContactSectionProps {
  language: Language;
}

/** Contact CTA + message form. Edit copy in src/i18n, email in src/data/siteProfile.ts. */
export default function ContactSection({ language }: ContactSectionProps) {
  const isArabic = language === "arabic";
  const t = getTranslations(language).contact;
  const sectionNumber = getSectionNumber("contact");

  return (
    <section id="contact" className="flex flex-col items-stretch bg-[#0d0d0d] lg:flex-row lg:flex-wrap">
      <div
        className={`relative isolate flex w-full flex-col items-start justify-center gap-6 overflow-hidden border-b-[0.8px] border-[#2a2a2a] bg-[#1c1c1c] px-5 py-12 lg:min-h-[720px] lg:min-w-[580px] lg:flex-1 lg:border-b-0 lg:py-16 ${
          isArabic ? "lg:border-l-[0.8px] lg:pr-8 lg:pl-[12.8px]" : "lg:border-r-[0.8px] lg:pl-8 lg:pr-[12.8px]"
        }`}
      >
        <div
          className={`flex w-full flex-col gap-[2px] font-barlow text-[44px] font-black uppercase lg:text-[88px] ${
            isArabic ? "leading-[1.3]" : "leading-[0.92] tracking-[1.76px]"
          }`}
        >
          <div className="text-[#f7f4f0]">
            <p className="m-0">{t.line1}</p>
            <p className="m-0">{t.line2}</p>
          </div>
          <p className="m-0 text-[#d42b2b]">{t.line3}</p>
          <p className="m-0 text-[#f7f4f0]">{t.line4}</p>
        </div>
        <div
          className={`w-full border-[#2a2a2a] font-barlow text-[14px] font-light text-[#848484] ${
            isArabic ? "border-r-2 pr-5" : "border-l-2 pl-5"
          }`}
        >
          <p className="m-0">{t.subtext1}</p>
          <p className="m-0">{t.subtext2}</p>
        </div>
        <div className="relative isolate flex w-full flex-col gap-2">
          <p className="font-barlow text-[12px] text-[#848484]">{t.directEmailLabel}</p>
          <Button
            variant="link-xl"
            cta={SITE_EMAIL.toUpperCase()}
            language={language}
            trailingIcon
            href={`mailto:${SITE_EMAIL}`}
          />
          <StrokeNumber
            value={sectionNumber}
            size={89}
            strokeColor="hsla(0, 0%, 28%, 1)"
            strokeWidth={2}
            className={`pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2 lg:hidden ${
              isArabic ? "left-0" : "right-0"
            }`}
          />
        </div>
        <StrokeNumber
          value={sectionNumber}
          size={96}
          strokeColor="hsla(0, 0%, 28%, 1)"
          strokeWidth={2}
          className={`pointer-events-none absolute bottom-10 -z-10 hidden lg:block ${isArabic ? "left-6" : "right-6"}`}
        />
      </div>
      <div
        className={`flex w-full flex-1 flex-col items-start justify-center gap-5 px-5 py-12 lg:min-w-[604px] ${
          isArabic ? "lg:pr-6 lg:pl-8" : "lg:pl-6 lg:pr-8"
        }`}
      >
        <div>
          <h3 className="font-barlow text-[26px] font-black text-[#f7f4f0] lg:text-[32px]">{t.formTitle}</h3>
          <p className="font-barlow text-[15px] text-[#7a7a7a] lg:text-[16px]">{t.formSubtext}</p>
        </div>
        <ContactForm language={language} />
      </div>
    </section>
  );
}
