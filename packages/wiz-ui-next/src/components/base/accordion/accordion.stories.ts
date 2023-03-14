import { StoryFn, Meta } from "@storybook/vue3";

import WizAccordion from "./accordion.vue";

export default {
  title: "Base/Accordion",
  component: WizAccordion,
  argTypes: {},
} as Meta<typeof WizAccordion>;

const Template: StoryFn<typeof WizAccordion> = (args) => ({
  setup: () => ({ args }),
  components: { WizAccordion },
  template: `<WizAccordion v-bind="args">折りたたまれている部分です．</WizAccordion>`,
});

export const Default = Template.bind({});
Default.args = {};
