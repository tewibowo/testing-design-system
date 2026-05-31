import React from "react";
import { Table } from "../Table/Table.jsx";
import { Tag } from "../Tag/Tag.jsx";
import "./TransactionHistoryTable.css";

/**
 * Transaction History table — builds on the shared Table with column sets that
 * vary by `type`:
 *   - "funding": Transaction ID, Date, Amount, Network, Wallet Address, Status
 *   - "otc":     Transaction ID, Date, Amount to buy, Amount to sell, Pair, Rate, Status
 *   - "swap":    Transaction ID, Created Date, Details, Pair, Sell, Buy, Price, Fee, Status
 *
 * Each row carries the fields referenced by its column set plus a `status`
 * ({ label, tone }) used to render a Tag. Numeric/amount cells use the mono font.
 *
 *   <TransactionHistoryTable type="funding" rows={rows} />
 */

const STATUS_TONE = {
  completed: "positive",
  pending: "warning",
  processing: "info",
  cancelled: "critical",
  failed: "critical",
};

function statusTag(status) {
  if (!status) return null;
  const label = typeof status === "string" ? status : status.label;
  const tone =
    (typeof status === "object" && status.tone) ||
    STATUS_TONE[String(label).toLowerCase()] ||
    "neutral";
  return <Tag tone={tone} shape="pill">{label}</Tag>;
}

const mono = (key) => (row) => <span className="txn__mono">{row[key]}</span>;

const COLUMNS = {
  funding: [
    { key: "id", header: "Transaction ID", render: (r) => <span className="txn__id">{r.id}</span> },
    { key: "date", header: "Transaction Date" },
    { key: "amount", header: "Amount", numeric: true, render: mono("amount") },
    { key: "network", header: "Network" },
    {
      key: "wallet",
      header: "Wallet Address",
      render: (r) => <span className="txn__mono txn__truncate">{r.wallet}</span>,
    },
    { key: "status", header: "Status", render: (r) => statusTag(r.status) },
  ],
  otc: [
    { key: "id", header: "Transaction ID", render: (r) => <span className="txn__id">{r.id}</span> },
    { key: "date", header: "Transaction Date" },
    { key: "amountToBuy", header: "Amount to buy", numeric: true, render: mono("amountToBuy") },
    { key: "amountToSell", header: "Amount to sell", numeric: true, render: mono("amountToSell") },
    { key: "pair", header: "Pair", render: mono("pair") },
    { key: "rate", header: "Rate", numeric: true, render: mono("rate") },
    { key: "status", header: "Status", render: (r) => statusTag(r.status) },
  ],
  swap: [
    { key: "id", header: "Transaction ID", render: (r) => <span className="txn__id">{r.id}</span> },
    { key: "date", header: "Created Date" },
    { key: "details", header: "Details" },
    { key: "pair", header: "Pair", render: mono("pair") },
    { key: "sell", header: "Sell", numeric: true, render: mono("sell") },
    { key: "buy", header: "Buy", numeric: true, render: mono("buy") },
    { key: "price", header: "Price", numeric: true, render: mono("price") },
    { key: "fee", header: "Fee", numeric: true, render: mono("fee") },
    { key: "status", header: "Status", render: (r) => statusTag(r.status) },
  ],
};

export function TransactionHistoryTable({
  type = "funding",
  rows = [],
  empty = "No transactions yet.",
  className = "",
}) {
  const columns = COLUMNS[type] || COLUMNS.funding;
  return (
    <Table
      columns={columns}
      rows={rows}
      empty={empty}
      className={"txn " + className}
    />
  );
}
