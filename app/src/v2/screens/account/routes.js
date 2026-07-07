// v2 account-area route registry. The tab root (V2AccountTab) is a named
// component export consumed by V2RootTabs, not a route; every quick surface
// is a sheet. The one push §2.7 specifies is the profile detail.
import { V2AccountProfileScreen } from "./V2AccountProfileScreen.jsx";

export const v2AccountRoutes = {
  "v2/account/profile": V2AccountProfileScreen
};
