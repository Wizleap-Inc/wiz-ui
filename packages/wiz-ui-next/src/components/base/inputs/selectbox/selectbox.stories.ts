import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import { WizHStack } from "@/components";

import { SelectBoxOption } from "./types";

import { WizSelectBox } from ".";

export default {
  title: "Base/Input/SelectBox",
  component: WizSelectBox,
  argTypes: {
    modelValue: {
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
    showExLabel: {
      control: { type: "boolean" },
    },
    isDirectionFixed: {
      control: { type: "boolean" },
    },
    dropdownMaxHeight: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizSelectBox>;

const Template: StoryFn<typeof WizSelectBox> = (args) => ({
  components: { WizSelectBox, WizHStack },
  setup() {
    const modelValue = ref(args.modelValue);
    return { modelValue, args };
  },
  template: `
    <WizHStack>
      <WizSelectBox v-bind="args" v-model="value" @update:modelValue="args.input"/>
    </WizHStack>
  `,
});

const _getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SelectBoxOption<number>[] = [];
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

export const DisabledItems = Template.bind({});
DisabledItems.args = {
  options: _getDummyOptions("test", 6).map((option, index) => ({
    ...option,
    disabled: index % 2 === 0,
  })),
  isOpen: true,
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

export const WithExtraLabel = Template.bind({});
WithExtraLabel.args = {
  options: _getDummyOptions("test", 3, "(10)"),
  isOpen: true,
  modelValue: 1,
};

export const ExtraLabel = Template.bind({});
ExtraLabel.args = {
  options: _getDummyOptions("test", 3, "(10)"),
  isOpen: true,
  showExLabel: true,
  modelValue: 1,
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  options: _getDummyOptions("test", 3),
  isOpen: true,
  isDirectionFixed: true,
};

export const DropdownMaxHeight = Template.bind({});
DropdownMaxHeight.args = {
  options: _getDummyOptions("test", 3),
  dropdownMaxHeight: "75px",
};
