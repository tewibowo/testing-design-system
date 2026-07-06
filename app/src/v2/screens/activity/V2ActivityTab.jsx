/* ────────────────────────────────────────────────
 * ANIMATION STORYBOARD — v2 Activity tab (brief §2.5, §4.12)
 *     0ms   tab pane crossfades in (host-owned tabContent swap)
 *    40ms   day headers + rows stagger 50ms apart (fade + 12px rise)
 *  filter   list container swaps via popLayout: old fades (130ms),
 *  change   new group re-runs the 50ms stagger entrance
 *  search   header icon → inline teal search row expands (200ms,
 *           brand ease), pushing the chips row down
 * Timing values live in @app/motion/presets.js (DUR / EASE_BRAND).
 * ──────────────────────────────────────────────── */
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AppHeader } from "@app/ui/AppHeader.jsx";
import { Money } from "@app/ui/Money.jsx";
import { useSheet } from "@app/nav/Sheet.jsx";
import { transactions } from "@app/data/db.js";
import { listContainer, listItem, pressable, DUR, EASE_BRAND } from "@app/motion/presets.js";
import { V2ActivityDetailSheet } from "./V2ActivityDetailSheet.jsx";
import { V2ActivityFilterSheet } from "./V2ActivityFilterSheet.jsx";
import {
  parseTxDate,
  dayLabel,
  txKind,
  KIND_ICONS,
  isPendingStatus,
  isFailedStatus,
  amountDecimals,
  DATE_RANGES
} from "./shared.jsx";
import "./v2activity-tab.css";

// §2.5.2 chips: All · by type · Pending covers the status axis.
const CHIPS = [
  { id: "all", label: "All" },
  { id: "deposit", label: "Deposits" },
  { id: "withdrawal", label: "Withdrawals" },
  { id: "swap", label: "Swaps" },
  { id: "mint", label: "Mint" },
  { id: "pending", label: "Pending" }
];

// Keyed list container: mount pass runs the 50ms stagger; exits fade fast.
const listVariants = {
  ...listContainer,
  exit: { opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }
};

export function V2ActivityTab() {
  const { openSheet } = useSheet();
  const [chip, setChip] = useState("all");
  const [range, setRange] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rangeRef = useRef(range);
  rangeRef.current = range;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const days = DATE_RANGES.find((r) => r.id === range)?.days ?? null;
    const cutoff = days ? Date.now() - days * 864e5 : null;
    return transactions
      .filter((tx) => {
        if (chip === "pending") {
          if (!isPendingStatus(tx.status)) return false;
        } else if (chip !== "all" && txKind(tx) !== chip) {
          return false;
        }
        if (cutoff) {
          const d = parseTxDate(tx.date);
          if (d && d.getTime() < cutoff) return false;
        }
        if (
          q &&
          !tx.id.toLowerCase().includes(q) &&
          !tx.shortId.toLowerCase().includes(q) &&
          !tx.description.toLowerCase().includes(q)
        ) {
          return false;
        }
        return true;
      })
      .sort(
        (a, b) =>
          (parseTxDate(b.date)?.getTime() ?? 0) - (parseTxDate(a.date)?.getTime() ?? 0)
      );
  }, [chip, range, query]);

  // Group by day (verbatim date part), newest group first (§2.5.3).
  const groups = useMemo(() => {
    const map = new Map();
    rows.forEach((tx) => {
      const key = tx.date.split(",")[0];
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(tx);
    });
    return [...map.entries()].map(([key, list]) => ({
      key,
      label: dayLabel(list[0].date),
      list
    }));
  }, [rows]);

  const openDetail = (tx) =>
    openSheet(() => <V2ActivityDetailSheet tx={tx} />);

  const openFilter = () =>
    openSheet(({ close }) => (
      <V2ActivityFilterSheet initial={rangeRef.current} onApply={setRange} close={close} />
    ));

  const toggleSearch = () =>
    setSearchOpen((open) => {
      if (open) setQuery("");
      return !open;
    });

  const rangeLabel = DATE_RANGES.find((r) => r.id === range)?.label;
  // Re-stagger on chip / range changes only — live search filters quietly.
  const listKey = `${chip}|${range}`;

  return (
    <>
      <AppHeader
        title="Activity"
        large
        right={
          <motion.button
            {...pressable}
            type="button"
            className="v2activity-iconbtn"
            aria-label={searchOpen ? "Close search" : "Search transactions"}
            onClick={toggleSearch}
          >
            <span className="material-symbols-rounded">
              {searchOpen ? "close" : "search"}
            </span>
          </motion.button>
        }
      />

      <div className="v2activity-chrome">
        <AnimatePresence initial={false}>
          {searchOpen && (
            <motion.div
              key="search"
              className="v2activity-searchwrap"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: DUR.base, ease: EASE_BRAND }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: 0.13, ease: EASE_BRAND }
              }}
            >
              <div className="v2activity-search">
                <span className="material-symbols-rounded" aria-hidden="true">
                  search
                </span>
                <input
                  className="v2activity-search__input"
                  type="search"
                  placeholder="Search by ID or description"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="v2activity-chips">
          <motion.button
            {...pressable}
            type="button"
            className="v2activity-chip v2activity-chip--icon"
            aria-label="Filter by date"
            onClick={openFilter}
          >
            <span className="material-symbols-rounded">tune</span>
          </motion.button>
          {CHIPS.map((c) => (
            <motion.button
              key={c.id}
              {...pressable}
              type="button"
              className={"v2activity-chip" + (chip === c.id ? " is-active" : "")}
              aria-pressed={chip === c.id}
              onClick={() => setChip(c.id)}
            >
              {c.label}
            </motion.button>
          ))}
          <AnimatePresence initial={false}>
            {range !== "all" && (
              <motion.button
                key="range"
                {...pressable}
                type="button"
                className="v2activity-chip is-range"
                aria-label={`Remove ${rangeLabel} filter`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: DUR.base, ease: EASE_BRAND }
                }}
                exit={{ opacity: 0, transition: { duration: 0.13, ease: EASE_BRAND } }}
                onClick={() => setRange("all")}
              >
                {rangeLabel}
                <span className="material-symbols-rounded" aria-hidden="true">
                  close
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="screen-scroll">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={listKey}
            className="v2activity-list"
            variants={listVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            {groups.map((g) => (
              <section className="v2activity-group" key={g.key}>
                <motion.div className="v2activity-dayhead" variants={listItem}>
                  {g.label}
                </motion.div>
                {g.list.map((tx) => (
                  <ActivityRow key={tx.id} tx={tx} onOpen={() => openDetail(tx)} />
                ))}
              </section>
            ))}
            {groups.length === 0 && (
              <motion.div className="v2activity-empty" variants={listItem}>
                <p className="v2activity-empty__title">No transactions found</p>
                <p className="v2activity-empty__sub">
                  Try a different filter or search term.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

/* ── Row anatomy (§2.5.3): icon circle · title/sub · signed mono amount ── */

function ActivityRow({ tx, onOpen }) {
  const kind = txKind(tx);
  const failed = isFailedStatus(tx.status);
  const pending = isPendingStatus(tx.status);
  const credit = tx.direction === "in";
  const time = tx.date.split(", ")[1];
  const sub = [tx.description, tx.network].filter(Boolean).join(" · ");

  return (
    <motion.button
      type="button"
      variants={listItem}
      {...pressable}
      className="v2activity-row"
      onClick={onOpen}
    >
      <span className="v2activity-row__icon" aria-hidden="true">
        <span className="material-symbols-rounded">{KIND_ICONS[kind]}</span>
      </span>
      <span className="v2activity-row__body">
        <span className="v2activity-row__title">{tx.type}</span>
        {sub && <span className="v2activity-row__sub">{sub}</span>}
      </span>
      <span className="v2activity-row__side">
        {tx.amount != null && tx.asset ? (
          <Money
            className={
              "v2activity-row__amt" +
              (failed ? " is-failed" : credit ? " is-credit" : "")
            }
            value={tx.amount}
            decimals={amountDecimals(tx.amount)}
            prefix={credit ? "+" : "−"}
            suffix={` ${tx.asset}`}
          />
        ) : (
          <span className="v2activity-row__amt is-muted">—</span>
        )}
        {failed ? (
          <span className="v2activity-row__flag is-failed">{tx.status}</span>
        ) : pending ? (
          <span className="v2activity-row__flag is-pending">{tx.status}</span>
        ) : (
          <span className="v2activity-row__time">{time}</span>
        )}
      </span>
    </motion.button>
  );
}
