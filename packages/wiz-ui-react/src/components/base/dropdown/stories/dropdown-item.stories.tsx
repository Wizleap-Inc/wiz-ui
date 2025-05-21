/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";

import { WizIOpenInNew } from "@/components";

import { WizDropdownItem } from "../components/dropdown-item";

const meta: Meta<typeof WizDropdownItem> = {
  title: "Base/Dropdown/Item",
  component: WizDropdownItem,
};

export default meta;
type Story = StoryObj<typeof WizDropdownItem>;

const Template: Story = {
  render: (args) => (
    <WizDropdownItem {...args} data-testid="dropdown-item-test">
      選択肢
    </WizDropdownItem>
  ),
};

export const Default: Story = {
  ...Template,
};

export const Disabled: Story = {
  ...Template,
  args: {
    disabled: true,
  },
};

export const WithIcon: Story = {
  ...Template,
  args: {
    icon: WizIOpenInNew,
  },
};
