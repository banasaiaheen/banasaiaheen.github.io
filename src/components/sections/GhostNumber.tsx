import { cn } from "../../utils/cn";

/**
 * Large decorative numeral or word behind a section's content (the "00", "UX/UI"
 * and "05" in the Figma sections). Always Barlow Condensed (en-font) and always
 * left-to-right, also on Arabic pages.
 *
 *  outline    hollow numeral with a stroke (Contact) instead of a faint fill
 *
 * The caller positions and sizes it with `className` (it is absolutely
 * positioned inside the section) and picks the fill color, e.g.
 * `text-brand-cream` — the 8% opacity of the filled variant is applied here.
 */
export interface GhostNumberProps {
  value: string;
  outline?: boolean;
  className?: string;
}

export default function GhostNumber({ value, outline = false, className }: GhostNumberProps) {
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={cn(
        "pointer-events-none absolute select-none whitespace-nowrap font-[family-name:var(--font-en)] font-black leading-none",
        outline ? "text-transparent [-webkit-text-stroke:2px_var(--color-neutral-32)]" : "opacity-[0.08]",
        className,
      )}
    >
      {value}
    </span>
  );
}
