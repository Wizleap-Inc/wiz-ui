import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizHStack } from "@/components";

import { SelectBoxOption } from "./types";

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
    const value = ref(0);
    return { value };
  },
  template: `
    <WizHStack>
      <WizSelectBox v-bind="$props"  v-model="value" @input="input"/>
    </WizHStack>
  `,
});

const _getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SelectBoxOption[] = [];
  for (let i = 1; i <= count; i++) {
    options.push({ label: label + i, value: i, exLabel });
  }
  return options;
};

export const Default = Template.bind({});
Default.args = {
  options: _getDummyOptions("test", 3),
};

export const Open = Template.bind({});
Open.args = {
  options: _getDummyOptions("test", 3),
  isOpen: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: [],
  disabled: true,
};

export const LongLabel = Template.bind({});
LongLabel.args = {
  options: _getDummyOptions("ThisIsTooLongLabelThisIsTooLongLabel", 3),
  isOpen: true,
};

export const Expand = Template.bind({});
Expand.args = {
  options: _getDummyOptions("test", 1),
  expand: true,
  isOpen: true,
};

export const ManyOptions = Template.bind({});
ManyOptions.args = {
  options: _getDummyOptions("test", 15),
  isOpen: true,
};

export const ExtraLabel = Template.bind({});
ExtraLabel.args = {
  options: _getDummyOptions("test", 3, "(10)"),
  isOpen: true,
};
