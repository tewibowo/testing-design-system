import React from "react";
import { Copybox } from "./Copybox.jsx";

export default {
  title: "Components/Copybox",
  component: Copybox,
  parameters: { layout: "padded" },
  argTypes: { value: { control: "text" }, label: { control: "text" }, multiline: { control: "boolean" } },
  decorators: [(S) => <div style={{ maxWidth: 480 }}><S /></div>],
};

export const WalletAddress = {
  args: {
    label: "Wallet address",
    value: "0xA1B2C3D4E5F60718293AeCb98765FaB1234567890",
  },
};

export const ApiKey = {
  args: { label: "API key", value: "sx_live_5f4d7a2e9b3c1f8d0a6e2b5c8d4e7f1a" },
};

export const Multiline = {
  args: {
    label: "Recovery phrase",
    multiline: true,
    value: "ocean velvet harbour pivot satellite trumpet anchor blossom keyboard pinnacle vintage canopy",
  },
};
