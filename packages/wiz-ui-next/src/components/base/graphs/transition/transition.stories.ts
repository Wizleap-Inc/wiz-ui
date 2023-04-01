import { Meta, StoryFn } from "@storybook/vue3";

import { TransitionGraphData } from "./types";

import { WizTransitionGraph } from ".";

export default {
  title: "Base/Graphs/Transition",
  component: WizTransitionGraph,
  argTypes: {
    data: {
      control: { type: "array" },
    },
  },
} as Meta<typeof WizTransitionGraph>;

const DUMMY_DATA: TransitionGraphData[] = [
  {
    label: "2022/5",
    frequency: 75,
  },
  {
    label: "2022/6",
    frequency: 40,
  },
  {
    label: "2022/7",
    frequency: 25,
  },
];

const Template: StoryFn<typeof WizTransitionGraph> = (args) => ({
  setup: () => ({
    args,
    data: DUMMY_DATA,
  }),
  components: { WizTransitionGraph },
  template: `
    <WizTransitionGraph v-bind="args" :data="data"/>
  `,
});

const ReverseTemplate: StoryFn<typeof WizTransitionGraph> = (args) => ({
  setup: () => ({
    args,
    data: [...DUMMY_DATA].reverse(),
  }),
  components: { WizTransitionGraph },
  template: `
    <WizTransitionGraph v-bind="args" :data="data"/>
  `,
});

interface Option {
  slot: string;
}

const CODE_TEMPLATE = ({ slot }: Partial<Option>) => `
<script setup lang="ts">
import { WizPollGraph } from "@wizleap-inc/wiz-ui";
import { TransitionGraphData } from "@wizleap-inc/wiz-ui/components/base/graphs/transition/types";

const data: TransitionGraphData[] = [
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
減少する遷移の場合、Droppedというラベルが付きます。
      `,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Gain = ReverseTemplate.bind({});
Gain.parameters = {
  docs: {
    description: {
      story: "増加する遷移の場合、Gainedというラベルが付きます。",
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Slot: StoryFn<typeof WizTransitionGraph> = (args) => ({
  setup: () => ({ args, data: DUMMY_DATA }),
  components: { WizTransitionGraph },
  template: `
    <WizTransitionGraph v-bind="args" :data="data">
      <span>ここは<br />スロットです</span>
    </WizTransitionGraph>
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
