import type { Language } from "../../types/language";

type IconArrowProps = {
  size?: number;
  language?: Language;
  className?: string;
};

export default function IconArrow({ size = 24, language = "english", className }: IconArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${language === "arabic" ? "-scale-x-100" : ""} ${className ?? ""}`}
    >
      <path
        d="M1 8H15M8 15L15 8L8 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
