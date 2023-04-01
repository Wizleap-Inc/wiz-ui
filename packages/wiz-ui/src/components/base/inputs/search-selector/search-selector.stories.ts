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
  parameters: {
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
- setSearchValue
  - 検索する文字列を編集する関数です。searchValueの値を変更します。`,
      },
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
  (
    initValue: number[],
    open: boolean,
    initOptions: SelectBoxOption[],
    initSearchValue: string
  ): StoryFn =>
  (_, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { WizSearchSelector, WizHStack },
    setup() {
      const value = ref(initValue);
      const isOpen = ref(open);
      const searchValue = ref(initSearchValue);
      const options = ref<SelectBoxOption[]>(initOptions);
      const emits = {
        select: (n: number) => {
          value.value.push(n);
        },
        unselect: (n: number) => {
          value.value = value.value.filter((v) => v !== n);
        },
        toggle: (value: boolean) => {
          isOpen.value = value;
        },
        setSearchValue: (value: string) => {
          searchValue.value = value;
        },
        add: (label: string) => {
          options.value.push({
            label: label,
            value: options.value.length + 1,
          });
          value.value.push(options.value.length);
        },
      };
      return { value, options, isOpen, searchValue, emits };
    },
    template: `
    <WizHStack>
      <WizSearchSelector
        v-bind="$props"
        :value="value"
        :options="options"
        :searchValue="searchValue"
        :isOpen=isOpen
        @toggle="emits.toggle"
        @input="emits.select"
        @unselect="emits.unselect"
        @setSearchValue="emits.setSearchValue"
        @add="emits.add"
      />
    </WizHStack>
  `,
  });

export const Default = Template(
  [],
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});

export const Open = Template([], true, _getDummyOptions("test", 3), "").bind(
  {}
);

export const LongWordSelector = Template(
  [],
  true,
  _getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3),
  ""
).bind({});

export const Disabled = Template(
  [],
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});
Disabled.args = {
  disabled: true,
};

export const Selecting = Template(
  [1],
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});
Selecting.args = {
  multiSelectable: false,
};

export const MultiSelecting = Template(
  [1, 2, 3],
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});
MultiSelecting.args = {
  multiSelectable: true,
  width: "300px",
};

export const Addable = Template(
  [],
  true,
  _getDummyOptions("test", 3),
  "new option"
).bind({});
Addable.args = {
  addable: true,
};
