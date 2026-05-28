import React from "react";
import "./QR.css";

/**
 * QR code display.
 * Uses Google's chart server by default to keep the package dependency-free —
 * swap `urlBuilder` to point at any QR service or pre-generated image.
 *
 *   <QR value="0xa1B…" label="Deposit address" />
 */
const defaultUrlBuilder = (value, size) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}`;

export function QR({
  value,
  size = 200,
  label,
  sub,
  urlBuilder = defaultUrlBuilder,
  className = "",
}) {
  return (
    <div className={"sx-qr " + className}>
      <img
        className="sx-qr__img"
        style={{ width: size, height: size }}
        src={urlBuilder(value, size)}
        alt={label || "QR code"}
        loading="lazy"
      />
      {label && <div className="sx-qr__label">{label}</div>}
      {sub && <div className="sx-qr__sub">{sub || value}</div>}
    </div>
  );
}
