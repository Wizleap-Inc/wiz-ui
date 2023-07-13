import { Meta, StoryObj } from "@storybook/react";

import { WizIDashboard } from "@/components/icons";

import { WizNavigationItem } from "../components";

const meta: Meta<typeof WizNavigationItem> = {
  title: "Base/Navigation/Item",
  component: WizNavigationItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavigationItem>;

const Template: Story = {
  render: (args) => <WizNavigationItem {...args} />,
};

export const Default: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    active: false,
  },
};

export const Active: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    active: true,
  },
};

export const Disabled: Story = {
  ...Template,
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    disabled: true,
  },
};

export const WithToolTip: Story = {
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    tooltipText: "これはヒントです。",
  },
  render: (args) => (
    <div style={{ marginTop: "48px" }}>
      <WizNavigationItem {...args} />
    </div>
  ),
};
