import { StoryFn } from "@storybook/vue";

import { WizLineGraph } from ".";

export default {
  title: "Base/Graphs/Line",
  component: WizLineGraph,
  argTypes: {
    percentage: {
      control: { type: "number" },
    },
  },
};

export const Default: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizLineGraph },
  template: `
    <WizLineGraph v-bind="$props"/>
  `,
});
Default.args = {
  percentage: 56,
};
