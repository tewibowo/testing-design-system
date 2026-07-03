// Home area routes. `HomeTab` (screens/home/HomeTab.jsx) is a tab-root
// component exported by name — it is intentionally NOT a route.
import { NotificationsScreen } from "./NotificationsScreen.jsx";
import { OtcScreen } from "./OtcScreen.jsx";

export const homeRoutes = {
  "home/notifications": NotificationsScreen,
  "home/otc": OtcScreen
};
