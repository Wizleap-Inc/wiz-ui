import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";

import { FONT_SIZE_ACCESSORS } from "./../../../constants/styles/fontSize";
import WizText from "./text.vue";

export default {
  title: "Atoms/Text",
  component: WizText,
  argTypes: {
    as: {
      control: {
        type: "select",
        options: ["p", "span"],
      },
    },
    fontSize: {
      control: {
        type: "select",
        options: FONT_SIZE_ACCESSORS,
      },
    },
    color: {
      control: {
        type: "select",
        options: COLOR_MAP_ACCESSORS,
      },
    },
  },
};

const Template = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizText },
  template: `<WizText v-bind="$props">{{ slot }}</WizText>`,
});

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: "p",
  slot: "これはテキストです。",
};
