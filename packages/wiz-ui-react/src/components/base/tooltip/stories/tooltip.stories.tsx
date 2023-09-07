import { Meta, StoryObj } from "@storybook/react";

import { WizText } from "@/components";

import { WizTooltip } from "../components/tooltip";

const meta: Meta<typeof WizTooltip> = {
  title: "Base/Tooltip",
  component: WizTooltip,
  argTypes: {},
  parameters: {
    screenshot: {
      // Popup のフェードインアニメーション分をディレイする
      delay: 200,
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizTooltip>;

const content = <div>保険見直し、つみたて・投資、ライフプラン</div>;

const Template: Story = {
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

export const Default: Story = {
  ...Template,
  args: {
    content,
  },
};

export const Open: Story = {
  ...Template,
  args: {
    content,
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: "isOpenをtrueにすると、常時表示されます。",
      },
    },
  },
};

export const Direction: Story = {
  ...Template,
  args: {
    content,
    isOpen: true,
    direction: "right",
  },
  parameters: {
    docs: {
      description: {
        story:
          "directionには、top, bottom, left, rightのいずれかを渡すことができます。デフォルトはtopです。",
      },
    },
  },
};

export const IsDirectionFixed: Story = {
  ...Template,
  args: {
    content,
    isOpen: true,
    direction: "right",
    isDirectionFixed: true,
  },
  parameters: {
    docs: {
      description: {
        story: "isDirectionFixed を指定すると、Popup の表示位置を固定します。",
      },
    },
  },
};
