import { StoryFn } from "@storybook/vue";

import { WizProgressBar } from ".";

export default {
  title: "Base/Progress/Bar",
  component: WizProgressBar,
  argTypes: {
    content: {
      control: { type: "array" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizProgressBar },
  template: `
  <div style="padding: 100px;">
    <WizProgressBar v-bind="$props"/>
  </div>
  `,
});

const baseContents = [
  {
    status: "done",
  },
  {
    status: "active",
  },
  {
    status: "inactive",
  },
  {
    status: "none",
  },
  {
    status: "pending",
  },
  {
    status: "dead",
  },
];
export const Default = Template.bind({});
Default.args = {
  contents: baseContents,
};

export const WithValue = Template.bind({});
WithValue.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    value: index + 1,
  })),
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    progress: [1, 3, 4].includes(index),
  })),
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    tooltip: `Tooltip ${index + 1}`,
  })),
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    label: `Label ${index + 1}`,
  })),
};

export const WithAnnotation = Template.bind({});
WithAnnotation.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    annotation: `Annotation ${index + 1}`,
  })),
};

export const WithAll = Template.bind({});
WithAll.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    value: index + 1,
    progress: [1, 3, 4].includes(index),
    tooltip: `Tooltip ${index + 1}`,
    label: `Label ${index + 1}`,
    annotation: `Annotation ${index + 1}`,
  })),
};
