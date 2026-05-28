import React from "react";
import { Upload } from "./Upload.jsx";

export default {
  title: "Components/Upload",
  component: Upload,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ maxWidth: 480 }}><S /></div>],
};

export const Default = { args: { label: "Proof of identity" } };
export const Multiple = { args: { label: "Supporting documents", multiple: true } };
export const Error = { args: { label: "Proof of identity", error: "File must be smaller than 10 MB." } };
export const Disabled = { args: { label: "Proof of identity", disabled: true } };

export const Prefilled = {
  args: {
    label: "Proof of identity",
    files: [
      { name: "passport-front.pdf", size: 1_240_000 },
      { name: "passport-back.pdf", size: 980_000 },
    ],
    multiple: true,
  },
};
