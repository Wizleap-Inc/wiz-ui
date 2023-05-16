import { Meta, StoryObj } from "@storybook/react";

import { WizIAdd, WizIRemove } from "@/components";

import { WizToggleButton } from "../components/toggle-button";

const meta: Meta<typeof WizToggleButton> = {
  title: "Base/Buttons/Toggle",
  component: WizToggleButton,
  argTypes: {
    inactiveIcon: {
      control: { type: "object" },
    },
    activeIcon: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    rounded: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isActive: {
      control: { type: "boolean" },
    },
    onClick: {
      action: "onClick",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizToggleButton>;

export const Default: Story = {
  args: {
    activeIcon: WizIRemove,
    inactiveIcon: WizIAdd,
  },
  render: (args) => <WizToggleButton {...args}>顧客データ追加</WizToggleButton>,
};

export const Disabled: Story = {
  args: {
    activeIcon: WizIRemove,
    inactiveIcon: WizIAdd,
    disabled: true,
  },
  render: (args) => <WizToggleButton {...args}>顧客データ追加</WizToggleButton>,
  parameters: {
    description: {
      story:
        "ボタンのクリックを `disabled`に設定できます。 default は `false` です。",
    },
  },
};

export const Angled: Story = {
  args: {
    activeIcon: WizIRemove,
    inactiveIcon: WizIAdd,
    rounded: false,
  },
  render: (args) => <WizToggleButton {...args}>顧客データ追加</WizToggleButton>,
  parameters: {
    description: {
      story: "ボタンの形を矩形にすることができます。",
    },
  },
};

export const On: Story = {
  args: {
    activeIcon: WizIRemove,
    inactiveIcon: WizIAdd,
    isActive: true,
  },
  render: (args) => <WizToggleButton {...args}>顧客データ追加</WizToggleButton>,
  parameters: {
    description: {
      story: "ボタンのOn/Offを指定することができます。",
    },
  },
};

export const Off: Story = {
  args: {
    activeIcon: WizIRemove,
    inactiveIcon: WizIAdd,
    isActive: false,
  },
  render: (args) => <WizToggleButton {...args}>顧客データ追加</WizToggleButton>,
  parameters: {
    description: {
      story: "ボタンのOn/Offを指定することができます。",
    },
  },
};

export const Size: Story = {
  args: {
    activeIcon: WizIRemove,
    inactiveIcon: WizIAdd,
  },
  render: (args) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "max-content max-content",
        gridGap: "1rem",
        alignItems: "center",
      }}
    >
      <WizToggleButton {...args} size="sm">
        顧客データ追加
      </WizToggleButton>
      <div>size = sm</div>
      <WizToggleButton {...args} size="md">
        顧客データ追加
      </WizToggleButton>
      <div>size = md</div>
      <WizToggleButton {...args} size="lg">
        顧客データ追加
      </WizToggleButton>
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
