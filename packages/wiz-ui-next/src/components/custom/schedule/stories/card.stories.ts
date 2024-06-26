import { StoryFn } from "@storybook/vue3";

import { WizScheduleCard } from "..";

export default {
  title: "Custom/Schedule/Card",
  component: WizScheduleCard,
  argTypes: {
    text: {
      control: { type: "text" },
    },
    gridRow: {
      control: { type: "text" },
    },
    gridColumn: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
    },
    click: {
      action: "click",
    },
  },
};

const Template: StoryFn<typeof WizScheduleCard> = (args) => ({
  setup: () => ({ args }),
  components: { WizScheduleCard },
  template: `
    <div style="display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: repeat(24, 6px); width: 30rem; position: relative; background: #eee;">
      <WizScheduleCard v-bind="args" @click="click" />
    </div>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  text: "Hello World",
  gridRow: "11 / 14",
  gridColumn: "3 / 6",
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Hello World",
  gridRow: "11 / 14",
  gridColumn: "3 / 6",
  variant: "secondary",
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  text: "Hello World",
  gridRow: "11 / 14",
  gridColumn: "3 / 6",
  variant: "tertiary",
};
