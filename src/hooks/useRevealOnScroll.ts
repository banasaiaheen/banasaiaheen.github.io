import { useEffect } from "react";

/**
 * Scroll-in animation: blocks of content fade in and rise a little the first time they scroll into
 * view. Nothing is wrapped or moved in the markup; this only marks existing elements.
 *
 * Safe by design:
 *  - The built pages are plain, fully visible HTML (search engines, link previews and slow
 *    connections see everything). Only once the page is running is anything below the screen hidden,
 *    and each block is shown again as it comes into view.
 *  - Whatever is already on screen, or above it (a link like /#contact, a refresh part-way down), is
 *    left alone, and so is the home section: the first screen is never delayed.
 *  - Only opacity and a small transform change: no layout shift. Every mark is removed once its
 *    animation has played, so nothing keeps a transform (or a stacking context) afterwards.
 *  - Skipped for visitors who asked for less motion, and when the browser can't observe scrolling.
 *
 * To remove the effect: delete the call in PageLayout and the [data-reveal] rules in src/index.css.
 *
 * Add or change what animates in GROUPS below: [CSS selector, delay in ms between neighbours].
 */
const GROUPS: [selector: string, stagger: number][] = [
  // Home page sections. Section backgrounds stay still; only their content moves.
  ["#about > *", 80],
  ["#experience > div:first-child > h2", 0],
  ["#experience > div:last-child > *", 100],
  ["#education > div:first-child > *", 100],
  ["#education > :not(:first-child)", 0],
  ["#projects > div:first-child", 0],
  ["#projects > div:last-child > *", 100],
  // The Contact section also closes every project page.
  ["#contact > div:first-child > div", 0],
  ["#contact > div:last-child > *", 0],
  // The content sections of a project page (Overview, What I Did, ...).
  ["main section:not([id])", 0],
];

/** The longest delay a stagger may reach, so a long list never makes the last item wait. */
const MAX_DELAY = 300;
/** A little longer than the animation (see index.css), then the marks are cleaned up. */
const CLEANUP_AFTER = 1200;

export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hidden = new Set<HTMLElement>();
    const timers = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.dataset.reveal = "run";
          const timer = window.setTimeout(() => {
            delete el.dataset.reveal;
            el.style.removeProperty("--reveal-delay");
            hidden.delete(el);
            timers.delete(timer);
          }, CLEANUP_AFTER + Number.parseInt(el.style.getPropertyValue("--reveal-delay") || "0", 10));
          timers.add(timer);
        }
      },
      // Fires a little before the block is fully in, so it is already on its way when it arrives.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    for (const [selector, stagger] of GROUPS) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
        // Decorative lettering and anything already on screen (or above it) is left alone.
        if (el.getAttribute("aria-hidden") === "true") return;
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.dataset.reveal = "hidden";
        el.style.setProperty("--reveal-delay", `${Math.min(index * stagger, MAX_DELAY)}ms`);
        hidden.add(el);
        observer.observe(el);
      });
    }

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      // Never leave anything hidden (e.g. when the page unmounts or the effect restarts).
      hidden.forEach((el) => {
        delete el.dataset.reveal;
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
}
