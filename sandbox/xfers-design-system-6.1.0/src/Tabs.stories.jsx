import React from "react";
import { Tabs } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

const TabsDemo = () => {
  const [key, setKey] = React.useState("1");
  return (
    <Tabs activeKey={key} onChange={setKey}>
      <Tabs.TabPane tab="Overview" key="1"><div style={{ padding: 16 }}>Overview content</div></Tabs.TabPane>
      <Tabs.TabPane tab="Activity" key="2"><div style={{ padding: 16 }}>Activity content</div></Tabs.TabPane>
      <Tabs.TabPane tab="Settings" key="3"><div style={{ padding: 16 }}>Settings content</div></Tabs.TabPane>
    </Tabs>
  );
};

export default {
  title: "@xfers Design System 6.1.0/Components/Tabs",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = { render: () => <TabsDemo /> };
