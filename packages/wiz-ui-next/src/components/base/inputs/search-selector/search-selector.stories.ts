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

const Template =
  (open: boolean): StoryFn<typeof WizSearchSelector> =>
  (args) => ({
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
      const isOpen = ref(open);
      const toggle = (value: boolean) => {
        isOpen.value = value;
      };
      return { currentValue, args, unselect, select, isOpen, toggle };
    },
    template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :isOpen=isOpen
        @toggle="toggle"
        @update:modelValue="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
  });

export const Default = Template(false).bind({});
Default.args = {
  options: _getDummyOptions("test", 3),
};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizSearchSelector
WizSearchSelectorは、検索・新規追加可能なセレクタコンポーネントです。
v-modelには選択中のアイテムを渡します。

このコンポーネントを使用する場合には、以下のEmitを登録してください。
- update:modelValue
  - 選択したアイテムを追加する関数です。引数は追加するアイテムのvalue(id)です。
- unselect
  - 選択中のアイテムを解除する関数です。引数は解除するアイテムのvalue(id)です。
- add
  - オプションを追加するための関数です。addable=trueのとき必須となります。引数は追加するアイテムの文字列です。
- toggle
  - popupの開閉制御を行う関数です。isOpenのtrue/falseを切り替えます。
`,
    },
  },
};
export const Open = Template(true).bind({});
Open.args = {
  options: _getDummyOptions("test", 3),
};

export const LongWordSelector = Template(true).bind({});
LongWordSelector.args = {
  options: _getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3),
};

export const Disabled: StoryFn<typeof WizSearchSelector> = (args) => ({
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { currentValue, args, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :isOpen=isOpen
        @toggle="toggle"
        @update:modelValue="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
Disabled.args = {
  disabled: true,
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { currentValue, args, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :isOpen=isOpen
        @toggle="toggle"
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { currentValue, args, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :isOpen=isOpen
        @toggle="toggle"
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return {
      currentValue,
      args,
      options,
      selectNewLabel,
      unselect,
      select,
      isOpen,
      toggle,
    };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :options="options"
        :isOpen=isOpen
        @toggle="toggle"
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
