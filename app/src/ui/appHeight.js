/* iOS standalone PWAs can compute 100dvh stale on cold launch (shorter
 * than the real viewport until the first scroll), leaving a background
 * band under the app. window.innerHeight is correct from the first frame,
 * so mirror it into --app-h and let the shell size from that.
 *
 * The on-screen keyboard does NOT change innerHeight on iOS (it overlays),
 * so this never fights the sheet's keyboard lift.
 */
export function initAppHeight() {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const set = () => root.style.setProperty("--app-h", `${window.innerHeight}px`);
  set();
  window.addEventListener("resize", set);
  window.addEventListener("orientationchange", set);
  // Some iOS versions only report the corrected height via visualViewport.
  window.visualViewport?.addEventListener("resize", () => {
    // Ignore keyboard-driven shrink: only grow or match innerHeight.
    set();
  });
}
