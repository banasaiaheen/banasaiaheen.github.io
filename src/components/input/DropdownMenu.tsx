import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import DropdownOption from "./DropdownOption";

/**
 * Figma: dropdown-menu (402:791). The list that opens under a select-style
 * input (input, state=open). Labels come from the contact/inquiry/option-*
 * content variables; hide trailing options by passing a shorter list.
 */
export interface DropdownMenuProps {
  options: string[];
  /** The currently chosen option (shown as "selected"). */
  value?: string;
  onSelect: (option: string) => void;
  direction?: Direction;
  className?: string;
}

export default function DropdownMenu({ options, value, onSelect, direction, className }: DropdownMenuProps) {
  const dir = useDirection(direction);
  return (
    <div
      role="listbox"
      dir={dir}
      className={cn(
        "absolute inset-x-0 top-full z-10 flex flex-col border border-neutral-16 bg-brand-panel",
        className,
      )}
    >
      {options.map((option) => (
        <DropdownOption
          key={option}
          option={option}
          direction={dir}
          state={option === value ? "selected" : "default"}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
