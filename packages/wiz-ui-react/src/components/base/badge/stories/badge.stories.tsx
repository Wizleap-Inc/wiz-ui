import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizBadge } from "../components/badge";

const meta: Meta<typeof WizBadge> = {
  title: "Base/Badge",
  component: WizBadge,
  argTypes: {
    hidden: {
      control: { type: "boolean" },
    },
    label: {
      control: { type: "text" },
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    offset: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizBadge>;

export const Default: Story = {
  render: (args) => <WizBadge {...args}>Icon</WizBadge>,
};

export const Hidden: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "コンポーネントを非表示にすることができます。default は`false` です。",
      },
    },
  },
  args: {
    hidden: true,
  },
  render: (args) => <WizBadge {...args}>Icon</WizBadge>,
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "Badge 内に label テキストを表示します。",
      },
    },
  },
  args: {
    label: "99+",
  },
  render: (args) => <WizBadge {...args}>Icon</WizBadge>,
};

export const WithOffset: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badge の位置を変更することができます。選択肢はVariablesのSpacingを参照してください。default は `no` です。",
      },
    },
  },
  args: {
    label: "99+",
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
      {SPACING_ACCESSORS.map((offset) => (
        <>
          <div>Offset = {offset}</div>
          <WizBadge {...args} offset={offset}>
            Icon
          </WizBadge>
        </>
      ))}
    </div>
  ),
};

export const WithColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badge の文字色を変更することができます。選択肢はVariablesのColorを参照してください。default は `white.800` です。",
      },
    },
  },
  args: {
    label: "99+",
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
      {COLOR_MAP_ACCESSORS.map((color) => (
        <>
          <div>Color = {color}</div>
          <WizBadge {...args} color={color}>
            Icon
          </WizBadge>
        </>
      ))}
    </div>
  ),
};

export const WithBgColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badge の背景の色を変更することができます選択肢はVariablesのColorを参照してください。default は `red.800` です。",
      },
    },
  },
  args: {
    label: "99+",
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
      {COLOR_MAP_ACCESSORS.map((color) => (
        <>
          <div>Background Color = {color}</div>
          <WizBadge {...args} bgColor={color}>
            Icon
          </WizBadge>
        </>
      ))}
    </div>
  ),
};

export const WithSize: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Badge の大きさを変更することができます。`sm`, `md`, `lg` の中から選択できます。 default は `md` です。",
      },
    },
  },
  args: {
    label: "99+",
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
      {["sm" as const, "md" as const, "lg" as const].map((size) => (
        <>
          <div>Size = {size}</div>
          <WizBadge {...args} size={size}>
            Icon
          </WizBadge>
        </>
      ))}
    </div>
  ),
};

export const WithSlot: Story = {
  parameters: {
    docs: {
      description: {
        story: "`<WizBadge>`にコンポーネントを内包して設定することもできます。",
      },
    },
  },
  args: {
    label: "99+",
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
      <div>Slot = WizIcon</div>
      <WizBadge {...args}>
        {/* <WizIcon :icon="WizINotification" size="xl6" /> */}
        Icon1
      </WizBadge>
      <div>Slot = WizAvatar</div>
      <WizBadge {...args} size="sm">
        Icon2
        {/* <WizAvatar src="./public/images/avatar-1.png" alt="avatar" /> */}
      </WizBadge>
    </div>
  ),
};

export const WithIconButton: Story = {
  parameters: {
    docs: {
      description: {
        story: "`<WizBadge>` に `<WizIconButton>` を内包することもできます。",
      },
    },
  },
  args: {
    label: "99+",
  },
  render: (args) => (
    <WizBadge {...args}>
      {/*  <WizIconButton size="xl4" :icon="WizINotification" variant="transparent" @click="args.buttonClick" /> */}
      Icon1
    </WizBadge>
  ),
};
