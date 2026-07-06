// V2 screen registry — all areas merged (see app/BUILDERS-V2.md).
import { V2RootTabs } from "@app/v2/core/V2RootTabs.jsx";
import { v2AuthRoutes } from "@app/v2/screens/auth/routes.js";
import { v2HomeRoutes } from "@app/v2/screens/home/routes.js";
import { v2SwapmintRoutes } from "@app/v2/screens/swapmint/routes.js";
import { v2MoveflowsRoutes } from "@app/v2/screens/moveflows/routes.js";
import { v2ActivityRoutes } from "@app/v2/screens/activity/routes.js";
import { v2AccountRoutes } from "@app/v2/screens/account/routes.js";

export const V2_INITIAL_SCREEN = "v2/lock";

export const v2screens = {
  "v2/root": V2RootTabs,
  ...v2AuthRoutes,
  ...v2HomeRoutes,
  ...v2SwapmintRoutes,
  ...v2MoveflowsRoutes,
  ...v2ActivityRoutes,
  ...v2AccountRoutes
};
