import { cn } from "../../utils/cn";

export interface IconDownProps {
  size?: number;
  /** Flips the chevron to point up — the open state of a select field. */
  up?: boolean;
  className?: string;
}

/** Figma: icon/ down — chevron used as the dropdown indicator in input fields. */
export default function IconDown({ size = 16, up = false, className }: IconDownProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0 transition-transform duration-150", up && "-scale-y-100", className)}
    >
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
