// Mint configuration gate (mint-swap.md cross-flow notes): the Mint page's
// transfer instructions only exist after a 2FA-verified setup. Module-level
// so the flag survives navigation within a session; exposed as a
// useSyncExternalStore hook so the mint gate screen re-renders when a
// pushed setup flow flips the flag behind it.
import { useSyncExternalStore } from "react";

let mintConfigured = false;
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return mintConfigured;
}

export function isMintConfigured() {
  return mintConfigured;
}

export function setMintConfigured(value = true) {
  mintConfigured = value;
  listeners.forEach((l) => l());
}

export function useMintConfigured() {
  return useSyncExternalStore(subscribe, getSnapshot);
}
