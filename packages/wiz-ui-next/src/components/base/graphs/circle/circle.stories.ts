import { Meta, StoryFn } from "@storybook/vue3";

import { WizText, WizVStack } from "@/components";

import { CircleGraphData } from "./types";

import { WizCircleGraph } from ".";

export default {
  title: "Base/Graphs/Circle",
  component: WizCircleGraph,
  argTypes: {
    otherLabels: {
      control: { type: "text" },
    },
    data: {
      control: { type: "object" },
    },
  },
} as Meta<typeof WizCircleGraph>;

const DUMMY_DATA: CircleGraphData[] = [
  {
    label: "60分",
    percentage: 50,
  },
  {
    label: "90分",
    percentage: 20,
  },
  {
    label: "50分",
    percentage: 15,
  },
  {
    label: "40分",
    percentage: 10,
  },
];
const Template: StoryFn<typeof WizCircleGraph> = (args) => ({
  setup: () => ({ args, data: DUMMY_DATA }),
  components: { WizCircleGraph },
  template: `
  <div style="height: 216px;">
    <WizCircleGraph v-bind="args" :data="data"/>
  </div>
  `,
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      component: `
### WizCircleGraph

円グラフを作るコンポーネントです。
ラベルわけされた割合データをpropsに渡すことで表示できます。
`,
    },
    source: {
      code: `
<script setup lang="ts">
import { CircleGraphData } from "@wizleap-inc/wiz-ui/components/base/graphs/circle/types"
import { WizCircleGraph } from "@wizleap-inc"

const data: CircleGraphData[] = [
  {
    label: "60分",
    percentage: 50,
  },
  {
    label: "90分",
    percentage: 20,
  },
  {
    label: "50分",
    percentage: 15,
  },
  {
    label: "40分",
    percentage: 10,
  },
];
</script>

<template>
  <WizCircleGraph :data="data"/>
</template>
    `,
    },
  },
};

export const OtherLabel = Template.bind({});
OtherLabel.args = {
  otherLabel: "OTEHR",
};
OtherLabel.parameters = {
  docs: {
    description: {
      story: `
その他の部分、それ以外の部分のラベルの表示を変えることができます。
デフォルトでは「その他」となっています。
`,
    },
    source: {
      code: `
<script setup lang="ts">
import { CircleGraphData } from "@wizleap-inc/wiz-ui/components/base/graphs/circle/types"
import { WizCircleGraph } from "@wizleap-inc"

const data: CircleGraphData[] = [
  {
    label: "60分",
    percentage: 50,
  },
  {
    label: "90分",
    percentage: 20,
  },
  {
    label: "50分",
    percentage: 15,
  },
  {
    label: "40分",
    percentage: 10,
  },
];
const otherLabel="OTHER";
</script>

<template>
  <WizCircleGraph :data="data" :otherLabel="otherLabel" />
</template>
    `,
    },
  },
};

export const MiddleSlot: StoryFn<typeof WizCircleGraph> = (args) => ({
  setup: () => ({ args, data: DUMMY_DATA }),
  components: { WizCircleGraph, WizVStack, WizText },
  template: `
  <div style="height: 216px;">
    <WizCircleGraph :data="data" v-bind="args">
      <WizVStack align="center">
        <WizText font-size="sm">平均</WizText>
        <WizText bold font-size="xl">80分</WizText>
      </WizVStack>
    </WizCircleGraph>
  </div>
  `,
});
MiddleSlot.parameters = {
  docs: {
    description: {
      story: `
円グラフの真ん中にはスロットが配置されており、自由に表示することができます。
`,
    },
    source: {
      code: `
<script setup lang="ts">
import { CircleGraphData } from "@wizleap-inc/wiz-ui/components/base/graphs/circle/types"
import { WizCircleGraph, WizVStack, WizText } from "@wizleap-inc"

const data: CircleGraphData[] = [
  {
    label: "60分",
    percentage: 50,
  },
  {
    label: "90分",
    percentage: 20,
  },
  {
    label: "50分",
    percentage: 15,
  },
  {
    label: "40分",
    percentage: 10,
  },
];
</script>

<template>
  <WizCircleGraph :data="data">
    <WizVStack align="center">
      <WizText font-size="sm">平均</WizText>
      <WizText bold font-size="xl">80分</WizText>
    </WizVStack>
  </WizCircleGraph>
</template>
    `,
    },
  },
};
