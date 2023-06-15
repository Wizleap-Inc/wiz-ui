import { Meta, StoryObj } from "@storybook/react";

import { WizNavigationItem } from "../components";

const meta: Meta<typeof WizNavigationItem> = {
  title: "Base/Navigation/Item",
  component: WizNavigationItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavigationItem>;

export const Default: Story = {
  args: {},
  render: (args) => <WizNavigationItem {...args} />,
};
