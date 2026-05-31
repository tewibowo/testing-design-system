import React from "react";
import { TopBar } from "./TopBar.jsx";

export default {
  title: "Compositions/Top Bar",
  component: TopBar,
  parameters: { layout: "padded" },
  argTypes: {
    unread: { control: { type: "number", min: 0, max: 99 } },
    name: { control: "text" },
    company: { control: "text" },
  },
  args: { unread: 2, name: "John Doe", company: "ABC Pte. Ltd." },
};

export const Default = {};
export const NoNotifications = { args: { unread: 0 } };
export const HighUnreadCount = { args: { unread: 24 } };
