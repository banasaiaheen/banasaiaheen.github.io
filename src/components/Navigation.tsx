import { useEffect, useRef, useState } from "react";
import Pages from "./Pages";
import Button from "./Button";
import ToggleMenu from "./ToggleMenu";
import jordanFlag from "../assets/jordan-flag.png";

export type NavigationLanguage = "english" | "arabic";
export type NavigationVersion = "desktop" | "responsive";

export interface NavigationPage {
  number: string;
  nav: string;
  href?: string;
  selected?: boolean;
}

export interface NavigationSocialLink {
  cta: string;
  href: string;
  target?: string;
  rel?: string;
}

export interface NavigationProps {
  className?: string;
  language?: NavigationLanguage;
  version?: NavigationVersion;
  name?: string;
  title?: string;
  location?: string;
  pages?: NavigationPage[];
  socialLinks?: NavigationSocialLink[];
  onLanguageChange?: (language: NavigationLanguage) => void;
}

const DEFAULT_PAGES: NavigationPage[] = [
  { number: "00", nav: "HOME" },
  { number: "01", nav: "ABOUT" },
  { number: "02", nav: "CAREER" },
  { number: "03", nav: "EDUCATION" },
  { number: "04", nav: "RESOURCES" },
  { number: "05", nav: "CONTACT" },
];

const DEFAULT_SOCIAL_LINKS: Record<NavigationLanguage, NavigationSocialLink[]> = {
  english: [
    { cta: "EMAIL", href: "mailto:hello@example.com" },
    { cta: "LINKEDIN", href: "https://linkedin.com", target: "_blank", rel: "noreferrer" },
    { cta: "FIGMA", href: "https://figma.com", target: "_blank", rel: "noreferrer" },
  ],
  arabic: [
    { cta: "البريد الإلكتروني", href: "mailto:hello@example.com" },
    { cta: "LINKEDIN", href: "https://linkedin.com", target: "_blank", rel: "noreferrer" },
    { cta: "FIGMA", href: "https://figma.com", target: "_blank", rel: "noreferrer" },
  ],
};

const COPY = {
  english: { switchTo: "العربية", rights: "ALL RIGHTS RESERVED" },
  arabic: { switchTo: "English", rights: "جميع الحقوق محفوظة" },
};

export default function Navigation({
  className,
  language = "english",
  version = "desktop",
  name = "Bana Saiaheen",
  title = "UX/UI DESIGNER",
  location = "Amman, Jordan",
  pages = DEFAULT_PAGES,
  socialLinks,
  onLanguageChange,
}: NavigationProps) {
  const isArabic = language === "arabic";
  const resolvedSocialLinks = socialLinks ?? DEFAULT_SOCIAL_LINKS[language];
  const [expanded, setExpanded] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const updateHeight = () => setHeaderHeight(el.getBoundingClientRect().height);
    updateHeight();
    // Barlow Condensed loads asynchronously and reflows the header afterward,
    // so a one-time measurement on mount can capture a stale (too-small) height.
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  const nameEl = (
    <span className="whitespace-nowrap font-barlow text-[24px] font-bold text-[#f7f4f0]">{name}</span>
  );

  // DOM order stays constant (icon before label, matching the English reading
  // order); the `dir` set on each nav root mirrors it natively for Arabic, so no
  // manual per-language reordering is needed here.
  const profileDetails = (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex w-full items-center gap-2">
        <span aria-hidden="true" className="flex h-[17px] w-[18px] shrink-0 items-center justify-center">
          <span className="h-[10px] w-[10px] rounded-full bg-[#22c55e]" />
        </span>
        <span className="font-barlow text-[14px] text-[#aeaeae]">{title}</span>
      </div>
      <div className="flex w-full items-center gap-2">
        <img src={jordanFlag} alt="" className="h-[17px] w-[18px] shrink-0 object-cover" />
        <span className="whitespace-nowrap font-barlow text-[14px] text-[#aeaeae]">{location}</span>
      </div>
    </div>
  );

  const pagesList = (
    <div className="flex w-full flex-col items-start gap-[6px] font-barlow text-[18px]">
      {pages.map((page) => (
        <Pages
          key={page.number}
          href={page.href ?? "#"}
          language={language}
          number={page.number}
          nav={page.nav}
          selected={page.selected}
          onClick={(e) => {
            if (!page.href) return;
            e.preventDefault();
            setExpanded(false);
            document.body.style.overflow = "";
            document.querySelector(page.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
      ))}
    </div>
  );

  const languageSwitch = (
    <Button
      variant="link"
      language={isArabic ? "english" : "arabic"}
      cta={COPY[language].switchTo}
      onClick={() => onLanguageChange?.(isArabic ? "english" : "arabic")}
    />
  );

  const copyrightEl = (
    <p className="w-full font-barlow text-[12px] text-[#847e7e]">
      © 2026 — {name.toUpperCase()} · {COPY[language].rights}
    </p>
  );

  if (version === "responsive") {
    const toggle = (
      <ToggleMenu language={language} collapsed={!expanded} onToggle={(collapsed) => setExpanded(!collapsed)} />
    );

    return (
      <>
        <nav
          ref={headerRef}
          dir={isArabic ? "rtl" : "ltr"}
          className={[
            "sticky top-0 z-50 w-full items-center justify-between border-b-[0.8px] bg-[#0d0d0d] py-8 transition-colors duration-150",
            isArabic ? "pr-4 pl-[16.8px]" : "pl-4 pr-[16.8px]",
            expanded ? "border-transparent" : "border-[#2a2a2a]",
            className ?? "",
          ].join(" ")}
        >
          {nameEl}
          {toggle}
        </nav>

        {expanded && (
          <>
            <button
              type="button"
              aria-label="Dismiss menu overlay"
              onClick={() => setExpanded(false)}
              className={`fixed inset-x-0 bottom-0 z-40 bg-black/60 ${className ?? ""}`}
              style={{ top: headerHeight }}
            />
            <div
              dir={isArabic ? "rtl" : "ltr"}
              className={[
                "fixed inset-x-0 z-40 flex max-h-[calc(100vh-var(--nav-header-h))] flex-col items-center gap-4 overflow-y-auto bg-[#0d0d0d] px-4 pb-4",
                isArabic ? "pl-[16.8px]" : "pr-[16.8px]",
                className ?? "",
              ].join(" ")}
              style={{ top: headerHeight, ["--nav-header-h" as string]: `${headerHeight}px` }}
            >
              <div className="w-full">
                {profileDetails}
              </div>
              <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />

              {pagesList}

              <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />
              {languageSwitch}
              <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />

              <div className="flex w-full items-center justify-between">
                {resolvedSocialLinks.map((link) => (
                  <Button
                    key={link.cta}
                    variant="link"
                    language={language}
                    cta={link.cta}
                    href={link.href}
                    target={link.target}
                    rel={link.rel}
                  />
                ))}
              </div>

              <p className="w-full text-center font-barlow text-[12px] text-[#847e7e]">
                © 2026 — {name.toUpperCase()} · {COPY[language].rights}
              </p>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={[
        "sticky top-0 h-screen w-[256px] shrink-0 flex-col justify-between self-start overflow-y-auto border-[#2a2a2a] bg-[#0d0d0d] py-11",
        isArabic ? "border-l-[0.8px] pr-8 pl-[32.8px]" : "border-r-[0.8px] pl-8 pr-[32.8px]",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex w-full flex-col items-start gap-4">
        {nameEl}
        {profileDetails}
        <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />
      </div>

      {pagesList}

      <div className="flex w-full flex-col items-center gap-4">
        <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />
        {languageSwitch}
        <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />

        <div className="flex w-full flex-col items-start gap-1">
          {resolvedSocialLinks.map((link) => (
            <Button
              key={link.cta}
              variant="link"
              language={language}
              cta={link.cta}
              href={link.href}
              target={link.target}
              rel={link.rel}
            />
          ))}
        </div>

        <div className="h-px w-full shrink-0 bg-[#5f5f5f]" />
        {copyrightEl}
      </div>
    </nav>
  );
}
