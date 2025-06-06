import { Meta, StoryFn } from "@storybook/vue3";
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

    isDirectionFixed: {
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
    options.push({ label: label + i, value: i, exLabel: exLabel });
    options.push({ label: label + i * 10, value: i * 10, exLabel: exLabel });
  }
  return options;
};

const Template =
  (
    open: boolean,
    initOptions: SelectBoxOption[],
    initSearchValue: string
  ): StoryFn<typeof WizSearchSelector> =>
  (args) => ({
    components: { WizSearchSelector, WizHStack },
    setup() {
      const currentValue = ref(args.modelValue || []);
      const isOpen = ref(open);
      const searchValue = ref(initSearchValue);
      const options = ref<SelectBoxOption[]>(initOptions);
      const emits = {
        select: (n: number) => {
          currentValue.value.push(n);
        },
        unselect: (n: number) => {
          currentValue.value = currentValue.value.filter((v) => v !== n);
        },
        toggle: (value: boolean) => {
          isOpen.value = value;
        },
        setSearchValue: (text: string) => {
          searchValue.value = text;
        },
        add: (label: string) => {
          options.value.push({
            label: label,
            value: options.value.length + 1,
          });
          currentValue.value.push(options.value.length);
        },
      };
      return { args, currentValue, options, searchValue, isOpen, emits };
    },
    template: `
    <WizHStack>
      <WizSearchSelector 
        v-bind="args"
        :modelValue="currentValue"
        :options="options"
        :isOpen="isOpen"
        :searchValue="searchValue"
        @toggle="emits.toggle"
        @update:modelValue="emits.select"
        @unselect="emits.unselect"
        @setSearchValue="emits.setSearchValue"
        @add="emits.add"
      />
    </WizHStack>
  `,
  });

const code = (
  initValue: number[],
  open: boolean,
  initOptions: SelectBoxOption[],
  initSearchValue: string,
  opts?: {
    disabled?: boolean;
    addable?: boolean;
    multiSelectable?: boolean;
    isDirectionFixed?: boolean;
  }
) => `
  <script setup lang="ts">
  import { ref } from "vue";
  import { WizHStack } from "@/components"; 
  import { WizSearchSelector } from ".";
  import { SelectBoxOption } from "./types";
  
  const value = ref(${initValue});
  const isOpen = ref(${open});
  const searchValue = ref(${initSearchValue});
  const options = ref<SelectBoxOption[]>([]);
  
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
  
  </script>
  <template>
    <WizHStack>
      <WizSearchSelector
        :modelValue="value"
        :options="options"
        :searchValue="searchValue"
        :isOpen=isOpen
        :disabled=${opts?.disabled ?? "false"}
        :multiSelectable=${opts?.multiSelectable ?? "false"}
        :addable=${opts?.addable ?? "false"}
        @toggle="emits.toggle"
        @update:modelValue="emits.select"
        @unselect="emits.unselect"
        @setSearchValue="emits.setSearchValue"
        @add="emits.add"
      />
    </WizHStack>
  </template>
  `;

export const Default = Template(
  false,
  [
    { label: "test1", value: 1 },
    { label: "test2", value: 2 },
    { label: "テスト3", value: 3 },
  ],
  ""
).bind({});
Default.parameters = {
  docs: {
    source: {
      code: code([], false, _getDummyOptions("test", 3), ""),
    },
  },
};

export const Open = Template(true, _getDummyOptions("test", 3), "").bind({});
Open.parameters = {
  docs: {
    source: {
      code: code([], true, _getDummyOptions("test", 3), ""),
    },
  },
};

export const LongWordSelector = Template(
  true,
  _getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3),
  ""
).bind({});
LongWordSelector.parameters = {
  docs: {
    source: {
      code: code(
        [],
        true,
        _getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3),
        ""
      ),
    },
  },
};

export const Disabled = Template(false, _getDummyOptions("test", 3), "").bind(
  {}
);
Disabled.args = {
  disabled: true,
};
Disabled.parameters = {
  docs: {
    source: {
      code: code([], false, _getDummyOptions("test", 3), "", {
        disabled: true,
      }),
    },
  },
};

export const DisabledWithValues = Template(
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});
DisabledWithValues.args = {
  modelValue: [1, 2],
  disabled: true,
};
DisabledWithValues.parameters = {
  docs: {
    source: {
      code: code([], false, _getDummyOptions("test", 3), "", {
        disabled: true,
      }),
    },
  },
};

export const DisabledItems = Template(
  true,
  _getDummyOptions("test", 3).map((option, i) => ({
    ...option,
    disabled: i % 2 === 0,
  })),
  ""
).bind({});
DisabledItems.parameters = {
  docs: {
    source: {
      code: code(
        [],
        false,
        _getDummyOptions("test", 3).map((option, i) => ({
          ...option,
          disabled: i % 2 === 0,
        })),
        "",
        {}
      ),
    },
  },
};

export const Selecting = Template(false, _getDummyOptions("test", 3), "").bind(
  {}
);
Selecting.args = {
  modelValue: [1],
  multiSelectable: false,
};
Selecting.parameters = {
  docs: {
    source: {
      code: code([1], false, _getDummyOptions("test", 3), "", {
        multiSelectable: false,
      }),
    },
  },
};

export const MultiSelecting = Template(
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});
MultiSelecting.args = {
  modelValue: [1, 2, 3],
  multiSelectable: true,
  width: "300px",
};
MultiSelecting.parameters = {
  docs: {
    source: {
      code: code([1, 2, 3], true, _getDummyOptions("test", 3), "", {
        multiSelectable: true,
      }),
    },
  },
};

export const Addable = Template(
  true,
  _getDummyOptions("test", 3),
  "new option"
).bind({});
Addable.args = {
  addable: true,
};
Addable.parameters = {
  docs: {
    source: {
      code: code([1, 2, 3], true, _getDummyOptions("test", 3), "", {
        addable: true,
      }),
    },
  },
};

export const ExlabelWithoutShowExlabel = Template(
  true,
  _getDummyOptions("test", 3, "(10)"),
  ""
).bind({});
ExlabelWithoutShowExlabel.args = {
  addable: true,
  showExLabel: false,
};
ExlabelWithoutShowExlabel.parameters = {
  docs: {
    source: {
      code: code([1, 2, 3], true, _getDummyOptions("test", 3, "(10)"), "", {
        addable: true,
      }),
    },
  },
};

export const Exlabel = Template(
  true,
  _getDummyOptions("test", 3, "(10)"),
  ""
).bind({});
Exlabel.args = {
  addable: true,
  showExLabel: true,
};
Exlabel.parameters = {
  docs: {
    source: {
      code: code([1, 2, 3], true, _getDummyOptions("test", 3, "(10)"), "", {
        addable: true,
      }),
    },
  },
};

export const ExlabelWithLongLabel = Template(
  true,
  _getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3, "(10)"),
  ""
).bind({});
ExlabelWithLongLabel.args = {
  addable: true,
  showExLabel: true,
};
ExlabelWithLongLabel.parameters = {
  docs: {
    source: {
      code: code(
        [1, 2, 3],
        true,
        _getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3, "(10)"),
        "",
        {
          addable: true,
        }
      ),
    },
  },
};

export const IsDirectionFixed = Template(
  true,
  _getDummyOptions("test", 3),
  ""
).bind({});
IsDirectionFixed.args = {
  isDirectionFixed: true,
};
IsDirectionFixed.parameters = {
  docs: {
    source: {
      code: code([1, 2, 3], true, _getDummyOptions("test", 3), "", {
        isDirectionFixed: true,
      }),
    },
  },
};

export const DropdownMaxHeight = Template(
  false,
  _getDummyOptions("test", 3),
  ""
).bind({});

DropdownMaxHeight.args = {
  dropdownMaxHeight: "100px",
};
