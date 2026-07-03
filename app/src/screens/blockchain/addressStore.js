// Module-level blockchain-address state shared by the blockchain screens
// (same pattern as the account area's bankStore).
//
// Seeds from db.js (never hardcoded) and lets the flows mutate a copy:
//   - blockchain/add (manual)  appends a "Not Verified" card (Solana-card pattern)
//   - blockchain/add (wallet)  appends a "Verified" wallet card (MetaMask-card pattern)
//   - blockchain/verify        flips a card "Not Verified" → "Pending"
//   - blockchain/list          removes cards (delete / unlink confirm sheet)
// Screens subscribe via useAddresses() (useSyncExternalStore) so the list
// re-renders when a pushed flow changes state behind it.

import { useSyncExternalStore } from "react";
import { blockchainAddresses, networks } from "@app/data/db.js";

let seq = 0;
let snapshot = blockchainAddresses.linked.map((a) => ({ ...a, id: a.id || `addr-${++seq}` }));
const listeners = new Set();

function emit(next) {
  snapshot = next;
  listeners.forEach((l) => l());
}

export function subscribeAddresses(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAddresses() {
  return snapshot;
}

export function useAddresses() {
  return useSyncExternalStore(subscribeAddresses, getAddresses);
}

export function getAddress(id) {
  return snapshot.find((a) => a.id === id) || null;
}

/** First address still awaiting verification — fallback target when
 *  blockchain/verify is pushed without params (e.g. from transfers). */
export function firstUnverified() {
  return snapshot.find((a) => a.status === "Not Verified") || null;
}

function networkAssetId(name) {
  return networks.find((n) => n.name === name)?.assetId;
}

/** Manual add (spec A4 submit): appends a "Not Verified" card mirroring the
 *  Solana card pattern. Returns the new row. */
export function addManualAddress({ label, network, address, addrType, platform }) {
  const custodial = addrType === "Custodial";
  const row = {
    id: `addr-${++seq}`,
    provider: label || network,
    subtitle: custodial
      ? `${platform} - Personal Address (Custodial)`
      : "Personal Address (Non-Custodial)",
    address,
    status: "Not Verified",
    networks: [network],
    networkAssetIds: [networkAssetId(network)].filter(Boolean)
  };
  emit([...snapshot, row]);
  return row;
}

// Address a wallet connection reports back. Reconstructed — the post-approval
// screens were never captured, and db's only EVM address is the already-linked
// MetaMask card.
export const DEMO_WALLET_ADDRESS = "0x4b3f9a5c81d02e6b8a3c15f7d4e9b0a6c2d81f53"; // reconstructed

/** Wallet link (spec A3/A5 approve): appends a "Verified" wallet card
 *  mirroring the MetaMask card pattern. Returns the new row. */
export function addWalletAddress({ provider, chain }) {
  const row = {
    id: `addr-${++seq}`,
    provider,
    subtitle: `${provider} - Personal Address (Non-Custodial)`,
    address: DEMO_WALLET_ADDRESS,
    status: "Verified",
    networks: [chain],
    networkAssetIds: [networkAssetId(chain)].filter(Boolean)
  };
  emit([...snapshot, row]);
  return row;
}

export function setAddressStatus(id, status) {
  emit(snapshot.map((a) => (a.id === id ? { ...a, status } : a)));
}

export function removeAddress(id) {
  emit(snapshot.filter((a) => a.id !== id));
}
