import { StoryFn } from "@storybook/vue";

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
NewLine.parameters = {
  docs: {
    description: {
      story: "`Tooltip` は、文章を複数行にわたって入力することもできます。",
    },
  },
};
NewLine.parameters = {
  docs: {
    description: {
      story: "`Tooltip` は、文章を複数行にわたって入力することもできます。",
    },
    source: {
      code: `
<template>
  <div style="padding:100px;">
    <WizTooltip content="保険見直し、つみたて・投資、ライフプラン\n保険見直し、つみたて・投資、ライフプラン">
      {{ "保険見直し、つみ…" }}
      <template #content>
        コンテンツがない場合に表示するスロット
      </template>
    </WizTooltip>
  </div>
</template>
      `,
    },
  },
};
