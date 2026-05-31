import React, { useState } from "react";
import { Table } from "./Table.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { Pagination } from "../Pagination/Pagination.jsx";
import { Button } from "../Button/Button.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";

export default {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "padded" },
};

const rows = [
  { id: 1, date: "2026-05-22", ref: "TX-1029384", to: "John Doe",      asset: "XSGD", amount: 1250.0,  status: "Completed" },
  { id: 2, date: "2026-05-20", ref: "TX-1029301", to: "Acme Pte. Ltd.", asset: "XSGD", amount: 8400.5,  status: "Completed" },
  { id: 3, date: "2026-05-19", ref: "TX-1029220", to: "Mei Lin",        asset: "XIDR", amount: 2200000, status: "Pending"   },
  { id: 4, date: "2026-05-18", ref: "TX-1029108", to: "0xa1B…f2",       asset: "XUSD", amount: 500.0,   status: "Failed"    },
];

const tone = { Completed: "positive", Pending: "warning", Failed: "critical" };

const columns = [
  { key: "date", header: "Date" },
  { key: "ref", header: "Reference", render: (r) => <code style={{ fontFamily: "var(--sx-font-mono)" }}>{r.ref}</code> },
  { key: "to", header: "To / From" },
  { key: "asset", header: "Asset" },
  { key: "amount", header: "Amount", numeric: true, render: (r) => r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
  { key: "status", header: "Status", render: (r) => <Tag tone={tone[r.status] || "neutral"}>{r.status}</Tag> },
];

export const Default = { args: { columns, rows } };
export const Zebra = { args: { columns, rows, zebra: true } };
export const Empty = { args: { columns, rows: [] } };

/* ── Cell variants: 2-line, inline button, copy-link, leading/trailing icon ── */
export const CellVariants = {
  render: () => {
    const cellRows = [
      { id: 1, name: "John Doe", email: "john@acme.co", ref: "TX-1029384", network: "Ethereum", chain: "Mainnet" },
      { id: 2, name: "Acme Pte. Ltd.", email: "ops@acme.co", ref: "TX-1029301", network: "Polygon", chain: "PoS" },
      { id: 3, name: "Mei Lin", email: "mei@example.sg", ref: "TX-1029220", network: "Solana", chain: "Mainnet" },
    ];
    const cellColumns = [
      {
        key: "recipient",
        header: "Recipient",
        render: (r) => (
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ font: "var(--sx-body-bold-medium)", color: "var(--sx-text-primary)" }}>{r.name}</span>
            <span style={{ font: "var(--sx-body-small)", color: "var(--sx-text-secondary)" }}>{r.email}</span>
          </span>
        ),
      },
      {
        key: "reference",
        header: "Reference",
        render: (r) => (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <code style={{ fontFamily: "var(--sx-font-mono)" }}>{r.ref}</code>
            <IconButton icon="content_copy" variant="ghost" size="sm" label="Copy reference" />
          </span>
        ),
      },
      {
        key: "network",
        header: "Network",
        render: (r) => (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-rounded" style={{ color: "var(--sx-text-secondary)", fontSize: 18 }}>hub</span>
            <span>{r.network}</span>
            <span className="material-symbols-rounded" style={{ color: "var(--sx-text-secondary)", fontSize: 18 }}>chevron_right</span>
          </span>
        ),
      },
      {
        key: "action",
        header: "Action",
        align: "right",
        render: () => (
          <Button variant="secondary" size="sm">View</Button>
        ),
      },
    ];
    return <Table columns={cellColumns} rows={cellRows} />;
  },
};

export const WithPagination = {
  render: () => {
    const [p, setP] = useState(1);
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Table columns={columns} rows={rows} />
        <Pagination page={p} totalPages={12} pageSize={4} total={48} onChange={setP} showSummary />
      </div>
    );
  },
};
