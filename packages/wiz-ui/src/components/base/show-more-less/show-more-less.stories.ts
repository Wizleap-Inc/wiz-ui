import { StoryFn, Meta } from "@storybook/vue";
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

const Template: StoryFn<typeof WizShowMoreLess> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizShowMoreLess },
  setup: () => {
    const isOpen = ref(false);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, toggle };
  },
  template: `
  <WizShowMoreLess v-bind="$props" :isOpen="isOpen" @toggle="toggle">
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

export const Open: StoryFn<typeof WizShowMoreLess> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizShowMoreLess },
  setup: () => {
    const isOpen = ref(true);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, toggle };
  },
  template: `
  <WizShowMoreLess v-bind="$props" :isOpen="isOpen" @toggle="toggle">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  `,
});

const MultipleTemplate: StoryFn<typeof WizShowMoreLess> = (
  _,
  { argTypes }
) => ({
  props: Object.keys(argTypes),
  components: { WizShowMoreLess },
  setup: () => {
    const isOpens = ref([true, false, false]);
    const toggles = (index: number) => {
      isOpens.value = isOpens.value.map((isOpen, i) =>
        i === index ? !isOpen : isOpen
      );
    };
    return { isOpens, toggles };
  },
  template: `
  <div>
  <WizShowMoreLess v-bind="$props" :isOpen="isOpens[0]" @toggle="toggles(0)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  <WizShowMoreLess v-bind="$props" :isOpen="isOpens[1]" @toggle="toggles(1)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
  <WizShowMoreLess v-bind="$props" :isOpen="isOpens[2]" @toggle="toggles(2)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizShowMoreLess>
</div>
  `,
});

export const Multiple = MultipleTemplate.bind({});
