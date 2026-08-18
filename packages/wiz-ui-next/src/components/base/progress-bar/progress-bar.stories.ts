import { Meta, StoryFn } from "@storybook/vue3";
import {
  COLOR_MAP_ACCESSORS,
  FONT_SIZE_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizProgressBar } from ".";

export default {
  title: "Base/Progress/Bar",
  component: WizProgressBar,
  argTypes: {
    content: {
      control: { type: "object" },
    },
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
} as Meta<typeof WizProgressBar>;

const Template: StoryFn<typeof WizProgressBar> = (args) => ({
  components: { WizProgressBar },
  setup: () => ({ args }),
  template: `
  <div style="padding: 100px;">
    <WizProgressBar v-bind="args"/>
  </div>
  `,
});

const STATUS = [
  "done",
  "active",
  "inactive",
  "none",
  "pending",
  "dead",
  "rejected",
] as const;

const progressAt = (index: number): "active" | "inactive" | "rejected" => {
  if ([1, 3, 4].includes(index)) return "active";
  if (index === 6) return "rejected";
  return "inactive";
};

export const Default = Template.bind({});
Default.args = {
  contents: STATUS.map((status) => ({ status })),
};

export const WithValue = Template.bind({});
WithValue.args = {
  contents: STATUS.map((status, index) => ({
    status,
    value: index + 1,
  })),
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  contents: STATUS.map((status, index) => ({
    status,
    progress: progressAt(index),
  })),
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  contents: STATUS.map((status, index) => ({
    status,
    tooltip: `Tooltip ${index + 1}`,
  })),
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  contents: STATUS.map((status, index) => ({
    status,
    label: `Label ${index + 1}`,
  })),
};

export const WithAnnotation = Template.bind({});
WithAnnotation.args = {
  contents: STATUS.map((status, index) => ({
    status,
    annotation: `Annotation ${index + 1}`,
  })),
};

export const WithAll = Template.bind({});
WithAll.args = {
  contents: STATUS.map((status, index) => ({
    status,
    value: index + 1,
    progress: progressAt(index),
    tooltip: `Tooltip ${index + 1}`,
    label: `Label ${index + 1}`,
    annotation: `Annotation ${index + 1}`,
  })),
};

export const WithCustomLabel = Template.bind({});
WithCustomLabel.args = {
  contents: STATUS.map((status, index) => ({
    status,
    label: `Label ${index + 1}`,
  })),
  labelColor: "blue.800",
  labelSize: "md",
};

export const WithCustomAnnotation = Template.bind({});
WithCustomAnnotation.args = {
  contents: STATUS.map((status, index) => ({
    status,
    annotation: `Annotation ${index + 1}`,
  })),
  annotationColor: "green.800",
  annotationSize: "md",
};

export const WithCustomLabelAndAnnotation = Template.bind({});
WithCustomLabelAndAnnotation.args = {
  contents: STATUS.map((status, index) => ({
    status,
    label: `Label ${index + 1}`,
    annotation: `Annotation ${index + 1}`,
  })),
  labelColor: "blue.800",
  labelSize: "md",
  annotationColor: "green.800",
  annotationSize: "md",
};
