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
      options: [
        "tl",
        "tr",
        "tc",
        "bl",
        "br",
        "bc",
        "rt",
        "rb",
        "rc",
        "lt",
        "lb",
        "lc",
      ],
    },
    closeOnBlur: {
      control: { type: "boolean" },
    },
    shadow: {
      control: { type: "boolean" },
    },
    animation: {
      control: { type: "boolean" },
    },
    onTurn: {
      action: "onTurn",
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
        <wiz-popup :direction="direction" :gap="gap" :closeOnBlur="closeOnBlur" :isOpen="isOpen" :animation="$props.animation" :shadow="$props.shadow" @onClose="close" @onTurn="onTurn">
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
        <wiz-popup :direction="pattern.direction" :gap="pattern.gap" :isOpen="isOpenIndex === i" :animation="$props.animation" :shadow="$props.shadow" @onClose="changeIsOpenIndex(i)">
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
    { direction: "bc" },
    { direction: "br" },
    { direction: "tl" },
    { direction: "tc" },
    { direction: "tr" },
    { direction: "lt" },
    { direction: "lc" },
    { direction: "lb" },
    { direction: "rt" },
    { direction: "rc" },
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

export const Shadow: StoryFn<typeof WizPopup> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopup, WizTextButton, WizPopupContainer },
  template: `
    <div style="display: flex; flex-direction: column; gap: 100px">
      <wiz-popup-container>
        <div style="display: flex; width: 150px;">
          <span>shadow: true</span>
        </div>
        <wiz-popup :isOpen="true" :closeOnBlur="false" :animation="$props.animation" direction="rt">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
      <wiz-popup-container>
        <div style="display: flex; width: 150px;">
          <span>shadow: false</span>
        </div>
        <wiz-popup :isOpen="true" :shadow="false" :closeOnBlur="false" :animation="$props.animation" direction="rt">
          <div style="padding: 16px; background-color: white; border-radius: 4px;">
            <p>This is a popup content</p>
          </div>
        </wiz-popup>
      </wiz-popup-container>
    </div>
  `,
});

export const Playground = Template.bind({});

const absolutePositions = [
  {
    top: "0px",
    left: "0px",
    bottom: "initial",
    right: "initial",
    transform: "initial",
  },
  {
    top: "0px",
    left: "initial",
    bottom: "initial",
    right: "0px",
    transform: "initial",
  },
  {
    top: "initial",
    left: "0px",
    bottom: "0px",
    right: "initial",
    transform: "initial",
  },
  {
    top: "initial",
    left: "initial",
    bottom: "0px",
    right: "0px",
    transform: "initial",
  },
  {
    top: "50%",
    left: "50%",
    bottom: "initial",
    right: "initial",
    transform: "translate(-50%, -50%)",
  },
  {
    top: "50%",
    left: "0px",
    bottom: "initial",
    right: "initial",
    transform: "translate(0%, -50%)",
  },
  {
    top: "50%",
    left: "initial",
    bottom: "initial",
    right: "0px",
    transform: "translate(0%, -50%)",
  },
  {
    top: "0px",
    left: "50%",
    bottom: "initial",
    right: "initial",
    transform: "translate(-50%, 0%)",
  },
  {
    top: "initial",
    left: "50%",
    bottom: "0px",
    right: "initial",
    transform: "translate(-50%, 0%)",
  },
];
export const Playground2: StoryFn<typeof WizPopup> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopup, WizPopupContainer, WizTextButton, WizHStack },
  setup() {
    const isOpen = ref(true);
    const toggle = () => (isOpen.value = !isOpen.value);
    const close = () => (isOpen.value = false);
    return { isOpen, toggle, close, absolutePositions };
  },
  template: `
    <div style="height: 100vh; width: 100vw; position: relative; overflow">
      <div v-for="(pos, key) in absolutePositions" :key="key" :style="{ position: 'absolute', ...pos }">
        <wiz-popup-container>
          <wiz-text-button @click="toggle">Toggle</wiz-text-button>
          <wiz-popup :direction="$props.direction" :gap="$props.gap" :closeOnBlur="$props.closeOnBlur" :isOpen="isOpen" :animation="$props.animation" :shadow="$props.shadow" @onClose="close">
            <div style="padding: 16px; background-color: white; border-radius: 4px;">
              <span>Popup content</span>
            </div>
          </wiz-popup>
        </wiz-popup-container>
      </div>
    </div>
  `,
});

export const FixDirection: StoryFn<typeof WizPopup> = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizPopup, WizPopupContainer, WizTextButton, WizHStack },
  setup() {
    const isOpen = ref(true);
    const toggle = () => (isOpen.value = !isOpen.value);
    const close = () => (isOpen.value = false);
    return { isOpen, toggle, close, absolutePositions };
  },
  template: `
    <div style="height: 100vh; width: 100vw; position: relative; overflow">
      <div v-for="(pos, key) in absolutePositions" :key="key" :style="{ position: 'absolute', ...pos }">
        <wiz-popup-container>
          <wiz-text-button @click="toggle">Toggle</wiz-text-button>
          <wiz-popup v-bind="$props" :isOpen="isOpen" @onClose="close">
            <div style="padding: 16px; background-color: white; border-radius: 4px;">
              <span>Popup content</span>
            </div>
          </wiz-popup>
        </wiz-popup-container>
      </div>
    </div>
  `,
});

FixDirection.args = {
  isDirectionFixed: true,
};
