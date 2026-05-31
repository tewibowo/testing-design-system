import React from "react";
import { TopNavProfileMenu } from "./TopNavProfileMenu.jsx";

export default {
  title: "Components/TopNavProfileMenu",
  component: TopNavProfileMenu,
  parameters: { layout: "padded" },
  decorators: [(S) => <div style={{ minHeight: 360 }}><S /></div>],
  argTypes: {
    variant: { control: "inline-radio", options: ["personal", "biz", "sandbox"] },
  },
};

export const Personal = {
  args: {
    variant: "personal",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      timezone: "GMT+8 Singapore",
    },
    onAction: () => {},
  },
};

export const BizSandbox = {
  args: {
    variant: "biz",
    user: {
      name: "John Doe",
      company: "ABC Pte. Ltd.",
      role: "Admin · Business Account",
    },
    onAction: () => {},
    onSwitch: () => {},
  },
};
