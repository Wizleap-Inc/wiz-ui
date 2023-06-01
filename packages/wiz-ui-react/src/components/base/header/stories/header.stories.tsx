import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizINotification } from "@/components/icons";

import { WizHeader } from "../components/header";

const meta: Meta<typeof WizHeader> = {
  title: "Base/Header",
  component: WizHeader,
  argTypes: {
    size: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    icon: {
      control: { type: "object" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizHeader>;

export const Default: Story = {
  args: {
    icon: WizINotification,
  },
  render: (args) => <WizHeader {...args} />,
};
