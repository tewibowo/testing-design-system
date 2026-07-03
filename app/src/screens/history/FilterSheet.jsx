// "Filter & Sort" bottom sheet — spec §9 flags this UI as [inferred]
// (the panel was never captured). Kept deliberately simple per the build
// brief: date range + status chips; Reset / Apply footer.
import { useState } from "react";
import { Button } from "@ds/components/Button/Button.jsx";
import { Tag } from "@ds/components/Tag/Tag.jsx";
import { DateInput } from "@ds/components/DateInput/DateInput.jsx";
import { EMPTY_FILTERS, FILTER_STATUSES, STATUS_TONES } from "./shared.jsx";
import "./history.css";

export function HistoryFilterSheet({ initial = EMPTY_FILTERS, onApply, close }) {
  const [draft, setDraft] = useState(initial);

  const toggleStatus = (status) =>
    setDraft((d) => ({
      ...d,
      statuses: d.statuses.includes(status)
        ? d.statuses.filter((s) => s !== status)
        : [...d.statuses, status]
    }));

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
        <span className="history-sheet__label">Status</span>
        <div className="history-sheet__chips">
          {FILTER_STATUSES.map((status) => (
            <Tag
              key={status}
              clickable
              selected={draft.statuses.includes(status)}
              tone={STATUS_TONES[status]}
              onClick={() => toggleStatus(status)}
            >
              {status}
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
