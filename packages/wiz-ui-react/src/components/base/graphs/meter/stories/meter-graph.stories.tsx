import { Meta, StoryObj } from "@storybook/react";

import { WizText } from "@/components";

import { WizMeterGraph } from "../components";

const meta: Meta<typeof WizMeterGraph> = {
  title: "Base/Graphs/Meter",
  component: WizMeterGraph,
};

export default meta;
type Story = StoryObj<typeof WizMeterGraph>;

export const Default: Story = {
  args: {
    percentage: 56,
  },
};

export const Children: Story = {
  args: {
    percentage: 56,
    children: <WizText>ここはchildrenです</WizText>,
  },
};
