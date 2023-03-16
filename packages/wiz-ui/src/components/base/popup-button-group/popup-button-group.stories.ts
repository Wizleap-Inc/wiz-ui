import { Meta, StoryFn } from "@storybook/vue";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import {
  WizPopupContainer,
  WizPopup,
  WizIOpenInNew,
  WizIAddCircle,
  WizPopupButtonGroup,
} from "@/components";

import { SelectBoxOption, ButtonGroupItem } from "./types";

export default {
  title: "Base/PopupButtonGroup",
  component: WizPopupButtonGroup,
  argTypes: {
    width: {
      control: { type: "string" },
      default: "10rem",
    },
    p: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    expand: {
      control: { type: "boolean" },
    },
    groupDivider: {
      control: { type: "boolean" },
    },
    buttonDivider: {
      control: { type: "boolean" },
    },
    click: {
      action: "click",
    },
  },
} as Meta<typeof WizPopupButtonGroup>;

const _getDummyOptions = (
  count: number,
  click: (n: number) => void,
  exLabel?: string
) => {
  const options: SelectBoxOption[] = [];
  const createIcon = (i: number) => {
    if (i % 3 === 0) {
      return undefined;
    }
    return i % 3 === 1
      ? { icon: WizIOpenInNew, iconDefaultColor: "gray.500" as const }
      : {
          icon: WizIAddCircle,
          iconDefaultColor: "green.800" as const,
        };
  };
  Array.from({ length: count }).forEach((_, i) => {
    const n = i + 1;
    const icon = createIcon(n);
    options.push({
      label: (n % 2 === 0 ? "test" : " テスト") + n,
      value: n,
      exLabel: exLabel,
      icon: icon?.icon,
      iconDefaultColor: icon?.iconDefaultColor,
      onClick: () => click(n),
    });
  });
  return options.map(
    (opt) => ({ kind: "button", option: opt } as ButtonGroupItem)
  );
};

const createButton = (
  n: number,
  click: (n: number) => void
): ButtonGroupItem => ({
  kind: "button",
  option: { label: `item ${n}`, value: n, onClick: () => click(n) },
});

const _getDummyItems = (click: (arg: number) => void): ButtonGroupItem[] => [
  {
    kind: "group",
    title: "タイトル1",
    groupDivider: true,
    buttonDivider: true,
    items: [
      ..._getDummyOptions(3, click),
      {
        kind: "group",
        title: "タイトル2",
        items: [createButton(4, click), createButton(5, click)],
      },
    ],
  },
  createButton(6, click),
  createButton(7, click),
];

const Template: StoryFn<typeof WizPopupButtonGroup> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopupButtonGroup },
  setup() {
    const createOptions = _getDummyItems;
    return { createOptions };
  },
  template: ` 
  <WizPopupButtonGroup v-bind="$props" :options="createOptions(click)" />
  `,
});
export const Default = Template.bind({});

Default.args = {};

export const Popup: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopupButtonGroup, WizPopupContainer, WizPopup },
  setup() {
    const isOpen = ref(true);
    const buttonClick = () => {
      isOpen.value = !isOpen.value;
    };
    const createOptions = _getDummyItems;
    return { isOpen, buttonClick, createOptions };
  },
  template: `
  <WizPopupContainer :expand="expand" >
    <button @click="buttonClick"> open/close </button>
    <WizPopup :isOpen="isOpen">
      <WizPopupButtonGroup v-bind="$props" :options="createOptions(click)" />
    </WizPopup>
  </WizPopupContainer>
  `,
});

Popup.args = {
  p: "xs",
  borderRadius: "xs2",
};

export const Divider: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopupButtonGroup },
  setup() {
    const createOptions = (click: (arg: number) => void): ButtonGroupItem[] => [
      createButton(1, click),
      createButton(2, click),
      { kind: "divider" },
      createButton(3, click),
      createButton(4, click),
    ];
    return { createOptions };
  },
  template: `
  <WizPopupButtonGroup v-bind="$props" :options="createOptions(click)" />
  `,
});
Divider.args = {};
