import { Meta, StoryObj } from "@storybook/react";
import { FONT_SIZE_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizTag } from "../components/tag";

const meta: Meta<typeof WizTag> = {
  title: "Base/Tag",
  component: WizTag,
  argTypes: {
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    fontWeight: {
      control: { type: "select" },
      options: ["normal", "bold"],
    },
    variant: {
      control: { type: "select" },
      options: ["info", "error", "success", "mono"],
    },
    label: {
      control: { type: "text" },
    },
    width: {
      control: { type: "text" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizTag>;

export const Default: Story = {
  args: {
    label: "タグ",
  },
  render: (args) => <WizTag {...args} />,
};

export const Bold: Story = {
  args: {
    label: "タグ",
    fontWeight: "bold",
  },
  render: (args) => <WizTag {...args} />,
};

export const Width: Story = {
  args: {
    label: "タグ",
    width: "100px",
  },
  render: (args) => <WizTag {...args} />,
};

export const Variant: Story = {
  args: {
    label: "タグ",
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
      <WizTag label="必須" variant="info" />
      <div>variant="info"</div>
      <WizTag {...args} label="自動失注" variant="error" />
      <div>variant="error"</div>
      <WizTag {...args} label="申請完了" variant="success" />
      <div>variant="success"</div>
      <WizTag {...args} label="11/11(月)" variant="mono" />
      <div>variant="mono"</div>
    </div>
  ),
};
