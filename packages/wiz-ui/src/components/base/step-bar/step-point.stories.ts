import { StoryFn, Meta } from "@storybook/vue";

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
  },
} as Meta<typeof WizStepPoint>;

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizStepPoint },
  template: `
    <WizStepPoint v-bind="$props"/>
  `,
});

const MultipleTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizStepPoint },
  template: `
    <div style="display: flex; justify-content: space-between; width: 100%;">
      <WizStepPoint v-bind="$props" status="done"/>
      <WizStepPoint v-bind="$props" status="done"/>
      <WizStepPoint v-bind="$props" status="pending"/>
      <WizStepPoint v-bind="$props" status="pending"/>
      <WizStepPoint v-bind="$props" status="pending"/>
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
