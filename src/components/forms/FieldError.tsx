import type { Language } from "../../types/language";

export interface FieldErrorProps {
  language?: Language;
  children: string;
}

export default function FieldError({ language = "english", children }: FieldErrorProps) {
  return (
    <p className={`pt-1 font-barlow text-[12px] text-[#e53737] ${language === "arabic" ? "text-right" : "text-left"}`}>
      {children}
    </p>
  );
}
