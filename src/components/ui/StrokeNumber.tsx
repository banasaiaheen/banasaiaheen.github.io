import type { CSSProperties } from "react";

export interface StrokeNumberProps {
  value: string;
  size: number;
  strokeColor: string;
  strokeWidth?: number;
  className?: string;
}

/** A hollow/outline decorative number (used for section numbers and ghost background numerals). */
export default function StrokeNumber({ value, size, strokeColor, strokeWidth = 1.5, className = "" }: StrokeNumberProps) {
  const style: CSSProperties = {
    fontSize: size,
    lineHeight: 1,
    WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
  };
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={`font-barlow font-black tracking-[-0.02em] text-transparent whitespace-nowrap ${className}`}
      style={style}
    >
      {value}
    </span>
  );
}
