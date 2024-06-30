/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useCallback, useState } from "react";

import { WizSearchSelector } from "..";
import { SearchSelectorOption } from "../components/types";

const meta: Meta<typeof WizSearchSelector> = {
  title: "Base/Input/SearchSelector",
  component: WizSearchSelector,
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
};

export default meta;
type Story = StoryObj<typeof WizSearchSelector>;

const getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SearchSelectorOption[] = [];
  for (let i = 1; i <= count; i++) {
    options.push({ label: label + i, value: i, exLabel });
    options.push({ label: label + i * 10, value: i * 10, exLabel });
  }
  return options;
};

const getTemplate = (initialValues: number[] = []): Story => {
  return {
    render: (args) => {
      const [values, setValues] = useState<number[]>(initialValues);
      const [options, setOptions] = useState<SearchSelectorOption[]>(
        args.options
      );
      const onCreate = useCallback(
        (newOption: string) => {
          setOptions([
            ...options,
            { label: newOption, value: options.length + 1000 },
          ]);
        },
        [options]
      );
      return (
        <>
          <WizSearchSelector
            {...args}
            options={options}
            values={values}
            onChangeValues={(changed) => setValues(changed)}
            onCreate={onCreate}
          />
        </>
      );
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const group = canvas.getByRole("group");
      userEvent.click(group);
    },
  };
};

export const Default: Story = {
  ...getTemplate(),
  args: {
    options: [
      { label: "test1", value: 1 },
      { label: "test2", value: 2 },
      { label: "テスト3", value: 3 },
    ],
  },
};

export const LongWordSelector: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("testtesttesttesttesttesttesttesttesttest", 3),
  },
};

export const Disabled: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3),
    disabled: true,
  },
};

export const DisabledItems: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3).map((option, i) => ({
      ...option,
      disabled: i % 2 === 0,
    })),
  },
};

export const Selecting: Story = {
  ...getTemplate([1]),
  args: {
    options: getDummyOptions("test", 3),
  },
};

export const MultiSelecting: Story = {
  ...getTemplate([1, 2, 3]),
  args: {
    options: getDummyOptions("test", 3),
    multiSelectable: true,
    width: "300px",
  },
};

export const Addable: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3),
    addable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textbox = canvas.getByRole("textbox");
    userEvent.type(textbox, "new option");
  },
};

export const ExlabelWithoutShowExlabel: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3, "(9999)"),
    addable: true,
    showExLabel: false,
  },
};

export const Exlabel: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3, "(9999)"),
    addable: true,
    showExLabel: true,
  },
};

export const ExlabelWithLongLabel: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("testtesttesttesttest", 3, "(9999)"),
    addable: true,
    showExLabel: true,
  },
};

export const IsDirectionFixed: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3),
    isDirectionFixed: true,
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "6.5rem" }}>
        <div style={{ position: "absolute", bottom: "2rem", left: "1rem" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export const DropdownMaxHeight: Story = {
  ...getTemplate(),
  args: {
    options: getDummyOptions("test", 3),
    dropdownMaxHeight: "100px",
  },
};
