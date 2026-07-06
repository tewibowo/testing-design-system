// v2 Home is sheet-first (brief §2.1): account summary, deposit QR info,
// notifications, asset breakdown, deposit methods and the OTC desk all live
// in sheets; money movement pushes the canonical cross-area routes
// (v2/deposit/*, v2/withdraw, v2/swap, v2/mint) owned by other areas.
// No pushed screens of our own — the registry is intentionally empty.
export const v2HomeRoutes = {};
