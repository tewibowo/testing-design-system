import React from "react";
import { AppTopNav } from "./AppTopNav.jsx";

export default {
  title: "Composition/AppTopNav",
  component: AppTopNav,
  parameters: { layout: "fullscreen" },
  argTypes: {
    account: {
      control: "inline-radio",
      options: ["personal", "business", "sandbox"],
    },
    platform: { control: "inline-radio", options: ["desktop", "mobile"] },
    notifications: { control: { type: "number", min: 0, max: 99 } },
  },
};

const LINKS = [
  { id: "home", label: "Home", href: "#", active: true },
  { id: "balances", label: "Balances", href: "#" },
  { id: "transfer", label: "Transfer", href: "#" },
  { id: "activity", label: "Activity", href: "#" },
];

export const DesktopPersonal = {
  args: {
    account: "personal",
    platform: "desktop",
    links: LINKS,
    notifications: 3,
    user: { name: "John Doe", initials: "JD" },
    onProfileClick: () => {},
    onMenuClick: () => {},
  },
};

export const DesktopBusiness = {
  args: {
    account: "business",
    platform: "desktop",
    links: LINKS,
    notifications: 12,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onProfileClick: () => {},
  },
};

export const DesktopSandbox = {
  args: {
    account: "sandbox",
    platform: "desktop",
    links: LINKS,
    notifications: 0,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onProfileClick: () => {},
  },
};

export const Mobile = {
  args: {
    account: "business",
    platform: "mobile",
    notifications: 3,
    user: { name: "John Doe", company: "ABC Pte. Ltd.", initials: "AB" },
    onMenuClick: () => {},
    onProfileClick: () => {},
  },
};
