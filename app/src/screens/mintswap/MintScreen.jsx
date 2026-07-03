/* ────────────────────────────────────────────────────────────────
 * MINT — "mintswap/mint" (spec: mint-swap.md §3–§4)
 *
 * Gate: until Mint setup is 2FA-verified (mintState flag) this route
 * renders the Setup flow; verifying crossfades to the Mint instructions.
 * "Edit Settings" pushes the standalone "mintswap/mint-setup" route.
 *
 * ANIMATION STORYBOARD
 *    0ms   screen slides in (stack push)
 *   40ms   header card → lead line → step cards 1-3 → notes → legal
 *          stagger in (listContainer, 50ms apart)
 *  verify  setup phase fades out fast, mint phase rises in ("Mint setup
 *          complete" toast) — the gate's one crossfade
 *  copy    VAN / recipient name copy buttons toast "Copied"
 * ──────────────────────────────────────────────────────────────── */
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import {
  listContainer,
  listItem,
  pressable,
  DUR,
  EASE_BRAND
} from "@app/motion/presets.js";
import { mint, banks, truncAddr } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Alert } from "@ds/components/Alert/Alert.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { CardSteps } from "@ds/components/CardSteps/CardSteps.jsx";
import { Copybox } from "@ds/components/Copybox/Copybox.jsx";
import { ImportantNotes } from "@ds/components/ImportantNotes/ImportantNotes.jsx";
import { useMintConfigured, setMintConfigured } from "./mintState.js";
import { MintSetupFlow } from "./MintSetup.jsx";
import { InlineLink, CopyCatch, LegalFooter, em } from "./parts.jsx";
import { ToastLayer, useToasts } from "./toasts.jsx";
import "./mintswap.css";

const phaseSwap = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_BRAND } }
};

/* Bold fragments inside verbatim db copy (spec renders these bold). */
const STEP_MARKERS = [["FAST Transfer"], ["in your name."], []];
const NOTE_MARKERS = ["10 XSGD", "30 XSGD", "200,000 XSGD"];

export function MintScreen() {
  const configured = useMintConfigured();
  const { items, show } = useToasts();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {configured ? (
          <motion.div
            key="mint"
            className="mintswap-phase"
            variants={phaseSwap}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <MintView showToast={show} />
          </motion.div>
        ) : (
          <motion.div
            key="setup"
            className="mintswap-phase"
            variants={phaseSwap}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <MintSetupFlow
              showToast={show}
              onComplete={() => {
                setMintConfigured(true);
                show("Mint setup complete");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <ToastLayer items={items} />
    </>
  );
}

/* ── Configured Mint page: destination address + FAST transfer steps ── */

function MintView({ showToast }) {
  const nav = useNav();
  const externalLink = () => showToast("Available on the web dashboard");

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(mint.setup.address);
    } catch {
      /* clipboard unavailable */
    }
    showToast("Copied");
  };

  return (
    <>
      <AppHeader title="Mint" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad mintswap-page"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* Header card (§3) */}
          <motion.section variants={listItem} className="mintswap-card">
            <div className="mintswap-mint-headrow">
              <AssetMark asset="XSGD" size={40} />
              <h2 className="mintswap-card__title mintswap-mint-title">Mint</h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => nav.push("mintswap/mint-setup")}
              >
                Edit Settings
              </Button>
            </div>

            <Alert tone="info">
              You can transfer from any bank account under the same name as the
              owner of this StraitsX account. We currently only support this{" "}
              <InlineLink onClick={externalLink}>list of Singapore banks</InlineLink>.
            </Alert>

            <div className="field">
              <span className="field__label">Blockchain Address</span>
              <div className="mintswap-addressbox">
                <span className="mintswap-addressbox__wallet">{mint.setup.wallet}</span>
                <div className="mintswap-addressbox__row">
                  <AssetMark asset="ETH" size={20} />
                  <span className="mintswap-addressbox__addr" title={mint.setup.address}>
                    {truncAddr(mint.setup.address)}
                  </span>
                  <motion.button
                    type="button"
                    {...pressable}
                    className="mintswap-walletbtn"
                    aria-label="Copy blockchain address"
                    onClick={copyAddress}
                  >
                    <span className="material-symbols-rounded" aria-hidden="true">
                      account_balance_wallet
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.p variants={listItem} className="mintswap-lead">
            Follow the bank transfer instructions below to start minting:
          </motion.p>

          {/* Step cards 1-2 (§3) */}
          {mint.steps.slice(0, 2).map((s) => (
            <motion.div key={s.step} variants={listItem}>
              <CardSteps
                className="mintswap-step"
                step={`Step ${s.step}`}
                title={em(s.text, STEP_MARKERS[s.step - 1])}
              />
            </motion.div>
          ))}

          {/* Step card 3: recipient details (§4) */}
          <motion.div variants={listItem}>
            <CardSteps
              className="mintswap-step"
              step={`Step ${mint.steps[2].step}`}
              title={mint.steps[2].text}
            >
              <Alert tone="warning">
                {em(mint.recipientChangeWarning, ["Xfers Pte Ltd."])}
              </Alert>
              <CopyCatch onCopy={() => showToast("Copied")}>
                <div className="mintswap-stack">
                  <Copybox
                    label="Recipient Bank"
                    value={mint.recipient.bankName}
                    action={false}
                  />
                  <Copybox
                    label="Recipient Bank Account Number"
                    value={mint.recipient.accountNumber}
                    buttonVariant="icon"
                    helper={banks.vanHelper}
                  />
                  <Copybox
                    label="Recipient Name"
                    value={mint.recipient.recipientName}
                    buttonVariant="icon"
                  />
                </div>
              </CopyCatch>
            </CardSteps>
          </motion.div>

          {/* Important Notes panel (§4) */}
          <motion.div variants={listItem}>
            <ImportantNotes
              title="Important Notes:"
              icon={false}
              className="mintswap-notes"
            >
              <ol className="mintswap-notes__list">
                {mint.importantNotes.map((note) => (
                  <li key={note}>{em(note, NOTE_MARKERS)}</li>
                ))}
              </ol>
            </ImportantNotes>
          </motion.div>

          <motion.div variants={listItem}>
            <LegalFooter />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
