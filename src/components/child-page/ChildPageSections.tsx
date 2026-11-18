import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection, useTranslations } from "../../i18n/useLanguage";
import type { Figure, GallerySection, ListSection, ProjectSection, TextSection } from "../../data/projectPages";

/**
 * Figma: child-page-sections (342:1029) and child-page (375:4161). The stack of
 * content sections of a project page. Each section is one of three layouts,
 * chosen by its `kind`:
 *
 *  text     a title and paragraphs (Overview, Outcome, ...)
 *  list     a title and numbered items (What I Did, ...)
 *  gallery  a title and screens with captions (Selected Screens)
 *
 * A text section or a list item can also show a `figure` (16:9 image) and a list item a `video`,
 * with a caption, under its text.
 *
 * Content comes from src/data/projectPages.ts.
 */
export interface ChildPageSectionsProps {
  sections: ProjectSection[];
  direction?: Direction;
  className?: string;
}

// Body text is regular/18 on responsive and regular/20 on desktop (Figma child-page-sections).
const bodyText = "text-regular-18 text-neutral-62 lg:text-regular-20";

function SectionHeading({ children }: { children: string }) {
  return <h2 className="w-full text-bold-24 text-brand-cream lg:text-bold-32">{children}</h2>;
}

function TextLayout({ title, paragraphs, figure }: TextSection) {
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <div className={cn("flex w-full flex-col gap-4", bodyText)}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {figure && <FigureBlock {...figure} />}
    </>
  );
}

function ListLayout({ title, items }: ListSection) {
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <div className="flex w-full flex-col gap-6">
        {items.map((item, i) => (
          <div key={item.title} className="flex w-full flex-col gap-4 border-b border-neutral-16 pb-6">
            <div className="flex w-full items-center gap-4">
              {/* Item numbers stay Latin digits (en-font) in Arabic too. */}
              <span className="font-[family-name:var(--font-en)] text-[16px] text-brand-red-bright">
                {String(i).padStart(2, "0")}
              </span>
              <h3 className="min-w-0 flex-1 text-bold-20 text-brand-cream">{item.title}</h3>
            </div>
            <p className={cn("w-full", bodyText)}>{item.body}</p>
            {item.figure && <FigureBlock {...item.figure} />}
            {item.video && <FigureBlock {...item.video} video />}
          </div>
        ))}
      </div>
    </>
  );
}

const MAX_IMAGE_RETRIES = 3;

/**
 * A gallery screen. It loads straight away (no lazy loading, which can leave
 * images unrequested when the page is long or the connection hiccups) and, if the
 * request fails, retries a few times with a short delay before giving up. The
 * panel behind it shows while the image loads.
 */
function GalleryImage({ src, alt, ratio = "aspect-[1440/1024]" }: { src: string; alt: string; ratio?: string }) {
  const t = useTranslations();
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);
  const [enlarged, setEnlarged] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Stable, so the Lightbox's effect (scroll lock, focus) does not restart on every render.
  const close = useCallback(() => {
    setEnlarged(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!failed || attempt >= MAX_IMAGE_RETRIES) return;
    const timer = setTimeout(() => {
      setFailed(false);
      setAttempt((n) => n + 1);
    }, 800 * (attempt + 1));
    return () => clearTimeout(timer);
  }, [failed, attempt]);

  return (
    <>
      {/* Clicking the image shows it large, whole and uncropped (see Lightbox). */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setEnlarged(true)}
        aria-haspopup="dialog"
        aria-label={`${t.childPage.enlargeImage}: ${alt}`}
        className="block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-bright"
      >
        <img
          // A changed URL makes the browser request the file again instead of reusing the failed one.
          src={attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`}
          alt=""
          decoding="async"
          onError={() => setFailed(true)}
          className={cn(ratio, "w-full border border-neutral-16 bg-brand-panel object-cover")}
        />
      </button>
      {enlarged && <Lightbox src={src} alt={alt} onClose={close} />}
    </>
  );
}

/**
 * The enlarged view of a gallery image: the whole picture on a dark backdrop. Closes on a click anywhere,
 * the close button or Escape. The page behind does not scroll while it is open (only <html> is locked,
 * like the mobile menu in Navigation, so the sticky bars keep working).
 */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const t = useTranslations();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    // On a phone the image is wider than the screen (see below): start in the middle of it.
    const pan = panRef.current;
    if (pan) {
      const overflow = pan.scrollWidth - pan.clientWidth;
      pan.scrollLeft = getComputedStyle(pan).direction === "rtl" ? -overflow / 2 : overflow / 2;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // In a portal on <body>, so no animated or transformed ancestor can trap the fixed backdrop.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 lg:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t.childPage.closeImage}
        className="absolute end-4 top-4 z-10 flex size-10 items-center justify-center bg-black/60 text-brand-cream focus-visible:outline-2 focus-visible:outline-brand-red-bright lg:end-8 lg:top-8"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>
      {/* On a phone the picture is shown larger than the screen, so small text can be read, and the
          visitor pans across it; from lg up it is simply scaled to fit the whole screen. */}
      <div ref={panRef} className="max-h-full max-w-full overflow-auto overscroll-contain lg:contents">
        <img
          src={src}
          alt={alt}
          className="block h-auto w-[1280px] max-w-none border border-neutral-16 object-contain lg:max-h-full lg:w-auto lg:max-w-full"
        />
      </div>
    </div>,
    document.body,
  );
}

/**
 * A full-width 16:9 picture, or a video with controls, with its caption under it (same frame and
 * caption style as the gallery). The video only loads its first frame until it is played.
 */
function FigureBlock({ src, caption, video }: Figure & { video?: boolean }) {
  return (
    <figure className="flex w-full flex-col gap-2">
      {video ? (
        <video
          src={`${src}#t=0.1`}
          controls
          playsInline
          preload="metadata"
          aria-label={caption}
          className="aspect-video w-full border border-neutral-16 bg-brand-panel"
        />
      ) : (
        <GalleryImage src={src} alt={caption} ratio="aspect-video" />
      )}
      <figcaption className="text-regular-14 text-neutral-48">{caption}</figcaption>
    </figure>
  );
}

function GalleryLayout({ title, screens }: GallerySection) {
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {screens.map((screen) => (
          <figure key={screen.caption} className="flex flex-col gap-2">
            {screen.src ? (
              <GalleryImage src={screen.src} alt={screen.caption} />
            ) : (
              <div aria-hidden="true" className="aspect-[1440/1024] w-full border border-neutral-16 bg-brand-panel" />
            )}
            <figcaption className="text-regular-14 text-neutral-48">{screen.caption}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

export default function ChildPageSections({ sections, direction, className }: ChildPageSectionsProps) {
  const dir = useDirection(direction);
  return (
    <div dir={dir} className={cn("flex w-full flex-col gap-10 bg-brand-ink px-4 py-8 text-start lg:gap-[62px] lg:p-8", className)}>
      {sections.map((section) => (
        <section key={section.title} className="flex w-full flex-col items-start gap-6">
          {section.kind === "text" && <TextLayout {...section} />}
          {section.kind === "list" && <ListLayout {...section} />}
          {section.kind === "gallery" && <GalleryLayout {...section} />}
        </section>
      ))}
    </div>
  );
}
