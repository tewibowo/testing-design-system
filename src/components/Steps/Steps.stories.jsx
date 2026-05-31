import React, { useState } from "react";
import { Steps, BadgeSteps } from "./Steps.jsx";

export default {
  title: "Components/Steps",
  component: Steps,
  parameters: { layout: "padded" },
};

const items = [
  { label: "Account details", sub: "Email & password" },
  { label: "Identity verification", sub: "Government ID" },
  { label: "Risk assessment", sub: "Quick quiz" },
  { label: "Done", sub: "Ready to transact" },
];

export const Horizontal = { args: { items, current: 1 } };
export const Vertical = { args: { items, current: 2, orientation: "vertical" } };

export const Clickable = {
  render: () => {
    const [c, setC] = useState(1);
    return <Steps items={items} current={c} onSelect={setC} />;
  },
};

export const VerticalFailed = {
  args: {
    items: [
      { label: "Account details", sub: "Email & password" },
      { label: "Identity verification", sub: "Could not verify ID", failed: true },
      { label: "Risk assessment", sub: "Quick quiz" },
      { label: "Done", sub: "Ready to transact" },
    ],
    current: 1,
    orientation: "vertical",
  },
};

export const HorizontalFailed = {
  args: {
    items: [
      { label: "Account details", sub: "Email & password" },
      { label: "Identity verification", sub: "Could not verify ID", failed: true },
      { label: "Risk assessment", sub: "Quick quiz" },
      { label: "Done", sub: "Ready to transact" },
    ],
    current: 1,
  },
};

export const StepCounts = {
  render: () => {
    const make = (n) => Array.from({ length: n }, (_, i) => ({ label: `Step ${i + 1}` }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {[2, 3, 5, 7].map((n) => (
          <Steps key={n} items={make(n)} current={1} />
        ))}
      </div>
    );
  },
};

export const BadgeStepsStory = {
  name: "BadgeSteps",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <BadgeSteps current={2} total={4} label="Identity verification" />
      <BadgeSteps current={1} total={4} label="Verification failed" tone="failed" />
    </div>
  ),
};
