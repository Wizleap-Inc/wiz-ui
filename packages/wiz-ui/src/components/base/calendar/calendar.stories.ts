import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizCalendar from "./calendar.vue";

export default {
  title: "Base/Calendar",
  component: WizCalendar,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    input: {
      action: "input",
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCalendar },
  setup() {
    const defaultValue = new Date(2023, 0, 8, 0, 0, 0, 0);
    const value = ref(new Date(defaultValue));

    const currentMonth = ref(new Date(defaultValue));
    return { value, currentMonth };
  },
  template: `
  <div>
    <p>{{value.getFullYear()}}年 {{value.getMonth()+1}}月 {{value.getDate()}}日</p>
    <WizCalendar v-bind="$props" v-model="value" :currentMonth="currentMonth" @input="input"/>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const FilledWeeks = Template.bind({});
FilledWeeks.args = {
  filledWeeks: true,
};

export const WithPeriod = Template.bind({});
WithPeriod.args = {
  period: "start",
  otherPeriod: new Date(2023, 0, 18, 0, 0, 0, 0),
};
