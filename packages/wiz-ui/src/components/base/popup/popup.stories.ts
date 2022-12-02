import { StoryFn } from "@storybook/vue";
import { onMounted, ref } from "vue";

import { WizTextButton, WizHStack } from "@/components";
import { SPACING_ACCESSORS } from "@/constants/styles/spacing";
import { Z_INDEX_ACCESSORS } from "@/constants/styles/z-index";

import { WizPopup, WizPopupContainer } from ".";

export default {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {
    layer: {
      control: { type: "select" },
      options: Z_INDEX_ACCESSORS,
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    direction: {
      control: { type: "select" },
      options: ["tl", "tr", "bl", "br", "lt", "lb", "rt", "rb"],
    },
  },
  parameters: {
    layout: "fullscreen",
  },
};

const Template: StoryFn = (_, { argTypes }) => ({
  components: { WizPopup, WizPopupContainer, WizTextButton, WizHStack },
  props: Object.keys(argTypes),
  setup() {
    const isOpen = ref(false);
    const toggle = () => (isOpen.value = !isOpen.value);
    const x = ref(0);
    const y = ref(0);
    const maxX = ref(0);
    const maxY = ref(0);
    const sbRoot = document.getElementById("storybook-root");
    if (!sbRoot) return;
    const updateMax = () => {
      maxX.value = sbRoot.clientWidth;
      maxY.value = sbRoot.clientHeight;
    };
    onMounted(() => {
      updateMax();
      window.addEventListener("resize", updateMax);
    });
    return { x, y, isOpen, toggle, maxX, maxY };
  },
  template: `
  <div style="height: 100vh; width: 100vw; position: relative;">
    <div :style="{ position: 'absolute', top: y+'px', left: x+'px' }">
      <wiz-popup-container>
        <wiz-text-button @click="toggle">Toggle</wiz-text-button>
        <wiz-popup v-bind="$props" v-model="isOpen">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <span>Popup content</span>
          </div>
        </wiz-popup>
      </wiz-popup-container>
    </div>
    <input type="range" min="0" :max="''+maxX" v-model="x" />
    <input type="range" min="0" :max="''+maxY" v-model="y" />
  </div>
  `,
});

const MultipleTemplate: StoryFn = (_, { argTypes }) => ({
  components: { WizPopup, WizTextButton, WizPopupContainer },
  props: Object.keys(argTypes),
  setup() {
    const isOpenIndex = ref<number | null>(null);
    const changeIsOpenIndex = (index: number) => {
      if (isOpenIndex.value === index) {
        isOpenIndex.value = null;
      }
      isOpenIndex.value = index;
    };
    return { isOpenIndex, changeIsOpenIndex };
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10rem;">
      <wiz-popup-container v-for="(pattern, i) in patterns" :key="pattern[main]">
        <wiz-text-button @click="changeIsOpenIndex(i)">Toggle Popup {{ pattern[main] }}</wiz-text-button>
        <wiz-popup v-bind="pattern">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content {{ pattern[main] }}</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
    </div>
  `,
});

export const Direction = MultipleTemplate.bind({});
Direction.args = {
  main: "direction",
  patterns: [
    { layer: "base", direction: "tl", value: true },
    { layer: "base", direction: "tr", value: true },
    { layer: "base", direction: "bl", value: true },
    { layer: "base", direction: "br", value: true },
    { layer: "base", direction: "lt", value: true },
    { layer: "base", direction: "lb", value: true },
    { layer: "base", direction: "rt", value: true },
    { layer: "base", direction: "rb", value: true },
  ],
};

export const Gap = MultipleTemplate.bind({});
Gap.args = {
  main: "gap",
  patterns: [
    { layer: "base", direction: "rt", gap: "no", value: true },
    { layer: "base", direction: "rt", gap: "xs2", value: true },
    { layer: "base", direction: "rt", gap: "xs", value: true },
    { layer: "base", direction: "rt", gap: "sm", value: true },
    { layer: "base", direction: "rt", gap: "md", value: true },
    { layer: "base", direction: "rt", gap: "lg", value: true },
    { layer: "base", direction: "rt", gap: "xl", value: true },
    { layer: "base", direction: "rt", gap: "xl2", value: true },
    { layer: "base", direction: "rt", gap: "xl3", value: true },
    { layer: "base", direction: "rt", gap: "xl4", value: true },
  ],
};

export const Playground = Template.bind({});
Playground.args = {
  layer: "base",
};
