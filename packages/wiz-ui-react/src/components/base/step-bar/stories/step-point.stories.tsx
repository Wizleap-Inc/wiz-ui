import { Meta, StoryObj } from "@storybook/react";

import { WizStepPoint } from "../components";

const meta: Meta<typeof WizStepPoint> = {
  title: "Base/Step/Point",
  component: WizStepPoint,
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["done", "pending"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizStepPoint>;

export const Done: Story = {
  args: {
    status: "done",
  },
  render: (args) => <WizStepPoint {...args} />,
};

export const Pending: Story = {
  args: {
    status: "pending",
  },
  render: (args) => <WizStepPoint {...args} />,
};
