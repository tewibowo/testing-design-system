/* iOS bounces (rubber-bands) the whole document on touch-drag even when
 * nothing is scrollable — in standalone this let the tab bar be visibly
 * dragged down, pulling the entire fixed shell with it. overscroll-behavior
 * on body does not stop this in iOS standalone; the reliable fix is to
 * cancel touchmove unless the gesture happens inside a genuinely scrollable
 * region (lists, sheet bodies), which keep native scrolling and contain
 * their own overscroll.
 */
export function initBounceGuard() {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "touchmove",
    (e) => {
      let el = e.target instanceof Element ? e.target : null;
      while (el && el !== document.documentElement) {
        const canScrollY = el.scrollHeight > el.clientHeight + 1;
        const canScrollX = el.scrollWidth > el.clientWidth + 1;
        if (canScrollY || canScrollX) {
          const cs = getComputedStyle(el);
          if (
            (canScrollY && /(auto|scroll)/.test(cs.overflowY)) ||
            (canScrollX && /(auto|scroll)/.test(cs.overflowX))
          ) {
            return; // real scroller under the finger — let iOS handle it
          }
        }
        el = el.parentElement;
      }
      if (e.cancelable) e.preventDefault();
    },
    { passive: false }
  );
}
