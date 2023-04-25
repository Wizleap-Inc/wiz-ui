import { Meta, StoryObj } from "@storybook/react";

import { WizScheduleSheet } from "..";

const meta = {
  title: "Custom/Schedule/Sheet",
  component: WizScheduleSheet,
  argTypes: {
    startHour: {
      control: { type: "number" },
    },
    endHour: {
      control: { type: "number" },
    },
  },
} satisfies Meta<typeof WizScheduleSheet>;

export default meta;
type Story = StoryObj<typeof WizScheduleSheet>;

export const CustomRange: Story = {
  render: (args) => <WizScheduleSheet {...args} />,
  args: {
    startHour: 12,
    endHour: 18,
  },
};
