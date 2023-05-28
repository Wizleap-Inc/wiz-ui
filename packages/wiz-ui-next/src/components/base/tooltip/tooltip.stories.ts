import { StoryFn, Meta } from "@storybook/vue3";

import { WizText } from "@/components";

import WizTooltip from "./tooltip.vue";

export default {
  title: "Base/Tooltip",
  component: WizTooltip,
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    hover: { control: { type: "boolean" } },

    isDirectioonFixed: {
      control: { type: "boolean" },
    },
  },
} as Meta<typeof WizTooltip>;

const Template: StoryFn<typeof WizTooltip> = (args) => ({
  setup: () => ({ args }),
  components: { WizTooltip, WizText },
  template: `
    <div style="width: 700px; height: 500px; background-color: #eee; display: flex; justify-content: center; align-items: center;">
      <WizTooltip v-bind="args">
        <WizText size="xs2">保険見直し、つみ...</WizText>
        <template #content>保険見直し、つみたて・投資、ライフプラン</template>
      </WizTooltip>
    </div>`,
});

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      component: `
### WizTooltip

Hoverすると詳細や補足情報を表示できるコンポーネントです。
SlotのDefaultにはそのHoverのトリガーとなる要素を記述します。
SlotのcontentにはHoverしたときに表示される要素を記述します。

contentに改行文字(\\n)を含む文字列を渡すと、改行されて表示されます。
`,
    },
    source: {
      code: `
<WizTooltip>
  保険見直し、つみ...
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};

export const Hover = Template.bind({});
Hover.args = {
  hover: true,
};
Hover.parameters = {
  docs: {
    description: {
      story: `hoverをtrueにすると、常時表示されます。これはStorybook上でのデモ用などInteractionのMockに使えます。`,
    },
    source: {
      code: `
<WizTooltip hover>
  保険見直し、つみ...
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};

export const Direction = Template.bind({});
Direction.args = {
  direction: "right",
  hover: true,
};
Direction.parameters = {
  docs: {
    description: {
      story: `directionには、top, bottom, left, rightのいずれかを渡すことができます。デフォルトはtopです。`,
    },
    source: {
      code: `
<WizTooltip direction="right">
  保険見直し、つみ...
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};

export const IsDirectionFixed = Template.bind({});
IsDirectionFixed.args = {
  hover: true,
  direction: "right",
  IsDirectionFixed: true,
};
IsDirectionFixed.parameters = {
  docs: {
    description: {
      story: `IsDirectionFixed を指定すると、Popup の表示位置を固定します。`,
    },
    source: {
      code: `
<WizTooltip direction="right">
  保険見直し、つみ...
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};
