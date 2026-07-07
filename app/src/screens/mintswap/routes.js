// Mintswap area routes. Canonical names per BUILDERS.md:
//   "mintswap/swap" — swap screen
//   "mintswap/mint" — mint entry (routes to Setup internally if unconfigured)
// Internal:
//   "mintswap/mint-setup" — Mint Setup pushed from "Edit Settings"
import { SwapScreen } from "./SwapScreen.jsx";
import { MintScreen } from "./MintScreen.jsx";
import { MintSetupScreen } from "./MintSetup.jsx";

export const mintswapRoutes = {
  "mintswap/swap": SwapScreen,
  "mintswap/mint": MintScreen,
  "mintswap/mint-setup": MintSetupScreen
};
