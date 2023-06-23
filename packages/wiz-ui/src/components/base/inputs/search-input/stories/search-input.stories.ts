import { StoryFn } from "@storybook/vue";
import { ref } from "vue";

import WizSearchInput from "../search-input.vue";

import {
  debugOption,
  defaultOption,
  expandOption,
  longLabelOption,
  openOption,
  simpleOption,
} from "./options";

export default {
  title: "Base/Input/SearchInput",
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
    isDirectionFixed: {
      control: {
        type: "boolean",
      },
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

export const Default = Template(true).bind({});
Default.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  options: defaultOption,
};

export const Open = Template(true).bind({});
Open.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  options: openOption,
};

export const LongLabel = Template(true).bind({});
LongLabel.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  popupWidth: "10rem",
  options: longLabelOption,
};

export const Expand = Template(true).bind({});
Expand.args = {
  placeholder: "氏名・ID・電話番号で検索",
  expand: true,
  options: expandOption,
};

export const Disabled = Template(true).bind({});
Disabled.args = {
  placeholder: "氏名・ID・電話番号で検索",
  disabled: true,
  inputWidth: "15rem",
  options: simpleOption,
};

export const IsDirectionFixed = Template(true).bind({});
IsDirectionFixed.args = {
  placeholder: "氏名・ID・電話番号で検索",
  isDirectionFixed: true,
  inputWidth: "15rem",
  options: simpleOption,
};

export const Debug = Template(true).bind({});
Debug.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  popupWidth: "25rem",
  options: debugOption,
};
