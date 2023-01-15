import { StoryFn } from "@storybook/vue";

import WizTooltip from "./tooltip.vue";

export default {
  title: "Base/Tooltip",
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
  template: `
    <div style="padding:100px;">
      <WizTooltip v-bind="$props">
        {{ text }}
        <template #content>
          コンテンツがない場合に表示するスロット
        </template>
      </WizTooltip>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  content: "保険見直し、つみたて・投資、ライフプラン",
  text: "保険見直し、つみ…",
};

export const NewLine = Template.bind({});
NewLine.args = {
  content:
    "保険見直し、つみたて・投資、ライフプラン\n 保険見直し、つみたて・投資、ライフプラン",
  text: "保険見直し、つみ…",
};
