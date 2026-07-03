/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Whitelist Blockchain Address (spec B1)
 *     0ms   header placed (stack push is the shell's)
 *    40ms   intro copy, warning alert and radio options stagger in (50ms)
 *   Next    method stage exits fast (130ms), deposit instructions rise in
 *   submit  optimistic ~600ms, then SuccessState hero check draws itself;
 *           the store flips the card "Not Verified" → "Pending" behind us
 * ──────────────────────────────────────────────── */

// blockchain/verify — deposit-based ownership verification (spec B1).
// Verification = proof of ownership by moving funds: deposit ANY amount FROM
// the address TO the StraitsX account. The post-"Next" screens were not
// captured — the deposit-instructions stage is the stub the spec prescribes
// (QR + Copybox of a StraitsX deposit address + ImportantNotes).
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { blockchainAddresses, truncAddr } from "@app/data/db.js";
import { listContainer, listItem, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { SelectionBox } from "@ds/components/SelectionBox/SelectionBox.jsx";
import { Alert } from "@ds/components/Alert/Alert.jsx";
import { ImportantNotes } from "@ds/components/ImportantNotes/ImportantNotes.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { Copybox } from "@ds/components/Copybox/Copybox.jsx";
import { QR } from "@ds/components/QR/QR.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { getAddress, firstUnverified, setAddressStatus } from "./addressStore.js";
import { useFlowToast, AddrChip } from "./shared.jsx";
import "./blockchain.css";

// Verbatim option copy (spec B1 §4–5).
const OPTIONS = [
  {
    key: "withdraw-first",
    label: "I need to transfer tokens from StraitsX out first before depositing it back in"
  },
  {
    key: "has-tokens",
    label:
      "I have supported tokens in my address, I will deposit any amount into my StraitsX account to complete the verification"
  }
];

const stageSwap = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }
};

export function VerifyScreen({ params = {} }) {
  const nav = useNav();
  const { toastEl, showToast } = useFlowToast();

  // Pushed with { id } from the list/account; transfers pushes it bare —
  // fall back to the first unverified address (the Solana card).
  const [addr] = useState(() => (params.id && getAddress(params.id)) || firstUnverified());

  const [stage, setStage] = useState("method"); // method | deposit | success
  const [option, setOption] = useState(null);
  const [busy, setBusy] = useState(false);

  // Everything already verified (or removed) — nothing to whitelist.
  if (!addr) {
    return (
      <>
        <AppHeader title="Whitelist Blockchain Address" back />
        <div className="screen-scroll">
          <div className="screen-pad">
            <p className="blockchain-body blockchain-verify-intro">
              All your blockchain addresses are verified. Add a new address first if you'd
              like to whitelist another one.
            </p>
          </div>
        </div>
        <div className="cta-bar">
          <Button variant="primary" size="lg" onClick={() => nav.pop()}>
            Back
          </Button>
        </div>
      </>
    );
  }

  const deposit = blockchainAddresses.deposit;
  const withdrawFirst = option === "withdraw-first";

  const submitDeposit = () => {
    setBusy(true);
    setTimeout(() => {
      setAddressStatus(addr.id, "Pending");
      setStage("success");
    }, 600);
  };

  return (
    <>
      {toastEl}
      <AppHeader title="Whitelist Blockchain Address" back />
      <AnimatePresence mode="popLayout" initial={false}>
        {stage === "method" && (
          <motion.div key="method" className="blockchain-stage" exit={stageSwap.exit}>
            <div className="screen-scroll">
              <motion.div
                className="screen-pad blockchain-verify"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
                <motion.p variants={listItem} className="blockchain-body blockchain-verify-intro">
                  In order to whitelist your address <strong>{addr.provider}</strong>, please
                  deposit any amount from the address to your StraitsX account.
                </motion.p>

                <motion.div variants={listItem}>
                  <Alert tone="warning">
                    If you don&rsquo;t have any supported token in your address{" "}
                    <strong>{addr.provider}</strong>, you can withdraw tokens from your StraitsX
                    account to the address first before depositing it back to StraitsX.
                  </Alert>
                </motion.div>

                <motion.div variants={listItem}>
                  <AddrChip
                    address={addr.address}
                    mark={<AssetMark asset={addr.networkAssetIds[0]} size={28} />}
                    label={addr.provider}
                    onCopied={() => showToast("Address copied")}
                  />
                </motion.div>

                <div className="blockchain-option-stack">
                  {OPTIONS.map((o) => (
                    <motion.div key={o.key} variants={listItem}>
                      <SelectionBox
                        type="radio"
                        name="blockchain-verify-method"
                        value={o.key}
                        label={o.label}
                        selected={option === o.key}
                        onChange={() => setOption(o.key)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="cta-bar">
              <Button
                variant="primary"
                size="lg"
                disabled={!option}
                onClick={() => setStage("deposit")}
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {stage === "deposit" && (
          <motion.div key="deposit" className="blockchain-stage" {...stageSwap}>
            <div className="screen-scroll">
              <div className="screen-pad blockchain-verify">
                <p className="blockchain-body blockchain-verify-intro">
                  Complete the deposit from <strong>{addr.provider}</strong>{" "}
                  (<span className="blockchain-mono">{truncAddr(addr.address)}</span>) to verify
                  that you own it.
                </p>

                <ol className="blockchain-steps">
                  {withdrawFirst && (
                    <li>
                      Withdraw any amount of supported tokens from your StraitsX account to your
                      address first.
                    </li>
                  )}
                  <li>Deposit any amount from the address into your StraitsX account.</li>
                  <li>
                    We match the on-chain sender to your registered address and complete the
                    verification.
                  </li>
                </ol>

                <div className="blockchain-deposit-card">
                  <QR value={deposit.address} size={168} />
                  <Copybox
                    label={`StraitsX deposit address (${deposit.network})`}
                    value={deposit.address}
                    truncate
                    buttonVariant="icon"
                    size="sm"
                  />
                </div>

                <div className="blockchain-verify-notes">
                  <ImportantNotes tone="positive" title="Important Notes:">
                    Only deposit supported tokens. The deposit must be sent{" "}
                    <strong>from {truncAddr(addr.address)}</strong> — a deposit from any other
                    address cannot be matched to this verification. If you have any concerns,
                    please{" "}
                    <LinkButton
                      size="sm"
                      className="blockchain-link"
                      onClick={() => showToast("Available in the full app", "info")}
                    >
                      contact us
                    </LinkButton>
                    .
                  </ImportantNotes>
                </div>
              </div>
            </div>
            <div className="cta-bar">
              <Button variant="primary" size="lg" disabled={busy} onClick={submitDeposit}>
                {busy ? "Checking deposit…" : "I've made the deposit"}
              </Button>
              <Button variant="secondary" size="lg" disabled={busy} onClick={() => setStage("method")}>
                Back
              </Button>
            </div>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div
            key="success"
            className="blockchain-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DUR.slow, ease: EASE_BRAND } }}
          >
            <SuccessState
              title="Verification pending"
              body={`We're matching your deposit to ${addr.provider}. The status will change to Verified once the deposit is confirmed.`}
            >
              <AddrChip
                address={addr.address}
                mark={<AssetMark asset={addr.networkAssetIds[0]} size={28} />}
                label={addr.provider}
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
              <LinkButton onClick={() => nav.pop()}>Done</LinkButton>
            </SuccessState>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
