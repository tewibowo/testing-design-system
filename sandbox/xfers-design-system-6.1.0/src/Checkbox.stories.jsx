import React from "react";
import { Checkbox } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Checkbox",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Group = {
  render: () => (
    <Checkbox.Group
      options={[
        { label: "Apple", value: "apple" },
        { label: "Pear", value: "pear" },
        { label: "Orange", value: "orange" },
      ]}
      defaultValue={["apple"]}
    />
  ),
};
