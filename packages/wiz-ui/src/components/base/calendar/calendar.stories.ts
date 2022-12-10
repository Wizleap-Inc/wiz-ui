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
  <div >
    <WizCalendar v-bind="$props"  v-model="value"/>
  </div>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const filledWeeks = Template.bind({});
filledWeeks.args = {
  filledWeeks: true,
};
