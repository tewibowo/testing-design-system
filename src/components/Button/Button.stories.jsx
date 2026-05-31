import React from "react";
import { Button } from "./Button.jsx";

export default {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "tertiary"] },
    size: { control: "inline-radio", options: ["lg", "md", "sm"] },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: { children: "Take Assessment", variant: "primary", size: "lg", disabled: false },
};

export const Primary = { args: { variant: "primary" } };
export const Secondary = { args: { variant: "secondary", children: "Cancel" } };
export const Tertiary = { args: { variant: "tertiary", children: "Learn more" } };
export const Disabled = { args: { variant: "primary", disabled: true, children: "Submit" } };

export const AllVariants = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="primary" disabled>Disabled</Button>
    </div>
  ),
};

export const AllSizes = {
  parameters: { layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="lg">Large 48</Button>
      <Button size="md">Medium 40</Button>
      <Button size="sm">Small 32</Button>
    </div>
  ),
};

/* Interaction states forced via state-class hooks so Chromatic can snapshot
 * hover / pressed without driving real pointer events. */
export const States = {
  parameters: { layout: "padded" },
  render: () => {
    const variants = ["primary", "secondary", "tertiary"];
    const cell = { display: "flex", flexDirection: "column", gap: 8 };
    const colHead = { font: "var(--sx-label-small)", color: "var(--sx-text-secondary)" };
    return (
      <div style={{ display: "grid", gridTemplateColumns: "auto repeat(4, max-content)", gap: 16, alignItems: "center" }}>
        <span />
        <span style={colHead}>Enabled</span>
        <span style={colHead}>Hovered</span>
        <span style={colHead}>Pressed</span>
        <span style={colHead}>Disabled</span>
        {variants.map((v) => (
          <React.Fragment key={v}>
            <span style={{ ...colHead, textTransform: "capitalize" }}>{v}</span>
            <Button variant={v}>Button</Button>
            <Button variant={v} className="is-hovered">Button</Button>
            <Button variant={v} className="is-pressed">Button</Button>
            <Button variant={v} disabled>Button</Button>
          </React.Fragment>
        ))}
      </div>
    );
  },
};
