import React from "react";
import "./Table.css";

/**
 * Data table.
 *   columns: [{ key, header, align?: "left"|"right", render?: (row) => node, numeric?: bool }]
 *   rows:    array of records (must include a stable `id` field or pass rowKey)
 *
 *   <Table columns={cols} rows={rows} zebra />
 */
export function Table({
  columns = [],
  rows = [],
  rowKey = "id",
  zebra = false,
  empty = "No data.",
  className = "",
}) {
  return (
    <div className={"sx-table-wrap " + className}>
      <table className={"sx-table" + (zebra ? " sx-table--zebra" : "")}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={c.numeric || c.align === "right" ? "sx-table__num" : undefined}
                style={c.width ? { width: c.width } : undefined}
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="sx-table__empty" colSpan={columns.length}>{empty}</td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={row[rowKey] ?? i}>
              {columns.map((c) => (
                <td
                  key={c.key}
                  className={c.numeric || c.align === "right" ? "sx-table__num" : undefined}
                >
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
