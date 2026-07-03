// Module-level bank-account state shared by the Account screens.
//
// Seeds from db.js (never hardcoded) and lets the flows mutate a copy:
//   - account/banks-add appends a new Unverified row
//   - account/banks-verify flips a row Unverified → Pending
//   - AccountTab can remove rows (delete confirm sheet)
// AccountTab subscribes via useBanks() (useSyncExternalStore) so it
// re-renders when a pushed flow changes state behind it.

import { useSyncExternalStore } from "react";
import { banks as dbBanks } from "@app/data/db.js";

let seq = 0;
let snapshot = dbBanks.linked.map((b) => ({ id: `bank-${++seq}`, ...b }));
const listeners = new Set();

function emit(next) {
  snapshot = next;
  listeners.forEach((l) => l());
}

export function subscribeBanks(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getBanks() {
  return snapshot;
}

export function useBanks() {
  return useSyncExternalStore(subscribeBanks, getBanks);
}

export function addBank({ name, account }) {
  emit([
    ...snapshot,
    { id: `bank-${++seq}`, name, account, status: "Unverified", statusAfterVerify: "Pending" }
  ]);
}

export function removeBank(id) {
  emit(snapshot.filter((b) => b.id !== id));
}

export function setBankStatus(name, status) {
  emit(snapshot.map((b) => (b.name === name ? { ...b, status } : b)));
}

/** First bank still awaiting verification — fallback target when
 *  account/banks-verify is pushed without params. */
export function firstUnverified() {
  return snapshot.find((b) => b.status === "Unverified") || null;
}
