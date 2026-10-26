import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import type { IconProps } from "./IconForward";

/** Figma: icon/ new-window — arrow for links that open in a new tab (email, LinkedIn, Figma, external project links). rtl mirrors it. */
export default function IconNewWindow({ size = 24, direction, className }: IconProps) {
  const isRtl = useDirection(direction) === "rtl";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", isRtl && "-scale-x-100", className)}
    >
      <path d="M17 17V7H7M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
