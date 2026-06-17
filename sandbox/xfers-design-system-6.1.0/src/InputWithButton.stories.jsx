import React from "react";
import { InputWithButton } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/InputWithButton",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <InputWithButton buttonText="Apply" placeholder="Promo code" onButtonClick={() => {}} />
    </div>
  ),
};
