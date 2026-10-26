import { useTranslations } from "../../i18n/useLanguage";
import Button from "../button/Button";
import HeroLayout from "./HeroLayout";

/**
 * Figma: sections / section-name=home. The landing section with the name,
 * sub-text, "Contact Me" button and tagline. Edit the copy in src/i18n
 * (home.*, nav.name).
 */
export default function HomeSection() {
  const t = useTranslations();

  return (
    <HeroLayout
      id="home"
      label={t.home.portfolio}
      title={t.nav.name}
      subText={t.home.subText}
      action={
        <Button
          type="primary"
          cta={t.home.contactMe}
          href="#contact"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      }
      redLabel={t.home.year}
      tagline={t.home.tagline}
      ghostMain="UX/UI"
      ghostCorner="00"
    />
  );
}
