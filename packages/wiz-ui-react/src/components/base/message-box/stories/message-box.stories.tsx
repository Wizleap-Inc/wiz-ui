import { Meta, StoryObj } from "@storybook/react";

import { WizIClose } from "@/components/icons";

import { WizMessageBox } from "../components";

const meta: Meta<typeof WizMessageBox> = {
  title: "Base/MessageBox",
  component: WizMessageBox,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["information", "caution", "warning"],
    },
    expand: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizMessageBox>;

export const Information: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "information",
  },
  render: (args) => (
    <WizMessageBox {...args}>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizMessageBox>
  ),
};

export const Caution: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "caution",
  },
  render: (args) => (
    <WizMessageBox {...args}>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizMessageBox>
  ),
};

export const Warning: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "warning",
  },
  render: (args) => (
    <WizMessageBox {...args}>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizMessageBox>
  ),
};

export const Expand: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "information",
    expand: true,
  },
  render: (args) => (
    <WizMessageBox {...args}>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizMessageBox>
  ),
};

export const WithIcon: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "information",
    icon: WizIClose,
  },
  render: (args) => (
    <WizMessageBox {...args}>
      テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
    </WizMessageBox>
  ),
};

export const EmptyBody: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "information",
  },
  render: (args) => <WizMessageBox {...args} />,
};

export const Short: Story = {
  args: {
    title: "ヘッダーヘッダーヘッダー",
    variant: "information",
    short: true,
  },
  render: (args) => <WizMessageBox {...args} />,
};
