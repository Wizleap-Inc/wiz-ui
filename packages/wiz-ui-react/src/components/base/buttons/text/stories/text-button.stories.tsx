import { Meta, StoryObj } from "@storybook/react";

import { WizTextButton } from "../components/text-button";

const meta: Meta<typeof WizTextButton> = {
  title: "Base/Buttons/Text",
  component: WizTextButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof WizTextButton>;

export const Primary: Story = {
  render: (args) => <WizTextButton {...args}>Submit</WizTextButton>,
  args: {
    variant: "primary",
  },
};
