import { Meta, StoryObj } from "@storybook/react";

import { WizText } from "@/components";

import { WizTooltip } from "../components/tooltip";

const meta: Meta<typeof WizTooltip> = {
  title: "Base/Tooltip",
  component: WizTooltip,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WizTooltip>;

export const Default: Story = {
  args: {
    content: <div>保険見直し、つみたて・投資、ライフプラン</div>,
  },
  render: (args) => (
    <div
      style={{
        width: "700px",
        height: "500px",
        backgroundColor: "#eee",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WizTooltip {...args}>
        <WizText>保険見直し、つみ...</WizText>
      </WizTooltip>
    </div>
  ),
};
