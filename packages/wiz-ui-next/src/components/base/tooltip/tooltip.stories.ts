import { StoryFn, Meta } from "@storybook/vue3";

import WizTooltip from "./tooltip.vue";

export default {
  title: "Base/Tooltip",
  component: WizTooltip,
  argTypes: {
    content: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizTooltip>;

const Template: StoryFn<typeof WizTooltip> = (args) => ({
  setup: () => ({ args }),
  components: { WizTooltip },
  template: `
    <div style="padding:100px;">
      <WizTooltip v-bind="args">
        {{ "保険見直し、つみ…" }}
        <template #content>
          コンテンツがない場合に表示するスロット
        </template>
      </WizTooltip>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {
  content: "保険見直し、つみたて・投資、ライフプラン",
};

export const NewLine = Template.bind({});
NewLine.args = {
  content:
    "保険見直し、つみたて・投資、ライフプラン\n保険見直し、つみたて・投資、ライフプラン",
};
