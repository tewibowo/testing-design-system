// Swap-rate math for the prototype. Both captured rates are parsed straight
// out of db.js strings (never hardcoded here) and cross rates are derived
// from them so ANY pair of holdings — stablecoins (XSGD/XUSD/USDT/USDC) or
// fiat cash (USD/SGD/IDR) — quotes consistently.
import { swapRates, fiatCurrencies } from "@app/data/db.js";

/** Parse "1 USDT ≈ 1.2908 XSGD" → { from, rate, to }. */
function parseRate(str) {
  const m = /^1\s+(\S+)\s+≈\s+([\d.]+)\s+(\S+)$/.exec(str);
  if (!m) throw new Error(`Unparseable rate string: ${str}`);
  return { from: m[1], rate: Number(m[2]), to: m[3] };
}

const xsgdToXusd = parseRate(swapRates.xsgdToXusd); // 1 XSGD ≈ 0.7717 XUSD
const usdtToXsgd = parseRate(swapRates.usdtToXsgd); // 1 USDT ≈ 1.2908 XSGD

// Value of 1 unit of each asset expressed in XSGD (pegged 1:1 to SGD, so
// this doubles as the SGD valuation used by Home's ≈-conversions).
// - USDC mirrors USDT (both USD-pegged; no USDC rate was captured).
// - Fiat values derive from the db fiatCurrencies FX table (`perSgd`),
//   so cash USD quotes a hair off USDT — like real markets.
const VALUE_IN_XSGD = {
  XSGD: 1,
  XUSD: 1 / xsgdToXusd.rate,
  USDT: usdtToXsgd.rate,
  USDC: usdtToXsgd.rate,
  ...Object.fromEntries(fiatCurrencies.map((c) => [c.code, 1 / c.perSgd]))
};

/** SGD value of 1 unit of any wallet asset (stablecoin or fiat). */
export function valueInSgd(assetId) {
  return VALUE_IN_XSGD[assetId] ?? 0;
}

/** Exact cross rate for a pair — first quote matches the captured strings. */
export function baseRate(from, to) {
  return VALUE_IN_XSGD[from] / VALUE_IN_XSGD[to];
}

/** ±0.15% wobble so a re-quote is visible when the countdown refreshes. */
export function jitterRate(rate) {
  return rate * (1 + (Math.random() - 0.5) * 0.003);
}
