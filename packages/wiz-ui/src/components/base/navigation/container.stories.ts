import { StoryFn } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import { provide } from "vue";

import {
  WizIDashboard,
  WizIAssignment,
  WizIBusinessCenter,
  WizIHelp,
} from "@/components/icons";
import { globalInject, globalKey, useGlobalProvider } from "@/providers";

import { WizNavItem, WizNavContainer } from ".";

const Home = {
  template: "<div>Home</div>",
};
const Page1 = {
  template: "<div>Page1</div>",
};
const Page2 = {
  template: "<div>Page2</div>",
};
const Page3 = {
  template: "<div>Page3</div>",
};

export default {
  title: "Base/Navigation/Container",
  component: WizNavContainer,
  argTypes: {
    width: {
      control: { type: "text" },
    },
  },
  decorators: [
    StoryRouter([
      { path: "/", name: "home", component: Home },
      { path: "/page1", name: "page1", component: Page1 },
      { path: "/page2", name: "page2", component: Page2 },
      { path: "/page3", name: "page3", component: Page3 },
    ]),
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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" />
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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" />
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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" />
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
      <WizNavItem :icon="WizIDashboard" label="Home" to="/" :active="$route.path === '/'" />
      <WizNavItem :icon="WizIAssignment" label="Page1" to="/page1" :active="$route.path === '/page1'" />
      <WizNavItem :icon="WizIBusinessCenter" label="Page2" to="/page2" :active="$route.path === '/page2'" />
      <WizNavItem :icon="WizIHelp" label="Page3" to="/page3" :active="$route.path === '/page3'" />
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
