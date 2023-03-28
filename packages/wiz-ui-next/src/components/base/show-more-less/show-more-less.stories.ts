import { StoryFn, Meta } from "@storybook/vue3";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizShowMoreLess from "./show-more-less.vue";

export default {
  title: "Base/ShowMoreLess",
  component: WizShowMoreLess,
  argTypes: {
    bgColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
    },
    fontColor: {
      control: { type: "select" },
      options: COLOR_MAP_ACCESSORS,
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

export const Color = Template.bind({});
Color.args = {
  bgColor: "gray.300",
  fontColor: "green.800",
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
