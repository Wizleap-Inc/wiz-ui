import { StoryFn, Meta } from "@storybook/vue";
import { SPACING_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizAccordion from "./accordion.vue";

const spacingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py"];
const spacingControls = spacingKeys.reduce((acc, key) => {
  acc[key] = {
    control: { type: "select" },
    options: SPACING_ACCESSORS,
  };
  return acc;
}, {} as Record<string, any>);
export default {
  title: "Base/Accordion",
  component: WizAccordion,
  argTypes: {
    backgroundColor: {
      control: { type: "select" },
      options: ["white", "gray"],
    },
    ...spacingControls,
  },
} as Meta<typeof WizAccordion>;

const Template: StoryFn<typeof WizAccordion> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAccordion },
  setup: () => {
    const isOpen = ref(false);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, toggle };
  },
  template: `
  <WizAccordion v-bind="$props" :isOpen="isOpen" @toggle="toggle">
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

export const Padding = Template.bind({});
Padding.args = {
  backgroundColor: "gray",
  p: "sm",
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  backgroundColor: "white",
};

export const ExpandDirection = Template.bind({});
ExpandDirection.args = {
  backgroundColor: "gray",
  expandDown: false,
};

export const Open: StoryFn<typeof WizAccordion> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAccordion },
  setup: () => {
    const isOpen = ref(true);
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, toggle };
  },
  template: `
  <WizAccordion v-bind="$props" :isOpen="isOpen" @toggle="toggle">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  `,
});
Open.args = {
  backgroundColor: "gray",
};

const MultipleTemplate: StoryFn<typeof WizAccordion> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAccordion },
  setup: () => {
    const isOpens = [ref(false), ref(false), ref(false)];
    const toggles = isOpens.map(
      (isOpen) => () => (isOpen.value = !isOpen.value)
    );
    return { isOpens, toggles };
  },
  template: `
  <div>
  <WizAccordion v-bind="$props" :isOpen="isOpens[0]" @toggle="toggles[0]">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  <WizAccordion v-bind="$props" :isOpen="isOpens[1]" @toggle="toggles[1]">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  <WizAccordion v-bind="$props" :isOpen="isOpens[2]" @toggle="toggles[2]">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
</div>
  `,
});

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  backgroundColor: "gray",
};
