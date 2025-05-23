import { Meta, StoryFn } from "@storybook/vue3";

import { CompareGraphData } from "./types";

import { WizCompareGraph } from ".";

export default {
  title: "Base/Graphs/Compare",
  component: WizCompareGraph,
  argTypes: {
    data: {
      control: { type: "object" },
    },
    barGap: {
      control: { type: "number" },
    },
    barGroupWidth: {
      control: { type: "number" },
    },
    unitPosition: {
      control: { type: "select" },
      options: ["vertical", "intersection", "no"],
    },
    rotateStrength: {
      control: { type: "number" },
    },
  },
} as Meta<typeof WizCompareGraph>;

const DUMMY_DATA: CompareGraphData[] = [
  {
    label: "dog",
    data: [
      {
        id: "green_1",
        frequency: 75,
        barColor: "green.800",
        numberColor: "gray.300",
      },
      {
        id: "green_2",
        frequency: 50,
        barColor: "green.500",
        numberColor: "gray.700",
      },
      {
        id: "green_3",
        frequency: 25,
        barColor: "green.300",
        numberColor: "gray.700",
      },
    ],
  },
  {
    label: "very very very red apple",
    data: [
      {
        id: "red_1",
        frequency: 40,
        barColor: "red.800",
        numberColor: "gray.300",
      },
      {
        id: "red_2",
        frequency: 80,
        barColor: "red.500",
        numberColor: "gray.700",
      },
      {
        id: "red_3",
        frequency: 40,
        barColor: "red.300",
        numberColor: "gray.700",
      },
    ],
  },
  {
    label: "yellow banana",
    data: [
      {
        id: "blue_1",
        frequency: 85,
        barColor: "blue.800",
        numberColor: "gray.300",
      },
      {
        id: "blue_2",
        frequency: 50,
        barColor: "blue.500",
        numberColor: "gray.700",
      },
      {
        id: "blue_3",
        frequency: 5,
        barColor: "blue.300",
        numberColor: "gray.700",
      },
    ],
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
import { WizCompareGraph } from "@wizleap-inc/wiz-ui-next";
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
  <WizCompareGraph :data="data">
    ${slot}
  </WizCompareGraph>
</template>
`;

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story: `
frequencyの値が一番大きいdataが最大値となるようにグラフが描画されます。
      `,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Unit = Template.bind({});
Unit.args = {
  unit: "%",
  unitPosition: "intersection",
};
Unit.parameters = {
  docs: {
    description: {
      story: `単位を設定できます。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const UnitVerticalAxis = Template.bind({});
UnitVerticalAxis.args = {
  unit: "%",
  unitPosition: "vertical",
};
UnitVerticalAxis.parameters = {
  docs: {
    description: {
      story: `縦軸にラベルを設定できます。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const TiltedLabel = Template.bind({});
TiltedLabel.args = {
  isTilted: true,
};
TiltedLabel.parameters = {
  docs: {
    description: {
      story: `ラベルを回転できます。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const MaxFrequency = Template.bind({});
MaxFrequency.args = {
  maxFrequency: 150,
};
MaxFrequency.parameters = {
  docs: {
    description: {
      story: `縦軸の最大値を設定します`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Ceil = Template.bind({});
Ceil.args = {
  ceilN: 1,
};
Ceil.parameters = {
  docs: {
    description: {
      story:
        "縦軸の最大値を、データの最大値を`ceilN`桁で切り上げて設定します。defaultは0です。",
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const Gap = Template.bind({});
Gap.args = {
  barGap: 0.5,
};
Gap.parameters = {
  docs: {
    description: {
      story: `barGapには0~1の値を設定してください。値が大きいほどバーの間隔が広くなります。`,
    },
    source: {
      code: CODE_TEMPLATE({}),
    },
  },
};

export const GroupWidth = Template.bind({});
GroupWidth.args = {
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
