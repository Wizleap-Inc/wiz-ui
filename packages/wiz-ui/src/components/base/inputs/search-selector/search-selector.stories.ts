import { Meta, StoryFn } from "@storybook/vue";
import { ref } from "vue";

import { WizHStack } from "@/components";

import { SelectBoxOption } from "./types";

import { WizSearchSelector } from ".";

export default {
  title: "Base/Input/SearchSelector",
  component: WizSearchSelector,
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
    multiSelectable: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizSearchSelector>;

const _getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SelectBoxOption[] = [];
  for (let i = 1; i <= count; i++) {
    options.push({ label: label + i, value: i, exLabel });
    options.push({ label: label + i * 10, value: i * 10, exLabel });
  }
  return options;
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [];
    const value = ref(initValue);
    const unselect = (n: number) => {
      value.value = value.value.filter((v) => v !== n);
    };
    const select = (n: number) => {
      value.value.push(n);
    };
    return { value, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector
        v-bind="$props"
        :value="value"
        @input="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
Default.args = {
  options: _getDummyOptions("test", 3),
};

export const Selecting: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [1];
    const value = ref(initValue);
    const unselect = (n: number) => {
      value.value = value.value.filter((v) => v !== n);
    };
    const select = (n: number) => {
      value.value.push(n);
    };
    return { value, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="$props"
        :value="value"
        @input="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
Selecting.args = {
  multiSelectable: false,
  options: _getDummyOptions("test", 3),
};

export const MultiSelecting: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [1, 2, 3];
    const value = ref(initValue);
    const unselect = (n: number) => {
      value.value = value.value.filter((v) => v !== n);
    };
    const select = (n: number) => {
      value.value.push(n);
    };
    return { value, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="$props"
        :value="value"
        @input="select"
        width="300px"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
MultiSelecting.args = {
  multiSelectable: true,
  options: _getDummyOptions("test", 3),
};

export const Addable: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [];
    const value = ref(initValue);
    const options = ref<SelectBoxOption[]>(_getDummyOptions("test", 3));
    const unselect = (n: number) => {
      value.value = value.value.filter((v) => v !== n);
    };
    const selectNewLabel = (label: string) => {
      options.value.push({
        label: label,
        value: options.value.length + 1,
      });
      value.value.push(options.value.length);
    };
    const select = (n: number) => {
      value.value.push(n);
    };
    return { value, options, selectNewLabel, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="$props"
        :value="value"
        :options="options"
        @input="select"
        @unselect="unselect"
        @add="selectNewLabel"
      />
    </WizHStack>
  `,
});
Addable.args = {
  addable: true,
};
