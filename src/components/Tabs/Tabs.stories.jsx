import React from "react";
import { Tabs } from "./Tabs.jsx";

export default {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
};

const items = [
  { id: "in", label: "Transfer In", content: <p style={{ font: "var(--sx-body-medium)" }}>Funds arriving from your bank.</p> },
  { id: "out", label: "Transfer Out", content: <p style={{ font: "var(--sx-body-medium)" }}>Send funds out.</p> },
  { id: "swap", label: "Swap", content: <p style={{ font: "var(--sx-body-medium)" }}>Swap between stablecoins.</p> },
];

export const Underline = { args: { items, defaultTab: "in" } };
export const Pill = { args: { items, defaultTab: "in", variant: "pill" } };
export const Fill = { args: { items, defaultTab: "in", fill: true } };
export const Disabled = {
  args: {
    items: [
      { id: "a", label: "Personal", content: <p style={{font:"var(--sx-body-medium)"}}>Personal.</p> },
      { id: "b", label: "Business", disabled: true, content: null },
      { id: "c", label: "Institutional", content: <p style={{font:"var(--sx-body-medium)"}}>Institutional.</p> },
    ],
    defaultTab: "a",
  },
};
