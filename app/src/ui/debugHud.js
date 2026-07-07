/* TEMPORARY diagnostic overlay for the iOS bottom-strip investigation.
 * Always on for now; remove once the viewport behavior is confirmed.
 *
 * Reading a device screenshot of this HUD:
 * - The HUD anchors to `bottom: 8px` of the LAYOUT viewport. If it floats
 *   ABOVE the white strip, the strip is beyond-viewport canvas paint (iOS
 *   sized the app short). If it hugs the physical screen bottom, the strip
 *   is inside the layout — i.e. real padding somewhere in the tab bar.
 * - `build` proves which deploy the service worker is serving.
 */
export function initDebugHud() {
  if (typeof window === "undefined") return;

  const el = document.createElement("div");
  el.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:2147483647;" +
    "background:rgba(0,0,0,0.72);color:#4ade80;" +
    "font:10px/1.5 ui-monospace,Menlo,monospace;" +
    "padding:6px 9px;border-radius:8px;pointer-events:none;" +
    "white-space:pre;max-width:70vw";

  // env() probe: computed padding exposes what iOS reports for the insets.
  const probe = document.createElement("div");
  probe.style.cssText =
    "position:fixed;top:0;left:0;width:0;height:0;visibility:hidden;" +
    "padding-top:env(safe-area-inset-top,0px);" +
    "padding-bottom:env(safe-area-inset-bottom,0px)";

  const attach = () => {
    document.body.appendChild(probe);
    document.body.appendChild(el);
    update();
    setInterval(update, 1000);
  };

  const rect = (sel) => {
    const n = document.querySelector(sel);
    if (!n) return "-";
    const r = n.getBoundingClientRect();
    return `${Math.round(r.width)}x${Math.round(r.height)} top${Math.round(r.top)} btm${Math.round(r.bottom)}`;
  };

  const update = () => {
    const cs = getComputedStyle(probe);
    const vv = window.visualViewport;
    const standalone =
      window.navigator.standalone === true ||
      window.matchMedia?.("(display-mode: standalone)").matches;
    el.textContent = [
      `build ${typeof __BUILD_ID__ !== "undefined" ? __BUILD_ID__ : "?"}`,
      `inner ${window.innerWidth}x${window.innerHeight}`,
      `screen ${window.screen.width}x${window.screen.height}`,
      `vv ${vv ? `${Math.round(vv.width)}x${Math.round(vv.height)} ot${Math.round(vv.offsetTop)}` : "-"}`,
      `env top ${cs.paddingTop} btm ${cs.paddingBottom}`,
      `standalone ${standalone} vp-short ${document.documentElement.classList.contains("vp-short")}`,
      `device ${rect(".device")}`,
      `tabbar ${rect(".tabbar, .v2-tabbar")}`
    ].join("\n");
  };

  if (document.body) attach();
  else window.addEventListener("DOMContentLoaded", attach);
}
