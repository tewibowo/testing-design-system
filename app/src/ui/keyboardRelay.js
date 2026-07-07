/* Keyboard relay — iOS only raises the on-screen keyboard when focus is
 * gained inside a user gesture. Screens mount AFTER the tap that navigates
 * to them, so their inputs can't open the keyboard by themselves.
 *
 * armKeyboard(mode) — call synchronously inside the tap handler that leads
 * to an input screen: focuses an invisible input so the keyboard rises.
 * When the destination input calls .focus() on mount, iOS transfers the
 * keyboard to it seamlessly. If nothing claims focus within 1.5s (flow
 * interrupted), the relay blurs so the keyboard drops again.
 */

let relay = null;
let disarmTimer = null;

export function armKeyboard(mode = "decimal") {
  if (typeof document === "undefined") return;
  if (!relay) {
    relay = document.createElement("input");
    relay.type = "text";
    relay.setAttribute("aria-hidden", "true");
    relay.tabIndex = -1;
    // Visible enough for iOS to honour the focus, invisible to people.
    // 16px font prevents the focus-zoom.
    relay.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;padding:0;border:0;" +
      "opacity:0.01;font-size:16px;background:transparent;color:transparent;" +
      "caret-color:transparent;pointer-events:none;z-index:-1;";
    document.body.appendChild(relay);
    // Once any real input takes over, stop the disarm countdown.
    document.addEventListener(
      "focusin",
      (e) => {
        if (e.target !== relay && disarmTimer) {
          clearTimeout(disarmTimer);
          disarmTimer = null;
        }
      },
      true
    );
  }
  relay.inputMode = mode;
  relay.focus({ preventScroll: true });
  if (disarmTimer) clearTimeout(disarmTimer);
  disarmTimer = setTimeout(() => {
    if (document.activeElement === relay) relay.blur();
    disarmTimer = null;
  }, 1500);
}
