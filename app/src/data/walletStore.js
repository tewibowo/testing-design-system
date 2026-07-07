// Live wallet balances shared by Home, Swap and the Transfer sheets —
// seeded from db.js (stablecoins + fiat cash) and mutated by completed
// swaps / withdrawals so the updated figures animate through <Money>
// odometers everywhere they're shown.
// Module-level store + useSyncExternalStore hook, same pattern as
// account/bankStore.js.
import { useSyncExternalStore } from "react";
import { balances as dbBalances } from "@app/data/db.js";

/** @type {Record<string, number>} asset id → numeric balance */
let snapshot = Object.fromEntries(
  [...dbBalances.assets, ...dbBalances.fiat].map((a) => [a.asset, Number(a.balance)])
);
const listeners = new Set();

function emit(next) {
  snapshot = next;
  listeners.forEach((l) => l());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getBalances() {
  return snapshot;
}

export function useBalances() {
  return useSyncExternalStore(subscribe, getBalances);
}

const round2 = (n) => Math.round(n * 100) / 100;

/** Commit an executed swap: spend leaves `fromId`, receive lands on `toId`. */
export function applySwap(fromId, toId, spend, receive) {
  emit({
    ...snapshot,
    [fromId]: round2((snapshot[fromId] ?? 0) - spend),
    [toId]: round2((snapshot[toId] ?? 0) + receive)
  });
}

/** Debit a completed Transfer Out so Home reflects the withdrawal. */
export function debit(assetId, amount) {
  emit({
    ...snapshot,
    [assetId]: Math.max(0, round2((snapshot[assetId] ?? 0) - amount))
  });
}
