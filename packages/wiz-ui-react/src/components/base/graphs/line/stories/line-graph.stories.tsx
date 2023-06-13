import { Meta, StoryObj } from "@storybook/react";

import { WizLineGraph } from "../components";

const meta: Meta<typeof WizLineGraph> = {
  title: "Base/Graphs/Line",
  component: WizLineGraph,
};

export default meta;
type Story = StoryObj<typeof WizLineGraph>;

export const Default: Story = {
  args: {
    percentage: 56,
  },
};
