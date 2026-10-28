import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Direction, Language } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection, useLanguage } from "../../i18n/useLanguage";
import Button from "../button/Button";
import IconFlagJordan from "../icons/IconFlagJordan";
import IconStatusDot from "../icons/IconStatusDot";
import NavigationPage, { type NavigationPageState } from "./NavigationPage";
import ToggleMenu from "./ToggleMenu";

export type NavigationBreakpoint = "desktop" | "responsive";

export interface NavigationPageItem {
  number: string;
  nav: string;
  /** "#section" anchor of the page section. */
  href: string;
  state?: NavigationPageState;
}

export interface NavigationLinkItem {
  cta: string;
  href: string;
  target?: string;
  rel?: string;
}

/**
 * Figma: navigation (19:793). Site navigation. Desktop is the 256px sidebar:
 * name, role with status dot, location, page list, language switch, contact
 * links and copyright. Responsive is the top bar with a toggle-menu that opens
 * the same content as a panel.
 *
 *  breakpoint desktop | responsive. The page renders one Navigation per
 *             breakpoint and shows the right one with its breakpoint classes
 *             (see `className`), so there is a single set of content.
 *  direction  ltr | rtl (defaults to the page direction). rtl mirrors the layout;
 *             on desktop the sidebar sits on the right.
 *
 * Presentational: names, labels and links come in as props from src/data and
 * src/i18n. The language switch uses the language context.
 */
export interface NavigationProps {
  breakpoint?: NavigationBreakpoint;
  direction?: Direction;
  name: string;
  /** Job title next to the status dot. */
  title: string;
  location: string;
  pages: NavigationPageItem[];
  links: NavigationLinkItem[];
  /** Label of the button that switches to the other language (content nav/switch-to). */
  switchToLabel: string;
  /** Full copyright line (content nav/copy-right). */
  copyright: string;
  /** Accessible names of the responsive toggle and its overlay. */
  openMenuLabel?: string;
  closeMenuLabel?: string;
  /** The page sets visibility per breakpoint, e.g. desktop `hidden lg:flex`, responsive `lg:hidden`. */
  className?: string;
}

const divider = <div className="h-px w-full shrink-0 bg-neutral-37" />;

export default function Navigation({
  breakpoint = "desktop",
  direction,
  name,
  title,
  location,
  pages,
  links,
  switchToLabel,
  copyright,
  openMenuLabel,
  closeMenuLabel,
  className,
}: NavigationProps) {
  const dir = useDirection(direction);
  const isRtl = dir === "rtl";
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll while the responsive menu is open. `overflow: hidden` alone is not enough on iPhones
  // (the page behind still scrolls with a finger), so touch moves outside the menu are cancelled too.
  // Only <html> is locked: with <body> locked as well it would become a scroll container of its own and
  // the sticky bar would stop sticking.
  useEffect(() => {
    if (!expanded) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const onTouchMove = (event: TouchEvent) => {
      const panel = panelRef.current;
      // Only the open menu may scroll, and only when it is taller than the screen.
      if (panel && panel.contains(event.target as Node) && panel.scrollHeight > panel.clientHeight) return;
      event.preventDefault();
    };
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      html.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const otherLanguage: Language = language === "arabic" ? "english" : "arabic";

  /** Scroll to the section on the home page, or go home first from a child page. */
  const goToSection = (href: string) => {
    setExpanded(false);
    const target = document.querySelector(href);
    if (target && href === "#home") {
      // Home is the top of the page: go all the way up, not just to the section under the nav bar.
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Not on the home page (e.g. a project page): the home page scrolls to the hash itself.
      navigate(`/${href}`);
    }
  };

  // The name is the home link: it scrolls to the top on the home page, and goes there from other pages.
  const nameEl = (
    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        goToSection("#home");
      }}
      // Red on hover only where there is a real pointer: on touch screens :hover sticks after a tap, which
      // would leave the name red once you are back on the home page. It flashes red while pressed instead.
      className="whitespace-nowrap text-bold-24 text-brand-cream transition-colors duration-150 active:text-brand-red [@media(hover:hover)]:hover:text-brand-red"
    >
      {name}
    </a>
  );

  // Role and location; the name sits above it on desktop and in the bar on responsive.
  const profileDetails = (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-center gap-2">
        <span className="flex items-center pe-1">
          <IconStatusDot />
        </span>
        <span className="min-w-0 flex-1 text-regular-14 text-neutral-68">{title}</span>
      </div>
      <div className="flex w-full items-center gap-2">
        <IconFlagJordan />
        <span className="whitespace-nowrap text-regular-14 text-neutral-68">{location}</span>
      </div>
    </div>
  );

  const pageList = (
    <div className="flex w-full flex-col items-start gap-[6px]">
      {pages.map((page) => (
        <NavigationPage
          key={page.number}
          number={page.number}
          nav={page.nav}
          href={page.href}
          state={page.state}
          onClick={(e) => {
            e.preventDefault();
            goToSection(page.href);
          }}
        />
      ))}
    </div>
  );

  const languageSwitch = (
    <Button type="link" cta={switchToLabel} onClick={() => setLanguage(otherLanguage)} />
  );

  const linkButtons = links.map((link) => (
    <Button key={link.cta} type="link" cta={link.cta} href={link.href} target={link.target} rel={link.rel} />
  ));

  const copyrightEl = <p className="w-full text-regular-12 text-neutral-52">{copyright}</p>;

  if (breakpoint === "responsive") {
    return (
      <nav
        dir={dir}
        className={cn(
          // Figma: the responsive bar is exactly 70px tall (content centred), not padding around the content.
          "sticky top-0 z-50 flex h-[70px] w-full items-center justify-between bg-brand-ink px-4",
          className,
        )}
      >
        {nameEl}
        <ToggleMenu
          collapsed={!expanded}
          onToggle={(collapsed) => setExpanded(!collapsed)}
          openLabel={openMenuLabel}
          closeLabel={closeMenuLabel}
        />

        {/* The open menu belongs to the bar (absolute, from its bottom edge), so it always sits flush under
            it, however the phone moves its toolbars. The backdrop covers the page below the bar. */}
        {expanded && (
          <>
            <button
              type="button"
              aria-label={closeMenuLabel}
              onClick={() => setExpanded(false)}
              className="absolute inset-x-0 top-full h-[calc(100dvh-70px)] cursor-default bg-black/60"
            />
            <div
              ref={panelRef}
              dir={dir}
              className="absolute inset-x-0 top-full flex max-h-[calc(100dvh-70px)] flex-col items-center gap-4 overflow-y-auto overscroll-contain bg-brand-ink px-4 pb-4"
            >
              {profileDetails}
              {divider}
              {pageList}
              {divider}
              {languageSwitch}
              {divider}
              <div className="flex w-full items-center justify-between">{linkButtons}</div>
              <p className="w-full text-center text-regular-12 text-neutral-52">{copyright}</p>
            </div>
          </>
        )}
      </nav>
    );
  }

  return (
    <nav
      dir={dir}
      className={cn(
        "sticky top-0 h-screen w-[256px] shrink-0 flex-col justify-between self-start overflow-y-auto border-neutral-16 bg-brand-ink py-11 ps-8 pe-[32.8px]",
        // The sidebar's divider sits on the side facing the content.
        isRtl ? "border-s-[0.8px]" : "border-e-[0.8px]",
        className,
      )}
    >
      <div className="flex w-full flex-col items-start gap-4">
        {nameEl}
        {profileDetails}
        {divider}
      </div>

      {pageList}

      <div className="flex w-full flex-col items-center gap-4">
        {divider}
        {languageSwitch}
        {divider}
        <div className="flex w-full flex-col items-start gap-1">{linkButtons}</div>
        {divider}
        {copyrightEl}
      </div>
    </nav>
  );
}
