import { Meta, StoryObj } from "@storybook/react";

import { WizIconButton } from "../components/icon-button";

const meta: Meta<typeof WizIconButton> = {
  title: "Base/Buttons/Icon",
  component: WizIconButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "sub"],
    },
    onClick: {
      action: "onClick",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizIconButton>;

export const Default: Story = {
  render: (args) => <WizIconButton {...args}>Submit</WizIconButton>,
  args: {
    variant: "primary",
  },
};

export const Variant: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`variant` により、IconButton の色を決められたテーマ色に変更することができます。'primary', 'sub', 'transparent', 'link', から選択できます。 default は`primary` です。",
      },
    },
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
      <div>
        <WizIconButton {...args} variant="primary" />
      </div>
      <div>variant = primary</div>
      <div>
        <WizIconButton {...args} variant="sub" />
      </div>
      <div>variant = sub</div>
      <div>
        <WizIconButton {...args} variant="transparent" />
      </div>
      <div>variant = transparent</div>
      <div>
        <WizIconButton {...args} variant="link" />
      </div>
      <div>variant = link</div>
    </div>
  ),
  args: {
    variant: "primary",
  },
};

export const Size: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "ボタンの大きさを指定することができます。 'sm', 'md', 'lg', xl' から選択できます。default は `md` です。",
      },
    },
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
      <div>
        <WizIconButton {...args} size="sm" />
      </div>
      <div>size = sm</div>
      <div>
        <WizIconButton {...args} size="md" />
      </div>
      <div>size = md</div>
      <div>
        <WizIconButton {...args} size="lg" />
      </div>
      <div>size = lg</div>
    </div>
  ),
  args: {
    variant: "primary",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "ボタンのクリックを `disabled`に設定できます。 default は `false` です。",
      },
    },
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
      <div>
        <WizIconButton disabled />
      </div>
      <div>disabled = true, variant = primary</div>
      <div>
        <WizIconButton disabled variant="sub" />
      </div>
      <div>disabled = true, variant = sub</div>
      <div>
        <WizIconButton disabled variant="transparent" />
      </div>
      <div>disabled = true, variant = transparent</div>
      <div>
        <WizIconButton disabled variant="link" />
      </div>
      <div>disabled = true, variant = link</div>
    </div>
  ),
  args: {
    variant: "primary",
  },
};
