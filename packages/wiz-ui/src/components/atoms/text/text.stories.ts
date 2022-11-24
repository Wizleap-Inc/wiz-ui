import { StoryFn } from "@storybook/vue";

import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";

import { FONT_SIZE_ACCESSORS } from "./../../../constants/styles/font-size";
import WizText from "./text.vue";

export default {
  title: "Atoms/Text",
  component: WizText,
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["p", "span"],
    },
    fontSize: {
      control: { type: "select" },
      options: FONT_SIZE_ACCESSORS,
    },
    color: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    bold: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizText },
  template: `<WizText v-bind="$props">{{ slot }}</WizText>`,
});

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: "p",
  slot: "これはテキストです。",
};

export const Span = Template.bind({});
Span.args = {
  as: "span",
  slot: "これはテキストです。",
};

export const Bold = Template.bind({});
Bold.args = {
  as: "p",
  bold: true,
  slot: "これはテキストです。",
};
