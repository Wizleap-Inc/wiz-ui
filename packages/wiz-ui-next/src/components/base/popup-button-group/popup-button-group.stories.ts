import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import { WizHStack, WizPopupContainer, WizPopup } from "@/components";

import { SelectBoxOption, Item } from "./types";

import { WizPopupButtonGroup } from ".";

export default {
  title: "Base/PopupButtonGroup",
  component: WizPopupButtonGroup,
  argTypes: {
    expand: {
      control: { type: "boolean" },
    },
    divider: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizPopupButtonGroup>;

const _getDummyOptions = (label: string, count: number, exLabel?: string) => {
  const options: SelectBoxOption[] = [];
  for (let i = 1; i <= count; i++) {
    const m =
      i % 3 === 0
        ? undefined
        : i % 3 === 1
        ? ("openNew" as const)
        : ("addCircle" as const);
    options.push({
      label: label + i,
      value: i,
      exLabel: exLabel,
      icon: m,
      onClick: () => {
        console.log("clicked! ", i);
      },
    });
  }
  return options.map((opt) => ({ kind: "button", option: opt } as Item));
};

const _getDummyItems = (): Item[] => {
  const f = (n: number) => () => console.log("clicked!", n);
  return [
    { kind: "group", title: "タイトル", items: _getDummyOptions("ラベル", 3) },
    { kind: "button", option: { label: "label 1", value: 4, onClick: f(4) } },
    { kind: "button", option: { label: "label 2", value: 5, onClick: f(5) } },
  ];
};

const _getDummyItems2 = (): Item[] => {
  const f = (n: number) => () => console.log("clicked!", n);
  const createButton = (n: number): Item => ({
    kind: "button",
    option: { label: `item ${n}`, value: n, onClick: f(n) },
  });
  return [
    {
      kind: "group",
      title: "タイトル1",
      items: [
        ..._getDummyOptions("test", 3),
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
    const value = ref(0);
    return { args };
  },
  template: `
  <WizHStack>
    <WizPopupButtonGroup v-bind="args"/>
  </WizHStack>
  `,
});
export const Default = Template.bind({});

Default.args = {
  options: _getDummyItems2(), //_getDummyOptions("test", 3),
  divider: true,
};

export const Popup: StoryFn<typeof WizPopupButtonGroup> = (args) => ({
  components: { WizPopupButtonGroup, WizHStack, WizPopupContainer, WizPopup },
  setup() {
    const value = ref(0);
    return { args };
  },
  template: `
  <WizHStack>
    <WizPopupContainer :expand="expand">
      <WizPopup :isOpen="true">
        <WizHStack>
          <WizPopupButtonGroup v-bind="args"/>
        </WizHStack>
      </WizPopup>
    </WizPopupContainer>
  </WizHStack>
  `,
});

Popup.args = {
  options: _getDummyItems2(), //_getDummyOptions("test", 3),
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
