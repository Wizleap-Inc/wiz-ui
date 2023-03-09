import { Meta, StoryFn } from "@storybook/vue3";
import { provide, ref } from "vue";

import {
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
} from "@/components/icons";
import {
  globalInject,
  globalKey,
  useGlobalProvider,
} from "@/hooks/use-global-provider";

import { Item } from "../popup-button-group/types";

import { WizNavItem, WizNavContainer } from ".";

export default {
  title: "Base/Navigation/Container",
  component: WizNavContainer,
  argTypes: {
    width: {
      control: { type: "text" },
    },
    sticky: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    () => ({
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof WizNavContainer>;

export const Overview: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer>
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
    </WizNavContainer>
  </div>
  `,
});

export const WithFooter: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer>
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
  </div>
  `,
});

export const Close: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const { setIsMenuOpen } = globalInject(globalKey);
    setIsMenuOpen(false);
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer :close="true">
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
  </div>
  `,
});

export const Playground: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const { isMenuOpen, setIsMenuOpen } = globalInject(globalKey);
    const toggle = () => setIsMenuOpen(!isMenuOpen.value);
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      isMenuOpen,
      toggle,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer :close="true">
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
    <div>
      デバッグ用
      <button @click="toggle">{{ isMenuOpen ? 'Close' : 'Open' }}</button>
    </div>
  </div>
  `,
});

export const Fixed: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer sticky>
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
      <template #footer>
        <h4>Footer</h4>
        <h5>Footer</h5>
        <h6>Footer</h6>
      </template>
    </WizNavContainer>
  </div>
  `,
});

export const Popup: StoryFn = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WizNavContainer, WizNavItem },
  setup() {
    const lockingPopup = ref(false);
    const setLock = (isLock: boolean) => {
      lockingPopup.value = isLock;
    };
    const createButton = (n: number): Item => ({
      kind: "button",
      option: {
        label: `label ${n}`,
        value: n,
        onClick: () => {
          console.log(`clicked ${n}`);
        },
      },
    });

    return {
      WizIDashboard,
      WizIAssignment,
      WizIBusinessCenter,
      WizIHelp,
      lockingPopup,
      setLock,
      createButton,
    };
  },
  template: `
  <div style="display: flex; height: 100vh;">
    <WizNavContainer>
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(0)]" :icon="WizIDashboard" label="Home" to="/" :active="false" />
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(1), createButton(2)]" :icon="WizIAssignment" label="Page1" to="/page1" :active="false" />
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(3), createButton(4)]" :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="false" />
      <WizNavItem :lockingPopup="lockingPopup" @setLock="setLock" :buttons="[createButton(5), createButton(6)]" :icon="WizIHelp" label="Page3" to="/page3" :active="false" />
    </WizNavContainer>
  </div>
  `,
});
