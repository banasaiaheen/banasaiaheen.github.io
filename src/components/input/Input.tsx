import type { ReactNode } from "react";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import IconDown from "../icons/IconDown";

export type InputState = "default" | "focused" | "filled" | "error" | "open";

/**
 * Figma: input (34:600). Single-line fields, select fields and the multi-line
 * message area.
 *
 *  textarea           multi-line message area (115px tall)
 *  state              default | focused | filled | error | open. Leave it out
 *                     for a live field: focus and filled are derived from
 *                     interaction. Pass "error" (red outline + required label)
 *                     or "open" (select fields only) from the parent, or any
 *                     state to force the look in a style guide.
 *  placeholder        hint text — pass the translated string
 *  value              the entered value (shown in the filled state)
 *  showDropDownIcon   select-style field (Type of inquiry): renders a button
 *                     with a chevron instead of a text input. state="open"
 *                     always shows the up chevron.
 *  menu               the <DropdownMenu> to show under the field when open
 *  errorLabel         text of the red label in the error state ("Required")
 *  direction          ltr | rtl (defaults to the page direction)
 */
export interface InputProps {
  textarea?: boolean;
  state?: InputState;
  placeholder?: string;
  value?: string;
  showDropDownIcon?: boolean;
  menu?: ReactNode;
  errorLabel?: string;
  direction?: Direction;
  name?: string;
  type?: "text" | "email";
  onChange?: (value: string) => void;
  /** For select-style fields: toggles the menu. */
  onClick?: () => void;
  className?: string;
}

const boxClasses = "flex w-full items-center border border-transparent px-5 py-4 transition-colors duration-150";

export default function Input({
  textarea = false,
  state,
  placeholder = "placeholder",
  value = "",
  showDropDownIcon = false,
  menu,
  errorLabel = "Required",
  direction,
  name,
  type = "text",
  onChange,
  onClick,
  className,
}: InputProps) {
  const dir = useDirection(direction);
  const hasValue = value.length > 0;
  const isError = state === "error";
  const isOpen = state === "open";
  const isSelect = showDropDownIcon;

  const stateClasses = cn(
    isError
      ? "border-brand-red-on-dark bg-brand-panel"
      : isOpen || state === "focused"
        ? "bg-neutral-20"
        : "bg-brand-panel focus-within:bg-neutral-20",
    textarea && "h-[115px] items-start",
  );

  const textClasses = cn(
    "min-w-0 flex-1 bg-transparent text-start text-light-14 outline-none",
    hasValue || state === "filled" ? "text-brand-white" : "text-neutral-52 placeholder:text-neutral-52",
    isOpen && "text-neutral-48",
  );

  const errorLabelEl = isError && (
    <span className="shrink-0 whitespace-nowrap text-regular-12 text-brand-red-on-dark">{errorLabel}</span>
  );

  if (isSelect) {
    return (
      <div dir={dir} className={cn("relative w-full", className)}>
        <button
          type="button"
          onClick={onClick}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={isError}
          className={cn(boxClasses, stateClasses, "cursor-pointer gap-2")}
        >
          <span className={cn(textClasses, "truncate", hasValue ? "text-brand-white" : isOpen ? "text-neutral-48" : "text-neutral-52")}>
            {hasValue ? value : placeholder}
          </span>
          {errorLabelEl}
          <IconDown up={isOpen} className="text-neutral-52" />
        </button>
        {isOpen && menu}
      </div>
    );
  }

  return (
    <div dir={dir} className={cn("w-full", className)}>
      <label className={cn(boxClasses, stateClasses, "gap-2")}>
        {textarea ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-invalid={isError}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(textClasses, "h-full resize-none")}
          />
        ) : (
          <input
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-invalid={isError}
            onChange={(e) => onChange?.(e.target.value)}
            className={textClasses}
          />
        )}
        {errorLabelEl}
      </label>
    </div>
  );
}
