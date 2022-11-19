import { StoryFn } from "@storybook/vue";

import { WizTextButton } from "@/components/atoms/buttons/text";
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
  components: { WizCard, WizTextButton },
  template: `<WizCard v-bind="$props">
      <template #mainHeaderArea>{{ mainHeaderArea }}</template>
      <template #subHeaderArea>{{ subHeaderArea }}</template>
      {{ body }}
      <template #footer><WizTextButton>{{ footer }}</WizTextButton></template>
    </WizCard>`,
});

export const Default = Template.bind({});
Default.args = {
  title: "",
  mainHeaderArea: "mainHeaderAreaスロット",
  subHeaderArea: "subHeaderAreaスロット",
  body: "bodyスロットテストbodyスロットテストbodyスロットテストbodyスロットテストbodyスロットテストbodyスロットテストbodyスロットテストbodyスロットテスト",
  footer: "保存する",
  backgroundColor: "white.800",
  shadow: true,
};
