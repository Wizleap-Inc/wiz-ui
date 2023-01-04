import { StoryFn, Meta } from "@storybook/vue3";

import { WizProgressBar } from ".";

export default {
  title: "Base/Progress/Bar",
  component: WizProgressBar,
  argTypes: {
    content: {
      control: { type: "array" },
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
] as const;

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
    progress: [1, 3, 4].includes(index),
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
    progress: [1, 3, 4].includes(index),
    tooltip: `Tooltip ${index + 1}`,
    label: `Label ${index + 1}`,
    annotation: `Annotation ${index + 1}`,
  })),
};
