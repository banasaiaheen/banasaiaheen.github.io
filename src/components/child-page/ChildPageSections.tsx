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

const bodyText = "text-regular-20 text-neutral-62";

function SectionHeading({ children }: { children: string }) {
  return <h2 className="w-full text-bold-32 text-brand-cream">{children}</h2>;
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

function GalleryLayout({ title, screens }: GallerySection) {
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {screens.map((screen) => (
          <figure key={screen.caption} className="flex flex-col gap-2">
            {screen.src ? (
              <img
                src={screen.src}
                alt={screen.caption}
                loading="lazy"
                className="aspect-[1440/1024] w-full border border-neutral-16 object-cover"
              />
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
    <div dir={dir} className={cn("flex w-full flex-col gap-[62px] bg-brand-ink p-8 text-start", className)}>
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
