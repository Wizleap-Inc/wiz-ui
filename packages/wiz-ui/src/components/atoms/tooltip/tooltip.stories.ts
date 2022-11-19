import { StoryFn } from "@storybook/vue";

import WizTooltip from "./tooltip.vue";

export default {
  title: "Atoms/Tooltip",
  component: WizTooltip,
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTooltip },
  template: `<div style="padding:100px;"><WizTooltip v-bind="$props">{{ slot }}<template #tooltip-content>コンテンツがない場合に表示するスロット</template></WizTooltip></div>`,
});

export const Oneline = Template.bind({});
Oneline.args = {
  content: "保険見直し、つみたて・投資、ライフプラン",
  slot: "保険見直し、つみ…",
};

export const Newline = Template.bind({});
Newline.args = {
  content:
    "保険見直し、つみたて・投資、ライフプラン保険見直し、つみたて・投資、ライフプラン",
  slot: "保険見直し、つみ…",
};
