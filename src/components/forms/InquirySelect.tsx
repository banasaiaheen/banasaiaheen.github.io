import { useEffect, useRef, useState } from "react";
import type { Language } from "../../types/language";
import ChevronDownIcon from "../ui/ChevronDownIcon";

export interface InquirySelectProps {
  value: string;
  onChange: (value: string) => void;
  /** The dropdown's option list. Pass INQUIRY_OPTIONS[language] from src/data/inquiryOptions.ts. */
  options: string[];
  language?: Language;
  placeholder?: string;
  invalid?: boolean;
}

export default function InquirySelect({
  value,
  onChange,
  options,
  language = "english",
  placeholder = "Type of inquiry...",
  invalid = false,
}: InquirySelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasValue = value.length > 0;
  const isRtl = language === "arabic";

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        dir={isRtl ? "rtl" : "ltr"}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid}
        className={`flex w-full items-center gap-2 bg-[#1c1c1c] px-5 py-4 font-barlow text-[14px] font-light transition-colors duration-150 focus-within:bg-[#343434] ${
          isRtl ? "text-right" : "text-left"
        } ${hasValue ? "text-white" : "text-[#848484]"}`}
      >
        <span className="min-w-0 flex-1 truncate">{hasValue ? value : placeholder}</span>
        <ChevronDownIcon
          size={16}
          className={`shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          dir={isRtl ? "rtl" : "ltr"}
          className="absolute left-0 right-0 top-full z-10 mt-[2px] bg-[#1c1c1c] shadow-lg"
        >
          {options.map((option) => (
            <li key={option} role="option" aria-selected={value === option}>
              <button
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-5 py-3 font-barlow text-[14px] font-light text-[#848484] transition-colors duration-150 hover:bg-[#343434] hover:text-white ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
