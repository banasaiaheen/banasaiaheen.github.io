import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

export type ToggleMenuState = "default" | "hover";

/**
 * Figma: toggle-menu (19:535). Menu button of the responsive navigation bar.
 *
 *  collapsed  true = menu closed (three lines), false = menu open (X)
 *  state      default | hover. Real hover works through CSS; pass
 *             state="hover" only to force the look.
 *  direction  ltr | rtl (defaults to the page direction). rtl aligns the lines
 *             to the right.
 *  onToggle   called with the next `collapsed` value
 *  openLabel / closeLabel   accessible names for the button
 */
export interface ToggleMenuProps {
  collapsed?: boolean;
  state?: ToggleMenuState;
  direction?: Direction;
  onToggle?: (collapsed: boolean) => void;
  openLabel?: string;
  closeLabel?: string;
  className?: string;
}

export default function ToggleMenu({
  collapsed = true,
  state = "default",
  direction,
  onToggle,
  openLabel = "Open menu",
  closeLabel = "Close menu",
  className,
}: ToggleMenuProps) {
  const dir = useDirection(direction);
  const isRtl = dir === "rtl";
  // The lines take the button's text color (cream, red on hover) through bg-current.
  const line = "h-[1.5px] bg-current";

  return (
    <button
      type="button"
      dir={dir}
      aria-expanded={!collapsed}
      aria-label={collapsed ? openLabel : closeLabel}
      onClick={() => onToggle?.(!collapsed)}
      className={cn(
        "flex h-[30.5px] w-[28px] shrink-0 cursor-pointer flex-col transition-colors duration-150",
        isRtl ? "items-end" : "items-start",
        state === "hover" ? "text-brand-red" : "text-brand-cream hover:text-brand-red",
        className,
      )}
    >
      {collapsed ? (
        <span className={cn("flex flex-col gap-[6px]", isRtl ? "items-end" : "items-start")}>
          <span className={cn(line, "w-[28px]")} />
          <span className={cn(line, "w-[18px] opacity-40")} />
          <span className={cn(line, "w-[22px] opacity-70")} />
        </span>
      ) : (
        // Open: two 28px lines cross into an X. The offsets are the exact Figma
        // coordinates (the second line sits 3.38px lower, and the pair shifts
        // to the right in rtl), each line turned about its top-left corner.
        <span className="relative block h-full w-full" aria-hidden="true">
          <span
            className={cn(line, "absolute w-[28px] origin-top-left -rotate-45")}
            style={{ left: isRtl ? 6.96 : 0.18, top: 19.8 }}
          />
          <span
            className={cn(line, "absolute w-[28px] origin-top-left rotate-45")}
            style={{ left: isRtl ? 8.02 : 1.24, top: 3.38 }}
          />
        </span>
      )}
    </button>
  );
}
