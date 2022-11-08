import { COLOR_MAP_ACCESSORS } from "../../../constants/styles/color";
import { FONT_SIZE_MAP } from "../../../constants/styles/fontSize";

import WizText from "./text.vue";

import type { Story } from "@storybook/vue";

export default {
  title: "Atoms/Text",
  component: Text,
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
        options: Object.keys(FONT_SIZE_MAP),
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

const Template: Story = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizText },
  template: `<WizText v-bind="$props">{{ slot }}</WizText>`,
});

export const Paragraph = Template.bind({});
Paragraph.args = {
  as: "p",
  slot: "これはテキストです。",
};
