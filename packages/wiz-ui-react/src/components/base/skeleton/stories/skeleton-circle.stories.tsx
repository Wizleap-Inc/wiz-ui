import { Meta, StoryObj } from "@storybook/react";

import { WizSkeletonCircle } from "../components";

const meta: Meta<typeof WizSkeletonCircle> = {
  title: "Base/Skeleton/Circle",
  component: WizSkeletonCircle,
  argTypes: {
    size: {
      control: { type: "text" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### WizSkeletonCircle

円形のスケルトンを表示するコンポーネントです。主に（というかほぼ）アバターのスケルトンに使用します。
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizSkeletonCircle>;

export const Default: Story = {
  args: {
    size: "2.5rem",
    isLoading: true,
  },
  render: (args) => (
    <WizSkeletonCircle {...args}>
      {/* WizAvatar 追加待ち */}
      {/* <WizAvatar src="./public/images/avatar-1.png" alt="avatar" /> */}
    </WizSkeletonCircle>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story: `Circleの直径を指定することができます。`,
      },
    },
  },
  args: {
    size: "5rem",
    isLoading: true,
  },
  render: (args) => (
    <WizSkeletonCircle {...args}>
      {/* <WizAvatar src="./public/images/avatar-1.png" alt="avatar" /> */}
    </WizSkeletonCircle>
  ),
};
