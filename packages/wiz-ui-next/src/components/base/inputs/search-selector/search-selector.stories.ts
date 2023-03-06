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

export const Template: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [];
    const currentValue = ref(initValue);
    const options = ref<SelectBoxOption[]>(_getDummyOptions("test", 3));
    const clear = (n: number) => {
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
    return { currentValue, args, options, selectNewLabel, clear, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args" :modelValue="currentValue" @update:modelValue="select"   
        :options="options" 
        @clear="clear" @selectNewLabel="selectNewLabel"
      />
    </WizHStack>
  `,
});

export const Selecting: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [1];
    const currentValue = ref(initValue);
    const options = ref<SelectBoxOption[]>(_getDummyOptions("test", 3));
    const clear = (n: number) => {
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
    return { currentValue, args, options, selectNewLabel, clear, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args" :modelValue="currentValue" @update:modelValue="select"   
        :options="options" 
        @clear="clear" @selectNewLabel="selectNewLabel"
      />
    </WizHStack>
  `,
});

export const MultiSelecting: StoryFn<typeof WizSearchSelector> = (args) => ({
  components: { WizSearchSelector, WizHStack },
  setup() {
    const initValue: number[] = [1, 2, 3];
    const currentValue = ref(initValue);
    const options = ref<SelectBoxOption[]>(_getDummyOptions("test", 3));
    const clear = (n: number) => {
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
    return { currentValue, args, options, selectNewLabel, clear, select };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args" :modelValue="currentValue" @update:modelValue="select"   
        :options="options"  width="300px"
        @clear="clear" @selectNewLabel="selectNewLabel"
      />
    </WizHStack>
  `,
});

MultiSelecting.args = {
  multiSelectable: true,
};
