/* ────────────────────────────────────────────────────────────────
 * TRANSFER OUT — withdraw out of StraitsX (spec: transfers.md §7–§9)
 *
 * ANIMATION STORYBOARD
 *    0ms   header + page title render with the stack push
 *   40ms   step cards stagger in (listContainer, 50ms apart)
 *  tap     method chip → destination fields rise into card 2
 *  ready   card 3 (amount) + Transfer Details summary follow;
 *          summary money ticks via <Money> when the amount turns valid
 *  tap     "Proceed Transfer" → confirm bottom sheet (useSheet)
 *  tap     "Confirm" → sheet dismisses, ~600ms optimistic wait →
 *          SuccessState (check draws, amount ticks) → popToRoot
 * ──────────────────────────────────────────────────────────────── */
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Money } from "@app/ui/Money.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { listContainer, listItem, DUR, EASE_BRAND } from "@app/motion/presets.js";
import {
  balances,
  banks,
  blockchainAddresses,
  fees,
  networks,
  truncAddr
} from "@app/data/db.js";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { CardSteps } from "@ds/components/CardSteps/CardSteps.jsx";
import { CardSummary } from "@ds/components/CardSummary/CardSummary.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { ListBank } from "@ds/components/ListBank/ListBank.jsx";
import { ListBlockchain } from "@ds/components/ListBlockchain/ListBlockchain.jsx";
import {
  LegalFooter,
  NetworkRow,
  PickRow,
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

export function TransferOutScreen({ params = {} }) {
  const nav = useNav();
  const { openSheet } = useSheet();
  const { note, showToast, clearToast } = useTransfersToast();

  // Asset context — canonical route defaults to XSGD; per-asset entry points
  // (e.g. an asset row's send button) may pass { asset }.
  const assetRow =
    balances.assets.find((a) => a.asset === (params.asset ?? "").toUpperCase()) ??
    balances.assets.find((a) => a.asset === "XSGD");
  const asset = assetRow.asset;
  const balance = parseFloat(assetRow.balance) || 0;

  const [method, setMethod] = useState(null); // null | "blockchain" | "bank"
  const [wallet, setWallet] = useState(null);
  const [walletNetwork, setWalletNetwork] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [bankNetwork, setBankNetwork] = useState(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState("form"); // form | success

  const externalLink = () => showToast("Available on the web dashboard");

  const selectMethod = (id) => {
    setMethod(id);
    if (id === "blockchain" && !wallet) {
      // The captured flow (§8) shows the verified MetaMask wallet pre-selected.
      const verified = blockchainAddresses.linked.find((w) => w.status === "Verified");
      setWallet(verified ?? null);
      setWalletNetwork(verified ? verified.networks[0] : null);
    }
  };

  const networkName = method === "blockchain" ? walletNetwork : bankNetwork;
  const network = networks.find((n) => n.name === networkName) ?? null;
  const destinationReady =
    method === "blockchain" ? Boolean(wallet && walletNetwork) : Boolean(bankAccount && bankNetwork);

  const amountNum = parseFloat(amount) || 0;
  const overBalance = amountNum > balance;
  const valid = destinationReady && amountNum > 0 && !overBalance;
  // Summary reflects a not-yet-valid amount as 0.00 (§8 capture).
  const shownAmount = valid ? amountNum : 0;
  const networkFee = 0; // only 0.00 was captured for Transfer Out
  const netAmount = Math.max(shownAmount - networkFee, 0);
  const netSuffix = method === "bank" && asset === "XSGD" ? " SGD" : ` ${asset}`;

  /* ── Sheets ── */

  const openWalletSheet = () => {
    openSheet(({ close }) => (
      <SheetList
        title="Blockchain Wallet"
        action={
          <LinkButton
            onClick={() => {
              close();
              nav.push("blockchain/add");
            }}
          >
            Add Wallet
          </LinkButton>
        }
      >
        {blockchainAddresses.linked.map((w) => {
          const isVerified = w.status === "Verified";
          const goVerify = () => {
            close();
            nav.push("blockchain/verify");
          };
          return (
            <PickRow
              key={w.id}
              selected={wallet?.id === w.id}
              onClick={() => {
                if (!isVerified) return goVerify();
                setWallet(w);
                setWalletNetwork((prev) => (w.networks.includes(prev) ? prev : w.networks[0]));
                close();
              }}
            >
              <ListBlockchain
                name={w.provider}
                address={truncAddr(w.address)}
                meta={w.subtitle}
                icon={<AssetMark asset={w.provider} size={24} />}
                variant={isVerified ? "verifiedPrivateWallet" : "verify"}
                onAction={(e) => {
                  e.stopPropagation();
                  goVerify();
                }}
              />
            </PickRow>
          );
        })}
      </SheetList>
    ));
  };

  const openBankSheet = () => {
    openSheet(({ close }) => (
      <SheetList
        title="Bank Account"
        action={
          <LinkButton
            onClick={() => {
              close();
              nav.push("account/banks-add");
            }}
          >
            Add Account
          </LinkButton>
        }
      >
        {banks.linked.map((b) => {
          const isVerified = b.status === "Verified";
          const goVerify = () => {
            close();
            nav.push("account/banks-verify");
          };
          return (
            <PickRow
              key={b.account}
              selected={bankAccount?.account === b.account}
              onClick={() => {
                if (!isVerified) return goVerify();
                setBankAccount(b);
                close();
              }}
            >
              <ListBank
                name={b.name}
                account={b.account}
                logo={
                  <span className="material-symbols-rounded" aria-hidden="true">
                    account_balance
                  </span>
                }
                variant={isVerified ? "verified" : "unverified"}
                onAction={(e) => {
                  e.stopPropagation();
                  goVerify();
                }}
              />
            </PickRow>
          );
        })}
      </SheetList>
    ));
  };

  const openNetworkSheet = () => {
    const options =
      method === "blockchain" && wallet
        ? wallet.networks.map((name) => networks.find((n) => n.name === name)).filter(Boolean)
        : networks;
    const current = networkName;
    const pick = method === "blockchain" ? setWalletNetwork : setBankNetwork;
    openSheet(({ close }) => (
      <SheetList title="Select Network">
        {options.map((n) => (
          <NetworkRow
            key={n.name}
            network={n}
            mark={<AssetMark asset={n.assetId} size={28} />}
            selected={n.name === current}
            onSelect={() => {
              pick(n.name);
              close();
            }}
          />
        ))}
      </SheetList>
    ));
  };

  const openConfirmSheet = () => {
    if (!valid) return;
    const destination =
      method === "blockchain"
        ? { label: "Blockchain Wallet", name: wallet.provider, sub: truncAddr(wallet.address) }
        : { label: "Bank Account", name: bankAccount.name, sub: bankAccount.account };
    openSheet(({ close }) => (
      <ConfirmSheet
        destination={destination}
        networkName={networkName}
        networkMark={network ? <AssetMark asset={network.assetId} size={20} /> : null}
        amount={amountNum}
        feeLabel={method === "bank" ? "Transfer Fee" : "Network Fees"}
        feeValue={
          method === "bank" ? fees.bankTransferIn.fee : <Money value={networkFee} suffix={` ${asset}`} />
        }
        asset={asset}
        netSuffix={netSuffix}
        onConfirm={() => {
          close();
          finishTransfer();
        }}
      />
    ));
  };

  const finishTransfer = () => {
    if (submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setPhase("success");
    }, 600);
  };

  /* ── Success terminus ── */

  if (phase === "success") {
    const destinationName = method === "blockchain" ? wallet.provider : bankAccount.name;
    return (
      <>
        <AppHeader title="Transfer Out" />
        <SuccessState
          title="Transfer submitted"
          body={
            <>
              Your withdrawal of{" "}
              <Money value={amountNum} suffix={` ${asset}`} animateOnMount /> to{" "}
              {destinationName} is being processed. You&rsquo;ll get an email once it
              is completed.
            </>
          }
        >
          <Button variant="primary" size="lg" onClick={() => nav.popToRoot()}>
            Back to home
          </Button>
        </SuccessState>
      </>
    );
  }

  /* ── Form ── */

  return (
    <>
      <AppHeader title="Transfer Out" back />
      <div className="screen-scroll">
        <div className="screen-pad transfers-page">
          <h1 className="transfers-title">
            Transfer Out -
            <AssetMark asset={asset} size={24} className="transfers-title__mark" />
            {asset}
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
                  onSelect={selectMethod}
                />
              </CardSteps>
            </motion.div>

            {/* Card ② — Select Destination (collapsed until a method is chosen) */}
            <motion.div variants={listItem}>
              <CardSteps step={2} title="Select Destination">
                {method && (
                  <AnimatePresence mode="popLayout">
                    <motion.div key={method} className="transfers-stack" {...branchSwap}>
                      {method === "blockchain" ? (
                        <>
                          <SelectField
                            label="Blockchain Wallet"
                            headerAction={
                              <LinkButton onClick={() => nav.push("blockchain/add")}>
                                Add Wallet
                              </LinkButton>
                            }
                            lead={wallet ? <AssetMark asset={wallet.provider} size={24} /> : null}
                            value={
                              wallet ? (
                                <span className="transfers-select__two">
                                  <span className="transfers-select__name">{wallet.provider}</span>
                                  <span className="transfers-select__addr">
                                    {truncAddr(wallet.address)}
                                  </span>
                                </span>
                              ) : null
                            }
                            placeholder="Select Wallet"
                            onOpen={openWalletSheet}
                          />
                          <SelectField
                            label="Network"
                            lead={network ? <AssetMark asset={network.assetId} size={24} /> : null}
                            value={walletNetwork}
                            placeholder="Select Network"
                            onOpen={openNetworkSheet}
                          />
                        </>
                      ) : (
                        <>
                          <SelectField
                            label="Bank Account"
                            headerAction={
                              <LinkButton onClick={() => nav.push("account/banks-add")}>
                                Add Account
                              </LinkButton>
                            }
                            lead={
                              bankAccount ? (
                                <span
                                  className="material-symbols-rounded transfers-bank-lead"
                                  aria-hidden="true"
                                >
                                  account_balance
                                </span>
                              ) : null
                            }
                            value={
                              bankAccount ? (
                                <span className="transfers-select__two">
                                  <span className="transfers-select__name">{bankAccount.name}</span>
                                  <span className="transfers-select__addr">
                                    {bankAccount.account}
                                  </span>
                                </span>
                              ) : null
                            }
                            placeholder="Select Account"
                            onOpen={openBankSheet}
                          />
                          {/* Network is gated on choosing an account first (§9) */}
                          <SelectField
                            label="Network"
                            disabled={!bankAccount}
                            lead={network ? <AssetMark asset={network.assetId} size={24} /> : null}
                            value={bankNetwork}
                            placeholder="Select Network"
                            onOpen={openNetworkSheet}
                          />
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </CardSteps>
            </motion.div>

            {/* Card ③ — Set Withdrawal Amount (collapsed until destination is set) */}
            <motion.div variants={listItem}>
              <CardSteps step={3} title="Set Withdrawal Amount">
                {destinationReady && (
                  <AnimatePresence mode="popLayout">
                    <motion.div key="amount" {...branchSwap}>
                      <div className="transfers-amount">
                        <div
                          className={
                            "transfers-amount__box" + (amount && overBalance ? " is-error" : "")
                          }
                        >
                          <AssetMark asset={asset} size={20} />
                          <input
                            className="transfers-amount__input"
                            inputMode="decimal"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/[^0-9.]/g, "");
                              const [head, ...rest] = raw.split(".");
                              setAmount(
                                rest.length > 0
                                  ? head + "." + rest.join("").slice(0, 2)
                                  : raw
                              );
                            }}
                            aria-label="Withdrawal amount"
                          />
                          <button
                            type="button"
                            className="transfers-amount__max"
                            onClick={() => setAmount(balance.toFixed(2))}
                          >
                            Max
                          </button>
                          <span className="transfers-amount__suffix">
                            <AssetMark asset={asset} size={20} />
                            {asset}
                          </span>
                        </div>
                        <span
                          className={
                            "transfers-amount__helper" + (amount && overBalance ? " is-error" : "")
                          }
                        >
                          Balance: <Money value={balance} />
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </CardSteps>
            </motion.div>

            {/* Transfer Details summary — appears once the destination is set */}
            {destinationReady && (
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
                          value:
                            network.processingTime ?? fees.blockchainTransferIn.processingTime
                        },
                        {
                          label: "Transfer Amount",
                          value: <Money value={shownAmount} suffix={` ${asset}`} />
                        },
                        {
                          label: "Network Fees",
                          info: true,
                          value: <Money value={networkFee} suffix={` ${asset}`} />
                        }
                      ]}
                      netAmount={{
                        label: "Net Amount",
                        value: <Money value={netAmount} suffix={netSuffix} />
                      }}
                    />
                  ) : (
                    <CardSummary
                      className="transfers-summary"
                      title="Transfer Details"
                      conversion={
                        asset === "XSGD"
                          ? {
                              from: {
                                label: "XSGD",
                                logo: <AssetMark asset="XSGD" size={20} />
                              },
                              to: { label: "SGD", logo: <SgFlag size={20} /> },
                              note: "Your XSGD will be converted 1:1 for SGD"
                            }
                          : undefined
                      }
                      items={[
                        {
                          label: "Bank Account",
                          value: <strong>{bankAccount.name}</strong>
                        },
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
                          label: "Transfer Amount",
                          value: <Money value={shownAmount} suffix={` ${asset}`} />
                        },
                        { label: "Transfer Fee", value: fees.bankTransferIn.fee }
                      ]}
                      netAmount={{
                        label: "Net Amount",
                        value: <Money value={netAmount} suffix={netSuffix} />
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
          <Button
            variant="primary"
            size="lg"
            disabled={!valid || submitting}
            onClick={openConfirmSheet}
          >
            Proceed Transfer
          </Button>
        </motion.div>
      )}

      <ToastLayer note={note} onClear={clearToast} />
    </>
  );
}

/* ── Confirm sheet (confirm/2FA screens were not captured — extrapolated
 * as a bottom-sheet confirmation per the sheet-first mobile pattern) ── */

function ConfirmSheet({
  destination,
  networkName,
  networkMark,
  amount,
  feeLabel,
  feeValue,
  asset,
  netSuffix,
  onConfirm
}) {
  return (
    <SheetList title="Confirm transfer">
      <motion.div variants={listItem} className="transfers-confirm">
        <div className="transfers-confirm__row">
          <span className="transfers-confirm__label">{destination.label}</span>
          <span className="transfers-confirm__value">
            <strong>{destination.name}</strong>
            <span className="transfers-confirm__sub">{destination.sub}</span>
          </span>
        </div>
        <div className="transfers-confirm__row">
          <span className="transfers-confirm__label">Network</span>
          <span className="transfers-confirm__value transfers-netvalue">
            {networkMark}
            <strong>{networkName}</strong>
          </span>
        </div>
        <div className="transfers-confirm__row">
          <span className="transfers-confirm__label">Transfer Amount</span>
          <span className="transfers-confirm__value">
            <Money value={amount} suffix={` ${asset}`} />
          </span>
        </div>
        <div className="transfers-confirm__row">
          <span className="transfers-confirm__label">{feeLabel}</span>
          <span className="transfers-confirm__value">{feeValue}</span>
        </div>
        <div className="transfers-confirm__divider" />
        <div className="transfers-confirm__row transfers-confirm__row--net">
          <span className="transfers-confirm__label">Net Amount</span>
          <span className="transfers-confirm__value">
            <Money value={amount} suffix={netSuffix} />
          </span>
        </div>
      </motion.div>
      <motion.div variants={listItem}>
        <Button variant="primary" size="lg" className="transfers-confirm__btn" onClick={onConfirm}>
          Confirm
        </Button>
      </motion.div>
    </SheetList>
  );
}
