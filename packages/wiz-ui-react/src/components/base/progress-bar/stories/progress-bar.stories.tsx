import { Meta, StoryObj } from "@storybook/react";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizProgressBar } from "../components";
import { ProgressItem } from "../types";

const meta: Meta<typeof WizProgressBar> = {
  title: "Base/Progress/Bar",
  component: WizProgressBar,
  argTypes: {
    labelColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    labelSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    annotationColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    annotationSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
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
    progress: "active",
  },
  {
    id: "2",
    annotation: "Annotation 2",
    tooltip: "Tooltip 2",
    label: "Label 2",
    status: "active",
    value: 2,
    progress: "active",
  },
  {
    id: "3",
    annotation: "Annotation 3",
    tooltip: "Tooltip 3",
    label: "Label 3",
    status: "inactive",
    value: 3,
    progress: "inactive",
  },
  {
    id: "4",
    annotation: "Annotation 4",
    tooltip: "Tooltip 4",
    label: "Label 4",
    status: "pending",
    value: 4,
    progress: "active",
  },
  {
    id: "5",
    annotation: "Annotation 5",
    tooltip: "Tooltip 5",
    label: "Label 5",
    status: "dead",
    value: 5,
    progress: "inactive",
  },
  {
    id: "6",
    annotation: "Annotation 6",
    tooltip: "Tooltip 6",
    label: "Label 6",
    status: "none",
    value: 6,
    progress: "inactive",
  },
  {
    id: "7",
    annotation: "Annotation 7",
    tooltip: "Tooltip 7",
    label: "Label 7",
    status: "rejected",
    value: 7,
    progress: "rejected",
  },
];

export const Default: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
    })),
  },
};

export const WithValue: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      value: content.value,
    })),
  },
};

export const WithProgress: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      progress: content.progress,
    })),
  },
};

export const WithTooltip: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      tooltip: content.tooltip,
    })),
  },
};

export const WithLabel: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      label: content.label,
    })),
  },
};

export const WithAnnotation: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      annotation: content.annotation,
    })),
  },
};

export const WithAll: Story = {
  args: {
    contents: contents,
  },
};

export const WithCustomLabel: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      label: content.label,
    })),
    labelColor: "blue.800",
    labelSize: "md",
  },
};

export const WithCustomAnnotation: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      annotation: content.annotation,
    })),
    annotationColor: "green.800",
    annotationSize: "md",
  },
};

export const WithCustomLabelAndAnnotation: Story = {
  args: {
    contents: contents.map((content) => ({
      id: content.id,
      status: content.status,
      label: content.label,
      annotation: content.annotation,
    })),
    labelColor: "blue.800",
    labelSize: "md",
    annotationColor: "green.800",
    annotationSize: "md",
  },
};
