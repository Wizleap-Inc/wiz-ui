import { StoryFn } from "@storybook/vue";

import WizTooltip from "./tooltip.vue";

export default {
  title: "Atoms/Tooltip",
  component: WizTooltip,
  argTypes: {
    content: {
      control: { type: "text" },
    },
    isShow: {
      control: { type: "boolean" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTooltip },
  template: `<div style="padding:100px;"><span style="position:relative;">テスト<WizTooltip v-bind="$props"/></span></div>`,
});

export const Oneline = Template.bind({});
Oneline.args = {
  content: "保険見直し、つみたて・投資、ライフプラン",
  slot: "テスト",
};

export const Newline = Template.bind({});
Newline.args = {
  content:
    "保険見直し、つみたて・投資、ライフプラン保険見直し、つみたて・投資、ライフプラン",
  slot: "テスト",
};
