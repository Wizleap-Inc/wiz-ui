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
    const value = ref(new Date());
    return { value };
  },
  template: `
  <div>
    <p>{{value.getFullYear()}}年 {{value.getMonth()+1}}月 {{value.getDate()}}日</p>
    <WizCalendar v-bind="$props" v-model="value" @input="input"/>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const FilledWeeks = Template.bind({});
FilledWeeks.args = {
  filledWeeks: true,
};
