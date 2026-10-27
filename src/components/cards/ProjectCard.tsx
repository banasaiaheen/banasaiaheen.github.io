import { Link } from "react-router-dom";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import IconForward from "../icons/IconForward";

export type ProjectCardState = "default" | "hover" | "disabled";

/**
 * Figma: projects-card (19:81). One project in the Projects section. Each
 * card links to that project's child page.
 *
 *  number / title / software / type / subText   the card content
 *  state       default | hover | disabled. Real hover works through CSS; pass
 *              state="hover" only to force the look. disabled is for projects
 *              that are not live yet: no link, no sub-text, and the Coming Soon
 *              badge instead of the arrow.
 *  badge       text of the Coming Soon badge (content projects/badge)
 *  href        child page path, e.g. "/projects/portfolio-design"
 *  direction   ltr | rtl (defaults to the page direction)
 *
 * The responsive layout (below `lg`) has tighter gaps and padding.
 */
export interface ProjectCardProps {
  number: string;
  title: string;
  software: string;
  type: string;
  subText?: string;
  state?: ProjectCardState;
  badge?: string;
  href?: string;
  direction?: Direction;
  className?: string;
}

export default function ProjectCard({
  number,
  title,
  software,
  type,
  subText,
  state = "default",
  badge = "Coming Soon!",
  href = "#",
  direction,
  className,
}: ProjectCardProps) {
  const dir = useDirection(direction);
  const isDisabled = state === "disabled";
  const isHover = state === "hover";

  const classes = cn(
    "group flex w-full flex-col items-start gap-[10px] border-b border-neutral-87 py-4 text-start transition-[background-color,padding] duration-150",
    "lg:gap-5 lg:py-8",
    // No side padding by default; the hover state gains 8px (responsive) or 20px (desktop).
    isHover ? "bg-brand-red px-2 lg:px-5" : "bg-brand-cream",
    // A project that isn't live yet keeps the row height of the other cards.
    isDisabled && "lg:min-h-[231px]",
    !isDisabled && !isHover && "[&:hover]:bg-brand-red [&:hover]:px-2 lg:[&:hover]:px-5",
    !isDisabled && "cursor-pointer",
    className,
  );

  // Text turns white on the red hover state (forced, or live through the `group` hover).
  // Unlike the rest of the site (hover only with a real pointer), the card uses plain :hover, so a
  // tap shows its red hover look on touch screens; the tap then opens the project page.
  const live = !isDisabled && !isHover;

  const content = (
    <>
      <div className="flex w-full flex-col">
        <div className="flex w-full items-start justify-between">
          {/* Outlined number; fills white on hover. Always Latin digits (en-font). */}
          <span
            aria-hidden="true"
            dir="ltr"
            className={cn(
              "shrink-0 whitespace-nowrap text-numbers-64 transition-colors duration-150",
              isHover
                ? "text-brand-white"
                : cn(
                    "text-transparent [-webkit-text-stroke:1.5px_var(--color-neutral-87)]",
                    !isDisabled && "group-[:hover]:text-brand-white group-[:hover]:[-webkit-text-stroke:0]",
                  ),
            )}
          >
            {number}
          </span>
          {isDisabled ? (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-accent-orange px-3 py-1 text-bold-12 text-brand-ink">
              {badge}
            </span>
          ) : (
            <IconForward
              direction={dir}
              className={cn(
                "shrink-0 transition-colors duration-150",
                isHover ? "text-brand-white" : "text-neutral-80",
                live && "group-[:hover]:text-brand-white",
              )}
            />
          )}
        </div>
        <p
          className={cn(
            "flex gap-[2px] whitespace-nowrap text-regular-14",
            isHover ? "text-brand-white" : "text-brand-red",
            live && "group-[:hover]:text-brand-white",
          )}
        >
          <span>{software}</span>
          <span aria-hidden="true">·</span>
          <span>{type}</span>
        </p>
      </div>
      <h3
        className={cn(
          "whitespace-nowrap text-black-24",
          isHover ? "text-brand-white" : "text-brand-ink",
          live && "group-[:hover]:text-brand-white",
        )}
      >
        {title}
      </h3>
      {!isDisabled && subText && (
        <p
          className={cn(
            "w-full truncate text-regular-14",
            isHover ? "text-brand-white" : "text-neutral-37",
            live && "group-[:hover]:text-brand-white",
          )}
        >
          {subText}
        </p>
      )}
    </>
  );

  if (isDisabled) {
    return (
      <div dir={dir} className={classes}>
        {content}
      </div>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link to={href} dir={dir} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} dir={dir} className={classes}>
      {content}
    </a>
  );
}
