import React from "react";
import { DynamicSelect } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/DynamicSelect",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <DynamicSelect
        label="Select bank"
        placeholder="Choose a bank"
        iconSrc={null}
        extraText="Add new bank"
        isAddItemBarVisible
        extraAction={() => {}}
        options={[
          { value: "dbs", label: "DBS" },
          { value: "ocbc", label: "OCBC" },
          { value: "uob", label: "UOB" },
        ]}
      />
    </div>
  ),
};
