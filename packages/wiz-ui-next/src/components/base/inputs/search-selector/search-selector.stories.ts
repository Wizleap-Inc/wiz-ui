import { StoryFn, Meta } from "@storybook/vue3";
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
    const initValue = 0;
    const currentValue = ref(initValue);
    const options = ref<SelectBoxOption[]>(_getDummyOptions("test", 3));
    const clear = () => {
      currentValue.value = initValue;
    };
    const selectNewLabel = (label: string) => {
      options.value.push({
        label: label,
        value: options.value.length + 1,
      });
      currentValue.value = options.value.length;
    };
    return { currentValue, args, options, selectNewLabel, clear };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args" v-model="currentValue"
        :options="options" 
        @clear="clear" @selectNewLabel="selectNewLabel"
      />
    </WizHStack>
  `,
});
