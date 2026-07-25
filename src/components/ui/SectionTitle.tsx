import StrokeNumber from "./StrokeNumber";

export interface SectionTitleProps {
  number: string;
  title: string;
  dark?: boolean;
  className?: string;
}

/** The "01  About Me." style heading used at the top of each main section. */
export default function SectionTitle({ number, title, dark = true, className = "" }: SectionTitleProps) {
  const strokeColor = dark ? "#7a7a7a" : "#CCCCCC";
  return (
    <div className={`flex items-baseline gap-3 lg:gap-4 ${className}`}>
      <StrokeNumber value={number} size={89} strokeColor={strokeColor} className="lg:hidden" />
      <StrokeNumber value={number} size={144} strokeColor={strokeColor} className="hidden lg:inline" />
      <h2
        className={`font-barlow text-[28px] font-black uppercase leading-none tracking-wide lg:text-[56px] ${
          dark ? "text-[#f7f4f0]" : "text-[#0d0d0d]"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
