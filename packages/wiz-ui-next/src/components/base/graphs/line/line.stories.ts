import { Meta, StoryFn } from "@storybook/vue3";

import { WizLineGraph } from ".";

export default {
  title: "Base/Graphs/Line",
  component: WizLineGraph,
  argTypes: {
    percentage: {
      control: { type: "number" },
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
