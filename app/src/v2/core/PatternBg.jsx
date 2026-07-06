import { useMemo } from "react";
import logomarkUrl from "@ds/assets/logomark-full.svg";

/**
 * Logomark pattern backdrop — brand guidelines p.14: logomark tiled at 10%
 * alpha over ivy/teal surfaces. Fades out toward the bottom via mask.
 */
export function PatternBg() {
  const style = useMemo(() => ({ "--v2-pattern-url": `url(${logomarkUrl})` }), []);
  return <div className="v2-pattern" style={style} aria-hidden="true" />;
}
