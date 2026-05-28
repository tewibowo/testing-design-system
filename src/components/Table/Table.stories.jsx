import React, { useState } from "react";
import { Table } from "./Table.jsx";
import { Tag } from "../Tag/Tag.jsx";
import { Pagination } from "../Pagination/Pagination.jsx";

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
