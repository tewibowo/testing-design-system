import React from "react";
import { PartnerLogo } from "./PartnerLogo.jsx";

export default {
  title: "Atoms/Partner Logo",
  component: PartnerLogo,
  parameters: { layout: "padded" },
  argTypes: {
    name: { control: "text" },
    size: { control: { type: "range", min: 20, max: 64, step: 2 } },
    monochrome: { control: "boolean" },
  },
  args: { name: "standard-chartered", size: 32 },
};

export const Fallback = {
  parameters: { docs: { description: { story: "Until licensed SVG files are added to the registry, every partner renders as a monochrome wordmark pill so layouts stay intact." } } },
};

export const Banks = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {PartnerLogo.banks.map((slug) => <PartnerLogo key={slug} name={slug} />)}
    </div>
  ),
};

export const Blockchains = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {PartnerLogo.chains.map((slug) => <PartnerLogo key={slug} name={slug} />)}
    </div>
  ),
};

export const FilledChips = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {[...PartnerLogo.banks.slice(0, 4), ...PartnerLogo.chains.slice(0, 2)].map((slug) => (
        <PartnerLogo key={slug} name={slug} monochrome={false} size={36} />
      ))}
    </div>
  ),
};
