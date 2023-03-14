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
        // console.log("clicked! ", n);
      },
    });
  });
  return options.map(
    (opt) => ({ kind: "button", option: opt } as ButtonGroupItem)
  );
};

const _getDummyItems = (): ButtonGroupItem[] => {
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

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopupButtonGroup },
  setup() {
    return {};
  },
  template: `
  <WizPopupButtonGroup v-bind="$props"/>
  `,
});
export const Default = Template.bind({});

Default.args = {
  options: _getDummyItems(),
};

export const Popup: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopupButtonGroup, WizPopupContainer, WizPopup },
  setup() {
    const isOpen = ref(true);
    const onClick = () => {
      isOpen.value = !isOpen.value;
      console.log(isOpen);
    };
    return { isOpen, onClick };
  },
  template: `
  <WizPopupContainer :expand="expand" >
    <button @click="onClick"> open/close </button>
    <WizPopup :isOpen="isOpen">
      <WizPopupButtonGroup v-bind="$props"/>
    </WizPopup>
  </WizPopupContainer>
  `,
});

Popup.args = {
  options: _getDummyItems(),
  p: "xs",
  borderRadius: "xs2",
};
