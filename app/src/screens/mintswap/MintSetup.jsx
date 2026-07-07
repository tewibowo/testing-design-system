/* ────────────────────────────────────────────────────────────────
 * MINT SETUP — spec: mint-swap.md §1–§2
 *
 * One-time configuration: blockchain network + verified address that
 * minted XSGD is sent to. Saving is gated by the 2FA modal; only then does
 * the Mint page's instructions exist (cross-flow gating note).
 *
 * `MintSetupFlow` is the shared view — the mint gate renders it while
 * unconfigured, and "Edit Settings" pushes the standalone
 * "mintswap/mint-setup" route around the same component.
 *
 * ANIMATION STORYBOARD
 *    0ms   screen slides in (stack push / gate crossfade)
 *   40ms   form card, aside card, legal stagger in (50ms apart)
 *  Save    2FA modal scales in (modalCard); demo-code chip types the code
 *          digit by digit; Verify → ~600ms wait → onComplete
 * ──────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { mint, networks, blockchainAddresses } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { SelectionBox } from "@ds/components/SelectionBox/SelectionBox.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { TwoFaModal } from "./TwoFaModal.jsx";
import { InlineLink, SelectTrigger, SheetList, LegalFooter } from "./parts.jsx";
import { ToastLayer, useToasts } from "./toasts.jsx";
import "./mintswap.css";

/* Explainer items ("How your Mint works" aside, copy verbatim). */
const HOW_ITEMS = [
  {
    icon: "account_balance",
    title: "Mint XSGD directly to your blockchain address",
    body: "Straight from your bank account to your blockchain address in as quickly as 50 mins."
  },
  {
    icon: "toll",
    title: "Mint with low fees",
    body: "Mint XSGD with low fees.",
    link: "Learn more about Mint fee structure"
  },
  {
    icon: "currency_exchange",
    title: "Mint 1:1 from SGD",
    body: "The amount of SGD transferred in will be minted 1:1 to XSGD."
  }
];

/** Standalone route for "Edit Settings" (pushed over the Mint page). */
export function MintSetupScreen() {
  const nav = useNav();
  const { items, show } = useToasts();
  return (
    <>
      <MintSetupFlow showToast={show} onComplete={() => nav.pop()} />
      <ToastLayer items={items} />
    </>
  );
}

export function MintSetupFlow({ onComplete, showToast }) {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [networkName, setNetworkName] = useState(mint.setup.network); // Ethereum
  const [twofaOpen, setTwofaOpen] = useState(false);

  // The one verified wallet captured in the spec (MetaMask on Ethereum).
  const wallet = blockchainAddresses.linked.find(
    (a) => a.provider === mint.setup.wallet
  );
  const walletNetworks = networks.filter((n) => wallet.networks.includes(n.name));
  const network =
    walletNetworks.find((n) => n.name === networkName) ?? walletNetworks[0];

  const externalLink = () => showToast("Available on the web dashboard");

  const openNetworkSheet = () => {
    openSheet(({ close }) => (
      <SheetList title="Choose a blockchain network">
        {walletNetworks.map((n) => (
          <motion.button
            key={n.name}
            type="button"
            variants={listItem}
            {...pressable}
            className={"mintswap-assetrow" + (n.name === networkName ? " is-selected" : "")}
            onClick={() => {
              setNetworkName(n.name);
              close();
            }}
          >
            <AssetMark asset={n.assetId} size={28} />
            <span className="mintswap-assetrow__sym">{n.name}</span>
            {n.name === networkName && (
              <span
                className="material-symbols-rounded mintswap-assetrow__check"
                aria-hidden="true"
              >
                check
              </span>
            )}
          </motion.button>
        ))}
      </SheetList>
    ));
  };

  return (
    <>
      <AppHeader title="Setup" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad mintswap-page"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* Setup form card (§1, copy verbatim) */}
          <motion.section variants={listItem} className="mintswap-card">
            <h2 className="mintswap-card__title">Setup your Mint</h2>
            <p className="mintswap-card__sub">
              Choose your blockchain address to set up your Mint.
            </p>
            <div className="mintswap-divider" />

            <SelectTrigger
              label="Choose a blockchain network"
              lead={<AssetMark asset={network.assetId} size={24} />}
              value={network.name}
              onOpen={openNetworkSheet}
            />

            <div className="field">
              <span className="field__label">Choose a blockchain address</span>
              <span className="mintswap-sublabel">Personal Address - Non-Custodial</span>
              <SelectionBox
                type="radio"
                name="mint-address"
                selected
                className="mintswap-walletbox"
                label={
                  <span className="mintswap-walletrow">
                    <span>{wallet.provider}</span>
                    <AssetMark asset="METAMASK" size={36} />
                  </span>
                }
                description={
                  <span className="mintswap-walletdesc">
                    <span className="mintswap-walletdesc__addr">{wallet.address}</span>
                    <Tag tone="positive" size="small">
                      {wallet.status}
                    </Tag>
                  </span>
                }
                onChange={() => {}}
              />
            </div>

            <Button
              variant="secondary"
              size="lg"
              className="mintswap-linkbtn"
              onClick={() => nav.push("blockchain/add")}
            >
              <span className="material-symbols-rounded" aria-hidden="true">add</span>
              Link Blockchain Address
            </Button>
          </motion.section>

          {/* "How your Mint works" aside (§1, moved below the form on mobile) */}
          <motion.section variants={listItem} className="mintswap-card">
            <div className="mintswap-how__head">
              <h2 className="mintswap-card__title">How your Mint works</h2>
              <AssetMark asset="XSGD" size={48} />
            </div>
            <p className="mintswap-card__sub">
              Set up your Mint to mint XSGD directly from your bank account to
              your blockchain address, and streamline your access to digital
              assets.
            </p>
            <InlineLink onClick={externalLink}>Learn more about Mint</InlineLink>
            <div className="mintswap-how__panel">
              {HOW_ITEMS.map((item) => (
                <div key={item.icon} className="mintswap-how__item">
                  <span className="mintswap-how__icon" aria-hidden="true">
                    <span className="material-symbols-rounded">{item.icon}</span>
                  </span>
                  <span className="mintswap-how__text">
                    <span className="mintswap-how__title">{item.title}</span>
                    <span className="mintswap-how__body">{item.body}</span>
                    {item.link && (
                      <InlineLink onClick={externalLink}>{item.link}</InlineLink>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.div variants={listItem}>
            <LegalFooter />
          </motion.div>
        </motion.div>
      </div>

      <div className="cta-bar">
        <Button variant="primary" size="lg" onClick={() => setTwofaOpen(true)}>
          Save
        </Button>
      </div>

      <TwoFaModal
        open={twofaOpen}
        onClose={() => setTwofaOpen(false)}
        onSupport={externalLink}
        onVerified={() => {
          setTwofaOpen(false);
          onComplete();
        }}
      />
    </>
  );
}
