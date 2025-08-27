import { Meta, StoryObj } from "@storybook/react";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizLineGraph } from "../components";

const meta: Meta<typeof WizLineGraph> = {
  title: "Base/Graphs/Line",
  component: WizLineGraph,
  argTypes: {
    percentage: {
      control: { type: "number" },
    },
    activeColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizLineGraph>;

export const Default: Story = {
  args: {
    percentage: 56,
  },
};

export const HiddenBg: Story = {
  args: {
    percentage: 56,
    hiddenBg: true,
  },
};

export const ActiveColor: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <WizLineGraph percentage={75} activeColor="green.800" />
      <WizLineGraph percentage={60} activeColor="blue.800" />
      <WizLineGraph percentage={45} activeColor="red.800" />
      <WizLineGraph percentage={90} activeColor="yellow.800" />
    </div>
  ),
};

export const Size: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>Small (sm)</p>
        <WizLineGraph percentage={56} size="sm" />
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Medium (md)</p>
        <WizLineGraph percentage={56} size="md" />
      </div>
    </div>
  ),
};
