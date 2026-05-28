import React from "react";
import { Menu } from "./Menu.jsx";
import { IconButton } from "../IconButton/IconButton.jsx";
import { Button } from "../Button/Button.jsx";

export default {
  title: "Components/Menu",
  component: Menu,
  parameters: { layout: "centered" },
};

export const FromIconButton = {
  render: () => (
    <Menu trigger={({ onClick }) => <IconButton icon="more_vert" variant="outline" onClick={onClick} label="More" />}>
      <Menu.Item icon="download" onSelect={() => {}}>Download statement</Menu.Item>
      <Menu.Item icon="share" onSelect={() => {}}>Share</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon="delete" tone="critical" onSelect={() => {}}>Delete</Menu.Item>
    </Menu>
  ),
};

export const Sectioned = {
  render: () => (
    <Menu align="right" trigger={({ onClick }) => <Button variant="secondary" onClick={onClick}>Filters</Button>}>
      <Menu.Label>Status</Menu.Label>
      <Menu.Item icon="check_circle">Active</Menu.Item>
      <Menu.Item icon="schedule">Pending</Menu.Item>
      <Menu.Divider />
      <Menu.Label>Currency</Menu.Label>
      <Menu.Item>XSGD</Menu.Item>
      <Menu.Item>XIDR</Menu.Item>
      <Menu.Item>XUSD</Menu.Item>
    </Menu>
  ),
};
