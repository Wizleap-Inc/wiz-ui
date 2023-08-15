import { Meta, StoryObj } from "@storybook/react";

import { WizText, WizVStack } from "@/components";

import { WizCircleGraph } from "../components";
import { CircleGraphData } from "../components/types";

const meta: Meta<typeof WizCircleGraph> = {
  title: "Base/Graphs/Circle",
  component: WizCircleGraph,
  parameters: {
    docs: {
      description: {
        component: `
### WizCircleGraph

円グラフを作るコンポーネントです。
ラベルわけされた割合データをpropsに渡すことで表示できます。
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WizCircleGraph>;

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

const Template: Story = {
  render: (args) => (
    <div style={{ height: 216 }}>
      <WizCircleGraph {...args} />
    </div>
  ),
};

export const Default: Story = {
  ...Template,
  args: {
    data: DUMMY_DATA,
  },
};

export const OtherLabel: Story = {
  ...Template,
  args: {
    data: DUMMY_DATA,
    otherLabel: "OTHER",
  },
  parameters: {
    docs: {
      description: {
        story: `
その他の部分、それ以外の部分のラベルの表示を変えることができます。
デフォルトでは「その他」となっています。
`,
      },
    },
  },
};

export const Children: Story = {
  ...Template,
  args: {
    data: DUMMY_DATA,
    children: (
      <WizVStack align="center">
        <WizText fontSize="sm">平均</WizText>
        <WizText bold fontSize="xl">
          80分
        </WizText>
      </WizVStack>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
円グラフの真ん中にはchildrenが配置されており、自由に表示することができます。
`,
      },
    },
  },
};
