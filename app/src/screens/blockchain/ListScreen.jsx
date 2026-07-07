/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Blockchain addresses list (spec A1)
 *     0ms   header placed (stack push is the shell's)
 *    40ms   info line + address cards fade + rise, staggered 50ms
 *   verify  status tag swaps via popLayout ("Not Verified" → "Pending"),
 *           Verify Now pill exits faster than the tag enters
 *   delete  card scales out, siblings close the gap via layout
 * ──────────────────────────────────────────────── */

// blockchain/list — "My Addresses" as its own mobile screen (spec A1).
// Backed by addressStore so cards added by the add flows and status flips
// from the verify flow appear live behind the pushed screens.
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { listContainer, listItem, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { ListBlockchain } from "@ds/components/ListBlockchain/ListBlockchain.jsx";
import { ListSupportedNetwork } from "@ds/components/ListSupportedNetwork/ListSupportedNetwork.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { useAddresses, removeAddress } from "./addressStore.js";
import { useFlowToast, AddrChip, AddressStatusTag, ConfirmSheet } from "./shared.jsx";
import "./blockchain.css";

const QUICK_EXIT = { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } };

// Wallet-linked cards carry the provider mark; manual cards fall back to
// their (first) network mark, like the Solana card.
function cardMark(addr, size) {
  const byProvider = { MetaMask: "METAMASK", WalletConnect: "WALLETCONNECT" }[addr.provider];
  return <AssetMark asset={byProvider || addr.networkAssetIds[0] || addr.provider} size={size} />;
}

export function ListScreen() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const { toastEl, showToast } = useFlowToast();
  const addresses = useAddresses();

  const helpLink = (label) => showToast(`${label} opens in the live app`, "info");

  const confirmRemove = (addr) => {
    const verified = addr.status === "Verified";
    openSheet(({ close }) => (
      <ConfirmSheet
        title={verified ? `Unlink ${addr.provider}` : "Delete address"}
        body={`${addr.provider} will no longer be linked to your StraitsX account.`}
        confirmLabel={verified ? "Unlink" : "Delete"}
        critical
        close={close}
        onConfirm={() => {
          removeAddress(addr.id);
          showToast(verified ? "Address unlinked" : "Address deleted");
        }}
      />
    ));
  };

  return (
    <>
      {toastEl}
      <AppHeader title="Blockchain Addresses" back />
      <div className="screen-scroll">
        <motion.div
          className="screen-pad blockchain-list"
          variants={listContainer}
          initial="initial"
          animate="enter"
        >
          <motion.div variants={listItem} className="blockchain-list__head">
            <h2 className="blockchain-h2">My Addresses</h2>
            <Button variant="secondary" size="sm" onClick={() => nav.push("blockchain/add")}>
              Add New
            </Button>
          </motion.div>

          <motion.p variants={listItem} className="blockchain-info-line">
            <span className="material-symbols-rounded blockchain-info-ic">info</span>
            <span>
              Learn more about{" "}
              <LinkButton
                size="sm"
                className="blockchain-link"
                onClick={() => helpLink("Types of addresses")}
              >
                different types of addresses
              </LinkButton>{" "}
              and how to{" "}
              <LinkButton
                size="sm"
                className="blockchain-link"
                onClick={() => helpLink("Verifying an address")}
              >
                verify an address.
              </LinkButton>
            </span>
          </motion.p>

          <AnimatePresence mode="popLayout" initial={false}>
            {addresses.map((addr) => (
              <AddressCard
                key={addr.id}
                addr={addr}
                onVerify={() => nav.push("blockchain/verify", { id: addr.id })}
                onRemove={() => confirmRemove(addr)}
                onCopied={() => showToast("Address copied")}
              />
            ))}
          </AnimatePresence>

          {addresses.length === 0 && (
            <motion.p
              className="blockchain-caption blockchain-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: DUR.base, ease: EASE_BRAND } }}
            >
              No addresses yet. Add one to get started.
            </motion.p>
          )}
        </motion.div>
      </div>
    </>
  );
}

function AddressCard({ addr, onVerify, onRemove, onCopied }) {
  const verified = addr.status === "Verified";
  const notVerified = addr.status === "Not Verified";
  return (
    <motion.article
      className="blockchain-card"
      variants={listItem}
      layout
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.16, ease: EASE_BRAND } }}
    >
      <div className="blockchain-card__head">
        <ListBlockchain
          name={addr.provider}
          meta={addr.subtitle}
          icon={cardMark(addr, 40)}
          variant="verifiedCustodial"
          className="blockchain-card__id"
        />
        <div className="blockchain-card__actions">
          <AnimatePresence mode="popLayout" initial={false}>
            {notVerified && (
              <motion.span key="verify" style={{ display: "inline-flex" }} exit={QUICK_EXIT}>
                <Button variant="primary" size="sm" onClick={onVerify}>
                  Verify Now
                </Button>
              </motion.span>
            )}
          </AnimatePresence>
          <IconButton
            icon={verified ? "link_off" : "delete"}
            variant="outline"
            shape="circle"
            size="sm"
            label={verified ? "Unlink" : "Delete"}
            onClick={onRemove}
          />
        </div>
      </div>

      <span className="blockchain-card__label">Network</span>
      <div className="blockchain-card__netrow">
        <ListSupportedNetwork
          networks={addr.networkAssetIds.map((id) => (
            <AssetMark key={id} asset={id} size={20} />
          ))}
        />
        <span className="blockchain-card__netnames">{addr.networks.join(", ")}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={addr.status}
            style={{ display: "inline-flex" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_BRAND } }}
            exit={QUICK_EXIT}
          >
            <AddressStatusTag status={addr.status} />
          </motion.span>
        </AnimatePresence>
      </div>

      <AddrChip address={addr.address} onCopied={onCopied} />
    </motion.article>
  );
}
