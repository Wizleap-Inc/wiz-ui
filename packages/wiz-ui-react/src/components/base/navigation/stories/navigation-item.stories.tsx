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

export const Default: Story = {
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    active: false,
  },
};

export const Active: Story = {
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    active: true,
  },
  render: (args) => <WizNavigationItem {...args} />,
};

export const Disabled: Story = {
  args: {
    icon: WizIDashboard,
    label: "Home",
    href: "/",
    disabled: true,
  },
  render: (args) => <WizNavigationItem {...args} />,
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
