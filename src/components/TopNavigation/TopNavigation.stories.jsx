import React from "react";
import { TopNavigation } from "./TopNavigation.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Compositions/Top Navigation",
  component: TopNavigation,
  parameters: { layout: "fullscreen" },
};

const links = [
  { label: "Products", href: "#products", children: true },
  { label: "Stablecoins", href: "#xsgd" },
  { label: "Developers", href: "#docs" },
  { label: "Company", href: "#about" },
  { label: "Blog", href: "#blog" },
];

export const Light = {
  args: {
    links,
    activeHref: "#xsgd",
    actions: (
      <>
        <Button variant="tertiary" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Open account</Button>
      </>
    ),
  },
};

export const Dark = {
  args: { ...Light.args, appearance: "dark" },
  parameters: { backgrounds: { default: "ivy" } },
};
