import React from "react";
import { Breadcrumb } from "./Breadcrumb.jsx";

export default {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: { layout: "padded" },
};

export const Default = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Transaction History", href: "#" },
      { label: "Tx 0x9a1b…" },
    ],
  },
};

export const TwoLevels = {
  args: { items: [{ label: "Settings", href: "#" }, { label: "Security" }] },
};
