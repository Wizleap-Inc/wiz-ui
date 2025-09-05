import { Meta, StoryFn } from "@storybook/vue3";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";

import { WizLineGraph } from ".";

export default {
  title: "Base/Graphs/Line",
  component: WizLineGraph,
  argTypes: {
    percentage: {
      control: { type: "number" },
    },
    activeColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md"],
    },
  },
} as Meta<typeof WizLineGraph>;

export const Default: StoryFn<typeof WizLineGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizLineGraph },
  template: `
    <WizLineGraph v-bind="$props"/>
  `,
});
Default.args = {
  percentage: 56,
};

export const HiddenBg: StoryFn<typeof WizLineGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizLineGraph },
  template: `
    <WizLineGraph v-bind="$props"/>
  `,
});

HiddenBg.args = {
  percentage: 56,
  hiddenBg: true,
};

export const ActiveColor: StoryFn<typeof WizLineGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizLineGraph },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <WizLineGraph :percentage="75" activeColor="green.800" />
      <WizLineGraph :percentage="60" activeColor="blue.800" />
      <WizLineGraph :percentage="45" activeColor="red.800" />
      <WizLineGraph :percentage="90" activeColor="yellow.800" />
    </div>
  `,
});
ActiveColor.args = {};

export const Size: StoryFn<typeof WizLineGraph> = (args) => ({
  setup: () => ({ args }),
  components: { WizLineGraph },
  template: `
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin-bottom: 8px;">Small (sm)</p>
        <WizLineGraph :percentage="56" size="sm" />
      </div>
      <div>
        <p style="margin-bottom: 8px;">Medium (md)</p>
        <WizLineGraph :percentage="56" size="md" />
      </div>
    </div>
  `,
});
Size.args = {};
