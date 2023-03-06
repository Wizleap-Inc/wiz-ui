import { StoryFn, Meta } from "@storybook/vue";

import { WizStepBar } from ".";

export default {
  title: "Base/Step/Bar",
  component: WizStepBar,
  argTypes: {
    content: {
      control: { type: "array" },
    },
  },
} as Meta<typeof WizStepBar>;

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizStepBar },
  template: `
  <div style="padding: 100px;">
    <WizStepBar v-bind="$props"/>
  </div>
  `,
});

const baseContents = [
  { status: "done" },
  { status: "done" },
  { status: "done" },
  { status: "pending" },
  { status: "pending" },
];
export const Default = Template.bind({});
Default.args = {
  contents: baseContents,
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    progress: [1, 3, 4].includes(index),
  })),
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    progress: [1, 2].includes(index),
    label: `Label ${index + 1}`,
  })),
};

export const WithAll = Template.bind({});
WithAll.args = {
  contents: baseContents.map((content, index) => ({
    ...content,
    progress: [1, 2].includes(index),
    description: "description",
    label: `Label ${index + 1}`,
  })),
};
