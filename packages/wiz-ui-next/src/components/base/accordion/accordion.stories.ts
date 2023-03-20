import { StoryFn, Meta } from "@storybook/vue3";
import { ref } from "vue";

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
  setup: () => {
    const isOpen = ref(false);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { args, isOpen, toggle };
  },
  components: { WizAccordion },
  template: `
  <WizAccordion v-bind="args" :isOpen="isOpen" @toggle="toggle">
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

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  backgroundColor: "white",
};

export const Open: StoryFn<typeof WizAccordion> = (args) => ({
  setup: () => {
    const isOpen = ref(true);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { args, isOpen, toggle };
  },
  components: { WizAccordion },
  template: `
  <WizAccordion v-bind="args" :isOpen="isOpen" @toggle="toggle">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  `,
});
Open.args = {
  backgroundColor: "gray",
};

const MultipleTemplate: StoryFn<typeof WizAccordion> = (args) => ({
  setup: () => {
    const isOpens = [ref(true), ref(false), ref(false)];
    const toggles = isOpens.map(
      (isOpen) => () => (isOpen.value = !isOpen.value)
    );
    return { args, isOpens, toggles };
  },
  components: { WizAccordion },
  template: `
  <WizAccordion v-bind="args" :isOpen="isOpens[0].value" @toggle="toggles[0]">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  <WizAccordion v-bind="args" :isOpen="isOpens[1].value" @toggle="toggles[1]">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  <WizAccordion v-bind="args" :isOpen="isOpens[2].value" @toggle="toggles[2]">
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
