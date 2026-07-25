import { useState, type ButtonHTMLAttributes } from "react";
import type { Language } from "../../types/language";
import { cn } from "../../utils/cn";

export interface ToggleMenuProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type" | "onToggle"> {
  className?: string;
  language?: Language;
  /** Controlled: true shows the hamburger, false shows the close (X) icon. */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onToggle?: (collapsed: boolean) => void;
}

export default function ToggleMenu({
  className,
  language = "english",
  collapsed: collapsedProp,
  defaultCollapsed = true,
  onToggle,
  ...rest
}: ToggleMenuProps) {
  const isControlled = collapsedProp !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const collapsed = isControlled ? collapsedProp : internalCollapsed;
  const isArabic = language === "arabic";

  const handleClick = () => {
    const next = !collapsed;
    if (!isControlled) setInternalCollapsed(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      dir={isArabic ? "rtl" : "ltr"}
      aria-expanded={!collapsed}
      aria-label={collapsed ? "Open menu" : "Close menu"}
      onClick={handleClick}
      {...rest}
      className={cn(
        "group flex w-[28px] cursor-pointer flex-col items-start gap-[6px] pb-3.5",
        "text-[#f7f4f0] transition-colors duration-150 hover:text-[#d42b2b]",
        className,
      )}
    >
      {collapsed ? (
        <>
          <span className="h-[1.5px] w-[28px] bg-current" />
          <span className="h-[1.5px] w-[18px] bg-current opacity-40" />
          <span className="h-[1.5px] w-[22px] bg-current opacity-70" />
        </>
      ) : (
        <span className="relative flex h-[21px] w-[28px] items-center justify-center">
          <span className="absolute h-[1.5px] w-[28px] rotate-45 bg-current" />
          <span className="absolute h-[1.5px] w-[28px] -rotate-45 bg-current" />
        </span>
      )}
    </button>
  );
}
