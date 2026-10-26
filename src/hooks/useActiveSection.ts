import { useEffect, useState } from "react";
import { SECTION_IDS, type SectionId } from "../data/navigation";

/** Tracks which page section is currently centered in the viewport, for nav highlighting. */
export function useActiveSection(): SectionId {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTION_IDS[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
