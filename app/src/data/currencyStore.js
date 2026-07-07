// Display-currency store — which fiat currency the Estimated Balance (and
// every ≈-conversion on Home) is denominated in. Options and fixed demo FX
// live in db.js (`fiatCurrencies`); SGD is the dashboard default.
import { useSyncExternalStore } from "react";
import { fiatCurrencies } from "@app/data/db.js";

let current = fiatCurrencies[0]; // SGD
const listeners = new Set();

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDisplayCurrency() {
  return current;
}

export function setDisplayCurrency(code) {
  const next = fiatCurrencies.find((c) => c.code === code);
  if (!next || next === current) return;
  current = next;
  listeners.forEach((l) => l());
}

/** { code, name, perSgd, decimals } for the selected display currency. */
export function useDisplayCurrency() {
  return useSyncExternalStore(subscribe, getDisplayCurrency);
}

/** Convert an SGD value into the given display currency. */
export function fromSgd(sgdValue, currency = current) {
  return sgdValue * currency.perSgd;
}
