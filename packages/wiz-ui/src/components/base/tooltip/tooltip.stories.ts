import { StoryFn } from "@storybook/vue";

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
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTooltip },
  template: `
    <div style="width: 700px; height: 500px; background-color: #eee; display: flex; justify-content: center; align-items: center;">
      <WizTooltip v-bind="$props">
        保険見直し、つみ…
        <template #content>保険見直し、つみたて・投資、ライフプラン</template>
      </WizTooltip>
    </div>
  `,
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
  animation: false,
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
  animation: false,
};
Direction.parameters = {
  docs: {
    description: {
      story: `directionには、top, bottom, left, rightのいずれかを渡すことができます。デフォルトはtopです。`,
    },
    source: {
      code: `
<WizTooltip direction="right">
  <WizText size="xs2">保険見直し、つみ...</WizText>
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};

export const LongTextFixedOutBox: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTooltip, WizText },
  template: `
    <div style="width: 700px; height: 500px; background-color: #eee; display: flex; justify-content: center; align-items: center;">
      <div style="width: 200px;">
        <WizTooltip v-bind="$props">
          <WizText size="xs2">保険見直し、つみたて・投資、ライフプラン</WizText>
          <template #content>保険見直し、つみたて・投資、ライフプラン</template>
        </WizTooltip>
      </div>
    </div>
  `,
});
LongTextFixedOutBox.args = {
  hover: true,
  animation: false,
};
LongTextFixedOutBox.parameters = {
  docs: {
    description: {
      story: `親要素の幅が固定されている状態で、その中に長いinline要素がある場合、適切な位置で折り返すことができる`,
    },
    source: {
      code: `
<WizTooltip hover>
  <WizText size="xs2">保険見直し、つみたて・投資、ライフプラン</WizText>
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};

export const ShortTextFixedOutBox: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizTooltip, WizText },
  template: `
    <div style="width: 700px; height: 500px; background-color: #eee; display: flex; justify-content: center; align-items: center;">
      <div style="width: 200px;">
        <WizTooltip v-bind="$props">
          <WizText size="xs2">保険見直し</WizText>
          <template #content>保険見直し、つみたて・投資、ライフプラン</template>
        </WizTooltip>
      </div>
    </div>
  `,
});
ShortTextFixedOutBox.args = {
  hover: true,
  animation: false,
};
ShortTextFixedOutBox.parameters = {
  docs: {
    description: {
      story: `親要素の幅が固定されている状態で、その中に短いinline要素がある場合、そのインライン要素の幅に合わせてTooltipの位置が決まる`,
    },
    source: {
      code: `
<WizTooltip hover>
  <WizText size="xs2">保険見直し、つみたて・投資、ライフプラン</WizText>
  <template #content>保険見直し、つみたて・投資、ライフプラン</template>
</WizTooltip>
`,
    },
  },
};
