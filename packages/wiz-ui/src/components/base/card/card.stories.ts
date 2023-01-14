import { StoryFn } from "@storybook/vue";
import {
  COLOR_MAP_ACCESSORS,
  SPACING_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";

import { WizTextButton } from "@/components";

import WizCard from "./card.vue";

export default {
  title: "Base/Card",
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
    title: {
      control: { type: "text" },
    },
    hint: {
      control: { type: "text" },
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCard, WizTextButton },
  template: `<WizCard v-bind="$props">
      <template #mainHeaderArea>{{ slotMainHeaderArea }}</template>
      <template #subHeaderArea>{{ slotMubHeaderArea }}</template>
      {{ slotDefault }}
      <template #footer><WizTextButton>{{ slotFooter }}</WizTextButton></template>
    </WizCard>`,
});

export const Default = Template.bind({});
Default.args = {
  slotMainHeaderArea: "mainHeaderAreaスロット",
  slotMubHeaderArea: "subHeaderAreaスロット",
  slotDefault: "defaultスロット",
  slotFooter: "保存する",
  backgroundColor: "white.800",
  shadow: true,
  gap: "md",
};
