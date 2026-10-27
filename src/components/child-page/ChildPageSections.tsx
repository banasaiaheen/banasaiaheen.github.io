import { useEffect, useState } from "react";
import type { Direction } from "../../types/language";
import { cn } from "../../utils/cn";
import { useDirection } from "../../i18n/useLanguage";
import type { GallerySection, ListSection, ProjectSection, TextSection } from "../../data/projectPages";

/**
 * Figma: child-page-sections (342:1029) and child-page (375:4161). The stack of
 * content sections of a project page. Each section is one of three layouts,
 * chosen by its `kind`:
 *
 *  text     a title and paragraphs (Overview, Outcome, ...)
 *  list     a title and numbered items (What I Did, ...)
 *  gallery  a title and screens with captions (Selected Screens)
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

function TextLayout({ title, paragraphs }: TextSection) {
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <div className={cn("flex w-full flex-col gap-4", bodyText)}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
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
function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [attempt, setAttempt] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!failed || attempt >= MAX_IMAGE_RETRIES) return;
    const timer = setTimeout(() => {
      setFailed(false);
      setAttempt((n) => n + 1);
    }, 800 * (attempt + 1));
    return () => clearTimeout(timer);
  }, [failed, attempt]);

  return (
    <img
      // A changed URL makes the browser request the file again instead of reusing the failed one.
      src={attempt === 0 ? src : `${src}${src.includes("?") ? "&" : "?"}retry=${attempt}`}
      alt={alt}
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-[1440/1024] w-full border border-neutral-16 bg-brand-panel object-cover"
    />
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
