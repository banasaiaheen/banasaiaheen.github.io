import type { Language } from "../../types/language";

export interface SkillToolCardProps {
  className?: string;
  language?: Language;
  number?: string;
  skillTool?: string;
}

/** Presentational only — content comes from src/data/skills.ts. */
export default function SkillToolCard({
  className,
  language = "english",
  number = "00",
  skillTool = "PROTOTYPING",
}: SkillToolCardProps) {
  const isArabic = language === "arabic";

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={["flex w-[262px] flex-col items-start gap-2 py-3", className ?? ""].join(" ")}
    >
      <span className="w-full font-barlow text-[12px] text-[#e53737]">{number}</span>
      <span className="w-full whitespace-nowrap font-barlow text-[16px] font-bold text-[#f7f4f0]">{skillTool}</span>
    </div>
  );
}
