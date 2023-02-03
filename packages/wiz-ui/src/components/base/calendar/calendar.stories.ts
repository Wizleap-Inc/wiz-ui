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
    const defaultValue = new Date("2021-01-01T00:00:00.000Z");
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

FilledWeeks.parameters = {
  docs: {
    description: {
      story:
        "指定すると該当しない月の日付を表示するようにします。default では `false` になります。",
    },
    source: {
      code: `
<template>
  <div>
    <p>{{value.getFullYear()}}年 {{value.getMonth()+1}}月 {{value.getDate()}}日</p>
    <WizCalendar filledWeeks v-model="value" :currentMonth="currentMonth" @input="input"/>
  </div>
</template>
      `,
    },
  },
};
