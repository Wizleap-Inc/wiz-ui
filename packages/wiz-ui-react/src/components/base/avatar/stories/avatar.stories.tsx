import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizAvatar } from "../components/avatar";

const meta: Meta<typeof WizAvatar> = {
  title: "Base/Avatar",
  component: WizAvatar,
  argTypes: {
    size: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    src: {
      control: { type: "text" },
    },
    alt: {
      control: { type: "text" },
    },
    name: {
      control: { type: "text" },
    },
    fallback: {
      control: { type: "text" },
    },
    clickable: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "onClick",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizAvatar>;

export const HaveImage: Story = {
  parameters: {
    docs: {
      description: {
        story: "イメージの表示に成功したときに画像が表示されます。",
      },
    },
  },
  args: {
    src: "./public/images/avatar-1.png",
    alt: "avatar",
    name: "John Due",
  },
  render: (args) => <WizAvatar {...args} />,
};

export const FailToLoadImage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "イメージの表示に失敗した場合は、画像の代わりに `name` で指定した代替テキストが表示されます。",
      },
    },
  },
  args: {
    src: "./public/images/avatar-0.png",
    alt: "avatar",
    name: "John Due",
  },
  render: (args) => <WizAvatar {...args} />,
};

export const FailToLoadImageWithFallback: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`fallback` を設定した場合、画像の表示に失敗した際に、`alt`の代わりに `fallback` で指定されたテキストが表示されます。",
      },
    },
  },
  args: {
    src: "./public/images/avatar-0.png",
    alt: "avatar",
    fallback: "田",
  },
  render: (args) => <WizAvatar {...args} />,
};

export const Clickable: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`clickable`を `true` にすることで、`onClick` を有効にすることができます。",
      },
    },
  },
  args: {
    src: "./public/images/avatar-1.png",
    alt: "avatar",
    clickable: true,
  },
  render: (args) => <WizAvatar {...args} />,
};
