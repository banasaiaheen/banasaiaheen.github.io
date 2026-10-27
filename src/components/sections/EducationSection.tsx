import { useTranslations } from "../../i18n/useLanguage";
import { CERTIFICATES } from "../../data/certificates";
import { getSectionNumber } from "../../data/navigation";
import CertificatesCards from "../cards/CertificatesCards";
import EducationCard from "../cards/EducationCard";
import SectionTitle from "./SectionTitle";

/**
 * Figma: sections / section-name=education. The degree card beside the title,
 * and the paged certificates below. Edit the degree in src/i18n (education.*)
 * and the certificates in src/data/certificates.ts.
 */
export default function EducationSection() {
  const t = useTranslations();
  const { degree } = t.education;

  return (
    <section
      id="education"
      className="flex flex-col gap-6 bg-brand-ink px-4 py-8 lg:min-h-[970px] lg:justify-center lg:gap-[46px] lg:px-8 lg:py-0"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-center">
        <SectionTitle number={getSectionNumber("education")} title={t.education.title} className="lg:flex-[1_1_548px]" />
        <EducationCard type="main" year={degree.year} name={degree.degree} source={degree.uni} className="lg:flex-[1_1_548px]" />
      </div>
      <CertificatesCards certificates={CERTIFICATES} indicatorLabel={t.education.certificatesLabel} pageLabel={t.education.pageLabel} />
    </section>
  );
}
