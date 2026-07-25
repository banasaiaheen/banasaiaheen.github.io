import IconArrow from "./IconArrow";

export type ResourcesCardLanguage = "english" | "arabic";
export type ResourcesCardVersion = "desktop" | "responsive";

export interface ResourcesCardProps {
  className?: string;
  language?: ResourcesCardLanguage;
  version?: ResourcesCardVersion;
  number?: string;
  software?: string;
  type?: string;
  title?: string;
  subText?: string;
  disabled?: boolean;
  href?: string;
}

export default function ResourcesCard({
  className,
  language = "english",
  version = "desktop",
  number = "00",
  software = "FIGMA",
  type = "Personal",
  title = "Portfolio Design",
  subText = "A behind-the-scenes look at how this portfolio was designed from concept to final product.",
  disabled = false,
  href = "#",
}: ResourcesCardProps) {
  const isArabic = language === "arabic";
  const isResponsive = version === "responsive";
  const dir = isArabic ? "rtl" : "ltr";

  const numberEl = (
    <span
      aria-hidden="true"
      dir="ltr"
      className="shrink-0 whitespace-nowrap font-barlow text-[64px] font-black leading-[64px] text-transparent [-webkit-text-stroke:1.5px_#d8d8d8]"
    >
      {number}
    </span>
  );

  const trailing = disabled ? (
    <span className="shrink-0 whitespace-nowrap rounded-full bg-[#d4612b] px-3 py-1 font-barlow text-[12px] font-bold text-[#1c1a1a]">
      {isArabic ? "قريبًا!" : "Coming Soon!"}
    </span>
  ) : (
    <IconArrow
      size={20}
      language={language}
      className="shrink-0 text-[#0d0d0d] transition-colors duration-150 group-hover:text-[#d42b2b]"
    />
  );

  // DOM order stays constant (matching the English reading order); the card's
  // own `dir` mirrors it natively for Arabic.
  const softwareTypeRow = (
    <div className="flex w-full items-center gap-[2px] whitespace-nowrap font-barlow text-[14px] text-[#d42b2b]">
      <span>{software}</span>
      <span>·</span>
      <span>{type}</span>
    </div>
  );

  const content = (
    <div className="flex w-full flex-col items-start gap-5">
      <div className="flex w-full flex-col items-start gap-0">
        <div className="flex w-full items-start justify-between">
          {numberEl}
          {trailing}
        </div>
        {softwareTypeRow}
      </div>
      <p className="w-full whitespace-nowrap font-barlow text-[24px] font-black text-[#0d0d0d]">{title}</p>
      {!disabled && <p className="w-full font-barlow text-[14px] font-light text-[#6f6f6f]">{subText}</p>}
    </div>
  );

  const sharedClassName = [
    "group border-b border-[#d8d8d8] bg-[#f7f4f0] transition-colors duration-150",
    !disabled ? "cursor-pointer hover:bg-[#f0f6f7]" : "cursor-default",
    isResponsive ? "w-full px-0 py-4" : "w-full min-w-[280px] px-5 py-8",
    className ?? "",
  ].join(" ");

  if (disabled) {
    return (
      <div dir={dir} className={sharedClassName}>
        {content}
      </div>
    );
  }

  return (
    <a dir={dir} href={href} className={sharedClassName}>
      {content}
    </a>
  );
}
