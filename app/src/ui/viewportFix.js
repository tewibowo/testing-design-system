/* iOS standalone sometimes lays the app out in a viewport SHORTER than the
 * physical screen (status-bar sizing bug, ~47pt). The app must NOT lay out
 * beyond that reported viewport — iOS either clips the window there, or
 * treats the overflow as pannable (the shell drags like a loose sheet).
 * The strip below blends via the page canvas color instead. The one layout
 * correction needed is flagged through the `vp-short` class: the safe-area
 * inset zeroes out, since the viewport edge already clears the home
 * indicator (see app.css).
 *
 * Re-evaluated on resize so if iOS corrects the viewport mid-session the
 * normal insets come back live.
 */
export function initViewportFix() {
  if (typeof window === "undefined") return;
  const standalone =
    window.navigator.standalone === true ||
    window.matchMedia?.("(display-mode: standalone)").matches;
  if (!standalone) return; // in-browser Safari manages its own chrome

  const root = document.documentElement;
  const apply = () => {
    // Orientation-safe: only treat as broken when we're clearly fullscreen
    // portrait (iPad split view and landscape never qualify).
    const portraitFull = window.innerWidth === window.screen.width;
    const short = portraitFull && window.innerHeight < window.screen.height - 1;
    root.classList.toggle("vp-short", short);
  };
  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  window.visualViewport?.addEventListener("resize", apply);
}
