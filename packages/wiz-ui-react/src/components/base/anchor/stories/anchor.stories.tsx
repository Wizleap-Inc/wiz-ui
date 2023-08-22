import { Meta, StoryObj } from "@storybook/react";
import { FC } from "react";

import { WizIArrowRight } from "@/components";

import { WizAnchor } from "../components/anchor";

const meta: Meta<typeof WizAnchor> = {
  title: "Base/Anchor",
  component: WizAnchor,
  argTypes: {},
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
    href: "#",
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
    href: "#",
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
    href: "#",
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
    href: "#",
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
    href: "#",
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
    href: "#",
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
    href: "https://wizleap.co.jp",
    openInNewTab: true,
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};

/** react-routerのLink等 */
const Link: FC<any> = (props) => <a {...props}>{props.children}</a>; // eslint-disable-line @typescript-eslint/no-explicit-any

export const AsComponent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "アンカーのコンポーネントを指定することができます。asPropsで、渡したコンポーネントにpropsを渡せます。",
      },
    },
  },
  args: {
    as: Link,
    asProps: {
      href: "https://wizleap.co.jp",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  render: (args) => <WizAnchor {...args}>○○へ飛ぶ</WizAnchor>,
};
