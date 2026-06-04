import React from "react";
import { Radio } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

const RadioDemo = () => {
  const [value, setValue] = React.useState("a");
  return (
    <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
      <Radio.Button value="a">Option A</Radio.Button>
      <Radio.Button value="b">Option B</Radio.Button>
      <Radio.Button value="c">Option C</Radio.Button>
    </Radio.Group>
  );
};

export default {
  title: "@xfers Design System 6.1.0/Components/Radio",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <RadioDemo /> };
