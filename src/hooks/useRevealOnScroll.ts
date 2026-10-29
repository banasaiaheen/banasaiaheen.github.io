import { useEffect } from "react";

/**
 * Scroll-in animation: blocks of content fade in and rise a little as they scroll into view from the
 * bottom of the screen. Nothing is wrapped or moved in the markup; this only marks existing elements.
 *
 * It plays on the way down, not on the way up: scrolling up shows content that has already been seen
 * as it is. Once a block has gone completely off the bottom of the screen (you scrolled back up past
 * it), it is armed again and animates again when you scroll back down to it.
 *
 * Safe by design:
 *  - The built pages are plain, fully visible HTML (search engines, link previews and slow
 *    connections see everything). Only once the page is running is anything below the screen hidden,
 *    and each block is shown again as it comes into view.
 *  - Whatever is already on screen, or above it (a link like /#contact, a refresh part-way down), is
 *    left alone, and so is the home section: the first screen is never delayed.
 *  - Only opacity and a small transform change: no layout shift. The marks are removed as soon as an
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
/** A little longer than the animation (950ms in index.css), then the animation mark is removed. */
const CLEANUP_AFTER = 1400;

export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = new Set<HTMLElement>();
    const timers = new Map<HTMLElement, number>();

    const stopTimer = (el: HTMLElement) => {
      const timer = timers.get(el);
      if (timer === undefined) return;
      window.clearTimeout(timer);
      timers.delete(el);
    };

    /** Hide a block (it is off screen) so that it animates in when it next arrives. */
    const arm = (el: HTMLElement) => {
      stopTimer(el);
      el.dataset.reveal = "hidden";
    };

    // A block coming up into the screen from below starts its animation a little before it is fully in.
    const enterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (!entry.isIntersecting || el.dataset.reveal !== "hidden") continue;
          el.dataset.reveal = "run";
          stopTimer(el);
          const delay = Number.parseInt(el.style.getPropertyValue("--reveal-delay") || "0", 10);
          timers.set(
            el,
            window.setTimeout(() => {
              delete el.dataset.reveal;
              timers.delete(el);
            }, CLEANUP_AFTER + delay),
          );
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    // A block that has left the screen completely through the bottom (scrolled back up past it) is armed
    // again. One that left through the top stays as it is, so scrolling up never hides or replays anything.
    const leaveObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) continue;
        if (el.dataset.reveal !== "hidden") arm(el);
      }
    });

    for (const [selector, stagger] of GROUPS) {
      document.querySelectorAll<HTMLElement>(selector).forEach((el, index) => {
        // Decorative lettering is left alone.
        if (el.getAttribute("aria-hidden") === "true" || targets.has(el)) return;
        targets.add(el);
        el.style.setProperty("--reveal-delay", `${Math.min(index * stagger, MAX_DELAY)}ms`);
        // Anything already on screen (or above it) starts out visible; the rest waits to be revealed.
        if (el.getBoundingClientRect().top >= window.innerHeight) arm(el);
        enterObserver.observe(el);
        leaveObserver.observe(el);
      });
    }

    return () => {
      enterObserver.disconnect();
      leaveObserver.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      // Never leave anything hidden (e.g. when the page unmounts or the effect restarts).
      targets.forEach((el) => {
        delete el.dataset.reveal;
        el.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
}
