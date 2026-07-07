// Blockchain-area route registry. Canonical cross-area routes (BUILDERS.md):
// "blockchain/add" and "blockchain/verify" — pushed from account, transfers
// and anywhere else. The rest are internal to this area.
import { ListScreen } from "./ListScreen.jsx";
import { AddMethodScreen } from "./AddMethodScreen.jsx";
import { AddManualScreen } from "./AddManualScreen.jsx";
import { WalletLinkScreen } from "./WalletLinkScreen.jsx";
import { WalletQrScreen } from "./WalletQrScreen.jsx";
import { VerifyScreen } from "./VerifyScreen.jsx";

export const blockchainRoutes = {
  "blockchain/list": ListScreen,
  "blockchain/add": AddMethodScreen,
  "blockchain/add-manual": AddManualScreen,
  "blockchain/wallet-link": WalletLinkScreen,
  "blockchain/wallet-qr": WalletQrScreen,
  "blockchain/verify": VerifyScreen
};
