import { StoryFn } from "@storybook/vue";
import {
  SPACING_ACCESSORS,
  Z_INDEX_ACCESSORS,
} from "@wizleap-inc/wiz-ui-constants";
import { onMounted, ref } from "vue";

import { WizTextButton, WizHStack } from "@/components";

import { WizPopup, WizPopupContainer } from ".";

export default {
  title: "Base/Popup",
  component: WizPopup,
  argTypes: {
    layer: {
      control: { type: "select" },
      options: Z_INDEX_ACCESSORS.filter(
        (key) => key !== "base" && key !== "dialog"
      ),
    },
    gap: {
      control: { type: "select" },
      options: SPACING_ACCESSORS,
    },
    direction: {
      control: { type: "select" },
      options: ["tl", "tr", "bl", "br", "lt", "lb", "rt", "rb"],
    },
    closeOnBlur: {
      control: { type: "boolean" },
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
    const close = () => (isOpen.value = false);
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
    return { x, y, isOpen, toggle, close, maxX, maxY };
  },
  template: `
  <div style="height: 100vh; width: 100vw; position: relative;">
    <div :style="{ position: 'absolute', top: y+'px', left: x+'px' }">
      <wiz-popup-container>
        <wiz-text-button @click="toggle">Toggle</wiz-text-button>
        <wiz-popup :direction="direction" :gap="gap" :closeOnBlur="closeOnBlur" :isOpen="isOpen" @onClose="close">
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
      } else {
        isOpenIndex.value = index;
      }
    };
    return { isOpenIndex, changeIsOpenIndex };
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10rem;">
      <wiz-popup-container v-for="(pattern, i) in patterns" :key="pattern[main]" >
        <wiz-text-button @click="changeIsOpenIndex(i)">Toggle Popup {{ pattern[main] }}</wiz-text-button>
        <wiz-popup :direction="pattern.direction" :gap="pattern.gap" :isOpen="isOpenIndex === i" @onClose="changeIsOpenIndex(i)">
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
    { direction: "bl" },
    { direction: "br" },
    { direction: "tl" },
    { direction: "tr" },
    { direction: "lt" },
    { direction: "lb" },
    { direction: "rt" },
    { direction: "rb" },
  ],
};

export const Gap = MultipleTemplate.bind({});
Gap.args = {
  main: "gap",
  patterns: [
    { direction: "rt", gap: "no" },
    { direction: "rt", gap: "xs2" },
    { direction: "rt", gap: "xs" },
    { direction: "rt", gap: "sm" },
    { direction: "rt", gap: "md" },
    { direction: "rt", gap: "lg" },
    { direction: "rt", gap: "xl" },
    { direction: "rt", gap: "xl2" },
    { direction: "rt", gap: "xl3" },
    { direction: "rt", gap: "xl4" },
  ],
};

export const Playground = Template.bind({});

export const MultiplePlayground: StoryFn = (_, { argTypes }) => ({
  components: { WizPopup, WizTextButton, WizPopupContainer },
  props: Object.keys(argTypes),
  setup() {
    const isOpen1 = ref(false);
    const isOpen2 = ref(false);
    const toggle1 = () => {
      isOpen1.value = !isOpen1.value;
    };
    const toggle2 = () => (isOpen2.value = !isOpen2.value);
    return { isOpen1, isOpen2, toggle1, toggle2 };
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10rem;">
      <wiz-popup-container>
        <wiz-text-button @click="toggle1">Toggle Popup 1</wiz-text-button>
        <wiz-popup :isOpen="isOpen1" @onClose="isOpen1 = false">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content 1</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
      <wiz-popup-container>
        <wiz-text-button @click="toggle2">Toggle Popup 2</wiz-text-button>
        <wiz-popup :isOpen="isOpen2" @onClose="isOpen2 = false">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content 2</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
    </div>
  `,
});
