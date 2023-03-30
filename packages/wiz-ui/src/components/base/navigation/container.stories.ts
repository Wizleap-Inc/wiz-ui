import { StoryFn } from "@storybook/vue";
import { provide } from "vue";

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
    (story: StoryFn) => ({
      components: { story },
      setup() {
        provide(globalKey, useGlobalProvider());
      },
      template: `<story />`,
    }),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

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
    <router-view />
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
    <router-view />
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
    <router-view />
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
    <router-view />
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
    <router-view />
  </div>
  `,
});
