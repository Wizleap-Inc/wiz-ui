import { Meta, StoryObj } from "@storybook/react";

import { WizProgressPoint } from "../components";
import { ProgressStatus } from "../components/types";

const meta: Meta<typeof WizProgressPoint> = {
  title: "Base/Progress/Point",
  component: WizProgressPoint,
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["done", "active", "inactive", "pending", "dead", "none"],
      },
    },
    value: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizProgressPoint>;

export const Default: Story = {
  args: {
    status: "done",
  },
  render: (args) => <WizProgressPoint {...args} />,
};
export const Active: Story = {
  args: {
    status: "active",
  },
  render: (args) => <WizProgressPoint {...args} />,
};

export const Inactive: Story = {
  args: {
    status: "inactive",
  },
  render: (args) => <WizProgressPoint {...args} />,
};

export const Pending: Story = {
  args: {
    status: "pending",
  },
  render: (args) => <WizProgressPoint {...args} />,
};

export const Dead: Story = {
  args: {
    status: "dead",
  },
  render: (args) => <WizProgressPoint {...args} />,
};

export const None: Story = {
  args: {
    status: "none",
  },
  render: (args) => <WizProgressPoint {...args} />,
};

export const WithValue: Story = {
  render: (args) => {
    const status: ProgressStatus[] = [
      "done",
      "active",
      "inactive",
      "pending",
      "dead",
      "none",
    ];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {status.map((status: ProgressStatus, i) => (
          <WizProgressPoint key={i} {...args} status={status} value={i} />
        ))}
      </div>
    );
  },
};
