import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import { WizIPublic } from "@/components/icons";

import WizSearchInput from "../search-input.vue";

import {
  debugOption,
  defaultOption,
  expandOption,
  longLabelOption,
  openOption,
  simpleOption,
  emptyMessageOptions,
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
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "object" },
    },
  },
} as Meta<typeof WizSearchInput>;

const Template =
  (open: boolean): StoryFn<typeof WizSearchInput> =>
  (args) => ({
    components: { WizSearchInput },
    setup() {
      const values = ref<number[]>([]);
      const openPopup = ref(open);
      const toggle = (value: boolean) => {
        openPopup.value = value;
      };
      return { values, args, openPopup, toggle };
    },
    template: `
  <div>
    <div>values:{{ values }}</div>
    <WizSearchInput
      v-bind="args"
      v-model="values"
      name="search-input"
      :openPopup="openPopup"
      @toggle="toggle"
    />
  </div>`,
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

export const Icon = Template(true).bind({});
Icon.args = {
  placeholder: "氏名・ID・電話番号で検索",
  isDirectionFixed: true,
  inputWidth: "15rem",
  options: simpleOption,
  icon: WizIPublic,
};

export const Debug = Template(true).bind({});
Debug.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  popupWidth: "25rem",
  options: debugOption,
};

export const EmptyMessage = Template(true).bind({});
EmptyMessage.args = {
  placeholder: "氏名・ID・電話番号で検索",
  inputWidth: "15rem",
  popupWidth: "25rem",
  options: emptyMessageOptions,
};
