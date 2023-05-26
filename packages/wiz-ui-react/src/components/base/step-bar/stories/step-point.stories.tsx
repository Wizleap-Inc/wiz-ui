import { Meta, StoryObj } from "@storybook/react";

import { WizStepPoint } from "../components";

const meta: Meta<typeof WizStepPoint> = {
  title: "Base/Step/Point",
  component: WizStepPoint,
};

export default meta;
type Story = StoryObj<typeof WizStepPoint>;

export const Done: Story = {
  args: {
    status: "done",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
  },
};
