// blockchain/add — "Link Blockchain Address" method chooser (spec A2).
// Radio option cards per spec; Continue routes to the wallet flow (A3 sheet →
// "Select your chain" sheet → MetaMask stub or WalletConnect QR) or the
// manual-add form (A4).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { networks } from "@app/data/db.js";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { SelectionBox } from "@ds/components/SelectionBox/SelectionBox.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import {
  useFlowToast,
  SheetHeader,
  PickerSheet,
  networkOptions
} from "./shared.jsx";
import "./blockchain.css";

// "Select your chain" lists the EVM set from Screen A1 (spec A5 note).
const EVM_NETWORKS = networks.filter((n) => n.name !== "Solana");

const stepSwap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }
};

/* Wallet flow sheet: "Select a wallet" (A3) → "Select your chain" (behind A5).
 * Owns its step state; reports (provider, chain) via onDone. */
function WalletFlowSheet({ close, onDone }) {
  const [step, setStep] = useState("wallet");
  const [provider, setProvider] = useState(null);
  const { toastEl, showToast } = useFlowToast("sheet");

  const pick = (name) => {
    setProvider(name);
    setStep("chain");
  };

  return (
    <div className="blockchain-sheet">
      {toastEl}
      <AnimatePresence mode="popLayout" initial={false}>
        {step === "wallet" ? (
          <motion.div key="wallet" {...stepSwap}>
            <SheetHeader title="Select a wallet" onClose={close} />
            <p className="blockchain-caption">
              By connecting a wallet, I agree to StraitsX{" "}
              <LinkButton
                size="sm"
                className="blockchain-link"
                onClick={() => showToast("Available in the full app", "info")}
              >
                Terms of Service
              </LinkButton>
              .
            </p>
            <motion.div
              className="blockchain-provider-list"
              variants={listContainer}
              initial="initial"
              animate="enter"
            >
              {[
                { name: "MetaMask", asset: "METAMASK" },
                { name: "WalletConnect", asset: "WALLETCONNECT" }
              ].map((p) => (
                <motion.div key={p.name} variants={listItem}>
                  <motion.button
                    {...pressable}
                    type="button"
                    className="blockchain-provider-row"
                    onClick={() => pick(p.name)}
                  >
                    <AssetMark asset={p.asset} size={40} />
                    <span className="blockchain-provider-row__name">{p.name}</span>
                    <span className="blockchain-provider-row__est">Est. 2 mins</span>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
            <p className="blockchain-sheet-foot">
              <strong>Don&rsquo;t see your wallet provider?</strong> Please{" "}
              <LinkButton
                size="sm"
                className="blockchain-link"
                onClick={() => showToast("Available in the full app", "info")}
              >
                inform us
              </LinkButton>{" "}
              for future improvement.
            </p>
          </motion.div>
        ) : (
          <motion.div key="chain" {...stepSwap}>
            <PickerSheet
              title="Select your chain"
              options={networkOptions(EVM_NETWORKS)}
              onSelect={(o) => onDone(provider, o.name)}
              close={close}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AddMethodScreen() {
  const nav = useNav();
  const { openSheet, closeSheet } = useSheet();
  const { toastEl, showToast } = useFlowToast();
  const [method, setMethod] = useState(null); // "wallet" | "manual"

  const startWalletFlow = () => {
    openSheet(({ close }) => (
      <WalletFlowSheet
        close={close}
        onDone={(provider, chain) => {
          closeSheet();
          if (provider === "WalletConnect") {
            nav.push("blockchain/wallet-qr", { chain });
          } else {
            nav.push("blockchain/wallet-link", { provider, chain });
          }
        }}
      />
    ));
  };

  const continueFlow = () => {
    if (method === "manual") nav.push("blockchain/add-manual");
    else if (method === "wallet") startWalletFlow();
  };

  return (
    <>
      {toastEl}
      <AppHeader title="Link Blockchain Address" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <div className="blockchain-method-list">
            <motion.div variants={listItem}>
              <SelectionBox
                type="radio"
                name="blockchain-link-method"
                value="wallet"
                selected={method === "wallet"}
                onChange={() => setMethod("wallet")}
                icon={
                  <span className="blockchain-method-ico">
                    <span className="material-symbols-rounded">account_balance_wallet</span>
                  </span>
                }
                label={
                  <>
                    Link with your wallet
                    <Tag tone="positive" appearance="filled" size="small">
                      New
                    </Tag>
                  </>
                }
                description="Connect your private wallet (e.g Metamask, WalletConnect)"
              />
            </motion.div>
            <motion.div variants={listItem}>
              <SelectionBox
                type="radio"
                name="blockchain-link-method"
                value="manual"
                selected={method === "manual"}
                onChange={() => setMethod("manual")}
                icon={
                  <span className="blockchain-method-ico">
                    <span className="material-symbols-rounded">edit_note</span>
                  </span>
                }
                label="Link your address manually"
                description="A manual way to add your own blockchain address."
              />
            </motion.div>
          </div>
          <motion.p variants={listItem} className="blockchain-caption blockchain-footnote">
            New to Blockchain Addresses?{" "}
            <LinkButton
              size="sm"
              className="blockchain-link"
              onClick={() => showToast("Available in the full app", "info")}
            >
              Learn more
            </LinkButton>
          </motion.p>
        </motion.div>
      </div>
      <div className="cta-bar">
        <Button variant="primary" size="lg" disabled={!method} onClick={continueFlow}>
          Continue
        </Button>
      </div>
    </>
  );
}
