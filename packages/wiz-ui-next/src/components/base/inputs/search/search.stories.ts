import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

import WizSearchInput from "./search.vue";

export default {
  title: "Base/Input/Search",
  component: WizSearchInput,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
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
    input: {
      action: "input",
    },
  },
} as Meta<typeof WizSearchInput>;

const Template: StoryFn<typeof WizSearchInput> = (args) => ({
  components: { WizSearchInput },
  setup() {
    const value = ref("");
    const options = [
      {
        label: "保険会社1",
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
        ],
      },
      {
        label: "保険会社3",
        value: 9,
        children: [],
      },
    ];

    return { value, args, options };
  },
  template: `<WizSearchInput v-bind="args" v-model="value" :options="options" name="search-input"/>`,
});

export const Default = Template.bind({});
Default.args = {
  placeholder: "氏名・ID・電話番号で検索",
  width: "240px",
};

export const Expand = Template.bind({});
Expand.args = {
  placeholder: "氏名・ID・電話番号で検索",
  expand: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "氏名・ID・電話番号で検索",
  disabled: true,
};
