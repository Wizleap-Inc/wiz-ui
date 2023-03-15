import { StoryFn, Meta } from "@storybook/vue3";

import WizAccordion from "./accordion.vue";

export default {
  title: "Base/Accordion",
  component: WizAccordion,
  argTypes: {
    backgroundColor: {
      control: { type: "select" },
      options: ["white", "gray"],
    },
  },
} as Meta<typeof WizAccordion>;

const Template: StoryFn<typeof WizAccordion> = (args) => ({
  setup: () => ({ args }),
  components: { WizAccordion },
  template: `
  <WizAccordion v-bind="args"> 
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  `,
});

export const Default = Template.bind({});
Default.args = {
  backgroundColor: "gray",
};

const MultipleTemplate: StoryFn<typeof WizAccordion> = (args) => ({
  setup: () => ({ args }),
  components: { WizAccordion },
  template: `
  <WizAccordion v-bind="args"> 
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  
  <WizAccordion v-bind="args"> 
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  
  <WizAccordion v-bind="args"> 
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  `,
});

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  backgroundColor: "gray",
};
