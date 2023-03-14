import { StoryFn, Meta } from "@storybook/vue";

import WizAccordion from "./accordion.vue";

export default {
  title: "Base/Accordion",
  component: WizAccordion,
  argTypes: {
    summary: {
      control: { type: "text" },
    },
  },
} as Meta<typeof WizAccordion>;

const Template: StoryFn<typeof WizAccordion> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAccordion },
  setup: () => ({}),
  template: `<WizAccordion v-bind="$props">折りたたまれている部分です．</WizAccordion>`,
});

export const Default = Template.bind({});
Default.args = {
  summary: "概要",
};
