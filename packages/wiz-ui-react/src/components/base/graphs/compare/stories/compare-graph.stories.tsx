import { Meta, StoryObj } from "@storybook/react";

import { WizCompareGraph } from "../components";
import { CompareGraphData } from "../components/types";

const meta: Meta<typeof WizCompareGraph> = {
  title: "Base/Graphs/Compare",
  component: WizCompareGraph,
};

export default meta;
type Story = StoryObj<typeof WizCompareGraph>;

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

export const Default: Story = {
  args: {
    data: DUMMY_DATA,
  },
  parameters: {
    docs: {
      description: {
        story: `
frequencyの値が一番大きいdataが最大値となるようにグラフが描画されます。
      `,
      },
    },
  },
};

export const Unit: Story = {
  args: {
    data: DUMMY_DATA,
    unit: "%",
    unitPosition: "intersection",
  },
  parameters: {
    docs: {
      description: {
        story: `単位を設定できます。`,
      },
    },
  },
};

export const UnitVerticalAxis: Story = {
  args: {
    data: DUMMY_DATA,
    unit: "%",
    unitPosition: "vertical",
  },
  parameters: {
    docs: {
      description: {
        story: `縦軸にラベルを設定できます。`,
      },
    },
  },
};

export const TiltedLabel: Story = {
  args: {
    data: DUMMY_DATA,
    isTilted: true,
  },
  parameters: {
    docs: {
      description: {
        story: `ラベルを回転できます。`,
      },
    },
  },
};

export const MaxFrequency: Story = {
  args: {
    data: DUMMY_DATA,
    maxFrequency: 150,
  },
  parameters: {
    docs: {
      description: {
        story: `縦軸の最大値を設定します`,
      },
    },
  },
};

export const Ceil: Story = {
  args: {
    data: DUMMY_DATA,
    ceilN: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "縦軸の最大値を、データの最大値を`ceilN`桁で切り上げて設定します。defaultは0です。",
      },
    },
  },
};

export const Gap: Story = {
  args: {
    data: DUMMY_DATA,
    barGap: 0.5,
  },
  parameters: {
    docs: {
      description: {
        story: `barGapには0~1の値を設定してください。値が大きいほどバーの間隔が広くなります。`,
      },
    },
  },
};

export const GroupWidth: Story = {
  args: {
    data: DUMMY_DATA,
    barGroupWidth: 0.4,
  },
  parameters: {
    docs: {
      description: {
        story: `barGroupWidthには0~1の値を設定してください。値が小さいほどグループの占める領域が狭くなります。`,
      },
    },
  },
};

export const Children: Story = {
  args: {
    data: DUMMY_DATA,
    children: (
      <span>
        ここは
        <br />
        childrenです
      </span>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "childrenを使うことで、ラベルの表示をカスタマイズできます。",
      },
    },
  },
};
