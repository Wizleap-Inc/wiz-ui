import { Meta, StoryFn } from "@storybook/vue3";

import { WizStepBar } from ".";

export default {
  title: "Base/Step/Bar",
  component: WizStepBar,
  argTypes: {
    content: {
      control: { type: "object" },
    },
  },
} as Meta<typeof WizStepBar>;

const Template: StoryFn<typeof WizStepBar> = (args) => ({
  components: { WizStepBar },
  setup: () => ({ args }),
  template: `
  <div style="padding: 100px;">
    <WizStepBar v-bind="args"/>
  </div>
  `,
});

const STATUS = ["done", "done", "done", "pending", "pending"] as const;

export const Default = Template.bind({});
Default.args = {
  contents: STATUS.map((status) => ({ status })),
};

export const WithProgress = Template.bind({});
WithProgress.args = {
  contents: STATUS.map((status, index) => ({
    status: status,
    progress: [1, 3, 4].includes(index),
  })),
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  contents: STATUS.map((status, index) => ({
    status: status,
    progress: [1, 2].includes(index),
    label: `Label ${index + 1}`,
  })),
};

export const WithAll = Template.bind({});
WithAll.args = {
  contents: STATUS.map((status, index) => ({
    status: status,
    progress: [1, 2].includes(index),
    description: "description",
    label: `Label ${index + 1}`,
  })),
};
