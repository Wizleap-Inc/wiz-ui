import { Meta, StoryObj } from "@storybook/react";

import { WizTabPane } from "../components";

const meta: Meta<typeof WizTabPane> = {
  title: "Base/Tab/Pane",
  component: WizTabPane,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    active: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    notificationCount: {
      control: { type: "number" },
    },
    width: {
      control: { type: "text" },
    },
    onClick: {
      action: "click",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizTabPane>;

export const Default: Story = {
  args: {
    label: "ほげほげ",
  },
  render: (args) => <WizTabPane {...args} />,
};

export const Active: Story = {
  args: {
    label: "ほげほげ",
    active: true,
  },
  render: (args) => <WizTabPane {...args} />,
};

export const Disabled: Story = {
  args: {
    label: "ほげほげ",
    disabled: true,
  },
  render: (args) => <WizTabPane {...args} />,
};

export const NotificationCount: Story = {
  args: {
    label: "ほげほげ",
    notificationCount: 10,
  },
  render: (args) => <WizTabPane {...args} />,
};

export const Width: Story = {
  args: {
    label: "ほげほげ",
    width: "100px",
  },
  render: (args) => <WizTabPane {...args} />,
};
