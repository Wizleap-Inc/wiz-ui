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
      control: { type: "array" },
    },
    labelWidth: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizPollGraph>;

const Template: StoryFn<typeof WizPollGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizPollGraph },
  template: `
    <WizPollGraph v-bind="args"/>
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

const LABELS = ["2022/5", "2022/4", "2022/3", "2022/2", "2022/1", "2021/12"];
const PERCENTAGES = [50, 85, 40, 20, 50, 50];

const DUMMY_DATA: PollGraphData[] = Array.from({ length: 6 }).map((_, i) => ({
  label: LABELS[i],
  innerLabel: `${PERCENTAGES[i]}%`,
  percentage: PERCENTAGES[i],
}));

export const Default = Template.bind({});
Default.args = {
  data: DUMMY_DATA,
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
  data: DUMMY_DATA,
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
  data: DUMMY_DATA,
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
  data: DUMMY_DATA,
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

const DUMMY_DATA_NL: PollGraphData[] = Array.from({ length: 6 }).map(
  (_, i) => ({
    label: `${LABELS[i]}\n${LABELS[i]}`,
    innerLabel: `${PERCENTAGES[i]}%`,
    percentage: PERCENTAGES[i],
  })
);

export const NewLine = Template.bind({});
NewLine.args = {
  data: DUMMY_DATA_NL,
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
