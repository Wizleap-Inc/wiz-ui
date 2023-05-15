import { Meta, StoryObj } from "@storybook/react";
import {
  FONT_SIZE_ACCESSORS,
  FONT_WEIGHT_ACCESSORS,
  COLOR_MAP_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizIArrowRight } from "@/components";

import { WizAnchor } from "../components/anchor";

const meta: Meta<typeof WizAnchor> = {
  title: "Base/Anchor",
  component: WizAnchor,
  argTypes: {
    to: {
      control: { type: "string" },
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
      defaultValue: "md",
    },
    fontWeight: {
      control: { type: "select" },
      options: FONT_WEIGHT_ACCESSORS,
      defaultValue: "normal",
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
      defaultValue: "blue.800",
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      defaultValue: "left",
    },
    openInNewTab: {
      control: { type: "boolean" },
      defaultValue: false,
    },
    icon: {
      control: { type: "object" },
    },
    nowrap: {
      control: { type: "boolean" },
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizAnchor>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "http(s)で始まる場合は、外部リンクとして<a> + hrefで出力されます。",
      },
    },
  },
  args: {
    to: "#",
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

export const Color: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "文字色を指定することができます。選択肢はVariablesのColorを参照してください。",
      },
    },
  },
  args: {
    to: "#",
    color: "red.800",
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

export const FontSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "文字サイズを指定することができます。選択肢はVariablesのFontSizeを参照してください。",
      },
    },
  },
  args: {
    to: "#",
    fontSize: "sm",
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

export const FontWeight: Story = {
  parameters: {
    docs: {
      description: {
        story: "文字の太さを指定することができます。",
      },
    },
  },
  args: {
    to: "#",
    fontWeight: "bold",
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

export const Icon: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "アイコンを指定することができます。`WizI`というPrefixのコンポーネントがアイコンなのでそれを渡してください。選択肢はIconsを参照してください。",
      },
    },
  },
  args: {
    to: "#",
    icon: WizIArrowRight,
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

export const IconPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: `
アイコンの配置を指定することができます。
- left: 左寄せ
- right: 右寄せ
      `,
      },
    },
  },
  args: {
    to: "#",
    icon: WizIArrowRight,
    iconPosition: "right",
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

export const OpenInNewTab: Story = {
  parameters: {
    docs: {
      description: {
        story: "外部リンクの場合、新しいタブで開くかどうかを指定できます。",
      },
    },
  },
  args: {
    to: "https://wizleap.co.jp",
    openInNewTab: true,
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};
