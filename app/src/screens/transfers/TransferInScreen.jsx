/* ────────────────────────────────────────────────────────────────
 * TRANSFER IN — deposit into StraitsX (spec: transfers.md §2–§5)
 *
 * ANIMATION STORYBOARD
 *    0ms   header + page title render with the stack push
 *   40ms   step cards stagger in (listContainer, 50ms apart)
 *  tap     method chip → branch content fades/rises into card 2,
 *          summary card follows (popLayout swap, exit faster)
 *  tap     "I've Transferred" → ~600ms optimistic wait →
 *          scrim fades + awaiting-funds card scales in (modalCard)
 *  done    "Back to home" → nav.popToRoot()
 * ──────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import {
  listContainer,
  listItem,
  modalCard,
  scrim,
  DUR,
  EASE_BRAND
} from "@app/motion/presets.js";
import { banks, blockchainAddresses, networks, fees, limits } from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { CardSteps } from "@ds/components/CardSteps/CardSteps.jsx";
import { CardSummary } from "@ds/components/CardSummary/CardSummary.jsx";
import { Copybox } from "@ds/components/Copybox/Copybox.jsx";
import { QR } from "@ds/components/QR/QR.jsx";
import {
  CopyCatch,
  InlineLink,
  LegalFooter,
  NetworkRow,
  SelectField,
  SheetList,
  SgFlag,
  ToastLayer,
  useTransfersToast
} from "./shared.jsx";
import "./transfers.css";

const METHOD_OPTIONS = [
  { id: "blockchain", label: "Blockchain Transfer", icon: "account_balance_wallet" },
  { id: "bank", label: "Bank Transfer", icon: "account_balance" }
];

const branchSwap = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: DUR.slow, ease: EASE_BRAND } },
  exit: { opacity: 0, transition: { duration: 0.16, ease: EASE_BRAND } }
};

export function TransferInScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const { note, showToast, clearToast } = useTransfersToast();

  const [method, setMethod] = useState(null); // null | "blockchain" | "bank"
  const [networkName, setNetworkName] = useState("Ethereum");
  const [submitting, setSubmitting] = useState(false);
  const [awaiting, setAwaiting] = useState(false);

  // Deposit network options — only Ethereum is captured for Transfer In (§3).
  const depositNetworks = networks.filter((n) => n.name === "Ethereum");
  const network = networks.find((n) => n.name === networkName) ?? networks[0];

  const externalLink = () => showToast("Available on the web dashboard");

  const openNetworkSheet = () => {
    openSheet(({ close }) => (
      <SheetList title="Select Network">
        {depositNetworks.map((n) => (
          <NetworkRow
            key={n.name}
            network={n}
            mark={<AssetMark asset={n.assetId} size={28} />}
            selected={n.name === networkName}
            onSelect={() => {
              setNetworkName(n.name);
              close();
            }}
          />
        ))}
      </SheetList>
    ));
  };

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setAwaiting(true);
    }, 600);
  };

  return (
    <>
      <AppHeader title="Transfer In" back />
      <div className="screen-scroll">
        <div className="screen-pad transfers-page">
          <h1 className="transfers-title">
            Transfer In -
            <AssetMark asset="XSGD" size={24} className="transfers-title__mark" />
            XSGD
          </h1>

          <motion.div
            className="transfers-cards"
            variants={listContainer}
            initial="initial"
            animate="enter"
          >
            {/* Card ① — Select Transfer Method */}
            <motion.div variants={listItem}>
              <CardSteps step={1} title="Select Transfer Method">
                <CardSteps.Options
                  options={METHOD_OPTIONS}
                  selected={method}
                  onSelect={setMethod}
                />
                <AnimatePresence mode="popLayout" initial={false}>
                  {method === "blockchain" && (
                    <motion.div key="network-field" {...branchSwap}>
                      <SelectField
                        label="Network"
                        lead={<AssetMark asset={network.assetId} size={24} />}
                        value={network.name}
                        onOpen={openNetworkSheet}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardSteps>
            </motion.div>

            {/* Card ② — Make Your Transfer (collapsed until a method is chosen) */}
            <motion.div variants={listItem}>
              <CardSteps step={2} title="Make Your Transfer">
                {method && (
                  <AnimatePresence mode="popLayout">
                    <motion.div key={method} className="transfers-branch" {...branchSwap}>
                      {method === "blockchain" ? (
                        <BlockchainDeposit network={network} onCopy={() => showToast("Copied")} />
                      ) : (
                        <BankDeposit onCopy={() => showToast("Copied")} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </CardSteps>
            </motion.div>

            {/* Transfer Details summary — appears with a chosen method */}
            {method && (
              <AnimatePresence mode="popLayout">
                <motion.div key={`summary-${method}`} {...branchSwap}>
                  {method === "blockchain" ? (
                    <CardSummary
                      className="transfers-summary"
                      title="Transfer Details"
                      items={[
                        {
                          label: "Network",
                          value: (
                            <span className="transfers-netvalue">
                              <AssetMark asset={network.assetId} size={18} />
                              <strong>{network.name}</strong>
                            </span>
                          )
                        },
                        {
                          label: "Processing Time",
                          value: fees.blockchainTransferIn.processingTime
                        },
                        {
                          label: "Minimum Amount",
                          value: limits.blockchainTransferIn.minimumAmount,
                          info: true
                        },
                        {
                          label: "Transfer Fee",
                          value: (
                            <span className="transfers-feevalue">
                              {fees.blockchainTransferIn.fee}
                              <span className="transfers-feevalue__note">
                                {fees.blockchainTransferIn.feeNote}
                              </span>
                            </span>
                          )
                        }
                      ]}
                      note={{
                        title: "Important Notes:",
                        body: (
                          <>
                            To avoid delays or loss of funds, ensure your
                            personal/non-custodial address is whitelisted and only send
                            XSGD on the correct network.
                            <InlineLink block onClick={() => nav.push("blockchain/add")}>
                              Whitelist my address
                            </InlineLink>
                          </>
                        )
                      }}
                    />
                  ) : (
                    <CardSummary
                      className="transfers-summary"
                      title="Transfer Details"
                      conversion={{
                        from: { label: "SGD", logo: <SgFlag size={20} /> },
                        to: { label: "XSGD", logo: <AssetMark asset="XSGD" size={20} /> },
                        note: limits.bankTransferIn.conversion
                      }}
                      items={[
                        {
                          label: "Maximum amount",
                          value: <strong>{limits.bankTransferIn.maximumAmount}</strong>
                        },
                        { label: "Transfer fee", value: fees.bankTransferIn.fee },
                        { label: "Processing time", value: fees.bankTransferIn.processingTime }
                      ]}
                      note={{
                        title: "Important Notes:",
                        body: (
                          <>
                            We currently support only{" "}
                            <InlineLink onClick={externalLink}>selected Singapore banks</InlineLink>{" "}
                            and do not accept GIRO or SWIFT transfers.
                          </>
                        )
                      }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            <motion.div variants={listItem}>
              <LegalFooter onLink={externalLink} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {method && (
        <motion.div
          className="cta-bar"
          initial={{ y: 72, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: DUR.slow, ease: EASE_BRAND } }}
        >
          <Button variant="primary" size="lg" disabled={submitting} onClick={submit}>
            I&rsquo;ve Transferred
          </Button>
        </motion.div>
      )}

      <ToastLayer note={note} onClear={clearToast} />

      <AnimatePresence>
        {awaiting && (
          <AwaitingFundsModal
            onSupport={externalLink}
            onDone={() => nav.popToRoot()}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Card ② content: blockchain branch (§3) ── */

function BlockchainDeposit({ network, onCopy }) {
  const { address } = blockchainAddresses.deposit;
  return (
    <div className="transfers-stack">
      <p className="transfers-instruction">
        Send your{" "}
        <AssetMark asset="XSGD" size={18} className="transfers-inline-mark" />{" "}
        <strong>XSGD</strong>{" "}
        <span className="material-symbols-rounded transfers-inline-info" aria-hidden="true">
          info
        </span>{" "}
        to the{" "}
        <AssetMark asset={network.assetId} size={18} className="transfers-inline-mark" />{" "}
        <strong>{network.name}</strong> address below:
      </p>
      <div className="transfers-qr-wrap">
        <QR value={address} size={168} />
      </div>
      <CopyCatch onCopy={onCopy}>
        <Copybox
          value={address}
          logo={<AssetMark asset={network.assetId} size={20} />}
          buttonVariant="icon"
          truncate
        />
      </CopyCatch>
    </div>
  );
}

/* ── Card ② content: bank branch (§4) ── */

function BankDeposit({ onCopy }) {
  const details = banks.transferIn;
  return (
    <div className="transfers-stack">
      <p className="transfers-instruction">
        Make a <strong>{details.method}</strong> transfer using the details below:
      </p>
      <CopyCatch onCopy={onCopy}>
        <div className="transfers-stack">
          <Copybox label="Recipient Name" value={details.recipientName} buttonVariant="icon" />
          <Copybox label="Bank Name" value={details.bankName} buttonVariant="icon" />
          <Copybox
            label="Bank Account Number"
            info={banks.vanHelper}
            value={details.accountNumber}
            buttonVariant="icon"
          />
        </div>
      </CopyCatch>
    </div>
  );
}

/* ── Terminus: "We are awaiting your funds" (§5) ──
 * In-screen overlay (the DS Modal portals to document.body and escapes the
 * phone frame); rocket illustration substituted with a Material icon. */

function AwaitingFundsModal({ onSupport, onDone }) {
  return (
    <div className="transfers-modal-host" role="dialog" aria-modal="true">
      <motion.div
        className="transfers-modal-scrim"
        variants={scrim}
        initial="initial"
        animate="enter"
        exit="exit"
        onClick={onDone}
      />
      <motion.div
        className="transfers-modal"
        variants={modalCard}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <div className="transfers-modal__body">
          <div className="transfers-rocket" aria-hidden="true">
            <span className="transfers-rocket__cloud" />
            <span className="material-symbols-rounded transfers-rocket__icon">rocket_launch</span>
          </div>
          <h2 className="transfers-modal__title">We are awaiting your funds</h2>
          <p className="transfers-modal__text">
            Once arrived, your SGD funds will be converted to XSGD at 1:1 with no
            fees. Please allow up to 2-5 business funds to be reflected in your
            account. You&rsquo;ll get an email once it is credited.
          </p>
          <p className="transfers-modal__help">
            Need help? <InlineLink onClick={onSupport}>Contact Support</InlineLink> anytime
          </p>
        </div>
        <div className="transfers-modal__foot">
          <Button variant="primary" size="lg" onClick={onDone}>
            Back to home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
