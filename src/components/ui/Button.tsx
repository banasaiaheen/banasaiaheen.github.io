import type { MouseEventHandler } from "react";
import type { Language } from "../../types/language";
import { cn } from "../../utils/cn";
import IconNewWindow from "./IconNewWindow";

export type ButtonVariant = "primary" | "link" | "link-xl";
export type ButtonVisualState = "default" | "hover";

export interface ButtonProps {
  className?: string;
  cta?: string;
  language?: Language;
  variant?: ButtonVariant;
  /** Forces the hover look for style-guide previews. Real pointer hover works regardless. */
  state?: ButtonVisualState;
  trailingIcon?: boolean;
  disabled?: boolean;
  /** Renders an <a> instead of a <button> for real navigation/external links. */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const layoutClasses: Record<ButtonVariant, string> = {
  primary: "justify-center px-6 py-3 text-[18px]",
  link: "justify-center gap-[6px] py-1 text-[14px]",
  "link-xl": "gap-1 text-[20px] font-bold",
};

// Only one class per state bucket is ever applied at once, so there's no
// same-specificity utility clash between the "default" and "hover" colors.
const colorClasses = {
  primary: {
    default: "bg-[#d42b2b] text-[#f7f4f0] hover:bg-[#a22222]",
    hover: "bg-[#a22222] text-[#f7f4f0]",
    disabled: "bg-[#d42b2b]/40 text-[#b1b0ae]",
  },
  link: {
    default: "text-[#f7f4f0] hover:text-[#d42b2b]",
    hover: "text-[#d42b2b]",
    disabled: "text-[#878787]",
  },
  "link-xl": {
    default: "text-[#f7f4f0] hover:text-[#d42b2b]",
    hover: "text-[#d42b2b]",
    disabled: "text-[#878787]",
  },
} satisfies Record<ButtonVariant, Record<ButtonVisualState | "disabled", string>>;

const iconSize: Record<ButtonVariant, 14 | 16 | 24> = {
  primary: 14,
  link: 14,
  "link-xl": 16,
};

export default function Button({
  cta = "CTA",
  language = "english",
  variant = "primary",
  state = "default",
  trailingIcon = false,
  disabled = false,
  href,
  target,
  rel,
  onClick,
  className,
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const colorKey = disabled ? "disabled" : state;

  const content = (
    <>
      <span>{cta}</span>
      {!isPrimary && trailingIcon && (
        <IconNewWindow size={iconSize[variant]} language={language} />
      )}
    </>
  );

  const sharedClassName = cn(
    "inline-flex items-center whitespace-nowrap leading-none",
    "font-barlow disabled:cursor-not-allowed enabled:cursor-pointer",
    "transition-colors duration-150",
    layoutClasses[variant],
    colorClasses[variant][colorKey],
    className,
  );

  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        dir={language === "arabic" ? "rtl" : "ltr"}
        onClick={onClick}
        className={sharedClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      dir={language === "arabic" ? "rtl" : "ltr"}
      disabled={disabled}
      onClick={onClick}
      className={sharedClassName}
    >
      {content}
    </button>
  );
}
