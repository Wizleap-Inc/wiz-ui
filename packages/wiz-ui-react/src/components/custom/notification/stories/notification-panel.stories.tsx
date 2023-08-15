import { Meta, StoryObj } from "@storybook/react";

import { WizHStack, WizText, WizVStack } from "@/components";

import { WizNotificationPanel } from "..";

const meta: Meta<typeof WizNotificationPanel> = {
  title: "Custom/Notification/Panel",
  component: WizNotificationPanel,
};

export default meta;
type Story = StoryObj<typeof WizNotificationPanel>;

const baseProps = {
  title:
    "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
  timestamp: new Date("2021-01-01 00:00:00"),
  tableInfo: [
    {
      title: "情報1",
      content: "データ1",
    },
    {
      title: "情報2",
      content: "データ2",
    },
  ],
  read: false,
};

const Template: Story = {
  render: (args) => (
    <div style={{ width: 616 }}>
      <WizHStack gap="md" nowrap>
        <WizVStack gap="md">
          <WizText>variant = primary(default)</WizText>
          <WizNotificationPanel {...args} />
        </WizVStack>
        <WizVStack gap="md">
          <WizText>variant = secondary</WizText>
          <WizNotificationPanel {...args} variant="secondary" />
        </WizVStack>
      </WizHStack>
    </div>
  ),
};

export const Unread: Story = {
  ...Template,
  args: baseProps,
};

export const Read: Story = {
  ...Template,
  args: {
    ...baseProps,
    read: true,
  },
};
