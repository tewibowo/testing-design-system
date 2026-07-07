import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";

/**
 * FiatFlag — circular flag mark for fiat cash, so fiat reads differently
 * from the stablecoin brand marks at a glance (design feedback). Flags are
 * simplified inline SVGs (3:2, cropped to the circle) — no image/emoji
 * dependency, crisp at every size, offline-safe.
 *
 * HoldingMark — drop-in mark for any wallet asset id: flags for fiat,
 * AssetMark brand marks for everything else.
 */

const STRIPE = 40 / 13;

function UsFlag() {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * STRIPE} width="60" height={STRIPE} fill="#B22234" />
      ))}
      <rect width="27" height={STRIPE * 7} fill="#3C3B6E" />
      {[4.5, 11, 17.5, 24].flatMap((x) =>
        [3.4, 10.8, 18.2].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#fff" />
        ))
      )}
    </svg>
  );
}

function SgFlag() {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="20" fill="#EF3340" />
      <circle cx="16" cy="10" r="6.2" fill="#fff" />
      <circle cx="18.4" cy="10" r="5.4" fill="#EF3340" />
      {[
        [22.5, 6.2],
        [19.6, 8.4],
        [25.4, 8.4],
        [20.7, 11.8],
        [24.3, 11.8]
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.05" fill="#fff" />
      ))}
    </svg>
  );
}

function IdFlag() {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <rect width="60" height="20" fill="#E70011" />
    </svg>
  );
}

function EuFlag() {
  const stars = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    return [30 + Math.cos(a) * 11, 20 + Math.sin(a) * 11];
  });
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="40" fill="#003399" />
      {stars.map(([x, y]) => (
        <circle key={`${x.toFixed(1)}-${y.toFixed(1)}`} cx={x} cy={y} r="1.5" fill="#FFCC00" />
      ))}
    </svg>
  );
}

function JpFlag() {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="60" height="40" fill="#fff" />
      <circle cx="30" cy="20" r="8.5" fill="#BC002D" />
    </svg>
  );
}

const FLAGS = { USD: UsFlag, SGD: SgFlag, IDR: IdFlag, EUR: EuFlag, JPY: JpFlag };

export const isFiat = (id) => !!FLAGS[id];

export function FiatFlag({ code, size = 40, className = "" }) {
  const Flag = FLAGS[code];
  if (!Flag) return null;
  return (
    <span
      className={`fiat-flag${className ? " " + className : ""}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={code}
    >
      <Flag />
    </span>
  );
}

/** Mark for any wallet asset id: flag for fiat cash, brand mark otherwise. */
export function HoldingMark({ asset, size = 40, className = "" }) {
  return isFiat(asset) ? (
    <FiatFlag code={asset} size={size} className={className} />
  ) : (
    <AssetMark asset={asset} size={size} className={className} />
  );
}
