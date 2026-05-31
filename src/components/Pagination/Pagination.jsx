import React, { useState } from "react";
import "./Pagination.css";

function range(from, to) {
  const out = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
}

/**
 * Builds the page list with ellipses, like: 1 … 4 5 [6] 7 8 … 24
 */
function buildPages(current, total, siblings = 1) {
  const totalShown = siblings * 2 + 5; // first + last + current + 2*siblings + 2 ellipses
  if (total <= totalShown) return range(1, total);
  const left = Math.max(current - siblings, 2);
  const right = Math.min(current + siblings, total - 1);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < total - 1;
  const pages = [1];
  if (showLeftEllipsis) pages.push("…");
  pages.push(...range(left, right));
  if (showRightEllipsis) pages.push("…");
  pages.push(total);
  return pages;
}

/**
 * Pagination control.
 *   <Pagination page={p} totalPages={42} onChange={setP} />
 *
 * `disabledPages`: array of page numbers to render disabled/non-interactive.
 * `showGoTo`: renders a small "go to page" number input + Go that calls onChange.
 */
export function Pagination({
  page = 1,
  totalPages = 1,
  onChange,
  siblings = 1,
  showSummary = false,
  total,
  pageSize,
  disabledPages = [],
  showGoTo = false,
  className = "",
}) {
  const pages = buildPages(page, totalPages, siblings);
  const isDisabled = (p) => disabledPages.includes(p);
  const go = (p) => {
    if (p < 1 || p > totalPages || p === page || isDisabled(p)) return;
    onChange && onChange(p);
  };
  const [goToValue, setGoToValue] = useState("");
  const submitGoTo = () => {
    const n = parseInt(goToValue, 10);
    if (!Number.isNaN(n)) go(n);
    setGoToValue("");
  };
  return (
    <nav aria-label="Pagination" className={"sx-pagination " + className}>
      <button
        type="button"
        className="sx-pagination__btn"
        disabled={page <= 1}
        onClick={() => go(page - 1)}
        aria-label="Previous page"
      >
        <span className="material-symbols-rounded">chevron_left</span>
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="sx-pagination__ellipsis" aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={"sx-pagination__btn" + (p === page ? " is-active" : "")}
            aria-current={p === page ? "page" : undefined}
            disabled={isDisabled(p)}
            onClick={() => go(p)}
          >
            {p}
          </button>
        )
      )}
      <button
        type="button"
        className="sx-pagination__btn"
        disabled={page >= totalPages}
        onClick={() => go(page + 1)}
        aria-label="Next page"
      >
        <span className="material-symbols-rounded">chevron_right</span>
      </button>
      {showGoTo && (
        <span className="sx-pagination__goto">
          <input
            type="number"
            className="sx-pagination__goto-input"
            min={1}
            max={totalPages}
            value={goToValue}
            onChange={(e) => setGoToValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submitGoTo(); }}
            aria-label="Go to page"
            placeholder="Page"
          />
          <button
            type="button"
            className="sx-pagination__goto-btn"
            onClick={submitGoTo}
          >
            Go
          </button>
        </span>
      )}
      {showSummary && total != null && pageSize != null && (
        <span className="sx-pagination__summary">
          {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
        </span>
      )}
    </nav>
  );
}
