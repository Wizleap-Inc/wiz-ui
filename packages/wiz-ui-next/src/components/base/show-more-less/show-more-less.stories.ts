import { Meta, StoryFn } from "@storybook/vue3";
import { ref } from "vue";

import WizShowMoreLess from "./show-more-less.vue";

export default {
  title: "Base/ShowMoreLess",
  component: WizShowMoreLess,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["pc", "mobile"],
    },
  },
} as Meta<typeof WizShowMoreLess>;

const Template: StoryFn<typeof WizShowMoreLess> = (args) => ({
  setup: () => {
    const isOpen = ref(false);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { args, isOpen, toggle };
  },
  components: { WizShowMoreLess },
  template: `
  <WizShowMoreLess v-bind="args" :isOpen="isOpen" @toggle="toggle">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  `,
});

export const Default = Template.bind({});

export const Mobile = Template.bind({});
Mobile.args = {
  variant: "mobile",
};

export const Open: StoryFn<typeof WizShowMoreLess> = (args) => ({
  setup: () => {
    const isOpen = ref(true);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { args, isOpen, toggle };
  },
  components: { WizShowMoreLess },
  template: `
  <WizShowMoreLess v-bind="args" :isOpen="isOpen" @toggle="toggle">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  `,
});

const MultipleTemplate: StoryFn<typeof WizShowMoreLess> = (args) => ({
  setup: () => {
    const isOpens = ref([true, false, false]);
    const toggles = (index: number) => {
      isOpens.value = isOpens.value.map((isOpen, i) =>
        i === index ? !isOpen : isOpen
      );
    };
    return { args, isOpens, toggles };
  },
  components: { WizShowMoreLess },
  template: `
  <WizShowMoreLess v-bind="args" :isOpen="isOpens[0]" @toggle="toggles(0)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  <WizShowMoreLess v-bind="args" :isOpen="isOpens[1]" @toggle="toggles(1)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  <WizShowMoreLess v-bind="args" :isOpen="isOpens[2]" @toggle="toggles(2)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  `,
});

export const Multiple = MultipleTemplate.bind({});
