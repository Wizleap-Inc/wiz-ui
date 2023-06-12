import { Meta, StoryObj } from "@storybook/react";

import { WizNavItem } from "../components";

const meta: Meta<typeof WizNavItem> = {
  title: "Base/Navigation/Item",
  component: WizNavItem,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizNavItem>;

export const Default: Story = {};
