import React, { useState } from "react";
import { BottomSheetBank } from "./BottomSheetBank.jsx";
import { AssetMark } from "../AssetMark/AssetMark.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/BottomSheetBank",
  component: BottomSheetBank,
  parameters: { layout: "centered" },
};

const banks = [
  { id: "dbs", name: "DBS Bank", description: "•••• 1234", mark: <AssetMark label="DBS" color="var(--sx-brand-secure-teal)" size={32} /> },
  { id: "uob", name: "UOB", description: "•••• 9981", mark: <AssetMark label="UOB" color="var(--sx-brand-credible-blue)" size={32} /> },
  { id: "scb", name: "Standard Chartered", description: "•••• 4420", mark: <AssetMark label="SC" color="var(--sx-status-positive)" size={32} /> },
  { id: "ocbc", name: "OCBC", description: "•••• 0073", mark: <AssetMark label="OC" color="var(--sx-brand-wealthy-gold)" size={32} /> },
];

function Demo(props) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("dbs");
  return (
    <>
      <Button onClick={() => setOpen(true)}>Select bank</Button>
      <BottomSheetBank
        open={open}
        onClose={() => setOpen(false)}
        banks={banks}
        selectedId={selectedId}
        onSelect={(b) => {
          setSelectedId(b.id);
          setOpen(false);
        }}
        {...props}
      />
    </>
  );
}

export const Default = { render: () => <Demo /> };

export const Open = {
  render: () => (
    <BottomSheetBank
      open
      onClose={() => {}}
      banks={banks}
      selectedId="dbs"
    />
  ),
};
