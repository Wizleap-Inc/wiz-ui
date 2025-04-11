import { Meta, StoryFn } from "@storybook/vue3";

import { PollGraphData } from "./types";

import { WizPollGraph } from ".";

export default {
  title: "Base/Graphs/Poll",
  component: WizPollGraph,
  argTypes: {
    isColorFixed: {
      control: { type: "boolean" },
    },
    rowCount: {
      control: { type: "number" },
    },
    data: {
      control: { type: "object" },
    },
    labelWidth: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizPollGraph>;

const DUMMY_DATA: PollGraphData[] = [
  { label: "2022/5", percentage: 50 },
  { label: "2022/4", percentage: 85 },
  { label: "2022/3", percentage: 40 },
  { label: "2022/2", percentage: 20 },
  { label: "2022/1", percentage: 5 },
  { label: "2021/12", percentage: 50 },
  { label: "2021/11", percentage: 0 },
].map((data) => ({
  ...data,
  innerLabel: `${data.percentage}%`,
}));

const Template: StoryFn<typeof WizPollGraph> = (args) => ({
  setup: () => ({ args, data: DUMMY_DATA }),
  components: { WizPollGraph },
  template: `
    <WizPollGraph v-bind="args" :data="data"/>
  `,
});

interface Option {
  isColorFixed: boolean;
  rowCount: number;
  labelWidth: string;
  newLine: boolean;
}

const CODE_TEMPLATE = ({
  isColorFixed,
  rowCount,
  labelWidth,
  newLine,
}: Partial<Option>) => `
<script setup lang="ts">
import { WizPollGraph } from "@wizleap-inc/wiz-ui";
import { PollGraphData } from "@wizleap-inc/wiz-ui/components/base/graphs/poll/types";

const data: PollGraphData[] = [
  {
    label: ${newLine ? '"2022/5\n2022/5"' : "`2022/5`"},
    innerLabel: "50%",
    percentage: 50,
  },
  ...
];
</script>

<template>
  <WizPollGraph :data="data"${
    (isColorFixed ? ` :isColorFixed="true"` : "") +
    (rowCount ? ` :rowCount="${rowCount}"` : "") +
    (labelWidth ? ` :labelWidth="${labelWidth}"` : "")
  }/>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  isColorFixed: false,
};
Default.parameters = {
  docs: {
    description: {
      component: `
## WizPollGraph

縦に連なる棒グラフを表示するコンポーネントです。
`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const ColorFixed = Template.bind({});
ColorFixed.args = {
  isColorFixed: true,
};
ColorFixed.parameters = {
  docs: {
    description: {
      story: `棒グラフの色を固定するかどうかを指定します。固定色はgreen.700です。`,
    },
    source: {
      code: CODE_TEMPLATE({ isColorFixed: true }),
    },
  },
};

export const RowCount = Template.bind({});
RowCount.args = {
  rowCount: 10,
};
RowCount.parameters = {
  docs: {
    description: {
      story: `棒グラフの表示数を指定します。`,
    },
    source: {
      code: CODE_TEMPLATE({ rowCount: 10 }),
    },
  },
};

export const LabelWidth = Template.bind({});
LabelWidth.args = {
  labelWidth: "10rem",
};
LabelWidth.parameters = {
  docs: {
    description: {
      story: `棒グラフのラベルの幅を指定します。`,
    },
    source: {
      code: CODE_TEMPLATE({ labelWidth: "10rem" }),
    },
  },
};

const DUMMY_DATA_NL: PollGraphData[] = DUMMY_DATA.map((data) => ({
  ...data,
  label: `${data.label}\n${data.label}`,
}));

const TemplateNL: StoryFn<typeof WizPollGraph> = (args) => ({
  setup: () => ({ args, data: DUMMY_DATA_NL }),
  components: { WizPollGraph },
  template: `
    <WizPollGraph v-bind="args" :data="data"/>
  `,
});

export const NewLine = TemplateNL.bind({});
NewLine.args = {
  isColorFixed: false,
};
NewLine.parameters = {
  docs: {
    description: {
      story: `棒グラフのラベルに改行を含めることができます。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};
