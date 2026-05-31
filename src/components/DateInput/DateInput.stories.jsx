import React from "react";
import { DateInput } from "./DateInput.jsx";

export default {
  title: "Components/Date Input",
  component: DateInput,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 320 }}><S /></div>],
};

export const Default = { args: { label: "Date of birth" } };
export const WithValue = { args: { label: "Date of birth", defaultValue: "1990-04-15" } };
export const WithHelper = { args: { label: "Date of birth", helper: "We use this to verify your identity." } };
export const Error = { args: { label: "Date of birth", error: "Must be 18 or older." } };
export const Disabled = { args: { label: "Date of birth", defaultValue: "1990-04-15", disabled: true } };
export const Small = { args: { label: "Date of birth", size: "small", defaultValue: "1990-04-15" } };
export const Range = {
  args: {
    label: "Statement period",
    range: true,
    startValue: "2026-01-01",
    endValue: "2026-03-31",
    helper: "Pick a start and end date.",
  },
};
