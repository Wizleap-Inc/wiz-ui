import { Meta, StoryObj } from "@storybook/react";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizIAdd } from "@/components/icons";

import { WizTinyButton } from "../components/tiny-button";
const spacingKeys = ["p", "px", "py"];
const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
}, {} as Record<string, any>);

const meta: Meta<typeof WizTinyButton> = {
  title: "Base/Buttons/Tiny",
  component: WizTinyButton,
  argTypes: {
    clickable: {
      control: { type: "boolean" },
    },
    active: {
      control: { type: "boolean" },
    },
    hover: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "object" },
    },
    iconPosition: {
      control: { type: "select" },
      options: ["left", "right"],
    },
    onClick: {
      action: "click",
    },
    ...spacingControls,
  },
};

export default meta;
type Story = StoryObj<typeof WizTinyButton>;

export const Primary: Story = {
  args: {},
  render: (args) => <WizTinyButton {...args}>保存する</WizTinyButton>,
};

export const Clickable: Story = {
  args: {
    clickable: true,
    active: false,
  },
  render: (args) => <WizTinyButton {...args}>保存する</WizTinyButton>,
  parameters: {
    docs: {
      description: {
        story:
          "ボタンのクリックを `disabled`に設定できます。 default は `true` です。",
      },
    },
  },
};

export const Active: Story = {
  args: {
    clickable: false,
    active: true,
  },
  render: (args) => <WizTinyButton {...args}>保存する</WizTinyButton>,
  parameters: {
    docs: {
      description: {
        story:
          "ボタンのOn/Offを `active`に設定できます。 default は `false` です。",
      },
    },
  },
};

export const Hover: Story = {
  args: {
    clickable: false,
    active: true,
  },
  render: () => {
    const patterns = [
      { hover: true, clickable: true, active: true },
      { hover: true, clickable: true, active: false },
      { hover: true, clickable: false, active: true },
      { hover: true, clickable: false, active: false },
    ];

    return (
      <table>
        {patterns.map((pattern) => {
          return (
            <tr>
              <td style={{ padding: "1rem" }}>
                clickable={pattern.clickable ? "true" : "false"}
              </td>
              <td style={{ padding: "1rem" }}>
                active={pattern.active ? "true" : "false"}
              </td>
              <td style={{ padding: "1rem" }}>
                <WizTinyButton {...pattern}>保存する</WizTinyButton>
              </td>
            </tr>
          );
        })}
      </table>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "hoverをtrueにすると、常時表示されます。これはStorybook上でのデモ用などInteractionのMockに使えます。",
      },
    },
  },
};

export const Icon: Story = {
  args: {
    icon: WizIAdd,
    clickable: true,
    active: true,
  },
  render: (args) => <WizTinyButton {...args}>保存する</WizTinyButton>,
  parameters: {
    docs: {
      description: {
        story:
          "ボタンのOn/Offを `active`に設定できます。 default は `false` です。",
      },
    },
  },
};

export const IconPosition: Story = {
  args: {
    icon: WizIAdd,
    iconPosition: "right",
    clickable: true,
    active: true,
  },
  render: (args) => <WizTinyButton {...args}>保存する</WizTinyButton>,
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
