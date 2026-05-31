import React, { useState } from "react";
import { ModalAssetSelection } from "./ModalAssetSelection.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Modal/Asset Selection",
  component: ModalAssetSelection,
  parameters: { layout: "centered" },
};

const stablecoins = [
  { id: "xsgd", symbol: "XSGD", subtitle: "1:1 to SGD" },
  { id: "xusd", symbol: "XUSD", subtitle: "1:1 to USD" },
  { id: "usdc", symbol: "USDC" },
  { id: "usdt", symbol: "USDT" },
];

const fiat = [
  { id: "sgd", symbol: "SGD" },
  { id: "usd", symbol: "USD" },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open asset selection</Button>
      <ModalAssetSelection open={open} onClose={() => setOpen(false)} {...props} />
    </>
  );
}

export const TransferIn = {
  render: () => (
    <Demo
      title="Transfer In"
      description="Deposit funds from your blockchain wallet or bank account"
      assets={stablecoins}
    />
  ),
};

export const TransferOut = {
  render: () => (
    <Demo
      title="Transfer Out"
      description="Withdraw funds to your blockchain wallet or bank account"
      assets={stablecoins}
    />
  ),
};

export const Fiat = {
  render: () => (
    <Demo
      title="Transfer In"
      description="Deposit funds from your bank account"
      assets={fiat}
    />
  ),
};

export const Open = {
  render: () => (
    <ModalAssetSelection
      open
      onClose={() => {}}
      title="Transfer In"
      description="Deposit funds from your blockchain wallet or bank account"
      assets={stablecoins}
    />
  ),
};
