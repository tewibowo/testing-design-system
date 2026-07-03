/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Transaction History tab
 *     0ms   active tab panel crossfades in (AnimatePresence
 *           popLayout swap, 200ms, brand ease)
 *    40ms   rows stagger in 50ms apart (fade + 12px rise, 240ms)
 *  filter   removed rows fade up + out (160ms ease-in), survivors
 *  apply    reflow via layout (240ms), returning rows fade + rise
 * Timing values live in @app/motion/presets.js (DUR / EASE_BRAND) —
 * the single source of truth for durations used here.
 * ──────────────────────────────────────────────── */
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Money } from "@app/ui/Money.jsx";
import { useNav } from "@app/nav/Navigator.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { transactions, transactionsEmptyState } from "@app/data/db.js";
import { listContainer, listItem, tabContent, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { Tabs } from "@ds/components/Tabs/Tabs.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { Button } from "@ds/components/Button/Button.jsx";
import { IconButton } from "@ds/components/IconButton/IconButton.jsx";
import { Input } from "@ds/components/Input/Input.jsx";
import { EmptyState } from "@ds/components/EmptyState/EmptyState.jsx";
import { AssetMark } from "@ds/components/AssetMark/AssetMark.jsx";
import { HistoryFilterSheet } from "./FilterSheet.jsx";
import {
  STATUS_TONES,
  EMPTY_FILTERS,
  applyFilters,
  isFiltering,
  copyText,
  useHistoryToast
} from "./shared.jsx";
import "./history.css";

// Panel = tab content unit: crossfade via popLayout + stagger children.
const panelVariants = {
  initial: tabContent.initial,
  enter: {
    ...tabContent.enter,
    transition: {
      ...tabContent.enter.transition,
      ...listContainer.enter.transition
    }
  },
  exit: tabContent.exit
};

// Rows: shared list entrance + a faster exit for filter removals
// (exits run ~2/3 of enters, same brand ease — no invented curves).
const rowVariants = {
  ...listItem,
  exit: { opacity: 0, y: -8, transition: { duration: 0.16, ease: EASE_BRAND } }
};

// Spec §1.2 tab bar, names verbatim.
const MAIN_TABS = [
  { id: "funding", label: "Funding" },
  { id: "swap", label: "Swap" },
  { id: "otc", label: "OTC Request" }
];

export function HistoryTab() {
  const nav = useNav();
  const { openSheet } = useSheet();
  const [toastNode, showToast] = useHistoryToast();

  const [tab, setTab] = useState("funding");
  const [subFilter, setSubFilter] = useState("all"); // funding sub-filter (§1.2)
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [query, setQuery] = useState(""); // "Search by Transaction ID" (§1.4)
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const fundingRows = useMemo(() => transactions.filter((t) => t.tab === "funding"), []);
  const swapRows = useMemo(() => transactions.filter((t) => t.tab === "swap"), []);
  // "Action Needed" = rows awaiting the user (none in the captured data → 0).
  const actionRows = useMemo(() => fundingRows.filter((t) => t.status !== "Completed"), [fundingRows]);

  const rows = useMemo(() => {
    let base;
    if (tab === "funding") base = subFilter === "all" ? fundingRows : actionRows;
    else if (tab === "swap") base = swapRows;
    else base = []; // OTC Request tab is empty until a request is submitted (§3)
    const q = query.trim().toLowerCase();
    if (q) base = base.filter((t) => t.id.toLowerCase().includes(q));
    return applyFilters(base, filters);
  }, [tab, subFilter, filters, query, fundingRows, actionRows, swapRows]);

  const filterActive = isFiltering(filters);

  const openFilterSheet = () =>
    openSheet(({ close }) => (
      <HistoryFilterSheet
        initial={filtersRef.current}
        onApply={setFilters}
        close={close}
      />
    ));

  const openDetail = (tx) => nav.push("history/detail", { txId: tx.id });

  const copyId = (e, tx) => {
    e.stopPropagation();
    copyText(tx.id);
    showToast("Copied");
  };

  const subTabs = [
    { id: "all", label: "All Funding" },
    {
      id: "action",
      label: (
        <span className="history-subtab">
          Action Needed
          <span className="history-subtab__count">{actionRows.length}</span>
        </span>
      )
    }
  ];

  const panelKey = tab === "funding" ? `funding:${subFilter}` : tab;

  return (
    <>
      <AppHeader
        title="Transaction History"
        large
        right={
          <span className="history-filter-wrap">
            <IconButton
              icon="tune"
              size="sm"
              label="Filter & Sort"
              onClick={openFilterSheet}
            />
            {filterActive && <span className="history-filter-dot" aria-hidden="true" />}
          </span>
        }
      />

      <div className="history-chrome">
        <Tabs items={MAIN_TABS} fill activeTab={tab} onTabChange={setTab} />
        <div className="history-toolbar">
          <Input
            type="search"
            size="small"
            placeholder="Search by Transaction ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="history-toolbar__search"
          />
          <IconButton
            icon="download"
            size="sm"
            label="Export CSV"
            disabled={rows.length === 0}
            onClick={() => showToast("CSV export is not available in this prototype", "info")}
          />
        </div>
        {tab === "funding" && (
          <div className="history-subrow">
            <Tabs
              items={subTabs}
              variant="secondary"
              activeTab={subFilter}
              onTabChange={setSubFilter}
            />
          </div>
        )}
      </div>

      <div className="screen-scroll">
        <div className="screen-pad">
          <div className="history-panelhost">
            {/* initial NOT disabled: RootTabs remounts the tab per switch, so
                the mount pass IS the entrance — panel fades, rows stagger. */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={panelKey}
                className="history-panel"
                variants={panelVariants}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {tab === "otc" ? (
                  <OtcEmptyState onRequest={() => nav.push("home/otc")} />
                ) : (
                  <div className="history-list">
                    <AnimatePresence mode="popLayout">
                      {rows.map((tx) => (
                        <HistoryRow
                          key={tx.id}
                          tx={tx}
                          onOpen={() => openDetail(tx)}
                          onCopy={(e) => copyId(e, tx)}
                        />
                      ))}
                      {rows.length === 0 && (
                        <motion.div
                          key="__empty"
                          layout
                          className="history-empty"
                          variants={rowVariants}
                          exit="exit"
                        >
                          <EmptyState
                            compact
                            title={transactionsEmptyState.title}
                            sub={transactionsEmptyState.sub}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <LegalFooter onLink={() => showToast("Not available in this prototype", "info")} />
        </div>
      </div>

      {toastNode}
    </>
  );
}

/* ── Row: web table row → mobile card (§1.5 / §2.5) ─────────────── */

function HistoryRow({ tx, onOpen, onCopy }) {
  const title = tx.tab === "swap" ? tx.description : tx.type;
  const subtitle = tx.tab === "swap" ? tx.detail?.pair : tx.description;
  const extra =
    tx.tab === "funding" && tx.detail?.details && tx.detail.details !== "-"
      ? tx.detail.details
      : null;
  const dirIcon =
    tx.tab === "swap" ? "swap_horiz" : tx.direction === "in" ? "south_west" : "north_east";

  return (
    <motion.div
      layout
      variants={rowVariants}
      exit="exit"
      transition={{ layout: { duration: DUR.slow, ease: EASE_BRAND } }}
      {...pressable}
      className="history-row"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <span className="history-row__mark">
        {tx.asset ? (
          <AssetMark asset={tx.asset} size={36} />
        ) : (
          <span className="history-row__fallback">
            <span className="material-symbols-rounded">receipt_long</span>
          </span>
        )}
        <span className="history-row__dir">
          <span className="material-symbols-rounded">{dirIcon}</span>
        </span>
      </span>

      <span className="history-row__body">
        <span className="history-row__title">{title}</span>
        {subtitle && <span className="history-row__sub">{subtitle}</span>}
        {extra && <span className="history-row__sub history-row__sub--extra">{extra}</span>}
        <span className="history-row__meta">
          <span className="history-row__id">{tx.shortId}</span>
          <button
            type="button"
            className="history-copy"
            aria-label="Copy transaction ID"
            onClick={onCopy}
          >
            <span className="material-symbols-rounded">content_copy</span>
          </button>
          <span className="history-row__dot" aria-hidden="true">
            ·
          </span>
          <span className="history-row__date">{tx.date}</span>
        </span>
      </span>

      <span className="history-row__side">
        <RowAmount tx={tx} />
        <Tag tone={STATUS_TONES[tx.status] ?? "neutral"} size="small">
          {tx.status}
        </Tag>
      </span>
    </motion.div>
  );
}

function RowAmount({ tx }) {
  if (tx.amount == null || !tx.asset) {
    return <span className="history-row__amt is-muted">-</span>;
  }
  // Funding rows carry an explicit sign ("+13.78 USDT"); swap/OTC amounts
  // render unsigned per the captured tables ("10.00 XUSD", "100,000 USDC").
  const sign = tx.tab === "funding" ? (tx.direction === "in" ? "+" : "-") : "";
  const decimals = Number.isInteger(tx.amount) && tx.amount >= 1000 ? 0 : 2;
  return (
    <Money
      className="history-row__amt"
      value={tx.amount}
      decimals={decimals}
      prefix={sign}
      suffix={` ${tx.asset}`}
    />
  );
}

/* ── OTC Request tab empty state (§3) ───────────────────────────── */

function OtcEmptyState({ onRequest }) {
  return (
    <motion.div variants={rowVariants} className="history-empty history-empty--otc">
      <OtcBoxIllustration />
      <EmptyState
        compact
        title={transactionsEmptyState.title}
        sub={transactionsEmptyState.sub}
      />
      <Button variant="primary" size="lg" onClick={onRequest}>
        {transactionsEmptyState.cta}
      </Button>
    </motion.div>
  );
}

// Spec §3.2: open cardboard box, green lid, orange circular "!" badge.
function OtcBoxIllustration() {
  return (
    <svg
      className="history-otc-illo"
      viewBox="0 0 120 96"
      width="120"
      height="96"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="28" y="46" width="64" height="36" rx="4" fill="#e8dccb" />
      <rect x="28" y="46" width="64" height="9" fill="#dccbb2" />
      <path d="M28 47 L14 31 L46 25 L60 41 Z" fill="var(--sx-color-vibrant-green, #00d37e)" />
      <path d="M92 47 L106 31 L74 25 L60 41 Z" fill="#02b06c" />
      <path d="M28 46 L60 41 L92 46 L60 53 Z" fill="#b89c74" />
      <circle cx="97" cy="22" r="13" fill="var(--sx-color-warning, #fc9a07)" />
      <rect x="95.4" y="14" width="3.2" height="10" rx="1.6" fill="#ffffff" />
      <circle cx="97" cy="28.6" r="2" fill="#ffffff" />
    </svg>
  );
}

/* ── Legal footer — global chrome (§0), verbatim ────────────────── */

function LegalFooter({ onLink }) {
  return (
    <footer className="history-legal">
      <p>XSGD, XUSD and XIDR are issued by StraitsX.</p>
      <p>
        “STRAITSX”, “XSGD” and “XIDR” and all other URLs, logos and trademarks
        related to the StraitsX Services are either trademarks or registered
        trademarks of StraitsX or its licensors.
      </p>
      <p>
        StraitsX is the trading name of the StraitsX Group of Companies and its
        affiliated entities.
      </p>
      <p>
        Important Risk Warnings Regarding Digital Payment Tokens:{" "}
        <button type="button" className="history-link" onClick={onLink}>
          Learn More
        </button>
      </p>
    </footer>
  );
}
