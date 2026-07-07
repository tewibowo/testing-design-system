/* ────────────────────────────────────────────────────────────────
 * V2 MINT — "v2/mint" (brief §3 row "ivy re-skin of v1 mint content";
 * copy verbatim from reference/specs/mint-swap.md via db.mint / db.banks)
 *
 * Gate: until Mint setup is verified (shared mintState flag) this route
 * renders the setup step; verifying crossfades to the instructions.
 *
 * ANIMATION STORYBOARD
 *    0ms   screen slides in (stack push)
 *   40ms   cards / rows stagger in (listContainer, 50ms apart)
 *  Save    6-digit code sheet rises (sheet preset) with the shared keypad
 *          (decimal={false}); "Use demo code" types db.twofa.code digit by
 *          digit; 6th digit → ~600ms verify → sheet closes, setup phase
 *          crossfades to instructions + "Mint setup complete" toast
 *  copy    VAN / recipient name / address copy buttons toast "Copied"
 *          (toast preset, ivy on mint, auto-dismiss 2s)
 * ──────────────────────────────────────────────────────────────── */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Keypad } from "@app/v2/core/Keypad.jsx";
import {
  listContainer,
  listItem,
  pressable,
  DUR,
  EASE_BRAND
} from "@app/motion/presets.js";
import {
  mint,
  banks,
  networks,
  blockchainAddresses,
  twofa,
  truncAddr
} from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import {
  useMintConfigured,
  setMintConfigured
} from "@app/screens/mintswap/mintState.js";
import { em, copyText, useV2Toasts, V2ToastLayer } from "./parts.jsx";
import "./v2swapmint-shared.css";
import "./v2swapmint-mint.css";

const CODE_LENGTH = 6;

/* Bold fragments inside verbatim db copy (the source spec renders these bold). */
const STEP_MARKERS = [["FAST Transfer"], ["in your name."], []];
const NOTE_MARKERS = ["10 XSGD", "30 XSGD", "200,000 XSGD"];

const phase = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_BRAND } }
};

export function V2MintScreen() {
  const configured = useMintConfigured();
  const { items, show } = useV2Toasts();

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {configured ? (
          <motion.div
            key="mint"
            className="v2swapmint-phase"
            variants={phase}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <MintInstructions showToast={show} />
          </motion.div>
        ) : (
          <motion.div
            key="setup"
            className="v2swapmint-phase"
            variants={phase}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <MintSetupPhase showToast={show} />
          </motion.div>
        )}
      </AnimatePresence>
      <V2ToastLayer items={items} />
    </>
  );
}

/* ── Setup step: network + verified address as teal selection rows;
 * Save gated by the 6-digit code sheet (mint-swap.md §1–§2 content) ── */

function MintSetupPhase({ showToast }) {
  const { openSheet } = useSheet();
  const [networkName, setNetworkName] = useState(mint.setup.network); // Ethereum

  // The one verified wallet captured in the spec (MetaMask on Ethereum).
  const wallet = blockchainAddresses.linked.find(
    (a) => a.provider === mint.setup.wallet
  );
  const walletNetworks = networks.filter((n) => wallet.networks.includes(n.name));
  const network =
    walletNetworks.find((n) => n.name === networkName) ?? walletNetworks[0];

  const openNetworkSheet = () => {
    openSheet(({ close }) => (
      <NetworkSheet
        options={walletNetworks}
        activeName={networkName}
        onSelect={(name) => {
          setNetworkName(name);
          close();
        }}
      />
    ));
  };

  const openTwoFa = () => {
    openSheet(({ close }) => (
      <TwoFaSheet
        onVerified={() => {
          close();
          setMintConfigured(true);
          showToast("Mint setup complete");
        }}
      />
    ));
  };

  return (
    <>
      <AppHeader title="Setup" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad v2swapmint-mintpage"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem}>
            <h2 className="v2swapmint-h2">Setup your Mint</h2>
            <p className="v2swapmint-sub">
              Choose your blockchain address to set up your Mint.
            </p>
          </motion.div>

          <motion.div variants={listItem} className="v2swapmint-fieldlabel">
            Choose a blockchain network
          </motion.div>
          <motion.button
            variants={listItem}
            type="button"
            {...pressable}
            className="v2-card v2swapmint-selectrow"
            onClick={openNetworkSheet}
            aria-haspopup="dialog"
          >
            <AssetMark asset={network.assetId} size={24} />
            <span className="v2swapmint-selectrow__value">{network.name}</span>
            <span
              className="material-symbols-rounded v2swapmint-selectrow__chev"
              aria-hidden="true"
            >
              expand_more
            </span>
          </motion.button>

          <motion.div variants={listItem} className="v2swapmint-fieldlabel">
            Choose a blockchain address
            <span className="v2swapmint-fieldlabel__sub">
              Personal Address - Non-Custodial
            </span>
          </motion.div>
          <motion.div variants={listItem} className="v2-card v2swapmint-walletrow is-selected">
            <span
              className="material-symbols-rounded v2swapmint-walletrow__radio"
              aria-hidden="true"
            >
              check_circle
            </span>
            <span className="v2swapmint-walletrow__main">
              <span className="v2swapmint-walletrow__name">{wallet.provider}</span>
              <span className="v2swapmint-walletrow__addr money" title={wallet.address}>
                {truncAddr(wallet.address)}
              </span>
              <span className="v2swapmint-tag">{wallet.status}</span>
            </span>
            <AssetMark asset="METAMASK" size={36} />
          </motion.div>

          <motion.button
            variants={listItem}
            type="button"
            {...pressable}
            className="v2swapmint-linkrow"
            onClick={() => showToast("Available on the web dashboard")}
          >
            <span className="material-symbols-rounded" aria-hidden="true">
              add
            </span>
            Link blockchain address
          </motion.button>
        </motion.div>
      </div>

      <div className="cta-bar">
        <motion.button
          type="button"
          className="v2swapmint-cta"
          {...pressable}
          onClick={openTwoFa}
        >
          Save
        </motion.button>
      </div>
    </>
  );
}

/* ── Network picker sheet ── */

function NetworkSheet({ options, activeName, onSelect }) {
  return (
    <div className="v2swapmint-sheet">
      <h3 className="v2swapmint-sheet__title">Choose a blockchain network</h3>
      <motion.div variants={listContainer} initial="initial" animate="enter">
        {options.map((n) => (
          <motion.button
            key={n.name}
            type="button"
            variants={listItem}
            {...pressable}
            className={
              "v2swapmint-pickrow" + (n.name === activeName ? " is-active" : "")
            }
            onClick={() => onSelect(n.name)}
          >
            <AssetMark asset={n.assetId} size={28} />
            <span className="v2swapmint-pickrow__sym">{n.name}</span>
            {n.name === activeName && (
              <span
                className="material-symbols-rounded v2swapmint-pickrow__check v2swapmint-pickrow__check--end"
                aria-hidden="true"
              >
                check_circle
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

/* ── 6-digit code sheet — shared keypad, decimal={false}; "Use demo code"
 * autofills db.twofa.code digit by digit; 6th digit auto-verifies ── */

function TwoFaSheet({ onVerified }) {
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    if (code.length !== CODE_LENGTH || verifying) return;
    setVerifying(true);
    timers.current.push(setTimeout(onVerified, 600));
  }, [code, verifying, onVerified]);

  const onKey = (k) => {
    if (verifying) return;
    setCode((c) =>
      k === "back" ? c.slice(0, -1) : c.length < CODE_LENGTH ? c + k : c
    );
  };

  const autofill = () => {
    if (verifying) return;
    twofa.code.split("").forEach((_d, i) => {
      timers.current.push(
        setTimeout(() => setCode(twofa.code.slice(0, i + 1)), i * 60)
      );
    });
  };

  return (
    <div className="v2swapmint-2fa">
      <h3 className="v2swapmint-sheet__title">2-Factor Authentication</h3>
      <p className="v2swapmint-2fa__copy">
        Input the 6-digit code in your Google Authenticator app.
      </p>
      <div
        className="v2swapmint-2fa__cells"
        role="group"
        aria-label="Authentication code"
      >
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <span
            key={i}
            className={
              "v2swapmint-2fa__cell money" +
              (i === code.length && !verifying ? " is-active" : "") +
              (code[i] ? " is-filled" : "")
            }
          >
            {code[i] ?? ""}
          </span>
        ))}
      </div>
      <div className="v2swapmint-2fa__row">
        <motion.button
          type="button"
          className="v2-chip"
          {...pressable}
          onClick={autofill}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            bolt
          </span>
          Use demo code
        </motion.button>
        <span className="v2swapmint-2fa__status">{verifying ? "Verifying…" : ""}</span>
      </div>
      <Keypad onKey={onKey} decimal={false} />
    </div>
  );
}

/* ── Configured Mint page: teal copy-row cards + trust notes (§2.3 tone);
 * every string verbatim from mint-swap.md via db ── */

function MintInstructions({ showToast }) {
  const copy = (value) => {
    copyText(value);
    showToast("Copied");
  };
  const external = () => showToast("Available on the web dashboard");

  return (
    <>
      <AppHeader
        title="Mint"
        back
        right={
          <motion.button
            type="button"
            className="v2swapmint-editbtn"
            {...pressable}
            onClick={() => setMintConfigured(false)}
          >
            Edit settings
          </motion.button>
        }
      />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad v2swapmint-mintpage"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          {/* Configured destination address */}
          <motion.section variants={listItem} className="v2-card v2swapmint-addrcard">
            <span className="v2swapmint-copyrow__label">Blockchain Address</span>
            <div className="v2swapmint-addrcard__row">
              <AssetMark asset="ETHEREUM" size={24} />
              <span className="v2swapmint-addrcard__main">
                <span className="v2swapmint-addrcard__wallet">{mint.setup.wallet}</span>
                <span
                  className="v2swapmint-addrcard__addr money"
                  title={mint.setup.address}
                >
                  {truncAddr(mint.setup.address)}
                </span>
              </span>
              <motion.button
                type="button"
                className="v2swapmint-copybtn"
                {...pressable}
                aria-label="Copy blockchain address"
                onClick={() => copy(mint.setup.address)}
              >
                <span className="material-symbols-rounded" aria-hidden="true">
                  content_copy
                </span>
              </motion.button>
            </div>
          </motion.section>

          {/* Singapore-banks info callout */}
          <motion.section variants={listItem} className="v2-card v2swapmint-callout">
            <span
              className="material-symbols-rounded v2swapmint-callout__icon is-gold"
              aria-hidden="true"
            >
              info
            </span>
            <p className="v2swapmint-callout__text">
              You can transfer from any bank account under the same name as the
              owner of this StraitsX account. We currently only support this{" "}
              <button type="button" className="v2swapmint-inlinelink" onClick={external}>
                list of Singapore banks
              </button>
              .
            </p>
          </motion.section>

          <motion.p variants={listItem} className="v2swapmint-lead">
            Follow the bank transfer instructions below to start minting:
          </motion.p>

          {/* Steps 1–2 */}
          {mint.steps.slice(0, 2).map((s, i) => (
            <motion.section key={s.step} variants={listItem} className="v2-card v2swapmint-step">
              <span className="v2swapmint-step__badge">Step {s.step}</span>
              <p className="v2swapmint-step__text">{em(s.text, STEP_MARKERS[i])}</p>
            </motion.section>
          ))}

          {/* Step 3: warning + FAST transfer copy rows */}
          <motion.section variants={listItem} className="v2-card v2swapmint-step">
            <span className="v2swapmint-step__badge">Step {mint.steps[2].step}</span>
            <p className="v2swapmint-step__text">{mint.steps[2].text}</p>

            <div className="v2swapmint-callout v2swapmint-callout--nested">
              <span
                className="material-symbols-rounded v2swapmint-callout__icon is-warning"
                aria-hidden="true"
              >
                info
              </span>
              <p className="v2swapmint-callout__text">
                {em(mint.recipientChangeWarning, ["Xfers Pte Ltd."])}
              </p>
            </div>

            <div className="v2swapmint-copyrows">
              <CopyRow label="Recipient Bank" value={mint.recipient.bankName} />
              <CopyRow
                label="Recipient Bank Account Number"
                value={mint.recipient.accountNumber}
                onCopy={() => copy(mint.recipient.accountNumber)}
                helper={banks.vanHelper}
              />
              <CopyRow
                label="Recipient Name"
                value={mint.recipient.recipientName}
                onCopy={() => copy(mint.recipient.recipientName)}
              />
            </div>
          </motion.section>

          {/* Important notes (verbatim db.mint.importantNotes) */}
          <motion.section variants={listItem} className="v2-card v2swapmint-notes">
            <span className="v2swapmint-notes__title">Important Notes:</span>
            <ol className="v2swapmint-notes__list">
              {mint.importantNotes.map((note) => (
                <li key={note}>{em(note, NOTE_MARKERS)}</li>
              ))}
            </ol>
          </motion.section>

          {/* Trust notes — §2.3 Stake tone (copy verbatim from mint-swap.md §1) */}
          <motion.div variants={listItem} className="v2swapmint-trust">
            <div className="v2swapmint-trust__row">
              <span className="material-symbols-rounded" aria-hidden="true">
                schedule
              </span>
              <p>
                Straight from your bank account to your blockchain address in as
                quickly as 50 mins.
              </p>
            </div>
            <div className="v2swapmint-trust__row">
              <span className="material-symbols-rounded" aria-hidden="true">
                verified_user
              </span>
              <p>The amount of SGD transferred in will be minted 1:1 to XSGD.</p>
            </div>
          </motion.div>

          {/* Legal footer (mint-swap.md §4, verbatim) */}
          <motion.div variants={listItem} className="v2swapmint-legal">
            <p>XSGD, XUSD and XIDR are issued by StraitsX.</p>
            <p>
              &ldquo;STRAITSX&rdquo;, &ldquo;XSGD&rdquo; and &ldquo;XIDR&rdquo; and
              all other URLs, logos and trademarks related to the StraitsX Services
              are either trademarks or registered trademarks of StraitsX or its
              licensors. StraitsX is the trading name of the StraitsX Group of
              Companies and its affiliated entities.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

/* ── One copy row: label over mono value, trailing copy icon (§2.3) ── */

function CopyRow({ label, value, onCopy, helper }) {
  return (
    <div className="v2swapmint-copyrow">
      <div className="v2swapmint-copyrow__main">
        <span className="v2swapmint-copyrow__label">{label}</span>
        <span className="v2swapmint-copyrow__value money">{value}</span>
        {helper && <span className="v2swapmint-copyrow__helper">{helper}</span>}
      </div>
      {onCopy && (
        <motion.button
          type="button"
          className="v2swapmint-copybtn"
          {...pressable}
          aria-label={`Copy ${label.toLowerCase()}`}
          onClick={onCopy}
        >
          <span className="material-symbols-rounded" aria-hidden="true">
            content_copy
          </span>
        </motion.button>
      )}
    </div>
  );
}
