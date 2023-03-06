import { StoryFn, Meta } from "@storybook/vue";

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

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizStepPoint },
  template: `
    <WizStepPoint v-bind="$props"/>
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
