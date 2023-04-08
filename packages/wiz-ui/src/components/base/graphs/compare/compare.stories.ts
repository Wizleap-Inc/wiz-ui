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
