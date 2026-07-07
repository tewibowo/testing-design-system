// blockchain/add-manual — "Add Blockchain Address" manual entry form (spec A4).
// The screenshot is cut off below the Blockchain Address textarea; per spec the
// submit action is a pinned full-width primary "Submit". The confirmation step
// and success state bridge the uncaptured post-submit screens.
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { networks, truncAddr } from "@app/data/db.js";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { SelectionBox } from "@ds/components/SelectionBox/SelectionBox.jsx";
import { ImportantNotes } from "@ds/components/ImportantNotes/ImportantNotes.jsx";
import { Input } from "@ds/components/Input/Input.jsx";
import { Textarea } from "@ds/components/Textarea/Textarea.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { addManualAddress } from "./addressStore.js";
import {
  useFlowToast,
  SheetHeader,
  PickerSheet,
  networkOptions,
  AddrChip
} from "./shared.jsx";
import "./blockchain.css";

// Platform list is builder-invented (spec: options never opened on screen).
const PLATFORMS = [
  { key: "Binance", name: "Binance", mark: <AssetMark asset="BINANCE" size={32} /> },
  { key: "Coinbase", name: "Coinbase", mark: <AssetMark label="C" color="#0052ff" size={32} /> },
  { key: "Crypto.com", name: "Crypto.com", mark: <AssetMark label="Cr" color="#03316c" size={32} /> },
  { key: "OKX", name: "OKX", mark: <AssetMark label="OK" color="#000000" size={32} /> },
  { key: "Kraken", name: "Kraken", mark: <AssetMark label="K" color="#5741d9" size={32} /> }
];

/* Select-style trigger that opens a bottom-sheet picker (mobile replacement
 * for the desktop FieldNetwork/Select popovers). */
function FieldTrigger({ label, placeholder, value, mark, onOpen }) {
  return (
    <div className="field">
      <span className="field__label">{label}</span>
      <motion.button {...pressable} type="button" className="blockchain-field__control" onClick={onOpen}>
        {mark}
        <span className={"blockchain-field__value" + (value ? "" : " is-placeholder")}>
          {value || placeholder}
        </span>
        <span className="material-symbols-rounded blockchain-field__chevron" aria-hidden="true">
          expand_more
        </span>
      </motion.button>
    </div>
  );
}

/* Confirmation sheet (bridged — post-Submit screens were not captured). */
function ConfirmSheet({ close, data, onConfirmed }) {
  const [busy, setBusy] = useState(false);
  const { toastEl, showToast } = useFlowToast("sheet");
  const rows = [
    ["Owner of address", data.owner],
    ["Type of Address", data.addrType],
    ...(data.addrType === "Custodial" ? [["Platform Name", data.platform]] : []),
    ...(data.label ? [["Address Label", data.label]] : []),
    ["Network", data.network]
  ];

  return (
    <div className="blockchain-sheet">
      {toastEl}
      <SheetHeader title="Confirm address details" onClose={close} />
      <dl className="blockchain-confirm-rows">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>
              {k === "Network" && (
                <AssetMark asset={networks.find((n) => n.name === v)?.assetId} size={20} />
              )}
              {v}
            </dd>
          </div>
        ))}
        <div>
          <dt>Blockchain Address</dt>
          <dd>
            <span className="blockchain-mono">{truncAddr(data.address)}</span>
          </dd>
        </div>
      </dl>
      <AddrChip
        address={data.address}
        mark={<AssetMark asset={networks.find((n) => n.name === data.network)?.assetId} size={28} />}
        label={data.label || data.network}
        onCopied={() => showToast("Address copied")}
      />
      <div style={{ height: 16 }} />
      <Button
        variant="primary"
        size="lg"
        style={{ width: "100%" }}
        disabled={busy}
        onClick={() => {
          setBusy(true);
          setTimeout(() => {
            close();
            onConfirmed();
          }, 600);
        }}
      >
        {busy ? "Submitting…" : "Confirm"}
      </Button>
    </div>
  );
}

export function AddManualScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const { toastEl, showToast } = useFlowToast();

  const [stage, setStage] = useState("form"); // form | success
  const [owner, setOwner] = useState("Yes"); // spec default
  const [addrType, setAddrType] = useState("Custodial"); // spec default
  const [platform, setPlatform] = useState(null);
  const [label, setLabel] = useState("");
  const [network, setNetwork] = useState(null);
  const [address, setAddress] = useState("");

  const isCustodial = addrType === "Custodial";
  const canSubmit =
    address.trim().length > 0 && !!network && (!isCustodial || !!platform);

  const openPlatformSheet = () =>
    openSheet(({ close }) => (
      <PickerSheet
        title="Select a platform name"
        options={PLATFORMS}
        selectedKey={platform}
        onSelect={(o) => {
          setPlatform(o.key);
          close();
        }}
        close={close}
      />
    ));

  const openNetworkSheet = () =>
    openSheet(({ close }) => (
      <PickerSheet
        title="Select your chain"
        options={networkOptions(networks)}
        selectedKey={network}
        onSelect={(o) => {
          setNetwork(o.name);
          close();
        }}
        close={close}
      />
    ));

  // Confirm → the store gains a "Not Verified" card mirroring the Solana
  // card pattern (spec A4 flow logic), then swap to the success stage.
  const submit = () =>
    openSheet(({ close }) => (
      <ConfirmSheet
        close={close}
        data={{ owner, addrType, platform, label, network, address: address.trim() }}
        onConfirmed={() => {
          addManualAddress({ label, network, address: address.trim(), addrType, platform });
          setStage("success");
        }}
      />
    ));

  const networkAssetId = networks.find((n) => n.name === network)?.assetId;

  return (
    <>
      {toastEl}
      <AppHeader title="Add Blockchain Address" back />
      <AnimatePresence mode="popLayout" initial={false}>
        {stage === "form" ? (
          <motion.div
            key="form"
            className="blockchain-stage"
            exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
          >
            <div className="screen-scroll">
              <motion.div
                className="screen-pad blockchain-form"
                variants={listContainer}
                initial="initial"
                animate="enter"
              >
                <motion.div variants={listItem}>
                  <p className="blockchain-q">Are you the owner of this address?</p>
                  <div className="blockchain-choice-grid">
                    {["Yes", "No"].map((v) => (
                      <SelectionBox
                        key={v}
                        type="radio"
                        name="blockchain-owner"
                        value={v}
                        label={v}
                        selected={owner === v}
                        onChange={() => setOwner(v)}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={listItem}>
                  <p className="blockchain-q">Type of Address</p>
                  <div className="blockchain-choice-grid">
                    {["Custodial", "Private Wallet"].map((v) => (
                      <SelectionBox
                        key={v}
                        type="radio"
                        name="blockchain-addr-type"
                        value={v}
                        label={v}
                        selected={addrType === v}
                        onChange={() => setAddrType(v)}
                      />
                    ))}
                  </div>
                  <p className="blockchain-caption blockchain-helper-line">
                    Learn more about the different types of addresses{" "}
                    <LinkButton
                      size="sm"
                      className="blockchain-link"
                      onClick={() => showToast("Available in the full app", "info")}
                    >
                      here.
                    </LinkButton>
                  </p>
                </motion.div>

                <AnimatePresence mode="popLayout" initial={false}>
                  {isCustodial && (
                    <motion.div
                      key="custodial"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: DUR.base, ease: EASE_BRAND }
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
                    >
                      <ImportantNotes tone="positive" title="Important Notes:">
                        For an instant verification, please check if the{" "}
                        <strong>
                          registered name in the exchange and your StraitsX account matches.
                        </strong>{" "}
                        If you have any concerns with the verification process, please{" "}
                        <LinkButton
                          size="sm"
                          className="blockchain-link"
                          onClick={() => showToast("Available in the full app", "info")}
                        >
                          contact us
                        </LinkButton>
                        .
                      </ImportantNotes>
                      <FieldTrigger
                        label="Platform Name"
                        placeholder="Select a platform name"
                        value={platform}
                        mark={PLATFORMS.find((p) => p.key === platform)?.mark}
                        onOpen={openPlatformSheet}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div variants={listItem}>
                  <Input
                    label="Address Label"
                    placeholder="e.g. My Wallet"
                    maxLength={25}
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    helper={
                      <>
                        Label your address for your own reference. Nicknames cannot exceed{" "}
                        <strong>25 characters</strong>.
                      </>
                    }
                  />
                </motion.div>

                <motion.div variants={listItem}>
                  <FieldTrigger
                    label="Network"
                    placeholder="Select a network"
                    value={network}
                    mark={network ? <AssetMark asset={networkAssetId} size={24} /> : null}
                    onOpen={openNetworkSheet}
                  />
                </motion.div>

                <motion.div variants={listItem} className="blockchain-mono-area">
                  <Textarea
                    label="Blockchain Address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="cta-bar">
              <Button variant="primary" size="lg" disabled={!canSubmit} onClick={submit}>
                Submit
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="blockchain-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DUR.slow, ease: EASE_BRAND } }}
          >
            <SuccessState
              title="Address added"
              body="You can find it under My Addresses. Verify it to start transacting with this address."
            >
              <AddrChip
                address={address.trim()}
                mark={<AssetMark asset={networkAssetId} size={28} />}
                label={label || network}
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
    </>
  );
}
