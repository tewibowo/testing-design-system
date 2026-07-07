/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Wallet connect stub (spec A3 → MetaMask)
 *     0ms   wallet mark pops in (scale, brand ease), breathing dots loop
 *  ~1600ms  optimistic approve — connecting stage exits fast (130ms),
 *           SuccessState hero check draws itself; store gains the card
 * ──────────────────────────────────────────────── */

// blockchain/wallet-link — provider connect stub (spec A3 flow logic: tapping
// MetaMask "triggers browser-extension connect on web; on mobile prototype,
// can short-circuit to a success state or show a stub"). We show a connecting
// stub, then add a Verified wallet card (MetaMask-card pattern) to the store.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useNav } from "@app/nav/Navigator.jsx";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { SuccessState } from "@app/ui/SuccessState.jsx";
import { DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Button } from "@ds/components/Button/Button.jsx";
import { LinkButton } from "@ds/components/LinkButton/LinkButton.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { addWalletAddress } from "./addressStore.js";
import { useFlowToast, AddrChip, PulseDots } from "./shared.jsx";
import "./blockchain.css";

export function WalletLinkScreen({ params = {} }) {
  const nav = useNav();
  const { toastEl, showToast } = useFlowToast();
  const provider = params.provider || "MetaMask";
  const chain = params.chain || "Ethereum";

  const [linked, setLinked] = useState(null); // new store row once "approved"

  useEffect(() => {
    const t = setTimeout(() => setLinked(addWalletAddress({ provider, chain })), 1600);
    return () => clearTimeout(t);
  }, [provider, chain]);

  return (
    <>
      {toastEl}
      <AppHeader title={`Connect ${provider}`} back />
      <AnimatePresence mode="popLayout" initial={false}>
        {!linked ? (
          <motion.div
            key="connecting"
            className="blockchain-stage"
            exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
          >
            <div className="blockchain-connect">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  transition: { duration: DUR.modal, ease: EASE_BRAND }
                }}
              >
                <AssetMark asset={provider.toUpperCase()} size={64} />
              </motion.div>
              <h2 className="blockchain-connect__title">Connecting to {provider}</h2>
              <p className="blockchain-connect__hint">
                Approve the connection request in {provider} to link your wallet on {chain}.
              </p>
              <PulseDots />
              <div className="blockchain-connect__cancel">
                <Button variant="secondary" size="lg" onClick={() => nav.pop()}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="linked"
            className="blockchain-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: DUR.slow, ease: EASE_BRAND } }}
          >
            <SuccessState
              title="Wallet linked"
              body={`${provider} is now linked to your StraitsX account on ${chain}.`}
            >
              <AddrChip
                address={linked.address}
                mark={<AssetMark asset={provider.toUpperCase()} size={28} />}
                label={provider}
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
