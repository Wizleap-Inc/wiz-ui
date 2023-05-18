import { Meta, StoryObj } from "@storybook/react";

import { WizMenuItem } from "../components/menu-item";

const meta: Meta<typeof WizMenuItem> = {
  title: "Base/MenuItem",
  component: WizMenuItem,
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    active: {
      control: {
        type: "boolean",
      },
    },
    clickable: {
      control: {
        type: "boolean",
      },
    },
    onClick: {
      action: "onClick",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizMenuItem>;

export const Default: Story = {
  args: {
    label: "テスト",
  },
  parameters: {
    docs: {
      description: {
        story:
          "サブメニューのコンポーネントです。このコンポーネントでは、`label` パラメータが必須です。",
      },
    },
  },
  render: (args) => <WizMenuItem {...args} />,
};

export const Active: Story = {
  args: {
    label: "テスト",
    active: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Active を設定することで、常にアクティブ化することもできます。 default 値は `false` です。",
      },
    },
  },
  render: (args) => <WizMenuItem {...args} />,
};

export const Disabled: Story = {
  args: {
    label: "テスト",
    clickable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "`clickable = false` とすることで、クリックできないように設定することもできます。default 値は `true` です。",
      },
    },
  },
  render: (args) => <WizMenuItem {...args} />,
};
