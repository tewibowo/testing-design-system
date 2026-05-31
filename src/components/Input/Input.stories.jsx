import React from "react";
import { Input } from "./Input.jsx";

export default {
  title: "Components/Input",
  component: Input,
  parameters: { layout: "padded" },
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    error: { control: "text" },
    prefix: { control: "text" },
    suffix: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["large", "small"] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

export const Default = {
  args: {
    label: "Email",
    helper: "We'll send your verification code here.",
    placeholder: "hello@straitsx.com",
  },
};

export const WithSuffix = {
  args: { label: "Amount", suffix: "SGD", defaultValue: "1,250.00" },
};

export const Password = {
  args: { label: "Password", type: "password", defaultValue: "ferret-cobalt-mountain" },
};

export const Search = {
  args: { type: "search", placeholder: "Search transactions" },
};

export const WithTrailingButton = {
  args: {
    label: "Promo code",
    placeholder: "Enter code",
    trailingButton: { label: "Apply", onClick: () => {} },
  },
};

export const WithPrefix = {
  args: { label: "Annual revenue", prefix: "S$", defaultValue: "250,000.00" },
};

export const ErrorState = {
  args: {
    label: "Wallet address",
    defaultValue: "0xa1B…f2",
    error: "Address checksum doesn't match.",
  },
};

export const Disabled = {
  args: { label: "Account number", defaultValue: "0123 4567 8901", disabled: true },
};

export const Small = {
  args: {
    label: "Email",
    size: "small",
    placeholder: "hello@straitsx.com",
    helper: "Compact 40px field.",
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <Input size="large" label="Large (48px)" placeholder="hello@straitsx.com" />
      <Input size="small" label="Small (40px)" placeholder="hello@straitsx.com" />
      <Input size="large" label="Large + suffix" suffix="SGD" defaultValue="1,250.00" />
      <Input size="small" label="Small + suffix" suffix="SGD" defaultValue="1,250.00" />
    </div>
  ),
};

export const Composition = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560 }}>
      <Input label="Email" placeholder="hello@straitsx.com" />
      <Input label="Amount" suffix="SGD" defaultValue="1,250.00" />
      <Input label="Wallet address" defaultValue="0xa1B…f2" error="Address checksum doesn't match." />
      <Input label="Account number" defaultValue="0123 4567 8901" disabled />
    </div>
  ),
};
