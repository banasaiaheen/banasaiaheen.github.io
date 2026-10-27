import { useTranslations } from "../../i18n/useLanguage";
import { SITE_EMAIL } from "../../data/siteProfile";
import { getSectionNumber } from "../../data/navigation";
import Button from "../button/Button";
import ContactForm from "./ContactForm";
import GhostNumber from "./GhostNumber";

/**
 * Figma: sections / section-name=contact. The call to action with the direct
 * email beside the message form. It also closes every child page. Edit the copy
 * in src/i18n (contact.*) and the email in src/data/siteProfile.ts.
 */
export default function ContactSection() {
  const { contact } = useTranslations();

  return (
    <section id="contact" className="flex w-full flex-col bg-brand-ink lg:min-h-[892px] lg:flex-row">
      {/* left: headline + direct email */}
      <div className="relative flex flex-col justify-center gap-6 overflow-hidden border-neutral-16 bg-brand-panel px-4 py-12 lg:flex-[580_1_0%] lg:border-e-[0.8px] lg:ps-8 lg:pe-[12.8px] lg:py-0">
        <h2 className="flex flex-col gap-1 text-black-56 lg:text-black-88">
          <span className="text-brand-cream">{contact.title[0]}</span>
          <span className="text-brand-red">{contact.title[1]}</span>
          <span className="text-brand-cream">{contact.title[2]}</span>
        </h2>
        <p className="border-s-2 border-neutral-16 ps-5 text-regular-18 text-neutral-52">{contact.subText}</p>
        <div className="flex flex-col gap-2">
          <span className="text-regular-14 text-neutral-52">{contact.label}</span>
          <Button
            type="link-xl"
            cta={SITE_EMAIL.toUpperCase()}
            href={`mailto:${SITE_EMAIL}`}
            showTrailingIcon
            className="self-start"
          />
        </div>
        <GhostNumber
          value={getSectionNumber("contact")}
          outline
          className="bottom-8 end-[-10px] text-[100px] lg:bottom-24 lg:end-[165px] lg:translate-x-full lg:translate-y-1/2 lg:text-[144px] lg:rtl:-translate-x-full"
        />
      </div>

      {/* right: the message form */}
      <div className="flex flex-col justify-center gap-5 px-4 py-8 lg:flex-[604_1_0%] lg:ps-6 lg:pe-8 lg:py-0">
        <div className="flex flex-col gap-[2px] text-start">
          <h3 className="text-black-32 text-brand-cream">{contact.form.title}</h3>
          <p className="text-regular-16 text-neutral-48">{contact.form.subText}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
