// Wallet balances for the mintswap area — seeded from db.js (never
// hardcoded) and mutated by a completed swap so the updated figures animate
// through <Money> odometers (spec §6: USDT 23.77 → 13.77, XSGD 0.00 → 12.90).
// Module-level store + useSyncExternalStore hook, same pattern as
// account/bankStore.js.
import { useSyncExternalStore } from "react";
import { balances as dbBalances } from "@app/data/db.js";

/** @type {Record<string, number>} asset id → numeric balance */
let snapshot = Object.fromEntries(
  dbBalances.assets.map((a) => [a.asset, Number(a.balance)])
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

/** Commit an executed swap: spend leaves `fromId`, receive lands on `toId`. */
export function applySwap(fromId, toId, spend, receive) {
  const round2 = (n) => Math.round(n * 100) / 100;
  emit({
    ...snapshot,
    [fromId]: round2((snapshot[fromId] ?? 0) - spend),
    [toId]: round2((snapshot[toId] ?? 0) + receive)
  });
}
