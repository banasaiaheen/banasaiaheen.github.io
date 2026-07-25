import { useState, type ChangeEvent } from "react";
import ChevronDownIcon from "./ChevronDownIcon";

export type InputLanguage = "english" | "arabic";

export interface InputProps {
  className?: string;
  placeholder?: string;
  language?: InputLanguage;
  /** Renders a multi-line textarea (115px tall) instead of a single-line field. */
  freeInputField?: boolean;
  trailingIcon?: boolean;
  name?: string;
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function Input({
  className,
  placeholder = "placeholder",
  language = "english",
  freeInputField = false,
  trailingIcon = false,
  name,
  id,
  value,
  defaultValue,
  onChange,
}: InputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue.length > 0;
  const isRtl = language === "arabic";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const fieldClasses = [
    "flex-1 min-w-0 bg-transparent border-none outline-none resize-none p-0 m-0",
    "font-barlow font-light text-[14px] leading-normal",
    isRtl ? "text-right" : "text-left",
    hasValue
      ? "text-white placeholder:text-white"
      : "text-[#848484] placeholder:text-[#848484] focus:text-[#767676] focus:placeholder:text-[#767676]",
  ].join(" ");

  const iconColorClass = hasValue ? "text-white" : "text-[#848484]";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={[
        "flex w-full min-w-0 items-center bg-[#1c1c1c] px-5 py-4 transition-colors duration-150 focus-within:bg-[#343434]",
        freeInputField ? "h-[115px] items-start" : "",
        className ?? "",
      ].join(" ")}
    >
      {freeInputField ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleChange}
          className={`${fieldClasses} h-full`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type="text"
          placeholder={placeholder}
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          onChange={handleChange}
          className={fieldClasses}
        />
      )}
      {trailingIcon && <ChevronDownIcon size={16} className={iconColorClass} />}
    </div>
  );
}
