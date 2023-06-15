import { Meta, StoryObj } from "@storybook/react";

import { WizNavigationContainer } from "../components";

const meta: Meta<typeof WizNavigationContainer> = {
  title: "Base/Navigation/Container",
  component: WizNavigationContainer,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavigationContainer>;

export const Default: Story = {
  args: {},
  render: (args) => <WizNavigationContainer {...args} />,
};
