import { Meta, StoryObj } from "@storybook/react";

import { WizTooltip } from "../components/tooltip";

const meta: Meta<typeof WizTooltip> = {
  title: "Base/Tooltip",
  component: WizTooltip,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizTooltip>;

export const Default: Story = {};
