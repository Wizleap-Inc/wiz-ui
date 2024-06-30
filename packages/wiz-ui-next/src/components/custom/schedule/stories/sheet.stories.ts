import { StoryFn } from "@storybook/vue3";

import { WizScheduleSheet } from "..";

export default {
  title: "Custom/Schedule/Sheet",
  component: WizScheduleSheet,
  argTypes: {
    startHour: {
      control: { type: "number" },
    },
    endHour: {
      control: { type: "number" },
    },
  },
};

const Template: StoryFn<typeof WizScheduleSheet> = (args) => ({
  setup: () => ({ args }),
  components: { WizScheduleSheet },
  template: `
    <WizScheduleSheet v-bind="args"  />
  `,
});

export const CustomRange = Template.bind({});
CustomRange.args = {
  startHour: 12,
  endHour: 18,
};
