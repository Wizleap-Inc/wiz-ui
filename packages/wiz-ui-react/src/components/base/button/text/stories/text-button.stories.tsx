import { Meta, StoryFn } from "@storybook/react";

import { WizTextButton } from "../components/text-button";

export default {
  title: "Base/Buttons/Text",
  component: WizTextButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    onClick: { action: "clicked" },
  },
} as Meta<typeof WizTextButton>;

const Template: StoryFn<typeof WizTextButton> = (args) => (
  <WizTextButton {...args}>
    <span>Text Button</span>
  </WizTextButton>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};
