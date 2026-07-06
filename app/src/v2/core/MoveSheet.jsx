import { useState } from "react";
import { motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";

const ACTIONS = [
  {
    icon: "add",
    label: "Deposit",
    desc: "Add funds by bank transfer or blockchain",
    method: true
  },
  {
    icon: "arrow_outward",
    label: "Withdraw",
    desc: "Send funds to a bank or wallet",
    route: "v2/withdraw"
  },
  {
    icon: "swap_vert",
    label: "Swap",
    desc: "Exchange between your assets",
    route: "v2/swap"
  },
  {
    icon: "toll",
    label: "Mint",
    desc: "Mint XSGD via FAST bank transfer",
    route: "v2/mint"
  }
];

const DEPOSIT_METHODS = [
  {
    icon: "account_balance",
    label: "Bank transfer (FAST)",
    desc: "Free · Instant · Up to 200,000 SGD per transaction",
    route: "v2/deposit/bank"
  },
  {
    icon: "qr_code",
    label: "Blockchain deposit",
    desc: "Receive stablecoins to your StraitsX address",
    route: "v2/deposit/blockchain"
  }
];

/**
 * Global money-movement sheet content (brief §2.8): four action rows; the
 * Deposit row swaps in a method chooser (§2.3) before pushing a branch.
 * Rendered via SheetProvider; `close` comes from the sheet host.
 */
export function MoveSheetContent({ close }) {
  const nav = useNav();
  const [mode, setMode] = useState("actions");
  const rows = mode === "actions" ? ACTIONS : DEPOSIT_METHODS;

  const onRow = (row) => {
    if (row.method) {
      setMode("deposit");
      return;
    }
    close();
    nav.push(row.route);
  };

  return (
    <motion.div variants={listContainer} initial="initial" animate="enter" key={mode}>
      <div className="v2-move__title">
        {mode === "actions" ? "Move money" : "Deposit"}
      </div>
      {rows.map((row) => (
        <motion.button
          key={row.label}
          variants={listItem}
          {...pressable}
          className="v2-move__row"
          onClick={() => onRow(row)}
        >
          <span className="v2-move__icon">
            <span className="material-symbols-rounded">{row.icon}</span>
          </span>
          <span>
            <div className="v2-move__label">{row.label}</div>
            <div className="v2-move__desc">{row.desc}</div>
          </span>
          <span className="material-symbols-rounded v2-move__chev">chevron_right</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
