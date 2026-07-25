export type IconLanguage = "english" | "arabic";

type IconNewWindowProps = {
  size?: number;
  language?: IconLanguage;
  className?: string;
};

export default function IconNewWindow({ size = 24, language = "english", className }: IconNewWindowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${language === "arabic" ? "-scale-x-100" : ""} ${className ?? ""}`}
    >
      <path
        d="M11 11V1H1M11 1L1 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
