import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import type { IconProps } from "./IconForward";

/** Figma: icon/ backward — arrow pointing back against the reading direction (← in ltr, → in rtl). Used by back links. */
export default function IconBackward({ size = 14, direction, className }: IconProps) {
  const isRtl = useDirection(direction) === "rtl";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", isRtl && "-scale-x-100", className)}
    >
      <path
        d="M11.0833 7H2.91667M7 11.0833L2.91667 7L7 2.91667"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
