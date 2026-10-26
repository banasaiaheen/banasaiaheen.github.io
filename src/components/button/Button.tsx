import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import IconBackward from "../icons/IconBackward";
import IconNewWindow from "../icons/IconNewWindow";

export type ButtonType = "primary" | "link" | "link-xl";
export type ButtonState = "default" | "hover" | "disabled";

/**
 * Figma: button (19:8). All clickable actions on the site.
 *
 *  type      primary = filled red call to action · link = small text link ·
 *            link-xl = large link (the direct email in Contact)
 *  state     default | hover | disabled. Real hover works through CSS; pass
 *            state="hover" only to force the look (style-guide previews).
 *  cta       the label — pass the translated string from src/i18n
 *  showTrailingIcon / trailingIconSwap   icon after the label (new-window for
 *            external links by default; swap in <IconForward /> etc.)
 *  showLeadingIcon / leadingIconSwap     icon before the label (backward for
 *            back links by default)
 *  direction ltr | rtl (rtl mirrors order, alignment and icons); defaults to
 *            the page direction
 *
 * Renders a router <Link> for internal paths ("/projects/x", "/#contact"), a
 * plain <a> for external/mailto/#anchor links, and a <button> otherwise.
 */
export interface ButtonProps {
  type?: ButtonType;
  state?: ButtonState;
  cta?: string;
  direction?: Direction;
  showLeadingIcon?: boolean;
  leadingIconSwap?: ReactNode;
  showTrailingIcon?: boolean;
  trailingIconSwap?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  /** Native button type, when no href is given. */
  buttonType?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
}

const layoutClasses: Record<ButtonType, string> = {
  primary: "justify-center px-6 py-3 text-regular-18",
  link: "justify-center gap-[6px] py-1 text-regular-14",
  "link-xl": "gap-1 text-bold-20",
};

// One class set per state, so real :hover and the forced "hover" look can't clash.
const stateClasses: Record<ButtonType, Record<ButtonState, string>> = {
  primary: {
    default: "bg-brand-red text-brand-cream hover:bg-brand-red-dark",
    hover: "bg-brand-red-dark text-brand-cream",
    disabled: "bg-alpha-red-40 text-neutral-68",
  },
  link: {
    default: "text-brand-cream hover:text-brand-red",
    hover: "text-brand-red",
    disabled: "text-neutral-52",
  },
  "link-xl": {
    default: "text-brand-cream hover:text-brand-red",
    hover: "text-brand-red",
    disabled: "text-neutral-52",
  },
};

const iconSlotSize: Record<ButtonType, string> = {
  primary: "size-[14px]",
  link: "size-[14px]",
  "link-xl": "size-[24px]",
};

export default function Button({
  type = "primary",
  state = "default",
  cta = "CTA",
  direction,
  showLeadingIcon = false,
  leadingIconSwap,
  showTrailingIcon = false,
  trailingIconSwap,
  href,
  target,
  rel,
  disabled = false,
  buttonType = "button",
  onClick,
  className,
}: ButtonProps) {
  const dir = useDirection(direction);
  const effectiveState: ButtonState = disabled ? "disabled" : state;
  const isDisabled = effectiveState === "disabled";

  const slot = cn("inline-flex shrink-0 items-center justify-center [&>svg]:size-full", iconSlotSize[type]);
  const leading = showLeadingIcon && (
    <span className={slot}>{leadingIconSwap ?? <IconBackward direction={dir} />}</span>
  );
  const trailing = showTrailingIcon && (
    <span className={slot}>{trailingIconSwap ?? <IconNewWindow direction={dir} />}</span>
  );

  const content = (
    <>
      {leading}
      <span>{cta}</span>
      {trailing}
    </>
  );

  const classes = cn(
    "inline-flex items-center whitespace-nowrap leading-none transition-colors duration-150",
    layoutClasses[type],
    stateClasses[type][effectiveState],
    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  );

  if (href && !isDisabled) {
    if (href.startsWith("/")) {
      return (
        <Link to={href} dir={dir} onClick={onClick} className={classes}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} target={target} rel={rel} dir={dir} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={buttonType} dir={dir} disabled={isDisabled} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
