import { Meta, StoryObj } from "@storybook/react";

import { WizProgressBar } from "../components";
import { ProgressItem } from "../components/types";

const meta: Meta<typeof WizProgressBar> = {
  title: "Base/Progress/Bar",
  component: WizProgressBar,
  argTypes: {
    contents: {
      control: { type: "array" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "100px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WizProgressBar>;
const contents: ProgressItem[] = [
  {
    id: "1",
    annotation: "Annotation 1",
    label: "Label 1",
    tooltip: "Tooltip 1",
    status: "done",
    value: 1,
    progress: true,
  },
  {
    id: "2",
    annotation: "Annotation 2",
    tooltip: "Tooltip 2",
    label: "Label 2",
    status: "active",
    value: 2,
    progress: true,
  },
  {
    id: "3",
    annotation: "Annotation 3",
    tooltip: "Tooltip 3",
    label: "Label 3",
    status: "inactive",
    value: 3,
    progress: true,
  },
  {
    id: "4",
    annotation: "Annotation 4",
    tooltip: "Tooltip 4",
    label: "Label 4",
    status: "pending",
    value: 4,
    progress: true,
  },
  {
    id: "5",
    annotation: "Annotation 5",
    tooltip: "Tooltip 5",
    label: "Label 5",
    status: "dead",
    value: 5,
    progress: true,
  },
  {
    id: "6",
    annotation: "Annotation 6",
    tooltip: "Tooltip 6",
    label: "Label 6",
    status: "none",
    value: 6,
    progress: true,
  },
];

export const Default: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
    })),
  },
  render: (args) => <WizProgressBar {...args} />,
};

export const WithValue: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      value: content.value,
    })),
  },
  render: (args) => <WizProgressBar {...args} />,
};

export const WithProgress: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      progress: content.progress,
    })),
  },
  render: (args) => <WizProgressBar {...args} />,
};

export const WithTooltip: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      tooltip: content.tooltip,
    })),
  },
  render: (args) => <WizProgressBar {...args} />,
};

export const WithLabel: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      label: content.label,
    })),
  },
  render: (args) => <WizProgressBar {...args} />,
};

export const WithAnnotation: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      annotation: content.annotation,
    })),
  },
  render: (args) => <WizProgressBar {...args} />,
};

export const WithAll: Story = {
  args: {
    contents: contents,
  },
  render: (args) => <WizProgressBar {...args} />,
};
