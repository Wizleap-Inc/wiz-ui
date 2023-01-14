import { StoryFn, Meta } from "@storybook/vue3";
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
      action: "update:modelValue",
    },
  },
} as Meta<typeof WizCalendar>;

const Template: StoryFn<typeof WizCalendar> = (args) => ({
  components: { WizCalendar },
  setup() {
    const defaultValue = new Date("2021-01-01T00:00:00.000Z");
    const value = ref(new Date(defaultValue));

    const currentMonth = ref(new Date(defaultValue));
    return { value, currentMonth, args };
  },
  template: `
  <div>
    <p>{{value.getFullYear()}}年 {{value.getMonth()+1}}月 {{value.getDate()}}日</p>
    <WizCalendar v-bind="args" v-model="value" :currentMonth="currentMonth" @update:modelValue="args.input"/>
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
    <WizCalendar filledWeeks v-model="value" :currentMonth="currentMonth" @update:modelValue="args.input"/>
  </div>
</template>
      `,
    },
  },
};
