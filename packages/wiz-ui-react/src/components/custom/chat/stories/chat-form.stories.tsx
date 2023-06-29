import { Meta, StoryObj } from "@storybook/react";

import { WizChatForm } from "..";

const meta: Meta<typeof WizChatForm> = {
  title: "Custom/Chat/Form",
  component: WizChatForm,
};

export default meta;
type Story = StoryObj<typeof WizChatForm>;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: "入力してください",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
