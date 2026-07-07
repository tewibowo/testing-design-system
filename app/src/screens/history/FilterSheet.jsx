// "Filter & Sort" bottom sheet — spec §9 flags this UI as [inferred]
// (the panel was never captured). Kept plausible and simple: date range,
// transaction type / asset / status chips, sort; Reset / Apply footer.
import { useState } from "react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { DateInput } from "@ds/components/DateInput/DateInput.jsx";
import {
  EMPTY_FILTERS,
  FILTER_TYPES,
  FILTER_ASSETS,
  FILTER_STATUSES,
  SORT_OPTIONS,
  STATUS_TONES
} from "./shared.jsx";
import "./history.css";

const toggle = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

export function HistoryFilterSheet({ initial = EMPTY_FILTERS, onApply, close }) {
  const [draft, setDraft] = useState(initial);

  const toggleIn = (key, value) =>
    setDraft((d) => ({ ...d, [key]: toggle(d[key], value) }));

  return (
    <div className="history-sheet">
      <h3 className="history-sheet__title">Filter &amp; Sort</h3>

      <DateInput
        label="Date Range"
        range
        startValue={draft.start}
        endValue={draft.end}
        onRangeChange={({ start, end }) =>
          setDraft((d) => ({ ...d, start: start ?? "", end: end ?? "" }))
        }
      />

      <div className="history-sheet__section">
        <span className="history-sheet__label">Transaction Type</span>
        <div className="history-sheet__chips">
          {FILTER_TYPES.map((type) => (
            <Tag
              key={type}
              clickable
              selected={draft.types.includes(type)}
              tone="neutral"
              onClick={() => toggleIn("types", type)}
            >
              {type}
            </Tag>
          ))}
        </div>
      </div>

      <div className="history-sheet__section">
        <span className="history-sheet__label">Asset</span>
        <div className="history-sheet__chips">
          {FILTER_ASSETS.map((asset) => (
            <Tag
              key={asset}
              clickable
              selected={draft.assets.includes(asset)}
              tone="neutral"
              onClick={() => toggleIn("assets", asset)}
            >
              {asset}
            </Tag>
          ))}
        </div>
      </div>

      <div className="history-sheet__section">
        <span className="history-sheet__label">Status</span>
        <div className="history-sheet__chips">
          {FILTER_STATUSES.map((status) => (
            <Tag
              key={status}
              clickable
              selected={draft.statuses.includes(status)}
              tone={STATUS_TONES[status]}
              onClick={() => toggleIn("statuses", status)}
            >
              {status}
            </Tag>
          ))}
        </div>
      </div>

      <div className="history-sheet__section">
        <span className="history-sheet__label">Sort by</span>
        <div className="history-sheet__chips">
          {SORT_OPTIONS.map((opt) => (
            <Tag
              key={opt.id}
              clickable
              selected={draft.sort === opt.id}
              tone="neutral"
              onClick={() => setDraft((d) => ({ ...d, sort: opt.id }))}
            >
              {opt.label}
            </Tag>
          ))}
        </div>
      </div>

      <div className="history-sheet__footer">
        <Button variant="secondary" onClick={() => setDraft(EMPTY_FILTERS)}>
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onApply?.(draft);
            close?.();
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
