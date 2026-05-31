import React from "react";
import { CardAsset } from "./CardAsset.jsx";

export default {
  title: "Components/CardAsset",
  component: CardAsset,
  parameters: { layout: "padded" },
};

const assets = [
  {
    symbol: "XSGD",
    subtitle: "1:1 to SGD",
    balance: "1,123,456.00",
    fiat: "~2,032 SGD",
    networks: [{ name: "Ethereum" }, { name: "Polygon" }, { name: "Avalanche" }, { name: "Solana" }, { name: "Base" }],
  },
  {
    symbol: "XUSD",
    subtitle: "1:1 to USD",
    balance: "1,123,456.00",
    fiat: "~2,032 SGD",
    networks: [{ name: "Ethereum" }, { name: "BSC" }],
  },
  {
    symbol: "USDC",
    balance: "1,123,456.00",
    fiat: "~2,032 SGD",
    networks: [{ name: "Ethereum" }, { name: "Polygon" }],
  },
  {
    symbol: "USDT",
    balance: "1,123,456.00",
    fiat: "~2,032 SGD",
    networks: [{ name: "Ethereum" }, { name: "Tron" }, { name: "BSC" }],
  },
];

export const StablecoinWallet = {
  args: { title: "My Assets", assets, onRefresh: () => {}, onAdd: () => {}, onSend: () => {} },
  decorators: [(S) => <div style={{ maxWidth: 684 }}><S /></div>],
};

export const WithBanner = {
  args: {
    title: "My Assets",
    assets: assets.slice(0, 2),
    banner: "XSGD and XUSD are StraitsX-issued stablecoins regulated by MAS. They are backed 1:1 by SGD and USD respectively.",
    onRefresh: () => {},
  },
  decorators: [(S) => <div style={{ maxWidth: 684 }}><S /></div>],
};

export const SingleAsset = {
  args: { title: "Cash Wallet", assets: [assets[0]] },
  decorators: [(S) => <div style={{ maxWidth: 684 }}><S /></div>],
};
