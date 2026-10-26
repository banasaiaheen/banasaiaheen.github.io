import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import IconInfo from "../icons/IconInfo";

/**
 * Figma: message (230:1889). A notice with an info icon, a title and a
 * message, set on a panel with a red bar on the reading-start side.
 *
 *  title / message   the notice content — pass translated strings
 *  direction         ltr | rtl (defaults to the page direction); rtl moves the
 *                    bar and icon to the right
 */
export interface MessageProps {
  title: string;
  message: string;
  direction?: Direction;
  className?: string;
}

export default function Message({ title, message, direction, className }: MessageProps) {
  const dir = useDirection(direction);
  return (
    <div
      dir={dir}
      role="alert"
      className={cn(
        "flex w-full flex-col gap-2 border-s-8 border-brand-red bg-brand-panel py-7 ps-8 pe-6 text-start",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-bold-24 text-brand-cream">
        <IconInfo />
        <h4>{title}</h4>
      </div>
      <p className="text-regular-18 text-neutral-68">{message}</p>
    </div>
  );
}
