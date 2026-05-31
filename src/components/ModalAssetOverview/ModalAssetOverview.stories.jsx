import React, { useState } from "react";
import { ModalAssetOverview } from "./ModalAssetOverview.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/ModalAssetOverview",
  component: ModalAssetOverview,
  parameters: { layout: "centered" },
};

const methods = [
  {
    id: "in",
    title: "Transfer In",
    description: "Receive crypto from my external wallet or bank transfer",
    icon: <span className="material-symbols-rounded">add</span>,
  },
  {
    id: "out",
    title: "Transfer Out",
    description: "Send crypto to my blockchain address or bank account",
    icon: <span className="material-symbols-rounded">arrow_outward</span>,
  },
];

const networks = [
  { label: "Ethereum" },
  { label: "Polygon" },
  { label: "Avalanche C-Chain" },
  { label: "Arbitrum" },
  { label: "Hedera" },
  { label: "Ripple" },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open asset overview</Button>
      <ModalAssetOverview open={open} onClose={() => setOpen(false)} {...props} />
    </>
  );
}

export const Stablecoin = {
  render: () => (
    <Demo
      symbol="XSGD"
      subtitle="1:1 to SGD"
      methods={methods}
      networks={networks}
      banks="FAST, MEPS, SWIFT"
    />
  ),
};

export const Fiat = {
  render: () => (
    <Demo
      symbol="SGD"
      subtitle="Singapore Dollar"
      methods={methods}
      banks="FAST, MEPS, SWIFT"
    />
  ),
};

export const Open = {
  render: () => (
    <ModalAssetOverview
      open
      onClose={() => {}}
      symbol="XSGD"
      subtitle="1:1 to SGD"
      methods={methods}
      networks={networks}
      banks="FAST, MEPS, SWIFT"
    />
  ),
};
