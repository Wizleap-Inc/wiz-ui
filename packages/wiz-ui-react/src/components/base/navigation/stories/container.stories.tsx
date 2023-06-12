import { Meta, StoryObj } from "@storybook/react";

import { WizNavContainer } from "../components";

const meta: Meta<typeof WizNavContainer> = {
  title: "Base/Navigation/Container",
  component: WizNavContainer,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavContainer>;

export const Default: Story = {};
