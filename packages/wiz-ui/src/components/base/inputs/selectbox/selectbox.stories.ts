import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizHStack } from "@/components";

import { WizSelectBox } from ".";

export default {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    input: {
      action: "input",
    },
    expand: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSelectBox, WizHStack },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
    <WizHStack>
      <WizSelectBox v-bind="$props"  v-model="value" @input="input"/>
    </WizHStack>
  `,
});

export const Default = Template.bind({});
Default.args = {
  options: [
    { label: "test1", value: "1" },
    { label: "test2", value: "2" },
    { label: "test3", value: "3" },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: [],
  disabled: true,
};

const MutliTemplate: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSelectBox, WizHStack },
  setup() {
    const value = ref("");
    return { value };
  },
  template: `
    <WizHStack>
      <WizSelectBox v-bind="$props"  v-model="value" @input="input"/>
      <WizSelectBox v-bind="$props"  v-model="value" @input="input"/>
    </WizHStack>
  `,
});

export const LongLabel = MutliTemplate.bind({});
LongLabel.args = {
  options: [
    {
      label: "ThisIsALongLabel!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1",
      value: "1",
    },
    { label: "test2", value: "2" },
    { label: "test3", value: "3" },
  ],
};

export const Expand = Template.bind({});
Expand.args = {
  options: [{ label: "test1", value: "1" }],
  expand: true,
};
