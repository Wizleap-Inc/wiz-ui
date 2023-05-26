import { Meta, StoryObj } from "@storybook/react";

import { WizTabPane } from "../components";

const meta: Meta<typeof WizTabPane> = {
  title: "Base/Tab/Pane",
  component: WizTabPane,
};

export default meta;
type Story = StoryObj<typeof WizTabPane>;

export const Default: Story = {
  args: {
    label: "ほげほげ",
  },
};

export const Active: Story = {
  args: {
    label: "ほげほげ",
    active: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "ほげほげ",
    disabled: true,
  },
};

export const NotificationCount: Story = {
  args: {
    label: "ほげほげ",
    notificationCount: 10,
  },
};

export const Width: Story = {
  args: {
    label: "ほげほげ",
    width: "100px",
  },
};
