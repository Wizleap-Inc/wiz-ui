import { Meta, StoryObj } from "@storybook/react";

import { WizIAdd } from "@/components/icons";

import { WizTextButton } from "../components/text-button";

const meta: Meta<typeof WizTextButton> = {
  title: "Base/Buttons/Text",
  component: WizTextButton,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    expand: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    // icon: {
    //   control: { type: "object" },
    // },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    onClick: {
      action: "click",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizTextButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => <WizTextButton {...args}>保存する</WizTextButton>,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => <WizTextButton {...args}>保存する</WizTextButton>,
  parameters: {
    docs: {
      description: {
        story:
          "ボタンのクリックを `disabled`に設定できます。 default は `false` です。",
      },
    },
  },
};

export const Angled: Story = {
  args: {
    rounded: false,
  },
  render: (args) => <WizTextButton {...args}>保存する</WizTextButton>,
  parameters: {
    docs: {
      description: {
        story: "ボタンの形を矩形にすることができます。",
      },
    },
  },
};

export const Expand: Story = {
  args: {
    expand: true,
  },
  render: (args) => <WizTextButton {...args}>保存する</WizTextButton>,
  parameters: {
    docs: {
      description: {
        story: "`expand` を指定すると、ボタンは幅いっぱいに広がります。 ",
      },
    },
  },
};

export const Icon: Story = {
  args: {
    icon: WizIAdd,
  },
  render: (args) => <WizTextButton {...args}>保存する</WizTextButton>,
  parameters: {
    docs: {
      description: {
        story:
          "アイコンを指定することができます。`WizI`というPrefixのコンポーネントがアイコンなのでそれを渡してください。選択肢はIconsを参照してください。",
      },
    },
  },
};

export const IconPosition: Story = {
  args: {
    icon: WizIAdd,
    iconPosition: "right",
  },
  render: (args) => <WizTextButton {...args}>保存する</WizTextButton>,
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
};

export const Variant: Story = {
  args: {},
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content max-content",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <WizTextButton {...args} variant="primary">
        保存する
      </WizTextButton>
      <div>variant = primary</div>
      <WizTextButton {...args} variant="sub">
        保存する
      </WizTextButton>
      <div>variant = sub</div>
    </div>
  ),
};

export const Size: Story = {
  args: {},
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content max-content",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <WizTextButton {...args} size="xs">
        保存する
      </WizTextButton>
      <div>size = xs</div>
      <WizTextButton {...args} size="sm">
        保存する
      </WizTextButton>
      <div>size = sm</div>
      <WizTextButton {...args} size="md">
        保存する
      </WizTextButton>
      <div>size = md</div>
      <WizTextButton {...args} size="lg">
        保存する
      </WizTextButton>
      <div>size = lg</div>
    </div>
  ),
  parameters: {
    description: {
      story:
        "ボタンの大きさを指定することができます。 'sm', 'md', 'lg', xl' から選択できます。default は `md` です。",
    },
  },
};
