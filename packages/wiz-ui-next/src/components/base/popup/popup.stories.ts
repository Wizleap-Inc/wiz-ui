import { StoryFn, Meta } from "@storybook/vue3";
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
} as Meta<typeof WizPopup>;

export const Direction: StoryFn<typeof WizPopup> = (args) => ({
  components: { WizPopup, WizTextButton, WizPopupContainer },
  setup() {
    const isOpenIndex = ref<number | null>(null);
    const changeIsOpenIndex = (index: number) => {
      if (isOpenIndex.value === index) {
        isOpenIndex.value = null;
      } else {
        isOpenIndex.value = index;
      }
    };
    return {
      isOpenIndex,
      changeIsOpenIndex,
      args,
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
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10rem;">
      <wiz-popup-container v-for="(pattern, i) in patterns" :key="pattern[main]">
        <wiz-text-button @click="changeIsOpenIndex(i)">Toggle Popup {{ pattern[main] }}</wiz-text-button>
        <wiz-popup :isOpen="isOpenIndex === i" :direction="pattern.direction" @onClose="changeIsOpenIndex(i)">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content {{ pattern[main] }}</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
    </div>
  `,
});

export const Gap: StoryFn<typeof WizPopup> = (args) => ({
  components: { WizPopup, WizTextButton, WizPopupContainer },
  setup() {
    const isOpenIndex = ref<number | null>(null);
    const changeIsOpenIndex = (index: number) => {
      if (isOpenIndex.value === index) {
        isOpenIndex.value = null;
      } else {
        isOpenIndex.value = index;
      }
    };
    return {
      isOpenIndex,
      changeIsOpenIndex,
      args,
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
  },
  template: `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10rem;">
      <wiz-popup-container v-for="(pattern, i) in patterns" :key="pattern[main]">
        <wiz-text-button @click="changeIsOpenIndex(i)">Toggle Popup {{ pattern[main] }}</wiz-text-button>
        <wiz-popup v-bind="pattern" :isOpen="isOpenIndex === i" @onClose="changeIsOpenIndex(i)">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content {{ pattern[main] }}</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
    </div>
  `,
});

export const Playground: StoryFn<typeof WizPopup> = (args) => ({
  components: { WizPopup, WizPopupContainer, WizTextButton, WizHStack },
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
    return { x, y, isOpen, toggle, close, maxX, maxY, args };
  },
  template: `
  <div style="height: 100vh; width: 100vw; position: relative;">
    <div :style="{ position: 'absolute', top: y+'px', left: x+'px' }">
      <wiz-popup-container>
        <wiz-text-button @click="toggle">Toggle</wiz-text-button>
        <wiz-popup :closeOnBlur="args.closeOnBlur" :isOpen="isOpen" @onClose="close">
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
