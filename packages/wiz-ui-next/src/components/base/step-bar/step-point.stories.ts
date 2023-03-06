import { StoryFn, Meta } from "@storybook/vue3";

import { WizStepPoint } from ".";

export default {
  title: "Base/Step/Point",
  component: WizStepPoint,
  argTypes: {
    status: {
      control: {
        type: "select",
        options: ["done", "active", "inactive", "pending", "dead", "none"],
      },
    },
    value: {
      control: { type: "number" },
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

const MultipleTemplate: StoryFn<typeof WizStepPoint> = (args) => ({
  components: { WizStepPoint },
  setup: () => ({ args }),
  template: `
    <div style="display: flex; justify-content: space-between; width: 100%;">
      <WizStepPoint v-bind="args" status="done"/>
      <WizStepPoint v-bind="args" status="done"/>
      <WizStepPoint v-bind="args" status="pending"/>
      <WizStepPoint v-bind="args" status="pending"/>
      <WizStepPoint v-bind="args" status="pending"/>
    </div>
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

export const WithValue = MultipleTemplate.bind({});
