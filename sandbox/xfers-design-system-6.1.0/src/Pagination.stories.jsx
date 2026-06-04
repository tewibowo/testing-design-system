import React from "react";
import { Pagination } from "@xfers/design-system";
import { withDesignSystem } from "./decorator.jsx";

const PaginationDemo = () => {
  const [current, setCurrent] = React.useState(1);
  return <Pagination current={current} pageSize={10} total={120} onChange={setCurrent} showSizeChanger />;
};

export default {
  title: "@xfers Design System 6.1.0/Components/Pagination",
  decorators: [withDesignSystem],
  parameters: { layout: "centered" },
};

export const Default = { render: () => <PaginationDemo /> };
