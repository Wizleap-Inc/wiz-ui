import { Meta, StoryObj } from "@storybook/react";

import { WizNotification } from "..";

const meta: Meta<typeof WizNotification> = {
  title: "Custom/Notification",
  component: WizNotification,
};

export default meta;
type Story = StoryObj<typeof WizNotification>;

export const Default: Story = {
  args: {
    "data-testid": "notification-test",
    tabs: [
      {
        label: "タブ1",
        name: "tab1",
        notificationCount: 3,
        variant: "primary",
      },
      {
        label: "タブ2",
        name: "tab2",
        notificationCount: 0,
        variant: "secondary",
      },
    ],
    notifications: Array.from({ length: 10 }, (_, i) => ({
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
};

export const Empty: Story = {
  args: {
    tabs: [
      {
        label: "タブ1",
        name: "tab1",
        notificationCount: 0,
        variant: "primary",
      },
      {
        label: "タブ2",
        name: "tab2",
        notificationCount: 0,
        variant: "secondary",
      },
    ],
    notifications: [],
    height: "300px",
    emptyMessage: "メッセージはありません。",
  },
};
