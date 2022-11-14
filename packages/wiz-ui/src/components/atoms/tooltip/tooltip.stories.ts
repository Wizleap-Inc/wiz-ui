import { StoryFn } from "@storybook/vue";

import { WizButton } from "../button";

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
  components: { WizTooltip, WizButton },
  template: `<div style="margin:100px;height:200px"><span style="position:relative;">ホバー<WizTooltip v-bind="$props" /></span></div>`,
});

export const Default = Template.bind({});
Default.args = {
  content: "保険見直し、つみたて・投資、ライフプラン",
};
