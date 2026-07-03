import { TransferInScreen } from "./TransferInScreen.jsx";
import { TransferOutScreen } from "./TransferOutScreen.jsx";

export const transferRoutes = {
  "transfers/in": TransferInScreen,
  "transfers/out": TransferOutScreen
};

// Alias for integrators expecting the `<area>Routes` naming convention.
export const transfersRoutes = transferRoutes;
