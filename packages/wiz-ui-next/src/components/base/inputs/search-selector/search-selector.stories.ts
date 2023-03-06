import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import { WizHStack } from "@/components";

import { SelectBoxOption } from "./types";

import { WizSearchSelector } from ".";

export default {
  title: "Base/Input/SearchSelector",
  component: WizSearchSelector,
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

export const Default: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [];
    const currentValue = ref(initValue);
    const unselect = (n: number) => {
      currentValue.value = currentValue.value.filter((v) => v !== n);
    };
    const select = (n: number) => {
      currentValue.value.push(n);
    };
    return { currentValue, args, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        @update:modelValue="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
Default.args = {
  options: _getDummyOptions("test", 3),
};

export const Selecting: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [1];
    const currentValue = ref(initValue);
    const unselect = (n: number) => {
      currentValue.value = currentValue.value.filter((v) => v !== n);
    };
    const select = (n: number) => {
      currentValue.value.push(n);
    };
    return { currentValue, args, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        @update:modelValue="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
Selecting.args = {
  options: _getDummyOptions("test", 3),
};

export const MultiSelecting: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [1, 2, 3];
    const currentValue = ref(initValue);
    const unselect = (n: number) => {
      currentValue.value = currentValue.value.filter((v) => v !== n);
    };
    const select = (n: number) => {
      currentValue.value.push(n);
    };
    return { currentValue, args, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        @update:modelValue="select"
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

export const Addable: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [];
    const currentValue = ref(initValue);
    const options = ref<SelectBoxOption[]>(_getDummyOptions("test", 3));
    const unselect = (n: number) => {
      currentValue.value = currentValue.value.filter((v) => v !== n);
    };
    const selectNewLabel = (label: string) => {
      options.value.push({
        label: label,
        value: options.value.length + 1,
      });
      currentValue.value.push(options.value.length);
    };
    const select = (n: number) => {
      currentValue.value.push(n);
    };
    return { currentValue, args, options, selectNewLabel, unselect, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :options="options"
        @update:modelValue="select"
        @unselect="unselect"
        @add="selectNewLabel"
      />
    </WizHStack>
  `,
});
Addable.args = {
  addable: true,
};
