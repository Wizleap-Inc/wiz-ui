import { Meta, StoryFn } from "@storybook/vue3";
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
    borderRadius: {
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
  },
} as Meta<typeof WizPopupButtonGroup>;

const _getDummyOptions = (count: number, exLabel?: string) => {
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
      onClick: () => {
        console.log("clicked! ", n);
      },
    });
  });
  return options.map(
    (opt) => ({ kind: "button", option: opt } as ButtonGroupItem)
  );
};

const _getDummyItems = (): ButtonGroupItem[] => {
  const f = (n: number) => () => console.log("clicked!", n);
  return [
    { kind: "group", title: "タイトル", items: _getDummyOptions(3) },
    { kind: "button", option: { label: "label 1", value: 4, onClick: f(4) } },
    { kind: "button", option: { label: "label 2", value: 5, onClick: f(5) } },
  ];
};

const _getDummyItems2 = (): ButtonGroupItem[] => {
  const f = (n: number) => () => console.log("clicked!", n);
  const createButton = (n: number): ButtonGroupItem => ({
    kind: "button",
    option: { label: `item ${n}`, value: n, onClick: f(n) },
  });
  return [
    {
      kind: "group",
      title: "タイトル1",
      groupDivider: true,
      buttonDivider: true,
      items: [
        ..._getDummyOptions(3),
        {
          kind: "group",
          title: "タイトル2",
          items: [createButton(4), createButton(5)],
        },
      ],
    },
    createButton(6),
    createButton(7),
  ];
};

const Template: StoryFn<typeof WizPopupButtonGroup> = (args) => ({
  components: { WizPopupButtonGroup },
  setup() {
    return { args };
  },
  template: `
  <WizPopupButtonGroup v-bind="args"/>
  `,
});
export const Default = Template.bind({});

Default.args = {
  options: _getDummyItems2(), //_getDummyOptions("test", 3),
};

export const Popup: StoryFn<typeof WizPopupButtonGroup> = (args) => ({
  components: { WizPopupButtonGroup, WizPopupContainer, WizPopup },
  setup() {
    const isOpen = ref(true);
    const onClick = () => {
      isOpen.value = !isOpen.value;
      console.log(isOpen);
    };
    return { args, isOpen, onClick };
  },
  template: `
  <WizPopupContainer :expand="expand" >
    <button @click="onClick"> open/close </button>
    <WizPopup :isOpen="isOpen">
      <WizPopupButtonGroup v-bind="args"/>
    </WizPopup>
  </WizPopupContainer>
  `,
});

Popup.args = {
  options: _getDummyItems2(), //_getDummyOptions("test", 3),
  p: "xs",
  borderRadius: "xs2",
};

// export const Disabled = Template.bind({});
// Disabled.args = {
//   options: [],
//   disabled: true,
// };

// const MultiTemplate: StoryFn = (_, { argTypes }) => ({
//   props: Object.keys(argTypes),
//   components: { WizPopupButtonGroup, WizHStack },
//   setup() {
//     const value = ref(0);
//     return { value };
//   },
//   template: `
//     <WizHStack>
//       <WizPopupButtonGroup v-bind="$props"  v-model="value" @input="input"/>
//       <WizPopupButtonGroup v-bind="$props"  v-model="value" @input="input"/>
//     </WizHStack>
//   `,
// });

// export const LongLabel = MultiTemplate.bind({});
// LongLabel.args = {
//   options: _getDummyOptions("ThisIsTooLongLabelThisIsTooLongLabel", 3),
// };

// export const Expand = Template.bind({});
// Expand.args = {
//   options: _getDummyOptions("test", 1),
//   expand: true,
// };

// export const ManyOptions = Template.bind({});
// ManyOptions.args = {
//   options: _getDummyOptions("test", 15),
// };

// export const ExtraLabel = Template.bind({});
// ExtraLabel.args = {
//   options: _getDummyOptions("test", 3, "(10)"),
// };
