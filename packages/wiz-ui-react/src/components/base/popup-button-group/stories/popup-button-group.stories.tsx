/* eslint-disable react-hooks/rules-of-hooks */

import { Meta, StoryObj } from "@storybook/react";

import { WizPopupButtonGroup } from "../components";

const meta: Meta<typeof WizPopupButtonGroup> = {
  title: "Base/PopupButtonGroup",
  component: WizPopupButtonGroup,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizPopupButtonGroup>;

export const Default: Story = {
  args: {},
  render: (args) => {
    return <WizPopupButtonGroup />;
  },
};
