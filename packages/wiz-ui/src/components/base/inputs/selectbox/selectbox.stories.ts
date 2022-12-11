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

export const ManyOptions = Template.bind({});
ManyOptions.args = {
  options: [
    { label: "test1", value: "1" },
    { label: "test2", value: "2" },
    { label: "test3", value: "3" },
    { label: "test4", value: "4" },
    { label: "test5", value: "5" },
    { label: "test6", value: "6" },
    { label: "test7", value: "7" },
    { label: "test8", value: "8" },
    { label: "test9", value: "9" },
    { label: "test10", value: "10" },
    { label: "test11", value: "11" },
    { label: "test12", value: "12" },
    { label: "test13", value: "13" },
    { label: "test14", value: "14" },
    { label: "test15", value: "15" },
  ],
};
