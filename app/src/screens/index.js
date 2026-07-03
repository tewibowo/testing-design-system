// Screen registry — all flow areas merged. Names are "<area>/<name>"
// (see app/BUILDERS.md for the canonical route table).
import { RootTabs } from "@app/screens/root/RootTabs.jsx";
import { authRoutes } from "@app/screens/auth/routes.js";
import { homeRoutes } from "@app/screens/home/routes.js";
import { transferRoutes } from "@app/screens/transfers/routes.js";
import { mintswapRoutes } from "@app/screens/mintswap/routes.js";
import { accountRoutes } from "@app/screens/account/routes.js";
import { blockchainRoutes } from "@app/screens/blockchain/routes.js";
import { historyRoutes } from "@app/screens/history/routes.js";

export const INITIAL_SCREEN = "auth/login";

export const screens = {
  "root/tabs": RootTabs,
  ...authRoutes,
  ...homeRoutes,
  ...transferRoutes,
  ...mintswapRoutes,
  ...accountRoutes,
  ...blockchainRoutes,
  ...historyRoutes
};
