import React from "react";
import { H1, H2, H3, H4, P1, P1Bold, SmallP } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Theme/Typography",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Scale = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <H1>H1 - The quick brown fox</H1>
      <H2>H2 - The quick brown fox</H2>
      <H3>H3 - The quick brown fox</H3>
      <H4>H4 - The quick brown fox</H4>
      <P1>P1 - Body text for paragraphs and general content.</P1>
      <P1Bold>P1Bold - Emphasised body text.</P1Bold>
      <SmallP>SmallP - Small supporting text and captions.</SmallP>
    </div>
  ),
};
