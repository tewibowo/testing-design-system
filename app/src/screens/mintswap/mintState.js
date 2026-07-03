// Mint configuration gate (mint-swap.md cross-flow notes): the Mint page's
// transfer instructions only exist after a 2FA-verified setup. Module-level
// so the flag survives navigation within a session.
let mintConfigured = false;

export function isMintConfigured() {
  return mintConfigured;
}

export function setMintConfigured(value = true) {
  mintConfigured = value;
}
