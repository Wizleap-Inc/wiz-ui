import { Meta, StoryObj } from "@storybook/react";
import { FONT_SIZE_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

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
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
      defaultValue: "md",
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
    clickable: false,
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

export const FontSize: Story = {
  args: {
    label: "テスト",
    fontSize: "xl",
  },
  parameters: {
    docs: {
      description: {
        story:
          "FontSize を設定することで、フォントの大きさを変えることもできます。 default 値は `md` です。",
      },
    },
  },
  render: (args) => <WizMenuItem {...args} />,
};
