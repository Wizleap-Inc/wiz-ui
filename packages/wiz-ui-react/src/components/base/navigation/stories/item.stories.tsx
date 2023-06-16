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
  render: (args) => <WizNavigationItem {...args} />,
};
