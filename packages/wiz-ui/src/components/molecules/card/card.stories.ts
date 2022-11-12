import { StoryFn } from "@storybook/vue";

import { COLOR_MAP_ACCESSORS } from "@/constants/styles/color";
import { SPACING_ACCESSORS } from "@/constants/styles/spacing";

import WizCard from "./card.vue";

export default {
  title: "Molecules/Card",
  component: WizCard,
  argTypes: {
    p: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    px: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    py: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    backgroundColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    shadow: {
      control: { type: "boolean" },
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard },
  template: `<WizCard v-bind="$props">{{ slot }}</WizCard>`,
});

export const Default = Template.bind({});
Default.args = {
  title: "1回目面談開催予定です",
  slot: "保存する",
  babckgroudColor: "white.500",
  shadow: true,
};
