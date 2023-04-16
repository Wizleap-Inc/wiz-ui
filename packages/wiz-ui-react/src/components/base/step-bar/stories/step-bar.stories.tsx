import { Meta, StoryObj } from "@storybook/react";

import { WizStepBar } from "../components";
import { StepItem } from "../components/types";

const meta: Meta<typeof WizStepBar> = {
  title: "Base/Step/Bar",
  component: WizStepBar,
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ padding: "100px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WizStepBar>;

const status: StepItem[] = [
  {
    id: "1",
    status: "done",
    label: "Step 1",
    description: "Description",
    progress: true,
  },
  {
    id: "2",
    status: "done",
    label: "Step 2",
    description: "Description",
    progress: true,
  },
  {
    id: "3",
    status: "done",
    label: "Step 3",
    description: "Description",
    progress: true,
  },
  {
    id: "4",
    status: "pending",
    label: "Step 4",
    description: "Description",
    progress: false,
  },
  {
    id: "5",
    status: "pending",
    label: "Step 5",
    description: "Description",
    progress: false,
  },
];

export const Default: Story = {
  args: {
    contents: status.map((item) => ({
      id: item.id,
      status: item.status,
    })),
  },
  render: (args) => <WizStepBar {...args} />,
};

export const WithProgress: Story = {
  args: {
    contents: status.map((item) => ({
      id: item.id,
      status: item.status,
      progress: item.progress,
    })),
  },
  render: (args) => <WizStepBar {...args} />,
};

export const WithLabel: Story = {
  args: {
    contents: status.map((item) => ({
      id: item.id,
      status: item.status,
      progress: item.progress,
      label: item.label,
    })),
  },
  render: (args) => <WizStepBar {...args} />,
};

export const WithAll: Story = {
  args: {
    contents: status,
  },
  render: (args) => <WizStepBar {...args} />,
};
