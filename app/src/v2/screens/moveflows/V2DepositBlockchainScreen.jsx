// v2/deposit/blockchain — QR branch of Deposit (brief §2.3, Base/Chime
// treatment): network pills, white QR card with ivy modules + embedded
// logomark, mono address, Copy/Share pills, mint copy toast.
import { useState } from "react";
import { motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { QR } from "@ds/components/QR/QR.jsx";
import logomarkUrl from "@ds/assets/logomark-full.svg";
import { blockchainAddresses, networks, truncAddr } from "@app/data/db.js";
import { listContainer, listItem, pressable } from "@app/motion/presets.js";
import { MoveToastLayer, copyText, useMoveToast } from "./shared.jsx";
import "./v2moveflows-deposit.css";

// The captured StraitsX deposit address is EVM (0x…) — Solana is excluded
// from the pills since db has no Solana deposit address.
const DEPOSIT_NETWORKS = networks.filter((n) => n.assetId !== "SOLANA");

// DS QR with ivy modules on white (§2.3): the qrserver builder takes module
// and background colors; ecc=H tolerates the centred logomark overlay.
const ivyQrUrl = (value, size) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size * 2}x${size * 2}` +
  `&data=${encodeURIComponent(value)}&color=002b2a&bgcolor=ffffff&ecc=H&qzone=1`;

export function V2DepositBlockchainScreen() {
  const { note, showToast, clearToast } = useMoveToast();
  const [networkName, setNetworkName] = useState(blockchainAddresses.deposit.network);
  const address = blockchainAddresses.deposit.address;

  const onCopy = () => {
    copyText(address);
    showToast("Address copied");
  };

  const onShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: address });
      } catch {
        /* user dismissed the share sheet */
      }
      return;
    }
    showToast("Sharing is unavailable on this device");
  };

  return (
    <>
      <AppHeader title="Blockchain deposit" back />
      <div className="screen-scroll">
        <motion.div variants={listContainer} initial="initial" animate="enter">
          <motion.div variants={listItem} className="v2mf-nets" role="tablist">
            {DEPOSIT_NETWORKS.map((n) => (
              <motion.button
                key={n.name}
                {...pressable}
                role="tab"
                aria-selected={n.name === networkName}
                className={"v2-chip" + (n.name === networkName ? " is-active" : "")}
                onClick={() => setNetworkName(n.name)}
              >
                {n.name}
              </motion.button>
            ))}
          </motion.div>

          <motion.div variants={listItem} className="v2mf-qrwrap">
            <QR value={address} size={216} className="v2mf-qr" urlBuilder={ivyQrUrl} />
            <span className="v2mf-qrlogo" aria-hidden="true">
              <img src={logomarkUrl} alt="" />
            </span>
          </motion.div>

          <motion.div variants={listItem} className="v2mf-addr money">
            {truncAddr(address)}
          </motion.div>

          <motion.div variants={listItem} className="v2mf-btnrow screen-pad">
            <motion.button {...pressable} className="v2mf-pill v2mf-pill--primary" onClick={onCopy}>
              <span className="material-symbols-rounded" aria-hidden="true">content_copy</span>
              Copy address
            </motion.button>
            <motion.button {...pressable} className="v2mf-pill v2mf-pill--secondary" onClick={onShare}>
              <span className="material-symbols-rounded" aria-hidden="true">share</span>
              Share
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      <MoveToastLayer note={note} onClear={clearToast} />
    </>
  );
}
