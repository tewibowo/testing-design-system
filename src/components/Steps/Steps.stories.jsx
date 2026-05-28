import React, { useState } from "react";
import { Steps } from "./Steps.jsx";

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
