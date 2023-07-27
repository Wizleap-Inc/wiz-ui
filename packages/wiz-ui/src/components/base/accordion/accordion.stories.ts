import { expect } from "@storybook/jest";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { StoryFn, Meta } from "@storybook/vue";
import { COLOR_MAP_ACCESSORS } from "@wizleap-inc/wiz-ui-constants";
import { ref } from "vue";

import WizAccordion from "./accordion.vue";

export default {
  title: "Base/Accordion",
  component: WizAccordion,
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

export const Color = Template.bind({});
Color.args = {
  bgColor: "gray.300",
  fontColor: "green.800",
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

const MultipleTemplate: StoryFn<typeof WizAccordion> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizAccordion },
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
  <WizAccordion v-bind="$props" :isOpen="isOpens[0]" @toggle="toggles(0)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  <WizAccordion v-bind="$props" :isOpen="isOpens[1]" @toggle="toggles(1)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
  <WizAccordion v-bind="$props" :isOpen="isOpens[2]" @toggle="toggles(2)">
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
    <p>折りたたまれている部分です．</p>
  </WizAccordion>
</div>
  `,
});

export const Multiple = MultipleTemplate.bind({});

export const Test: StoryFn<typeof WizAccordion> = (_, { argTypes }) => ({
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
    <div data-testid="contents">
      <p>折りたたまれている部分です．</p>
      <p>折りたたまれている部分です．</p>
      <p>折りたたまれている部分です．</p>
    </div>
  </WizAccordion>
  `,
});

Test.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const accordion = await canvas.getByText("もっと見る");
  const details = await canvas.getByTestId("contents");

  await expect(details).not.toBeVisible();

  await userEvent.click(accordion);

  waitFor(() => {
    expect(details).toBeVisible();
    expect(accordion).toHaveTextContent("閉じる");
  });
};
