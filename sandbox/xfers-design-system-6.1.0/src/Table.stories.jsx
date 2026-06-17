import React from "react";
import { Table } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

export default {
  title: "@xfers Design System 6.1.0/Components/Table",
  decorators: [withDesignSystem],
  parameters: { layout: "padded" },
};

export const Default = {
  render: () => (
    <Table
      columns={[
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Asset", dataIndex: "asset", key: "asset" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
      ]}
      dataSource={[
        { key: "1", name: "Top up", asset: "XSGD", amount: "100.00" },
        { key: "2", name: "Withdraw", asset: "USDC", amount: "50.00" },
      ]}
      pagination={false}
    />
  ),
};
