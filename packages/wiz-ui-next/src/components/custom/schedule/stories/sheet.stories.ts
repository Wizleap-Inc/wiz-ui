import { StoryFn, Meta } from "@storybook/vue3";

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
} satisfies Meta<typeof WizScheduleSheet>;

const Template: StoryFn<typeof WizScheduleSheet> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizScheduleSheet },
  template: `
    <WizScheduleSheet v-bind="$props"  />
  `,
});

export const CustomRange = Template.bind({});
CustomRange.args = {
  startHour: 12,
  endHour: 18,
};
