// v2 auth area routes. "v2/lock" is the canonical initial screen
// (BUILDERS-V2.md): passcode + biometric unlock per brief §2.6. The email
// fallback is sheet-only (EmailFallbackSheet in LockScreen.jsx), not a route.
import { LockScreen } from "./LockScreen.jsx";

export const v2AuthRoutes = {
  "v2/lock": LockScreen
};
