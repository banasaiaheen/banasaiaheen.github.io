import { useTranslations } from "../../i18n/useLanguage";
import Button from "../button/Button";
import HeroLayout from "./HeroLayout";

/**
 * Figma: sections / section-name=not-found. The 404 page, with a button back
 * to the home page. Edit the copy in src/i18n (notFound.*).
 */
export default function NotFoundSection() {
  const t = useTranslations();

  return (
    <HeroLayout
      label={t.notFound.label}
      title={t.notFound.title}
      subText={t.notFound.subText}
      action={<Button type="primary" cta={t.notFound.backHome} href="/" className="w-full" />}
      redLabel="404"
      tagline={t.notFound.tagline}
      ghostMain="404"
    />
  );
}
