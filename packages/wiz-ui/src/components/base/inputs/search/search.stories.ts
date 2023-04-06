import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizSearchInput from "./search.vue";

export default {
  title: "Base/Input/Search",
  component: WizSearchInput,
  argTypes: {
    name: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    expand: {
      control: { type: "boolean" },
    },
    inputWidth: {
      control: { type: "text" },
    },
    popupWidth: {
      control: { type: "text" },
    },
    input: {
      action: "input",
    },
  },
};

const Template =
  (open: boolean): StoryFn =>
  (_, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { WizSearchInput },
    setup() {
      const values = ref<number[]>([]);
      const inputValues = (value: number[]) => {
        values.value = value;
      };
      const openPopup = ref(open);
      const toggle = (value: boolean) => {
        openPopup.value = value;
      };
      return { values, inputValues, openPopup, toggle };
    },
    template: `
    <div>
      <div>values:{{ values }}</div>
      <WizSearchInput
        v-bind="$props"
        :values="values"
        @input="inputValues"
        :options="options"
        name="search-input"
        :openPopup="openPopup"
        @toggle="toggle"
      />
    </div>
  `,
  });

export const Default = Template(false).bind({});
Default.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  options: [
    {
      label: "テスト会社1",
      value: 1,
      children: [
        {
          label: "保険商品1",
          value: 2,
          children: [],
        },
        {
          label: "保険商品2",
          value: 3,
          children: [],
        },
        {
          label: "保険商品3",
          value: 4,
          children: [],
        },
      ],
    },
    {
      label: "保険会社2",
      value: 5,
      children: [
        {
          label: "保険子会社1",
          value: 6,
          children: [
            {
              label: "保険商品7",
              value: 7,
              children: [],
            },
            {
              label: "保険商品8",
              value: 8,
              children: [],
            },
          ],
        },
        {
          label: "保険子会社2",
          value: 9,
          children: [
            {
              label: "保険商品10",
              value: 10,
              children: [],
            },
            {
              label: "保険商品11",
              value: 11,
              children: [],
            },
            {
              label: "保険商品12",
              value: 12,
              children: [],
            },
            {
              label: "保険商品13",
              value: 13,
              children: [],
            },
            {
              label: "保険商品14",
              value: 14,
              children: [],
            },
            {
              label: "保険商品15",
              value: 15,
              children: [],
            },
            {
              label: "保険商品16",
              value: 16,
              children: [],
            },
            {
              label: "保険商品17",
              value: 17,
              children: [],
            },
            {
              label: "保険商品18",
              value: 18,
              children: [],
            },
            {
              label: "保険商品19",
              value: 19,
              children: [],
            },
            {
              label: "保険商品20",
              value: 20,
              children: [],
            },
          ],
        },
      ],
    },
    {
      label: "テスト保険会社3",
      value: 21,
      children: [],
    },
  ],
};

export const Open = Template(true).bind({});
Open.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  options: [
    {
      label: "テスト会社1",
      value: 1,
      children: [
        {
          label: "保険商品1",
          value: 2,
          children: [],
        },
        {
          label: "保険商品2",
          value: 3,
          children: [],
        },
        {
          label: "保険商品3",
          value: 4,
          children: [],
        },
      ],
    },
    {
      label: "保険会社2",
      value: 5,
      children: [
        {
          label: "保険子会社1",
          value: 6,
          children: [
            {
              label: "保険商品7",
              value: 7,
              children: [],
            },
            {
              label: "保険商品8",
              value: 8,
              children: [],
            },
          ],
        },
        {
          label: "保険子会社2",
          value: 9,
          children: [
            {
              label: "保険商品10",
              value: 10,
              children: [],
            },
            {
              label: "保険商品11",
              value: 11,
              children: [],
            },
            {
              label: "保険商品12",
              value: 12,
              children: [],
            },
            {
              label: "保険商品13",
              value: 13,
              children: [],
            },
            {
              label: "保険商品14",
              value: 14,
              children: [],
            },
            {
              label: "保険商品15",
              value: 15,
              children: [],
            },
            {
              label: "保険商品16",
              value: 16,
              children: [],
            },
            {
              label: "保険商品17",
              value: 17,
              children: [],
            },
            {
              label: "保険商品18",
              value: 18,
              children: [],
            },
            {
              label: "保険商品19",
              value: 19,
              children: [],
            },
            {
              label: "保険商品20",
              value: 20,
              children: [],
            },
          ],
        },
      ],
    },
    {
      label: "テスト保険会社3",
      value: 21,
      children: [],
    },
  ],
};

export const Expand = Template(false).bind({});
Expand.args = {
  placeholder: "氏名・ID・電話番号で検索",
  expand: true,
  options: [
    {
      label: "親要素1",
      value: 1,
      children: [
        {
          label: "子要素2",
          value: 2,
          children: [],
        },
        {
          label: "子要素3",
          value: 3,
          children: [],
        },
      ],
    },
    {
      label: "親要素4",
      value: 4,
      children: [
        {
          label: "子要素5",
          value: 5,
          children: [
            {
              label: "孫要素6",
              value: 6,
              children: [],
            },
            {
              label: "孫要素7",
              value: 7,
              children: [],
            },
          ],
        },
        {
          label: "子要素8",
          value: 8,
          children: [],
        },
      ],
    },
    {
      label: "親要素9",
      value: 9,
      children: [],
    },
  ],
};

export const Disabled = Template(false).bind({});
Disabled.args = {
  placeholder: "氏名・ID・電話番号で検索",
  disabled: true,
  inputWidth: "15rem",
  options: [
    {
      label: "選択肢1",
      value: 1,
      children: [],
    },
    {
      label: "選択肢2",
      value: 2,
      children: [],
    },
    {
      label: "選択肢3",
      value: 3,
      children: [],
    },
  ],
};
