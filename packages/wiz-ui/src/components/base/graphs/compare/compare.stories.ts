import { Meta, StoryFn } from "@storybook/vue";

import { CompareGraphData } from "./types";

import { WizCompareGraph } from ".";

export default {
  title: "Base/Graphs/Compare",
  component: WizCompareGraph,
  argTypes: {
    data: {
      control: { type: "array" },
    },
  },
} as Meta<typeof WizCompareGraph>;

const Template: StoryFn<typeof WizCompareGraph> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCompareGraph },
  template: `
    <WizCompareGraph v-bind="$props"/>
  `,
});
const DUMMY_DATA: CompareGraphData[] = [
  {
    label: "2022/5",
    data: [
      { frequency: 75, barColor: "green.800", numberColor: "gray.300" },
      { frequency: 50, barColor: "green.500", numberColor: "gray.700" },
      { frequency: 25, barColor: "green.300", numberColor: "gray.700" },
    ],
  },
  {
    label: "2022/6",
    data: [
      { frequency: 40, barColor: "red.800", numberColor: "gray.300" },
      { frequency: 80, barColor: "red.500", numberColor: "gray.700" },
      { frequency: 40, barColor: "red.300", numberColor: "gray.700" },
    ],
  },
  {
    label: "2022/7",
    data: [
      { frequency: 100, barColor: "blue.800", numberColor: "gray.300" },
      { frequency: 50, barColor: "blue.500", numberColor: "gray.700" },
      { frequency: 5, barColor: "blue.300", numberColor: "gray.700" },
    ],
  },
];

interface Option {
  slot: string;
}

const CODE_TEMPLATE = ({ slot }: Partial<Option>) => `
<script setup lang="ts">
import { WizPollGraph } from "@wizleap-inc/wiz-ui";
import { compareGraphData } from "@wizleap-inc/wiz-ui/components/base/graphs/compare/types";

const data: compareGraphData[] = [
  {
    label: "2022/5",
    frequency: 75,
  },
  ...
];
</script>

<template>
  <WizPollGraph :data="data">
    ${slot}
  </WizPollGraph>
</template>
`;

export const Default = Template.bind({});
Default.args = {
  data: DUMMY_DATA,
};
Default.parameters = {
  docs: {
    description: {
      component: `
frequencyの値が一番大きいdataが最大値となるようにグラフが描画されます。
      `,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const AnnotationUnit = Template.bind({});
AnnotationUnit.args = {
  data: DUMMY_DATA,
  annotationUnit: "%",
};
AnnotationUnit.parameters = {
  docs: {
    description: {
      component: `表示する単位を設定できます。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const MaxFrequency = Template.bind({});
MaxFrequency.args = {
  data: DUMMY_DATA,
  maxFrequency: 150,
};
MaxFrequency.parameters = {
  docs: {
    description: {
      component: `縦軸の最大値を設定します`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Gap = Template.bind({});
Gap.args = {
  data: DUMMY_DATA,
  barGap: 0.5,
};
Gap.parameters = {
  docs: {
    description: {
      story: `barGapには0~1の値を設定してください。値が大きいほどバーの間隔が広くなります`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const GroupWidth = Template.bind({});
GroupWidth.args = {
  data: DUMMY_DATA,
  barGroupWidth: 0.4,
};
GroupWidth.parameters = {
  docs: {
    description: {
      story: `barGroupWidthには0~1の値を設定してください。値が小さいほどグループの占める領域が狭くなります。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Slot: StoryFn<typeof WizCompareGraph> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizCompareGraph },
  template: `
    <WizCompareGraph v-bind="$props">
      <span>ここは<br />スロットです</span>
    </WizCompareGraph>
  `,
});
Slot.args = {
  data: DUMMY_DATA,
};
Slot.parameters = {
  docs: {
    description: {
      story: "スロットを使うことで、ラベルの表示をカスタマイズできます。",
    },
    source: {
      code: CODE_TEMPLATE({
        slot: `<span>ここは<br />スロットです</span>`,
      }),
    },
  },
};
