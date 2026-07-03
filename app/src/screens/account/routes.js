// Account-area route registry. AccountTab is a tab-root component
// (named export from ./AccountTab.jsx), not a route.
import { BanksAddScreen } from "./BanksAddScreen.jsx";
import { BanksVerifyScreen } from "./BanksVerifyScreen.jsx";

export const accountRoutes = {
  "account/banks-add": BanksAddScreen,
  "account/banks-verify": BanksVerifyScreen
};
