/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — WalletConnect QR (spec A5)
 *     0ms   dark panel is the pushed screen (shell slide-in)
 *    40ms   title, tabs, QR and wallet tiles stagger in (50ms)
 *   tile    tap → connecting stage swaps in (exit 130ms), dots breathe
 *  ~1600ms  approve — background eases to light, SuccessState check draws;
 *           store gains a Verified wallet card (MetaMask-card pattern)
 * ──────────────────────────────────────────────── */

// blockchain/wallet-qr — the WalletConnect pairing modal adapted as a
// full-height dark screen (spec A5 mobile adaptation). Keeps WalletConnect's
// dark branding + #3396ff accents; intentionally NOT StraitsX tokens.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { QR } from "@ds/components/QR/QR.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { PartnerLogo } from "@ds/components/PartnerLogo/PartnerLogo.jsx";
import { addWalletAddress } from "./addressStore.js";
import { useFlowToast, copyText, AddrChip, PickerSheet, PulseDots } from "./shared.jsx";
import "./blockchain.css";

// Dummy pairing URI (spec A5 §4).
const WC_URI = "wc:00000000-demo-pairing-uri@2?relay-protocol=irn&symKey=demo";

// Desktop shortcut row (spec A5 §6): Binance, SafePal, Fireblocks, View All.
const TILES = [
  { name: "Binance", mod: "dark", node: (s) => <PartnerLogo name="binance" size={s} /> },
  { name: "SafePal", mod: "safepal", node: () => <span className="blockchain-wc__tile-letter">S</span> },
  { name: "Fireblocks", mod: "dark", node: (s) => <PartnerLogo name="fireblocks" size={s} /> }
];

// "View All" contents were not captured — builder-invented wallet list.
const MORE_WALLETS = [
  { key: "Trust Wallet", name: "Trust Wallet", mark: <AssetMark label="T" color="#3375bb" size={32} /> },
  { key: "Ledger Live", name: "Ledger Live", mark: <AssetMark label="L" color="#000000" size={32} /> },
  { key: "Rainbow", name: "Rainbow", mark: <AssetMark label="R" color="#001e59" size={32} /> },
  { key: "Zerion", name: "Zerion", mark: <AssetMark label="Z" color="#2461ed" size={32} /> }
];

export function WalletQrScreen({ params = {} }) {
  const nav = useNav();
  const { openSheet, closeSheet } = useSheet();
  const { toastEl, showToast } = useFlowToast();
  const chain = params.chain || "Ethereum";

  const [tab, setTab] = useState("mobile"); // mobile | scan
  const [connecting, setConnecting] = useState(null); // wallet name while pairing
  const [linked, setLinked] = useState(null); // store row once approved

  // Fake wallet approval ~1.6s after a wallet is picked.
  useEffect(() => {
    if (!connecting) return undefined;
    const t = setTimeout(() => {
      setLinked(addWalletAddress({ provider: connecting, chain }));
      setConnecting(null);
    }, 1600);
    return () => clearTimeout(t);
  }, [connecting, chain]);

  const copyUri = async () => {
    await copyText(WC_URI);
    showToast("Pairing link copied");
  };

  const viewAll = () =>
    openSheet(({ close }) => (
      <PickerSheet
        title="All wallets"
        options={MORE_WALLETS}
        onSelect={(o) => {
          closeSheet();
          setConnecting(o.name);
        }}
        close={close}
      />
    ));

  const stage = linked ? "linked" : connecting ? "connecting" : "qr";

  return (
    <div className={"blockchain-wc" + (linked ? " is-linked" : "")}>
      {toastEl}
      <div className="blockchain-wc__head">
        <motion.button
          {...pressable}
          type="button"
          className="blockchain-wc__back"
          aria-label="Back"
          onClick={() => nav.pop()}
        >
          <span className="material-symbols-rounded" aria-hidden="true">arrow_back_ios_new</span>
        </motion.button>
        <span className="blockchain-wc__brand">
          <PartnerLogo name="walletconnect" size={22} />
          WalletConnect
        </span>
        <motion.button
          {...pressable}
          type="button"
          className="blockchain-wc__help"
          aria-label="Help"
          onClick={() => showToast("WalletConnect help opens in the live app", "info")}
        >
          ?
        </motion.button>
      </div>

      <div className="screen-scroll">
        <AnimatePresence mode="popLayout" initial={false}>
          {stage === "qr" && (
            <motion.div
              key="qr"
              className="blockchain-wc__panel"
              variants={listContainer}
              initial="initial"
              animate="enter"
              exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
            >
              <motion.div variants={listItem} className="blockchain-wc__title-row">
                <h2 className="blockchain-wc__title">Connect your wallet</h2>
                <motion.button
                  {...pressable}
                  type="button"
                  className="blockchain-wc__copy"
                  aria-label="Copy pairing link"
                  onClick={copyUri}
                >
                  <span className="material-symbols-rounded" aria-hidden="true">content_copy</span>
                </motion.button>
              </motion.div>

              <motion.div variants={listItem} className="blockchain-wc__tabs">
                <button
                  type="button"
                  className={"blockchain-wc__tab" + (tab === "mobile" ? " is-active" : "")}
                  onClick={() => setTab("mobile")}
                >
                  <span className="material-symbols-rounded" aria-hidden="true">smartphone</span>
                  Mobile
                </button>
                <button
                  type="button"
                  className={"blockchain-wc__tab" + (tab === "scan" ? " is-active" : "")}
                  onClick={() => setTab("scan")}
                >
                  <span className="material-symbols-rounded" aria-hidden="true">qr_code_scanner</span>
                  Scan with your wallet
                </button>
              </motion.div>

              <motion.div variants={listItem} className="blockchain-wc__qr">
                <QR value={WC_URI} size={224} />
                <span className="blockchain-wc__qr-badge">
                  <PartnerLogo name="walletconnect" size={30} />
                </span>
              </motion.div>
              <motion.p variants={listItem} className="blockchain-wc__scan-hint">
                {tab === "mobile"
                  ? `Scan the QR code with your wallet app on another device to connect on ${chain}, or pick a wallet below.`
                  : "Open your wallet app, choose WalletConnect and scan this code to approve the connection."}
              </motion.p>

              <motion.p variants={listItem} className="blockchain-wc__section">
                <span className="material-symbols-rounded" aria-hidden="true">desktop_windows</span>
                Desktop
              </motion.p>
              <motion.ul variants={listItem} className="blockchain-wc__wallets">
                {TILES.map((w) => (
                  <li key={w.name}>
                    <motion.button
                      {...pressable}
                      type="button"
                      className="blockchain-wc__wallet"
                      onClick={() => setConnecting(w.name)}
                    >
                      <span className={`blockchain-wc__tile blockchain-wc__tile--${w.mod}`}>
                        {w.node(30)}
                      </span>
                      <span className="blockchain-wc__wallet-name">{w.name}</span>
                    </motion.button>
                  </li>
                ))}
                <li>
                  <motion.button
                    {...pressable}
                    type="button"
                    className="blockchain-wc__wallet"
                    onClick={viewAll}
                  >
                    <span className="blockchain-wc__tile blockchain-wc__tile--grid">
                      <PartnerLogo name="metamask" size={16} />
                      <PartnerLogo name="walletconnect" size={16} />
                      <PartnerLogo name="binance" size={16} />
                      <PartnerLogo name="fireblocks" size={16} />
                    </span>
                    <span className="blockchain-wc__wallet-name">View All</span>
                  </motion.button>
                </li>
              </motion.ul>
            </motion.div>
          )}

          {stage === "connecting" && (
            <motion.div
              key="connecting"
              className="blockchain-wc__connecting"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }}
              exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
            >
              <motion.span
                className="blockchain-wc__tile"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: DUR.modal, ease: EASE_BRAND }
                }}
              >
                {TILES.find((w) => w.name === connecting)?.node(36) ?? (
                  <span className="blockchain-wc__tile-letter">
                    {connecting.slice(0, 1)}
                  </span>
                )}
              </motion.span>
              <h2 className="blockchain-wc__connecting-title">Connecting to {connecting}</h2>
              <p className="blockchain-wc__connecting-hint">
                Approve the connection request in {connecting} to link your wallet on {chain}.
              </p>
              <PulseDots />
              <div className="blockchain-wc__cancel">
                <Button variant="secondary" size="lg" onClick={() => setConnecting(null)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "linked" && (
            <motion.div
              key="linked"
              className="blockchain-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: DUR.slow, ease: EASE_BRAND } }}
            >
              <SuccessState
                title="Wallet linked"
                body={`${linked.provider} is now linked to your StraitsX account on ${chain}.`}
              >
                <AddrChip
                  address={linked.address}
                  mark={<AssetMark asset="WALLETCONNECT" size={28} />}
                  label={linked.provider}
                  onCopied={() => showToast("Address copied")}
                />
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    nav.popToRoot();
                    nav.push("blockchain/list");
                  }}
                >
                  View my addresses
                </Button>
                <LinkButton
                  onClick={() => {
                    nav.pop();
                    nav.pop();
                  }}
                >
                  Done
                </LinkButton>
              </SuccessState>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
