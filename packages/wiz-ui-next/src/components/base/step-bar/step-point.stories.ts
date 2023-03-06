import { StoryFn, Meta } from "@storybook/vue3";

import { WizStepPoint } from ".";

export default {
  title: "Base/Step/Point",
  component: WizStepPoint,
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["done", "pending"],
    },
  },
} as Meta<typeof WizStepPoint>;

const Template: StoryFn<typeof WizStepPoint> = (args) => ({
  components: { WizStepPoint },
  setup: () => ({ args }),
  template: `
    <WizStepPoint v-bind="args"/>
  `,
});

export const Done = Template.bind({});
Done.args = {
  status: "done",
};

export const Pending = Template.bind({});
Pending.args = {
  status: "pending",
};
