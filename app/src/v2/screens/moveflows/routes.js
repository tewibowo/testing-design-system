// Moveflows area routes — the three canonical v2 money-movement routes
// (BUILDERS-V2.md). Withdraw's amount and review steps re-push "v2/withdraw"
// with a `step` param, so no extra route names are needed.
import { V2WithdrawScreen } from "./V2WithdrawScreen.jsx";
import { V2DepositBankScreen } from "./V2DepositBankScreen.jsx";
import { V2DepositBlockchainScreen } from "./V2DepositBlockchainScreen.jsx";

export const v2MoveflowsRoutes = {
  "v2/withdraw": V2WithdrawScreen,
  "v2/deposit/bank": V2DepositBankScreen,
  "v2/deposit/blockchain": V2DepositBlockchainScreen
};
