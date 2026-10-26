import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

export interface IconProps {
  size?: number;
  /** Figma `direction`: rtl mirrors the arrow. Defaults to the page direction. */
  direction?: Direction;
  className?: string;
}

/** Figma: icon/ forward — arrow pointing forward in the reading direction (→ in ltr, ← in rtl). */
export default function IconForward({ size = 20, direction, className }: IconProps) {
  const isRtl = useDirection(direction) === "rtl";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", isRtl && "-scale-x-100", className)}
    >
      <path
        d="M4.16667 10H15.8333M10 15.8333L15.8333 10L10 4.16667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
