import { Meta, StoryObj } from "@storybook/react";
import {
  FONT_SIZE_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizSkeletonText } from "../components";

const meta: Meta<typeof WizSkeletonText> = {
  title: "Base/Skeleton/Text",
  component: WizSkeletonText,
  argTypes: {
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    lines: {
      control: { type: "number" },
    },
    isLoading: {
      control: { type: "boolean" },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
### WizSkeletonText

テキストのスケルトンを表示するコンポーネントです。`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizSkeletonText>;

export const Default: Story = {
  args: {
    lines: 3,
    isLoading: true,
  },
  render: (args) => (
    <WizSkeletonText {...args}>This is loading text.</WizSkeletonText>
  ),
};

export const Lines: Story = {
  parameters: {
    docs: {
      description: {
        story: `行数を指定することで、複数行のスケルトンを表示することができます。テキストであることを強調するため、最後の行の幅は80%に設定されています。`,
      },
    },
  },
  args: {
    lines: 3,
  },
  render: (args) => (
    <WizSkeletonText {...args}>This is loading text.</WizSkeletonText>
  ),
};

export const FontSize: Story = {
  parameters: {
    docs: {
      description: {
        story: `フォントサイズを指定することで、各スケルトンのサイズを変更することができます。`,
      },
    },
  },
  args: {
    fontSize: "xs",
    lines: 3,
  },
  render: (args) => (
    <WizSkeletonText {...args}>This is loading text.</WizSkeletonText>
  ),
};

export const Gap: Story = {
  parameters: {
    docs: {
      description: {
        story: `行間を指定することで、各スケルトンの行間を変更することができます。`,
      },
    },
  },
  args: {
    gap: "xl",
    lines: 3,
  },
  render: (args) => (
    <WizSkeletonText {...args}>This is loading text.</WizSkeletonText>
  ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      description: {
        story: `ローディング中でない場合は、スケルトンは表示されません。その代わり、\`children\` の内容が表示されます。`,
      },
    },
  },
  args: {
    isLoading: false,
  },
  render: (args) => (
    <WizSkeletonText {...args}>This is loading text.</WizSkeletonText>
  ),
};
