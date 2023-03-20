import { StoryFn, Meta } from "@storybook/vue";
import { ref } from "vue";

import WizShowMoreLess from "./show-more-less.vue";

export default {
  title: "Base/ShowMoreLess",
  component: WizShowMoreLess,
  argTypes: {
    backgroundColor: {
      control: { type: "select" },
      options: ["white", "gray"],
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
Default.args = {
  backgroundColor: "gray",
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  backgroundColor: "white",
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
Open.args = {
  backgroundColor: "gray",
};

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
Multiple.args = {
  backgroundColor: "gray",
};
