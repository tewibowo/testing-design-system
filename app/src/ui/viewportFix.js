/* iOS standalone sometimes lays the app out in a viewport SHORTER than the
 * physical screen (status-bar / home-indicator sizing bug) — fixed inset: 0
 * then stops ~50pt above the bottom, and iOS extends the page canvas color
 * into the remaining strip, which reads as a colored band or an oversized
 * tab bar. The page still paints into that region, so when the short
 * viewport is detected (standalone, full-width portrait, innerHeight below
 * screen.height) the shell is sized to the real screen height, and the
 * home-indicator inset iOS under-reports in that state is restored.
 *
 * The class is re-evaluated on resize so if iOS corrects the viewport
 * mid-session the shell drops back to plain inset sizing.
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
    const gap = short ? window.screen.height - window.innerHeight : 0;
    root.style.setProperty("--screen-h", `${window.screen.height}px`);
    // How far the reported viewport falls short of the screen. Bottom chrome
    // anchors to the viewport edge via this gap: iOS sometimes CLIPS the
    // window at that edge (painting system white below), so anything
    // positioned beyond it is simply cut off.
    root.style.setProperty("--vp-gap", `${gap}px`);
    root.classList.toggle("vp-short", short);
  };
  apply();
  window.addEventListener("resize", apply);
  window.addEventListener("orientationchange", apply);
  window.visualViewport?.addEventListener("resize", apply);
}
