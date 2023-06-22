import { Meta, StoryObj } from "@storybook/react";

import { WizProgressPoint } from "../components";
import { ProgressStatus } from "../types";

const meta: Meta<typeof WizProgressPoint> = {
  title: "Base/Progress/Point",
  component: WizProgressPoint,
};

export default meta;
type Story = StoryObj<typeof WizProgressPoint>;

export const Default: Story = {
  args: {
    status: "done",
  },
};
export const Active: Story = {
  args: {
    status: "active",
  },
};

export const Inactive: Story = {
  args: {
    status: "inactive",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
  },
};

export const Dead: Story = {
  args: {
    status: "dead",
  },
};

export const None: Story = {
  args: {
    status: "none",
  },
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
