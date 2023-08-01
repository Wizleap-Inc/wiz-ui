import { Meta, StoryObj } from "@storybook/react";

import { WizHStack } from "@/components";

import { WizNotificationList } from "..";

const meta: Meta<typeof WizNotificationList> = {
  title: "Custom/Notification/List",
  component: WizNotificationList,
};

export default meta;
type Story = StoryObj<typeof WizNotificationList>;

export const Variant: Story = {
  args: {
    notifications: Array.from({ length: 3 }, (_, i) => ({
      id: `${i}`,
      title: "ほげほげほげほげほげほげほげほげほげほげほげほげほげほげ",
      timestamp: new Date(
        new Date("2021-01-01T00:00:00.000Z").getTime() + i * 1000 * 60 * 60 * 24
      ),
      tabName: ["tab1", "tab2"][i % 2],
      read: i % 3 === 0,
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
    })),
  },
  render: (args) => (
    <div style={{ width: 616 }}>
      <WizHStack gap="md" nowrap={true}>
        <WizNotificationList {...args} />
        <WizNotificationList {...args} variant="secondary" />
      </WizHStack>
    </div>
  ),
};
