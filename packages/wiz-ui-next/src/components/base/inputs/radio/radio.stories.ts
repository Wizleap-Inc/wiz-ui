import { StoryFn, Meta } from "@storybook/vue3";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import { WizRadio } from ".";

export default {
  title: "Base/Input/Radio",
  component: WizRadio,
  argTypes: {
    options: {
      control: { type: "object" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    direction: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    input: {
      action: "input",
    },
  },
} as Meta<typeof WizRadio>;

const Template: StoryFn<typeof WizRadio> = (args) => ({
  components: { WizRadio },
  setup() {
    const value = ref(0);
    return { value, args };
  },
  template: `
  <div>
    <p>入力値：{{ value }}</p>
    <WizRadio v-bind="args" v-model="value" @update:modelValue="args.input" />
  </div>
`,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
};

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  disabled: true,
};

export const SpotDisabled = Template.bind({});
SpotDisabled.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2, disabled: true },
    { label: "test3", value: 3 },
    { label: "test4", value: 4, disabled: true },
  ],
};

export const Vertical = Template.bind({});
Vertical.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  direction: "vertical",
};

export const Gap = Template.bind({});
Gap.args = {
  options: [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "test3", value: 3 },
    { label: "test4", value: 4 },
  ],
  gap: "sm",
};
