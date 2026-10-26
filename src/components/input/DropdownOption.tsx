import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";

export type DropdownOptionState = "default" | "hover" | "selected";

/**
 * Figma: dropdown-option (402:770). One row of a dropdown-menu.
 *  option  the row label    state  default | hover | selected (the current choice)
 * Real hover works through CSS; pass state="hover" only to force the look.
 */
export interface DropdownOptionProps {
  option: string;
  state?: DropdownOptionState;
  direction?: Direction;
  onSelect?: (option: string) => void;
  className?: string;
}

const stateClasses: Record<DropdownOptionState, string> = {
  default: "bg-brand-panel text-neutral-62 hover:bg-neutral-20 hover:text-brand-cream",
  hover: "bg-neutral-20 text-brand-cream",
  selected: "bg-brand-panel text-brand-red-on-dark hover:bg-neutral-20",
};

export default function DropdownOption({ option, state = "default", direction, onSelect, className }: DropdownOptionProps) {
  const dir = useDirection(direction);
  return (
    <button
      type="button"
      role="option"
      dir={dir}
      aria-selected={state === "selected"}
      onClick={() => onSelect?.(option)}
      className={cn(
        "flex w-full items-center px-5 py-4 text-start text-light-14 transition-colors duration-150",
        stateClasses[state],
        className,
      )}
    >
      {option}
    </button>
  );
}
