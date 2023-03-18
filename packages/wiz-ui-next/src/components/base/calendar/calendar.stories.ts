import { StoryFn, Meta } from "@storybook/vue3";

import WizCalendar from "./calendar.vue";

export default {
  title: "Base/Calendar",
  component: WizCalendar,
  argTypes: {
    currentMonth: {
      control: {
        type: "date",
      },
    },
    activeDates: {
      control: {
        type: "array",
      },
    },
    filledWeeks: {
      control: {
        type: "boolean",
      },
    },
    onClick: {
      action: "click",
    },
  },
} as Meta<typeof WizCalendar>;

const Template: StoryFn<typeof WizCalendar> = (args) => ({
  components: { WizCalendar },
  setup: () => ({ args }),
  template: `
  <div>
    <p>表示している月: {{ args.currentMonth.getFullYear() }}年{{ args.currentMonth.getMonth() + 1 }}月</p>
    <WizCalendar v-bind="args" @click="args.onClick"/>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  currentMonth: new Date("2023-03"),
};
Default.parameters = {
  docs: {
    description: {
      component: `
### カレンダー
カレンダーを表示します。 \`activeDates\` には \`date\` と \`state\` を持つオブジェクトの配列を渡します。 \`state\` には \`primary\` と \`secondary\` を指定できます。
差分を固定するため、currentMonthはUnRequiredですが初期値を設定しています。
      `,
    },
    source: {
      code: `
<template>
  <div>
    <WizCalendar />
  </div>
</template>
      `,
    },
  },
};

export const CurrentMonth = Template.bind({});
CurrentMonth.args = {
  currentMonth: new Date("2021-01"),
};
CurrentMonth.parameters = {
  docs: {
    description: {
      story: "`currentMonth` を指定すると、その月のカレンダーを表示します。",
    },
    source: {
      code: `
<template>
  <div>
    <WizCalendar :currentMonth="new Date('2021-01')" />
  </div>
</template>
      `,
    },
  },
};

export const ActiveDates = Template.bind({});
ActiveDates.args = {
  currentMonth: new Date("2021-01"),
  activeDates: [
    {
      date: new Date("2021-01-11"),
      state: "primary",
    },
    {
      date: new Date("2021-01-12"),
      state: "secondary",
    },
    {
      date: new Date("2021-01-13"),
      state: "secondary",
    },
    {
      date: new Date("2021-01-14"),
      state: "secondary",
    },
    {
      date: new Date("2021-01-15"),
      state: "primary",
    },
  ],
};
ActiveDates.parameters = {
  docs: {
    description: {
      story:
        "`activeDates` には `date` と `state` を持つオブジェクトの配列を渡します。 `state` には `primary` と `secondary` を指定できます。",
    },
    source: {
      code: `
<script setup lang="ts">
import { ref } from "vue";
import WizCalendar from "./calendar.vue";

const activeDates = ref([
  {
    date: new Date("2021-01-11"),
    state: "primary",
  },
  {
    date: new Date("2021-01-12"),
    state: "secondary",
  },
  {
    date: new Date("2021-01-13"),
    state: "secondary",
  },
  {
    date: new Date("2021-01-14"),
    state: "secondary",
  },
  {
    date: new Date("2021-01-15"),
    state: "primary",
  },
]);
</script>

<template>
  <div>
    <WizCalendar :activeDates="activeDates" />
  </div>
</template>
      `,
    },
  },
};

export const FilledWeeks = Template.bind({});
FilledWeeks.args = {
  currentMonth: new Date("2023-03"),
  filledWeeks: true,
};

FilledWeeks.parameters = {
  docs: {
    description: {
      story:
        "`filledWeeks` を `true` にすると、月の最初の日と最後の日の前後に空白の日付を表示します。",
    },
    source: {
      code: `
<template>
  <div>
    <WizCalendar filledWeeks />
  </div>
</template>
      `,
    },
  },
};
