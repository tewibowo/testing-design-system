import React, { useLayoutEffect, useRef, useState } from "react";
import "./Table.css";

/**
 * Data table.
 *   columns: [{ key, header, align?: "left"|"right", render?: (row) => node, numeric?: bool,
 *               width?: number|string, fixed?: "left"|"right" }]
 *   rows:    array of records (must include a stable `id` field or pass rowKey)
 *
 *   <Table columns={cols} rows={rows} zebra />
 *   <Table columns={cols} rows={rows} scrollY={360} />                 // fixed header
 *   <Table columns={cols} rows={rows} scrollX={900} />                 // fixed columns need a scroll container
 */
export function Table({
  columns = [],
  rows = [],
  rowKey = "id",
  zebra = false,
  empty = "No data.",
  className = "",
  scrollX,
  scrollY,
}) {
  const hasFixed = columns.some((c) => c.fixed === "left" || c.fixed === "right");
  const wrapRef = useRef(null);
  const headRowRef = useRef(null);
  const [offsets, setOffsets] = useState({});
  const [ping, setPing] = useState({ left: false, right: false });

  useLayoutEffect(() => {
    if (!hasFixed) return;
    const measure = () => {
      const wrap = wrapRef.current;
      const ths = headRowRef.current ? Array.from(headRowRef.current.children) : [];
      const next = {};

      let leftAcc = 0;
      columns.forEach((c, i) => {
        if (c.fixed === "left") {
          next[c.key] = { left: leftAcc };
          leftAcc += ths[i]?.offsetWidth || 0;
        }
      });

      let rightAcc = 0;
      for (let i = columns.length - 1; i >= 0; i--) {
        const c = columns[i];
        if (c.fixed === "right") {
          next[c.key] = { ...(next[c.key] || {}), right: rightAcc };
          rightAcc += ths[i]?.offsetWidth || 0;
        }
      }
      setOffsets(next);

      if (wrap) {
        setPing({
          left: wrap.scrollLeft > 0,
          right: wrap.scrollLeft + wrap.clientWidth < wrap.scrollWidth - 1,
        });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [columns, rows, hasFixed]);

  const lastLeftKey = columns.filter((c) => c.fixed === "left").pop()?.key;
  const firstRightKey = columns.find((c) => c.fixed === "right")?.key;

  const handleScroll = (e) => {
    if (!hasFixed) return;
    const el = e.currentTarget;
    setPing({
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  };

  const cellStyle = (c) => {
    const style = {};
    if (c.width) style.width = c.width;
    const offset = offsets[c.key];
    if (c.fixed === "left" && offset) style.left = offset.left;
    if (c.fixed === "right" && offset) style.right = offset.right;
    return style;
  };

  const cellClass = (c) => {
    const classes = [];
    if (c.numeric || c.align === "right") classes.push("table__num");
    if (c.fixed === "left") {
      classes.push("table__cell--fixed-left");
      if (c.key === lastLeftKey && ping.left) classes.push("table__cell--fixed-shadow");
    }
    if (c.fixed === "right") {
      classes.push("table__cell--fixed-right");
      if (c.key === firstRightKey && ping.right) classes.push("table__cell--fixed-shadow");
    }
    return classes.length ? classes.join(" ") : undefined;
  };

  return (
    <div
      className={"table-wrap " + className}
      ref={wrapRef}
      onScroll={handleScroll}
      style={scrollY ? { maxHeight: scrollY, overflowY: "auto" } : undefined}
    >
      <table
        className={"table" + (zebra ? " table--zebra" : "")}
        style={scrollX ? { minWidth: scrollX } : undefined}
      >
        <thead>
          <tr ref={headRowRef}>
            {columns.map((c) => (
              <th key={c.key} className={cellClass(c)} style={cellStyle(c)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td className="table__empty" colSpan={columns.length}>{empty}</td>
            </tr>
          )}
          {rows.map((row, i) => (
            <tr key={row[rowKey] ?? i}>
              {columns.map((c) => (
                <td key={c.key} className={cellClass(c)} style={cellStyle(c)}>
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
