import React from "react";
import "./ListSupportedNetwork.css";

/**
 * Overlapping stack of supported-network logos with an optional "+N" overflow
 * count and a "NEW" badge. Figma: List - Supported Network (5551:8211).
 *
 * `networks` is an array of ReactNodes (round 20px icons). Pass `overflow` to
 * show a trailing "+N". Set `isNew` to surface the NEW badge.
 * Do NOT pass remote Figma asset URLs — supply rendered icon nodes.
 */
export function ListSupportedNetwork({
  networks = [],
  overflow = 0,
  isNew = false,
  className = "",
  ...rest
}) {
  const cls = ["sx-supported-network", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      <div className="sx-supported-network__stack">
        {networks.map((node, i) => (
          <span className="sx-supported-network__icon" key={i}>
            {node}
          </span>
        ))}
      </div>
      {overflow > 0 && (
        <span className="sx-supported-network__more">+{overflow}</span>
      )}
      {isNew && <span className="sx-supported-network__badge">NEW</span>}
    </div>
  );
}
