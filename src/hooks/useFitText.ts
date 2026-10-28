import { useEffect, type RefObject } from "react";

/**
 * Keeps a heading on the screen: if its longest line is wider than the space its parent offers (a long
 * single word such as "MEDCONNECT" in a wide font, on a narrow phone), the font size is reduced a pixel
 * at a time until it fits, but never below `minSize`. A heading that already fits keeps the size from its
 * CSS.
 *
 * It measures against the parent, not the heading itself: an unbreakable word makes the heading as wide
 * as the word, so the heading would always "fit" its own box while sticking out of the page.
 *
 * Pass `text` (anything that changes when the content or its font changes, e.g. the title plus the page
 * direction) so it is measured again. It also re-measures when the parent gets wider or narrower and when
 * the fonts finish loading. Runs in the browser only; the server-rendered page keeps the CSS size.
 */
export function useFitText(ref: RefObject<HTMLElement | null>, text: string, minSize = 28) {
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const availableWidth = () => {
      const style = getComputedStyle(parent);
      return parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    };

    const fit = () => {
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      const range = document.createRange();
      range.selectNodeContents(el);
      const available = availableWidth();
      // The range's width is that of the widest line, also when it overflows the start edge (right-to-left).
      while (size > minSize && range.getBoundingClientRect().width > available + 0.5) {
        size -= 1;
        el.style.fontSize = `${size}px`;
      }
    };

    fit();
    void document.fonts?.ready.then(fit);
    document.fonts?.addEventListener("loadingdone", fit);

    // Re-fit when the available width changes (rotating the phone, resizing the window).
    let lastWidth = parent.clientWidth;
    const observer = new ResizeObserver(() => {
      if (parent.clientWidth !== lastWidth) {
        lastWidth = parent.clientWidth;
        fit();
      }
    });
    observer.observe(parent);

    return () => {
      observer.disconnect();
      document.fonts?.removeEventListener("loadingdone", fit);
      el.style.fontSize = "";
    };
  }, [ref, text, minSize]);
}
