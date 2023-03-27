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

const Template =
  (open: boolean): StoryFn =>
  (_, { argTypes }) => ({
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
      const isOpen = ref(open);
      const toggle = (value: boolean) => {
        isOpen.value = value;
      };
      return { value, unselect, select, isOpen, toggle };
    },
    template: `
    <WizHStack>
      <WizSearchSelector
        v-bind="$props"
        :value="value"
        :isOpen=isOpen
        @toggle="toggle"
        @input="select"
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

export const Disabled: StoryFn = (_, { argTypes }) => ({
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { value, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector
        v-bind="$props"
        :value="value"
        :isOpen=isOpen
        @toggle="toggle"
        @input="select"
        @unselect="unselect"
      />
    </WizHStack>
  `,
});
Disabled.args = {
  disabled: true,
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { value, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="$props"
        :value="value"
        :isOpen=isOpen
        @toggle="toggle"
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { value, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="$props"
        :value="value"
        :isOpen=isOpen
        @toggle="toggle"
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
    const isOpen = ref(false);
    const toggle = (value: boolean) => {
      isOpen.value = value;
    };
    return { value, options, selectNewLabel, unselect, select, isOpen, toggle };
  },
  template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="$props"
        :value="value"
        :options="options"
        :isOpen=isOpen
        @toggle="toggle"
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
