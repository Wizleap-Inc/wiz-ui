import { Meta, StoryFn } from "@storybook/vue3";

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

const DUMMY_DATA: CompareGraphData[] = [
  {
    label: "2022/5",
    frequencies: [75, 50, 25],
  },
  {
    label: "2022/6",
    frequencies: [40, 80, 40],
  },
  {
    label: "2022/7",
    frequencies: [100, 50, 5],
  },
];

const Template: StoryFn<typeof WizCompareGraph> = (args) => ({
  components: { WizCompareGraph },
  setup: () => ({
    args,
    data: DUMMY_DATA,
  }),
  template: `
    <WizCompareGraph v-bind="args" :data="data"/>
  `,
});
interface Option {
  slot: string;
}

const CODE_TEMPLATE = ({ slot }: Partial<Option>) => `
<script setup lang="ts">
import { WizPollGraph } from "@wizleap-inc/wiz-ui-next";
import { compareGraphData } from "@wizleap-inc/wiz-ui-next/components/base/graphs/compare/types";

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

export const Slot: StoryFn<typeof WizCompareGraph> = (args) => ({
  components: { WizCompareGraph },
  setup: () => ({
    args,
    data: DUMMY_DATA,
  }),
  template: `
    <WizCompareGraph v-bind="args" :data="data">
      <span>ここは<br />スロットです</span>
    </WizCompareGraph>
  `,
});
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
